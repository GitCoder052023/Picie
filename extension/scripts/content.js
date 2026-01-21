console.log("T&C Summarizer Content Script Loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scanPage") {
        const legalLinks = findLegalLinks();
        const cookieData = scanForCookieBanner();

        sendResponse({
            legalLinks: legalLinks,
            cookieData: cookieData,
            pageUrl: window.location.href
        });
    }
    return true; // Keep channel open for async response
});

function findLegalLinks() {
    const links = Array.from(document.querySelectorAll('a'));
    const found = {
        privacy: null,
        terms: null
    };

    for (const link of links) {
        const text = link.innerText.toLowerCase().trim();
        const href = link.href;

        if (!href || href.startsWith('javascript') || href.startsWith('#')) continue;

        // Prioritize exact matches or strong keywords
        if (!found.privacy && (text === 'privacy policy' || text.includes('privacy notice'))) {
            found.privacy = href;
        } else if (!found.privacy && text.includes('privacy')) {
            found.privacy = href;
        }

        if (!found.terms && (text === 'terms of service' || text === 'terms & conditions' || text === 'terms of use')) {
            found.terms = href;
        } else if (!found.terms && (text.includes('terms') && text.includes('condition'))) {
            found.terms = href;
        }
    }

    return found;
}

function scanForCookieBanner() {
    // 1. Look for common ID/Class names
    const commonSelectors = [
        '#onetrust-banner-sdk',
        '.cookie-banner',
        '#cookie-consent',
        '.cc-window',
        '[aria-label="cookieconsent"]'
    ];

    for (const sel of commonSelectors) {
        const el = document.querySelector(sel);
        if (el && el.innerText.length > 20) {
            return { detected: true, text: el.innerText.substring(0, 2000) };
        }
    }

    // 2. Heuristic scan for fixed position elements containing "cookie"
    const candidates = document.querySelectorAll('div, section, aside, footer');
    for (const el of candidates) {
        if (el.innerText.length > 2000 || el.innerText.length < 20) continue;

        const style = window.getComputedStyle(el);
        if (style.position === 'fixed' || style.position === 'sticky') {
            const text = el.innerText.toLowerCase();
            if (text.includes('cookie') && (text.includes('accept') || text.includes('agree') || text.includes('consent'))) {
                return { detected: true, text: el.innerText };
            }
        }
    }

    return { detected: false, text: null };
}
