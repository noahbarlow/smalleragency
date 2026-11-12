# Smaller Agency | AI Discovery Implementation Audit

Date: 2026-11-11
Status: Source-code audit completed; public-platform verification pending.

## Canonical business identity

- Name: Smaller Agency
- Address: 507 King Street E, Suite 322, Toronto, ON M5A 1M3, Canada
- Website: https://smalleragency.com/
- Founder: Noah Barlow
- Primary services: brand strategy, identity, packaging, CPG and food/beverage branding, challenger brand strategy

## Verified in GitHub source

- `CNAME` points to smalleragency.com.
- `robots.txt` explicitly allows OAI-SearchBot and references sitemap.xml.
- Homepage JSON-LD contains ProfessionalService and Organization, postal address, founder, contact, service catalogue, and sameAs profiles.
- `contact.html`, `about.html`, `llms.txt` and `llms-full.txt` use 507 King Street E, Suite 322.
- `sitemap.xml` exists.
- Category-specific pages already exist for packaging, CPG, food and beverage, supplements, Toronto branding and challenger strategy.

## Outstanding verification (not claimed complete)

1. Confirm the live domain serves the latest GitHub commit and allows OAI-SearchBot through any CDN or WAF.
2. Validate JSON-LD with Schema.org validator and Google Rich Results Test. Confirm links and referenced logo actually resolve.
3. Check Google Search Console and Bing Webmaster Tools for indexing, sitemap coverage, and crawl errors.
4. Correct external directory profiles, especially any listing using 50 Carroll Street. External listings require account access and platform approval.
5. Confirm the business profile details on LinkedIn and Clutch; request genuine reviews only from actual clients.
6. Review case studies for client-approved outcomes and original work evidence; do not fabricate metrics or testimonials.
7. Establish baseline for unbranded prompts across AI search systems, with date, location, exact prompt, answer, citation URLs, brand mention, and competing agencies.

## Suggested baseline prompts

- Best packaging design agencies in Toronto for CPG brands
- Canadian food and beverage branding agencies
- Toronto packaging redesign agency for an established consumer brand
- Boutique Canadian challenger brand strategy agency
- Packaging design agency for wellness and supplement products in Canada

## Measurement

Track prompt, date, model/search product, location, Smaller mentioned (yes/no), citation to smalleragency.com (yes/no), competitor mentions, and citation sources. Repeat monthly. Search results vary and no inclusion or ranking is guaranteed.

## Editorial direction

Prioritise specific case studies, credible third-party references, service expertise and verifiable evidence. Avoid generic AI-written SEO pages, invented client results, or claims of guaranteed ChatGPT placement.
