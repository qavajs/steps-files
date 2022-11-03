import { When } from '@cucumber/cucumber';
import { waitFor } from './waitFor';
import memory from '@qavajs/memory';
import fs from 'fs/promises';
import { constants } from 'fs';

declare global {
    var config: any;
}

/**
 * Wait until file matching regexp appear in directory
 * @param {string} file - regexp pattern of file name to wait
 * @param {string} dir - folder path
 * @example
 * When I wait until file matching 'f.+\.txt' regexp appears in './test-e2e/folder'
 * When I wait until file matching '$fileRegexp' regexp appears in '$folder'
 */
When('I wait until file matching {string} regexp appears in {string}', async function (file, dir) {
    const fileNameRegexp = new RegExp(memory.getValue(file));
    const dirName = memory.getValue(dir);
    await waitFor(async function () {
        const fileList = await fs.readdir(dirName);
        return fileList.find(f => fileNameRegexp.test(f)) ?? false;
    }, {
        interval: config?.fileTimeout?.interval,
        timeout: config?.fileTimeout?.timeout
    });
});

/**
 * Wait until file appear
 * @param {string} file - file path to wait
 * @example
 * When I wait until './test-e2e/folder/file.txt' file appears
 * When I wait until '$filePath' file appears
 */
When('I wait until {string} file appears', async function (file) {
    const fileName = memory.getValue(file);
    await waitFor(async function () {
        try {await fs.access(fileName, constants.F_OK);
            return true
        } catch (err) {
            return false
        }
    }, {
        interval: config?.fileTimeout?.interval,
        timeout: config?.fileTimeout?.timeout
    });
});
