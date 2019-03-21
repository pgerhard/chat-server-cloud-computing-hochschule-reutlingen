#!/bin/bash

FRONTEND_DIRECTORY="../chat-server-cloud-computing-hochschule-reutlingen-frontend"

pushd $FRONTEND_DIRECTORY
npm install
npm run build:prod
popd
