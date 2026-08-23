import type { IntakeAnswers } from '@/types';

export type Lang = 'en' | 'hi' | 'kn';

export interface IntakeOption {
  label: string;
  labelHindi?: string;
  labelKannada?: string;
  value: string | boolean;
}

export interface IntakeQuestion {
  key: keyof IntakeAnswers;
  question: string;
  questionHindi: string;
  questionKannada: string;
  type: 'choice' | 'boolean' | 'number';
  options?: IntakeOption[];
  helpText?: string;
  helpTextHindi?: string;
  helpTextKannada?: string;
}

export function localize(
  lang: Lang,
  en: string | undefined,
  hi?: string,
  kn?: string
): string {
  if (lang === 'hi') return hi || en || '';
  if (lang === 'kn') return kn || en || '';
  return en || '';
}

export function getQuestionText(q: IntakeQuestion, lang: Lang): string {
  return localize(lang, q.question, q.questionHindi, q.questionKannada);
}

export function getHelpText(q: IntakeQuestion, lang: Lang): string {
  return localize(lang, q.helpText, q.helpTextHindi, q.helpTextKannada);
}

export function getOptionLabel(opt: IntakeOption, lang: Lang): string {
  return localize(lang, opt.label, opt.labelHindi, opt.labelKannada);
}

const states: IntakeOption[] = [
  { label: 'Karnataka', labelHindi: 'कर्नाटक', labelKannada: 'ಕರ್ನಾಟಕ', value: 'Karnataka' },
  { label: 'Kerala', labelHindi: 'केरल', labelKannada: 'ಕೇರಳ', value: 'Kerala' },
  { label: 'Tamil Nadu', labelHindi: 'तमिलनाडु', labelKannada: 'ತಮಿಳುನಾಡು', value: 'Tamil Nadu' },
  { label: 'Maharashtra', labelHindi: 'महाराष्ट्र', labelKannada: 'ಮಹಾರಾಷ್ಟ್ರ', value: 'Maharashtra' },
  { label: 'West Bengal', labelHindi: 'पश्चिम बंगाल', labelKannada: 'ಪಶ್ಚಿಮ ಬಂಗಾಳ', value: 'West Bengal' },
  { label: 'Delhi', labelHindi: 'दिल्ली', labelKannada: 'ದೆಹಲಿ', value: 'Delhi' },
  { label: 'Uttar Pradesh', labelHindi: 'उत्तर प्रदेश', labelKannada: 'ಉತ್ತರ ಪ್ರದೇಶ', value: 'Uttar Pradesh' },
  { label: 'Andhra Pradesh', labelHindi: 'आंध्र प्रदेश', labelKannada: 'ಆಂಧ್ರ ಪ್ರದೇಶ', value: 'Andhra Pradesh' },
  { label: 'Telangana', labelHindi: 'तेलंगाना', labelKannada: 'ತೆಲಂಗಾಣ', value: 'Telangana' },
  { label: 'Gujarat', labelHindi: 'गुजरात', labelKannada: 'ಗುಜರಾತ್', value: 'Gujarat' },
  { label: 'Rajasthan', labelHindi: 'राजस्थान', labelKannada: 'ರಾಜಸ್ಥಾನ', value: 'Rajasthan' },
  { label: 'Odisha', labelHindi: 'ओडिशा', labelKannada: 'ಒಡಿಶಾ', value: 'Odisha' },
  { label: 'Assam', labelHindi: 'असम', labelKannada: 'ಅಸ್ಸಾಂ', value: 'Assam' },
  { label: 'Punjab', labelHindi: 'पंजाब', labelKannada: 'ಪಂಜಾಬ್', value: 'Punjab' },
  { label: 'Haryana', labelHindi: 'हरियाणा', labelKannada: 'ಹರಿಯಾಣ', value: 'Haryana' },
  { label: 'Bihar', labelHindi: 'बिहार', labelKannada: 'ಬಿಹಾರ', value: 'Bihar' },
  { label: 'Madhya Pradesh', labelHindi: 'मध्य प्रदेश', labelKannada: 'ಮಧ್ಯ ಪ್ರದೇಶ', value: 'Madhya Pradesh' },
  { label: 'Chhattisgarh', labelHindi: 'छत्तीसगढ़', labelKannada: 'ಛತ್ತೀಸಗಢ', value: 'Chhattisgarh' },
  { label: 'Jharkhand', labelHindi: 'झारखंड', labelKannada: 'ಜಾರ್ಖಂಡ್', value: 'Jharkhand' },
  { label: 'Uttarakhand', labelHindi: 'उत्तराखंड', labelKannada: 'ಉತ್ತರಾಖಂಡ', value: 'Uttarakhand' },
  { label: 'Himachal Pradesh', labelHindi: 'हिमाचल प्रदेश', labelKannada: 'ಹಿಮಾಚಲ ಪ್ರದೇಶ', value: 'Himachal Pradesh' },
  { label: 'Goa', labelHindi: 'गोवा', labelKannada: 'ಗೋವಾ', value: 'Goa' },
];

export const intakeQuestions: IntakeQuestion[] = [
  {
    key: 'state',
    question: 'Which state do you live in?',
    questionHindi: 'आप किस राज्य में रहते हैं?',
    questionKannada: 'ನೀವು ಯಾವ ರಾಜ್ಯದಲ್ಲಿ ವಾಸಿಸುತ್ತೀರಿ?',
    type: 'choice',
    helpText: 'This determines which state-specific schemes apply to you.',
    helpTextHindi: 'इससे तय होता है कि कौन सी राज्य-विशेष योजनाएँ आप पर लागू होती हैं।',
    helpTextKannada: 'ಇದು ಯಾವ ರಾಜ್ಯ-ನಿರ್ದಿಷ್ಟ ಯೋಜನೆಗಳು ನಿಮಗೆ ಅನ್ವಯಿಸುತ್ತವೆ ಎಂಬುದನ್ನು ನಿರ್ಧರಿಸುತ್ತದೆ.',
    options: states,
  },
  {
    key: 'incomeBracket',
    question: 'What is your family\'s monthly income?',
    questionHindi: 'आपके परिवार की मासिक आय कितनी है?',
    questionKannada: 'ನಿಮ್ಮ ಕುಟುಂಬದ ತಿಂಗಳ ಆದಾಯ ಎಷ್ಟು?',
    type: 'choice',
    helpText: 'Many schemes are based on income level.',
    helpTextHindi: 'कई योजनाएँ आय स्तर पर आधारित होती हैं।',
    helpTextKannada: 'ಹಲವು ಯೋಜನೆಗಳು ಆದಾಯ ಮಟ್ಟದ ಆಧಾರದ ಮೇಲೆ ಇವೆ.',
    options: [
      { label: 'Below ₹10,000', labelHindi: '₹10,000 से कम', labelKannada: '₹10,000 ಕ್ಕಿಂತ ಕಡಿಮೆ', value: 'below_10000' },
      { label: '₹10,000 – ₹25,000', labelHindi: '₹10,000 – ₹25,000', labelKannada: '₹10,000 – ₹25,000', value: '10000_25000' },
      { label: '₹25,000 – ₹50,000', labelHindi: '₹25,000 – ₹50,000', labelKannada: '₹25,000 – ₹50,000', value: '25000_50000' },
      { label: 'Above ₹50,000', labelHindi: '₹50,000 से अधिक', labelKannada: '₹50,000 ಕ್ಕಿಂತ ಹೆಚ್ಚು', value: 'above_50000' },
    ],
  },
  {
    key: 'rationCardType',
    question: 'What type of ration card do you have?',
    questionHindi: 'आपके पास किस प्रकार का राशन कार्ड है?',
    questionKannada: 'ನಿಮ್ಮ ಬಳಿ ಯಾವ ಪ್ರಕಾರದ ರೇಶನ್ ಕಾರ್ಡ್ ಇದೆ?',
    type: 'choice',
    helpText: 'BPL vs APL determines eligibility for many schemes.',
    helpTextHindi: 'बीपीएल या एपीएल से कई योजनाओं की पात्रता तय होती है।',
    helpTextKannada: 'BPL ಅಥವಾ APL ಹಲವು ಯೋಜನೆಗಳ ಅರ್ಹತೆಯನ್ನು ನಿರ್ಧರಿಸುತ್ತದೆ.',
    options: [
      { label: 'BPL (Below Poverty Line)', labelHindi: 'बीपीएल (गरीबी रेखा से नीचे)', labelKannada: 'BPL (ಬಡತನ ರೇಖೆಗಿಂತ ಕೆಳಗೆ)', value: 'BPL' },
      { label: 'APL (Above Poverty Line)', labelHindi: 'एपीएल (गरीबी रेखा से ऊपर)', labelKannada: 'APL (ಬಡತನ ರೇಖೆಗಿಂತ ಮೇಲೆ)', value: 'APL' },
      { label: 'No ration card', labelHindi: 'राशन कार्ड नहीं है', labelKannada: 'ರೇಶನ್ ಕಾರ್ಡ್ ಇಲ್ಲ', value: 'none' },
    ],
  },
  {
    key: 'treatmentStage',
    question: 'What stage is the cancer treatment at?',
    questionHindi: 'कैंसर उपचार किस चरण में है?',
    questionKannada: 'ಕ್ಯಾನ್ಸರ್ ಚಿಕಿತ್ಸೆ ಯಾವ ಹಂತದಲ್ಲಿದೆ?',
    type: 'choice',
    helpText: 'Different schemes apply at different stages.',
    helpTextHindi: 'अलग-अलग चरणों पर अलग-अलग योजनाएँ लागू होती हैं।',
    helpTextKannada: 'ವಿವಿಧ ಹಂತಗಳಲ್ಲಿ ವಿವಿಧ ಯೋಜನೆಗಳು ಅನ್ವಯಿಸುತ್ತವೆ.',
    options: [
      { label: 'Early detection / diagnosis', labelHindi: 'प्रारंभिक पहचान / निदान', labelKannada: 'ಆರಂಭಿಕ ಪತ್ತೆ / ರೋಗನಿರ್ಣಯ', value: 'early_detection' },
      { label: 'Ongoing chemotherapy', labelHindi: 'चल रही कीमोथेरेपी', labelKannada: 'ನಡೆಯುತ್ತಿರುವ ಕಿಮೊಥೆರಪಿ', value: 'ongoing_chemo' },
      { label: 'Surgery needed', labelHindi: 'सर्जरी की आवश्यकता', labelKannada: 'ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ ಅಗತ್ಯವಿದೆ', value: 'surgery_needed' },
      { label: 'Palliative / advanced stage', labelHindi: 'उपशामक / उन्नत चरण', labelKannada: 'ಉಪಶಾಮಕ / ಮುಂದುವರಿದ ಹಂತ', value: 'palliative' },
    ],
  },
  {
    key: 'hospitalType',
    question: 'Where is the treatment happening?',
    questionHindi: 'उपचार कहाँ हो रहा है?',
    questionKannada: 'ಚಿಕಿತ್ಸೆ ಎಲ್ಲಿ ನಡೆಯುತ್ತಿದೆ?',
    type: 'choice',
    helpText: 'Government hospitals unlock more schemes.',
    helpTextHindi: 'सरकारी अस्पतालों में अधिक योजनाएँ उपलब्ध होती हैं।',
    helpTextKannada: 'ಸರ್ಕಾರಿ ಆಸ್ಪತ್ರೆಗಳಲ್ಲಿ ಹೆಚ್ಚು ಯೋಜನೆಗಳು ಲಭ್ಯ.',
    options: [
      { label: 'Government hospital', labelHindi: 'सरकारी अस्पताल', labelKannada: 'ಸರ್ಕಾರಿ ಆಸ್ಪತ್ರೆ', value: 'government' },
      { label: 'Private hospital (empanelled)', labelHindi: 'निजी अस्पताल (सूचीबद्ध)', labelKannada: 'ಖಾಸಗಿ ಆಸ್ಪತ್ರೆ (ಪಟ್ಟಿಯಲ್ಲಿರುವ)', value: 'private_empanelled' },
      { label: 'Private hospital (not empanelled)', labelHindi: 'निजी अस्पताल (सूचीबद्ध नहीं)', labelKannada: 'ಖಾಸಗಿ ಆಸ್ಪತ್ರೆ (ಪಟ್ಟಿಯಲ್ಲಿಲ್ಲ)', value: 'private_non_empanelled' },
    ],
  },
  {
    key: 'hasAyushmanCard',
    question: 'Do you have an Ayushman Bharat card?',
    questionHindi: 'क्या आपके पास आयुष्मान भारत कार्ड है?',
    questionKannada: 'ನಿಮ್ಮ ಬಳಿ ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಕಾರ್ಡ್ ಇದೆಯೇ?',
    type: 'boolean',
    helpText: 'The Ayushman card gives cashless treatment up to ₹5 lakh.',
    helpTextHindi: 'आयुष्मान कार्ड से ₹5 लाख तक कैशलेस इलाज मिलता है।',
    helpTextKannada: 'ಆಯುಷ್ಮಾನ್ ಕಾರ್ಡ್ ₹5 ಲಕ್ಷದವರೆಗೆ ನಗದುರಹಿತ ಚಿಕಿತ್ಸೆ ನೀಡುತ್ತದೆ.',
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
    helpTextHindi: 'सरकारी कर्मचारियों और संगठित क्षेत्र के श्रमिकों के लिए अलग योजनाएँ हैं।',
    helpTextKannada: 'ಸರ್ಕಾರಿ ನೌಕರರು ಮತ್ತು ಸಂಘಟಿತ ವಲಯದ ಕಾರ್ಮಿಕರಿಗೆ ಪ್ರತ್ಯೇಕ ಯೋಜನೆಗಳಿವೆ.',
    options: [
      { label: 'Central/State Government employee or pensioner', labelHindi: 'केंद्र/राज्य सरकार कर्मचारी या पेंशनभोगी', labelKannada: 'ಕೇಂದ್ರ/ರಾಜ್ಯ ಸರ್ಕಾರಿ ನೌಕರ ಅಥವಾ ಪಿಂಚಣಿದಾರ', value: 'organized_govt' },
      { label: 'Private organized sector (company employee)', labelHindi: 'निजी संगठित क्षेत्र (कंपनी कर्मचारी)', labelKannada: 'ಖಾಸಗಿ ಸಂಘಟಿತ ವಲಯ (ಕಂಪನಿ ನೌಕರ)', value: 'organized_private' },
      { label: 'Unorganized / daily wage / self-employed', labelHindi: 'असंगठित / दैनिक मजदूरी / स्वरोजगार', labelKannada: 'ಅಸಂಘಟಿತ / ದಿನಗೂಲಿ / ಸ್ವಯಂ ಉದ್ಯೋಗ', value: 'unorganized' },
    ],
  },
  {
    key: 'patientAge',
    question: 'How old is the patient?',
    questionHindi: 'मरीज की उम्र कितनी है?',
    questionKannada: 'ರೋಗಿಯ ವಯಸ್ಸು ಎಷ್ಟು?',
    type: 'number',
    helpText: 'Age unlocks child-specific and senior citizen schemes.',
    helpTextHindi: 'उम्र से बाल-विशेष और वरिष्ठ नागरिक योजनाएँ खुलती हैं।',
    helpTextKannada: 'ವಯಸ್ಸು ಮಕ್ಕಳ ಮತ್ತು ಹಿರಿಯ ನಾಗರಿಕರ ಯೋಜನೆಗಳನ್ನು ತೆರೆಯುತ್ತದೆ.',
  },
  {
    key: 'patientGender',
    question: 'What is the patient\'s gender?',
    questionHindi: 'मरीज का लिंग क्या है?',
    questionKannada: 'ರೋಗಿಯ ಲಿಂಗ ಯಾವುದು?',
    type: 'choice',
    options: [
      { label: 'Male', labelHindi: 'पुरुष', labelKannada: 'ಪುರುಷ', value: 'male' },
      { label: 'Female', labelHindi: 'महिला', labelKannada: 'ಮಹಿಳೆ', value: 'female' },
      { label: 'Other', labelHindi: 'अन्य', labelKannada: 'ಇತರೆ', value: 'other' },
    ],
  },
  {
    key: 'hasBPLCertificate',
    question: 'Do you have a separate BPL certificate (apart from ration card)?',
    questionHindi: 'क्या आपके पास अलग से बीपीएल प्रमाणपत्र है?',
    questionKannada: 'ನಿಮ್ಮ ಬಳಿ ಪ್ರತ್ಯೇಕ BPL ಪ್ರಮಾಣಪತ್ರ ಇದೆಯೇ?',
    type: 'boolean',
    helpText: 'Some schemes require a BPL certificate as distinct proof.',
    helpTextHindi: 'कुछ योजनाओं में बीपीएल प्रमाणपत्र अलग प्रमाण के रूप में आवश्यक है।',
    helpTextKannada: 'ಕೆಲವು ಯೋಜನೆಗಳಿಗೆ BPL ಪ್ರಮಾಣಪತ್ರ ಪ್ರತ್ಯೇಕ ದಾಖಲೆಯಾಗಿ ಬೇಕು.',
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
    helpTextHindi: 'सीधे लाभ हस्तांतरण के लिए आधार से जुड़ा बैंक खाता आवश्यक है।',
    helpTextKannada: 'ನೇರ ಸೌಲಭ್ಯ ವರ್ಗಾವಣೆಗೆ ಆಧಾರ್ ಜೋಡಿತ ಬ್ಯಾಂಕ್ ಖಾತೆ ಅಗತ್ಯ.',
  },
  {
    key: 'receivedOtherAid',
    question: 'Have you already received funds from any other scheme or NGO for this treatment?',
    questionHindi: 'क्या आपने पहले ही किसी अन्य योजना से धन प्राप्त किया है?',
    questionKannada: 'ಈ ಚಿಕಿತ್ಸೆಗಾಗಿ ಈಗಾಗಲೇ ಯಾವುದೇ ಇತರ ಯೋಜನೆಯಿಂದ ಧನಸಹಾಯ ಪಡೆದಿದ್ದೀರಾ?',
    type: 'boolean',
    helpText: 'Some schemes exclude cases already covered elsewhere.',
    helpTextHindi: 'कुछ योजनाएँ पहले से कवर मामलों को शामिल नहीं करती हैं।',
    helpTextKannada: 'ಕೆಲವು ಯೋಜನೆಗಳು ಈಗಾಗಲೇ ಸಹಾಯ ಪಡೆದ ಪ್ರಕರಣಗಳನ್ನು ಹೊರತುಪಡಿಸುತ್ತವೆ.',
  },
];
