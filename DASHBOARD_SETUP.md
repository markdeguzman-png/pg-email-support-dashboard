# Performance Golf Support Dashboard

## Overview
An interactive web-based dashboard for monitoring Email Support and Live Chat Specialist I performance metrics, featuring Performance Golf branding.

## Files
- `performance-golf-dashboard.html` - Main dashboard application (standalone HTML file)
- `data-loader.js` - Google Sheets data extraction utility
- This setup guide

## Features
- **Dynamic Filters**: Date range, role, and team member selection
- **Email Support Metrics**: Customers Helped, Emails/Hour, Monthly Happiness, Replies, Hub Activity
- **Live Chat Metrics**: Chat Count, Chats/Hour, CSAT Score, Replies Sent
- **Individual & Team Views**: Detailed tables with per-person performance
- **Performance Golf Branding**: Orange accent colors, professional typography

## How to Use

### Option 1: Direct File Access (Easiest)
1. Open `performance-golf-dashboard.html` in any web browser
2. The dashboard loads with sample data
3. Use filters to explore different date ranges, roles, and team members

### Option 2: Local Web Server
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if installed)
npx http-server
```
Then open: `http://localhost:8000/performance-golf-dashboard.html`

### Option 3: Connect to Google Sheets with Auto-Updates (Recommended)

#### Method A: Simple API Connection (Client-Side Polling)

This is the easiest method. Data will refresh from your Google Sheet automatically.

**Step 1: Get Google Sheets API Credentials**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable **Google Sheets API** (Search for "Sheets API" and enable it)
4. Create credentials:
   - Click "Create Credentials"
   - Choose "API Key"
   - Copy the API key
5. **Note**: This API key should be kept in a private environment. For public dashboards, use a service account instead.

**Step 2: Get Your Sheet ID**

Find your Sheet ID in the URL:
```
docs.google.com/spreadsheets/d/1REQYqoqsT1MKwLAiRqF84z95gGIWnlbMgPhl8xawdwE/edit
                              ↑ This is your SHEET_ID
```

**Step 3: Enable Auto-Updates in Dashboard**

When you open the dashboard:
1. Click the **"↻ Refresh Now"** button in the top-right
2. You'll be prompted to enter your API Key
3. Then enter your Sheet ID
4. The dashboard will automatically refresh every 5 minutes

The dashboard will:
- Show "Last updated: HH:MM" timestamp
- Auto-refresh every 5 minutes
- Let you manually refresh anytime with the button
- Save your credentials locally in the browser

#### Method B: Advanced - Google Apps Script Triggers (Server-Side)

For more reliable updates without API key exposure:

**Step 1: Add the Script**
1. Open your Google Sheet
2. Click **Extensions > Apps Script**
3. Replace the content with `google-apps-script.gs`
4. Click **Save**

**Step 2: Setup Triggers**
1. In Apps Script, click on **Dashboard > Setup Auto-Update**
2. Authorize the script when prompted
3. The script will now check for changes every 5 minutes
4. When data changes, it can notify your dashboard via webhook

**Step 3: Create a Webhook (Optional)**
If you want server-push updates instead of polling:
1. Set up a simple backend endpoint
2. Update `WEBHOOK_URL` in the Apps Script
3. The script will POST data changes to your endpoint
4. Your dashboard frontend can listen for these updates

## Data Structure

The dashboard expects data with these fields:
- `name` - Employee name
- `role` - Job role (Email Support or Live Chat Specialist I)
- `date` - Date of record (YYYY-MM-DD)
- `customersHelped` - Number of customers assisted
- `hrs` - Hours worked
- `monthlyHappiness` - Satisfaction score (0-100)
- `replies` - Number of replies sent
- `hubActNum` - Hub activity numerator
- `hubDen` - Hub activity denominator
- `conversationsRepliedTo` - Chat conversations handled
- `csatNum` - CSAT numerator
- `csatDen` - CSAT denominator
- `repliesSent` - Total replies
- `status` - Active/Inactive

## Auto-Update Features

### How It Works

**Dashboard Refresh Behavior:**
- Automatically fetches data from your Google Sheet every 5 minutes
- Shows last update timestamp in the header
- Manual "Refresh Now" button for immediate updates
- Stores API credentials in browser localStorage (for convenience)
- Shows notification when data updates successfully

### Refresh Interval

Default: **5 minutes**

To change the interval, edit the dashboard file:
```javascript
REFRESH_INTERVAL: 5 * 60 * 1000, // Change to desired milliseconds
// 1 minute:  1 * 60 * 1000
// 10 minutes: 10 * 60 * 1000
// 30 minutes: 30 * 60 * 1000
```

### Data Sync Options

| Option | Pro | Con |
|--------|-----|-----|
| **Client-Side Polling** (Recommended for most) | Simple setup, no backend needed | Uses API quota, slight delay |
| **Google Apps Script Triggers** | More reliable, change-based | Requires Apps Script setup |
| **Webhook Integration** | Real-time updates, scalable | Needs backend infrastructure |

### Security Notes

- **API Keys**: If using a public dashboard, restrict your API key to specific IPs
- **Browser Storage**: Credentials stored in `localStorage` are visible to browser extensions
- **Best Practice**: Use a service account or proxy endpoint for sensitive deployments
- For production: Never store API keys in client-side code; use a backend service

## Metrics Explained

### Email Support
- **Customers Helped**: Total number of customers assisted in period
- **Emails Per Hour**: Customers Helped ÷ Hours Worked (efficiency measure)
- **Monthly Happiness**: Average customer satisfaction (0-100 scale)
- **Total Replies**: Number of email responses sent
- **Hub Activity**: Hub_act_num ÷ Hours (activity rate per hour)

### Live Chat
- **Chat Count**: Total conversations replied to
- **Chats Per Hour**: Conversations ÷ Hours (throughput measure)
- **CSAT Score**: (csat_num ÷ csat_den) × 100 (percentage)
- **Replies Sent**: Total chat responses

## Styling & Branding

### Color Palette (Performance Golf)
- **Performance Orange**: #FD3300 (Primary action color)
- **Dark Orange**: #DB2C00 (Hover states)
- **Black**: #1D1A1A (Text)
- **UI Gray**: #7B726C (Labels)
- **Stone**: #B3AAA3 (Secondary text)
- **Pebble**: #DFD9D5 (Borders)
- **Sand**: #ECE9E4 (Light backgrounds)
- **Fog**: #F4F2F0 (Very light backgrounds)
- **Mist**: #FCFAFA (Hover backgrounds)

### Typography
- Primary: System fonts (Repro-inspired sans-serif)
- Monospace: Roboto Mono (technical details)

## Troubleshooting

**Dashboard shows "No data available"**
- Check that date range is correct
- Ensure role/name filters are not too restrictive
- Verify data is properly formatted

**Google Sheets connection fails**
- Verify API key is valid and active
- Check Sheet ID is correct
- Confirm Sheets API is enabled in Google Cloud
- Ensure sheet is shared with API credentials email

**Charts not displaying**
- Clear browser cache
- Try a different browser
- Check browser console for JavaScript errors

## Future Enhancements
- Export reports to PDF/Excel
- Historical trend charts
- Team comparison views
- Custom metric calculations
- Email notifications for performance alerts
