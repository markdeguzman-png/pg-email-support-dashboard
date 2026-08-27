/**
 * Google Apps Script for Performance Golf Dashboard
 * Add this to your Google Sheet via Extensions > Apps Script
 * This automatically pushes data updates to your dashboard
 */

// Configuration
const WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE'; // From your backend or webhook service
const SHEET_NAME = 'Schedule';
const CHECK_INTERVAL_MINUTES = 5; // Check for changes every 5 minutes

// Store of last known data for change detection
function getLastDataHash() {
    const props = PropertiesService.getScriptProperties();
    return props.getProperty('lastDataHash') || '';
}

function setLastDataHash(hash) {
    const props = PropertiesService.getScriptProperties();
    props.setProperty('lastDataHash', hash);
}

// Simple hash function for data comparison
function hashData(data) {
    let str = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString();
}

// Get current sheet data
function getSheetData() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    return data;
}

// Parse sheet data to JSON
function parseSheetToJSON() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();

    if (data.length < 2) return [];

    const headers = data[0];
    const records = [];

    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (!row[0]) continue; // Skip empty rows

        records.push({
            name: row[0] || '',
            role: row[findColumn(headers, 'Role')] || '',
            date: row[findColumn(headers, 'Date')] || '',
            customersHelped: toNumber(row[findColumn(headers, 'Customers_Helped')]),
            hrs: toNumber(row[findColumn(headers, 'Hrs')]),
            monthlyHappiness: toNumber(row[findColumn(headers, 'Monthly_happiness')]),
            replies: toNumber(row[findColumn(headers, 'Replies')]),
            hubActNum: toNumber(row[findColumn(headers, 'Hub_act_num')]),
            hubDen: toNumber(row[findColumn(headers, 'Hub_den')]),
            conversationsRepliedTo: toNumber(row[findColumn(headers, 'Conversations_replied_to')]),
            csatNum: toNumber(row[findColumn(headers, 'cast_num')]),
            csatDen: toNumber(row[findColumn(headers, 'cast_den')]),
            repliesSent: toNumber(row[findColumn(headers, 'Replies_sent')]),
            status: row[findColumn(headers, 'Employment_Status')] || 'Active'
        });
    }

    return records;
}

// Find column index by header name
function findColumn(headers, name) {
    for (let i = 0; i < headers.length; i++) {
        if (String(headers[i]).toLowerCase().includes(name.toLowerCase())) {
            return i;
        }
    }
    return -1;
}

// Convert to number safely
function toNumber(val) {
    const num = parseFloat(val);
    return isNaN(num) ? 0 : num;
}

// Check for data changes and notify if changed
function checkForDataChanges() {
    try {
        const currentData = parseSheetToJSON();
        const currentHash = hashData(currentData);
        const lastHash = getLastDataHash();

        if (currentHash !== lastHash) {
            Logger.log('Data has changed! Updating...');
            setLastDataHash(currentHash);

            // Push update to webhook/backend if configured
            if (WEBHOOK_URL && WEBHOOK_URL !== 'YOUR_WEBHOOK_URL_HERE') {
                pushDataUpdate(currentData);
            }

            return true;
        }

        Logger.log('No changes detected.');
        return false;
    } catch (error) {
        Logger.log('Error checking data: ' + error);
        return false;
    }
}

// Push data to webhook
function pushDataUpdate(data) {
    try {
        const payload = {
            timestamp: new Date().toISOString(),
            sheetId: SpreadsheetApp.getActive().getId(),
            data: data
        };

        const options = {
            method: 'post',
            contentType: 'application/json',
            payload: JSON.stringify(payload),
            muteHttpExceptions: true
        };

        const response = UrlFetchApp.fetch(WEBHOOK_URL, options);
        Logger.log('Webhook response: ' + response.getResponseCode());
    } catch (error) {
        Logger.log('Error pushing data: ' + error);
    }
}

// Set up time-based trigger (run this once to enable auto-check)
function setupAutoCheck() {
    // Remove any existing triggers
    const triggers = ScriptApp.getProjectTriggers();
    for (let i = 0; i < triggers.length; i++) {
        if (triggers[i].getHandlerFunction() === 'checkForDataChanges') {
            ScriptApp.deleteTrigger(triggers[i]);
        }
    }

    // Create new trigger to run every CHECK_INTERVAL_MINUTES
    ScriptApp.newTrigger('checkForDataChanges')
        .timeBased()
        .everyMinutes(CHECK_INTERVAL_MINUTES)
        .create();

    Logger.log('Auto-check enabled! Will run every ' + CHECK_INTERVAL_MINUTES + ' minutes.');
}

// Manual trigger for testing
function testCheckForChanges() {
    checkForDataChanges();
    Logger.log('Manual check completed. See logs for results.');
}

// Export data as JSON (useful for backup)
function exportDataAsJSON() {
    const data = parseSheetToJSON();
    const blob = Utilities.newBlob(JSON.stringify(data, null, 2), 'application/json', 'dashboard-data.json');
    const folder = DriveApp.createFolder('Dashboard Exports-' + new Date().getTime());
    folder.createFile(blob);
    Logger.log('Data exported to: ' + folder.getUrl());
    return data;
}

// Get current data (useful for debugging)
function getCurrentData() {
    const data = parseSheetToJSON();
    Logger.log(JSON.stringify(data, null, 2));
    return data;
}

// Install this menu in the spreadsheet
function onOpen() {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('Dashboard')
        .addItem('Setup Auto-Update', 'setupAutoCheck')
        .addItem('Check for Changes Now', 'testCheckForChanges')
        .addItem('Export Data as JSON', 'exportDataAsJSON')
        .addItem('View Current Data', 'getCurrentData')
        .addToUi();
}
