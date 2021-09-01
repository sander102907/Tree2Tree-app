A dedicated dedicated website for demonstrating the principles shown in the paper:

**Autoencoders as Tools for Program Synthesis**

## Requirements
You need to install the following packages on your machine:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Python (3.7+)](https://python.org/)
- [clang](https://github.com/llvm/llvm-project/releases/tag/llvmorg-12.0.1): `apt-get install clang`
- [clang-format](https://clang.llvm.org/docs/ClangFormat.html): `apt-get install clang-format` for automatically formatting of generated code

Furthermore, install the packages from the requirements.txt file:

`pip install -r requirements.txt`

## Set up

Make sure that the dependencies listed above are installed, then run

```
make
```

Verify that the file `.libclang` holds the correct path to libclang.so library file on your machine.
`make` tries to determine its location automatically, but mistakes can happen.
Edit if necessary.

## Start the app
- The app can be started by running `cd api && flask run`


## Deployment
- The app can be started by running `gunicorn -w {NUMBER_OF_WORKERS} -b {ADDRESS} api.api:app`
- For more tips on deployment look [here](https://www.javacodemonk.com/part-2-deploy-flask-api-in-production-using-wsgi-gunicorn-with-nginx-reverse-proxy-4cbeffdb)


