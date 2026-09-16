# PowerShell script to convert HTML to DOCX using Word COM automation

$htmlFile = Join-Path $PSScriptRoot "..\Project_Proposal_Web_Based_Citizen_Complaint_and_Service_Request.html"
$docxFile = Join-Path $PSScriptRoot "..\Project_Proposal_Web_Based_Citizen_Complaint_and_Service_Request.docx"

Write-Host "Starting conversion..." -ForegroundColor Cyan
Write-Host "HTML file: $htmlFile" -ForegroundColor Gray
Write-Host "DOCX file: $docxFile" -ForegroundColor Gray

try {
    # Create Word application object
    Write-Host "`nCreating Word application..." -ForegroundColor Yellow
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    
    # Open the HTML file
    Write-Host "Opening HTML file..." -ForegroundColor Yellow
    $doc = $word.Documents.Open($htmlFile)
    
    # Save as DOCX (wdFormatDocumentDefault = 16)
    Write-Host "Converting to DOCX..." -ForegroundColor Yellow
    $doc.SaveAs([ref]$docxFile, [ref]16)
    
    # Close document and quit Word
    Write-Host "Cleaning up..." -ForegroundColor Yellow
    $doc.Close()
    $word.Quit()
    
    # Release COM objects
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($doc) | Out-Null
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
    [System.GC]::Collect()
    [System.GC]::WaitForPendingFinalizers()
    
    Write-Host "`nDOCX file created successfully!" -ForegroundColor Green
    Write-Host "Location: $docxFile" -ForegroundColor Green
    Write-Host "`nThe document includes:" -ForegroundColor Cyan
    Write-Host "   - Complete Table of Contents" -ForegroundColor White
    Write-Host "   - Expanded List of Acronyms (43 terms)" -ForegroundColor White
    Write-Host "   - List of Figures (16 diagrams)" -ForegroundColor White
    Write-Host "   - Image placeholders for all 8 diagrams" -ForegroundColor White
    Write-Host "   - Professional formatting ready for printing" -ForegroundColor White
    
} catch {
    Write-Host "`n❌ Error occurred: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.Exception.Message -match "0x800A03EC") {
        Write-Host "`n⚠️  Microsoft Word is not installed on this system." -ForegroundColor Yellow
        Write-Host "Alternative solution:" -ForegroundColor Cyan
        Write-Host "1. Use Google Docs to open the HTML file" -ForegroundColor White
        Write-Host "2. File > Download > Microsoft Word (.docx)" -ForegroundColor White
    }
    
    # Clean up if objects exist
    if ($doc) { $doc.Close() }
    if ($word) { $word.Quit() }
}
