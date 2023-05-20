import { extractRawText } from 'mammoth';

/**
 * Parse pdf file buffer
 * @param buffer - file buffer
 * @returns
 * @property {string} textMultiline - text content in multiline format
 * @property {string} textSingleLine - text content in single format
 */
export default async function parseDocx(buffer: Buffer) {
    const text = await extractRawText({ buffer });
    return {
        textMultiLine: text.value,
        textSingleLine: text.value.replace(/\n+/g, ' ').trim()
    }
}
