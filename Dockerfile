FROM pytorch/pytorch

RUN apt-get update
RUN apt-get install -y git curl clang clang-format libclang-dev build-essential
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs
RUN npm install --global yarn

ADD . /app
WORKDIR /app
RUN pip install -r requirements.txt
RUN make

ENV PORT 8080
EXPOSE 8080

CMD ["gunicorn", "-b", "0.0.0.0:8080", "api.api:app"]