# Quick Start: Auto-Updating Dashboard

## 5-Minute Setup

### 1. Get Your Google Sheets API Key (2 minutes)
- Go to https://console.cloud.google.com
- Search for and enable "Google Sheets API"
- Click "Create Credentials" → "API Key"
- Copy the key (looks like: `AIzaSy...`)

### 2. Find Your Sheet ID (30 seconds)
- Open your dashboard spreadsheet
- Copy the ID from the URL: `docs.google.com/spreadsheets/d/**YOUR_ID**/edit`

### 3. Connect Dashboard (1 minute)
1. Open `performance-golf-dashboard.html` in browser
2. Click **"↻ Refresh Now"** button (top right)
3. Paste your API Key when prompted
4. Paste your Sheet ID
5. Done! Dashboard will auto-update every 5 minutes

## What You'll See

✅ **Last updated: 2:34 PM** timestamp in header  
✅ Data refreshes automatically every 5 minutes  
✅ Green "Data updated successfully" notification  
✅ Manual refresh button always available  

## If You Want Google Apps Script Automation

1. Open your sheet → Extensions → Apps Script
2. Replace code with contents of `google-apps-script.gs`
3. Click "Dashboard" menu → "Setup Auto-Update"
4. Authorize when prompted
5. Script now monitors for changes and can trigger webhooks

## Troubleshooting

**"Failed to load data" error?**
- Check API key is correct
- Check Sheet ID is correct
- Verify "Google Sheets API" is enabled in Google Cloud Console

**Data not updating?**
- Check browser console for errors (F12 > Console tab)
- Try manual refresh first
- Verify your Internet connection

**Want to change refresh timing?**
- Find this line in dashboard: `REFRESH_INTERVAL: 5 * 60 * 1000`
- Change `5` to your desired minutes
- Save and refresh browser

## Files

- `performance-golf-dashboard.html` — Main dashboard (open this)
- `google-apps-script.gs` — Optional Google automation
- `data-loader.js` — Utility functions
- `DASHBOARD_SETUP.md` — Detailed setup guide

## Support

For detailed instructions, see `DASHBOARD_SETUP.md`
