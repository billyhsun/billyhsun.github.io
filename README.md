## Bill Sun's Portfolio Website

https://billyhsun.github.io

This is a portfolio of my skills, experiences, and insights. It includes description of my experiences, research, and projects. It also has links to my blog posts.

## AI Chat Assistant

The site includes a floating chat widget that answers questions about the portfolio and shares a Calendly link when visitors want to book a meeting.

### Architecture

- **Frontend** (GitHub Pages): `assets/js/chat-widget.js`, `assets/css/chat-widget.css` — loaded globally via `assets/js/styles.js`
- **Backend** (Vercel): `api/chat.js` — OpenAI chat with a Calendly link tool (no Calendly API)
- **Knowledge base**: `data/site-knowledge.json` — generated from site HTML

### Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Build site knowledge** (re-run after updating page content)

   ```bash
   npm run build:knowledge
   ```

3. **Configure environment** — copy `.env.example` to `.env.local` for local dev, and set the same variables in the [Vercel dashboard](https://vercel.com):

   | Variable | Description |
   |----------|-------------|
   | `OPENAI_API_KEY` | OpenAI API key |
   | `OPENAI_MODEL` | Optional, defaults to `gpt-4o-mini` |
   | `CALENDLY_BOOKING_LINK` | Optional, defaults to `https://calendly.com/billyhsun/30min` |

4. **Deploy API to Vercel**

   ```bash
   npx vercel --prod
   ```

5. **Point the frontend at your API** — update the `chat-api-url` meta tag injected in `assets/js/styles.js` to your Vercel URL (e.g. `https://your-project.vercel.app/api/chat`).

6. **Push site to GitHub** — GitHub Pages serves the static frontend; Vercel serves the API separately.

### Local development

```bash
npm run build:knowledge
npm run dev
```

The widget defaults to `http://localhost:3000/api/chat` when no meta tag is present. For local testing with `vercel dev`, temporarily remove or override the meta tag in `styles.js`.

### Updating content

After editing HTML pages or publications in `styles.js`:

```bash
npm run build:knowledge
git add data/site-knowledge.json
```

Redeploy Vercel so the API picks up the new knowledge file.

### Costs

- **OpenAI**: ~$5–25/month depending on traffic (gpt-4o-mini)
- **Calendly**: free tier works (link-only booking; no API)
- **Vercel**: free tier is sufficient for personal site traffic

### Rate limiting

The API allows 20 requests per IP per hour to limit abuse.
