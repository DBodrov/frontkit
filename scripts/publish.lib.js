const {execSync} = require('child_process');
const NPM_TOKEN = process.env.NPM_TOKEN;
const NPM_REGISTRY = 'http://192.168.167.51:8081/repository/local-npm/';

function setupNpm() {
  console.log('Setup npm...🚀')
  execSync(`npm config set _auth=${NPM_TOKEN}`);
  execSync(`npm config set registry=${NPM_REGISTRY}`);
  execSync(`npm config set always-auth=true`);
  console.info('DEBUG INFO 🛠');
  console.log('registry :', NPM_REGISTRY);
  console.info('token :', NPM_TOKEN);
  console.log('Setup npm - ✅')
}

setupNpm();
