/**
 * Data Loader for Performance Golf Dashboard
 * This script extracts data from Google Sheets and converts to JSON format
 */

async function fetchGoogleSheetData(sheetId, sheetName = 'Schedule') {
    // This function loads data from Google Sheets via the Sheets API
    // You'll need to:
    // 1. Set up Google Sheets API credentials
    // 2. Share the sheet with your service account
    // 3. Update the API_KEY and SHEET_ID below

    const API_KEY = 'YOUR_GOOGLE_SHEETS_API_KEY'; // Replace with your API key
    const RANGE = `${sheetName}!A:U`; // All columns A through U

    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${RANGE}?key=${API_KEY}`
        );

        if (!response.ok) throw new Error('Failed to fetch data');

        const result = await response.json();
        return parseSheetData(result.values);
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

function parseSheetData(rows) {
    if (!rows || rows.length < 2) return [];

    const headers = rows[0];
    const columnMap = {
        name: findColumn(headers, ['Name', 'Employee', 'Team Member']),
        role: findColumn(headers, ['Role', 'Position']),
        date: findColumn(headers, ['Date']),
        customersHelped: findColumn(headers, ['Customers_Helped']),
        hrs: findColumn(headers, ['Hrs']),
        monthlyHappiness: findColumn(headers, ['Monthly_happiness']),
        replies: findColumn(headers, ['Replies']),
        hubActNum: findColumn(headers, ['Hub_act_num']),
        hubDen: findColumn(headers, ['Hub_den']),
        conversationsRepliedTo: findColumn(headers, ['Conversations_replied_to']),
        csatNum: findColumn(headers, ['cast_num']),
        csatDen: findColumn(headers, ['cast_den']),
        repliesSent: findColumn(headers, ['Replies_sent']),
        status: findColumn(headers, ['Employment_Status'])
    };

    return rows.slice(1)
        .filter(row => row.length > 0 && row[0])
        .map((row, idx) => ({
            id: idx,
            name: getCell(row, columnMap.name, `Employee ${idx + 1}`),
            role: getCell(row, columnMap.role, 'Email Support'),
            date: getCell(row, columnMap.date, new Date().toISOString().split('T')[0]),
            customersHelped: getNumeric(row, columnMap.customersHelped),
            hrs: getNumeric(row, columnMap.hrs),
            monthlyHappiness: getNumeric(row, columnMap.monthlyHappiness),
            replies: getNumeric(row, columnMap.replies),
            hubActNum: getNumeric(row, columnMap.hubActNum),
            hubDen: getNumeric(row, columnMap.hubDen),
            conversationsRepliedTo: getNumeric(row, columnMap.conversationsRepliedTo),
            csatNum: getNumeric(row, columnMap.csatNum),
            csatDen: getNumeric(row, columnMap.csatDen),
            repliesSent: getNumeric(row, columnMap.repliesSent),
            status: getCell(row, columnMap.status, 'Active')
        }));
}

function findColumn(headers, aliases) {
    for (let i = 0; i < headers.length; i++) {
        for (let alias of aliases) {
            if (headers[i].toLowerCase().includes(alias.toLowerCase())) {
                return i;
            }
        }
    }
    return -1;
}

function getCell(row, columnIndex, defaultValue = '') {
    return columnIndex >= 0 && columnIndex < row.length ? row[columnIndex] : defaultValue;
}

function getNumeric(row, columnIndex, defaultValue = 0) {
    const value = getCell(row, columnIndex);
    const num = parseFloat(value);
    return isNaN(num) ? defaultValue : num;
}

// Export data from Google Sheets
async function exportDashboardData(sheetId) {
    const data = await fetchGoogleSheetData(sheetId);
    console.log('Exported Data:', JSON.stringify(data, null, 2));
    return data;
}

// For use in Node.js or browser console
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { fetchGoogleSheetData, parseSheetData, exportDashboardData };
}
