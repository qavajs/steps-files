export default class Memory {
    filePath = './test-e2e/folder/file.txt';
    fileRegexp = /^.+\.txt/;
    folder = './test-e2e/folder';
    buffer = Buffer.of(
        116, 104, 105, 115, 32, 105, 115, 32,
        116, 101, 120, 116, 32, 102, 105, 108, 101,
        32, 99, 111, 110, 116, 101, 110, 116, 13
    );
    textContent = 'this is text file content\r'
}
