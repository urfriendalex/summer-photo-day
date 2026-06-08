# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Summer Photo Day is a single Next.js 16 landing page for an outdoor park photo event in Warsaw. It has no database, no Docker, and no microservices. The only backend logic is a `POST /api/book` route that sends notifications via Resend email and Telegram bot.

### Commands

Standard commands are in `package.json`:

- **Dev server:** `npm run dev` (starts on port 3000)
- **Lint:** `npm run lint`
- **Build:** `npm run build`

### Caveats

- **Pre-existing lint notes:** If ESLint reports hook warnings in `experience-title.tsx` or `summer-photo-day-experience.tsx`, check whether they came from the template before refactoring animation code.
- **Environment variables for form submission:** The booking form (`POST /api/book`) requires `RESEND_API_KEY`, `BOOKING_EMAIL_TO`, `TELEGRAM_BOT_TOKEN`, and `TELEGRAM_CHAT_ID` in `.env.local`. Without these, the landing page renders and works fine, but form submission returns a 500 error. This is expected behavior in local dev without API keys.
- **Content language:** The site copy is in Russian (Cyrillic). The form labels and buttons are in Russian.
