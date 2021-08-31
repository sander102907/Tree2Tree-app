all: model build .libclang

model:
	wget -q -O model.zip https://surfdrive.surf.nl/files/index.php/s/67fYIcTBpRXCoHV/download && unzip model.zip -d model && rm model.zip

node_modules:
	yarn install

.libclang:
	 ls -1v /usr/lib/*/libclang* | grep -x '.*libclang[0-9\-]*\.so' | tail -n 1 > .libclang

build: node_modules
	yarn build