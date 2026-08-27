# Performance Golf Email Support Dashboard

Professional web-based dashboard for monitoring Email Support and Live Chat team performance metrics in real-time.

## Features

- 📊 **Real-time Metrics**: Customers Helped, Emails/Hour, Happiness Scores, Hub Activity
- 💬 **Chat Analytics**: Chat Count, Chats/Hour, CSAT Scores, Replies Sent
- 👥 **Employee Performance**: Individual and team-level metrics
- 📈 **Performance Trends**: Historical data visualization and trends
- 🔄 **Auto-Refresh**: Updates every 5 minutes from Google Sheets
- 🎨 **Professional Design**: Performance Golf branded dark theme
- 📱 **Responsive**: Works on desktop and tablet devices

## Quick Start

### Option 1: View Dashboard Locally
1. Open `index.html` in your web browser
2. Click "Setup API" button
3. Enter your Google Sheets API Key
4. Dashboard loads sample data and auto-refreshes every 5 minutes

### Option 2: Deploy to Web
1. Host files on any web server (GitHub Pages, Vercel, Netlify, etc.)
2. Open the hosted `index.html` in browser
3. Add your API credentials

## Setup Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable "Google Sheets API"
3. Create API Key (Credentials > API Key)
4. Click "Setup API" in dashboard and paste your key

**Sheet ID**: `1REQYqoqsT1MKwLAiRqF84z95gGIWnlbMgPhl8xawdwE`

## Files

- **index.html** - Main dashboard application (v2 - recommended)
- **performance-golf-dashboard.html** - Alternative simpler version
- **data-loader.js** - Google Sheets data extraction utility
- **google-apps-script.gs** - Google Sheets automation script
- **QUICK_START.md** - 5-minute setup guide
- **DASHBOARD_SETUP.md** - Comprehensive setup documentation

## Data Source

Connects to Google Sheet: `Email Support Dashboard 2026`

**Schedule Tab Columns**:
- Replies, Customers_Helped, Daily/Monthly_happiness
- Conversations_assigned, Conversations_replied_to, Replies_sent
- Hours, Hub_activity, Employment_Status
- Start/End times, Employee names and roles

## Metrics Explained

### Email Support
- **Customers Helped**: Total number of customers assisted
- **Emails Per Hour**: Efficiency metric (Customers ÷ Hours)
- **Monthly Happiness**: Average customer satisfaction (0-100)
- **Hub Activity**: Activity rate per hour worked

### Live Chat
- **Chat Count**: Total conversations replied to
- **Chats Per Hour**: Throughput metric
- **CSAT Score**: Customer satisfaction percentage
- **Replies Sent**: Total chat responses

## Technology

- HTML5 + CSS3 + Vanilla JavaScript
- Google Sheets API v4
- Chart.js for visualizations
- No external dependencies required

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Golf Branding

- Primary Color: #FD3300 (Performance Orange)
- Dark Theme: #1D1A1A (Black)
- Typography: System fonts (Repro-inspired)

## Support

For setup help, see `QUICK_START.md` or `DASHBOARD_SETUP.md`

---

Built with Performance Golf | Dashboard v2.0
