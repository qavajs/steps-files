import {readFileSync} from 'node:fs';

export function getFileContent(filePathOrContent: string | Buffer): Buffer {
    return typeof filePathOrContent === 'string'
        ? readFileSync(filePathOrContent)
        : filePathOrContent;
}
