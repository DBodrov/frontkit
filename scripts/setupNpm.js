#!/usr/bin/env node
const fs = require('fs');

function setupNpm() {
  const NPM_TOKEN = process.env.NPM_TOKEN;

  const content = `
  @a3:registry=http://192.168.167.51:8081/repository/local-npm/
  //192.168.167.51:8081/repository/local-npm/:_authToken=${NPM_TOKEN}
  email=noreply@a-3.ru
  always-auth=true
  `;

  fs.writeFileSync('.npmrc', content);
}

setupNpm();
