#!/bin/bash

BACKEND_DIRECTORY="chat-server-cloud-computing-hochschule-reutlingen-backend"
FRONTEND_DIRECTORY="chat-server-cloud-computing-hochschule-reutlingen-frontend"
PROJECT_SRC="src"
BUILD_OUTPUT_DIR="standalone"

echo "INFO: Clean up dist directory "$BACKEND_DIRECTORY/$BUILD_OUTPUT_DIR
rm -Rf $BACKEND_DIRECTORY/$BUILD_OUTPUT_DIR

echo "INFO: Create build output dir "$BACKEND_DIRECTORY/$BUILD_OUTPUT_DIR
mkdir -p $BACKEND_DIRECTORY/$BUILD_OUTPUT_DIR/dist

# TODO build frontend
echo "INFO: Switch to "$FRONTEND_DIRECTORY
pushd $FRONTEND_DIRECTORY
echo "INFO: Install NPM dependencies"
npm install
echo "INFO: Run Angular production build"
npm run build:prod
popd

echo "INFO: Copy angular resources to node js server"
cp -a $FRONTEND_DIRECTORY/dist/$FRONTEND_DIRECTORY/ $BACKEND_DIRECTORY/$BUILD_OUTPUT_DIR/dist/

echo "INFO: Switch to "$BACKEND_DIRECTORY
pushd $BACKEND_DIRECTORY
echo "INFO: Install NPM dependencies"
npm install

echo "INFO: Copy application code to "$BUILD_OUTPUT_DIR
cp -a $PROJECT_SRC/ $BUILD_OUTPUT_DIR/

popd
