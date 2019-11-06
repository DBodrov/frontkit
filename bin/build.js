const util = require('util');
const exec = util.promisify(require('child_process').exec);

const isError = /.+error TS.+/i;
const isModuleError = /\.module\.css/i;

(async function runBuild() {
    try {
        await exec('yarn build:lib');
        process.exit(0);
    } catch (err) {
        const { stdout } = err;
        const errors = stdout.split('\n');
        const otherThanCSSModuleError = errors.find(item => isError.test(item) && !isModuleError.test(item));
        if (otherThanCSSModuleError) {
            console.error(otherThanCSSModuleError);
            process.exit(1);
        }
    }
})();
