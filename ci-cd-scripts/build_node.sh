#!/bin/bash

PROJECT_DIRECTORY="chat-server-cloud-computing-hochschule-reutlingen-backend"
PROJECT_SRC="src"
BUILD_OUTPUT_DIR="dist"
CI_CD_DIRECTORY="ci-cd-scripts"
DOCKERFILE_SRC_DIR="docker"
DOCKERFILE_SRC_NAME="Dockerfile_Backend"
DOCKERFILE_TRGT_NAME="Dockerfile"
DOCKER_PASSWORD=$2
DOCKER_USERNAME=$1

echo "INFO: Parse commit hash"
GIT_HASH=$(git log -1 --pretty=%H)

echo "INFO: Clean up dist directory "$PROJECT_DIRECTORY/$BUILD_OUTPUT_DIR
rm -Rf $PROJECT_DIRECTORY/$BUILD_OUTPUT_DIR

echo "INFO: Create build output dir "$PROJECT_DIRECTORY/$BUILD_OUTPUT_DIR
mkdir -p $PROJECT_DIRECTORY/$BUILD_OUTPUT_DIR

echo "INFO: Copy "$DOCKERFILE_SRC_NAME" from "$CI_CD_DIRECTORY/$DOCKERFILE_SRC_DIR
cp $CI_CD_DIRECTORY/$DOCKERFILE_SRC_DIR/$DOCKERFILE_SRC_NAME $PROJECT_DIRECTORY/$BUILD_OUTPUT_DIR/$DOCKERFILE_TRGT_NAME

echo "INFO: Switch to "$PROJECT_DIRECTORY
pushd $PROJECT_DIRECTORY
echo "INFO: Install NPM dependencies"
npm install

echo "INFO: Copy application code to "$BUILD_OUTPUT_DIR/$PROJECT_DIRECTORY
mkdir -p $BUILD_OUTPUT_DIR/$PROJECT_DIRECTORY
cp -a $PROJECT_SRC $BUILD_OUTPUT_DIR/$PROJECT_DIRECTORY
cp package*.json $BUILD_OUTPUT_DIR/$PROJECT_DIRECTORY

echo "INFO: Build and Tag Docker container"
docker build \
    -t pgerhard/chat-server-cloud-computing-hochschule-reutlingen-backend:${GIT_HASH}  \
    --build-arg BUILD_OUTPUT_DIR=${BUILD_OUTPUT_DIR} \
    --build-arg PROJECT_DIRECTORY=${PROJECT_DIRECTORY} \
    --build-arg PROJECT_SRC=${PROJECT_SRC} dist/
docker tag pgerhard/chat-server-cloud-computing-hochschule-reutlingen-backend:${GIT_HASH} pgerhard/chat-server-cloud-computing-hochschule-reutlingen-backend:latest

echo "INFO: Push Docker container to Docker Hub"
echo "$DOCKER_PASSWORD" | docker login --username "$DOCKER_USERNAME" --password-stdin
docker push pgerhard/chat-server-cloud-computing-hochschule-reutlingen-backend:${GIT_HASH}
docker push pgerhard/chat-server-cloud-computing-hochschule-reutlingen-backend:latest
popd
