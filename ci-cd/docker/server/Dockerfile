FROM node:10-alpine

LABEL maintainer="Arina.Markova@Student.Reutlingen-University.DE"
LABEL maintainer="philipp.gerhard@student.reutlingen-university.de"

ARG PROJECT_DIRECTORY
ARG PROJECT_SRC

RUN pwd
RUN ls -la

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

RUN echo $PROJECT_DIRECTORY
COPY $PROJECT_DIRECTORY/package*.json ./

USER node

RUN npm install

COPY --chown=node:node $PROJECT_DIRECTORY/$PROJECT_SRC .

EXPOSE 3000

CMD [ "node", "index.js" ]