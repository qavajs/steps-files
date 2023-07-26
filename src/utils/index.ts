import fs from 'fs/promises';

export async function getFileContent(filePathOrContent: string | Buffer): Promise<Buffer> {
    return typeof filePathOrContent === 'string'
        ? await fs.readFile(filePathOrContent)
        : filePathOrContent;
}
