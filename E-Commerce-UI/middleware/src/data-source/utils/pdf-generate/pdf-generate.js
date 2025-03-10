import PdfPrinter from 'pdfmake';
import Roboto from './fonts/Roboto';

const generatePdf = (docDefinition, successCallback, errorCallback) => {
  try {
    const printer = new PdfPrinter(Roboto);
    const doc = printer.createPdfKitDocument(docDefinition);

    const chunks = [];

    doc.on('data', (chunk) => {
      chunks.push(chunk);
    });

    doc.on('end', () => {
      successCallback(
        `data:application/pdf;base64,${Buffer.concat(chunks).toString(
          'base64'
        )}`
      );
    });

    doc.end();
  } catch (err) {
    throw err;
  }
};

export const generatePdfAsync = (docDefinition) => {
  const promise = new Promise((resolve, reject) => {
    generatePdf(docDefinition, resolve, reject);
  });

  return promise;
};
