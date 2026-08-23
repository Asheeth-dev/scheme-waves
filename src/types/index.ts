export interface CancerScheme {
  id: number;
  scheme_name: string;
  administering_body: string;
  scheme_type: string | null;
  eligibility: string | null;
  coverage_amount: string | null;
  how_to_apply: string | null;
  official_url: string | null;
  region: string;
  verified: boolean;
  notes: string | null;
}

export interface CancerNGO {
  id: number;
  org_name: string;
  focus_area: string | null;
  scale_reach: string | null;
  contact_info: string | null;
  verified: boolean;
  notes: string | null;
}

export interface HelpDesk {
  id: number;
  name: string;
  address: string | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  organization_type: string | null;
}

export type StateName =
  | 'Karnataka' | 'Kerala' | 'West Bengal' | 'Assam' | 'Telangana'
  | 'Andhra Pradesh' | 'Maharashtra' | 'Tamil Nadu' | 'Gujarat' | 'Rajasthan'
  | 'Odisha' | 'Himachal Pradesh' | 'Punjab' | 'Bihar' | 'Uttar Pradesh'
  | 'Madhya Pradesh' | 'Haryana' | 'Uttarakhand' | 'Jharkhand' | 'Chhattisgarh'
  | 'Goa' | 'Manipur' | 'Meghalaya' | 'Mizoram' | 'Nagaland' | 'Delhi';

export interface IntakeAnswers {
  state: StateName | '';
  incomeBracket: 'below_10000' | '10000_25000' | '25000_50000' | 'above_50000' | '';
  rationCardType: 'BPL' | 'APL' | 'none' | '';
  treatmentStage: 'early_detection' | 'ongoing_chemo' | 'surgery_needed' | 'palliative' | '';
  hospitalType: 'government' | 'private_empanelled' | 'private_non_empanelled' | '';
  hasAyushmanCard: boolean | null;
  hasPrivateInsurance: boolean | null;
  employmentType: 'organized_govt' | 'organized_private' | 'unorganized' | '';
  patientAge: number | null;
  patientGender: 'male' | 'female' | 'other' | '';
  hasBPLCertificate: boolean | null;
  isGovtEmployee: boolean | null;
  hasESIC: boolean | null;
  residenceType: 'urban' | 'rural' | '';
  hasBankAccountLinked: boolean | null;
  receivedOtherAid: boolean | null;
  isRecurrence: boolean | null;
}

export interface EligibilityMatch {
  scheme: CancerScheme;
  reasons: string[];
  documentsNeeded: string[];
}

export interface MatchResult {
  eligibleSchemes: EligibilityMatch[];
  eligibleNGOs: CancerNGO[];
  nearbyHelpDesks: HelpDesk[];
  nextSteps: string[];
}
