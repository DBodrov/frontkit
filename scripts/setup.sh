#!/bin/sh

echo "@a3:registry=http://192.168.167.51:8081/repository/local-npm/">>.npmrc
echo "//192.168.167.51:8081/repository/local-npm/:_authToken=${NPM_TOKEN}">>.npmrc
echo "email=noreply@a-3.ru">>.npmrc
echo "always-auth=true">>.npmrc
