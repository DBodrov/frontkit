#!/bin/sh

sed -i 's/\"version\":.*$/\"version\": '\""$TAG"\"',/' package.json