import { getDocument, PDFDocumentProxy } from 'pdfjs-dist/legacy/build/pdf';
import { TextItem } from 'pdfjs-dist/types/src/display/api';

/**
 * Parse pdf file buffer
 * @param buffer - file buffer
 * @returns
 * @property {string} textMultiline - text content in multiline format
 * @property {string} textSingleLine - text content in single format
 * @property {Object} metadata - file metadata
 */
export default async function parsePdf(buffer: Uint8Array) {
    const document = await getDocument(buffer).promise;
    return {
        textMultiLine: await getFullText(document, '\n'),
        textSingleLine: await getFullText(document, ' '),
        metadata: (await document.getMetadata()).info
    }
}

/**
 * Extract pdf text content
 * @param {PDFDocumentProxy} document - document object
 * @param {string} lineDelimiter - lineDelimiter
 * @returns {string} - parsed text content
 */
async function getFullText(document: PDFDocumentProxy, lineDelimiter: string = '\n') {
    let fullText = '';
    for (let i = 0; i < document.numPages; i++) {
        const page = await document.getPage(i + 1);
        const textContent = await page.getTextContent();
        fullText += textContent.items.reduce(([text, y], current) => {
            const textItem = current as TextItem;
            if (y && textItem.transform[5] !== y) {
                text += lineDelimiter
            }
            return [text + textItem.str, textItem.transform[5]]
        }, ['', null])[0];
    }
    return fullText;
}
