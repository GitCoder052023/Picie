import axios from 'axios';
import * as cheerio from 'cheerio';
import { htmlToText } from 'html-to-text';
import { logger } from '../utils/logger';

export class ScraperService {
    /**
     * Fetches URL content and extracts clean text.
     */
    async fetchPageContent(url: string): Promise<string> {
        try {
            logger.info(`[Scraper] Fetching content for: ${url}`);

            const { data } = await axios.get(url, {
                timeout: 15000,
                headers: {
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                },
                maxRedirects: 5,
            });

            const $ = cheerio.load(data);

            // Aggressive cleaning to remove noise
            $('script, style, iframe, svg, nav, footer, header, aside, .ad, .advertisement, .cookie-banner, #onetrust-banner-sdk').remove();

            const text = htmlToText($.html(), {
                wordwrap: false,
                selectors: [
                    { selector: 'a', options: { ignoreHref: true } },
                    { selector: 'img', format: 'skip' },
                ],
            });

            // Limit characters to avoid token limit overflow (Gemini 1.5 has huge window but good to be sane)
            const cleanText = text.substring(0, 100000);

            if (cleanText.length < 100) {
                throw new Error("Extracted text is too short. Page might be behind a login or bot protection.");
            }

            return cleanText;

        } catch (error: any) {
            logger.error(`[Scraper] Failed to fetch ${url}: ${error.message}`);
            throw new Error(`Failed to fetch content from provided URL: ${error.message}`);
        }
    }
}

export const scraperService = new ScraperService();
