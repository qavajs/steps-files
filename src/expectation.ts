import {When} from '@cucumber/cucumber';
import {waitFor} from './waitFor';
import {constants, accessSync, readdirSync} from 'node:fs';
import { MemoryValue } from '@qavajs/core/src/load';

/**
 * Expect file matching regexp to exist directory
 * @param {string} file - regexp pattern of file name to wait
 * @param {string} dir - folder path
 * @example
 * When I expect file matching 'f.+\.txt' regexp exists in './test-e2e/folder'
 * When I expect file matching '$fileRegexp' regexp exists in '$folder'
 */
When('I expect file matching {value} regexp exists in {value}', async function (file: MemoryValue, dir: MemoryValue) {
    const fileNameRegexp = new RegExp(await file.value());
    const dirName = await dir.value();
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
When('I expect {value} file exists', async function (file: MemoryValue) {
    const fileName = await file.value();
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
