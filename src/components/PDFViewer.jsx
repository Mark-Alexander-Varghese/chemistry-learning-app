// src/components/SimplePDFViewer.jsx
import React from 'react';
import './PDFViewer.css';

const SimplePDFViewer = ({ pdfFile }) => {
  return (
    <div className="pdf-container">
      <iframe 
        src={`${pdfFile}#toolbar=1&navpanes=1&scrollbar=1`}
        className="pdf-iframe"
        title="PDF Viewer"
      />
    </div>
  );
};

export default SimplePDFViewer;