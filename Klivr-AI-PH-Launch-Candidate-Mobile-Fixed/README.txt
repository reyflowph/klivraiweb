KLIVR AI — VERSION 2 STATIC WEBSITE

This edition uses plain HTML, CSS, and JavaScript.
No React, Next.js, npm, or build process is required.

VERSION 2 UPDATES
- Improved mobile-specific layouts
- More polished hero movement and ambient lighting
- Left-click drag interaction on desktop hero
- Animated AI receptionist conversation
- Refined card hover effects
- Footer contact information
- Icon-only Facebook and Instagram links
- AI Chat Receptionist price updated to ₱2,288

EDIT IN VS CODE
1. Open this complete folder in VS Code.
2. Install the Live Server extension.
3. Right-click index.html.
4. Choose Open with Live Server.

DEPLOY TO VERCEL
1. Upload this folder to GitHub.
2. Import the repository in Vercel.
3. Framework preset: Other.
4. Build command: leave empty.
5. Output directory: leave empty or use a period.


CONTACT FORM + N8N SETUP
-------------------------
The contact form is already designed and coded.

To activate submissions:
1. Open script.js in VS Code.
2. Find:
   const KLIVR_FORM_WEBHOOK_URL = "PASTE_YOUR_N8N_PRODUCTION_WEBHOOK_URL_HERE";
3. Replace the placeholder with your n8n Production Webhook URL.
4. In n8n, use a Webhook node configured for POST requests.
5. Activate the workflow before using the Production URL.

The form sends:
- fullName
- businessName
- email
- socialLink
- service
- message
- source
- status
- submittedAt
- pageUrl
- userAgent

Recommended n8n flow:
Webhook → Google Sheets → Gmail notification → Respond to Webhook

Use the Production URL, not the Test URL, on the deployed website.


CONNECTED N8N WEBHOOK
---------------------
This website build is already connected to:

https://n8n-production-3b2a.up.railway.app/webhook/klivr-ai-contact-v2

Make sure the n8n workflow is active before testing the live website.

Work Page V2.1 — Mockup Clarity Fix
- Added dedicated cropped cover assets for every concept card.
- Added the previously missing SVL card cover.
- Matched card aspect ratios to the cover artwork to prevent forced stretching/cropping.
- Reduced hover enlargement to preserve sharpness.
- Full project modal assets remain unchanged.


Klivr AI Work Page V2.3
Market: PH

Changes:
- Final premium gallery polish
- Crisp vector showcase covers retained
- Rebuilt readable collection label
- Rebuilt Klivr AI logo lockup
- Removed image zoom that introduced softness
- Upgraded gallery framing, spacing, shadows, and proportions
- Improved featured project and fullscreen modal presentation
- Added responsive collection guidance
- Preserved existing contact links and website backend

Open work.html to review the Work page.


Klivr AI Work Page V2.4 — Photography Restoration

- Restored premium hero photography across all eight concept covers.
- Retained vector UI and typography for crisp rendering.
- Removed the simplified icon-only hero treatment from V2.3.
- Desktop and floating-phone previews now share the same photographic direction.
- The gallery requires an internet connection to load the remote high-resolution photography.
