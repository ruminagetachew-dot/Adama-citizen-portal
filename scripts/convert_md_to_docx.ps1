# PowerShell script to convert Markdown to DOCX using Microsoft Word

$mdFile = "c:\Users\Hp\Desktop\Citizen\PRACTICAL_ATTACHMENT_REPORT.md"
$docxFile = "c:\Users\Hp\Desktop\Citizen\PRACTICAL_ATTACHMENT_REPORT.docx"

Write-Host "Converting Markdown to DOCX..." -ForegroundColor Green

try {
    # Create Word Application object
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    
    # Open the markdown file
    $doc = $word.Documents.Open($mdFile)
    
    # Save as DOCX
    $doc.SaveAs([ref]$docxFile, [ref]16)
    
    # Close document and Word
    $doc.Close()
    $word.Quit()
    
    # Release COM objects
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($doc) | Out-Null
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
    [System.GC]::Collect()
    [System.GC]::WaitForPendingFinalizers()
    
    Write-Host "Successfully converted to DOCX!" -ForegroundColor Green
    Write-Host "Location: $docxFile" -ForegroundColor Cyan
    
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Manual conversion instructions:" -ForegroundColor Yellow
    Write-Host "1. Open Microsoft Word"
    Write-Host "2. Click File then Open"
    Write-Host "3. Change file type to All Files"
    Write-Host "4. Find PRACTICAL_ATTACHMENT_REPORT.md"
    Write-Host "5. Open it"
    Write-Host "6. Click File then Save As"
    Write-Host "7. Save as DOCX format"
}
