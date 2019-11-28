#!/bin/sh

yarn global add npm-cli-adduser
npm-cli-adduser

npm config set registry $NPM_REGISTRY
npm config set always-auth true
