import type { IntakeAnswers } from '@/types';

export interface IntakeQuestion {
  key: keyof IntakeAnswers;
  question: string;
  questionHindi: string;
  questionKannada: string;
  type: 'choice' | 'boolean' | 'number';
  options?: { label: string; value: string | boolean }[];
  helpText?: string;
}

export const intakeQuestions: IntakeQuestion[] = [
  {
    key: 'state',
    question: 'Which state do you live in?',
    questionHindi: 'आप किस राज्य में रहते हैं?',
    questionKannada: 'ನೀವು ಯಾವ ರಾಜ್ಯದಲ್ಲಿ ವಾಸಿಸುತ್ತೀರಿ?',
    type: 'choice',
    helpText: 'This determines which state-specific schemes apply to you.',
    options: [
      { label: 'Karnataka', value: 'Karnataka' },
      { label: 'Kerala', value: 'Kerala' },
      { label: 'Tamil Nadu', value: 'Tamil Nadu' },
      { label: 'Maharashtra', value: 'Maharashtra' },
      { label: 'West Bengal', value: 'West Bengal' },
      { label: 'Delhi', value: 'Delhi' },
      { label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
      { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
      { label: 'Telangana', value: 'Telangana' },
      { label: 'Gujarat', value: 'Gujarat' },
      { label: 'Rajasthan', value: 'Rajasthan' },
      { label: 'Odisha', value: 'Odisha' },
      { label: 'Assam', value: 'Assam' },
      { label: 'Punjab', value: 'Punjab' },
      { label: 'Haryana', value: 'Haryana' },
      { label: 'Bihar', value: 'Bihar' },
      { label: 'Madhya Pradesh', value: 'Madhya Pradesh' },
      { label: 'Chhattisgarh', value: 'Chhattisgarh' },
      { label: 'Jharkhand', value: 'Jharkhand' },
      { label: 'Uttarakhand', value: 'Uttarakhand' },
      { label: 'Himachal Pradesh', value: 'Himachal Pradesh' },
      { label: 'Goa', value: 'Goa' },
    ],
  },
  {
    key: 'incomeBracket',
    question: 'What is your family\'s monthly income?',
    questionHindi: 'आपके परिवार की मासिक आय कितनी है?',
    questionKannada: 'ನಿಮ್ಮ ಕುಟುಂಬದ ತಿಂಗಳ ಆದಾಯ ಎಷ್ಟು?',
    type: 'choice',
    helpText: 'Many schemes are based on income level.',
    options: [
      { label: 'Below ₹10,000', value: 'below_10000' },
      { label: '₹10,000 – ₹25,000', value: '10000_25000' },
      { label: '₹25,000 – ₹50,000', value: '25000_50000' },
      { label: 'Above ₹50,000', value: 'above_50000' },
    ],
  },
  {
    key: 'rationCardType',
    question: 'What type of ration card do you have?',
    questionHindi: 'आपके पास किस प्रकार का राशन कार्ड है?',
    questionKannada: 'ನಿಮ್ಮ ಬಳಿ ಯಾವ ಪ್ರಕಾರದ ರೇಶನ್ ಕಾರ್ಡ್ ಇದೆ?',
    type: 'choice',
    helpText: 'BPL vs APL determines eligibility for many schemes.',
    options: [
      { label: 'BPL (Below Poverty Line)', value: 'BPL' },
      { label: 'APL (Above Poverty Line)', value: 'APL' },
      { label: 'No ration card', value: 'none' },
    ],
  },
  {
    key: 'treatmentStage',
    question: 'What stage is the cancer treatment at?',
    questionHindi: 'कैंसर उपचार किस चरण में है?',
    questionKannada: 'ಕ್ಯಾನ್ಸರ್ ಚಿಕಿತ್ಸೆ ಯಾವ ಹಂತದಲ್ಲಿದೆ?',
    type: 'choice',
    helpText: 'Different schemes apply at different stages.',
    options: [
      { label: 'Early detection / diagnosis', value: 'early_detection' },
      { label: 'Ongoing chemotherapy', value: 'ongoing_chemo' },
      { label: 'Surgery needed', value: 'surgery_needed' },
      { label: 'Palliative / advanced stage', value: 'palliative' },
    ],
  },
  {
    key: 'hospitalType',
    question: 'Where is the treatment happening?',
    questionHindi: 'उपचार कहाँ हो रहा है?',
    questionKannada: 'ಚಿಕಿತ್ಸೆ ಎಲ್ಲಿ ನಡೆಯುತ್ತಿದೆ?',
    type: 'choice',
    helpText: 'Government hospitals unlock more schemes.',
    options: [
      { label: 'Government hospital', value: 'government' },
      { label: 'Private hospital (empanelled)', value: 'private_empanelled' },
      { label: 'Private hospital (not empanelled)', value: 'private_non_empanelled' },
    ],
  },
  {
    key: 'hasAyushmanCard',
    question: 'Do you have an Ayushman Bharat card?',
    questionHindi: 'क्या आपके पास आयुष्मान भारत कार्ड है?',
    questionKannada: 'ನಿಮ್ಮ ಬಳಿ ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಕಾರ್ಡ್ ಇದೆಯೇ?',
    type: 'boolean',
    helpText: 'The Ayushman card gives cashless treatment up to ₹5 lakh.',
  },
  {
    key: 'hasPrivateInsurance',
    question: 'Do you have any private health insurance?',
    questionHindi: 'क्या आपके पास कोई निजी स्वास्थ्य बीमा है?',
    questionKannada: 'ನಿಮ್ಮ ಬಳಿ ಯಾವುದೇ ಖಾಸಗಿ ಆರೋಗ್ಯ ವಿಮೆ ಇದೆಯೇ?',
    type: 'boolean',
  },
  {
    key: 'employmentType',
    question: 'What type of employment does the earning member have?',
    questionHindi: 'कमाने वाले सदस्य का रोजगार किस प्रकार का है?',
    questionKannada: 'ಸಂಪಾದಿಸುವ ಸದಸ್ಯರ ಉದ್ಯೋಗ ಯಾವ ಪ್ರಕಾರದ್ದು?',
    type: 'choice',
    helpText: 'Government employees and organized sector workers have separate schemes.',
    options: [
      { label: 'Central/State Government employee or pensioner', value: 'organized_govt' },
      { label: 'Private organized sector (company employee)', value: 'organized_private' },
      { label: 'Unorganized / daily wage / self-employed', value: 'unorganized' },
    ],
  },
  {
    key: 'patientAge',
    question: 'How old is the patient?',
    questionHindi: 'मरीज की उम्र कितनी है?',
    questionKannada: 'ರೋಗಿಯ ವಯಸ್ಸು ಎಷ್ಟು?',
    type: 'number',
    helpText: 'Age unlocks child-specific and senior citizen schemes.',
  },
  {
    key: 'patientGender',
    question: 'What is the patient\'s gender?',
    questionHindi: 'मरीज का लिंग क्या है?',
    questionKannada: 'ರೋಗಿಯ ಲಿಂಗ ಯಾವುದು?',
    type: 'choice',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Other', value: 'other' },
    ],
  },
  {
    key: 'hasBPLCertificate',
    question: 'Do you have a separate BPL certificate (apart from ration card)?',
    questionHindi: 'क्या आपके पास अलग से बीपीएल प्रमाणपत्र है?',
    questionKannada: 'ನಿಮ್ಮ ಬಳಿ ಪ್ರತ್ಯೇಕ BPL ಪ್ರಮಾಣಪತ್ರ ಇದೆಯೇ?',
    type: 'boolean',
    helpText: 'Some schemes require a BPL certificate as distinct proof.',
  },
  {
    key: 'hasESIC',
    question: 'Is the patient covered under ESIC (employee insurance)?',
    questionHindi: 'क्या मरीज ईएसआईसी के तहत कवर है?',
    questionKannada: 'ರೋಗಿ ESIC ಅಡಿಯಲ್ಲಿ ಒಳಪಟ್ಟಿದ್ದಾರೆಯೇ?',
    type: 'boolean',
  },
  {
    key: 'hasBankAccountLinked',
    question: 'Do you have a bank account linked to Aadhaar (for DBT)?',
    questionHindi: 'क्या आपके पास आधार से जुड़ा बैंक खाता है?',
    questionKannada: 'ನಿಮ್ಮ ಬಳಿ ಆಧಾರ್ ಜೊತೆ ಸಂಪರ್ಕಿತ ಬ್ಯಾಂಕ್ ಖಾತೆ ಇದೆಯೇ?',
    type: 'boolean',
    helpText: 'Direct Benefit Transfer requires an Aadhaar-linked bank account.',
  },
  {
    key: 'receivedOtherAid',
    question: 'Have you already received funds from any other scheme or NGO for this treatment?',
    questionHindi: 'क्या आपने पहले ही किसी अन्य योजना से धन प्राप्त किया है?',
    questionKannada: 'ಈ ಚಿಕಿತ್ಸೆಗಾಗಿ ಈಗಾಗಲೇ ಯಾವುದೇ ಇತರ ಯೋಜನೆಯಿಂದ ಧನಸಹಾಯ ಪಡೆದಿದ್ದೀರಾ?',
    type: 'boolean',
    helpText: 'Some schemes exclude cases already covered elsewhere.',
  },
];
