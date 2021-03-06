import time
from flask import Flask
from flask import request
import torch
from autoencoder_program_synthesis.t2t_vae import Tree2Tree
from cpp_ast_parser.utils import add_includes_usings
import os
import subprocess
from pathlib import Path

from uuid import uuid4, UUID
def uuid():
    return str(uuid4())

project_path = Path(__file__).parent.parent

with open(project_path / '.libclang') as f:
    libclang_path = f.read().strip()

app = Flask(__name__, static_folder=project_path / 'build', static_url_path='/')

@app.route('/')
def index():
    return app.send_static_file('index.html')

tree2tree = Tree2Tree(libclang_path, project_path / 'model')

@app.route('/api/mutate', methods=['POST'])
def mutate():

    if request.method == 'POST':
        program = request.json['program']
        temperature = request.json['temperature']
        top_k = request.json['top_k']
        top_p = request.json['top_p']

        z, declared_names = tree2tree.encode(program)

        reconstructed_program = tree2tree.decode(z, temperature, top_k, top_p, declared_names)


        return {'program': reconstructed_program[0], 'latent_vector': z.tolist()[0]}


@app.route('/api/decode', methods=['POST'])
def decode():
    if request.method == 'POST':
        z = request.json['latent_vector']
        temperature = request.json['temperature']
        top_k = request.json['top_k']
        top_p = request.json['top_p']

        z = torch.tensor([z], dtype=torch.float)
        program = tree2tree.decode(z, temperature=temperature, top_k=top_k, top_p=top_p)

        return {'program': program[0]}

def compile(program, binary_name):
    imports = ['using namespace std;', '#include <vector>', '#include <iostream>', '#include <string>',
        '#include <cstring>', '#include <queue>', '#include <stdio.h>', '#include <math.h>', '#include <map>', '#include <set>', '#include <stack>']

    tmpfile_path = project_path / 'tmp.cpp'
    binary_path = project_path / 'binaries' / binary_name

    with open(tmpfile_path, 'w') as f:
        f.write(program)

    add_includes_usings(str(tmpfile_path), imports)
    subprocess.call(['g++', str(tmpfile_path), '-o', str(binary_path)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    tmpfile_path.unlink()
    if binary_path.is_file():
        return {'binary': binary_name}, 200      
    else:
        return {}, 400


@app.route('/api/programs', methods=['POST'])
def post_program():
    program = request.json['program']

    if request.method == 'POST':
        binary_name = uuid()
    elif request.method == 'PUT':
        binary_name = request.json['binary']

    return compile(program, binary_name)

@app.route('/api/programs/<binary_name>', methods=['DELETE'])
def delete_program(binary_name):
    try:
        # We will delete any file in the folder that looks like a UUID
        # That should prevent important files (like this python script) being deleted
        binary_name = str(UUID(binary_name))
    except ValueError:
        return {'error': 'Malformed binary name'}, 404

    (project_path / 'binaries' / binary_name).unlink()
    return {}

@app.route('/api/programs/<binary_name>/run', methods=['POST'])
def run_program(binary_name):
    if request.method == 'POST':
        input_string = request.json['input']
        binary_path = project_path / 'binaries' / binary_name

        process = subprocess.Popen([str(binary_path)], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        output, err = process.communicate(input_string.encode())
        
        if err:
            return {'stderr': err}, 400
        else:
            return {'stdout': output.decode()}, 200

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))