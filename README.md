# Peptique Beauty PH — Google Sheets connected storefront

This package is for **Peptique Beauty PH only**. It does not touch the Pep Core Beauty website or its data.

## What is connected

- Checkout submits to your Peptique Google Sheet
- Target spreadsheet ID: `1m-J5zzUXWHPPmcRf0fllbBFYZ_YRm8tJFXlsxEb7YxI`
- Target tab: `Orders`
- Payment receipt is saved to a Google Drive folder called **Peptique Beauty Receipts**
- The receipt link is stored inside the order's **Notes** cell
- Duplicate order IDs are ignored so accidental retries do not create two rows
- The customer sees an Order Received screen only after Google Sheets confirms the save

## Orders tab headers

Row 1 must contain these exact headers:

`Order ID | Date | Customer Name | Phone | Email | Address | City / Municipality | Province | Delivery Area | Items | Subtotal | Shipping Fee | Total | Payment Method | Payment Status | Notes`

## Step 1 — add the Apps Script to the Google Sheet

1. Open your Peptique Google Sheet.
2. Go to **Extensions → Apps Script**.
3. Delete the sample `function myFunction() {}` code.
4. Open `peptique-orders-apps-script.gs` from this package and copy all of it into the Apps Script editor.
5. Click **Save**.

## Step 2 — deploy it as a Web App

1. In Apps Script, click **Deploy → New deployment**.
2. Click the gear / **Select type → Web app**.
3. Description: `Peptique Beauty Orders`.
4. **Execute as:** Me.
5. **Who has access:** Anyone.
6. Click **Deploy**. Google will ask you to authorize access to Sheets and Drive.
7. Copy the **Web app URL**. It normally ends in `/exec`.

If you edit the Apps Script later, use **Deploy → Manage deployments → Edit → New version → Deploy** so the live URL receives the update.

## Step 3 — put the Web App URL into the Peptique website

Open `app.js`. The first line is:

```js
const ORDER_ENDPOINT = "https://script.google.com/macros/s/AKfycbyB43xPTLQdnArHXLNTQHSuKToNrS5QW1Wq_zYirZMsAKvCo0ucXCcvWzoEgI_v65Wz0g/exec";
```

Replace only the placeholder with your `/exec` Web App URL, for example:

```js
const ORDER_ENDPOINT = "https://script.google.com/macros/s/EXAMPLE/exec";
```

Save `app.js`.

## Step 4 — publish the separate Peptique site

Upload all files in this folder to the **Peptique Beauty GitHub repository**, not the Pep Core repository. GitHub Pages should publish from the Peptique repo's `main` branch / root.

## Test before sharing the site

Place one small test order yourself. Confirm:

1. The website shows **Order Received** only after submission finishes.
2. A new row appears in the `Orders` tab.
3. The order number starts with `PB-`.
4. The totals and shipping fee are correct.
5. A folder named **Peptique Beauty Receipts** appears in Google Drive and the receipt link appears in Notes.

## Important inventory note

This version logs Peptique orders but does **not** deduct from the existing `Stocks` tab yet. The uploaded workbook currently contains inventory IDs/prices that do not exactly match the Peptique storefront catalog, so automatic stock deductions are intentionally disabled to avoid changing the wrong inventory rows. Once the Peptique `Stocks` tab is aligned to the website product IDs, live stock syncing can be added safely.
