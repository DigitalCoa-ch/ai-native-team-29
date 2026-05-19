import { useState } from "react";
import { courseStats, topPriorities, students, teams, frameworkAnalysis, submissionAnalysis, hitlQueue, dailyDebrief, workflowArchitecture } from "../data/mockData";

type Screen = "overview" | "students" | "teams" | "framework" | "submission" | "hitl" | "debrief" | "workflow";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("overview");
  const [studentFilter, setStudentFilter] = useState<string>("all");
  const [teamFilter, setTeamFilter] = useState<string>("all");
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);

  const renderNav = () => (
    <nav className="nav">
      {(["overview", "students", "teams", "framework", "submission", "hitl", "debrief", "workflow"] as Screen[]).map((s) => (
        <div key={s} className={`nav-item ${screen === s ? "active" : ""}`} onClick={() => setScreen(s)}>
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </div>
      ))}
    </nav>
  );

  const renderOverview = () => (
    <div>
      <div className="page-header">
        <h1 className="page-title">AI Native Week — Professor Cockpit</h1>
        <p className="page-subtitle">Day 3 of 4 — Prototype Build Day</p>
      </div>
      <div className="grid-4 mb-4">
        <div className="stat-card">
          <div className="stat-label">Active Students</div>
          <div className="stat-value text-green">{courseStats.activeStudents} <span style={{fontSize:"16px",color:"var(--text-muted)"}}>/ {courseStats.totalStudents}</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Assignment Completion</div>
          <div className="stat-value text-yellow">{courseStats.assignmentCompletion}%</div>
          <div className="progress-bar mt-2"><div className="progress-fill yellow" style={{width:"35%"}}/></div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Average Grade</div>
          <div className="stat-value text-muted">{courseStats.averageGrade}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Missing Assignments</div>
          <div className="stat-value text-red">{courseStats.missingAssignments}</div>
        </div>
      </div>
      <div className="grid-2 mb-4">
        <div className="card">
          <div className="card-header"><span className="card-title">Top Priorities Today</span><span className="badge badge-red">5 items</span></div>
          <ul className="priority-list">
            {topPriorities.map((p) => (
              <li key={p.id} className="priority-item">
                <div className="priority-number">{p.id}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:"14px"}}>{p.text}</div>
                  <div style={{fontSize:"12px",color:p.priority==="high"?"var(--red)":p.priority==="medium"?"var(--yellow)":"var(--text-muted)",marginTop:"4px",textTransform:"uppercase"}}>{p.priority}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Alerts</span></div>
          <div className="alert-card danger"><div className="alert-icon">!</div><div className="alert-text"><strong>4 students</strong> flagged for immediate review (AI-generated content risk signals)</div></div>
          <div className="alert-card warning"><div className="alert-icon">!</div><div className="alert-text"><strong>8 late submissions</strong> from Day 2-3 assignments</div></div>
          <div className="alert-card warning"><div className="alert-icon">!</div><div className="alert-text"><strong>5 materials</strong> have low open rates (&lt;50%)</div></div>
          <div className="alert-card info"><div className="alert-icon">i</div><div className="alert-text"><strong>Project Ghost (T07)</strong> — Oxygen Test failed, no working prototype</div></div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">HITL Decision Required</span><span className="badge badge-red">4 pending</span></div>
        <div style={{fontSize:"14px",color:"var(--text-secondary)"}}>The following decisions require professor approval before feedback is sent to students:</div>
        <div className="mt-2" style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
          <span className="badge badge-red">AI-risk review (4 cases)</span>
          <span className="badge badge-yellow">Late submission grace (8 cases)</span>
          <span className="badge badge-blue">Missing citation warning (3 cases)</span>
        </div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div>
      <div className="page-header">
        <h1 className="page-title">Student Risk Radar</h1>
        <p className="page-subtitle">20 of 80 students shown (synthetic anonymized data)</p>
      </div>
      <div className="filter-bar">
        <button className={`filter-btn ${studentFilter === "all" ? "active" : ""}`} onClick={() => setStudentFilter("all")}>All</button>
        <button className={`filter-btn ${studentFilter === "red" ? "active" : ""}`} onClick={() => setStudentFilter("red")}>Red Flag</button>
        <button className={`filter-btn ${studentFilter === "yellow" ? "active" : ""}`} onClick={() => setStudentFilter("yellow")}>Monitor</button>
        <button className={`filter-btn ${studentFilter === "green" ? "active" : ""}`} onClick={() => setStudentFilter("green")}>On Track</button>
      </div>
      <div className="table-container">
        <table>
          <thead><tr><th>ID</th><th>Completion</th><th>Missing</th><th>Late</th><th>Materials</th><th>Contribution</th><th>AI Risk</th><th>Status</th><th>Recommended Action</th></tr></thead>
          <tbody>
            {students.filter(s => studentFilter === "all" || s.status === studentFilter).map(s => (
              <tr key={s.id}>
                <td><span style={{fontFamily:"monospace"}}>{s.id}</span></td>
                <td><div style={{display:"flex",alignItems:"center",gap:"8px"}}><div className="progress-bar" style={{width:"60px"}}><div className={`progress-fill ${s.completion >= 75 ? "green" : s.completion >= 50 ? "yellow" : "red"}`} style={{width:`${s.completion}%`}}/></div><span style={{fontSize:"12px"}}>{s.completion}%</span></div></td>
                <td><span style={{color:s.missing > 2 ? "var(--red)" : "inherit"}}>{s.missing}</span></td>
                <td><span style={{color:s.late > 0 ? "var(--yellow)" : "inherit"}}>{s.late}</span></td>
                <td><span style={{color:s.materialsOpened < 60 ? "var(--red)" : "inherit"}}>{s.materialsOpened}%</span></td>
                <td><span className={`badge ${s.contributionQuality === "High" ? "badge-green" : s.contributionQuality === "Medium" ? "badge-yellow" : "badge-red"}`}>{s.contributionQuality}</span></td>
                <td><span className={`badge ${s.aiRisk === "Low" ? "badge-green" : s.aiRisk === "Medium" ? "badge-yellow" : "badge-red"}`}>{s.aiRisk}</span></td>
                <td><span className={`badge badge-${s.status}`}>{s.status.toUpperCase()}</span></td>
                <td style={{fontSize:"13px"}}>{s.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTeams = () => (
    <div>
      <div className="page-header">
        <h1 className="page-title">Team Progress Dashboard</h1>
        <p className="page-subtitle">8 synthetic teams — filter and click for detailed analysis</p>
      </div>
      <div className="filter-bar">
        <button className={`filter-btn ${teamFilter === "all" ? "active" : ""}`} onClick={() => setTeamFilter("all")}>All Teams</button>
        <button className={`filter-btn ${teamFilter === "red" ? "active" : ""}`} onClick={() => setTeamFilter("red")}>Critical</button>
        <button className={`filter-btn ${teamFilter === "yellow" ? "active" : ""}`} onClick={() => setTeamFilter("yellow")}>Needs Attention</button>
        <button className={`filter-btn ${teamFilter === "green" ? "active" : ""}`} onClick={() => setTeamFilter("green")}>On Track</button>
      </div>
      <div className="grid-2">
        {teams.filter(t => {
          if (teamFilter === "all") return true;
          if (teamFilter === "red") return t.oxygenTest === "Fail" || t.prototypeReadiness < 45;
          if (teamFilter === "yellow") return t.oxygenTest === "Conditionally Pass" || t.prototypeReadiness < 70;
          return t.oxygenTest === "Pass" && t.prototypeReadiness >= 70;
        }).map(t => {
          const overallScore = Math.round((t.problemClarity + t.audienceClarity + t.painUrgency + t.aiNativeScore + t.prototypeReadiness) / 5);
          return (
            <div key={t.id} className="team-card" onClick={() => { setSelectedTeam(t); setScreen("framework"); }} style={{cursor:"pointer"}}>
              <div className="team-header">
                <div>
                  <div className="team-name">{t.name} <span style={{fontSize:"12px",color:"var(--text-muted)"}}>({t.id})</span></div>
                  <div style={{fontSize:"12px",color:"var(--text-muted)",marginTop:"2px"}}>Oxygen Test: <span className={`badge ${t.oxygenTest === "Pass" ? "badge-green" : t.oxygenTest === "Conditionally Pass" ? "badge-yellow" : "badge-red"}`} style={{fontSize:"10px"}}>{t.oxygenTest}</span></div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:"24px",fontWeight:700}}>{overallScore}</div>
                  <div style={{fontSize:"11px",color:"var(--text-muted)"}}>Overall Score</div>
                </div>
              </div>
              <div className="team-metrics">
                <div className="team-metric"><span className="team-metric-label">Problem: </span><span className="team-metric-value">{t.problemClarity}%</span></div>
                <div className="team-metric"><span className="team-metric-label">Audience: </span><span className="team-metric-value">{t.audienceClarity}%</span></div>
                <div className="team-metric"><span className="team-metric-label">AI-Native: </span><span className="team-metric-value">{t.aiNativeScore}%</span></div>
                <div className="team-metric"><span className="team-metric-label">Prototype: </span><span className="team-metric-value">{t.prototypeReadiness}%</span></div>
                <div className="team-metric"><span className="team-metric-label">Governance: </span><span className="team-metric-value">{t.governanceReadiness}%</span></div>
                <div className="team-metric"><span className="team-metric-label">Presentation: </span><span className="team-metric-value">{t.presentationReadiness}%</span></div>
              </div>
              <div style={{marginTop:"12px",paddingTop:"12px",borderTop:"1px solid var(--border)",fontSize:"13px",color:"var(--accent)"}}>-&gt; {t.nextIntervention}</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderFramework = () => (
    <div>
      <div className="page-header">
        <h1 className="page-title">Framework Analyzer</h1>
        <p className="page-subtitle">Decision-support tool — professor remains final evaluator</p>
      </div>
      <div className="filter-bar mb-4">
        {teams.map(t => (
          <button key={t.id} className={`filter-btn ${selectedTeam.id === t.id ? "active" : ""}`} onClick={() => setSelectedTeam(t)}>{t.name}</button>
        ))}
      </div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">{selectedTeam.name} — Framework Analysis</span>
          <span className="badge badge-blue">AI-Generated Analysis</span>
        </div>
        <div style={{fontSize:"12px",color:"var(--text-muted)",marginBottom:"16px"}}>This analysis is a decision-support signal only. The professor remains the final evaluator of student work.</div>
        {[
          { title: "Problem", key: "problem" },
          { title: "Audience", key: "audience" },
          { title: "Pain", key: "pain" },
          { title: "Wedge", key: "wedge" },
          { title: "Oxygen Test", key: "oxygenTest" },
          { title: "7-Layer AI-Native Capability Model", key: "sevenLayers" },
          { title: "PERCH Analysis", key: "perch" },
          { title: "HITL Pattern", key: "hitlPattern" },
          { title: "Governance Risk", key: "governanceRisk" },
          { title: "Prototype Proof", key: "prototypeProof" },
        ].map(({ title, key }) => (
          <div key={key} className="analysis-section">
            <div className="analysis-title">{title}</div>
            <div className="analysis-content">{(frameworkAnalysis as Record<string, string>)[key]}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSubmission = () => (
    <div>
      <div className="page-header">
        <h1 className="page-title">Submission Analyzer</h1>
        <p className="page-subtitle">Mock submission analysis panel — human review required</p>
      </div>
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><span className="card-title">Submission Status</span></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
            <div><div style={{fontSize:"12px",color:"var(--text-muted)",marginBottom:"4px"}}>Timeliness</div><span className={`badge ${submissionAnalysis.onTime ? "badge-green" : "badge-red"}`}>{submissionAnalysis.onTime ? "ON TIME" : "LATE"}</span></div>
            <div><div style={{fontSize:"12px",color:"var(--text-muted)",marginBottom:"4px"}}>Completeness</div><span className="badge badge-blue">{submissionAnalysis.completeness}%</span></div>
            <div><div style={{fontSize:"12px",color:"var(--text-muted)",marginBottom:"4px"}}>Citations</div><span className={`badge ${submissionAnalysis.missingCitations ? "badge-red" : "badge-green"}`}>{submissionAnalysis.missingCitations ? "MISSING" : "OK"}</span></div>
            <div><div style={{fontSize:"12px",color:"var(--text-muted)",marginBottom:"4px"}}>Human Review</div><span className={`badge ${submissionAnalysis.humanReviewRequired ? "badge-red" : "badge-green"}`}>{submissionAnalysis.humanReviewRequired ? "REQUIRED" : "NOT NEEDED"}</span></div>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Risk Assessment</span></div>
          <div style={{marginBottom:"12px"}}><div style={{fontSize:"12px",color:"var(--text-muted)",marginBottom:"4px"}}>AI-Generated Content Risk</div><span className="badge badge-red">{submissionAnalysis.aiGeneratedContentRisk} — RISK SIGNAL</span></div>
          <div style={{marginBottom:"12px",color:"var(--text-muted)",marginBottom:"4px"}}>Collaboration Evidence</div><div style={{fontSize:"13px"}}>{submissionAnalysis.collaborationEvidence}</div></div>
          <div><div style={{fontSize:"12px",color:"var(--text-muted)",marginBottom:"4px"}}>Individual Contribution</div><div style={{fontSize:"13px"}}>{submissionAnalysis.individualContributionQuality}</div></div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Citation Check</span></div>
          <div style={{marginBottom:"12px"}}><span className={`badge ${submissionAnalysis.missingCitations ? "badge-red" : "badge-green"}`}>{submissionAnalysis.missingCitations ? "MISSING CITATIONS" : "CITATIONS OK"}</span></div>
          <div style={{fontSize:"13px",color:"var(--text-secondary)"}}>{submissionAnalysis.citationIssue}</div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Suggested Feedback</span></div>
          <div style={{fontSize:"14px",marginBottom:"12px"}}>{submissionAnalysis.suggestedFeedback}</div>
          <div style={{marginTop:"12px",padding:"12px",background:"var(--yellow-bg)",borderRadius:"6px"}}>
            <div style={{fontSize:"12px",color:"var(--yellow)",fontWeight:600,marginBottom:"4px"}}>HUMAN REVIEW REQUIRED</div>
            <div style={{fontSize:"13px"}}>{submissionAnalysis.humanReviewReason}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHITL = () => (
    <div>
      <div className="page-header">
        <h1 className="page-title">HITL Intervention Queue</h1>
        <p className="page-subtitle">Professor-ordered action queue — all cases require HITL approval before intervention</p>
      </div>
      <div className="grid-3 mb-4">
        <div className="stat-card" style={{borderLeft:"4px solid var(--red)"}}>
          <div className="stat-label">Red — Immediate Review</div>
          <div className="stat-value text-red">{hitlQueue.filter(q => q.level === "red").length}</div>
        </div>
        <div className="stat-card" style={{borderLeft:"4px solid var(--yellow)"}}>
          <div className="stat-label">Yellow — Monitor / Nudge</div>
          <div className="stat-value text-yellow">{hitlQueue.filter(q => q.level === "yellow").length}</div>
        </div>
        <div className="stat-card" style={{borderLeft:"4px solid var(--green)"}}>
          <div className="stat-label">Green — No Action</div>
          <div className="stat-value text-green">{hitlQueue.filter(q => q.level === "green").length}</div>
        </div>
      </div>
      {["red","yellow","green"].map(level => (
        <div key={level} className="mb-4">
          {hitlQueue.filter(q => q.level === level).map(item => (
            <div key={item.id} className={`queue-item ${level}`}>
              <div className="queue-header">
                <span className="queue-title">{item.team}</span>
                <span className={`badge badge-${level}`}>{level.toUpperCase()}</span>
              </div>
              <div className="queue-reason">Why flagged: {item.reason}</div>
              <div className="queue-action">Professor action: {item.action}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderDebrief = () => (
    <div>
      <div className="page-header">
        <h1 className="page-title">Daily Debrief Generator</h1>
        <p className="page-subtitle">Day 3 analysis — AI-native course operations signal summary</p>
      </div>
      <div className="debrief-section">
        <div className="debrief-title">What Worked Today</div>
        <div className="debrief-content">
          <ul>{dailyDebrief.whatWorkedToday.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </div>
      </div>
      <div className="debrief-section">
        <div className="debrief-title">What Did Not Work Today</div>
        <div className="debrief-content">
          <ul>{dailyDebrief.whatDidNotWorkToday.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </div>
      </div>
      <div className="debrief-section">
        <div className="debrief-title">Blocked Teams</div>
        <div className="debrief-content">
          <ul>{dailyDebrief.blockedTeams.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </div>
      </div>
      <div className="debrief-section">
        <div className="debrief-title">Underused Materials</div>
        <div className="debrief-content">
          <ul>{dailyDebrief.underusedMaterials.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </div>
      </div>
      <div className="debrief-section">
        <div className="debrief-title">Confusing Tools</div>
        <div className="debrief-content">
          <ul>{dailyDebrief.confusingTools.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </div>
      </div>
      <div className="debrief-section">
        <div className="debrief-title">Adjustments for Tomorrow</div>
        <div className="debrief-content">
          <ul>{dailyDebrief.adjustmentsForTomorrow.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </div>
      </div>
      <div className="debrief-section">
        <div className="debrief-title">Suggested Google Classroom Announcement</div>
        <div className="announcement-box">{dailyDebrief.suggestedAnnouncement}</div>
      </div>
    </div>
  );

  const renderWorkflow = () => (
    <div>
      <div className="page-header">
        <h1 className="page-title">System Architecture</h1>
        <p className="page-subtitle">How the professor cockpit processes inputs and generates signals</p>
      </div>
      <div className="workflow-diagram">
        <div className="workflow-section">
          <div className="workflow-section-title">Inputs</div>
          <div className="workflow-items">
            {workflowArchitecture.inputs.map(item => <div key={item} className="workflow-item">{item}</div>)}
          </div>
        </div>
        <div className="section-divider" />
        <div className="workflow-section">
          <div className="workflow-section-title">Processing</div>
          <div className="workflow-items">
            {workflowArchitecture.processing.map(item => <div key={item} className="workflow-item">{item}</div>)}
          </div>
        </div>
        <div className="section-divider" />
        <div className="workflow-section">
          <div className="workflow-section-title">Outputs</div>
          <div className="workflow-items">
            {workflowArchitecture.outputs.map(item => <div key={item} className="workflow-item">{item}</div>)}
          </div>
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-header"><span className="card-title">HITL Principle</span></div>
        <div style={{fontSize:"14px",color:"var(--text-secondary)",lineHeight:1.7}}>
          The professor approves all final feedback, grading decisions, risk judgments, and student interventions. 
          AI-generated analysis is a decision-support signal only. The professor remains the final evaluator of all student work.
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{background:"linear-gradient(90deg, #7c3aed, #a855f7, #c084fc)",color:"white",textAlign:"center",padding:"10px 16px",fontSize:"13px",fontWeight:600,letterSpacing:"0.5px"}}>
        PROTOTYPE MODE: Synthetic anonymized data only — No real student or Google Classroom data
      </div>
      {renderNav()}
      <main className="main-content">
        {screen === "overview" && renderOverview()}
        {screen === "students" && renderStudents()}
        {screen === "teams" && renderTeams()}
        {screen === "framework" && renderFramework()}
        {screen === "submission" && renderSubmission()}
        {screen === "hitl" && renderHITL()}
        {screen === "debrief" && renderDebrief()}
        {screen === "workflow" && renderWorkflow()}
      </main>
    </div>
  );
}
