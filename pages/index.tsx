import { useState } from "react";
import { courseStats, topPriorities, students, teams, frameworkAnalysis, submissionAnalysis, hitlQueue, dailyDebrief, workflowArchitecture } from "../data/mockData";

type Screen = "overview" | "students" | "teams" | "framework" | "submission" | "hitl" | "debrief" | "workflow";

const S: Record<string, string> = {
  overview: "Overview", students: "Students", teams: "Teams", framework: "Framework",
  submission: "Submission", hitl: "HITL Queue", debrief: "Debrief", workflow: "Architecture",
};

export default function Home() {
  const [scr, setScr] = useState<Screen>("overview");
  const [sf, setSf] = useState("all");
  const [tf, setTf] = useState("all");
  const [sel, setSel] = useState(teams[0]);

  const Nav = () => (
    <nav className="tab-nav">
      {(Object.keys(S) as Screen[]).map(s => (
        <button key={s} className={`tab-btn ${scr === s ? "active" : ""}`} onClick={() => setScr(s)}>{S[s]}</button>
      ))}
    </nav>
  );

  /* ── Overview ─────────────────────────────────────────────── */
  const Overview = () => (
    <div>
      <div className="sp-6">
        <h1 className="h1" style={{marginBottom:"4px"}}>Professor Cockpit</h1>
        <p className="p">AI Native Week — Day 3 of 4 · Prototype Build Day</p>
      </div>

      <div className="grid-4 sp-4">
        <div className="stat-card">
          <div className="stat-card__eyebrow">Active Students</div>
          <div className="stat-card__value text-green">{courseStats.activeStudents}<span className="stat-card__sub" style={{fontSize:"20px",fontWeight:400}}>/{courseStats.totalStudents}</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-card__eyebrow">Assignment Completion</div>
          <div className="stat-card__value text-amber">{courseStats.assignmentCompletion}%</div>
          <div className="prog" style={{marginTop:"12px"}}><div className="prog__fill prog__fill--amber" style={{width:"35%"}}/></div>
        </div>
        <div className="stat-card">
          <div className="stat-card__eyebrow">Average Grade</div>
          <div className="stat-card__value text-muted">—</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__eyebrow">Missing Assignments</div>
          <div className="stat-card__value text-red">{courseStats.missingAssignments}</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card__header">
            <span className="card__title">Top Priorities</span>
            <span className="tag tag--red">{topPriorities.length}</span>
          </div>
          <ul className="section-list">
            {topPriorities.map(p => (
              <li key={p.id} className="section-item">
                <div className="section-item__num">{p.id}</div>
                <div className="section-item__body">
                  <div className="section-item__text">{p.text}</div>
                  <div className="section-item__label" style={{color:p.priority==="high"?"var(--red)":p.priority==="medium"?"var(--amber)":"var(--ink-3)"}}>{p.priority}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <div className="card__header">
            <span className="card__title">Active Alerts</span>
          </div>
          <div className="alert alert--red">
            <div className="alert__dot"/><div><strong>4 students</strong> flagged for AI-generated content risk review</div>
          </div>
          <div className="alert alert--amber">
            <div className="alert__dot"/><div><strong>8 late submissions</strong> from Days 2–3</div>
          </div>
          <div className="alert alert--amber">
            <div className="alert__dot"/><div><strong>5 materials</strong> below 50% open rate</div>
          </div>
          <div className="alert alert--blue">
            <div className="alert__dot"/><div><strong>Project Ghost (T07)</strong> — Oxygen Test failed, no prototype URL</div>
          </div>
        </div>
      </div>

      <div className="card sp-3">
        <div className="card__header">
          <span className="card__title">HITL Decisions Pending</span>
          <span className="tag tag--red">4</span>
        </div>
        <p className="p" style={{marginBottom:"12px"}}>These decisions require professor approval before feedback is sent.</p>
        <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
          <span className="tag tag--red">AI-Risk Review (4)</span>
          <span className="tag tag--amber">Late Submission Grace (8)</span>
          <span className="tag tag--blue">Missing Citations (3)</span>
        </div>
      </div>
    </div>
  );

  /* ── Students ─────────────────────────────────────────────── */
  const Students = () => (
    <div>
      <div className="sp-4">
        <h1 className="h1" style={{marginBottom:"4px"}}>Student Risk Radar</h1>
        <p className="p">Showing 20 of 80 students — synthetic anonymized data</p>
      </div>

      <div className="filter-bar">
        {[["all","All"],["red","Red Flag"],["yellow","Monitor"],["green","On Track"]].map(([v,l]) => (
          <button key={v} className={`filter-btn ${sf===v?"active":""}`} onClick={()=>setSf(v)}>{l}</button>
        ))}
      </div>

      <div className="t-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Completion</th><th>Missing</th><th>Late</th><th>Materials</th>
              <th>Contribution</th><th>AI Risk</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.filter(s=>sf==="all"||s.status===sf).map(s=>(
              <tr key={s.id}>
                <td><span className="mono">{s.id}</span></td>
                <td>
                  <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                    <div className="prog" style={{width:"56px"}}><div className={`prog__fill ${s.completion>=75?"prog__fill--green":s.completion>=50?"prog__fill--amber":"prog__fill--red"}`} style={{width:`${s.completion}%`}}/></div>
                    <span style={{fontSize:"11px",color:"var(--ink-2)"}}>{s.completion}%</span>
                  </div>
                </td>
                <td><span style={{color:s.missing>2?"var(--red)":"var(--ink-2)"}}>{s.missing}</span></td>
                <td><span style={{color:s.late>0?"var(--amber)":"var(--ink-2)"}}>{s.late}</span></td>
                <td><span style={{color:s.materialsOpened<60?"var(--red)":"var(--ink-2)"}}>{s.materialsOpened}%</span></td>
                <td><span className={`tag ${s.contributionQuality==="High"?"tag--green":s.contributionQuality==="Medium"?"tag--amber":"tag--red"}`}>{s.contributionQuality}</span></td>
                <td><span className={`tag ${s.aiRisk==="Low"?"tag--green":s.aiRisk==="Medium"?"tag--amber":"tag--red"}`}>{s.aiRisk}</span></td>
                <td><span className={`tag tag--${s.status==="green"?"green":s.status==="yellow"?"amber":"red"}`}>{s.status.toUpperCase()}</span></td>
                <td style={{fontSize:"12px",color:"var(--ink-2)"}}>{s.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  /* ── Teams ────────────────────────────────────────────────── */
  const Teams = () => (
    <div>
      <div className="sp-4">
        <h1 className="h1" style={{marginBottom:"4px"}}>Team Progress</h1>
        <p className="p">8 teams · click any card to open Framework Analyzer</p>
      </div>

      <div className="filter-bar">
        {[["all","All Teams"],["red","Critical"],["yellow","Needs Attention"],["green","On Track"]].map(([v,l])=>(
          <button key={v} className={`filter-btn ${tf===v?"active":""}`} onClick={()=>setTf(v)}>{l}</button>
        ))}
      </div>

      <div className="grid-3">
        {teams.filter(t=>{
          if(tf==="all") return true;
          if(tf==="red") return t.oxygenTest==="Fail"||t.prototypeReadiness<45;
          if(tf==="yellow") return t.oxygenTest==="Conditionally Pass"||t.prototypeReadiness<70;
          return t.oxygenTest==="Pass"&&t.prototypeReadiness>=70;
        }).map(t=>{
          const score=Math.round((t.problemClarity+t.audienceClarity+t.painUrgency+t.aiNativeScore+t.prototypeReadiness)/5);
          return (
            <div key={t.id} className="team-card" onClick={()=>{setSel(t);setScr("framework");}}>
              <div className="team-card__head">
                <div>
                  <div className="team-card__name">{t.name}</div>
                  <div className="team-card__id">{t.id}</div>
                  <div style={{marginTop:"6px"}}>
                    <span className={`tag ${t.oxygenTest==="Pass"?"tag--green":t.oxygenTest==="Conditionally Pass"?"tag--amber":"tag--red"}`} style={{fontSize:"9px"}}>{t.oxygenTest}</span>
                  </div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div className="team-card__score">{score}</div>
                  <div className="stat-card__sub">Overall</div>
                </div>
              </div>
              <div className="team-card__metrics">
                {[["Problem",`${t.problemClarity}%`],["Audience",`${t.audienceClarity}%`],["AI-Native",`${t.aiNativeScore}%`],["Prototype",`${t.prototypeReadiness}%`],["Governance",`${t.governanceReadiness}%`],["Presentation",`${t.presentationReadiness}%`]].map(([l,v])=>(
                  <div key={l} className="team-card__metric"><span className="team-card__metric-label" style={{color:"var(--ink-3)",fontSize:"10px"}}>{l}: </span><span className="team-card__metric-val">{v}</span></div>
                ))}
              </div>
              <div className="team-card__action">→ {t.nextIntervention}</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  /* ── Framework ───────────────────────────────────────────── */
  const Framework = () => (
    <div>
      <div className="sp-4">
        <h1 className="h1" style={{marginBottom:"4px"}}>Framework Analyzer</h1>
        <p className="p">Decision-support tool — professor remains final evaluator</p>
      </div>

      <div className="filter-bar sp-4">
        {teams.map(t=>(
          <button key={t.id} className={`filter-btn ${sel.id===t.id?"active":""}`} onClick={()=>setSel(t)}>{t.name}</button>
        ))}
      </div>

      <div className="card">
        <div className="card__header">
          <span className="card__title">{sel.name}</span>
          <span className="tag tag--blue">AI Analysis</span>
        </div>
        <p className="p" style={{marginBottom:"24px",fontStyle:"italic"}}>This is a decision-support signal only. The professor remains the final evaluator of student work.</p>
        {[
          {title:"Problem",              key:"problem"},
          {title:"Audience",             key:"audience"},
          {title:"Pain",                key:"pain"},
          {title:"Wedge",              key:"wedge"},
          {title:"Oxygen Test",         key:"oxygenTest"},
          {title:"7-Layer Capability",  key:"sevenLayers"},
          {title:"PERCH Analysis",      key:"perch"},
          {title:"HITL Pattern",        key:"hitlPattern"},
          {title:"Governance Risk",    key:"governanceRisk"},
          {title:"Prototype Proof",    key:"prototypeProof"},
        ].map(({title,key})=>(
          <div key={key} className="analysis-block">
            <div className="analysis-block__title">{title}</div>
            <div className="analysis-block__body">{(frameworkAnalysis as Record<string,string>)[key]}</div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ── Submission ───────────────────────────────────────────── */
  const Submission = () => (
    <div>
      <div className="sp-4">
        <h1 className="h1" style={{marginBottom:"4px"}}>Submission Analyzer</h1>
        <p className="p">Mock analysis panel — human review required for flagged cases</p>
      </div>

      <div className="sub-grid sp-4">
        <div className="card">
          <div className="card__header"><span className="card__title">Status</span></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"16px"}}>
            {[
              ["Timeliness",  submissionAnalysis.onTime?"tag--green":"tag--red",    submissionAnalysis.onTime?"ON TIME":"LATE"],
              ["Completeness","tag--blue",                                         `${submissionAnalysis.completeness}%`],
              ["Citations",   submissionAnalysis.missingCitations?"tag--red":"tag--green", submissionAnalysis.missingCitations?"MISSING":"OK"],
              ["Human Review",submissionAnalysis.humanReviewRequired?"tag--red":"tag--green", submissionAnalysis.humanReviewRequired?"REQUIRED":"NOT NEEDED"],
            ].map(([label,cls,val])=>(
              <div key={label as string}>
                <div className="eyebrow" style={{marginBottom:"6px"}}>{label as string}</div>
                <span className={`tag ${cls}`}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card__header"><span className="card__title">Risk Assessment</span></div>
          <div style={{marginBottom:"16px"}}>
            <div className="eyebrow" style={{marginBottom:"6px"}}>AI-Generated Content Risk</div>
            <span className="tag tag--red">{submissionAnalysis.aiGeneratedContentRisk} — RISK SIGNAL</span>
          </div>
          <div style={{marginBottom:"16px"}}>
            <div className="eyebrow" style={{marginBottom:"6px"}}>Collaboration Evidence</div>
            <div className="p">{submissionAnalysis.collaborationEvidence}</div>
          </div>
          <div>
            <div className="eyebrow" style={{marginBottom:"6px"}}>Individual Contribution</div>
            <div className="p">{submissionAnalysis.individualContributionQuality}</div>
          </div>
        </div>

        <div className="card">
          <div className="card__header"><span className="card__title">Citation Check</span></div>
          <div style={{marginBottom:"12px"}}>
            <span className={`tag ${submissionAnalysis.missingCitations?"tag--red":"tag--green"}`}>
              {submissionAnalysis.missingCitations?"MISSING CITATIONS":"CITATIONS OK"}
            </span>
          </div>
          <div className="p">{submissionAnalysis.citationIssue}</div>
        </div>

        <div className="card">
          <div className="card__header"><span className="card__title">Suggested Feedback</span></div>
          <div className="p" style={{marginBottom:"12px"}}>{submissionAnalysis.suggestedFeedback}</div>
          {submissionAnalysis.humanReviewRequired&&(
            <div className="sub-review-flag">⚠ Human Review Required: {submissionAnalysis.humanReviewReason}</div>
          )}
        </div>
      </div>
    </div>
  );

  /* ── HITL Queue ──────────────────────────────────────────── */
  const HITL = () => (
       <div>
      <div className="sp-4">
        <h1 className="h1" style={{marginBottom:"4px"}}>HITL Intervention Queue</h1>
        <p className="p">Professor-ordered action queue — HITL approval required before any intervention</p>
      </div>

      <div className="grid-3 sp-4">
        {(["red","amber","green"] as const).map(lvl=>(
          <div key={lvl} className="stat-card" style={{borderLeft:`3px solid ${lvl==="red"?"var(--red)":lvl==="amber"?"var(--amber)":"var(--green)"}`}}>
            <div className="stat-card__eyebrow">{lvl==="red"?"Immediate Review":lvl==="amber"?"Monitor / Nudge":"No Action"}</div>
            <div className="stat-card__value" style={{color:lvl==="red"?"var(--red)":lvl==="amber"?"var(--amber)":"var(--green)"}}>{hitlQueue.filter(q=>q.level===lvl).length}</div>
          </div>
        ))}
      </div>

      {(["red","amber","green"] as const).map(lvl=>(
        <div key={lvl} className="sp-3">
          {hitlQueue.filter(q=>q.level===lvl).map(item=>(
            <div key={item.id} className={`queue-item queue-item--${lvl}`}>
              <div className="queue-item__head">
                <span className="queue-item__name">{item.team}</span>
                <span className={`tag tag--${lvl}`}>{lvl.toUpperCase()}</span>
              </div>
              <div className="queue-item__why">Why flagged: {item.reason}</div>
              <div className="queue-item__do">Professor action: {item.action}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  /* ── Debrief ──────────────────────────────────────────────── */
  const Debrief = () => (
    <div>
      <div className="sp-4">
        <h1 className="h1" style={{marginBottom:"4px"}}>Daily Debrief</h1>
        <p className="p">Day 3 operations analysis — AI Native Week</p>
      </div>

      {[
        {title:"What Worked Today",          body:dailyDebrief.whatWorkedToday},
        {title:"What Did Not Work Today",    body:dailyDebrief.whatDidNotWorkToday},
        {title:"Blocked Teams",              body:dailyDebrief.blockedTeams},
        {title:"Underused Materials",        body:dailyDebrief.underusedMaterials},
        {title:"Confusing Tools",            body:dailyDebrief.confusingTools},
        {title:"Adjustments for Tomorrow",  body:dailyDebrief.adjustmentsForTomorrow},
      ].map(({title,body})=>(
        <div key={title} className="debrief-item">
          <div className="debrief-item__title">{title}</div>
          <div className="debrief-item__body">
            <ul>{body.map((item,i)=><li key={i}>{item}</li>)}</ul>
          </div>
        </div>
      ))}

      <div className="debrief-item">
        <div className="debrief-item__title">Suggested Google Classroom Announcement</div>
        <div className="debrief-announce">{dailyDebrief.suggestedAnnouncement}</div>
      </div>
    </div>
  );

  /* ── Workflow ─────────────────────────────────────────────── */
  const Workflow = () => (
    <div>
      <div className="sp-4">
        <h1 className="h1" style={{marginBottom:"4px"}}>System Architecture</h1>
        <p className="p">How the professor cockpit processes inputs and generates signals</p>
      </div>

      <div className="card">
        {[
          {label:"Inputs",        cls:"arch-chip--in",   chips:workflowArchitecture.inputs},
          {label:"Processing",    cls:"arch-chip--proc", chips:workflowArchitecture.processing},
          {label:"Outputs",       cls:"arch-chip--out",  chips:workflowArchitecture.outputs},
        ].map(({label,cls,chips})=>(
          <div key={label} className="arch-section">
            <div className="arch-label">{label}</div>
            <div className="arch-chips">{chips.map(c=><div key={c} className={`arch-chip ${cls}`}>{c}</div>)}</div>
          </div>
        ))}
      </div>

      <div className="card sp-3">
        <div className="card__header"><span className="card__title">HITL Principle</span></div>
        <p className="p" style={{lineHeight:1.8}}>
          The professor approves all final feedback, grading decisions, risk judgments, and student interventions.
          AI-generated analysis is a decision-support signal only. The professor remains the final evaluator of all student work.
        </p>
      </div>
    </div>
  );

  const screens = { overview:Overview, students:Students, teams:Teams, framework:Framework, submission:Submission, hitl:HITL, debrief:Debrief, workflow:Workflow };
  const Screen = screens[scr];

  return (
    <div className="app-wrap">
      <header className="top-bar">
        <span className="top-bar__wordmark">AI Native Week</span>
        <span className="top-bar__tag">Prototype Mode — Synthetic Data</span>
      </header>
      <main className="page-main">
        <Nav />
        <Screen />
      </main>
    </div>
  );
}
