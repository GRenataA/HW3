/**
 * AI-Driven Decision System – Google Sheets Logger
 * Columns: Timestamp, Review, Sentiment, Confidence, Action Taken, User ID (optional)
 * 
 * Deploy as Web App → copy /exec URL → paste into the HTML page.
 */

function doPost(e) {
  try {
    const params = e.parameter;
    
    // Open the active spreadsheet (the one this script is bound to)
    // If you want a standalone sheet, use SpreadsheetApp.openById()
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('SentimentLogs');
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet('SentimentLogs');
      // Add header row
      sheet.appendRow([
        'Timestamp',
        'Review',
        'Sentiment',
        'Confidence',
        'Action Taken',
        'User ID'      // optional, but useful
      ]);
    }
    
    // Prepare data
    const timestamp = params.ts ? new Date(Number(params.ts)) : new Date();
    const review = params.review || '';
    const sentiment = params.sentiment || '';
    const confidence = params.confidence || '';
    const actionTaken = params.action_taken || '';
    const userId = params.userId || '';
    
    // Append row
    sheet.appendRow([
      timestamp.toISOString(),
      review,
      sentiment,
      Number(confidence),
      actionTaken,
      userId
    ]);
    
    return ContentService
      .createTextOutput('OK')
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch (err) {
    // Log error to stack driver (optional)
    console.error(err);
    return ContentService
      .createTextOutput('ERROR: ' + err.message)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

// Optional: doGet to test the endpoint
function doGet() {
  return ContentService.createTextOutput('Use POST to send logs.');
}