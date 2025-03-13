// src/components/TextbookLibrary.jsx
import React, { useState } from 'react';
import { BookOpen, ChevronRight, Download } from 'lucide-react';
import PDFViewer from './PDFViewer';
import './TextbookLibrary.css';

const TextbookLibrary = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  
  const textbookChapters = [
    { 
      id: 'lech101', 
      title: 'Chapter 1: Introduction to Chemistry', 
      filename: 'lech101.pdf',
      description: 'Fundamental principles and concepts in chemistry' 
    },
    { 
      id: 'lech102', 
      title: 'Chapter 2: Atomic Structure', 
      filename: 'lech102.pdf',
      description: 'Atoms, elements, and the periodic table' 
    },
    { 
      id: 'lech103', 
      title: 'Chapter 3: Chemical Bonding', 
      filename: 'lech103.pdf',
      description: 'Ionic, covalent, and metallic bonds' 
    },
    { 
      id: 'lech104', 
      title: 'Chapter 4: States of Matter', 
      filename: 'lech104.pdf',
      description: 'Properties of solids, liquids, and gases' 
    },
    { 
      id: 'lech105', 
      title: 'Chapter 5: Chemical Reactions', 
      filename: 'lech105.pdf',
      description: 'Reaction types and chemical equations' 
    },
    { 
      id: 'lech1a1', 
      title: 'Appendix A: Problem-Solving Methods', 
      filename: 'lech1a1.pdf',
      description: 'Techniques for solving chemistry problems' 
    },
    { 
      id: 'lech1an', 
      title: 'Appendix B: Formula Reference', 
      filename: 'lech1an.pdf',
      description: 'Common formulas and constants' 
    },
    { 
      id: 'lech1ps', 
      title: 'Practice Problems', 
      filename: 'lech1ps.pdf',
      description: 'Additional exercises with solutions' 
    }
  ];

  const handleSelectPdf = (chapter) => {
    // In a real application, you would load the PDF from your server
    // For now, we'll just set the name and update when we have the file handling
    setSelectedPdf(`/textbooks/${chapter.filename}`);
  };

  return (
    <div className="textbook-container">
      <div className="textbook-sidebar">
        <h2 className="textbook-title">Chemistry Textbook</h2>
        <ul className="chapter-list">
          {textbookChapters.map(chapter => (
            <li 
              key={chapter.id} 
              className={`chapter-item ${selectedPdf && selectedPdf.includes(chapter.filename) ? 'active' : ''}`}
              onClick={() => handleSelectPdf(chapter)}
            >
              <div className="chapter-icon">
                <BookOpen size={16} />
              </div>
              <div className="chapter-info">
                <h3 className="chapter-title">{chapter.title}</h3>
                <p className="chapter-description">{chapter.description}</p>
              </div>
              <ChevronRight size={16} className="chapter-chevron" />
            </li>
          ))}
        </ul>
      </div>
      
      <div className="textbook-content">
        {selectedPdf ? (
          <PDFViewer pdfFile={selectedPdf} />
        ) : (
          <div className="textbook-placeholder">
            <BookOpen size={64} className="placeholder-icon" />
            <h3>Select a chapter to start reading</h3>
            <p>Click on any chapter from the sidebar to view its content</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextbookLibrary;