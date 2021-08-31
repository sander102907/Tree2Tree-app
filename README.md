A dedicated dedicated website for demonstrating the principles shown in the paper:

**Autoencoders as Tools for Program Synthesis**

## Requirements
You need to install three packages on your machine:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Python (3.7+)](https://python.org/)
- [clang](https://github.com/llvm/llvm-project/releases/tag/llvmorg-12.0.1): `apt-get install clang`
- [clang-format](https://clang.llvm.org/docs/ClangFormat.html): `apt-get install clang-format` for automatically formatting of generated code

Furthermore, install the packages from the requirements.txt file:

`pip install -r requirements.txt`

## Set up
- Download a pretrained model checkpoint from [here](https://surfdrive.surf.nl/files/index.php/s/67fYIcTBpRXCoHV/download). Unzip the contents in a folder within the project and set the path to the folder in `api/api.py` for the variable `checkpoint_path`
- Locate the clang libclang.so library file on your machine (often under /usr/lib/x86_64-linux-gnu/libclang-6.0.so.1) and set the path in `api/api.py` for the variable `libclang_path`
- Run `yarn install` to install all required packages from package.json
- Run `yarn build` to build the app for production to the `build` folder

## Start the app
- The app can be started by running `cd api && flask run`


## Deployment
- The app can be started by running `gunicorn -w {NUMBER_OF_WORKERS} -b {ADDRESS} api.api:app`
- For more tips on deployment look [here](https://www.javacodemonk.com/part-2-deploy-flask-api-in-production-using-wsgi-gunicorn-with-nginx-reverse-proxy-4cbeffdb)


