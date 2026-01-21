# T&C Summarizer and Cookie Helper

A Chrome Extension powered by a local Express backend and Google Gemini AI to analyze Terms & Conditions, Privacy Policies, and Cookie Banners.

## Prerequisites

- Node.js installed.
- A Google Gemini API Key.

## Setup Backend

1. Navigate to the `backend` folder.
2. Install dependencies (if not already done):
   ```bash
   npm install
   ```
3. Open `.env` file and replace `YOUR_GEMINI_API_KEY_HERE` with your actual Gemini API Key.
4. Start the server:
   ```bash
   node server.js
   ```
   *The server runs on http://localhost:3000*

## Setup Extension

1. Open Chrome and go to `chrome://extensions`.
2. Enable **Developer Mode** (top right).
3. Click **Load unpacked**.
4. Select the `extension` folder from this project.

## Usage

1. Visit a website with Terms or a Cookie Banner.
2. Open the extension popup.
3. If a Privacy Policy or Terms link is found, click **Summarize Policy**.
4. If a Cookie Banner is detected, click **Cookie Decision**.
