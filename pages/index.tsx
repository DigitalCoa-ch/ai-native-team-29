"use client";
import { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from "recharts";
import {
  courseStats, topPriorities, students, teams, frameworkAnalysis,
  submissionAnalysis, hitlQueue, dailyDebrief, workflowArchitecture
} from "../data/mockData";

type Screen = "overview"|"students"|"teams"|"framework"|"submission"|"hitl"|"debrief"|"workflow";
const SCR: Record<Screen,string> = {
  overview: "Overview",
  students: "Student Risk Radar",
  teams: "Team Progress",
  framework: "Framework Analyzer",
  submission: "Submission Analyzer",
  hitl: "HITL Queue",
  debrief: "Daily Debrief",
  workflow: "Workflow Architecture",
};

// ── SVG Icons ──
const IconDashboard = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>;
const IconRadar = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6"/><circle cx="8" cy="8" r="3"/><line x1="8" y1="2" x2="8" y2="14"/><line x1="2" y1="8" x2="14" y2="8"/></svg>;
const IconTeams = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="6" cy="6" r="2.5"/><circle cx="11" cy="6" r="2.5"/><path d="M1 14c0-2.5 2.2-4 5-4s5 1.5 5 4"/><path d="M9 14c0-2.5 2.2-4 5-4s5 1.5 5 4"/></svg>;
const IconFw = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 1l2 4.5L15 8l-4.5 2L8 15l-2-4.5L1 8l4.5-2z"/></svg>;
const IconCheck = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 8l4 4 8-8"/></svg>;
const IconQueue = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="4" x2="14" y2="4"/><line x1="2" y1="8" x2="14" y2="8"/><line x1="5" y1="12" x2="14" y2="12"/></svg>;
const IconDebrief = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="12" height="12" rx="2"/><line x1="5" y1="6" x2="11" y2="6"/><line x1="5" y1="9" x2="9" y2="9"/></svg>;
const IconArch = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="1,12 5,6 9,9 15,2"/></svg>;
const IconPlay = () => <svg viewBox="0 0 16 16" fill="currentColor"><path d="M4 2.5l10 5.5-10 5.5z"/></svg>;
const IconCaret = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6l4 4 4-4"/></svg>;
const IconCheck2 = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 8l4 4 8-8"/></svg>;
const IconAlert = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 1L1 14h14L8 1z"/><line x1="8" y1="6" x2="8" y2="9"/><circle cx="8" cy="11.5" r="0.5" fill="currentColor"/></svg>;
const IconArrow = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>;

// ── Shared tooltip ──
const CTip = ({ active, payload, label }: any) => active && payload?.length ? (
  <div style={{ background:"var(--surface)", border:"1px solid var(--rule)", borderRadius:6, padding:"8px 14px", fontSize:12, lineHeight:1.7, boxShadow:"0 4px 16px rgba(0,0,0,0.1)" }}>
    <strong style={{ display:"block", marginBottom:4 }}>{label}</strong>
    {payload.map((p: any) => <div key={p.name} style={{ color: p.color||p.fill }}>{p.name}: <strong>{p.value}</strong></div>)}
  </div>) : null;

// ── Chart data ──
const completionTrend = [{day:"Day 1",rate:72},{day:"Day 2",rate:61},{day:"Day 3",rate:35}];
const statusDist = [
  {name:"On Track",value:35,color:"#059669"},
  {name:"Monitor",value:30,color:"#D97706"},
  {name:"Red Flag",value:15,color:"#DC2626"},
];
const teamScoresChart = teams.map(t => ({
  name: t.name.replace("Project ",""),
  Score: Math.round((t.problemClarity + t.audienceClarity + t.painUrgency + t.aiNativeScore + t.prototypeReadiness)/5),
  Oxygen: t.oxygenTest==="Pass"?100:t.oxygenTest==="Conditionally Pass"?60:15,
}));

// ── Narrative bar ──
const NARRATIVE_STEPS = ["Problem","Audience","Pain","Solution","Oxygen Test","Workflow","HITL","Prototype","Governance"];
const NarrativeBar = () => (
  <div className="narrative-bar">
    {NARRATIVE_STEPS.map((step, i) => (
      <span key={step} className={`narrative-step${i === 5 ? " active" : ""}`}>
        <span className="ns-dot"/>
        {step}
        {i < NARRATIVE_STEPS.length - 1 && <span className="ns-arrow">›</span>}
      </span>
    ))}
  </div>
);

// ── Sidebar ──
const NAV_ITEMS: {id:Screen; label:string; icon:()=>JSX.Element; badge?:string; badgeType?:"red"|"amber"}[] = [
  {id:"overview", label:"Overview", icon:IconDashboard},
  {id:"students", label:"Student Risk Radar", icon:IconRadar},
  {id:"teams", label:"Team Progress", icon:IconTeams},
  {id:"framework", label:"Framework Analyzer", icon:IconFw},
  {id:"submission", label:"Submission Analyzer", icon:IconCheck},
  {id:"hitl", label:"HITL Queue", icon:IconQueue, badge:"4", badgeType:"red"},
  {id:"debrief", label:"Daily Debrief", icon:IconDebrief},
  {id:"workflow", label:"Workflow Architecture", icon:IconArch},
];

// ── Badge helper ──
const StatusBadge = ({ s }: { s: string }) => {
  if (s === "green") return <span className="badge badge-green">On Track</span>;
  if (s === "yellow") return <span className="badge badge-amber">Monitor</span>;
  if (s === "red") return <span className="badge badge-red">Red Flag</span>;
  return null;
};
const OxygenBadge = ({ o }: { o: string }) => {
  if (o === "Pass") return <span className="badge badge-green">Pass</span>;
  if (o === "Conditionally Pass") return <span className="badge badge-amber">Cond. Pass</span>;
  return <span className="badge badge-red">Fail</span>;
};

// ── SCREEN: Overview ──
function Overview() {
  const redStudents = students.filter(s => s.status === "red").length;
  const amberStudents = students.filter(s => s.status === "yellow").length;
  const greenStudents = students.filter(s => s.status === "green").length;

  // Professor action feed — 5 most important actions today
  const actionFeed = [
    { time:"Now", priority:"high", text:"Follow up with 12 students with missing Day 1–2 assignments", rec:"Send encouraging reminder via Google Classroom" },
    { time:"Now", priority:"high", text:"Review AI-risk signals for 4 late submissions from Teams 3, 7, and 11", rec:"Open Submission Analyzer and flag for HITL review" },
    { time:"09:00", priority:"high", text:"Project Ghost (T07) — Oxygen Test failed, no prototype URL submitted", rec:"Schedule immediate 1:1 meeting" },
    { time:"10:00", priority:"medium", text:"Check in with Teams 4, 8, 15 on low Day 3 material engagement", rec:"Send nudge about HITL Design Guide" },
    { time:"11:00", priority:"medium", text:"Prepare intervention messages for teams with Conditionally Pass scores", rec:"Use email template for borderline teams" },
  ];

  return (
    <div>
      <div className="screen-header">
        <h1 className="screen-title">Professor Cockpit</h1>
        <p className="screen-sub">AI Native Enterprise Week — Day 3 of 4 &nbsp;·&nbsp; Active monitoring</p>
        <div className="screen-meta">
          <span className="proto-badge">Prototype Mode: Synthetic anonymized data</span>
          <span style={{fontSize:11,color:"var(--ink-3)"}}>Last updated: today at 08:45</span>
        </div>
      </div>

      <NarrativeBar />

      {/* KPI row */}
      <div className="grid-4 sp6">
        <div className="kpi-card green">
          <div className="kpi-ey">Active Students</div>
          <div className="kpi-val">{courseStats.activeStudents}</div>
          <div className="kpi-sub">{courseStats.totalStudents} enrolled</div>
        </div>
        <div className="kpi-card amber">
          <div className="kpi-ey">Assignment Completion</div>
          <div className="kpi-val">{courseStats.assignmentCompletion}%</div>
          <div className="kpi-sub">Day 3 average</div>
          <div className="kpi-delta down">↓ 26% from Day 2</div>
        </div>
        <div className="kpi-card red">
          <div className="kpi-ey">Missing Assignments</div>
          <div className="kpi-val">{courseStats.missingAssignments}</div>
          <div className="kpi-sub">Across all days</div>
          <div className="kpi-delta down">↑ 4 since yesterday</div>
        </div>
        <div className="kpi-card violet">
          <div className="kpi-ey">Late Submissions</div>
          <div className="kpi-val">{courseStats.lateSubmissions}</div>
          <div className="kpi-sub">Days 2–3 only</div>
          <div className="kpi-delta down">↑ 3 since yesterday</div>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid-21 sp6">
        <div className="card">
          <div className="card-head">
            <span className="card-title">Completion Trend — Days 1–3</span>
            <span className="card-sub">% submitted on time</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={completionTrend}>
              <defs>
                <linearGradient id="gGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.01}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--rule)" vertical={false}/>
              <XAxis dataKey="day" tick={{fontSize:11,fill:"var(--ink-2)"}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:"var(--ink-2)"}} axisLine={false} tickLine={false} domain={[0,100]} ticks={[0,50,100]}/>
              <Tooltip content={<CTip/>}/>
              <Area type="monotone" dataKey="rate" stroke="#059669" strokeWidth={2.5} fill="url(#gGreen)" name="Completed %"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="card-head">
            <span className="card-title">Student Risk Distribution</span>
            <span className="card-sub">80 active</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie data={statusDist} cx="50%" cy="50%" innerRadius={34} outerRadius={54} dataKey="value" stroke="none">
                  {statusDist.map((e,i) => <Cell key={i} fill={e.color}/>)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{flex:1}}>
              {statusDist.map(s => (
                <div key={s.name} style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                  <div style={{width:10,height:10,borderRadius:2,background:s.color,flexShrink:0}}/>
                  <span style={{fontSize:12,fontWeight:600,flex:1}}>{s.name}</span>
                  <span style={{fontSize:14,fontWeight:800}}>{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Three-column row: alerts + action feed + framework fit */}
      <div className="grid-3 sp6">
        {/* Active alerts */}
        <div className="card">
          <div className="card-head">
            <span className="card-title">Active Alerts</span>
            <span className="badge badge-red">4 New</span>
          </div>
          <div className="alert-item red">
            <div className="dot"/>
            <div>
              <div className="alert-title">4 students — AI-generated content risk</div>
              <div className="alert-meta">Detected in Days 2–3 submissions</div>
            </div>
          </div>
          <div className="alert-item amber">
            <div className="dot"/>
            <div>
              <div className="alert-title">8 late submissions</div>
              <div className="alert-meta">Days 2–3 assignments</div>
            </div>
          </div>
          <div className="alert-item amber">
            <div className="dot"/>
            <div>
              <div className="alert-title">5 materials below 50% open rate</div>
              <div className="alert-meta">HITL Design Guide, Governance Framework</div>
            </div>
          </div>
          <div className="alert-item blue">
            <div className="dot"/>
            <div>
              <div className="alert-title">Project Ghost (T07) — Oxygen Test failed</div>
              <div className="alert-meta">No prototype URL accessible</div>
            </div>
          </div>
        </div>

        {/* Professor Action Feed */}
        <div className="card">
          <div className="card-head">
            <span className="card-title">Professor Action Feed</span>
            <span className="card-action">
              <span className="badge badge-indigo">Today</span>
            </span>
          </div>
          <div className="action-feed">
            {actionFeed.map((a,i) => (
              <div key={i} className={`action-item ${a.priority}`}>
                <div className="action-time">{a.time}</div>
                <div className="action-body">
                  <div className="action-text">{a.text}</div>
                  <div className={`action-rec ${a.priority === "high" ? "red" : "indigo"}`}>{a.rec}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Framework Fit panel */}
        <div className="card">
          <div className="card-head">
            <span className="card-title">Framework Fit</span>
            <span className="card-sub">Day 3 overview</span>
          </div>
          {[
            {fw:"Oxygen Test", status:"amber", desc:"3 teams conditionally passed", detail:"Edge cases not fully addressed"},
            {fw:"PERCH", status:"blue", desc:"5 teams on track", detail:"Revenue model needs stress-testing"},
            {fw:"7 Layers", status:"green", desc:"6 teams have data + agent logic", detail:"Monitoring gaps in escalation"},
            {fw:"HITL Pattern", status:"amber", desc:"3 teams need clarification", detail:"Review frequency not specified"},
            {fw:"Governance", status:"red", desc:"Only 2 teams have audit trail", detail:"Highest risk area for Day 4"},
          ].map(f => (
            <div key={f.fw} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"10px 0",borderBottom:"1px solid var(--rule-light)"}}>
              <div style={{width:8,height:8,borderRadius:"50%",flexShrink:0,marginTop:4,background:f.status==="red"?"var(--red)":f.status==="amber"?"var(--amber)":f.status==="green"?"var(--green)":"var(--blue)"}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:12,fontWeight:700,marginBottom:2}}>{f.fw}</div>
                <div style={{fontSize:11,color:"var(--ink-2)"}}>{f.desc}</div>
                <div style={{fontSize:10,color:"var(--ink-3)",marginTop:2}}>{f.detail}</div>
              </div>
              <span className={`badge badge-${f.status === "red" ? "red" : f.status === "amber" ? "amber" : f.status === "green" ? "green" : "blue"}`}>{f.status === "red" ? "Risk" : f.status === "amber" ? "Monitor" : f.status === "green" ? "Clear" : "OK"}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Team performance + HITL */}
      <div className="grid-21 sp6">
        <div className="card">
          <div className="card-head">
            <span className="card-title">Team Performance Radar</span>
            <span className="card-sub">Overall score + Oxygen Test</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={teamScoresChart} barCategoryGap="28%">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--rule)" vertical={false}/>
              <XAxis dataKey="name" tick={{fontSize:10,fill:"var(--ink-2)"}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:"var(--ink-2)"}} axisLine={false} tickLine={false} domain={[0,100]}/>
              <Tooltip content={<CTip/>}/>
              <Bar dataKey="Score" fill="#2563EB" name="Overall Score" radius={[3,3,0,0]} maxBarSize={32}/>
              <Bar dataKey="Oxygen" fill="#D97706" name="Oxygen Test" radius={[3,3,0,0]} maxBarSize={32}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="card-head">
            <span className="card-title">HITL Decisions Pending</span>
            <span className="badge badge-red">4 Required</span>
          </div>
          {[
            {l:"AI-Risk Review", v:"4 cases", c:"var(--red)"},
            {l:"Late Submission Grace", v:"8 cases", c:"var(--amber)"},
            {l:"Missing Citations", v:"3 cases", c:"var(--blue)"},
          ].map(x => (
            <div key={x.l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:"var(--surface-2)",borderRadius:6,borderLeft:`3px solid ${x.c}`,marginBottom:8}}>
              <span style={{fontSize:12,fontWeight:600}}>{x.l}</span>
              <span style={{fontSize:12,fontWeight:700,color:x.c}}>{x.v}</span>
            </div>
          ))}
          <p style={{fontSize:11,color:"var(--ink-3)",marginTop:12}}>All decisions require professor approval before feedback is sent.</p>
        </div>
      </div>
    </div>
  );
}

// ── SCREEN: Student Risk Radar ──
function Students() {
  const [filter, setFilter] = useState<string>("all");
  const [expanded, setExpanded] = useState<string|null>(null);
  const filtered = filter === "all" ? students : students.filter(s => s.status === filter);

  return (
    <div>
      <div className="screen-header">
        <h1 className="screen-title">Student Risk Radar</h1>
        <p className="screen-sub">What the professor sees: completion gaps, AI-risk signals, and engagement decline — all students, ranked by risk level.</p>
        <p className="screen-sub" style={{marginTop:6}}>Why it matters: Students flagged red have a high probability of failing or submitting AI-generated work without proper attribution.</p>
      </div>

      <NarrativeBar />

      <div className="filter-bar sp4">
        <button className={`fbtn${filter==="all"?" active":""}`} onClick={()=>setFilter("all")}>All (20)</button>
        <button className={`fbtn${filter==="red"?" active":""}`} onClick={()=>setFilter("red")}>Red Flag ({students.filter(s=>s.status==="red").length})</button>
        <button className={`fbtn${filter==="yellow"?" active":""}`} onClick={()=>setFilter("yellow")}>Monitor ({students.filter(s=>s.status==="yellow").length})</button>
        <button className={`fbtn${filter==="green"?" active":""}`} onClick={()=>setFilter("green")}>On Track ({students.filter(s=>s.status==="green").length})</button>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Status</th>
              <th>Completion</th>
              <th>Materials Opened</th>
              <th>AI Risk</th>
              <th>Contribution</th>
              <th>Recommended Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <>
                <tr key={s.id} className="exp-row" onClick={()=>setExpanded(expanded===s.id?null:s.id)} style={{cursor:"pointer"}}>
                  <td>
                    <div style={{fontWeight:700,fontSize:13}}>{s.name}</div>
                    <div style={{fontSize:10,color:"var(--ink-3)"}}>{s.id}</div>
                  </td>
                  <td><StatusBadge s={s.status}/></td>
                  <td>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div className="prog" style={{width:80}}><div className={`pf ${s.completion>=75?"pg":s.completion>=50?"pa":"prd"}`} style={{width:s.completion+"%"}}/></div>
                      <span style={{fontSize:12,fontWeight:700,width:32,textAlign:"right"}}>{s.completion}%</span>
                    </div>
                  </td>
                  <td>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div className="prog" style={{width:80}}><div className={`pf ${s.materialsOpened>=75?"pg":s.materialsOpened>=50?"pa":"prd"}`} style={{width:s.materialsOpened+"%"}}/></div>
                      <span style={{fontSize:12,fontWeight:700,width:32,textAlign:"right"}}>{s.materialsOpened}%</span>
                    </div>
                  </td>
                  <td>
                    {s.aiRisk==="Low"&&<span className="badge badge-green">Low</span>}
                    {s.aiRisk==="Medium"&&<span className="badge badge-amber">Medium</span>}
                    {s.aiRisk==="High"&&<span className="badge badge-red">High</span>}
                  </td>
                  <td>
                    {s.contributionQuality==="High"&&<span className="badge badge-green">High</span>}
                    {s.contributionQuality==="Medium"&&<span className="badge badge-amber">Medium</span>}
                    {s.contributionQuality==="Low"&&<span className="badge badge-red">Low</span>}
                  </td>
                  <td><span style={{fontSize:11,fontWeight:600,color:s.status==="red"?"var(--red)":s.status==="yellow"?"var(--amber)":"var(--green)"}}>{s.action}</span></td>
                </tr>
                {expanded===s.id&&(
                  <tr>
                    <td colSpan={7} className="exp-detail" style={{background:"var(--surface-2)"}}>
                      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
                        <div><div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"var(--ink-3)",marginBottom:4}}>Missing Assignments</div><div style={{fontSize:20,fontWeight:900}}>{s.missing}</div></div>
                        <div><div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"var(--ink-3)",marginBottom:4}}>Late Submissions</div><div style={{fontSize:20,fontWeight:900}}>{s.late}</div></div>
                        <div><div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"var(--ink-3)",marginBottom:4}}>Materials Use</div><div style={{fontSize:20,fontWeight:900}}>{s.materialsOpened}%</div></div>
                        <div><div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"var(--ink-3)",marginBottom:4}}>AI Risk Level</div><div style={{fontSize:20,fontWeight:900}}>{s.aiRisk}</div></div>
                      </div>
                      <div style={{marginTop:10,fontSize:12,color:"var(--ink-2)"}}><strong style={{color:"var(--indigo)"}}>Professor recommended action:</strong> {s.action}</div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── SCREEN: Teams ──
function Teams() {
  const getReadiness = (t: typeof teams[0]) => {
    const score = Math.round((t.problemClarity + t.audienceClarity + t.painUrgency + t.aiNativeScore + t.prototypeReadiness)/5);
    return score;
  };
  const getReadinessColor = (score: number) => score >= 75 ? "green" : score >= 55 ? "amber" : "red";
  const getReadinessLabel = (score: number) => score >= 75 ? "Ready" : score >= 55 ? "Monitor" : "Blocked";

  return (
    <div>
      <div className="screen-header">
        <h1 className="screen-title">Team Progress</h1>
        <p className="screen-sub">What the professor sees: team readiness scores, Oxygen Test status, HITL design completeness, and prototype readiness.</p>
        <p className="screen-sub" style={{marginTop:6}}>Why it matters: Readiness below 55 signals the team will struggle to present a credible AI-native prototype on Day 4.</p>
      </div>

      <NarrativeBar />

      <div className="grid-3 sp6">
        {teams.map(t => {
          const score = getReadiness(t);
          const color = getReadinessColor(score);
          return (
            <div key={t.id} className={`team-card ${color}`}>
              <div className="team-score">{score}</div>
              <div className="team-name">{t.name}</div>
              <div className="team-id">{t.id}</div>
              <div style={{marginBottom:12,display:"flex",gap:6,flexWrap:"wrap"}}>
                <OxygenBadge o={t.oxygenTest}/>
                {t.workflowMap==="Complete"?<span className="badge badge-green">Workflow ✓</span>:<span className="badge badge-amber">Workflow △</span>}
                {t.hitlDesign==="Defined"?<span className="badge badge-blue">HITL ✓</span>:<span className="badge badge-amber">HITL △</span>}
              </div>
              <div className="team-metrics">
                <div>
                  <div className="team-ml">Problem</div>
                  <div className="team-mv">{t.problemClarity}</div>
                </div>
                <div>
                  <div className="team-ml">Audience</div>
                  <div className="team-mv">{t.audienceClarity}</div>
                </div>
                <div>
                  <div className="team-ml">Pain</div>
                  <div className="team-mv">{t.painUrgency}</div>
                </div>
                <div>
                  <div className="team-ml">AI-Native</div>
                  <div className="team-mv">{t.aiNativeScore}</div>
                </div>
                <div>
                  <div className="team-ml">Prototype</div>
                  <div className="team-mv">{t.prototypeReadiness}</div>
                </div>
                <div>
                  <div className="team-ml">Governance</div>
                  <div className="team-mv">{t.governanceReadiness}</div>
                </div>
              </div>
              <div style={{marginBottom:8}}>
                <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"var(--ink-3)",marginBottom:6}}>Why {getReadinessLabel(score)}</div>
                {score >= 75 && <div style={{fontSize:11,color:"var(--green)"}}>Strong scores across all dimensions. Oxygen Test passed. Workflow and HITL defined.</div>}
                {score >= 55 && score < 75 && <div style={{fontSize:11,color:"var(--amber)"}}>Solid foundation. Governance or HITL gaps remain. Conditionally passed Oxygen Test.</div>}
                {score < 55 && <div style={{fontSize:11,color:"var(--red)"}}>Oxygen Test failed or borderline. Multiple gaps in problem framing, AI-native argument weak.</div>}
              </div>
              <div className={`team-action ${color === "green" ? "blue" : color}`}>
                <span style={{fontSize:11,fontWeight:700,marginRight:6,textTransform:"uppercase",letterSpacing:".06em"}}>→</span>
                {t.nextIntervention}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── SCREEN: Framework Analyzer ──
function Framework() {
  const [tab, setTab] = useState("problem");
  const tabs = ["problem","audience","pain","wedge","oxygen","sevenLayers","perch","hitl","governance"];

  return (
    <div>
      <div className="screen-header">
        <h1 className="screen-title">Framework Analyzer</h1>
        <p className="screen-sub">What the professor sees: AI reasoning support across all framework dimensions. The system analyzes; the professor decides.</p>
        <p className="screen-sub" style={{marginTop:6,color:"var(--indigo)",fontWeight:600}}>AI reasoning support — professor decides</p>
      </div>

      <NarrativeBar />

      <div className="fw-tabs">
        {tabs.map(t => (
          <button key={t} className={`fw-tab${tab===t?" active":""}`} onClick={()=>setTab(t)}>
            {t==="sevenLayers"?"7 Layers":t==="hitl"?"HITL":t.charAt(0).toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>

      <div className="card sp6">
        {tab==="problem"&&(<><div className="card-head"><span className="card-title">Problem Statement</span><span className="badge badge-green">Strong</span></div><div className="ab-body">{frameworkAnalysis.problem}</div></>)}
        {tab==="audience"&&(<><div className="card-head"><span className="card-title">Target Audience</span><span className="badge badge-amber">Adequate</span></div><div className="ab-body">{frameworkAnalysis.audience}</div></>)}
        {tab==="pain"&&(<><div className="card-head"><span className="card-title">Pain & Urgency</span><span className="badge badge-green">Strong</span></div><div className="ab-body">{frameworkAnalysis.pain}</div></>)}
        {tab==="wedge"&&(<><div className="card-head"><span className="card-title">AI-Native Wedge</span><span className="badge badge-amber">Partial</span></div><div className="ab-body">{frameworkAnalysis.wedge}</div></>)}
        {tab==="oxygen"&&(<><div className="card-head"><span className="card-title">Oxygen Test</span><span className="badge badge-amber">Conditionally Pass</span></div><div className="ab-body">{frameworkAnalysis.oxygenTest}</div></>)}
        {tab==="sevenLayers"&&(<><div className="card-head"><span className="card-title">7 Layers Model</span><span className="badge badge-amber">Gaps Identified</span></div><div className="ab-body">{frameworkAnalysis.sevenLayers}</div></>)}
        {tab==="perch"&&(<><div className="card-head"><span className="card-title">PERCH Framework</span><span className="badge badge-amber">Incomplete</span></div><div className="ab-body">{frameworkAnalysis.perch}</div></>)}
        {tab==="hitl"&&(<><div className="card-head"><span className="card-title">HITL Pattern</span><span className="badge badge-amber">Vague</span></div><div className="ab-body">{frameworkAnalysis.hitlPattern}</div></>)}
        {tab==="governance"&&(<><div className="card-head"><span className="card-title">Governance Risk</span><span className="badge badge-red">Medium Risk</span></div><div className="ab-body">{frameworkAnalysis.governanceRisk}</div></>)}
      </div>

      <div className="card">
        <div className="card-head">
          <span className="card-title">Prototype Proof</span>
        </div>
        <div className="ab-body">{frameworkAnalysis.prototypeProof}</div>
      </div>
    </div>
  );
}

// ── SCREEN: Submission Analyzer ──
function Submission() {
  return (
    <div>
      <div className="screen-header">
        <h1 className="screen-title">Submission Analyzer</h1>
        <p className="screen-sub">What the professor sees: completeness score, collaboration evidence, AI-risk signals, and citation quality.</p>
        <p className="screen-sub" style={{marginTop:6}}>Why it matters: Missing citations and AI-risk signals require professor review before feedback is sent.</p>
      </div>

      <NarrativeBar />

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--sp3)",marginBottom:"var(--sp4)"}}>
        <div className="card">
          <div className="card-head"><span className="card-title">Submission Metadata</span></div>
          {[
            {l:"Student", v:"Student Gamma (S003)"}, {l:"Team", v:"T03 — Project Cipher"}, {l:"Submitted", v:"Late — Day 3, 11:47 PM"},
            {l:"Assignment", v:"Day 3 Workflow Document"}, {l:"Completeness", v:"75%"},
          ].map(r => (
            <div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid var(--rule-light)",fontSize:12}}>
              <span style={{color:"var(--ink-3)",fontWeight:600}}>{r.l}</span>
              <span style={{fontWeight:700}}>{r.v}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-head"><span className="card-title">Completeness Breakdown</span></div>
          <div style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:4}}><span>Overall</span><span style={{fontWeight:700}}>75%</span></div>
            <div className="prog"><div className="pf pa" style={{width:"75%"}}/></div>
          </div>
          {[
            {l:"Problem Statement",p:85},{l:"Audience Definition",p:70},{l:"Workflow Mapping",p:80},{l:"HITL Design",p:65},{l:"Governance",p:40},
          ].map(i => (
            <div key={i.l} style={{marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:3}}><span>{i.l}</span><span style={{fontWeight:700}}>{i.p}%</span></div>
              <div className="prog"><div className={`pf ${i.p>=75?"pg":i.p>=50?"pa":"prd"}`} style={{width:i.p+"%"}}/></div>
            </div>
          ))}
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--sp3)",marginBottom:"var(--sp3)"}}>
        <div className="card">
          <div className="card-head"><span className="card-title">Collaboration Evidence</span></div>
          <div style={{fontSize:12,lineHeight:1.7,color:"var(--ink-2)"}}>{submissionAnalysis.collaborationEvidence}</div>
        </div>
        <div className="card">
          <div className="card-head"><span className="card-title">Individual Contribution</span></div>
          <div style={{fontSize:12,lineHeight:1.7,color:"var(--ink-2)"}}>{submissionAnalysis.individualContributionQuality}</div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--sp3)",marginBottom:"var(--sp3)"}}>
        <div className="card">
          <div className="card-head"><span className="card-title">AI-Risk Signal</span></div>
          <div style={{marginBottom:10}}>
            <span className="badge badge-amber" style={{fontSize:12,padding:"4px 12px"}}>{submissionAnalysis.aiGeneratedContentRisk}</span>
          </div>
          <div style={{fontSize:12,lineHeight:1.7,color:"var(--ink-2)"}}>Rapid generation signals detected in workflow section. Governance section lacks depth typical of human-authored content.</div>
        </div>
        <div className="card">
          <div className="card-head"><span className="card-title">Source / Citation Quality</span></div>
          <div style={{fontSize:12,lineHeight:1.7,color:"var(--ink-2)",marginBottom:10}}>{submissionAnalysis.citationIssue}</div>
          <div className="flag">⚠ Missing citations — human review required</div>
        </div>
      </div>

      <div className="card sp3">
        <div className="card-head"><span className="card-title">Suggested Feedback</span></div>
        <div style={{fontSize:12,lineHeight:1.8,color:"var(--ink-2)"}}>{submissionAnalysis.suggestedFeedback}</div>
      </div>

      <div className="card" style={{border:"2px solid var(--red-border)",background:"var(--red-light)"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,padding:"var(--sp3)"}}>
          <IconAlert />
          <div>
            <div style={{fontSize:13,fontWeight:800,marginBottom:4,color:"var(--red)"}}>Human Review Required</div>
            <div style={{fontSize:12,color:"var(--ink-2)"}}>{submissionAnalysis.humanReviewReason}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SCREEN: HITL Queue ──
function Hitl() {
  const redItems = hitlQueue.filter(h => h.level === "red");
  const amberItems = hitlQueue.filter(h => h.level === "yellow");
  const greenItems = hitlQueue.filter(h => h.level === "green");

  return (
    <div>
      <div className="screen-header">
        <h1 className="screen-title">HITL Queue</h1>
        <p className="screen-sub">What the professor sees: items requiring human-in-the-loop decisions, sorted by urgency.</p>
        <p className="screen-sub" style={{marginTop:6}}>Why it matters: Every decision here affects student grades and must be reviewed by the professor, not automated.</p>
      </div>

      <NarrativeBar />

      {/* Summary */}
      <div className="grid-3 sp6">
        <div className="card" style={{borderTop:"3px solid var(--red)"}}>
          <div className="card-head"><span className="card-title">Immediate Review</span><span className="badge badge-red">{redItems.length}</span></div>
          <div style={{fontSize:11,color:"var(--ink-2)"}}>AI-risk signals, failed Oxygen Tests, and academic integrity concerns. Must act today.</div>
        </div>
        <div className="card" style={{borderTop:"3px solid var(--amber)"}}>
          <div className="card-head"><span className="card-title">Monitor</span><span className="badge badge-amber">{amberItems.length}</span></div>
          <div style={{fontSize:11,color:"var(--ink-2)"}}>Borderline cases, declining engagement, incomplete sections. Nudge recommended.</div>
        </div>
        <div className="card" style={{borderTop:"3px solid var(--green)"}}>
          <div className="card-head"><span className="card-title">No Action Needed</span><span className="badge badge-green">{greenItems.length}</span></div>
          <div style={{fontSize:11,color:"var(--ink-2)"}}>On track. Confirm presentation slots. Consider as peer examples.</div>
        </div>
      </div>

      {/* Immediate Review */}
      <div className="card sp4">
        <div className="card-head"><span className="card-title">Immediate Review</span><span className="badge badge-red">{redItems.length} items</span></div>
        {redItems.map(item => (
          <div key={item.id} className="hitl-item red">
            <div className="hitl-head">
              <span className="hitl-entity">{item.team}</span>
              <span className="hitl-badge"><span className="badge badge-red">Critical</span></span>
            </div>
            <div className="hitl-reason">{item.reason}</div>
            <div className="hitl-action red">→ {item.action}</div>
          </div>
        ))}
      </div>

      {/* Monitor */}
      <div className="card sp4">
        <div className="card-head"><span className="card-title">Monitor</span><span className="badge badge-amber">{amberItems.length} items</span></div>
        {amberItems.map(item => (
          <div key={item.id} className="hitl-item amber">
            <div className="hitl-head">
              <span className="hitl-entity">{item.team}</span>
              <span className="hitl-badge"><span className="badge badge-amber">Monitor</span></span>
            </div>
            <div className="hitl-reason">{item.reason}</div>
            <div className="hitl-action blue">→ {item.action}</div>
          </div>
        ))}
      </div>

      {/* No Action */}
      <div className="card">
        <div className="card-head"><span className="card-title">No Action Needed</span><span className="badge badge-green">{greenItems.length} items</span></div>
        {greenItems.map(item => (
          <div key={item.id} className="hitl-item green">
            <div className="hitl-head">
              <span className="hitl-entity">{item.team}</span>
              <span className="hitl-badge"><span className="badge badge-green">Clear</span></span>
            </div>
            <div className="hitl-reason">{item.reason}</div>
            <div className="hitl-action blue">→ {item.action}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SCREEN: Daily Debrief ──
function Debrief() {
  return (
    <div>
      <div className="screen-header">
        <h1 className="screen-title">Daily Debrief</h1>
        <p className="screen-sub">What the professor sees: automatically generated briefing of what worked, what didn't, and what to adjust tomorrow.</p>
        <p className="screen-sub" style={{marginTop:6}}>Why it matters: Daily course corrections prevent Day 4 from becoming a crisis. Adjust messaging before tomorrow's session.</p>
      </div>

      <NarrativeBar />

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--sp3)",marginBottom:"var(--sp4)"}}>
        <div className="card">
          <div className="card-head"><span className="card-title">What Worked Today</span></div>
          <ul className="deb-ul">
            {dailyDebrief.whatWorkedToday.map((item,i) => <li key={i} className="deb-li">{item}</li>)}
          </ul>
        </div>
        <div className="card">
          <div className="card-head"><span className="card-title">What Did Not Work</span></div>
          <ul className="deb-ul">
            {dailyDebrief.whatDidNotWorkToday.map((item,i) => <li key={i} className="deb-li">{item}</li>)}
          </ul>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--sp3)",marginBottom:"var(--sp4)"}}>
        <div className="card">
          <div className="card-head"><span className="card-title">Blocked Teams</span><span className="badge badge-red">2</span></div>
          {dailyDebrief.blockedTeams.map((t,i) => (
            <div key={i} style={{padding:"10px 0",borderBottom:"1px solid var(--rule-light)"}}>
              <div style={{fontSize:12,fontWeight:700,color:"var(--red)",marginBottom:4}}>{t.split(":")[0]}</div>
              <div style={{fontSize:11,color:"var(--ink-2)"}}>{t.split(":").slice(1).join(":").trim()}</div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-head"><span className="card-title">Underused Materials</span><span className="badge badge-amber">3</span></div>
          {dailyDebrief.underusedMaterials.map((m,i) => (
            <div key={i} style={{padding:"10px 0",borderBottom:"1px solid var(--rule-light)"}}>
              <div style={{fontSize:12,fontWeight:600,marginBottom:4}}>{m.split("(")[0].trim()}</div>
              <div style={{fontSize:11,color:"var(--ink-3)"}}>{m.split("(")[1]?.replace(")","") || ""}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card sp4">
        <div className="card-head"><span className="card-title">Tool Confusion Signals</span></div>
        <ul className="deb-ul">
          {dailyDebrief.confusingTools.map((t,i) => <li key={i} className="deb-li">{t}</li>)}
        </ul>
      </div>

      <div className="card sp4">
        <div className="card-head"><span className="card-title">Adjustments for Tomorrow</span></div>
        <ul className="deb-ul">
          {dailyDebrief.adjustmentsForTomorrow.map((a,i) => <li key={i} className="deb-li">{a}</li>)}
        </ul>
      </div>

      <div className="card">
        <div className="card-head"><span className="card-title">Suggested Google Classroom Announcement</span></div>
        <div className="deb-ann">{dailyDebrief.suggestedAnnouncement}</div>
      </div>
    </div>
  );
}

// ── SCREEN: Workflow Architecture ──
function Workflow() {
  return (
    <div>
      <div className="screen-header">
        <h1 className="screen-title">Workflow Architecture</h1>
        <p className="screen-sub">What the professor sees: how student work flows through the system — from input signals to professor decisions.</p>
        <p className="screen-sub" style={{marginTop:6,color:"var(--indigo)",fontWeight:700}}>The system recommends. The professor decides.</p>
      </div>

      <NarrativeBar />

      <div className="card sp4" style={{border:"2px solid var(--indigo-border)",background:"var(--indigo-light)"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,padding:"var(--sp2) var(--sp3)"}}>
          <IconAlert />
          <div style={{fontSize:12,fontWeight:600,color:"var(--indigo)"}}>
            HITL = Human-in-the-Loop. Every flagged signal goes to the professor for a decision. The system never grades or dismisses a risk signal autonomously.
          </div>
        </div>
      </div>

      <div className="wf-flow sp6">
        <div className="wf-col wf-col-in">
          <div className="wf-col-title">
            <span>Inputs</span>
            <span className="wf-count">{workflowArchitecture.inputs.length}</span>
          </div>
          {workflowArchitecture.inputs.map((item,i) => (
            <div key={i} className="wf-chip">{item}</div>
          ))}
        </div>
        <div className="wf-arrow">→</div>
        <div className="wf-col wf-col-pr">
          <div className="wf-col-title">
            <span>Processing</span>
            <span className="wf-count">{workflowArchitecture.processing.length}</span>
          </div>
          {workflowArchitecture.processing.map((item,i) => (
            <div key={i} className="wf-chip">{item}</div>
          ))}
        </div>
        <div className="wf-arrow">→</div>
        <div className="wf-col" style={{borderTop:"3px solid var(--indigo)"}}>
          <div className="wf-col-title">
            <span>Human-in-the-Loop</span>
            <span className="wf-count" style={{background:"var(--indigo-light)",color:"var(--indigo)"}}>HITL</span>
          </div>
          <div style={{fontSize:11,color:"var(--indigo)",fontWeight:700,marginBottom:8,padding:"8px 10px",background:"var(--indigo-light)",borderRadius:6}}>
            Professor reviews and approves all flagged items
          </div>
          <div style={{fontSize:10,color:"var(--ink-3)",lineHeight:1.6}}>AI-risk signals, late submissions, Oxygen Test failures, academic integrity concerns</div>
        </div>
        <div className="wf-arrow">→</div>
        <div className="wf-col wf-col-ou">
          <div className="wf-col-title">
            <span>Outputs</span>
            <span className="wf-count">{workflowArchitecture.outputs.length}</span>
          </div>
          {workflowArchitecture.outputs.map((item,i) => (
            <div key={i} className="wf-chip">{item}</div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-head"><span className="card-title">HITL Key Principle</span></div>
        <div style={{fontSize:14,fontWeight:800,color:"var(--ink)",marginBottom:8}}>The system recommends. The professor decides.</div>
        <div style={{fontSize:12,color:"var(--ink-2)",lineHeight:1.7}}>
          This cockpit is an AI-assisted decision support system — not an autonomous grading system. Every risk signal, every intervention recommendation, and every flagged submission requires professor sign-off before any student-facing action is taken. The AI surfaces patterns; the professor owns the judgment.
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ──
export default function App() {
  const [screen, setScreen] = useState<Screen>("overview");

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric", year:"numeric" });

  const SCREENS: Record<Screen, () => JSX.Element> = {
    overview: Overview,
    students: Students,
    teams: Teams,
    framework: Framework,
    submission: Submission,
    hitl: Hitl,
    debrief: Debrief,
    workflow: Workflow,
  };

  const ActiveScreen = SCREENS[screen];

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-mark">
            <div className="sidebar-logo-icon">
              <IconDashboard />
            </div>
            <div>
              <div className="sidebar-logo-text">AI Native Week</div>
              <div className="sidebar-logo-sub">Professor Cockpit</div>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Dashboard</div>
          {NAV_ITEMS.slice(0,1).map(item => (
            <div key={item.id} className={`sidebar-item${screen===item.id?" active":""}`} onClick={()=>setScreen(item.id)}>
              <item.icon />
              {item.label}
            </div>
          ))}
          <div className="sidebar-section-label">Students & Teams</div>
          {NAV_ITEMS.slice(1,3).map(item => (
            <div key={item.id} className={`sidebar-item${screen===item.id?" active":""}`} onClick={()=>setScreen(item.id)}>
              <item.icon />
              {item.label}
            </div>
          ))}
          <div className="sidebar-section-label">Analysis</div>
          {NAV_ITEMS.slice(3,8).map(item => (
            <div key={item.id} className={`sidebar-item${screen===item.id?" active":""}`} onClick={()=>setScreen(item.id)}>
              <item.icon />
              {item.label}
              {item.badge && <span className={`sidebar-badge ${item.badgeType==="red"?"badge-red-bg":"badge-amber-bg"}`}>{item.badge}</span>}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-text">Prototype Build<br/>Synthetic anonymized data only</div>
        </div>
      </aside>

      {/* Main area */}
      <div className="main-area">
        {/* Top header */}
        <header className="top-header">
          <div className="header-left">
            <div className="header-course">AI Native Enterprise Week</div>
            <div className="header-meta">
              <span className="header-day">Day 3 of 4</span>
              <span className="proto-badge">Prototype Mode: Synthetic anonymized data</span>
              <span className="header-date">{dateStr}</span>
            </div>
          </div>
          <div className="header-right">
            <button className="run-btn" onClick={() => setScreen("hitl")}>
              <IconPlay />
              Run Today's AI Lab Check
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="page-content">
          <ActiveScreen />
        </main>
      </div>
    </div>
  );
}
