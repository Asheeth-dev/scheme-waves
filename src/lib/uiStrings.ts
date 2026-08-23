import type { Lang } from '@/lib/intakeQuestions';

type Strings = {
  home: string;
  questionOf: (n: number, total: number) => string;
  voiceOn: string;
  voiceOff: string;
  voice: string;
  listening: string;
  tapAndSpeak: string;
  heard: string;
  sttUnsupported: string;
  yes: string;
  no: string;
  enterAge: string;
  submit: string;
  repeatSlowly: string;
  back: string;
  next: string;
  seeResults: string;
};

const en: Strings = {
  home: 'Home',
  questionOf: (n, total) => `Question ${n} of ${total}`,
  voiceOn: 'On',
  voiceOff: 'Off',
  voice: 'Voice',
  listening: 'Listening... Tap to stop',
  tapAndSpeak: 'Tap and speak your answer',
  heard: 'Heard',
  sttUnsupported: "Voice input isn't supported on this browser. Please use the buttons below.",
  yes: 'Yes',
  no: 'No',
  enterAge: 'Enter age',
  submit: 'Submit',
  repeatSlowly: 'Repeat question slowly',
  back: 'Back',
  next: 'Next',
  seeResults: 'See My Results',
};

const hi: Strings = {
  home: 'होम',
  questionOf: (n, total) => `प्रश्न ${n} / ${total}`,
  voiceOn: 'चालू',
  voiceOff: 'बंद',
  voice: 'आवाज़',
  listening: 'सुन रहे हैं... रोकने के लिए टैप करें',
  tapAndSpeak: 'टैप करें और अपना उत्तर बोलें',
  heard: 'सुना',
  sttUnsupported: 'इस ब्राउज़र में आवाज़ इनपुट समर्थित नहीं है। कृपया नीचे के बटन उपयोग करें।',
  yes: 'हाँ',
  no: 'नहीं',
  enterAge: 'उम्र दर्ज करें',
  submit: 'जमा करें',
  repeatSlowly: 'प्रश्न धीरे-धीरे दोहराएँ',
  back: 'पीछे',
  next: 'आगे',
  seeResults: 'मेरे परिणाम देखें',
};

const kn: Strings = {
  home: 'ಮುಖಪುಟ',
  questionOf: (n, total) => `ಪ್ರಶ್ನೆ ${n} / ${total}`,
  voiceOn: 'ಆನ್',
  voiceOff: 'ಆಫ್',
  voice: 'ಧ್ವನಿ',
  listening: 'ಕೇಳುತ್ತಿದೆ... ನಿಲ್ಲಿಸಲು ಟ್ಯಾಪ್ ಮಾಡಿ',
  tapAndSpeak: 'ಟ್ಯಾಪ್ ಮಾಡಿ ನಿಮ್ಮ ಉತ್ತರ ಹೇಳಿ',
  heard: 'ಕೇಳಿದ್ದು',
  sttUnsupported: 'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಬಟನ್‌ಗಳನ್ನು ಬಳಸಿ.',
  yes: 'ಹೌದು',
  no: 'ಇಲ್ಲ',
  enterAge: 'ವಯಸ್ಸು ನಮೂದಿಸಿ',
  submit: 'ಸಲ್ಲಿಸಿ',
  repeatSlowly: 'ಪ್ರಶ್ನೆಯನ್ನು ನಿಧಾನವಾಗಿ ಪುನರಾವರ್ತಿಸಿ',
  back: 'ಹಿಂದೆ',
  next: 'ಮುಂದೆ',
  seeResults: 'ನನ್ನ ಫಲಿತಾಂಶ ನೋಡಿ',
};

export const uiStrings: Record<Lang, Strings> = { en, hi, kn };

export function t(lang: Lang): Strings {
  return uiStrings[lang] ?? en;
}
