import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  language: 'en' | 'hi' | 'kn';
  onChange: (lang: 'en' | 'hi' | 'kn') => void;
}

const languages: { code: 'en' | 'hi' | 'kn'; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ' },
];

export default function LanguageSelector({ language, onChange }: LanguageSelectorProps) {
  return (
    <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1">
      <Globe className="w-4 h-4 text-slate-400 ml-1.5" />
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onChange(lang.code)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            language === lang.code
              ? 'bg-sky-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {lang.nativeLabel}
        </button>
      ))}
    </div>
  );
}
