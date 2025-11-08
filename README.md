# TalentPlus (Dev Bundle)

## Quick Start (local dev)
1. Clone this repo.
2. Copy `.env.example` -> `.env.local` and fill in keys.
3. `npm install`
4. Create a Supabase project and run `database/schema.sql` in Supabase SQL editor.
5. `npm run dev` — opens at http://localhost:3000

## Purpose
TalentPlus is an AI-first resume parsing + matching platform. This dev bundle provides a full stack skeleton:
- Next.js frontend + API routes
- Supabase integration
- Robust parsing pipeline (OpenAI primary, fallback to mini + regex)
- Matching endpoint

## Testing
- Drop real resumes via the web UI (Add Talent Profile) or call `/api/resumes/parse` with a multipart `file`.
- Use `/api/match` to score candidates against a job description.

**No sample resumes are included** — add your own real test resumes to `tests/` or upload through the UI.

## Notes
- Replace `OPENAI_API_KEY` and Supabase keys before running.
- Monitor OpenAI usage during tests.
# talentpulse-ai
# talentpulse-ai
