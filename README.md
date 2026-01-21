<div align="center">

# 🥧 Picie
### Intelligent Legal Assistant for the Web

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini-8E75B2)](https://deepmind.google/technologies/gemini/)

**Picie** ("Pie-see") makes the web's fine print digestible. It is an open-source browser extension that uses Google's advanced Gemini AI to summarize complex Terms & Conditions, Privacy Policies, and intelligently handles Cookie Consent pop-ups.

[Features](#features) •
[Architecture](#architecture) •
[Getting Started](#getting-started) •
[Contributing](#contributing) •
[License](#license)

</div>

---

## ✨ Features

- **📜 One-Click Summaries**: Instantly condense lengthy Terms of Service and Privacy Policies into easy-to-read "TL;DR" points.
- **🍪 Smart Cookie Management**: Automatically detects cookie consent pop-ups and suggests decisions based on your privacy preferences.
- **🤖 AI-Powered**: Leverages the power of Google Gemini 2.0 (and related models) for high-accuracy text analysis and reasoning.
- **🔒 Privacy First**: Your data stays yours. The extension analyzes text locally or via your personal API proxy, ensuring transparency.

## 🏗 Architecture

Picie consists of two main components:

1.  **Chrome Extension**: A Manifest V3 extension that interacts with web pages to extract text and display insights. Built with Vanilla JS, HTML, and CSS for lightweight performance.
2.  **Backend API**: A robust Node.js/Express application written in **TypeScript**. It acts as the bridge between the extension and the Google Gemini API, handling rate limits, prompt engineering, and response formatting.

## 🚀 Getting Started

### Prerequisites

-   **Node.js** (v18 or higher)
-   **npm** or **yarn**
-   A **Google Gemini API Key** (Get one at [Google AI Studio](https://aistudio.google.com/))

### 1. Backend Setup

The backend handles the AI processing.

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
# (Create a .env file based on the example below)
```

**Create a `.env` file in the `backend` root:**

```env
GEMINI_API_KEY=your_actual_api_key_here
PORT=3000
```

**Run the Server:**

```bash
# Development mode (with hot-reload)
npm run dev

# Production build
npm run build
npm start
```
*Server will start on `http://localhost:3000`*

### 2. Extension Setup

Load the extension into your browser.

1.  Open Chrome (or any Chromium browser like Edge/Brave).
2.  Navigate to `chrome://extensions`.
3.  Toggle **Developer Mode** in the top right corner.
4.  Click **Load unpacked**.
5.  Select the `extension` folder from this project directory.
6.  Pin the extension icon for easy access!

## 🤝 Contributing

We welcome contributions from the community! Whether it's adding support for more legal document types, improving the UI, or optimizing the AI prompts, your help is appreciated.

1.  **Fork** the repository.
2.  **Clone** your fork: `git clone https://github.com/your-username/Picie.git`
3.  **Create a branch**: `git checkout -b feature/amazing-feature`
4.  **Commit** your changes.
5.  **Push** to the branch.
6.  Open a **Pull Request**.

## 📄 License

This project is licensed under the **MIT License**. You are free to use, modify, and distribute this software. See the [LICENSE](LICENSE) file for more details.

---

<div align="center">
Made with ❤️ by the Open Source Community
</div>
