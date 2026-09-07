# Containment explainer completion

This change completes the existing DseWiki technical explainer. It does not introduce a new criminal case or claim that a newly scored editorial opportunity passed the radar threshold.

The production repository had the standalone article; the fork had the hub card. This branch combines the required integration and completes the article assets and languages while retaining the existing cases, documentary, book links and legacy image.

- Entry: `/ai-crime-files`, with localized cards on all six archive pages.
- Article: `/ai-crime-files/ai-agent-containment-failure` and `/pt`, `/es`, `/fr`, `/it`, `/ja` equivalents.
- Added complete localized editorial versions, visible language navigation, TechArticle, matching visible FAQ, BreadcrumbList, canonical and reciprocal hreflang.
- Restored sitemap alternates and retained all existing URLs; updated llms files.
- Added reciprocal links between the explainer and all four existing cases in each language.
- Retained the Harness Engineering book funnel and added the contextual Nobody Told It to Lie Amazon CTA with amazon_book_click tracking. Clicks are not sales.

## Image

Permanent asset: `public/images/ai-crime-files/ai-agent-containment-failure.webp`.

Original image generated with the built-in image tool; optimized to 1600 × 900 WebP, 101,030 bytes. All languages use this same committed file. The former image at `public/images/ai-agent-containment-failure.webp` remains available.

Prompt: Original 16:9 editorial illustration for a dark charcoal and crimson technical magazine: a glass containment cube holding luminous computational nodes, with a narrow opening carrying a red light path to a shared external network. Architectural 3D style; realistic glass; no text, logos, watermark, humanoid robots or violence. A conceptual illustration, not documentary photography.

## Verification

`npm run lint` and `npm run build` passed. Build now runs `npm run validate:containment`, checking actual WebP dimensions and size, asset identity in the build, six articles, six hub links, 24 reciprocal case links, visible language navigation, metadata, schemas, sitemap, llms and Vercel rewrites.

The remote browser refused the local preview with ERR_BLOCKED_BY_CLIENT. Visual browser verification was therefore not completed. No production deployment was performed. After the owner merges and deploys, production HTTP responses and the rendered hub should be checked.

## Source record

- https://collusion.wiki/ (primary research, 2026-09-04)
- https://www.reuters.com/business/media-telecom/openai-acknowledges-wiki-incident-need-more-transparency-around-unintended-ai-2026-09-05/
- https://www.reuters.com/business/openai-has-sent-eu-incident-report-hijacked-german-website-commission-says-2026-09-07/
- https://simonwillison.net/2026/Sep/4/rogue-agent-wikis/ (technical analysis, 2026-09-04)

Editorial status remains technical analysis: documented observations, disputed characterizations, inference and engineering recommendations are distinguished. No criminal conviction, measured query volume, royalty or revenue is asserted.
