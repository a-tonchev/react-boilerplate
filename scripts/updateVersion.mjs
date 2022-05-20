import semver from 'semver';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { exec } = require('child_process');

const { argv } = yargs(hideBin(process.argv));
const { r: release = 'patch' } = argv;

const version = process.env.npm_package_version;

let startVersion = semver.valid(version) ? version : null;

if (!startVersion) {
  console.error('No Valid Version detected!');
  throw new Error();
}

const newVersion = semver.inc(startVersion, release);

const setNewVersion = () => new Promise((resolve, reject) => {
  exec(`YARN_VERSION_GIT_TAG='' yarn version --new-version ${newVersion}`,
    (error, stdout, stderr) => {
      if (error) {
        reject(error.message);
      } else if (stderr) {
        reject(stderr);
      } else {
        console.log('\x1b[32m');
        console.log(`Version of package.json updated to ${newVersion}`);
        console.log('\x1b[0m');
        resolve();
      }
    });
});

if(newVersion) {
  await setNewVersion();
} else {
  console.error('Error while trying to increase version!');
  throw new Error();
}