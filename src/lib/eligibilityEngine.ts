import type {
  CancerScheme,
  CancerNGO,
  HelpDesk,
  IntakeAnswers,
  EligibilityMatch,
  MatchResult,
} from '@/types';

const INCOME_THRESHOLDS: Record<string, number> = {
  below_10000: 10000,
  '10000_25000': 25000,
  '25000_50000': 50000,
  above_50000: Infinity,
};

const BPL_INCOME_LIMIT = 25000;

function isLowIncome(answers: IntakeAnswers): boolean {
  if (answers.hasBPLCertificate) return true;
  if (answers.rationCardType === 'BPL') return true;
  if (answers.incomeBracket === 'below_10000' || answers.incomeBracket === '10000_25000') {
    return true;
  }
  return false;
}

function isVeryLowIncome(answers: IntakeAnswers): boolean {
  if (answers.rationCardType === 'BPL') return true;
  if (answers.incomeBracket === 'below_10000') return true;
  return false;
}

function isSenior(answers: IntakeAnswers): boolean {
  return answers.patientAge !== null && answers.patientAge >= 60;
}

function isChild(answers: IntakeAnswers): boolean {
  return answers.patientAge !== null && answers.patientAge < 18;
}

const COMMON_DOCUMENTS = [
  'Aadhaar Card',
  'Income Certificate',
  'Residence Proof',
  'Hospital cost estimate',
  'Passport-size photos',
];

const BPL_DOCUMENTS = ['BPL Ration Card', 'BPL Certificate (if available)'];

const AYUSHMAN_DOCUMENTS = ['Ayushman Bharat Card (if issued)'];

function buildDocumentsNeeded(scheme: CancerScheme, answers: IntakeAnswers): string[] {
  const docs = [...COMMON_DOCUMENTS];
  if (answers.rationCardType === 'BPL' || answers.hasBPLCertificate) {
    docs.push(...BPL_DOCUMENTS);
  }
  if (scheme.scheme_name.includes('Ayushman')) {
    docs.push(...AYUSHMAN_DOCUMENTS);
  }
  if (scheme.scheme_name.includes('80DDB')) {
    docs.push('Specialist Doctor Certificate (Form 10-I)');
    docs.push('ITR filing proof');
  }
  if (scheme.scheme_name.includes('ESIC')) {
    docs.push('ESIC Identity Card / Pehchan Card');
  }
  if (scheme.scheme_name.includes('CGHS')) {
    docs.push('CGHS Card');
  }
  return [...new Set(docs)];
}

function matchScheme(
  scheme: CancerScheme,
  answers: IntakeAnswers
): EligibilityMatch | null {
  const reasons: string[] = [];
  const name = scheme.scheme_name.toLowerCase();

  // Central schemes — only apply to all states
  const isCentral = scheme.region === 'Central';
  const isStateScheme = scheme.region === answers.state;
  const isMultiState = scheme.region === 'Central/Multi-State';

  if (!isCentral && !isStateScheme && !isMultiState) return null;

  // Ayushman Bharat PM-JAY
  if (name.includes('ayushman bharat - pm-jay')) {
    if (isVeryLowIncome(answers)) {
      reasons.push('Your family falls in the low-income category eligible for PM-JAY coverage up to ₹5 lakh per year.');
      if (answers.hospitalType === 'government' || answers.hospitalType === 'private_empanelled') {
        reasons.push('Your treatment hospital type is covered under the PM-JAY empanelled network.');
      }
      return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
    }
    return null;
  }

  // HMCPF
  if (name.includes('health minister') && name.includes('cancer')) {
    if (!isVeryLowIncome(answers)) return null;
    if (answers.isGovtEmployee) return null;
    if (answers.receivedOtherAid) return null;
    reasons.push('You are a BPL patient, which is the primary requirement for HMCPF financial aid up to ₹5 lakh.');
    if (answers.hospitalType === 'government') {
      reasons.push('Your treatment at a government hospital increases eligibility — HMCPF applies at 27 Regional Cancer Centres.');
    }
    return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
  }

  // RAN
  if (name.includes('rashtriya arogya nidhi')) {
    if (!isLowIncome(answers)) return null;
    if (answers.isGovtEmployee) return null;
    reasons.push('As a BPL/low-income patient with a life-threatening disease, you qualify for RAN financial assistance.');
    if (answers.hospitalType === 'government') {
      reasons.push('Government hospital treatment aligns with the 14 designated central hospitals under RAN.');
    }
    return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
  }

  // CGHS
  if (name.includes('central government health')) {
    if (!answers.isGovtEmployee) return null;
    reasons.push('As a Central Government employee or pensioner, you and your dependents are eligible for CGHS cancer treatment coverage.');
    return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
  }

  // ESIC
  if (name.includes('esic') || name.includes("employees' state insurance")) {
    if (!answers.hasESIC && answers.employmentType !== 'organized_private') return null;
    if (answers.employmentType === 'unorganized') return null;
    reasons.push('As an organized-sector worker (or ESIC cardholder), you are eligible for full ESIC coverage of cancer treatment and medicines.');
    return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
  }

  // HMDG
  if (name.includes('discretionary grant')) {
    const income = answers.incomeBracket ? (INCOME_THRESHOLDS[answers.incomeBracket] ?? Infinity) : Infinity;
    if (income > 125000) return null;
    reasons.push('Your annual family income is within the ₹1,25,000 limit for the Health Minister\'s Discretionary Grant.');
    reasons.push('You can receive up to ₹50,000 covering up to 70% of your treatment bill.');
    return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
  }

  // Section 80DDB
  if (name.includes('80ddb')) {
    reasons.push('Cancer is a specified disease under Section 80DDB, allowing tax deduction for treatment expenses.');
    if (isSenior(answers)) {
      reasons.push('As a senior citizen (60+), you can claim up to ₹1,00,000 in tax deductions.');
    } else {
      reasons.push('You can claim up to ₹40,000 in tax deductions for cancer treatment.');
    }
    return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
  }

  // RSBY
  if (name.includes('rsby') || name.includes('rashtriya swasthya bima')) {
    if (answers.rationCardType !== 'BPL') return null;
    reasons.push('As a BPL family, you are eligible for RSBY coverage up to ₹30,000 for up to 5 family members.');
    return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
  }

  // PMNRF
  if (name.includes("prime minister's national relief")) {
    if (!isLowIncome(answers)) return null;
    reasons.push('As an indigent citizen facing cancer treatment costs, you can apply to the PMNRF for case-by-case financial assistance.');
    return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
  }

  // PMBJP
  if (name.includes('janaushadhi') || name.includes('pmbjp')) {
    reasons.push('Generic medicines, including some cancer-related drugs, are available at 50-90% below branded prices at Janaushadhi Kendra outlets.');
    return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
  }

  // State Illness Assistance Fund
  if (name.includes('state illness assistance')) {
    if (!isLowIncome(answers)) return null;
    if (answers.hospitalType !== 'government') return null;
    reasons.push(`As a low-income resident receiving treatment at a government hospital, you may qualify for up to ₹1 lakh from your state's illness assistance fund.`);
    return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
  }

  // Rashtriya Vayoshri
  if (name.includes('vayoshri')) {
    if (!isSenior(answers)) return null;
    if (!isLowIncome(answers)) return null;
    reasons.push('As a BPL senior citizen, you are eligible for assistive devices under the Rashtriya Vayoshri Yojana.');
    return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
  }

  // Karnataka schemes
  if (scheme.region === 'Karnataka') {
    if (name.includes('cm relief') || name.includes('kcmmrf')) {
      if (!isLowIncome(answers)) return null;
      if (answers.rationCardType !== 'BPL' && !answers.hasBPLCertificate) return null;
      reasons.push('As a BPL patient with cancer, you can apply for up to ₹1 lakh from the Karnataka CM Relief Fund.');
      return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
    }
    if (name.includes('vajpayee arogyashree')) {
      if (!isVeryLowIncome(answers)) return null;
      reasons.push('BPL families in Karnataka are covered under the Vajpayee Arogyashree Scheme for cancer treatment, cashless at empanelled hospitals.');
      return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
    }
    if (name.includes('jyothi sanjeevini') || name.includes('jss')) {
      if (!answers.isGovtEmployee) return null;
      reasons.push('As a Karnataka state government employee, you and your dependents are covered for up to ₹1.5 lakh/year under JSS.');
      return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
    }
    if (name.includes('rajiv arogya bhagya')) {
      if (answers.rationCardType !== 'APL') return null;
      reasons.push('As an APL family not covered under other schemes, you qualify for subsidized cancer treatment under Rajiv Arogya Bhagya.');
      return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
    }
    if (name.includes('arogya sanjeevini') || name.includes('kass')) {
      if (!answers.isGovtEmployee) return null;
      reasons.push('As a Karnataka state government employee, you have cashless treatment access under KASS at 1,200+ empanelled facilities.');
      return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
    }
    if (name.includes('arogya karnataka')) {
      if (isLowIncome(answers)) {
        reasons.push('As a Karnataka resident in the BPL/low-income category, you are covered under Ayushman Bharat - Arogya Karnataka for cancer treatment.');
      } else {
        reasons.push('As a Karnataka resident, you may qualify for subsidized treatment under the APL tier of Arogya Karnataka.');
      }
      return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
    }
  }

  // Kerala schemes
  if (scheme.region === 'Kerala') {
    if (name.includes('karunya benevolent')) {
      if (!isLowIncome(answers)) return null;
      reasons.push('As a low-income Kerala resident, you can apply for up to ₹2 lakh from the Karunya Benevolent Fund.');
      return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
    }
    if (name.includes('cancer suraksha')) {
      if (!isChild(answers)) return null;
      if (!isLowIncome(answers)) return null;
      reasons.push('Your child (under 18) from a poor family qualifies for the Cancer Suraksha Scheme covering chemotherapy and radiation.');
      return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
    }
    if (name.includes('karunya arogya') || name.includes('kasp')) {
      if (!isLowIncome(answers)) return null;
      reasons.push('As a Kerala resident in the bottom 40% income group, you are eligible for ₹5 lakh/family/year under KASP.');
      return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
    }
  }

  // West Bengal
  if (scheme.region === 'West Bengal') {
    if (name.includes('swasthya sathi')) {
      reasons.push('All West Bengal families are covered under Swasthya Sathi for up to ₹5 lakh/family/year — no premium required.');
      return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
    }
  }

  // Assam
  if (scheme.region === 'Assam') {
    if (name.includes('atal amrit')) {
      const income = answers.incomeBracket ? (INCOME_THRESHOLDS[answers.incomeBracket] ?? Infinity) : Infinity;
      if (income > 500000) return null;
      reasons.push('Your family income is below ₹5 lakh, qualifying for Atal Amrit Abhiyan coverage of ₹2 lakh/person/year.');
      return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
    }
  }

  // Telangana
  if (scheme.region === 'Telangana' && name.includes('aarogyasri')) {
    if (!isLowIncome(answers)) return null;
    reasons.push('As a BPL family in Telangana, you are eligible for Aarogyasri coverage of cancer surgeries, chemotherapy, and radiation.');
    return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
  }

  // Andhra Pradesh
  if (scheme.region === 'Andhra Pradesh') {
    if (name.includes('ysr aarogyasri')) {
      if (!isLowIncome(answers)) return null;
      reasons.push('As a low-income family in Andhra Pradesh, you qualify for Dr. YSR Aarogyasri covering up to ₹5 lakh/family/year.');
      return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
    }
    if (name.includes('ntr vaidya')) {
      if (!isLowIncome(answers)) return null;
      reasons.push('As a low-income family, you may also access treatment through the NTR Vaidya Seva hospital network.');
      return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
    }
  }

  // Maharashtra
  if (scheme.region === 'Maharashtra' && name.includes('mjpjay')) {
    if (!isLowIncome(answers)) return null;
    reasons.push('As a BPL family in Maharashtra, you are eligible for MJPJAY coverage up to ₹1.5 lakh/family/year.');
    return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
  }

  // Tamil Nadu
  if (scheme.region === 'Tamil Nadu' && name.includes('cmchis')) {
    if (answers.rationCardType === 'none') return null;
    reasons.push('As a Tamil Nadu resident with a ration card, you are eligible for CMCHIS coverage of ₹1.5-5 lakh/family/year.');
    return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
  }

  // Gujarat
  if (scheme.region === 'Gujarat' && name.includes('amrutum')) {
    if (answers.rationCardType !== 'BPL') return null;
    reasons.push('As a BPL family in Gujarat, you are eligible for Mukhyamantri Amrutum Yojana coverage of ₹3-5 lakh/family/year.');
    return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
  }

  // Rajasthan
  if (scheme.region === 'Rajasthan' && name.includes('chiranjeevi')) {
    reasons.push('All families in Rajasthan are covered under Chiranjeevi Yojana for health insurance including cancer treatment.');
    return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
  }

  // Odisha
  if (scheme.region === 'Odisha' && name.includes('gopabandhu')) {
    reasons.push('All families in Odisha are covered under Gopabandhu Jan Arogya Yojana for up to ₹5 lakh/family/year (₹7 lakh for female members).');
    return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
  }

  // Other state insurance schemes — generic BPL/low-income match
  const otherStates: string[] = [
    'Himachal Pradesh', 'Punjab', 'Bihar', 'Uttar Pradesh', 'Madhya Pradesh',
    'Haryana', 'Uttarakhand', 'Jharkhand', 'Chhattisgarh', 'Goa',
    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Delhi',
  ];

  if (otherStates.includes(scheme.region)) {
    if (isLowIncome(answers)) {
      reasons.push(`As a ${scheme.region} resident in the low-income category, you may qualify for this state health scheme covering cancer treatment.`);
      return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
    }
    // Universal schemes (Himachal HIMCARE for non-CGHS, Uttarakhand all residents, etc.)
    if (name.includes('uttarakhand') || name.includes('chhattisgarh')) {
      reasons.push(`As a ${scheme.region} resident, you are covered under this state health scheme for up to ₹5 lakh/family/year.`);
      return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
    }
    if (name.includes('himcare') && !answers.isGovtEmployee) {
      reasons.push('As a Himachal Pradesh resident not covered under CGHS/ESIC, you are eligible for HIMCARE coverage up to ₹5 lakh/family/year.');
      return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
    }
    if (name.includes('chirayu')) {
      const income = answers.incomeBracket ? (INCOME_THRESHOLDS[answers.incomeBracket] ?? Infinity) : Infinity;
      if (income > 180000) return null;
      reasons.push('Your family income is below ₹1.8 lakh, qualifying for Chirayu Haryana Yojana coverage of ₹5 lakh/family/year.');
      return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
    }
    if (name.includes('aasby') || name.includes('delhi')) {
      reasons.push('As a Delhi resident, you may qualify for AASBY catastrophic health expense protection.');
      return { scheme, reasons, documentsNeeded: buildDocumentsNeeded(scheme, answers) };
    }
    return null;
  }

  return null;
}

function matchNGOs(
  ngos: CancerNGO[],
  answers: IntakeAnswers
): CancerNGO[] {
  return ngos.filter((ngo) => {
    const focus = (ngo.focus_area || '').toLowerCase();
    const name = ngo.org_name.toLowerCase();

    if (isChild(answers)) {
      if (
        focus.includes('pediatric') ||
        focus.includes('child') ||
        name.includes('cankids') ||
        name.includes('st. jude')
      ) {
        return true;
      }
    }

    if (answers.treatmentStage === 'palliative') {
      if (focus.includes('palliative') || name.includes('karunashraya') || name.includes('dean') || name.includes('shanti') || name.includes('cansupport')) {
        return true;
      }
    }

    if (isLowIncome(answers)) {
      if (
        focus.includes('financial') ||
        focus.includes('treatment') ||
        focus.includes('aid') ||
        focus.includes('subsid') ||
        focus.includes('accommodation') ||
        focus.includes('drug')
      ) {
        return true;
      }
    }

    if (isSenior(answers)) {
      if (focus.includes('palliative') || focus.includes('counseling')) {
        return true;
      }
    }

    // General counseling/awareness NGOs always relevant
    if (focus.includes('counseling') || focus.includes('awareness') || focus.includes('support')) {
      return true;
    }

    return false;
  });
}

function filterHelpDesks(
  helpDesks: HelpDesk[],
  answers: IntakeAnswers
): HelpDesk[] {
  const stateMatch = helpDesks.filter((desk) => {
    if (desk.state === 'National') return true;
    return desk.state === answers.state;
  });

  if (stateMatch.length > 0) return stateMatch;
  return helpDesks.filter((desk) => desk.state === 'National');
}

function buildNextSteps(answers: IntakeAnswers, matches: EligibilityMatch[]): string[] {
  const steps: string[] = [];

  if (matches.some((m) => m.scheme.scheme_name.includes('Ayushman'))) {
    if (!answers.hasAyushmanCard) {
      steps.push('Visit the nearest empanelled hospital to enroll for your Ayushman Bharat card — it is free.');
    }
  }

  if (!answers.hasBankAccountLinked) {
    steps.push('Link your bank account to Aadhaar at your nearest bank branch — this is required for Direct Benefit Transfer (DBT) of scheme funds.');
  }

  if (answers.rationCardType === 'none') {
    steps.push('Apply for a ration card at your local food/civil supplies office — many schemes require it as proof of income level.');
  }

  if (answers.hospitalType === 'private_non_empanelled') {
    steps.push('Consider shifting treatment to an empanelled government or private hospital to access cashless scheme benefits.');
  }

  const hasTaxRelief = matches.some((m) => m.scheme.scheme_name.includes('80DDB'));
  if (hasTaxRelief) {
    steps.push('Ask your treating oncologist to issue a certificate under Form 10-I for claiming Section 80DDB tax deductions.');
  }

  steps.push('Carry all original documents and photocopies when visiting the hospital social worker or scheme office.');

  return steps;
}

export function runEligibilityEngine(
  allSchemes: CancerScheme[],
  allNGOs: CancerNGO[],
  allHelpDesks: HelpDesk[],
  answers: IntakeAnswers
): MatchResult {
  const eligibleSchemes: EligibilityMatch[] = [];

  for (const scheme of allSchemes) {
    const match = matchScheme(scheme, answers);
    if (match) {
      eligibleSchemes.push(match);
    }
  }

  eligibleSchemes.sort((a, b) => {
    const aVerified = a.scheme.verified ? 0 : 1;
    const bVerified = b.scheme.verified ? 0 : 1;
    return aVerified - bVerified;
  });

  const eligibleNGOs = matchNGOs(allNGOs, answers);
  const nearbyHelpDesks = filterHelpDesks(allHelpDesks, answers);
  const nextSteps = buildNextSteps(answers, eligibleSchemes);

  return {
    eligibleSchemes,
    eligibleNGOs,
    nearbyHelpDesks,
    nextSteps,
  };
}
