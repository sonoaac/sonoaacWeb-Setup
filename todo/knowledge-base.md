# Knowledge Base

The Knowledge Base is **no longer a page**. `/knowledge-base` redirects to `/`,
nav links removed. `client/src/pages/KnowledgeBase.tsx` is kept (unrouted) — it
still exports `FAQ_SECTIONS`, used by:

- the Home page FAQ section (`client/src/components/features/HomeFAQ.tsx`)
- the keyword fallback engine (`client/src/lib/assistantMemory.ts` — flattens
  `FAQ_SECTIONS` into searchable records; `retrieve(query)` returns best matches)

The **AI assistant** does not use `FAQ_SECTIONS` directly — its knowledge is the
hand-written `shared/assistant-knowledge.ts`. Keep the two roughly in sync when
facts change. See [ai-assistant.md](ai-assistant.md).

## To edit content

- Keyword fallback answers: edit FAQ entries in `pages/KnowledgeBase.tsx` (add a
  `keywords:` string for better matching) or service records in `assistantMemory.ts`.
- AI assistant answers: edit `shared/assistant-knowledge.ts`.
