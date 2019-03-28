#!/bin/bash

export ENV_NODE_VERSION=`node -v`
export ENV_NPM_VERSION=`node -v`
export ENV_DOCKER_VERSION=`docker -v`

echo "Installed Node.js version: "+$ENV_NODE_VERSION
echo "Installed NPM version: "+$ENV_NPM_VERSION
echo "Installed Docker version: "+$ENV_DOCKER_VERSION