const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle } = require('docx');

// Read markdown content
const mdPath = path.join(__dirname, '..', 'Project_Proposal_Web_Based_Citizen_Complaint_and_Service_Request.md');
const mdContent = fs.readFileSync(mdPath, 'utf-8');

const doc = new Document({
  sections: [{
    properties: {},
    children: [
      // Title Page
      new Paragraph({
        text: "PROJECT PROPOSAL",
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 }
      }),
      new Paragraph({
        text: "Web-Based Citizen Complaint Management System for Adama City Administration",
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 }
      }),
      new Paragraph({ text: "", spacing: { after: 200 } }),
      new Paragraph({
        text: "HARAMAYA UNIVERSITY",
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 }
      }),
      new Paragraph({
        text: "COLLEGE OF COMPUTING AND INFORMATICS",
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 }
      }),
      new Paragraph({
        text: "DEPARTMENT OF INFORMATION SCIENCE",
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 }
      }),
      new Paragraph({ text: "", spacing: { after: 400 } }),
      new Paragraph({
        text: "Haramaya, Ethiopia",
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 }
      }),
    ]
  }]
});

console.log('Creating DOCX document...');
console.log('This is a simplified version. For full formatting, the HTML file can be opened in Word.');

Packer.toBuffer(doc).then(buffer => {
  const docxPath = path.join(__dirname, '..', 'Project_Proposal_Simple.docx');
  fs.writeFileSync(docxPath, buffer);
  console.log('✅ Simple DOCX created:', docxPath);
  console.log('\n📝 RECOMMENDED: Use the HTML file for complete formatting:');
  console.log('   1. Open: Project_Proposal_Web_Based_Citizen_Complaint_and_Service_Request.html');
  console.log('   2. Press Ctrl+P (Print)');
  console.log('   3. Select "Microsoft Print to PDF" or "Save as PDF"');
  console.log('   4. Or open HTML in Word and Save As DOCX');
}).catch(err => {
  console.error('Error:', err.message);
});
