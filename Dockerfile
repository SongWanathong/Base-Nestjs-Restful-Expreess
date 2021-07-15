FROM node:10.16.0-alpine

RUN apk --no-cache add curl g++ gcc libgcc libstdc++ linux-headers make python

# RUN curl -o- -L https://yarnpkg.com/install.sh | sh

WORKDIR /src/api

COPY . .

# WORKDIR /src/api

# COPY .env.prod /src/api/.env

RUN npm install

RUN npm run build

CMD ["npm", "run", "start:prod"]