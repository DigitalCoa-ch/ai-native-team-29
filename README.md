# AI Native Week — Professor Cockpit

**Live URL:** https://team-29.apps.digitalcoa.ch

## What This Is

A polished, hyper-realistic prototype simulating an AI assistant that monitors student progress, assignment completion, process adherence, team collaboration, and prototype readiness for an AI Native Enterprise Week course.

> ⚠️ **PROTOTYPE MODE**: All data is synthetic and anonymized. No real student or Google Classroom data is used.

## Running Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production Build

```bash
npm run build
npm start
```

## Screens (8 total)

| Screen | Description |
|--------|-------------|
| **Overview Dashboard** | Active students (80/82), assignment completion (35%), alerts, top priorities |
| **Student Risk Radar** | 20 synthetic students with status filtering (Red/Yellow/Green) |
| **Team Progress Dashboard** | 8 teams with metrics and click-to-analyze |
| **Framework Analyzer** | Per-team analysis: Oxygen Test, PERCH, 7-layer model, HITL, governance |
| **Submission Analyzer** | Mock submission with AI-risk signals and human review flag |
| **HITL Intervention Queue** | Red/Yellow/Green triage with professor action recommendations |
| **Daily Debrief Generator** | What worked, what didn't, blocked teams, tomorrow's adjustments |
| **System Architecture** | Inputs → Processing → Outputs pipeline |

## Key Design Decisions

- AI-generated content detection is framed as a **risk signal**, not an accusation
- **HITL**: The professor approves all final feedback, grading, and intervention decisions
- All data is synthetic (no real student names or Google Classroom integration)
- "PROTOTYPE MODE" banner visible on every screen
- Dark theme, professional SaaS dashboard aesthetic

## Course Context

The course "The AI Native Enterprise: Business Without Employees?" runs over 4 days:
- **Day 1**: AI-native concept, problem, audience, pain, Oxygen Test, PERCH
- **Day 2**: Workflow, HITL, data, models, agents, automation stack
- **Day 3**: Prototype build, AI-native process, zero-based process design
- **Day 4**: Governance, risks, accountability, final presentations

## Built With

- Next.js 14 + TypeScript
- Inline CSS (no Tailwind dependency — runs without extra npm install)
- Local mock data in `/data/mockData.ts`
- Vercel deployment

## GitHub

https://github.com/DigitalCoa-ch/ai-native-team-29
