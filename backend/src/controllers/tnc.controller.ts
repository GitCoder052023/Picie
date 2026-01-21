import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { geminiService } from '../services/gemini.service';
import { scraperService } from '../services/scraper.service';
import { logger } from '../utils/logger';

// Zod schemas for validation
const SummarizeRequestSchema = z.object({
    url: z.string().url("Invalid URL format"),
    type: z.enum(['terms', 'privacy']).optional().default('terms'),
});

const CookieAnalysisRequestSchema = z.object({
    policyUrl: z.string().url().optional().nullable(),
    bannerText: z.string().optional().nullable(),
    pageUrl: z.string().url(),
}).refine(data => data.policyUrl || data.bannerText, {
    message: "Either policyUrl or bannerText must be provided",
});

export class TncController {

    async summarize(req: Request, res: Response, next: NextFunction) {
        try {
            const { url, type } = SummarizeRequestSchema.parse(req.body);

            logger.info(`Processing summary request for ${url} (${type})`);

            const content = await scraperService.fetchPageContent(url);

            const prompt = `
      You are a specialized legal AI assistant.
      Task: Summarize the following ${type === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'}.
      
      Requirements:
      1. Identification: Explicitly identify who the service provider is.
      2. Key Clauses: Extract critical points about user data ownership, termination, liabilities, and fees.
      3. Red Flags: Highlight any aggressive, unfair, or unusual clauses in a "⚠️ Warnings" section.
      4. Format: Use clear markdown with bullet points. keep it concise but comprehensive.

      Document Text:
      ${content}
      `;

            const summary = await geminiService.generateContent(prompt, "You are a legal summarizer helper.");

            res.json({
                success: true,
                data: { summary }
            });

        } catch (error) {
            next(error);
        }
    }

    async analyzeCookie(req: Request, res: Response, next: NextFunction) {
        try {
            const { policyUrl, bannerText, pageUrl } = CookieAnalysisRequestSchema.parse(req.body);

            let contextText = `User is visiting: ${pageUrl}\n`;

            if (bannerText) {
                contextText += `\n[Cookie Banner Text]:\n${bannerText}\n`;
            }

            if (policyUrl) {
                try {
                    const policyContent = await scraperService.fetchPageContent(policyUrl);
                    contextText += `\n[Privacy/Cookie Policy Excerpt]:\n${policyContent.substring(0, 15000)}\n`;
                } catch (err) {
                    logger.warn(`Could not fetch policy for cookie analysis: ${policyUrl}`);
                }
            }

            const prompt = `
      Act as a Privacy Advocate Agent.
      Analyze the provided Cookie Banner and/or Policy text.
      
      Goal: Advise the user on the SAFEST choice for their privacy.
      
      Output Structure:
      1. **Recommendation**: "Reject All", "Accept Necessary Only", or "Customize" (and what to uncheck).
      2. **Analysis**: Briefly explain what data they are trying to collect (Tracking, Third-party specific, etc.).
      3. **Dark Patterns**: Note if the banner uses confusing colors or hidden options to force consent.

      Input Data:
      ${contextText}
      `;

            const decision = await geminiService.generateContent(prompt, "You are a privacy expert.");

            res.json({
                success: true,
                data: { decision }
            });

        } catch (error) {
            next(error);
        }
    }
}

export const tncController = new TncController();
