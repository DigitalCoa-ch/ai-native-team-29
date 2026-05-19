# AI Native Week — Professor Cockpit

**Prototype URL:** https://team-29.apps.digitalcoa.ch

## What This Is

A polished, hyper-realistic prototype simulating an AI assistant that monitors student progress, assignment completion, process adherence, team collaboration, and prototype readiness for an AI Native Enterprise Week course.

## Running Locally

```bash
cd ai-native-team-29
npm install
npm run dev
```

Open http://localhost:3000

## Screens

1. **Overview Dashboard** — Active students, assignment completion, alerts, priorities
2. **Student Risk Radar** — 20 synthetic students with risk/status filtering
3. **Team Progress Dashboard** — 8 teams with filter + click-to-analyze
4. **Framework Analyzer** — AI-native framework analysis per team
5. **Submission Analyzer** — Mock submission with AI-risk signals + human review flag
6. **HITL Intervention Queue** — Red/Yellow/Green triage with professor actions
7. **Daily Debrief Generator** — What worked, what didn't, tomorrow's adjustments
8. **System Architecture** — Inputs, processing pipeline, outputs

## Key Design Decisions

- All data is synthetic and anonymized (no real student names)
- AI-generated content detection is framed as a **risk signal**, not an accusation
- **HITL**: The professor approves all final decisions; AI analysis is decision-support only
- "Prototype Mode" banner visible on every screen
- Dark theme, professional SaaS dashboard aesthetic

## Built With

- Next.js 14 + TypeScript
- Inline CSS (no Tailwind dependency)
- Local mock data in `/data/mockData.ts`
