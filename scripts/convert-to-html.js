const fs = require('fs');
const path = require('path');

// Read the markdown file
const mdPath = path.join(__dirname, '..', 'Project_Proposal_Web_Based_Citizen_Complaint_and_Service_Request.md');
const mdContent = fs.readFileSync(mdPath, 'utf-8');

// Simple markdown to HTML conversion
function markdownToHTML(md) {
  let html = md;
  
  // Convert headers
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  
  // Convert bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Convert italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Convert images
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<p><img src="$2" alt="$1" style="max-width:100%; height:auto; border:1px solid #ccc; margin:10px 0;"/><br/><em>Figure: $1</em></p>');
  
  // Convert links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  
  // Convert code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre style="background:#f5f5f5; padding:15px; border:1px solid #ddd; overflow-x:auto;"><code>$1</code></pre>');
  
  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code style="background:#f5f5f5; padding:2px 5px;">$1</code>');
  
  // Convert tables
  html = html.replace(/\n\|(.+)\|\n\|[-:\| ]+\|\n((?:\|.+\|\n?)+)/g, function(match, header, body) {
    const headers = header.split('|').filter(h => h.trim()).map(h => `<th>${h.trim()}</th>`).join('');
    const rows = body.trim().split('\n').map(row => {
      const cells = row.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('');
      return `<tr>${cells}</tr>`;
    }).join('');
    return `<table style="border-collapse:collapse; width:100%; margin:20px 0;"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
  });
  
  // Convert horizontal rules
  html = html.replace(/^---$/gim, '<hr style="margin:30px 0; border:none; border-top:2px solid #333;"/>');
  
  // Convert line breaks to paragraphs
  html = html.split('\n\n').map(para => {
    if (para.trim() && !para.startsWith('<') && !para.includes('</')) {
      return `<p>${para}</p>`;
    }
    return para;
  }).join('\n');
  
  return html;
}

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project Proposal - Adama City Complaint Management System</title>
  <style>
    @page {
      size: A4;
      margin: 2.5cm;
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt;
      line-height: 1.6;
      max-width: 21cm;
      margin: 0 auto;
      padding: 2cm;
      background: white;
      color: #000;
    }
    h1 {
      font-size: 18pt;
      font-weight: bold;
      margin: 30px 0 15px 0;
      page-break-after: avoid;
      text-align: center;
    }
    h2 {
      font-size: 16pt;
      font-weight: bold;
      margin: 25px 0 12px 0;
      page-break-after: avoid;
    }
    h3 {
      font-size: 14pt;
      font-weight: bold;
      margin: 20px 0 10px 0;
      page-break-after: avoid;
    }
    h4 {
      font-size: 12pt;
      font-weight: bold;
      margin: 15px 0 8px 0;
      page-break-after: avoid;
    }
    p {
      margin: 10px 0;
      text-align: justify;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 20px 0;
      page-break-inside: avoid;
    }
    th, td {
      border: 1px solid #000;
      padding: 8px 12px;
      text-align: left;
    }
    th {
      background-color: #f0f0f0;
      font-weight: bold;
    }
    pre {
      background: #f5f5f5;
      padding: 15px;
      border: 1px solid #ddd;
      overflow-x: auto;
      page-break-inside: avoid;
      font-family: 'Courier New', monospace;
      font-size: 10pt;
    }
    code {
      font-family: 'Courier New', monospace;
      font-size: 10pt;
    }
    hr {
      margin: 30px 0;
      border: none;
      border-top: 2px solid #333;
    }
    img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 20px auto;
      border: 1px solid #ccc;
    }
    .page-break {
      page-break-after: always;
    }
    @media print {
      body {
        padding: 0;
      }
    }
  </style>
</head>
<body>
${markdownToHTML(mdContent)}
</body>
</html>`;

// Write HTML file
const htmlPath = path.join(__dirname, '..', 'Project_Proposal_Web_Based_Citizen_Complaint_and_Service_Request.html');
fs.writeFileSync(htmlPath, htmlContent, 'utf-8');

console.log('✅ HTML file created successfully!');
console.log('📁 Location:', htmlPath);
console.log('\n📝 To convert to DOCX:');
console.log('   1. Open the HTML file in Microsoft Word');
console.log('   2. Click File > Save As');
console.log('   3. Choose "Word Document (*.docx)" as the file type');
console.log('   4. Click Save');
