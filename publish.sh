#!/usr/bin/env bash

if [ "$1" != "patch" ] && [ "$1" != "major" ] && [ "$1" != "minor" ] && [ "$1" != "prepatch" ] && [ "$1" != "premajor" ] && [ "$1" != "preminor" ]; then
  echo "INVALID COMMAND";
  exit 1;
fi

cd ./src && npm version "$1" && cd ../;
if [ ! -d dist ]; then
  mkdir dist;
  exit 1;
fi
tsc;
cp ./src/package.json ./dist/package.json;
cp ./src/package-lock.json ./dist/package-lock.json;
cp ./src/README.md ./dist/README.md;
cd ./dist;
npm publish;
echo "published to npm"
