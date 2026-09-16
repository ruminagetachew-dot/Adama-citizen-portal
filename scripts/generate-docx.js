const fs = require('fs');
const path = require('path');
const officegen = require('officegen');

// Read markdown content
const mdPath = path.join(__dirname, '..', 'Project_Proposal_Web_Based_Citizen_Complaint_and_Service_Request.md');
const mdContent = fs.readFileSync(mdPath, 'utf-8');

// Create Word document
const docx = officegen('docx');

// Set document properties
docx.setDocTitle('Web-Based Citizen Complaint Management System');
docx.setDocSubject('Project Proposal for Haramaya University');
docx.setDocKeywords('citizen complaint, e-governance, Adama City, MERN stack');
docx.setDescription('Project proposal for implementing a web-based complaint management system');

// Output file path
const outputPath = path.join(__dirname, '..', 'Project_Proposal_Web_Based_Citizen_Complaint_and_Service_Request.docx');
const out = fs.createWriteStream(outputPath);

// Handle completion
out.on('close', function() {
  console.log('\n==============================================');
  console.log('SUCCESS! DOCX file created successfully!');
  console.log('==============================================');
  console.log('Location:', outputPath);
  console.log('\nDocument includes:');
  console.log('- Complete Table of Contents');
  console.log('- Expanded List of Acronyms (43 terms)');
  console.log('- List of Figures (16 diagrams)');
  console.log('- Image placeholders for all diagrams');
  console.log('- Professional formatting');
  console.log('==============================================\n');
});

// Handle errors
docx.on('error', function(err) {
  console.error('Error:', err);
});

// Parse markdown and add to document
const lines = mdContent.split('\n');
let currentTable = [];
let inCodeBlock = false;
let codeBlockContent = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Handle code blocks
  if (line.startsWith('```')) {
    if (inCodeBlock) {
      // End code block
      const pObj = docx.createP();
      pObj.addText(codeBlockContent.join('\n'), {
        font_face: 'Courier New',
        font_size: 10,
        color: '333333'
      });
      codeBlockContent = [];
      inCodeBlock = false;
    } else {
      // Start code block
      inCodeBlock = true;
    }
    continue;
  }
  
  if (inCodeBlock) {
    codeBlockContent.push(line);
    continue;
  }
  
  // Handle tables
  if (line.includes('|') && !line.startsWith('#')) {
    if (line.includes('---')) continue; // Skip separator line
    
    const cells = line.split('|').filter(cell => cell.trim());
    if (cells.length > 0) {
      currentTable.push(cells);
    }
    
    // Check if next line is not a table
    if (i + 1 < lines.length && !lines[i + 1].includes('|')) {
      if (currentTable.length > 0) {
        const table = docx.createTable(currentTable.length, currentTable[0].length);
        for (let row = 0; row < currentTable.length; row++) {
          for (let col = 0; col < currentTable[row].length; col++) {
            table.getCell(row, col).addText(currentTable[row][col].trim());
          }
        }
        currentTable = [];
      }
    }
    continue;
  }
  
  // Handle headers
  if (line.startsWith('# ')) {
    const pObj = docx.createP();
    pObj.addText(line.replace('# ', ''), {
      font_size: 18,
      bold: true,
      align: 'center'
    });
    pObj.addLineBreak();
  } else if (line.startsWith('## ')) {
    const pObj = docx.createP();
    pObj.addText(line.replace('## ', ''), {
      font_size: 16,
      bold: true
    });
    pObj.addLineBreak();
  } else if (line.startsWith('### ')) {
    const pObj = docx.createP();
    pObj.addText(line.replace('### ', ''), {
      font_size: 14,
      bold: true
    });
  } else if (line.startsWith('#### ')) {
    const pObj = docx.createP();
    pObj.addText(line.replace('#### ', ''), {
      font_size: 12,
      bold: true
    });
  } else if (line.trim() === '---') {
    docx.createP().addLineBreak();
  } else if (line.startsWith('![')) {
    // Image placeholder
    const match = line.match(/!\[(.*?)\]\((.*?)\)/);
    if (match) {
      const pObj = docx.createP();
      pObj.addText(`[Image Placeholder: ${match[1]}]`, {
        color: '0066cc',
        italic: true
      });
      pObj.addLineBreak();
      pObj.addText(`File: ${match[2]}`, {
        font_size: 10,
        color: '666666'
      });
      pObj.addLineBreak();
    }
  } else if (line.trim().startsWith('*') && !line.includes('**')) {
    // Italic text
    const pObj = docx.createP();
    pObj.addText(line.replace(/\*/g, ''), {
      italic: true,
      color: '666666',
      font_size: 11
    });
  } else if (line.trim() !== '') {
    // Regular paragraph
    const pObj = docx.createP();
    
    // Handle bold text
    let text = line;
    const boldMatches = text.match(/\*\*(.*?)\*\*/g);
    if (boldMatches) {
      const parts = text.split(/\*\*(.*?)\*\*/);
      for (let j = 0; j < parts.length; j++) {
        if (j % 2 === 0) {
          if (parts[j]) pObj.addText(parts[j]);
        } else {
          pObj.addText(parts[j], { bold: true });
        }
      }
    } else {
      pObj.addText(text);
    }
  } else {
    // Empty line
    docx.createP().addLineBreak();
  }
}

// Generate the Word document
docx.generate(out);

console.log('Generating DOCX file...');
console.log('Please wait...\n');
