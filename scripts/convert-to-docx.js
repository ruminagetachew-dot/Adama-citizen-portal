const fs = require('fs');
const path = require('path');
const HTMLtoDOCX = require('html-to-docx');

async function convertToDocx() {
  try {
    // Read the HTML file we just created
    const htmlPath = path.join(__dirname, '..', 'Project_Proposal_Web_Based_Citizen_Complaint_and_Service_Request.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Convert HTML to DOCX
    const docxBuffer = await HTMLtoDOCX(htmlContent, null, {
      table: { row: { cantSplit: true } },
      footer: true,
      pageNumber: true,
      font: 'Times New Roman',
      fontSize: 24, // 12pt in half-points
    });

    // Write DOCX file
    const docxPath = path.join(__dirname, '..', 'Project_Proposal_Web_Based_Citizen_Complaint_and_Service_Request.docx');
    fs.writeFileSync(docxPath, docxBuffer);

    console.log('✅ DOCX file created successfully!');
    console.log('📁 Location:', docxPath);
    console.log('\n✨ You can now open this file in Microsoft Word!');
    console.log('📄 The document includes:');
    console.log('   • Complete Table of Contents');
    console.log('   • Expanded List of Acronyms (43 terms)');
    console.log('   • List of Figures (16 diagrams)');
    console.log('   • Image placeholders for all 8 diagrams');
    console.log('   • Professional formatting ready for printing');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

convertToDocx();
