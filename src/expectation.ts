import {When} from '@cucumber/cucumber';
import {waitFor} from './waitFor';
import memory from '@qavajs/memory';
import {constants, accessSync, readdirSync} from 'node:fs';

/**
 * Expect file matching regexp to exist directory
 * @param {string} file - regexp pattern of file name to wait
 * @param {string} dir - folder path
 * @example
 * When I expect file matching 'f.+\.txt' regexp exists in './test-e2e/folder'
 * When I expect file matching '$fileRegexp' regexp exists in '$folder'
 */
When('I expect file matching {string} regexp exists in {string}', async function (file, dir) {
    const fileNameRegexp = new RegExp(memory.getValue(file));
    const dirName = memory.getValue(dir);
    await waitFor(function () {
        const fileList = readdirSync(dirName);
        return fileList.find(f => fileNameRegexp.test(f)) ?? false;
    }, {
        interval: this.config.fileTimeout?.interval,
        timeout: this.config.fileTimeout?.timeout
    });
});

/**
 * Expect file to exist
 * @param {string} file - file path to wait
 * @example
 * When I expect './test-e2e/folder/file.txt' file exists
 * When I expect '$filePath' file exists
 */
When('I expect {value} file exists', async function (file) {
    const fileName = memory.getValue(file).value();
    await waitFor(function () {
        try {
            accessSync(fileName, constants.F_OK);
            return true
        } catch (err) {
            return false
        }
    }, {
        interval: this.config.fileTimeout?.interval,
        timeout: this.config.fileTimeout?.timeout
    });
});
