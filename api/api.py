import time
from flask import Flask
from flask import request
import torch
from autoencoder_program_synthesis.t2t_vae import Tree2Tree
from cpp_ast_parser.utils import add_includes_usings
import os
import subprocess

with open('../.libclang') as f:
    libclang_path = f.read()

app = Flask(__name__, static_folder='../build', static_url_path='/')

@app.route('/')
def index():
    return app.send_static_file('index.html')

tree2tree = Tree2Tree(libclang_path, '../model')

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


@app.route('/api/compiles', methods=['POST'])
def compiles():
    if request.method == 'POST':
        imports = ['using namespace std;', '#include <vector>', '#include <iostream>', '#include <string>',
            '#include <cstring>', '#include <queue>', '#include <stdio.h>', '#include <math.h>', '#include <map>', '#include <set>', '#include <stack>']

        program = request.json['program']

        with open('tmp.cpp', 'w') as f:
            f.write(program)

        add_includes_usings('tmp.cpp', imports)

        subprocess.call(['g++', 'tmp.cpp', '-o', 'compiled.cpp'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


        os.remove('tmp.cpp')
        if os.path.isfile('compiled.cpp'):
            os.remove('compiled.cpp')
            return {'compiles': True}
            
        else:
            return {'compiles': False}


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))