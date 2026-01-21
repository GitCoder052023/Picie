const API_BASE = 'https://picie.vercel.app/api';

document.addEventListener('DOMContentLoaded', () => {
    const statusTnc = document.getElementById('tnc-status');
    const statusCookie = document.getElementById('cookie-status');
    const btnSummarize = document.getElementById('summarize-btn');
    const btnCookies = document.getElementById('analyze-cookies-btn');
    const resultArea = document.getElementById('result-text');
    const outputPanel = document.getElementById('output-panel');
    const loader = document.getElementById('loader');

    let pageData = null;

    // Scan page on load
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0].id) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "scanPage" }, (response) => {
                if (chrome.runtime.lastError) {
                    resultArea.innerText = "Error scanning page. Reload website and try again.";
                    outputPanel.classList.remove('hidden');
                    return;
                }

                if (response) {
                    pageData = response;
                    updateUI(response);
                }
            });
        }
    });

    function updateUI(data) {
        // Update T&C Status
        if (data.legalLinks.terms || data.legalLinks.privacy) {
            statusTnc.textContent = "Detected";
            statusTnc.classList.remove('bad');
            statusTnc.classList.add('good');
            btnSummarize.disabled = false;
        }

        // Update Cookie Status
        if (data.cookieData.detected) {
            statusCookie.textContent = "Banner Detected";
            statusCookie.classList.remove('bad');
            statusCookie.classList.add('good');
            btnCookies.disabled = false;
        } else {
            // Even if no banner, if there's a policy link, we can analyze the policy
            // We might want to allow checking policy even if banner not found
            // For now, only enable if banner OR policy found (logic enhancement)
            // ...
        }
    }

    btnSummarize.addEventListener('click', async () => {
        const url = pageData.legalLinks.terms || pageData.legalLinks.privacy;
        if (!url) return;

        showLoader(true);
        try {
            const res = await fetch(`${API_BASE}/summarize-tnc`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, type: 'terms' })
            });
            const result = await res.json();

            if (result.success && result.data) {
                displayResult(formatMarkdown(result.data.summary));
            } else {
                displayResult(result.error || "Unknown error occurred");
            }
        } catch (err) {
            displayResult("Error connecting to backend: " + err.message);
        } finally {
            showLoader(false);
        }
    });

    btnCookies.addEventListener('click', async () => {
        showLoader(true);
        try {
            const policyUrl = pageData.legalLinks.privacy; // Heuristic: Cookie policy often linked near privacy
            const bannerText = pageData.cookieData.text;

            const res = await fetch(`${API_BASE}/analyze-cookie`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    policyUrl,
                    bannerText,
                    pageUrl: pageData.pageUrl
                })
            });
            const result = await res.json();

            if (result.success && result.data) {
                displayResult(formatMarkdown(result.data.decision));
            } else {
                displayResult(result.error || "Unknown error occurred");
            }
        } catch (err) {
            displayResult("Error connecting to backend: " + err.message);
        } finally {
            showLoader(false);
        }
    });

    function showLoader(show) {
        if (show) {
            outputPanel.classList.remove('hidden');
            loader.classList.remove('hidden');
            resultArea.innerHTML = "";
        } else {
            loader.classList.add('hidden');
        }
    }

    function displayResult(html) {
        resultArea.innerHTML = html;
    }

    function formatMarkdown(text) {
        if (!text) return "";
        // Simple replacement for markdown bolding/bullets since we can't use external lib easily in popup without bundling
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n\*/g, '<br>•')
            .replace(/\n/g, '<br>');
    }
});
