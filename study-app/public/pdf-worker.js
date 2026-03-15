// PDF processing worker
importScripts('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js');

self.onmessage = async function(e) {
  const { type, data } = e.data;

  if (type === 'PROCESS_PDF') {
    try {
      const { pdfData, fileName, fileId } = data;

      // Load PDF
      const loadingTask = pdfjsLib.getDocument({ data: pdfData });
      const pdf = await loadingTask.promise;

      const pages = [];
      let fullText = '';

      // Extract text from each page
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        const pageText = textContent.items
          .map((item) => item.str)
          .join(' ');

        pages.push({
          pageNumber: i,
          text: pageText,
        });

        fullText += pageText + '\n\n';
      }

      self.postMessage({
        type: 'PROCESSING_COMPLETE',
        data: {
          fileId,
          fileName,
          pageCount: pdf.numPages,
          pages,
          fullText,
        },
      });
    } catch (error) {
      self.postMessage({
        type: 'PROCESSING_ERROR',
        data: {
          fileId: data.fileId,
          error: error.message,
        },
      });
    }
  }
};
