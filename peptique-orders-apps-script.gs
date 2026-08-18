/**
 * PEPTIQUE BEAUTY PH — Google Sheets order endpoint
 * Separate from Pep Core Beauty.
 *
 * Spreadsheet: https://docs.google.com/spreadsheets/d/1m-J5zzUXWHPPmcRf0fllbBFYZ_YRm8tJFXlsxEb7YxI/
 * Orders tab headers expected in Row 1:
 * Order ID | Date | Customer Name | Phone | Email | Address | City / Municipality | Province |
 * Delivery Area | Items | Subtotal | Shipping Fee | Total | Payment Method | Payment Status | Notes
 */

const PEPTIQUE_SPREADSHEET_ID = '1m-J5zzUXWHPPmcRf0fllbBFYZ_YRm8tJFXlsxEb7YxI';
const ORDERS_SHEET_NAME = 'Orders';
const RECEIPT_FOLDER_NAME = 'Peptique Beauty Receipts';

function doGet() {
  return jsonResponse_({ok:true, service:'Peptique Beauty PH Orders', status:'ready'});
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    validateOrder_(body);

    const ss = SpreadsheetApp.openById(PEPTIQUE_SPREADSHEET_ID);
    const sheet = ss.getSheetByName(ORDERS_SHEET_NAME);
    if (!sheet) throw new Error('Orders tab not found. Please create a tab named exactly: Orders');

    const headers = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 16)).getDisplayValues()[0].map(h => String(h).trim());
    const requiredHeaders = ['Order ID','Date','Customer Name','Phone','Email','Address','City / Municipality','Province','Delivery Area','Items','Subtotal','Shipping Fee','Total','Payment Method','Payment Status','Notes'];
    const missing = requiredHeaders.filter(h => !headers.includes(h));
    if (missing.length) throw new Error('Missing Orders header(s): ' + missing.join(', '));

    // Duplicate protection: if the browser retries the same order, do not append it twice.
    const orderIdCol = headers.indexOf('Order ID') + 1;
    if (sheet.getLastRow() > 1) {
      const ids = sheet.getRange(2, orderIdCol, sheet.getLastRow() - 1, 1).getDisplayValues().flat();
      if (ids.includes(body.orderNumber)) return jsonResponse_({ok:true, duplicate:true, orderNumber:body.orderNumber});
    }

    let receiptUrl = '';
    if (body.receipt && body.receipt.base64) receiptUrl = saveReceipt_(body.orderNumber, body.receipt);

    const fullAddress = [body.customer.address, body.customer.barangay].filter(Boolean).join(', ');
    const deliveryArea = body.delivery.method === 'J&T'
      ? (body.delivery.region || 'J&T')
      : (body.delivery.method || '');
    const notes = [
      body.customer.landmark ? 'Landmark: ' + body.customer.landmark : '',
      body.notes ? 'Customer note: ' + body.notes : '',
      receiptUrl ? 'Receipt: ' + receiptUrl : ''
    ].filter(Boolean).join(' | ');

    const record = {
      'Order ID': body.orderNumber,
      'Date': new Date(),
      'Customer Name': body.customer.fullName || '',
      'Phone': body.customer.contact || '',
      'Email': body.customer.email || '',
      'Address': fullAddress,
      'City / Municipality': body.customer.city || '',
      'Province': body.customer.province || '',
      'Delivery Area': deliveryArea,
      'Items': body.itemsText || '',
      'Subtotal': Number(body.subtotal) || 0,
      'Shipping Fee': Number(body.delivery.shippingFee) || 0,
      'Total': Number(body.total) || 0,
      'Payment Method': body.payment.method || '',
      'Payment Status': body.payment.status || 'Paid - To verify',
      'Notes': notes
    };

    const row = headers.map(h => Object.prototype.hasOwnProperty.call(record, h) ? record[h] : '');
    sheet.appendRow(row);
    const newRow = sheet.getLastRow();
    sheet.getRange(newRow, headers.indexOf('Date') + 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
    ['Subtotal','Shipping Fee','Total'].forEach(h => {
      const c = headers.indexOf(h) + 1;
      if (c > 0) sheet.getRange(newRow, c).setNumberFormat('₱#,##0.00');
    });
    sheet.getRange(newRow, 1, 1, headers.length).setWrap(true).setVerticalAlignment('top');

    return jsonResponse_({ok:true, orderNumber:body.orderNumber, row:newRow});
  } catch (err) {
    console.error(err);
    return jsonResponse_({ok:false, message:String(err && err.message ? err.message : err)});
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

function validateOrder_(o) {
  if (!o || typeof o !== 'object') throw new Error('Invalid order payload.');
  if (!/^PB-\d{8}-[A-Z0-9]{5}$/.test(String(o.orderNumber || ''))) throw new Error('Invalid Peptique order number.');
  if (!o.customer || !String(o.customer.fullName || '').trim()) throw new Error('Customer name is required.');
  if (!String(o.customer.contact || '').trim()) throw new Error('Contact number is required.');
  if (!o.items || !Array.isArray(o.items) || !o.items.length) throw new Error('Order has no items.');
  if (!o.payment || !String(o.payment.method || '').trim()) throw new Error('Payment method is required.');
  if (!o.delivery || !String(o.delivery.method || '').trim()) throw new Error('Delivery method is required.');
  if (o.delivery.method === 'J&T' && !String(o.delivery.region || '').trim()) throw new Error('J&T destination is required.');
  if (Number(o.total) < 0 || Number(o.subtotal) < 0) throw new Error('Invalid order total.');
}

function saveReceipt_(orderNumber, receipt) {
  const bytes = Utilities.base64Decode(receipt.base64);
  if (bytes.length > 5 * 1024 * 1024) throw new Error('Receipt file is larger than 5 MB.');
  const safeName = String(receipt.name || 'receipt').replace(/[^a-zA-Z0-9._-]/g, '_');
  const blob = Utilities.newBlob(bytes, receipt.type || 'application/octet-stream', orderNumber + '-' + safeName);
  const folders = DriveApp.getFoldersByName(RECEIPT_FOLDER_NAME);
  const folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(RECEIPT_FOLDER_NAME);
  const file = folder.createFile(blob);
  return file.getUrl();
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
