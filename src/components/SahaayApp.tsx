import { useState, useEffect } from 'react';
import LandingPage from '@/components/LandingPage';
import IntakeFlow from '@/components/IntakeFlow';
import ReportView from '@/components/ReportView';
import LanguageSelector from '@/components/LanguageSelector';
import { runEligibilityEngine } from '@/lib/eligibilityEngine';
import { cancerSchemes, cancerNGOs, helpDesks } from '@/lib/schemeData';
import type { IntakeAnswers, MatchResult } from '@/types';

type AppStage = 'landing' | 'intake' | 'loading' | 'report';

const LANGUAGE_STORAGE_KEY = 'sahaay_language_preference';

export default function SahaayApp() {
  const [stage, setStage] = useState<AppStage>('landing');
  const [language, setLanguage] = useState<'en' | 'hi' | 'kn'>('en');
  const [answers, setAnswers] = useState<IntakeAnswers | null>(null);
  const [result, setResult] = useState<MatchResult | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as 'en' | 'hi' | 'kn' | null;
    if (saved && ['en', 'hi', 'kn'].includes(saved)) setLanguage(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const handleIntakeComplete = (collectedAnswers: IntakeAnswers) => {
    setAnswers(collectedAnswers);
    setStage('loading');
    setTimeout(() => {
      setResult(runEligibilityEngine(cancerSchemes, cancerNGOs, helpDesks, collectedAnswers));
      setStage('report');
    }, 600);
  };

  const handleRestart = () => {
    setAnswers(null);
    setResult(null);
    setStage('intake');
  };

  const handleHome = () => {
    setAnswers(null);
    setResult(null);
    setStage('landing');
  };

  return (
    <div className="min-h-screen">
      <div className="fixed top-4 right-4 z-20 print:hidden">
        <LanguageSelector language={language} onChange={setLanguage} />
      </div>

      {stage === 'landing' && <LandingPage onStart={() => setStage('intake')} />}

      {stage === 'intake' && (
        <IntakeFlow onComplete={handleIntakeComplete} onBack={handleHome} language={language} />
      )}

      {stage === 'loading' && (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-600 font-medium">Finding schemes you qualify for...</p>
          </div>
        </div>
      )}

      {stage === 'report' && result && answers && (
        <ReportView
          result={result}
          answers={answers}
          onRestart={handleRestart}
          onHome={handleHome}
          language={language}
        />
      )}
    </div>
  );
}
