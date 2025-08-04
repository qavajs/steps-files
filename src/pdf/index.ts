import { type PDFDocumentProxy } from 'pdfjs-dist';
const pdfJSModule = () => import('pdfjs-dist/legacy/build/pdf.mjs');
/**
 * Parse pdf file buffer
 * @param buffer - file buffer
 * @returns
 * @property {string} textMultiLine - text content in multiline format
 * @property {string} textSingleLine - text content in single format
 * @property {Object} metadata - file metadata
 */
export default async function parsePdf(buffer: Uint8Array): Promise<{ textMultiLine: string, textSingleLine: string, metadata: any }> {
    const { getDocument } = await pdfJSModule();
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
 * @returns {Promise<string>} - parsed text content
 */
async function getFullText(document: PDFDocumentProxy, lineDelimiter: string = '\n'): Promise<string> {
    let fullText = '';
    for (let i = 0; i < document.numPages; i++) {
        const page = await document.getPage(i + 1);
        const textContent = await page.getTextContent();
        fullText += textContent.items.reduce(([text, y], current) => {
            const textItem = current as any;
            if (y && textItem.transform[5] !== y) {
                text += lineDelimiter
            }
            return [text + textItem.str, textItem.transform[5]]
        }, ['', null])[0];
    }
    return fullText;
}
