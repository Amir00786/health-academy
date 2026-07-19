/* ============================================================
   CASE DATA — 15 graded cases, drawn from the same concepts
   already taught across Videos 2–6 (HQ, exclusions, liability,
   chronic limits, DME) for course consistency.
   ============================================================ */
const CASES = [
  { id:1, ref:"2026/700101", wait:12, name:"Male Patient", age:45, gender:"M", benefit:"H-OP / Out Patient", hcp:"Al Noor Medical Center - Riyadh",
    dx:"E11.9 — Type 2 Diabetes Mellitus, without complications",
    complaint:"Routine follow-up visit, requesting HbA1c and Metformin renewal.",
    requested:"HbA1c test, Metformin 500mg × 90 tabs",
    hasHQ:true, hqList:[],
    history:[
      {ref:"2025/551201",date:"14/03/2025",benefit:"Out Patient",dx:"Type 2 Diabetes",amt:"96.00",status:"Paid"},
      {ref:"2024/338820",date:"02/09/2024",benefit:"Out Patient",dx:"Type 2 Diabetes",amt:"88.50",status:"Paid"}
    ],
    documents:[
      {title:"HQ Declaration Form", necessary:false, content:"Health Questionnaire on file at enrollment. No hospital admission history for this member. Routine outpatient-managed conditions like DM and HTN are not required HQ declaration items unless there has been a prior admission for them."},
      {title:"Clinic Referral Note", necessary:true, content:"Stable T2DM, routine 3-month follow-up, HbA1c due, continue Metformin."},
      {title:"Dental Invoice (2023)", necessary:false, content:"Unrelated dental scaling invoice from a prior year — no relevance to this request."}
    ],
    questions:[
      {q:"Does Diabetes need to be declared on the HQ?", a:"Not necessarily — DM and HTN are only required HQ items if the member has a prior hospital admission for the condition. This member has no admission history, so non-declaration isn't an issue here."},
      {q:"Any new complications since enrollment?", a:"No new complications reported; the condition remains stable on oral therapy."},
      {q:"Is the requested treatment consistent with standard guidelines?", a:"Yes — HbA1c monitoring and Metformin continuation are standard first-line management."}
    ],
    correct:"approve", rationale:"Stable, guideline-consistent outpatient management of a routine chronic condition. DM doesn't require HQ declaration absent a prior admission, so there's no disclosure issue — no exclusion applies."
  },
  { id:2, ref:"2026/700102", wait:95, name:"Male Patient", age:38, gender:"M", benefit:"H-IP / In Patient", hcp:"United Doctors Hospital - Jeddah",
    dx:"B18.2 — Chronic viral hepatitis C, with decompensation",
    complaint:"Admitted with jaundice and ascites, decompensated liver disease.",
    requested:"Inpatient admission, liver function panel, diuretics, paracentesis",
    hasHQ:true, hqList:[],
    history:[{ref:"2025/119004",date:"20/01/2025",benefit:"Out Patient",dx:"Fatigue, unspecified",amt:"64.00",status:"Paid"}],
    documents:[
      {title:"HQ Declaration Form", necessary:true, content:"Health Questionnaire signed 6 months ago at policy inception. No chronic illness declared. No liver disease mentioned."},
      {title:"Admission Medical Report", necessary:true, content:"History taking documents the patient's own report: 'known Hepatitis C, diagnosed approximately 3 years ago, previously untreated.' Current decompensation is consistent with long-standing disease."},
      {title:"Underwriting Review Note", necessary:true, content:"Case flagged and reviewed by underwriting: non-disclosure confirmed. Diagnosis pre-dates policy inception by approximately 2.5 years and was not disclosed on the HQ."}
    ],
    questions:[
      {q:"Was Hepatitis C declared on the Health Questionnaire?", a:"No — the HQ shows no chronic illness declared at enrollment."},
      {q:"Does the medical record show when the condition was first diagnosed?", a:"Yes — the admission report documents the patient's own account of diagnosis roughly 3 years before the policy started."}
    ],
    correct:"reject", rationale:"Underwriting has already confirmed non-disclosure of a condition that materially pre-dates the policy. This isn't a snap judgment — the investigation is complete, and it supports rejection."
  },
  { id:3, ref:"2026/700103", wait:40, name:"Male Patient", age:29, gender:"M", benefit:"H-OP / Out Patient", hcp:"Al Samria Medical Center 2 - Jeddah",
    dx:"S83.5 — Sprain of cruciate ligament, right knee",
    complaint:"Requesting ACL reconstruction surgery, right knee instability.",
    requested:"MRI-confirmed ACL reconstruction, pre-operative workup",
    hasHQ:true, hqList:[],
    history:[],
    documents:[
      {title:"HQ Declaration Form", necessary:true, content:"Health Questionnaire signed 14 months ago. No prior joint or orthopedic issues declared."},
      {title:"Current MRI Report", necessary:true, content:"Right knee MRI: complete ACL tear, moderate joint effusion."},
      {title:"Prior MRI Report (Pre-Policy)", necessary:true, content:"MRI dated 15 months before policy inception, from a different facility: partial tear of the right ACL, same knee."}
    ],
    questions:[
      {q:"Is there any imaging that predates the policy?", a:"Yes — a prior MRI exists, dated 15 months before the policy started, showing a partial tear in the same knee."},
      {q:"Was any knee condition declared on the HQ?", a:"No — the HQ shows no orthopedic history declared."}
    ],
    correct:"reject", rationale:"Imaging confirms pre-existing joint pathology predating the policy, and it wasn't disclosed on the HQ."
  },
  { id:4, ref:"2026/700104", wait:20, name:"Female Patient", age:26, gender:"F", benefit:"H-OP / Out Patient", hcp:"Al Andalus Specialized Clinic - Riyadh",
    dx:"J34.2 — Deviated nasal septum (patient-reported)",
    complaint:"Requesting rhinoplasty, states difficulty breathing.",
    requested:"Septorhinoplasty",
    hasHQ:true, hqList:["No relevant conditions declared"],
    history:[],
    documents:[
      {title:"HQ Declaration Form", necessary:false, content:"No relevant prior conditions declared — not directly informative for this decision."},
      {title:"ENT Consultation Report", necessary:true, content:"ENT exam: nasal airway patent bilaterally, no septal deviation on endoscopy, no functional obstruction identified. Cosmetic concern noted by the patient regarding nasal appearance."},
      {title:"Old Lab Report", necessary:false, content:"Routine CBC from 8 months ago, within normal limits — unrelated to the current request."}
    ],
    questions:[
      {q:"Does the ENT exam confirm a functional airway obstruction?", a:"No — the ENT report specifically notes no septal deviation and no functional obstruction on exam."},
      {q:"Is there objective testing documenting breathing impairment?", a:"No airflow study was performed or documented; the complaint is subjective and appearance-related per the consultation note."}
    ],
    correct:"reject", rationale:"No confirmed functional impairment — the ENT exam is normal. This reads as a cosmetic request, excluded under routine policy terms."
  },
  { id:5, ref:"2026/700105", wait:80, name:"Male Patient", age:52, gender:"M", benefit:"H-ER / Emergency", hcp:"United Doctors Hospital - Jeddah",
    dx:"T14.8 — Injury from external cause, storm-related",
    complaint:"Admitted with crush injuries following a building collapse during severe flooding.",
    requested:"Emergency admission, surgical fixation of fractures",
    hasHQ:false, hqList:[],
    history:[],
    documents:[
      {title:"Emergency Admission Report", necessary:true, content:"Patient brought in following structural collapse during a declared flood event in the region. Multiple long-bone fractures, hemodynamically stable."},
      {title:"Civil Defense Incident Report", necessary:true, content:"Official incident report confirms the injury occurred during a declared flood/natural disaster event in the area."},
      {title:"Insurance Card Copy", necessary:false, content:"Standard insurance card image — no additional clinical information."}
    ],
    questions:[
      {q:"Is this injury related to a declared natural disaster event?", a:"Yes — the Civil Defense report confirms the injury occurred during a declared flood event."},
      {q:"Is there any rider or legal requirement overriding the standard exclusion?", a:"No special legal mandate or policy rider is on file for this member."}
    ],
    correct:"reject", rationale:"Natural disaster injuries are excluded under the Basic Health Insurance Policy unless required by law or covered by a specific rider — neither applies here."
  },
  { id:6, ref:"2026/700106", wait:5, name:"Female Newborn Patient", age:0, gender:"F", benefit:"H-IP / In Patient", hcp:"United Doctors Hospital - Jeddah",
    dx:"Q79.1 — Congenital diaphragmatic hernia",
    complaint:"Newborn with severe respiratory distress, confirmed diaphragmatic hernia, requires emergency surgical repair.",
    requested:"Emergency neonatal surgical repair, NICU admission",
    hasHQ:false, hqList:[],
    history:[],
    documents:[
      {title:"Neonatal Surgical Report", necessary:true, content:"Confirmed congenital diaphragmatic hernia with bowel herniation into the thoracic cavity, causing severe respiratory compromise. Immediate surgical repair indicated to prevent mortality."},
      {title:"NICU Admission Note", necessary:true, content:"Neonate in critical but stabilized condition on ventilatory support, awaiting emergency surgery."},
      {title:"Family Insurance Summary", necessary:false, content:"General family policy summary document, not specific to this admission."}
    ],
    questions:[
      {q:"Is this condition immediately life-threatening without intervention?", a:"Yes — without urgent surgical repair, the condition carries a high risk of mortality due to respiratory compromise."},
      {q:"Is this an urgent or elective congenital case?", a:"This is an urgent, life-threatening presentation requiring emergency intervention, not an elective correction."}
    ],
    correct:"approve", rationale:"Congenital anomalies are generally excluded, but life-threatening congenital conditions requiring urgent intervention are a recognized exception."
  },
  { id:7, ref:"2026/700107", wait:55, name:"Male Patient", age:24, gender:"M", benefit:"H-ER / Emergency", hcp:"Al Samria Medical Center 2 - Jeddah",
    dx:"S52.5 — Fracture of distal radius",
    complaint:"Injured during a motocross racing competition, open wrist fracture.",
    requested:"Emergency reduction and fixation of wrist fracture",
    hasHQ:true, hqList:["No relevant conditions declared"],
    history:[],
    documents:[
      {title:"Emergency Report", necessary:true, content:"Patient sustained an open distal radius fracture during a motocross competition. Immediate surgical fixation required."},
      {title:"Policy Exclusions Schedule", necessary:true, content:"Policy exclusions list includes: 'Injuries sustained during motor racing, motocross, or similar hazardous motorsport competitions are excluded from coverage.'"},
      {title:"HQ Declaration Form", necessary:false, content:"No relevant prior conditions declared — not informative for this specific exclusion question."}
    ],
    questions:[
      {q:"Is motocross racing specifically listed as an excluded activity?", a:"Yes — the policy exclusions schedule explicitly lists motocross and motor racing competitions as excluded hazardous activities."},
      {q:"Was this an official competition or casual riding?", a:"Confirmed as an official motocross competition per the emergency report."}
    ],
    correct:"reject", rationale:"The policy explicitly excludes motocross and motor racing competitions as a hazardous activity."
  },
  { id:8, ref:"2026/700108", wait:30, name:"Male Patient", age:34, gender:"M", benefit:"H-OP / Out Patient", hcp:"Al Noor Medical Center - Riyadh",
    dx:"S82.0 — Fracture of patella",
    complaint:"Injured in a traffic accident while commuting home after work hours.",
    requested:"Outpatient orthopedic management, casting",
    hasHQ:true, hqList:["No relevant conditions declared"],
    history:[],
    documents:[
      {title:"Najm (Police) Report", necessary:true, content:"Traffic accident report: member's liability assessed at 0%. The other driver was found fully at fault."},
      {title:"Employer Duty Schedule", necessary:true, content:"Duty schedule confirms the accident occurred after official working hours, during the member's personal commute home — not during a work assignment."},
      {title:"Old Physiotherapy Note", necessary:false, content:"Unrelated physiotherapy note from over a year ago, for a different, resolved complaint."}
    ],
    questions:[
      {q:"Does the duty schedule confirm this happened during work duties?", a:"No — the duty schedule confirms the accident occurred after working hours, during a personal commute."},
      {q:"What does the Najm report say about liability?", a:"The member was found 0% liable; the other driver was fully at fault."},
      {q:"Does third-party liability affect the member's own health coverage eligibility?", a:"No — the member's health policy covers eligible treatment regardless of fault. Liability only determines whether the insurer can later recover costs from the at-fault party — it doesn't delay the member's own care."}
    ],
    correct:"approve", rationale:"This is not an occupational injury — it happened outside work duties, so no work-related exclusion applies. The member's own health coverage pays for eligible treatment regardless of who was at fault; recovering costs from the at-fault driver's motor insurer is a separate subrogation process handled by the insurer afterward, not a reason to withhold the member's care. Approve."
  },
  { id:9, ref:"2026/700109", wait:65, name:"Female Patient", age:58, gender:"F", benefit:"H-IP / In Patient", hcp:"United Doctors Hospital - Jeddah",
    dx:"N18.6 — End-stage renal disease, diabetic nephropathy",
    complaint:"Longstanding declared diabetic nephropathy, now requiring initiation of hemodialysis.",
    requested:"Hemodialysis sessions, vascular access placement",
    hasHQ:true, hqList:["Type 2 Diabetes Mellitus with nephropathy — declared at enrollment"],
    history:[
      {ref:"2025/882210",date:"10/06/2025",benefit:"Pre-Existing & Chronic",dx:"Diabetic Nephropathy",amt:"210,000.00",status:"Paid"},
      {ref:"2025/441098",date:"22/02/2025",benefit:"Pre-Existing & Chronic",dx:"Diabetic Nephropathy",amt:"640,000.00",status:"Paid"}
    ],
    documents:[
      {title:"HQ Declaration Form", necessary:false, content:"Diabetic nephropathy declared at enrollment — already established, not the key issue in this case."},
      {title:"Chronic Condition Utilization Summary", necessary:true, content:"Cumulative paid amount under the Pre-Existing & Chronic Conditions benefit this policy year: SAR 850,000. Policy maximum for this benefit: SAR 1,000,000. Remaining balance: SAR 150,000."},
      {title:"Nephrology Treatment Plan", necessary:true, content:"Hemodialysis initiation — estimated cost for the requested course of sessions: SAR 210,000."}
    ],
    questions:[
      {q:"What is the remaining balance under the chronic condition limit?", a:"SAR 150,000 remains available under the SAR 1,000,000 chronic/pre-existing condition cap this policy year."},
      {q:"What is the estimated cost of the requested treatment course?", a:"Approximately SAR 210,000 for the full requested course of dialysis sessions."}
    ],
    correct:"partial", rationale:"The condition and treatment are covered, but the requested amount (SAR 210,000) exceeds the SAR 150,000 remaining under the chronic condition cap. Partially approve up to the remaining limit."
  },
  { id:10, ref:"2026/700110", wait:15, name:"Male Patient", age:66, gender:"M", benefit:"H-OP / Out Patient", hcp:"Al Noor Medical Center - Riyadh",
    dx:"J44.9 — Chronic obstructive pulmonary disease",
    complaint:"Severe COPD with resting hypoxemia, requesting home oxygen therapy.",
    requested:"Home oxygen concentrator (durable medical equipment)",
    hasHQ:true, hqList:["COPD — declared at enrollment"],
    history:[{ref:"2025/220456",date:"05/11/2025",benefit:"Out Patient",dx:"COPD",amt:"145.00",status:"Paid"}],
    documents:[
      {title:"HQ Declaration Form", necessary:false, content:"COPD declared at enrollment — already established."},
      {title:"Pulmonology Report with Oximetry", necessary:true, content:"Resting oxygen saturation 87% on room air, consistent with criteria for home oxygen therapy per standard clinical guidelines."},
      {title:"DME Coverage Schedule", necessary:true, content:"Policy DME schedule confirms home oxygen concentrators are a covered benefit when medical necessity criteria (documented hypoxemia) are met."}
    ],
    questions:[
      {q:"Does the oximetry result meet medical necessity criteria for home oxygen?", a:"Yes — resting saturation of 87% meets standard clinical criteria for home oxygen therapy."},
      {q:"Is home oxygen equipment covered under this policy's DME schedule?", a:"Yes — the DME schedule confirms coverage when documented medical necessity criteria are met, which this case satisfies."}
    ],
    correct:"approve", rationale:"Documented medical necessity (hypoxemia on oximetry) meets DME coverage criteria under the policy."
  },
  { id:11, ref:"2026/700111", wait:22, name:"Male Patient", age:31, gender:"M", benefit:"H-OP / Out Patient", hcp:"Al Noor Medical Center - Riyadh",
    dx:"J18.9 — Community-acquired pneumonia",
    complaint:"On oral antibiotics; physician referred the member to an external retail pharmacy to dispense the medication, since the hospital pharmacy doesn't stock this formulation.",
    requested:"Dispense a 7-day antibiotic course at an external retail pharmacy per physician referral",
    hasHQ:false, hqList:[],
    history:[],
    documents:[
      {title:"Physician Prescription & Referral Note", necessary:true, content:"Prescribes a 7-day oral antibiotic course; refers the member to an external retail pharmacy for dispensing, as the hospital pharmacy does not stock this specific formulation."},
      {title:"Network Pharmacy Directory", necessary:true, content:"Confirms the named external pharmacy IS listed as a contracted, in-network pharmacy provider for this member's plan."},
      {title:"Unrelated Lab Slip", necessary:false, content:"Routine lab slip from an earlier, unrelated visit — no relevance to this request."}
    ],
    questions:[
      {q:"Is the external pharmacy within the payer's contracted network?", a:"Yes — the network pharmacy directory confirms this pharmacy is a contracted, in-network provider."},
      {q:"Is there a clinical reason the hospital pharmacy can't dispense this medication?", a:"Yes — the hospital pharmacy does not stock this specific antibiotic formulation, per the physician's note."}
    ],
    correct:"approve", rationale:"Coverage for a prescribed medication doesn't require it be filled in-house — what matters is whether the dispensing pharmacy is within the network. This one is confirmed in-network, with a documented clinical reason for the referral. Approve."
  },
  { id:12, ref:"2026/700112", wait:70, name:"Male Patient", age:71, gender:"M", benefit:"H-IP / In Patient", hcp:"United Doctors Hospital - Jeddah",
    dx:"Z74.0 — Reduced mobility, custodial care (post-stroke, medically stable)",
    complaint:"Admitted 1 July for stroke rehabilitation; remained hospitalized through 31 July. Notes show the patient became medically stable by 10 July, but discharge was delayed pending family/placement arrangements.",
    requested:"Continued inpatient admission for the full month of July (31 days)",
    hasHQ:true, hqList:["No relevant conditions declared"],
    history:[],
    documents:[
      {title:"Admission & Progress Notes", necessary:true, content:"Admitted 1 July for acute stroke management. Medically and neurologically stable by 10 July. Notes from 11–31 July describe the patient as 'medically stable, awaiting family arrangements for home care setup' — no active acute treatment documented for this period."},
      {title:"CHI Essential Benefits Framework Excerpt", necessary:true, content:"Inpatient benefits are covered for medically necessary acute care. Extended admission beyond resolution of the acute condition, for custodial, social, or placement reasons, is not a covered inpatient service — this applies regardless of whether the individual policy document separately restates it."},
      {title:"Member's Policy Wording", necessary:true, content:"The individual policy document does not explicitly mention or exclude extended/custodial stays."}
    ],
    questions:[
      {q:"When did the patient become medically stable?", a:"By 10 July, per the progress notes — the remaining 21 days show no active acute treatment."},
      {q:"Does the specific policy document exclude extended stays?", a:"No — the policy wording is silent on this; it neither explicitly covers nor excludes it."}
    ],
    correct:"reject", rationale:"CHI's essential benefits framework governs inpatient medical necessity regardless of whether the individual policy restates every rule. Extended admission after the acute condition resolved, for custodial/placement reasons, is not covered under CHI regulations — even though this policy document doesn't separately exclude it. Policy silence doesn't create coverage that the regulatory framework doesn't provide."
  },
  { id:13, ref:"2026/700113", wait:48, name:"Female Patient", age:27, gender:"F", benefit:"H-Maternity", hcp:"Al Andalus Specialized Clinic - Riyadh",
    dx:"O80 — Full-term normal delivery",
    complaint:"Presented in labor at term; delivered vaginally. Marital status on the insurance card is recorded as single. Hospital has billed the delivery on a cash basis pending a coverage decision.",
    requested:"Coverage or reimbursement for maternity delivery services",
    hasHQ:true, hqList:["No relevant conditions declared"],
    history:[],
    documents:[
      {title:"Insurance Card / Policy Extract", necessary:true, content:"Marital status field: Single. Class: Standard Employee coverage."},
      {title:"Delivery Summary Report", necessary:true, content:"Uncomplicated vaginal delivery at term, mother and baby stable."},
      {title:"Cash Payment Receipt", necessary:false, content:"Hospital cash receipt for delivery charges, submitted by the family requesting reimbursement consideration."}
    ],
    questions:[
      {q:"What is the member's marital status on file?", a:"Single, per the insurance card and policy record."},
      {q:"Does the policy restrict maternity benefits by marital status?", a:"Yes — maternity benefits under this plan are limited to married spouses and married female employees."}
    ],
    correct:"reject", rationale:"Maternity benefits are restricted to married spouses and married female employees. The member's policy record shows single marital status, so the delivery does not meet eligibility criteria — not covered."
  },
  { id:14, ref:"2026/700114", wait:52, name:"Male Newborn Patient", age:0, gender:"M", benefit:"H-IP / In Patient (Newborn)", hcp:"Al Andalus Specialized Clinic - Riyadh",
    dx:"P22.0 — Transient tachypnea of the newborn, observation",
    complaint:"Newborn from the delivery under Claim Ref 2026/700113 (not covered — mother's single marital status) now requires NICU observation for transient respiratory distress. Family requests coverage for the newborn as a dependent.",
    requested:"NICU admission and observation for the newborn",
    hasHQ:false, hqList:[],
    history:[],
    documents:[
      {title:"Linked Maternity Claim Note", necessary:true, content:"Cross-reference to Claim Ref 2026/700113: the mother's delivery was not covered — single marital status, maternity benefit not applicable."},
      {title:"Newborn Enrollment Status", necessary:true, content:"No newborn enrollment or dependent-addition request has been submitted or approved for this policy."},
      {title:"NICU Admission Note", necessary:true, content:"Newborn observed for transient tachypnea, stable, routine NICU monitoring."}
    ],
    questions:[
      {q:"Was the mother's delivery covered under the policy?", a:"No — Claim Ref 2026/700113 confirms the delivery was not covered due to the mother's single marital status."},
      {q:"Has the newborn been formally enrolled as a dependent?", a:"No — no newborn enrollment or dependent addition has been submitted or approved."}
    ],
    correct:"reject", rationale:"Newborn coverage as a dependent generally flows from an eligible, covered maternity benefit and proper dependent enrollment. Since the delivery itself wasn't covered and the newborn hasn't been separately enrolled, the NICU admission is not covered."
  },
  { id:15, ref:"2026/700115", wait:18, name:"Male Patient", age:33, gender:"M", benefit:"H-OP / Out Patient", hcp:"Al Noor Medical Center - Riyadh",
    dx:"E11.9 — Type 2 Diabetes Mellitus (per submitted diagnosis)",
    complaint:"Requesting renewal of Mounjaro (tirzepatide) injections for 'diabetic control.' Most recent HbA1c: 4.8% — within the normal, non-diabetic range.",
    requested:"Mounjaro (tirzepatide) injection, monthly supply renewal",
    hasHQ:false, hqList:[],
    history:[],
    documents:[
      {title:"Lab Report", necessary:true, content:"HbA1c 4.8% (reference range for non-diabetic adults: 4.0–5.6%). Result is within the normal, non-diabetic range."},
      {title:"Prescription Request", necessary:true, content:"Requests continued monthly Mounjaro (tirzepatide) injections; diagnosis listed as Type 2 Diabetes Mellitus."},
      {title:"Old Employment Physical", necessary:false, content:"Routine physical from a prior employer, no diabetes mentioned — no relevance to this request."}
    ],
    questions:[
      {q:"Is the HbA1c consistent with a diabetes diagnosis requiring ongoing pharmacologic control?", a:"No — 4.8% is within the normal, non-diabetic reference range; it doesn't indicate poorly controlled or active diabetes requiring escalating therapy."},
      {q:"Is there documentation supporting continued therapy despite normal levels?", a:"No hypoglycemic symptoms or additional clinical justification are documented in the request."}
    ],
    correct:"reject", rationale:"A normal, non-diabetic HbA1c doesn't support medical necessity for an anti-diabetic medication often used off-label for weight loss. This pattern should raise suspicion the request is for weight management rather than legitimate diabetic control — not medically justified as submitted. Reject."
  }
];

const FILLER = [
  {name:"Not yet checked in", ref:"—"}, {name:"Awaiting documents", ref:"—"},
  {name:"Registration pending", ref:"—"}, {name:"Not yet checked in", ref:"—"},
  {name:"Awaiting documents", ref:"—"}
];

const DECISION_LABELS = { approve:"Approve", partial:"Partially Approve", reject:"Reject", refer:"Refer for Review" };

/* ---------------- STATE ---------------- */
let decisions = {};       // caseId -> decision string
let questionsAsked = {};  // caseId -> array of asked question indices
let currentCaseId = null;
let studentName = "";

/* ---------------- PERSISTENCE — real localStorage, not the non-existent
   window.storage API this prototype originally used ---------------- */
function saveProgress(){
  try{
    localStorage.setItem("ih-preauth-exam-progress", JSON.stringify({decisions, questionsAsked, studentName}));
  } catch(e){ /* ignore */ }
}
function loadProgress(){
  try{
    const raw = localStorage.getItem("ih-preauth-exam-progress");
    if(raw){
      const data = JSON.parse(raw);
      decisions = data.decisions || {};
      questionsAsked = data.questionsAsked || {};
      studentName = data.studentName || "";
    }
  } catch(e){ /* fresh start */ }
}

function waitColor(mins){ return mins < 30 ? "green" : (mins <= 90 ? "amber" : "red"); }

/* ---------------- INTRO ---------------- */
document.getElementById("startBtn").addEventListener("click", ()=>{
  studentName = document.getElementById("studentName").value.trim() || "Candidate";
  saveProgress();
  showView("dashboard");
  renderDashboard();
});

/* ---------------- VIEW SWITCH ---------------- */
function showView(name){
  ["intro","dashboard","case","results"].forEach(v=>{
    document.getElementById("view-"+v).classList.toggle("hidden", v!==name);
  });
  window.scrollTo({top:0, behavior:"smooth"});
}

function updateProgressPill(){
  const count = Object.keys(decisions).length;
  document.getElementById("progressPill").textContent = count + " / " + CASES.length + " cases decided";
}

/* ---------------- DASHBOARD ---------------- */
function renderDashboard(){
  updateProgressPill();
  const grid = document.getElementById("caseGrid");
  grid.innerHTML = "";

  CASES.forEach(c=>{
    const color = waitColor(c.wait);
    const isDone = !!decisions[c.id];
    const tile = document.createElement("div");
    tile.className = "tile " + color + (isDone ? " done" : "");
    tile.innerHTML = `
      <div class="tile-top">
        <span class="tile-ref">${c.ref}</span>
        <span class="tile-wait ${color}">${c.wait}m</span>
      </div>
      <div class="tile-name">${c.name}</div>
      <div class="tile-benefit">${c.benefit}</div>
      ${isDone ? `<div class="tile-check">✓ Decided: ${DECISION_LABELS[decisions[c.id]]}</div>` : ""}
    `;
    tile.addEventListener("click", ()=> openCase(c.id));
    grid.appendChild(tile);
  });

  FILLER.forEach(f=>{
    const tile = document.createElement("div");
    tile.className = "tile filler";
    tile.innerHTML = `
      <div class="tile-top"><span class="tile-ref">${f.ref}</span></div>
      <div class="tile-name">${f.name}</div>
      <div class="tile-benefit">Not part of this exam</div>
    `;
    grid.appendChild(tile);
  });

  if(Object.keys(decisions).length === CASES.length){
    const banner = document.createElement("div");
    banner.style.cssText = "grid-column:1/-1; text-align:center; margin-top:10px;";
    banner.innerHTML = `<button class="btn btn-primary" id="finishExamBtn">See my results →</button>`;
    grid.appendChild(banner);
    document.getElementById("finishExamBtn").addEventListener("click", showResults);
  }
}

/* ---------------- CASE WORKSPACE ---------------- */
function openCase(id){
  currentCaseId = id;
  const c = CASES.find(x=>x.id===id);
  if(!questionsAsked[id]) questionsAsked[id] = [];

  document.getElementById("cRef").textContent = c.ref;
  document.getElementById("cBenefit").textContent = c.benefit;
  document.getElementById("cHcp").textContent = c.hcp;
  document.getElementById("cName").textContent = c.name;
  document.getElementById("cAge").textContent = c.age;
  document.getElementById("cGender").textContent = c.gender;
  document.getElementById("cDx").textContent = c.dx;
  document.getElementById("cComplaint").textContent = c.complaint;
  document.getElementById("cRequested").textContent = c.requested;

  // HQ
  const hqArea = document.getElementById("cHqBadgeArea");
  const hqList = document.getElementById("cHqList");
  if(!c.hasHQ){
    hqArea.innerHTML = `<span class="hq-badge none">No HQ on file</span>`;
    hqList.innerHTML = "";
  } else if(c.hqList.length === 0){
    hqArea.innerHTML = `<span class="hq-badge none">HQ present — no relevant conditions declared</span>`;
    hqList.innerHTML = "";
  } else {
    hqArea.innerHTML = `<span class="hq-badge present">HQ on file</span>`;
    hqList.innerHTML = c.hqList.map(h=>`<p>• ${h}</p>`).join("");
  }

  // Documents
  const docsEl = document.getElementById("cDocs");
  docsEl.innerHTML = "";
  c.documents.forEach(d=>{
    const row = document.createElement("div");
    row.className = "doc-row";
    row.innerHTML = `<span class="doc-icon">📄</span><span class="doc-title">${d.title}</span>`;
    row.addEventListener("click", ()=> openDoc(d));
    docsEl.appendChild(row);
  });

  // Questions
  renderQuestions(c);

  // History
  const histEl = document.getElementById("cHistory");
  if(c.history.length === 0){
    histEl.innerHTML = `<p style="font-size:12.5px; color:var(--ink-dim);">No prior claims on file for this member.</p>`;
  } else {
    histEl.innerHTML = `<table class="history-table"><thead><tr><th>Ref</th><th>Date</th><th>Benefit</th><th>Diagnosis</th><th>Amount</th><th>Status</th></tr></thead><tbody>` +
      c.history.map(h=>`<tr><td>${h.ref}</td><td>${h.date}</td><td>${h.benefit}</td><td>${h.dx}</td><td>${h.amt}</td><td>${h.status}</td></tr>`).join("") +
      `</tbody></table>`;
  }

  // Decision buttons reset / restore
  document.querySelectorAll(".dopt").forEach(btn=> btn.classList.remove("selected"));
  if(decisions[id]){
    const btn = document.querySelector(`.dopt[data-d="${decisions[id]}"]`);
    if(btn) btn.classList.add("selected");
  }

  showView("case");
}

function renderQuestions(c){
  const qEl = document.getElementById("cQuestions");
  const asked = questionsAsked[c.id] || [];
  const remaining = Math.max(0, 2 - asked.length);
  document.getElementById("qCounter").textContent = remaining + " question" + (remaining===1?"":"s") + " remaining";

  qEl.innerHTML = "";
  c.questions.forEach((q, idx)=>{
    const wasAsked = asked.includes(idx);
    if(wasAsked){
      const ansDiv = document.createElement("div");
      ansDiv.innerHTML = `<button class="q-btn" disabled>${q.q}</button><div class="q-answer">${q.a}</div>`;
      qEl.appendChild(ansDiv);
    } else {
      const btn = document.createElement("button");
      btn.className = "q-btn";
      btn.textContent = q.q;
      if(remaining === 0) btn.disabled = true;
      btn.addEventListener("click", ()=>{
        if((questionsAsked[c.id]||[]).length >= 2) return;
        questionsAsked[c.id] = [...(questionsAsked[c.id]||[]), idx];
        saveProgress();
        renderQuestions(c);
      });
      qEl.appendChild(btn);
    }
  });
}

document.querySelectorAll(".dopt").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".dopt").forEach(b=> b.classList.remove("selected"));
    btn.classList.add("selected");
  });
});

document.getElementById("submitDecisionBtn").addEventListener("click", ()=>{
  const selected = document.querySelector(".dopt.selected");
  if(!selected){ alert("Please select a decision before submitting."); return; }
  decisions[currentCaseId] = selected.dataset.d;
  saveProgress();
  showView("dashboard");
  renderDashboard();
});

document.getElementById("backToDashBtn").addEventListener("click", ()=>{
  showView("dashboard");
  renderDashboard();
});

/* ---------------- DOCUMENT MODAL ---------------- */
function openDoc(d){
  document.getElementById("docTitle").textContent = d.title;
  document.getElementById("docContent").textContent = d.content;
  document.getElementById("docOverlay").classList.remove("hidden");
}
document.getElementById("docClose").addEventListener("click", ()=> document.getElementById("docOverlay").classList.add("hidden"));
document.getElementById("docOverlay").addEventListener("click",(e)=>{ if(e.target.id==="docOverlay") e.currentTarget.classList.add("hidden"); });

/* ---------------- RESULTS ---------------- */
function showResults(){
  let correctCount = 0;
  const reviewList = document.getElementById("reviewList");
  reviewList.innerHTML = "";

  CASES.forEach(c=>{
    const studentDecision = decisions[c.id];
    const isCorrect = studentDecision === c.correct;
    if(isCorrect) correctCount++;
    const row = document.createElement("div");
    row.className = "review-row";
    row.innerHTML = `
      <div class="review-top">
        <span class="rn">${c.ref} — ${c.name}</span>
        <span class="rtag ${isCorrect ? "correct" : "wrong"}">${isCorrect ? "✓ Correct" : "✗ Incorrect"}</span>
      </div>
      <div class="review-detail">Your decision: <b>${DECISION_LABELS[studentDecision] || "—"}</b> · Correct decision: <b>${DECISION_LABELS[c.correct]}</b></div>
      <div class="review-detail">${c.rationale}</div>
    `;
    reviewList.appendChild(row);
  });

  const verdictArea = document.getElementById("verdictArea");
  const PASS_THRESHOLD = 7; // pass if strictly more than 7 correct
  const passed = correctCount > PASS_THRESHOLD;
  if(passed){
    verdictArea.innerHTML = `
      <div class="verdict pass">
        <div class="eyebrow" style="color:#CFE3DF;">CERTIFICATE OF COMPLETION</div>
        <h2>Congratulations — you have passed the exam!</h2>
        <p style="color:#CFE3DF; max-width:52ch; margin:0 auto;">You are now eligible to work as a specialist at any of the biggest companies in the market. The insurance industry is waiting for you.</p>
        <div class="cert-name">${studentName}</div>
        <div class="score">Final score: ${correctCount} / ${CASES.length}</div>
      </div>`;
  } else {
    verdictArea.innerHTML = `
      <div class="verdict fail">
        <div class="eyebrow">RESULT</div>
        <h2>Bad luck — but don't let this mark define your limit.</h2>
        <p style="max-width:54ch; margin:10px auto 0; color:var(--ink-dim);">You can do this. Slow down and focus before making each decision — the HQ is important, and checking exclusion criteria is a must before you decide, not an afterthought.</p>
        <div class="score" style="margin-top:10px;">Score: ${correctCount} / ${CASES.length} (need more than ${PASS_THRESHOLD} to pass). Review the cases below, then retry the full exam.</div>
      </div>`;
  }

  showView("results");
}

document.getElementById("retryBtn").addEventListener("click", ()=>{
  decisions = {}; questionsAsked = {};
  saveProgress();
  showView("dashboard");
  renderDashboard();
});

/* ---------------- INIT ---------------- */
(function init(){
  loadProgress();
  if(studentName) document.getElementById("studentName").value = studentName;
})();
