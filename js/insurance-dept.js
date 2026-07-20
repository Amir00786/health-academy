// Sessions may point at a YouTube URL instead of a hosted .mp4 — detect it so
// the video views can embed a YouTube iframe instead of a native <video>.
function getYouTubeId(url) {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}

const VIDEO1_QUIZ = {
  title: "General Overview",
  questions: [
    {
      stem: "A 40-year-old male presents to the hospital with fever. The treating physician requests admission, a CBC, a specialist referral, and IV medications. On pre-authorization review, admission and the referral are approved, while the CBC and IV medications are denied. What is the most likely reason for this kind of partial approval?",
      options: [
        "The hospital submitted the request too late",
        "The payer determined some requested services were not medically necessary or lacked supporting documentation at that time",
        "The patient's policy had expired",
        "CBC and IV medications are never covered under any policy",
        "The physician made a coding error"
      ],
      correctIndex: 1,
      explanation: "Partial approvals are common in pre-authorization: each requested service is reviewed on its own medical-necessity merits and documentation, not approved or denied as a single bundle."
    },
    {
      stem: "In the diagram, the air ambulance / medical evacuation request is marked as declined. Which of the following is the most common reason an air evacuation request is denied in a pre-authorization review?",
      options: [
        "The patient refused transport",
        "Medical evacuation typically requires proof that equivalent care is unavailable locally and specific medical-necessity criteria are met",
        "Air evacuation is never a covered benefit under any Saudi health insurance policy",
        "The hospital did not own an ambulance",
        "The claim was submitted in the wrong currency"
      ],
      correctIndex: 1,
      explanation: "Air evacuation is a high-cost, tightly-scrutinized benefit — approval usually hinges on documented unavailability of equivalent local care, not on it being categorically excluded."
    },
    {
      stem: "The diagram shows a figure of 5,000 SAR linked to the insurance company / TPA building. What does this figure most likely represent in a pre-authorization workflow?",
      options: [
        "The patient's monthly premium",
        "The hospital's total annual revenue",
        "The approved cost ceiling or reimbursement amount for the authorized services",
        "A penalty fee charged to the hospital",
        "The employer's total payroll"
      ],
      correctIndex: 2,
      explanation: "TPAs and insurers commonly set an approved cost ceiling per authorization — the figure tracks what will actually be reimbursed for the approved services, not premiums or penalties."
    },
    {
      stem: "Hospital B in the diagram is labeled as non-network. What is the most likely consequence of a patient receiving care at a non-network hospital under most Saudi health insurance policies?",
      options: [
        "The claim is automatically approved at a higher rate",
        "Coverage may be reduced, denied, or require special exception approval compared to in-network care",
        "Non-network hospitals are always reimbursed at the same rate as network hospitals",
        "The patient must always pay double the network rate",
        "It has no effect on the claim outcome"
      ],
      correctIndex: 1,
      explanation: "Non-network care sits outside the payer's negotiated agreements, so it typically triggers reduced coverage or an exception-approval process rather than standard reimbursement."
    },
    {
      stem: "The circular icon beneath the hospital in the diagram — an eye with three colored arrows in a loop — most likely represents which pre-authorization concept?",
      options: [
        "A one-time approval with no further oversight",
        "The billing department's internal accounting cycle",
        "A continuous utilization review / monitoring cycle between provider and payer",
        "Patient discharge planning only",
        "The hospital's cleaning schedule"
      ],
      correctIndex: 2,
      explanation: "The eye-and-loop motif represents ongoing oversight — utilization review doesn't end at initial approval; payers continue monitoring care as it's delivered."
    },
    {
      stem: "In the diagram, a claim document is labeled \"Assigned.\" What does this step represent in the pre-authorization process?",
      options: [
        "The claim has been permanently closed",
        "The claim has been routed to a specific reviewer or case manager for adjudication",
        "The patient has been assigned a new treating doctor",
        "The hospital has been assigned a new operating license",
        "The claim has been rejected"
      ],
      correctIndex: 1,
      explanation: "\"Assigned\" is a workflow status, not an outcome — it means the claim now has a named reviewer responsible for adjudicating it, before any decision is reached."
    },
    {
      stem: "The building labeled \"ضمان\" (Council of Health Insurance) in the diagram represents which role in the Saudi healthcare insurance ecosystem?",
      options: [
        "A private hospital chain",
        "The national regulatory body overseeing health insurance compliance and claims standards",
        "A pharmaceutical distributor",
        "An employer's human resources department",
        "A patient advocacy group with no regulatory authority"
      ],
      correctIndex: 1,
      explanation: "The Council of Health Insurance (CHI) is the Saudi regulator that sets and enforces the standards insurers, TPAs, and providers must follow."
    },
    {
      stem: "The diagram shows an ID card and an employee count linked to an employer-side building, with a red cross mark. What process does this most likely represent?",
      options: [
        "Employee eligibility / membership verification against the employer's group policy",
        "Hospital staff scheduling",
        "Insurance company hiring",
        "Patient medical history review",
        "CHI's annual public audit report"
      ],
      correctIndex: 0,
      explanation: "Group policies are tied to verified employee rosters — a mismatch or failed check here (the red cross) commonly means an eligibility issue, not a clinical one."
    },
    {
      stem: "In the pre-authorization ecosystem, which entity typically initiates a pre-authorization request?",
      options: [
        "The patient's employer",
        "The treating provider / hospital, on behalf of the patient",
        "The Council of Health Insurance (CHI)",
        "The patient's family",
        "The insurance company always initiates it first"
      ],
      correctIndex: 1,
      explanation: "The provider holds the clinical information needed to justify a request, so authorization requests are almost always provider-initiated on the patient's behalf."
    },
    {
      stem: "The diagram places the patient at the center, with two-way arrows connecting to both the hospital side and the insurer/employer side. What does this best illustrate about the patient's role in the ecosystem?",
      options: [
        "The patient has no role once treatment starts",
        "The patient is relevant only for billing purposes",
        "The patient is the shared reference point whose eligibility, treatment, and outcomes connect every other party in the cycle",
        "The patient interacts only with CHI directly",
        "The patient's role ends after admission"
      ],
      correctIndex: 2,
      explanation: "Every other party in the diagram — provider, insurer, employer, regulator — ultimately traces back to the same patient record; the patient is the connecting thread, not a passive endpoint."
    }
  ]
};


const SECTIONS = [
  {
    id: "v2a",
    tag: "Video 2A",
    title: "Insurance & Pre-Authorization Fundamentals",
    sub: "Post-video quiz · 4 questions · 5 options each",
    questions: [
      {
        stem: "What best defines medical insurance?",
        options: [
          "A savings account used only for medical expenses.",
          "A financial agreement that helps cover eligible healthcare costs according to the terms and conditions of an insurance policy.",
          "A payment made directly to healthcare providers without any policy or contract.",
          "A government program that provides free healthcare for everyone.",
          "A hospital membership that guarantees treatment regardless of policy conditions."
        ],
        correctIndex: 1,
        explanation: "Medical insurance is a contractual agreement between the insurer and the insured that provides financial protection against eligible medical expenses, subject to the policy's benefits, exclusions, limits, and conditions."
      },
      {
        stem: "What is the primary role of the Pre-Authorization Department?",
        options: [
          "To collect insurance premiums from members.",
          "To negotiate hospital salaries.",
          "To verify medical necessity, policy eligibility, and benefits before approving healthcare services.",
          "To diagnose diseases and prescribe medications.",
          "To replace the treating physician's clinical judgment."
        ],
        correctIndex: 2,
        explanation: "The Pre-Authorization Department evaluates requested healthcare services to ensure medical necessity, policy eligibility, coverage benefits, and compliance with clinical guidelines. Its role is not to diagnose patients or replace treating physicians."
      },
      {
        stem: "If a patient does not have medical insurance, which option is generally available?",
        options: [
          "The insurance company automatically creates a policy.",
          "Free treatment in every private hospital.",
          "The hospital must provide unlimited treatment without payment.",
          "Self-payment (Cash / Private Payment).",
          "Automatic approval by the insurance company."
        ],
        correctIndex: 3,
        explanation: "Patients without medical insurance usually pay directly for healthcare services (self-pay). Depending on local regulations, they may also be eligible for governmental programs, charity services, or employer support, but there is no automatic insurance coverage."
      },
      {
        stem: "Which of the following healthcare professionals are commonly qualified to work in Medical Pre-Authorization?",
        options: [
          "Only hospital administrators.",
          "Medical specialists (consultants) only.",
          "No one — it is too difficult to learn.",
          "Call center agents without healthcare backgrounds.",
          "Doctors, nurses, dentists, pharmacists, laboratory specialists, radiographers, physiotherapists, and other licensed healthcare professionals."
        ],
        correctIndex: 4,
        explanation: "Medical pre-authorization requires clinical knowledge to understand diagnoses, investigations, treatments, and insurance policies. Many licensed healthcare professionals can perform this role after appropriate training in medical insurance, clinical guidelines, and policy interpretation."
      }
    ]
  },
  {
    id: "v2b",
    tag: "Video 2B",
    title: "Saudi Insurance System — Key Terms",
    sub: "Post-video quiz · 5 questions · 5 options each · fact-checked against current Saudi sources",
    questions: [
      {
        stem: "An insured member should normally receive healthcare services from providers within the approved insurance network, except in emergency cases. True or False?",
        options: [
          "False",
          "True",
          "Only outside Saudi Arabia",
          "Only for surgical procedures",
          "Only for chronic conditions"
        ],
        correctIndex: 1,
        explanation: "The correct term is out-of-network (or non-network) provider — not \"non-assigned provider.\" Treatment outside the approved network may be covered in an emergency, not only when the condition is strictly life-threatening."
      },
      {
        stem: "What does Revenue Cycle Management (RCM) refer to in healthcare?",
        options: [
          "Managing only the hospital's medical equipment.",
          "Preparing clinical treatment guidelines for doctors.",
          "Managing the administrative and clinical processes that generate, bill, collect, and reconcile healthcare revenue.",
          "Reviewing only denied insurance approvals.",
          "Managing employee salaries and annual leave."
        ],
        correctIndex: 2,
        explanation: "RCM covers the financial journey of a healthcare service from patient registration and eligibility verification through documentation, coding, billing, claims submission, payment, denial management, and collection."
      },
      {
        stem: "What is one of the main responsibilities of the Council of Health Insurance (CHI) in Saudi Arabia?",
        options: [
          "Paying all hospital claims on behalf of insurance companies.",
          "Issuing medical licences to doctors and nurses.",
          "Operating private hospitals throughout Saudi Arabia.",
          "Enforcing mandatory health insurance, identifying covered groups, accrediting healthcare providers, and overseeing the NPHIES platform.",
          "Selling health-insurance policies directly to individuals."
        ],
        correctIndex: 3,
        explanation: "CHI's responsibilities include enforcing compulsory health-insurance coverage, defining groups subject to mandatory coverage, accrediting healthcare providers, monitoring compliance, and overseeing NPHIES. Regulation and supervision of insurance companies has shifted to the Insurance Authority. Use \"CHI,\" not \"CCHI,\" in new materials."
      },
      {
        stem: "Why should an insured member keep their registered mobile number updated?",
        options: [
          "To remove exclusions from the insurance policy.",
          "To automatically approve all submitted medical requests.",
          "To allow the hospital to change the member's diagnosis.",
          "To increase the member's insurance benefit limit.",
          "To receive notifications about approval, rejection, or other updates related to pre-authorisation requests."
        ],
        correctIndex: 4,
        explanation: "An updated mobile number allows the insurer to send timely SMS notifications regarding pre-authorisation decisions and related service updates. It does not change benefits, diagnosis, exclusions, or approval criteria. CHI's payer standards specifically refer to beneficiaries receiving pre-authorisation approvals through SMS and email."
      },
      {
        stem: "Which statement correctly describes the roles of NPHIES and the Insurance Authority in Saudi Arabia?",
        options: [
          "NPHIES licenses physicians, while the Insurance Authority manages hospital appointments.",
          "NPHIES enables electronic exchange of eligibility, authorisation, claims, and payment information, while the Insurance Authority regulates and supervises the insurance sector.",
          "NPHIES sells insurance policies, while the Insurance Authority provides hospital treatment.",
          "Both organisations are private insurance companies.",
          "Both organisations perform only medical diagnosis and treatment."
        ],
        correctIndex: 1,
        explanation: "NPHIES is a central electronic exchange connecting providers, insurers, and TPAs — it validates and routes eligibility checks, prior-authorisation requests, claims, and payment information. The Insurance Authority regulates, supervises, and develops the insurance sector itself; it is not a hospital, payer, or clinical decision-maker."
      }
    ]
  },
  {
    id: "v3",
    tag: "Video 3",
    title: "Health Questionnaire (HQ)",
    sub: "Post-video quiz · 5 questions · 6 options each",
    questions: [
      {
        stem: "Which statement is CORRECT regarding the Health Questionnaire (HQ)?",
        options: [
          "The insurer must reject all members with an HQ.",
          "The insurer should ask the date of diagnosis for every medical visit, even if it is unrelated to the HQ.",
          "The insurer should only ask about diseases diagnosed within the previous year.",
          "The insurer should ignore the information provided in the HQ.",
          "The insurer should ask only for the member's current medications without reviewing the disclosed disease.",
          "For members who complete a Health Questionnaire (HQ), the insurer may request the date of diagnosis and supporting medical information for the diseases disclosed in the HQ."
        ],
        correctIndex: 5,
        explanation: "When a disease is declared on the Health Questionnaire, the insurer may request additional information such as the date of diagnosis, medical reports, and previous treatment to assess eligibility, waiting periods, exclusions, or underwriting decisions."
      },
      {
        stem: "A 70-year-old member requests Open Heart Surgery. The Health Questionnaire states: no previous history of cardiac disease. What is the MOST appropriate action?",
        options: [
          "Approve immediately because the member is elderly.",
          "The insurer has the right to verify the member's relevant medical history through available medical records and healthcare providers before making a coverage decision.",
          "Ask the treating physician to change the diagnosis.",
          "Cancel the insurance policy immediately.",
          "Ignore the Health Questionnaire and approve the request.",
          "Reject immediately because the member is elderly."
        ],
        correctIndex: 1,
        explanation: "If there is a significant inconsistency between the Health Questionnaire and the requested treatment, the insurer may investigate the relevant medical history using legally available medical records and supporting documentation before making a coverage decision."
      },
      {
        stem: "Which members are generally NOT required to complete a Health Questionnaire (HQ)?",
        options: [
          "Only children under five years.",
          "Every insured member regardless of policy type.",
          "Employees of large groups under mandatory insurance and members renewing their existing policies, subject to applicable regulations.",
          "Only emergency patients.",
          "Only members older than 65 years.",
          "Only retired members."
        ],
        correctIndex: 2,
        explanation: "Under Saudi regulations, certain mandatory group insurance and renewal situations may not require completion of a new Health Questionnaire, depending on the applicable underwriting rules."
      },
      {
        stem: "A pregnant member's Last Menstrual Period (LMP) occurred 29 days after the policy effective date. What is the appropriate action?",
        options: [
          "Reject all maternity services immediately.",
          "Request a new Health Questionnaire before every visit.",
          "Consider the pregnancy as pre-existing.",
          "Approve the maternity outpatient visit because the pregnancy began after the policy became effective.",
          "Cancel the insurance policy.",
          "Reject the request because pregnancy is never covered."
        ],
        correctIndex: 3,
        explanation: "If conception occurred after the effective date of the policy (based on LMP and policy rules), maternity services are generally processed according to the member's maternity benefits and policy terms. Final decisions still depend on the exact policy wording and applicable regulations."
      },
      {
        stem: "Which group of conditions is included in the Health Questionnaire (HQ)?",
        options: [
          "Influenza, Food Poisoning, Ear Wax, Sunburn, and Muscle Fatigue.",
          "Migraine, Conjunctivitis, Vitamin D Deficiency, Hiccups, and Dandruff.",
          "Sore Throat, Constipation, Dry Skin, Athlete's Foot, and Nail Fungus.",
          "Chickenpox, Mosquito Bite, Mild Bruise, Dental Plaque, and Head Lice.",
          "Autism, Cataract, Obesity (Weight-related condition), Ligament Tears, and G6PD Deficiency.",
          "Common Cold, Seasonal Allergy, Acne, Tooth Sensitivity, and Motion Sickness."
        ],
        correctIndex: 4,
        explanation: "The Health Questionnaire focuses on significant medical conditions that may affect underwriting, risk assessment, or coverage decisions — not minor self-limiting illnesses."
      }
    ]
  },
  {
    id: "v4",
    tag: "Video 4",
    title: "Not Covered Services (CHI)",
    sub: "Post-video quiz · 6 questions · 5 options each",
    questions: [
      {
        stem: "A patient sustains multiple fractures after an earthquake and is admitted to the emergency department. The provider submits a claim under the Basic Health Insurance Policy. What is the most appropriate decision?",
        options: [
          "Approve because all emergency cases are covered.",
          "Approve because natural disasters are always covered.",
          "Not covered because natural disasters are excluded under the Basic Health Insurance Policy.",
          "Approve if the patient has no previous medical history.",
          "Approve only if the hospital is within the payer network."
        ],
        correctIndex: 2,
        explanation: "Natural disasters (such as earthquakes and floods) are generally excluded under the CHI Basic Health Insurance Policy unless otherwise required by law or specifically covered by the insurance contract."
      },
      {
        stem: "A newborn is diagnosed with a single ventricle congenital heart defect and has persistent severe cyanosis requiring urgent surgical intervention. What is the correct decision?",
        options: [
          "Approve because life-threatening congenital conditions requiring urgent treatment are covered.",
          "Reject because all congenital anomalies are excluded.",
          "Reject because the baby was born with the condition.",
          "Reject because neonatal surgery is excluded.",
          "Approve only after six months of observation."
        ],
        correctIndex: 0,
        explanation: "Although congenital anomalies are generally excluded, life-threatening congenital conditions requiring urgent intervention are covered under the CHI Basic Health Insurance Policy."
      },
      {
        stem: "A 20-year-old patient requests treatment for facial acne because it affects his appearance and self-confidence. What is the correct decision?",
        options: [
          "Approve because acne affects quality of life.",
          "Approve if topical medication is requested.",
          "Approve because the patient is under 25 years old.",
          "Not covered because routine acne treatment is excluded under the Basic Health Insurance Policy.",
          "Approve only after dermatology consultation."
        ],
        correctIndex: 3,
        explanation: "Routine acne treatment is generally excluded from the CHI Basic Health Insurance Policy unless specific medical circumstances or policy benefits apply."
      },
      {
        stem: "A member intentionally failed to declare an existing pregnancy on the Health Questionnaire (HQ) during policy enrolment and later requests coverage for delivery. What is the most appropriate action?",
        options: [
          "Automatically approve because maternity is always covered.",
          "Approve because pregnancy cannot be investigated.",
          "Approve if the provider confirms the pregnancy.",
          "Refer the case for policy review because false declaration on the Health Questionnaire may affect coverage eligibility.",
          "Reject all future claims permanently."
        ],
        correctIndex: 3,
        explanation: "Providing false or incomplete information on the Health Questionnaire may affect eligibility for benefits. The insurer has the right to investigate and determine coverage according to the policy terms and applicable regulations. Teaching point: avoid saying \"Not Covered\" automatically — the insurer investigates first."
      },
      {
        stem: "A Taekwondo athlete suffers an anterior shoulder dislocation during an official competition and requests emergency treatment. Which statement is most appropriate?",
        options: [
          "Approve because all sports injuries are covered.",
          "Approve because shoulder reduction is an emergency procedure.",
          "Reject because the injury occurred during exercise.",
          "Approve because all trauma is covered.",
          "Coverage depends on whether the injury falls under excluded personal hazards or hazardous sporting activities as defined by the policy."
        ],
        correctIndex: 4,
        explanation: "Coverage for sports-related injuries depends on the insurance policy and the applicable CHI provisions regarding personal hazards and excluded activities. Teaching point: be cautious here — \"Taekwondo = automatically not covered\" is too broad a rule."
      },
      {
        stem: "While travelling to work, a member is involved in a road traffic accident. He sustains a displaced femoral neck fracture requiring total hip replacement. The police report confirms the member was 0% liable. The hospital submits a request to the payer. What is the most appropriate response?",
        options: [
          "Reject because all traffic accidents are excluded.",
          "Reject because hip replacement is excluded.",
          "Approve because liability is 0%.",
          "Reject because all trauma is work related.",
          "Determine whether another legally responsible party should provide compensation before applying health insurance benefits, according to applicable regulations and policy terms."
        ],
        correctIndex: 4,
        explanation: "This scenario should not automatically be labelled as a work-related injury. Road traffic accident claims may involve other legal compensation systems (such as motor insurance), and the appropriate payer depends on the applicable regulations and policy wording."
      }
    ]
  },
  {
    id: "v5",
    tag: "Video 5",
    title: "Maternity, ANC & Special Benefits",
    sub: "Post-video quiz · 8 questions · 4 options each (best of four)",
    questions: [
      {
        stem: "Maternity benefits are covered for:",
        options: [
          "All female members regardless of marital status",
          "Married spouses and married female employees",
          "Female dependents below 18 years",
          "Male employees' sisters"
        ],
        correctIndex: 1,
        explanation: "Maternity benefits are generally restricted to married female members and the married spouses of male policyholders — not extended to unmarried females or unrelated dependents."
      },
      {
        stem: "Which of the following represents the recommended first ANC (Antenatal Care) investigations?",
        options: [
          "CBC, ECG, Chest X-ray, HbA1c, CT Abdomen",
          "HBsAg, HIV, Rubella IgG, Obstetric Ultrasound, CBC, Urinalysis, FBS/RBS",
          "MRI Pelvis, PSA, Colonoscopy, ESR, Stool Analysis",
          "Vitamin D, ECG, Bone Scan, Troponin, CT Brain"
        ],
        correctIndex: 1,
        explanation: "Standard first-trimester ANC screening covers infectious disease markers (HBsAg, HIV), immunity status (Rubella IgG), baseline hematology and metabolic screening (CBC, FBS/RBS), urinalysis, and an obstetric ultrasound — not unrelated investigations like CT or colonoscopy."
      },
      {
        stem: "The maximum coverage limit for Pre-existing and Chronic Conditions is:",
        options: [
          "SAR 250,000",
          "SAR 500,000",
          "SAR 750,000",
          "SAR 1,000,000"
        ],
        correctIndex: 3,
        explanation: "Under CHI regulations, pre-existing and chronic conditions carry a defined maximum coverage ceiling of SAR 1,000,000, distinct from the general policy limit."
      },
      {
        stem: "According to the CHI Essential Benefit Package, the companion (escort) benefit is covered up to:",
        options: [
          "SAR 75 per night",
          "SAR 100 per night",
          "SAR 150 per night",
          "SAR 300 per night"
        ],
        correctIndex: 2,
        explanation: "The CHI Essential Benefit Package sets the companion (escort) allowance at SAR 150 per night for eligible inpatient admissions."
      },
      {
        stem: "Renal transplantation is:",
        options: [
          "Never covered",
          "Covered under the policy according to CHI regulations and policy terms",
          "Covered only outside Saudi Arabia",
          "Covered only for VIP members"
        ],
        correctIndex: 1,
        explanation: "Renal transplantation is not a blanket exclusion — it is a coverable service subject to CHI regulations, medical necessity, and the specific policy's terms."
      },
      {
        stem: "Which documents are essential when reviewing a Road Traffic Accident (RTA) case?",
        options: [
          "Employer letter + Medical report + Sick leave",
          "Police (Najm) Report showing liability + Duty Schedule (to exclude work-related RTA)",
          "Passport + National ID + Insurance Card",
          "Hospital invoice + Pharmacy receipt + X-ray only"
        ],
        correctIndex: 1,
        explanation: "Determining the correct payer for an RTA requires the Najm police report to establish liability, plus the member's duty schedule to confirm whether the accident happened during work hours — which would shift the case to occupational injury regulations instead."
      },
      {
        stem: "Occupational injuries are injuries that are:",
        options: [
          "Directly related to the patient's work or occurred because of work",
          "Any injury that occurs inside the hospital",
          "Any illness occurring during working hours",
          "Any chronic disease diagnosed while employed"
        ],
        correctIndex: 0,
        explanation: "An occupational injury is defined by its causal link to work duties — not simply by timing (occurring during working hours) or location (occurring inside a hospital)."
      },
      {
        stem: "Bonus (recommended): Which statement is TRUE regarding work-related injuries?",
        options: [
          "Every injury occurring during working hours is automatically an occupational injury.",
          "Every occupational injury is covered under the health insurance policy.",
          "Cases suspected to be work-related should be evaluated according to occupational injury regulations before determining the responsible payer.",
          "Road traffic accidents are always considered occupational injuries."
        ],
        correctIndex: 2,
        explanation: "Neither \"all injuries during work hours\" nor \"all occupational injuries are automatically covered\" is accurate — each suspected work-related case must be evaluated against occupational injury regulations before the responsible payer is determined. This is a high-yield question: it targets one of the most common areas of confusion for new pre-authorization staff."
      }
    ]
  },
  {
    id: "v6",
    tag: "Video 6",
    title: "The Approval Specialist Role",
    sub: "Post-video quiz · 8 questions · mixed option count (true/false + best of four)",
    questions: [
      {
        stem: "Ex gratia approval is:",
        options: [
          "A mandatory benefit covered under every insurance policy.",
          "A compassionate exception granted outside the standard policy benefits after special review.",
          "A benefit automatically approved by the approval specialist.",
          "A benefit covered only for VIP members."
        ],
        correctIndex: 1,
        explanation: "Ex gratia approval is a discretionary, compassionate exception made outside standard policy terms after special review — not a standard or automatic benefit."
      },
      {
        stem: "If a member has exhausted the Global Policy Limit, the approval specialist should:",
        options: [
          "Continue approving all medically necessary requests.",
          "Approve only emergency services.",
          "Decline further claims unless additional coverage or a special arrangement exists.",
          "Restart the annual policy limit."
        ],
        correctIndex: 2,
        explanation: "Once the Global Policy Limit is exhausted, claims cannot continue to be approved as usual — coverage stops unless supplemental coverage or a special arrangement is confirmed."
      },
      {
        stem: "Which of the following situations is MOST appropriate for referral for a Second Opinion?",
        options: [
          "A routine follow-up for controlled hypertension.",
          "A hospital recommends treatment for a condition believed to be congenital and requires confirmation of the diagnosis and coverage.",
          "A patient requests a vitamin prescription.",
          "A member requests an outpatient laboratory test."
        ],
        correctIndex: 1,
        explanation: "Second opinion referrals are reserved for cases with real diagnostic uncertainty or coverage ambiguity — like confirming a suspected congenital condition — not routine, low-stakes requests."
      },
      {
        stem: "The Effective Date of an insurance policy refers to:",
        options: [
          "The date the insurance card was printed.",
          "The date the member first visits a hospital.",
          "The date on which the insurance coverage officially starts.",
          "The date the claim is submitted."
        ],
        correctIndex: 2,
        explanation: "The Effective Date marks when coverage legally begins — independent of when the card was printed, the first hospital visit, or claim submission."
      },
      {
        stem: "True or False: the Approval Specialist works in harmony with other departments such as Claims, Customer Service, Provider Relations, and Underwriting.",
        options: [
          "True",
          "False"
        ],
        correctIndex: 0,
        explanation: "The Approval Specialist role is inherently cross-functional, coordinating with Claims, Customer Service, Provider Relations, and Underwriting to reach accurate coverage decisions."
      },
      {
        stem: "The biggest challenge for a Medical Approval Specialist is:",
        options: [
          "Writing medical reports.",
          "Managing physician appointments.",
          "Making accurate medical decisions within limited time.",
          "Registering new insurance members."
        ],
        correctIndex: 2,
        explanation: "The core professional challenge is balancing clinical accuracy against the operational pressure of turnaround time — not administrative tasks like scheduling or registration."
      },
      {
        stem: "Which service is generally covered for Visit Visa holders under the CHI Visit Visa product?",
        options: [
          "Routine outpatient follow-up.",
          "Dental scaling and polishing.",
          "Inpatient and emergency medical care up to the applicable policy limit (e.g., SAR 100,000 depending on the product).",
          "Cosmetic surgery."
        ],
        correctIndex: 2,
        explanation: "Visit Visa health insurance products are designed to cover urgent, inpatient, and emergency care up to a defined limit — not routine outpatient follow-up or elective/cosmetic services."
      },
      {
        stem: "Bonus (highly recommended): Which statement BEST describes the role of a Medical Approval Specialist?",
        options: [
          "Approve every request submitted by providers.",
          "Reject all expensive medical requests.",
          "Make fair, evidence-based decisions according to medical necessity, policy terms, and CHI regulations.",
          "Follow the treating physician's recommendation without reviewing the policy."
        ],
        correctIndex: 2,
        explanation: "The specialist's role is neither to rubber-stamp every request, reject costly ones, nor defer entirely to the treating physician — it's to make a fair, evidence-based decision grounded in medical necessity, policy terms, and CHI regulations. This closing question reinforces the core message of the course and the professional mindset it's meant to leave learners with."
      }
    ]
  }
];

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
    correct:"reject", denialCode:"DC01", rationale:"Underwriting has already confirmed non-disclosure of a condition that materially pre-dates the policy. This isn't a snap judgment — the investigation is complete, and it supports rejection."
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
    correct:"reject", denialCode:"DC01", rationale:"Imaging confirms pre-existing joint pathology predating the policy, and it wasn't disclosed on the HQ."
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
    correct:"reject", denialCode:"DC05", rationale:"No confirmed functional impairment — the ENT exam is normal. This reads as a cosmetic request, excluded under routine policy terms."
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
    correct:"reject", denialCode:"DC06", rationale:"Natural disaster injuries are excluded under the Basic Health Insurance Policy unless required by law or covered by a specific rider — neither applies here."
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
    correct:"reject", denialCode:"DC04", rationale:"The policy explicitly excludes motocross and motor racing competitions as a hazardous activity."
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
    correct:"refer", rationale:"The hospital pharmacy can't fill this prescription — it doesn't stock the formulation. Since the medication itself is appropriate but can't be dispensed in-house, the correct action is to refer the request to the confirmed in-network external pharmacy for dispensing, not to approve it as an in-hospital pharmacy service. Refer to the external pharmacy."
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
    correct:"reject", denialCode:"DC03", rationale:"CHI's essential benefits framework governs inpatient medical necessity regardless of whether the individual policy restates every rule. Extended admission after the acute condition resolved, for custodial/placement reasons, is not covered under CHI regulations — even though this policy document doesn't separately exclude it. Policy silence doesn't create coverage that the regulatory framework doesn't provide."
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
    correct:"reject", denialCode:"DC07", rationale:"Maternity benefits are restricted to married spouses and married female employees. The member's policy record shows single marital status, so the delivery does not meet eligibility criteria — not covered."
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
    correct:"reject", denialCode:"DC07", rationale:"Newborn coverage as a dependent generally flows from an eligible, covered maternity benefit and proper dependent enrollment. Since the delivery itself wasn't covered and the newborn hasn't been separately enrolled, the NICU admission is not covered."
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
    correct:"reject", denialCode:"DC09", rationale:"A normal, non-diabetic HbA1c doesn't support medical necessity for an anti-diabetic medication often used off-label for weight loss. This pattern should raise suspicion the request is for weight management rather than legitimate diabetic control — not medically justified as submitted. Reject."
  }
];

const DENIAL_CODES = [
  { code:"DC01", label:"Pre-existing condition not declared on the Health Questionnaire" },
  { code:"DC02", label:"Work-related / occupational injury (alternate payer applies)" },
  { code:"DC03", label:"Insured or provider not respecting policy terms and conditions" },
  { code:"DC04", label:"Excluded hazardous activity or sporting event" },
  { code:"DC05", label:"Cosmetic or otherwise not medically necessary" },
  { code:"DC06", label:"Excluded peril — natural disaster / force majeure" },
  { code:"DC07", label:"Eligibility criteria not met (e.g. marital status, dependent enrollment)" },
  { code:"DC08", label:"Requested amount exceeds the applicable policy benefit limit" },
  { code:"DC09", label:"Not supported by clinical or medical necessity" }
];

/* ============================================================
   SESSION DEFINITIONS
   ============================================================ */
const ICON_VIDEO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5-6-3.5Z" fill="currentColor" stroke="none"/></svg>';
const ICON_PRACTICE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/></svg>';
const ICON_EXAM = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 2h9l3 3v17H6Z"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>';
const ICON_CERT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="3" width="16" height="13" rx="1.5"/><path d="M9 20l3-2 3 2v-4H9v4Z"/><circle cx="12" cy="9" r="2.4"/></svg>';
const ICON_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 13l4 4L19 7"/></svg>';
const ICON_LOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>';

/* videoUrl: point this to a real hosted .mp4 (your own site, Drive, etc.) to make that
   session's video real and downloadable. Leave "" to keep the placeholder frame. */
const VIDEO_SESSIONS = [
  { id:"v2a", title:"What is the Medical Insurance?", desc:"The core definitions and terms every specialist must know cold.",
    bullets:["What medical insurance actually is","The Pre-Auth Department's real role","Self-pay alternatives & who can work in pre-auth","CHI, NPHIES, RCM & key Saudi terms"],
    duration:"37:05", videoUrl:"https://www.youtube.com/watch?v=vJzWV6U3uQw", quiz: [...SECTIONS[0].questions, ...SECTIONS[1].questions] },
  { id:"v1", title:"General Overview", desc:"See how patients, providers, insurers, and regulators all connect in one claim.",
    bullets:["Patient, provider & payer roles","Claim assignment & review cycles","CHI regulatory oversight","Employer eligibility checks"],
    duration:"10:47", videoUrl:"https://www.youtube.com/watch?v=EqYoSJYB5BA", isFree:true, quiz: VIDEO1_QUIZ.questions },
  { id:"v3", title:"Health Questionnaire", desc:"Disclosure rules, investigation standards, and what genuinely requires declaration.",
    bullets:["What the HQ actually covers","Investigating inconsistent history","Who's exempt from the HQ","Maternity timing edge cases"],
    duration:"26:18", videoUrl:"https://www.youtube.com/watch?v=rD0k2ZC9BTI", quiz: SECTIONS[2].questions },
  { id:"v4", title:"CHI Exclusion Items", desc:"What's excluded, and the difference between reject and refer.",
    bullets:["Natural disaster exclusions","Life-threatening congenital exceptions","Sports & hazardous activities","Third-party liability coordination"],
    duration:"39:22", videoUrl:"https://www.youtube.com/watch?v=vFySLKXal9M", quiz: SECTIONS[3].questions },
  { id:"v5", title:"CHI Inclusion Items & Coverage", desc:"What's actually covered — maternity, chronic conditions, and organ transplants.",
    bullets:["Maternity marital-status rules","First ANC investigations","Chronic condition coverage limits","Companion & escort benefits"],
    duration:"31:03", videoUrl:"https://www.youtube.com/watch?v=OdiFPvw4NAs", quiz: SECTIONS[4].questions },
  { id:"v6", title:"Special Terms & Conditions", desc:"Ex gratia, second opinions, and the professional judgment behind every decision.",
    bullets:["Ex gratia approvals","Global policy limits","When to request a second opinion","The Visit Visa product"],
    duration:"30:49", videoUrl:"https://www.youtube.com/watch?v=e_vxQGzU_HY", quiz: SECTIONS[5].questions }
];

const PRACTICE_INTRO_VIDEO = "https://www.youtube.com/watch?v=W8nvCrAY4q0";

const CAPSTONE_SESSIONS = [
  { id:"practice", title:"Let's Practice Before the Exam", desc:"Apply your knowledge with real-life scenarios and make the right decisions.",
    bullets:["Case-based scenarios","Decision-making practice","Instant feedback & explanations","Build confidence through practice"],
    duration:"23:53", type:"practice" },
  { id:"exam", title:"Exam", desc:"Test your knowledge across 15 real cases and earn your certificate.",
    bullets:["15 realistic pre-auth cases","Denial code accuracy required","Instant results","Pass with more than 7 / 15"],
    duration:"30–45 min", type:"exam" },
  { id:"certificate", title:"Certificate", desc:"Get certified and showcase your expertise with confidence.",
    bullets:["Certificate of completion","Personalized with your name","Printable & shareable","Boost your career"],
    duration:"2 min", type:"certificate" }
];

const ALL_SESSIONS = [...VIDEO_SESSIONS.map(s=>({...s,type:"video"})), ...CAPSTONE_SESSIONS];

/* ============================================================
   PROGRESS STATE + PERSISTENCE
   ============================================================ */
let progress = {
  completedVideos: {},     // sessionId -> true
  practiceDone: false,
  examDecisions: {},
  examDenialCodes: {},
  examQuestionsAsked: {},
  examPassed: false,
  examScore: 0,
  certName: "",
  paidUnlocked: false      // demo paywall — true once "Unlock full access" is clicked
};

// window.storage is a sandbox-only API from the original mockup — replaced
// with a small localStorage shim so progress still persists on a static site.
const storage = {
  async set(key, value) { localStorage.setItem(key, value); },
  async get(key) {
    const v = localStorage.getItem(key);
    return v == null ? null : { value: v };
  },
};

async function saveAllProgress(){
  try{ await storage.set("insurance-dept-progress", JSON.stringify(progress)); }
  catch(e){ /* ignore */ }
}
async function loadAllProgress(){
  try{
    const r = await storage.get("insurance-dept-progress");
    if(r && r.value) progress = Object.assign(progress, JSON.parse(r.value));
  } catch(e){ /* fresh start */ }
}

function isSessionUnlocked(idx){
  if(idx === 0) return true;
  const prev = ALL_SESSIONS[idx-1];
  if(prev.type === "video") return !!progress.completedVideos[prev.id];
  if(prev.type === "practice") return progress.practiceDone;
  if(prev.type === "exam") return progress.examPassed;
  return true;
}
function isSessionDone(session){
  if(session.type === "video") return !!progress.completedVideos[session.id];
  if(session.type === "practice") return progress.practiceDone;
  if(session.type === "exam") return progress.examPassed;
  if(session.type === "certificate") return false;
  return false;
}

/* ============================================================
   VIEW SWITCH
   ============================================================ */
function showView(name){
  ["landing","video","practice","exam","examcase","examresults","certificate"].forEach(v=>{
    document.getElementById("view-"+v).classList.toggle("hidden", v!==name);
  });
  window.scrollTo({top:0, behavior:"smooth"});
}
document.getElementById("topBackLink")?.addEventListener("click",(e)=>{ e.preventDefault(); showView("landing"); renderLanding(); });

/* ============================================================
   LANDING — SESSION LIST
   ============================================================ */
function renderLanding(){
  const list = document.getElementById("sessionList");
  list.innerHTML = "";
  let doneCount = 0;
  const totalSteps = VIDEO_SESSIONS.length + 2; // videos + practice + exam

  ALL_SESSIONS.forEach((s, idx)=>{
    const unlocked = isSessionUnlocked(idx);
    const done = isSessionDone(s);
    if(done && s.type !== "certificate") doneCount++;

    const icon = s.type === "video" ? ICON_VIDEO : s.type === "practice" ? ICON_PRACTICE : s.type === "exam" ? ICON_EXAM : ICON_CERT;
    const num = idx + 1;

    let badgeClass = "s-badge";
    let badgeContent = num;
    if(done){ badgeClass += " done"; badgeContent = ICON_CHECK; }
    else if(!unlocked){ badgeContent = ICON_LOCK; }
    else { badgeClass += " current"; }

    let statusHtml;
    if(!unlocked) statusHtml = `<span class="s-status locked">Locked</span>`;
    else if(done) statusHtml = `<span class="s-status done">✓ Completed</span>`;
    else statusHtml = `<span class="s-status ready">Start</span>`;

    const card = document.createElement("div");
    card.className = "session-card" + (unlocked ? "" : " locked");
    card.innerHTML = `
      <div class="${badgeClass}">${typeof badgeContent === "string" && badgeContent.length<=2 ? badgeContent : badgeContent}</div>
      <div class="s-main">
        <div class="s-icon-row">
          <div class="s-icon">${icon}</div>
          <h3>${s.title}</h3>
        </div>
        <p>${s.desc}</p>
        <ul class="s-bullets">${s.bullets.map(b=>`<li>${b}</li>`).join("")}</ul>
      </div>
      <div class="s-right">
        <div class="s-duration">🕐 ${s.duration}${s.isFree ? ' <span class="free-tag">FREE PREVIEW</span>' : ''}</div>
        ${statusHtml}
      </div>
    `;
    if(unlocked){
      card.addEventListener("click", ()=>{
        if(s.type === "video") openVideoSession(s.id);
        else if(s.type === "practice") openPractice();
        else if(s.type === "exam") openExam();
        else if(s.type === "certificate") openCertificate();
      });
    }
    list.appendChild(card);
  });

  const pct = Math.round((doneCount / totalSteps) * 100);
  document.getElementById("overallBarFill").style.width = pct + "%";
  document.getElementById("overallPct").textContent = pct + "% complete";
}

/* ============================================================
   VIDEO + QUIZ VIEW
   ============================================================ */
let currentVideoSession = null;

function openVideoSession(id){
  currentVideoSession = VIDEO_SESSIONS.find(s=>s.id===id);
  document.getElementById("vfTitle").textContent = currentVideoSession.title;
  document.getElementById("vfDur").textContent = "Duration: " + currentVideoSession.duration;

  const hasRealVideo = !!currentVideoSession.videoUrl;
  const ytId = getYouTubeId(currentVideoSession.videoUrl);
  const realVideoEl = document.getElementById("realVideo");
  const ytFrameEl = document.getElementById("ytFrame");
  const frameEl = document.getElementById("videoFrame");
  const dlBtn = document.getElementById("downloadVideoBtn");
  const missingNote = document.getElementById("videoMissingNote");
  const paywall = document.getElementById("paywallOverlay");
  paywall.classList.add("hidden");
  realVideoEl.ontimeupdate = null;

  if(ytId){
    frameEl.classList.add("hidden");
    realVideoEl.classList.add("hidden");
    realVideoEl.removeAttribute("src");
    ytFrameEl.src = "https://www.youtube.com/embed/" + ytId + "?rel=0&modestbranding=1";
    ytFrameEl.classList.remove("hidden");
    dlBtn.classList.add("hidden");
    missingNote.classList.add("hidden");
  } else if(hasRealVideo){
    frameEl.classList.add("hidden");
    ytFrameEl.classList.add("hidden");
    ytFrameEl.removeAttribute("src");
    realVideoEl.src = currentVideoSession.videoUrl;
    realVideoEl.classList.remove("hidden");
    dlBtn.href = currentVideoSession.videoUrl;
    dlBtn.classList.remove("hidden");
    missingNote.classList.add("hidden");

    const freeLimit = currentVideoSession.freePreviewSeconds;
    if(freeLimit && !progress.paidUnlocked){
      realVideoEl.ontimeupdate = ()=>{
        if(realVideoEl.currentTime >= freeLimit){
          realVideoEl.pause();
          realVideoEl.currentTime = freeLimit;
          paywall.classList.remove("hidden");
        }
      };
    }
  } else {
    frameEl.classList.remove("hidden");
    realVideoEl.classList.add("hidden");
    realVideoEl.removeAttribute("src");
    ytFrameEl.classList.add("hidden");
    ytFrameEl.removeAttribute("src");
    dlBtn.classList.add("hidden");
    missingNote.classList.remove("hidden");
  }

  const already = !!progress.completedVideos[id];
  document.getElementById("watchedBtn").classList.toggle("hidden", already);
  document.getElementById("quizBlock").classList.toggle("hidden", !already && true);
  if(already){
    document.getElementById("quizBlock").classList.remove("hidden");
    renderVideoQuiz(currentVideoSession, true);
  } else {
    document.getElementById("quizBlock").classList.add("hidden");
  }
  showView("video");
}

document.getElementById("unlockVideoBtn").addEventListener("click", async ()=>{
  progress.paidUnlocked = true;
  await saveAllProgress();
  document.getElementById("paywallOverlay").classList.add("hidden");
  const realVideoEl = document.getElementById("realVideo");
  realVideoEl.ontimeupdate = null;
  realVideoEl.play();
});

document.getElementById("watchedBtn").addEventListener("click", ()=>{
  document.getElementById("watchedBtn").classList.add("hidden");
  document.getElementById("quizBlock").classList.remove("hidden");
  renderVideoQuiz(currentVideoSession, false);
});

function renderVideoQuiz(session, readOnly){
  const qEl = document.getElementById("quizQuestions");
  qEl.innerHTML = "";
  const letters = ["A","B","C","D","E","F"];
  let answeredCount = 0;

  session.quiz.forEach((q, qi)=>{
    const card = document.createElement("div");
    card.className = "qcard";
    card.innerHTML = `<div class="qnum">Question ${qi+1} of ${session.quiz.length}</div><div class="qstem">${q.stem}</div><div class="opts"></div><div class="feedback"></div>`;
    const optsWrap = card.querySelector(".opts");
    const feedback = card.querySelector(".feedback");
    let locked = readOnly;

    q.options.forEach((opt, oi)=>{
      const btn = document.createElement("button");
      btn.className = "opt";
      btn.innerHTML = `<span class="optletter">${letters[oi]}.</span><span>${opt}</span>`;
      if(readOnly){
        btn.classList.add("locked");
        if(oi === q.correctIndex) btn.classList.add("reveal-correct");
      }
      btn.addEventListener("click", ()=>{
        if(locked) return;
        locked = true;
        answeredCount++;
        const isCorrect = oi === q.correctIndex;
        optsWrap.querySelectorAll(".opt").forEach(b=> b.classList.add("locked"));
        if(isCorrect) btn.classList.add("selected-correct");
        else { btn.classList.add("selected-wrong"); optsWrap.children[q.correctIndex].classList.add("reveal-correct"); }
        feedback.className = "feedback show " + (isCorrect ? "correct" : "wrong");
        feedback.innerHTML = `<b>${isCorrect ? "Correct" : "Not quite"}</b>${q.explanation}`;
        if(answeredCount === session.quiz.length) finishVideoQuiz(session);
      });
      optsWrap.appendChild(btn);
    });
    if(readOnly){
      feedback.className = "feedback show correct";
      feedback.innerHTML = `<b>Correct</b>${q.explanation}`;
    }
    qEl.appendChild(card);
  });

  document.getElementById("quizCompleteBanner").classList.toggle("hidden", !readOnly);
}

async function finishVideoQuiz(session){
  progress.completedVideos[session.id] = true;
  await saveAllProgress();
  document.getElementById("quizCompleteBanner").classList.remove("hidden");
}

function stopVideoPlayback(){
  const realVideoEl = document.getElementById("realVideo");
  const ytFrameEl = document.getElementById("ytFrame");
  realVideoEl.pause();
  if(ytFrameEl.getAttribute("src")) ytFrameEl.removeAttribute("src"); // unloading the iframe stops YouTube playback
}
document.getElementById("quizContinueBtn").addEventListener("click", ()=>{ stopVideoPlayback(); showView("landing"); renderLanding(); });
document.getElementById("videoBackBtn").addEventListener("click", ()=>{ stopVideoPlayback(); showView("landing"); renderLanding(); });

/* ============================================================
   PRACTICE VIEW
   ============================================================ */
const PRACTICE_CASE_IDS = [1, 4];

function openPractice(){
  const practiceVideoEl = document.getElementById("practiceVideo");
  const practiceYtEl = document.getElementById("practiceYtFrame");
  const practiceYtId = getYouTubeId(PRACTICE_INTRO_VIDEO);
  if(practiceYtId){
    practiceVideoEl.classList.add("hidden");
    practiceVideoEl.removeAttribute("src");
    if(practiceYtEl.getAttribute("src") !== "https://www.youtube.com/embed/" + practiceYtId + "?rel=0&modestbranding=1"){
      practiceYtEl.src = "https://www.youtube.com/embed/" + practiceYtId + "?rel=0&modestbranding=1";
    }
    practiceYtEl.classList.remove("hidden");
  } else {
    practiceYtEl.classList.add("hidden");
    practiceYtEl.removeAttribute("src");
    if(practiceVideoEl.getAttribute("src") !== PRACTICE_INTRO_VIDEO) practiceVideoEl.src = PRACTICE_INTRO_VIDEO;
    practiceVideoEl.classList.remove("hidden");
  }
  const container = document.getElementById("practiceCases");
  container.innerHTML = "";
  document.getElementById("practiceDoneBtn").classList.add("hidden");
  let doneCount = 0;

  PRACTICE_CASE_IDS.forEach((cid, i)=>{
    const c = CASES.find(x=>x.id===cid);
    const card = document.createElement("div");
    card.className = "panel";
    card.innerHTML = `
      <h4>Practice Case ${i+1} — ${c.ref}</h4>
      <div class="field-row"><span class="k">Patient</span><span class="v">${c.name}, ${c.age===0?"newborn":c.age+"y"}, ${c.gender}</span></div>
      <div class="field-row"><span class="k">Diagnosis</span><span class="v">${c.dx}</span></div>
      <p style="font-size:12.5px; color:var(--ink-dim);">${c.complaint}</p>
      <div class="field-row"><span class="k">Requested</span><span class="v">${c.requested}</span></div>
      <div class="decision-opts" style="margin-top:12px;" id="pract-opts-${i}">
        <button class="dopt" data-d="approve">Approve</button>
        <button class="dopt" data-d="partial">Partially Approve</button>
        <button class="dopt" data-d="reject">Reject</button>
        <button class="dopt" data-d="refer">Refer for Review</button>
      </div>
      <div class="feedback" id="pract-feedback-${i}"></div>
    `;
    container.appendChild(card);

    card.querySelectorAll(`#pract-opts-${i} .dopt`).forEach(btn=>{
      btn.addEventListener("click", ()=>{
        card.querySelectorAll(`#pract-opts-${i} .dopt`).forEach(b=>{ b.disabled = true; b.classList.remove("selected"); });
        const isCorrect = btn.dataset.d === c.correct;
        btn.classList.add("selected");
        btn.style.borderColor = isCorrect ? "var(--live)" : "var(--danger)";
        const fb = document.getElementById(`pract-feedback-${i}`);
        fb.className = "feedback show " + (isCorrect ? "correct" : "wrong");
        fb.innerHTML = `<b>${isCorrect ? "Correct" : "The correct decision was: " + DECISION_LABELS_LOCAL[c.correct]}</b>${c.rationale}`;
        doneCount++;
        if(doneCount === PRACTICE_CASE_IDS.length) document.getElementById("practiceDoneBtn").classList.remove("hidden");
      });
    });
  });
  showView("practice");
}
const DECISION_LABELS_LOCAL = { approve:"Approve", partial:"Partially Approve", reject:"Reject", refer:"Refer for Review" };

function stopPracticeVideoPlayback(){
  const practiceVideoEl = document.getElementById("practiceVideo");
  const practiceYtEl = document.getElementById("practiceYtFrame");
  practiceVideoEl.pause();
  if(practiceYtEl.getAttribute("src")) practiceYtEl.removeAttribute("src");
}
document.getElementById("practiceDoneBtn").addEventListener("click", async ()=>{
  progress.practiceDone = true;
  await saveAllProgress();
  stopPracticeVideoPlayback();
  showView("landing"); renderLanding();
});
document.getElementById("practiceBackBtn").addEventListener("click", ()=>{ stopPracticeVideoPlayback(); showView("landing"); renderLanding(); });

/* ============================================================
   EXAM (embedded — same logic as the standalone simulator)
   ============================================================ */
const EX_FILLER = [
  {name:"Not yet checked in"}, {name:"Awaiting documents"}, {name:"Registration pending"},
  {name:"Not yet checked in"}, {name:"Awaiting documents"}
];
const DECISION_LABELS = { approve:"Approve", partial:"Partially Approve", reject:"Reject", refer:"Refer for Review" };
let currentExamCaseId = null;

function waitColor(mins){ return mins < 30 ? "green" : (mins <= 90 ? "amber" : "red"); }

function openExam(){
  document.getElementById("exProgressPill").textContent = Object.keys(progress.examDecisions).length + " / " + CASES.length + " cases decided";
  renderExamDashboard();
  showView("exam");
}
document.getElementById("examBackBtn").addEventListener("click", ()=>{ showView("landing"); renderLanding(); });

function renderExamDashboard(){
  document.getElementById("exProgressPill").textContent = Object.keys(progress.examDecisions).length + " / " + CASES.length + " cases decided";
  const grid = document.getElementById("exCaseGrid");
  grid.innerHTML = "";
  CASES.forEach(c=>{
    const color = waitColor(c.wait);
    const isDone = !!progress.examDecisions[c.id];
    const tile = document.createElement("div");
    tile.className = "tile " + color + (isDone ? " done" : "");
    tile.innerHTML = `
      <div class="tile-top"><span class="tile-ref">${c.ref}</span><span class="tile-wait ${color}">${c.wait}m</span></div>
      <div class="tile-name">${c.name}</div>
      <div class="tile-benefit">${c.benefit}</div>
      ${isDone ? `<div class="tile-check">✓ Decided: ${DECISION_LABELS[progress.examDecisions[c.id]]}</div>` : ""}
    `;
    tile.addEventListener("click", ()=> openExamCase(c.id));
    grid.appendChild(tile);
  });
  EX_FILLER.forEach(f=>{
    const tile = document.createElement("div");
    tile.className = "tile filler";
    tile.innerHTML = `<div class="tile-top"><span class="tile-ref">—</span></div><div class="tile-name">${f.name}</div><div class="tile-benefit">Not part of this exam</div>`;
    grid.appendChild(tile);
  });
  if(Object.keys(progress.examDecisions).length === CASES.length){
    const banner = document.createElement("div");
    banner.style.cssText = "grid-column:1/-1; text-align:center; margin-top:8px;";
    banner.innerHTML = `<button class="btn btn-primary" id="exFinishBtn">See my results →</button>`;
    grid.appendChild(banner);
    document.getElementById("exFinishBtn").addEventListener("click", showExamResults);
  }
}

function openExamCase(id){
  currentExamCaseId = id;
  const c = CASES.find(x=>x.id===id);
  if(!progress.examQuestionsAsked[id]) progress.examQuestionsAsked[id] = [];

  document.getElementById("exRef").textContent = c.ref;
  document.getElementById("exBenefit").textContent = c.benefit;
  document.getElementById("exHcp").textContent = c.hcp;
  document.getElementById("exName").textContent = c.name;
  document.getElementById("exAge").textContent = c.age;
  document.getElementById("exGender").textContent = c.gender;
  document.getElementById("exDx").textContent = c.dx;
  document.getElementById("exComplaint").textContent = c.complaint;
  document.getElementById("exRequested").textContent = c.requested;

  const hqArea = document.getElementById("exHqBadgeArea");
  const hqList = document.getElementById("exHqList");
  if(!c.hasHQ){ hqArea.innerHTML = `<span class="hq-badge none">No HQ on file</span>`; hqList.innerHTML = ""; }
  else if(c.hqList.length === 0){ hqArea.innerHTML = `<span class="hq-badge none">HQ present — no relevant conditions declared</span>`; hqList.innerHTML = ""; }
  else { hqArea.innerHTML = `<span class="hq-badge present">HQ on file</span>`; hqList.innerHTML = c.hqList.map(h=>`<p style="font-size:12px; margin:6px 0 0;">• ${h}</p>`).join(""); }

  const docsEl = document.getElementById("exDocs");
  docsEl.innerHTML = "";
  c.documents.forEach(d=>{
    const row = document.createElement("div");
    row.className = "doc-row";
    row.innerHTML = `<span>📄</span><span style="font-size:12.5px; font-weight:600;">${d.title}</span>`;
    row.addEventListener("click", ()=> openExamDoc(d));
    docsEl.appendChild(row);
  });

  renderExamQuestions(c);

  const histEl = document.getElementById("exHistory");
  if(c.history.length === 0){ histEl.innerHTML = `<p style="font-size:12px; color:var(--ink-dim);">No prior claims on file.</p>`; }
  else {
    histEl.innerHTML = `<table class="history-table"><thead><tr><th>Ref</th><th>Date</th><th>Benefit</th><th>Dx</th><th>Amount</th><th>Status</th></tr></thead><tbody>` +
      c.history.map(h=>`<tr><td>${h.ref}</td><td>${h.date}</td><td>${h.benefit}</td><td>${h.dx}</td><td>${h.amt}</td><td>${h.status}</td></tr>`).join("") + `</tbody></table>`;
  }

  document.querySelectorAll("#exDecisionOpts .dopt").forEach(btn=> btn.classList.remove("selected"));
  if(progress.examDecisions[id]){
    const btn = document.querySelector(`#exDecisionOpts .dopt[data-d="${progress.examDecisions[id]}"]`);
    if(btn) btn.classList.add("selected");
  }
  renderExamDenialPanel(progress.examDecisions[id] === "reject");
  if(progress.examDecisions[id] === "reject" && progress.examDenialCodes[id]) highlightExamDenialCode(progress.examDenialCodes[id]);

  showView("examcase");
}

function renderExamQuestions(c){
  const qEl = document.getElementById("exQuestions");
  const asked = progress.examQuestionsAsked[c.id] || [];
  const remaining = Math.max(0, 2 - asked.length);
  document.getElementById("exQCounter").textContent = remaining + " question" + (remaining===1?"":"s") + " remaining";
  qEl.innerHTML = "";
  c.questions.forEach((q, idx)=>{
    const wasAsked = asked.includes(idx);
    if(wasAsked){
      const div = document.createElement("div");
      div.innerHTML = `<button class="q-btn" disabled>${q.q}</button><div class="q-answer">${q.a}</div>`;
      qEl.appendChild(div);
    } else {
      const btn = document.createElement("button");
      btn.className = "q-btn"; btn.textContent = q.q;
      if(remaining === 0) btn.disabled = true;
      btn.addEventListener("click", ()=>{
        if((progress.examQuestionsAsked[c.id]||[]).length >= 2) return;
        progress.examQuestionsAsked[c.id] = [...(progress.examQuestionsAsked[c.id]||[]), idx];
        saveAllProgress();
        renderExamQuestions(c);
      });
      qEl.appendChild(btn);
    }
  });
}

document.querySelectorAll("#exDecisionOpts .dopt").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll("#exDecisionOpts .dopt").forEach(b=> b.classList.remove("selected"));
    btn.classList.add("selected");
    renderExamDenialPanel(btn.dataset.d === "reject");
  });
});

function renderExamDenialPanel(show){
  const area = document.getElementById("exDenialCodeArea");
  if(!show){ area.classList.add("hidden"); area.innerHTML = ""; return; }
  area.classList.remove("hidden");
  area.innerHTML = `<div class="denial-panel"><h4>Select the denial code</h4><p class="hint">You've marked this case as Reject — choose the reason that actually applies here.</p><div id="exDenialCodeList"></div></div>`;
  const listEl = document.getElementById("exDenialCodeList");
  DENIAL_CODES.forEach(dc=>{
    const btn = document.createElement("button");
    btn.className = "dc-opt"; btn.dataset.code = dc.code;
    btn.innerHTML = `<span class="dc-code">${dc.code}</span>${dc.label}`;
    btn.addEventListener("click", ()=>{
      document.querySelectorAll(".dc-opt").forEach(b=> b.classList.remove("selected"));
      btn.classList.add("selected");
    });
    listEl.appendChild(btn);
  });
}
function highlightExamDenialCode(code){
  const btn = document.querySelector(`.dc-opt[data-code="${code}"]`);
  if(btn) btn.classList.add("selected");
}

document.getElementById("exSubmitBtn").addEventListener("click", ()=>{
  const selected = document.querySelector("#exDecisionOpts .dopt.selected");
  if(!selected){ alert("Please select a decision before submitting."); return; }
  if(selected.dataset.d === "reject"){
    const dcSelected = document.querySelector(".dc-opt.selected");
    if(!dcSelected){ alert("Please select a denial code for this rejection before submitting."); return; }
    progress.examDenialCodes[currentExamCaseId] = dcSelected.dataset.code;
  } else { delete progress.examDenialCodes[currentExamCaseId]; }
  progress.examDecisions[currentExamCaseId] = selected.dataset.d;
  saveAllProgress();
  showView("exam");
  renderExamDashboard();
});
document.getElementById("exCaseBackBtn").addEventListener("click", ()=>{ showView("exam"); renderExamDashboard(); });

function openExamDoc(d){
  document.getElementById("exDocTitle").textContent = d.title;
  document.getElementById("exDocContent").textContent = d.content;
  document.getElementById("exDocOverlay").classList.remove("hidden");
}
document.getElementById("exDocClose").addEventListener("click", ()=> document.getElementById("exDocOverlay").classList.add("hidden"));
document.getElementById("exDocOverlay").addEventListener("click",(e)=>{ if(e.target.id==="exDocOverlay") e.currentTarget.classList.add("hidden"); });

function showExamResults(){
  let correctCount = 0;
  const reviewList = document.getElementById("exReviewList");
  reviewList.innerHTML = "";

  CASES.forEach(c=>{
    const studentDecision = progress.examDecisions[c.id];
    const decisionRight = studentDecision === c.correct;
    const needsCode = c.correct === "reject";
    const studentCode = progress.examDenialCodes[c.id];
    const codeRight = !needsCode || (studentCode === c.denialCode);
    const isCorrect = decisionRight && codeRight;
    if(isCorrect) correctCount++;

    const codeLine = needsCode
      ? `<div class="review-detail">Your denial code: <b>${studentCode || "—"}</b> · Correct code: <b>${c.denialCode} — ${DENIAL_CODES.find(d=>d.code===c.denialCode).label}</b></div>`
      : "";
    const row = document.createElement("div");
    row.className = "review-row";
    row.innerHTML = `
      <div class="review-top"><span class="rn">${c.ref} — ${c.name}</span><span class="rtag ${isCorrect?"correct":"wrong"}">${isCorrect?"✓ Correct":"✗ Incorrect"}</span></div>
      <div class="review-detail">Your decision: <b>${DECISION_LABELS[studentDecision] || "—"}</b> · Correct decision: <b>${DECISION_LABELS[c.correct]}</b></div>
      ${codeLine}
      <div class="review-detail">${c.rationale}</div>
    `;
    reviewList.appendChild(row);
  });

  const PASS_THRESHOLD = 7;
  const passed = correctCount > PASS_THRESHOLD;
  progress.examPassed = passed;
  progress.examScore = correctCount;
  saveAllProgress();

  const verdictArea = document.getElementById("exVerdictArea");
  if(passed){
    verdictArea.innerHTML = `
      <div class="verdict pass">
        <div class="hero-eyebrow" style="color:#CFE9E5; justify-content:center;">RESULT</div>
        <h2>Congratulations — you have passed the exam!</h2>
        <p style="color:#CFE9E5; max-width:52ch; margin:0 auto;">You are now eligible to work as a specialist at any of the biggest companies in the market. The insurance industry is waiting for you.</p>
        <div style="font-family:var(--mono); font-size:13px; margin-top:10px;">Final score: ${correctCount} / ${CASES.length}</div>
      </div>`;
  } else {
    verdictArea.innerHTML = `
      <div class="verdict fail">
        <div class="hero-eyebrow" style="justify-content:center;">RESULT</div>
        <h2>Bad luck — but don't let this mark define your limit.</h2>
        <p style="max-width:54ch; margin:10px auto 0; color:var(--ink-dim);">You can do this. Slow down and focus before making each decision — the HQ is important, and checking exclusion criteria is a must before you decide, not an afterthought.</p>
        <div style="font-family:var(--mono); font-size:13px; margin-top:10px;">Score: ${correctCount} / ${CASES.length} (need more than ${PASS_THRESHOLD} to pass).</div>
      </div>`;
  }
  document.getElementById("goToCertBtn").classList.toggle("hidden", !passed);
  showView("examresults");
}

document.getElementById("exRetryBtn").addEventListener("click", async ()=>{
  progress.examDecisions = {}; progress.examQuestionsAsked = {}; progress.examDenialCodes = {};
  await saveAllProgress();
  showView("exam"); renderExamDashboard();
});
document.getElementById("goToCertBtn").addEventListener("click", ()=> openCertificate());

/* ============================================================
   CERTIFICATE VIEW
   ============================================================ */
function openCertificate(){
  const content = document.getElementById("certContent");
  if(!progress.examPassed){
    content.innerHTML = `
      <div class="cert-locked">
        <div style="font-size:40px;">🔒</div>
        <h3 style="margin-top:10px;">Not unlocked yet</h3>
        <p style="color:var(--ink-dim); max-width:44ch; margin:8px auto 0;">Pass the final exam (more than 7 out of 15) to unlock your certificate.</p>
        <button class="btn btn-primary" style="margin-top:18px;" id="certGoExamBtn">Go to the exam →</button>
      </div>`;
    document.getElementById("certGoExamBtn").addEventListener("click", openExam);
  } else {
    content.innerHTML = `
      <div class="name-input-row">
        <label style="display:block; font-size:13px; color:var(--ink-dim); margin-bottom:8px;">Enter your full name for the certificate</label>
        <input type="text" id="certNameInput" placeholder="e.g. Sara Al-Mutairi" value="${progress.certName || ""}">
      </div>
      <div style="text-align:center;"><button class="btn btn-primary" id="certGenerateBtn">Generate my certificate →</button></div>
      <div id="certOutput" style="margin-top:26px;"></div>
    `;
    document.getElementById("certGenerateBtn").addEventListener("click", async ()=>{
      const name = document.getElementById("certNameInput").value.trim() || "Candidate";
      progress.certName = name;
      await saveAllProgress();
      renderCertificate(name);
    });
    if(progress.certName) renderCertificate(progress.certName);
  }
  showView("certificate");
}
document.getElementById("certBackBtn").addEventListener("click", ()=>{ showView("landing"); renderLanding(); });

function renderCertificate(name){
  const out = document.getElementById("certOutput");
  const dateStr = new Date().toLocaleDateString(undefined, {year:"numeric", month:"long", day:"numeric"});
  out.innerHTML = `
    <div class="cert-frame">
      <svg class="cert-seal" viewBox="0 0 40 40" fill="none"><path d="M20 3 L35 9 V20 C35 29 29 35 20 37 C11 35 5 29 5 20 V9 Z" fill="#D4AF37"/><path d="M13 20 l5 5 l9 -11" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <div class="ceyebrow">iHealth Academy · Certificate of Completion</div>
      <h2>Pre-Authorization Specialist</h2>
      <div class="cert-name">${name}</div>
      <p class="cert-line">has successfully completed the full Pre-Authorization Specialist track — seven core modules, applied practice, and a 15-case practical exam — and is certified <b>ready for work</b> in medical pre-authorization.</p>
      <div class="cert-date">Issued ${dateStr} · Score: ${progress.examScore} / ${CASES.length}</div>
    </div>
    <div class="cert-actions">
      <button class="btn btn-primary" id="certPrintBtn">🖨 Print / Save as PDF</button>
      <button class="btn btn-ghost" id="certEditBtn">Edit name</button>
    </div>
  `;
  document.getElementById("certPrintBtn").addEventListener("click", ()=> window.print());
  document.getElementById("certEditBtn").addEventListener("click", ()=>{ out.innerHTML = ""; });
}

/* ============================================================
   INIT
   ============================================================ */
(async function init(){
  await loadAllProgress();
  renderLanding();
})();

AOS.init({ duration: 700, easing: 'ease', once: true, offset: 80 });

