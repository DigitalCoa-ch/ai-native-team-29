// Mock data for AI Native Professor Cockpit
// All data is synthetic and anonymized

export const courseStats = {
  totalStudents: 82,
  activeStudents: 80,
  assignmentCompletion: 35,
  averageGrade: "Pending",
  missingAssignments: 12,
  lateSubmissions: 8,
  materialsNotOpened: 5,
};

export const topPriorities = [
  { id: 1, text: "Follow up with 12 students who have missing assignments from Day 1-2", priority: "high" },
  { id: 2, text: "Review late submissions from Teams 3, 7, and 11 for AI-generated content risk signals", priority: "high" },
  { id: 3, text: "Check in with Teams 4, 8, and 15 who show low material engagement", priority: "medium" },
  { id: 4, text: "Schedule 1:1 sessions with red-flagged students before Day 4 presentations", priority: "medium" },
  { id: 5, text: "Prepare intervention messages for teams with low Oxygen Test scores", priority: "low" },
];

export const students = [
  { id: "S001", name: "Student Alpha", completion: 100, missing: 0, late: 0, materialsOpened: 100, contributionQuality: "High", aiRisk: "Low", status: "green", action: "On track" },
  { id: "S002", name: "Student Beta", completion: 88, missing: 1, late: 0, materialsOpened: 90, contributionQuality: "High", aiRisk: "Low", status: "green", action: "Minor follow-up" },
  { id: "S003", name: "Student Gamma", completion: 75, missing: 2, late: 1, materialsOpened: 80, contributionQuality: "Medium", aiRisk: "Medium", status: "yellow", action: "Monitor closely" },
  { id: "S004", name: "Student Delta", completion: 62, missing: 3, late: 2, materialsOpened: 70, contributionQuality: "Medium", aiRisk: "Medium", status: "yellow", action: "Send nudge" },
  { id: "S005", name: "Student Epsilon", completion: 50, missing: 4, late: 1, materialsOpened: 60, contributionQuality: "Low", aiRisk: "High", status: "red", action: "Immediate review" },
  { id: "S006", name: "Student Zeta", completion: 100, missing: 0, late: 0, materialsOpened: 100, contributionQuality: "High", aiRisk: "Low", status: "green", action: "On track" },
  { id: "S007", name: "Student Eta", completion: 88, missing: 1, late: 0, materialsOpened: 85, contributionQuality: "High", aiRisk: "Low", status: "green", action: "Minor follow-up" },
  { id: "S008", name: "Student Theta", completion: 38, missing: 5, late: 3, materialsOpened: 45, contributionQuality: "Low", aiRisk: "High", status: "red", action: "Immediate review" },
  { id: "S009", name: "Student Iota", completion: 75, missing: 2, late: 0, materialsOpened: 75, contributionQuality: "Medium", aiRisk: "Medium", status: "yellow", action: "Monitor closely" },
  { id: "S010", name: "Student Kappa", completion: 62, missing: 3, late: 1, materialsOpened: 65, contributionQuality: "Medium", aiRisk: "Low", status: "yellow", action: "Send nudge" },
  { id: "S011", name: "Student Lambda", completion: 100, missing: 0, late: 0, materialsOpened: 95, contributionQuality: "High", aiRisk: "Low", status: "green", action: "On track" },
  { id: "S012", name: "Student Mu", completion: 88, missing: 1, late: 1, materialsOpened: 85, contributionQuality: "High", aiRisk: "Medium", status: "green", action: "Minor follow-up" },
  { id: "S013", name: "Student Nu", completion: 50, missing: 4, late: 2, materialsOpened: 55, contributionQuality: "Low", aiRisk: "High", status: "red", action: "Immediate review" },
  { id: "S014", name: "Student Xi", completion: 75, missing: 2, late: 0, materialsOpened: 80, contributionQuality: "Medium", aiRisk: "Low", status: "yellow", action: "Monitor closely" },
  { id: "S015", name: "Student Omicron", completion: 62, missing: 3, late: 1, materialsOpened: 60, contributionQuality: "Medium", aiRisk: "Medium", status: "yellow", action: "Send nudge" },
  { id: "S016", name: "Student Pi", completion: 100, missing: 0, late: 0, materialsOpened: 100, contributionQuality: "High", aiRisk: "Low", status: "green", action: "On track" },
  { id: "S017", name: "Student Rho", completion: 38, missing: 5, late: 3, materialsOpened: 40, contributionQuality: "Low", aiRisk: "High", status: "red", action: "Immediate review" },
  { id: "S018", name: "Student Sigma", completion: 88, missing: 1, late: 0, materialsOpened: 90, contributionQuality: "High", aiRisk: "Low", status: "green", action: "Minor follow-up" },
  { id: "S019", name: "Student Tau", completion: 75, missing: 2, late: 1, materialsOpened: 75, contributionQuality: "Medium", aiRisk: "Medium", status: "yellow", action: "Monitor closely" },
  { id: "S020", name: "Student Upsilon", completion: 62, missing: 3, late: 0, materialsOpened: 65, contributionQuality: "Medium", aiRisk: "Low", status: "yellow", action: "Send nudge" },
];

export const teams = [
  { id: "T01", name: "Project Aether", problemClarity: 85, audienceClarity: 80, painUrgency: 75, aiNativeScore: 70, oxygenTest: "Pass", workflowMap: "Complete", hitlDesign: "Defined", prototypeReadiness: 80, governanceReadiness: 65, presentationReadiness: 75, nextIntervention: "Review governance gaps before Day 4" },
  { id: "T02", name: "Project Beacon", problemClarity: 70, audienceClarity: 75, painUrgency: 80, aiNativeScore: 65, oxygenTest: "Pass", workflowMap: "Complete", hitlDesign: "Defined", prototypeReadiness: 65, governanceReadiness: 55, presentationReadiness: 60, nextIntervention: "Strengthen AI-native argument in prototype" },
  { id: "T03", name: "Project Cipher", problemClarity: 60, audienceClarity: 65, painUrgency: 70, aiNativeScore: 55, oxygenTest: "Conditionally Pass", workflowMap: "Draft", hitlDesign: "Partial", prototypeReadiness: 50, governanceReadiness: 40, presentationReadiness: 45, nextIntervention: "Critical: prototype incomplete, schedule 1:1" },
  { id: "T04", name: "Project Dynamo", problemClarity: 90, audienceClarity: 85, painUrgency: 85, aiNativeScore: 80, oxygenTest: "Pass", workflowMap: "Complete", hitlDesign: "Defined", prototypeReadiness: 85, governanceReadiness: 75, presentationReadiness: 80, nextIntervention: "Minor: add more HITL detail" },
  { id: "T05", name: "Project Echo", problemClarity: 75, audienceClarity: 70, painUrgency: 65, aiNativeScore: 60, oxygenTest: "Pass", workflowMap: "Complete", hitlDesign: "Defined", prototypeReadiness: 60, governanceReadiness: 50, presentationReadiness: 55, nextIntervention: "Work on presentation clarity" },
  { id: "T06", name: "Project Flux", problemClarity: 80, audienceClarity: 80, painUrgency: 75, aiNativeScore: 75, oxygenTest: "Pass", workflowMap: "Complete", hitlDesign: "Defined", prototypeReadiness: 75, governanceReadiness: 70, presentationReadiness: 70, nextIntervention: "Confirm prototype URL is public" },
  { id: "T07", name: "Project Ghost", problemClarity: 55, audienceClarity: 60, painUrgency: 65, aiNativeScore: 50, oxygenTest: "Fail", workflowMap: "Draft", hitlDesign: "Partial", prototypeReadiness: 40, governanceReadiness: 35, presentationReadiness: 35, nextIntervention: "Critical: Oxygen Test failed, major rework needed" },
  { id: "T08", name: "Project Helix", problemClarity: 85, audienceClarity: 80, painUrgency: 80, aiNativeScore: 78, oxygenTest: "Pass", workflowMap: "Complete", hitlDesign: "Defined", prototypeReadiness: 82, governanceReadiness: 72, presentationReadiness: 78, nextIntervention: "Review AI-risk governance" },
];

export const frameworkAnalysis = {
  problem: "The team has identified a clear and specific problem around manual content curation inefficiencies in small media teams. The problem statement is well-articulated and grounded in real operational friction.",
  audience: "The target audience (small media teams, 5-25 people) is clearly defined. However, the analysis could benefit from more specific segmentation within this cohort.",
  pain: "The pain points are well-documented with evidence from the revision history. Urgency is moderate to high, though the team should validate frequency assumptions.",
  wedge: "The AI-native wedge is partially defined. The core automation layer exists, but the differentiation versus simpler AI-enabled alternatives needs more articulation.",
  oxygenTest: "The Oxygen Test response is thoughtful. Removing AI would significantly impact the workflow, but the team should clarify what happens in edge cases. Score: Conditionally Pass.",
  sevenLayers: "Data layer: Present and functional. Agent logic: Defined with clear boundaries. Workflow: Mapped but some escalation points need refinement. Human oversight: Partially defined. Governance: Early stage. The 7-layer model is mostly complete with identified gaps in monitoring and escalation.",
  perch: "The PERCH analysis covers all five elements adequately. The revenue model needs more stress-testing and the competitor analysis should be expanded.",
  hitlPattern: "The HITL pattern is defined but the review frequency and escalation thresholds are vague. The team should specify when human approval is mandatory versus discretionary.",
  governanceRisk: "Medium risk. Data handling policies are mentioned but not fully specified. No explicit audit trail or compliance mechanism visible yet.",
  prototypeProof: "The prototype URL is live and functional. Workflow logic is demonstrated. Some key decision points are visible. Governance proof points are minimal and should be addressed before Day 4.",
};

export const submissionAnalysis = {
  onTime: false,
  completeness: 75,
  collaborationEvidence: "Mixed. GitHub history shows uneven contribution. Some files show signs of rapid generation.",
  individualContributionQuality: "Medium. Strong individual section on HITL design, weak governance discussion.",
  aiGeneratedContentRisk: "Medium-High",
  missingCitations: true,
  citationIssue: "Workflow diagram references AI best practices without specific source. HITL pattern section cites no academic or industry sources.",
  suggestedFeedback: "Strong foundation on workflow logic. Need to ground governance claims with specific frameworks or regulations. Strengthen individual contribution on risk analysis.",
  humanReviewRequired: true,
  humanReviewReason: "AI-risk signal and missing citations warrant professor review before feedback is sent.",
};

export const hitlQueue = [
  { id: 1, team: "T07 (Project Ghost)", level: "red", reason: "Oxygen Test failed. Prototype URL not accessible. No meaningful GitHub commits from 3 of 4 members in the past 48 hours.", action: "Schedule immediate 1:1. Consider whether team should continue or merge with another team." },
  { id: 2, team: "S008 (Student Theta)", level: "red", reason: "Highest risk signal: 38% completion, 3 late submissions, AI-risk flags on recent submissions, only 40% materials opened.", action: "Direct professor outreach. Review all submissions for AI-generated content before grading." },
  { id: 3, team: "S013 (Student Nu)", level: "red", reason: "4 missing assignments, 2 late submissions, AI-risk medium-high on workflow submission.", action: "Send warning message via Google Classroom. Request meeting before Day 4." },
  { id: 4, team: "S017 (Student Rho)", level: "red", reason: "5 missing assignments, 3 late submissions, lowest material engagement at 40%, AI-risk high on multiple submissions.", action: "Direct outreach. Flag for academic integrity review." },
  { id: 5, team: "T03 (Project Cipher)", level: "yellow", reason: "Prototype URL accessible but workflow incomplete. Oxygen Test conditionally passed with reservations.", action: "Send nudge about governance gaps. Request self-assessment of prototype readiness." },
  { id: 6, team: "S004 (Student Delta)", level: "yellow", reason: "3 missing assignments, declining engagement over Days 2-3.", action: "Send encouraging nudge. Remind of available Gems / AI coaches." },
  { id: 7, team: "T05 (Project Echo)", level: "yellow", reason: "Prototype complete but Oxygen Test score borderline. HITL design vague.", action: "Send feedback on HITL clarity. Request revision before Day 4 presentation." },
  { id: 8, team: "S015 (Student Omicron)", level: "yellow", reason: "3 missing assignments, material engagement dropping, no late submissions.", action: "Send reminder about assignment weights and deadlines." },
  { id: 9, team: "S001 (Student Alpha)", level: "green", reason: "All assignments on time, 100% completion, high quality contributions.", action: "No action needed. Consider highlighting as peer example." },
  { id: 10, team: "T04 (Project Dynamo)", level: "green", reason: "Prototype ready, workflow complete, strong governance discussion.", action: "No action needed. Confirm presentation slot." },
  { id: 11, team: "S006 (Student Zeta)", level: "green", reason: "100% on-time completion, strong individual contribution quality.", action: "No action needed." },
  { id: 12, team: "S018 (Student Sigma)", level: "green", reason: "High engagement, on-time submissions, no risk signals.", action: "No action needed." },
];

export const dailyDebrief = {
  whatWorkedToday: [
    "Teams that submitted early in the morning maintained better quality than those who rushed at deadline.",
    "The Gems / AI coaches attached to Day 3 workflow assignments were actively used by most teams.",
    "GitHub revision history continues to be the most reliable signal for individual contribution tracking.",
  ],
  whatDidNotWorkToday: [
    "Assignment completion dropped to 35% overall - lowest engagement day of the week.",
    "Several students did not open the Day 3 HITL design materials despite attending the session.",
    "Teams 3, 7, and 11 submitted late with incomplete governance sections.",
    "Student Tau and Student Omicron showed sudden drop in engagement on Day 3 materials.",
  ],
  blockedTeams: [
    "Project Ghost (T07): No functioning prototype URL, team communication breakdown.",
    "Project Cipher (T03): Governance section incomplete, unclear how AI-native design differentiates from AI-enabled.",
  ],
  underusedMaterials: [
    "Day 3 HITL Design Guide (60% not opened)",
    "Governance Risk Framework overview (45% not opened)",
    "7-Layer AI-Native Capability Model explainer (38% not opened)",
  ],
  confusingTools: [
    "GitHub repository structure: Teams unsure where to place prototype URLs vs workflow documents.",
    "Google Slides submission process: Some teams submitted to wrong assignment slot.",
    "PERCH framework template: Confusion about which section corresponds to which framework element.",
  ],
  adjustmentsForTomorrow: [
    "Add clear deadline reminder at 6 PM today.",
    "Create short Loom video clarifying GitHub repository structure for Day 4 deliverables.",
    "Send targeted email to teams with incomplete governance sections.",
    "Re-share Gems for teams that have not used them yet.",
    "Prepare 1:1 sessions for red-flagged students.",
  ],
  suggestedAnnouncement: "Day 3 Check-In - Attention All Teams. We noticed some teams are still wrapping up Day 3 submissions. A reminder that all workflow documents should be in your GitHub repo by end of day. Your prototype URL must be publicly accessible for tomorrow's presentations. If you haven't opened the HITL Design Guide, please do so - it's linked in Classroom. If you're stuck, reach out via the Gems / AI coaches or message me directly. For those on track - great work today. See you tomorrow for final presentations!",
};

export const workflowArchitecture = {
  inputs: [
    "Google Classroom assignment status",
    "Google Docs revision history",
    "Google Slides / Docs submissions",
    "Gems usage indicators",
    "Material open rates",
    "Feedback forms",
    "Team worksheets",
    "Final prototype links",
  ],
  processing: [
    "Completion checker",
    "Late submission detector",
    "Team contribution analyzer",
    "AI-risk signal analyzer",
    "Framework alignment analyzer",
    "HITL triage engine",
    "Daily debrief generator",
  ],
  outputs: [
    "Professor cockpit",
    "Student risk flags",
    "Team readiness scores",
    "Suggested feedback",
    "Intervention queue",
    "Daily classroom announcement",
  ],
};
