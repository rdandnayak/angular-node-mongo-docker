FROM node:10

RUN mkdir /project
WORKDIR /project

COPY package.json /project/package.json
COPY package-lock.json /project/package-lock.json
RUN npm ci

COPY . /project

RUN npm install -g @angular/cli
CMD ["ng", "serve", "--host", "0.0.0.0", "--proxy-config", "./proxy.conf.json"]
