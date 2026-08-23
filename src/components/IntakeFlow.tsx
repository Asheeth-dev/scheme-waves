import { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, Volume2, VolumeX, ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react';
import { intakeQuestions, type IntakeQuestion } from '@/lib/intakeQuestions';
import { useVoiceRecognition, useTextToSpeech } from '@/hooks/useVoice';
import type { IntakeAnswers } from '@/types';

interface IntakeFlowProps {
  onComplete: (answers: IntakeAnswers) => void;
  onBack: () => void;
  language: 'en' | 'hi' | 'kn';
}

const initialState: IntakeAnswers = {
  state: '',
  incomeBracket: '',
  rationCardType: '',
  treatmentStage: '',
  hospitalType: '',
  hasAyushmanCard: null,
  hasPrivateInsurance: null,
  employmentType: '',
  patientAge: null,
  patientGender: '',
  hasBPLCertificate: null,
  isGovtEmployee: null,
  hasESIC: null,
  residenceType: '',
  hasBankAccountLinked: null,
  receivedOtherAid: null,
  isRecurrence: null,
};

export default function IntakeFlow({ onComplete, onBack, language }: IntakeFlowProps) {
  const [answers, setAnswers] = useState<IntakeAnswers>(initialState);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numberInput, setNumberInput] = useState('');
  const [voiceMode, setVoiceMode] = useState(true);
  const completedRef = useRef(false);

  const { transcript, isListening, isSupported: sttSupported, startListening, stopListening, resetTranscript } =
    useVoiceRecognition(language);
  const { speak, stop, isSpeaking, isSupported: ttsSupported } = useTextToSpeech(language);

  const question: IntakeQuestion = intakeQuestions[currentIndex]!;
  const totalQuestions = intakeQuestions.length;
  const progress = ((currentIndex) / totalQuestions) * 100;

  const getQuestionText = useCallback(
    (q: IntakeQuestion) => {
      if (language === 'hi') return q.questionHindi || q.question;
      if (language === 'kn') return q.questionKannada || q.question;
      return q.question;
    },
    [language]
  );

  // Speak the current question when it changes
  useEffect(() => {
    if (voiceMode && ttsSupported) {
      const text = getQuestionText(question);
      const timeout = setTimeout(() => {
        speak(text, { rate: 0.75 });
      }, 300);
      return () => {
        clearTimeout(timeout);
        stop();
      };
    }
    return undefined;
  }, [currentIndex, voiceMode, ttsSupported, question, speak, stop, getQuestionText]);

  // Process voice transcript to match options
  useEffect(() => {
    if (!transcript) return;
    processVoiceInput(transcript);
  }, [transcript]);

  const processVoiceInput = (input: string) => {
    const text = input.toLowerCase().trim();

    if (question.type === 'boolean') {
      const yesWords = ['yes', 'haan', 'हां', 'हाँ', 'ಹೌದು', 'hoo', 'haa'];
      const noWords = ['no', 'nahi', 'नहीं', 'ಇಲ್ಲ', 'illa', 'nahi'];
      if (yesWords.some((w) => text.includes(w))) {
        selectAnswer(question.key, true);
        return;
      }
      if (noWords.some((w) => text.includes(w))) {
        selectAnswer(question.key, false);
        return;
      }
    }

    if (question.type === 'number') {
      const words: Record<string, number> = {
        one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8,
        nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14,
        fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19,
        twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70,
        eighty: 80, ninety: 90, 'ek': 1, 'do': 2, 'teen': 3, 'char': 4, 'paanch': 5,
        'chhe': 6, 'saat': 7, 'aath': 8, 'nau': 9, 'das': 10,
      };
      const numMatch = text.match(/\d+/);
      if (numMatch) {
        selectAnswer(question.key, parseInt(numMatch[0], 10));
        return;
      }
      for (const [word, num] of Object.entries(words)) {
        if (text.includes(word)) {
          selectAnswer(question.key, num);
          return;
        }
      }
    }

    if (question.type === 'choice' && question.options) {
      for (const opt of question.options) {
        const optLabel = opt.label.toLowerCase();
        const optValue = String(opt.value).toLowerCase();
        const labelWords = optLabel.split(/[\s/()]+/).filter((w) => w.length > 3);

        if (text.includes(optValue) || text.includes(optLabel)) {
          selectAnswer(question.key, opt.value);
          return;
        }
        for (const word of labelWords) {
          if (text.includes(word)) {
            selectAnswer(question.key, opt.value);
            return;
          }
        }
      }
    }
  };

  const selectAnswer = (key: keyof IntakeAnswers, value: string | boolean | number) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    resetTranscript();
    stopListening();
    stop();
    // Auto-advance after brief delay
    setTimeout(() => {
      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex((i) => i + 1);
      }
    }, 500);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      finishIntake();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const finishIntake = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    stop();
    onComplete(answers);
  };

  const handleNumberSubmit = () => {
    const age = parseInt(numberInput, 10);
    if (!isNaN(age) && age > 0 && age < 120) {
      selectAnswer(question.key, age);
      setNumberInput('');
    }
  };

  const isAnswered = (): boolean => {
    const val = answers[question.key];
    if (question.type === 'boolean') return val !== null;
    if (question.type === 'number') return val !== null;
    return val !== '';
  };

  const currentAnswer = answers[question.key];
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-5 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <button
              onClick={() => {
                if (voiceMode) {
                  stop();
                  stopListening();
                }
                setVoiceMode(!voiceMode);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                voiceMode
                  ? 'bg-sky-100 text-sky-700'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {voiceMode ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              Voice {voiceMode ? 'On' : 'Off'}
            </button>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-slate-100">
          <div
            className="h-full bg-sky-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center px-5 py-8">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 sm:p-10">
            {/* Question */}
            <div className="mb-8">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-1 h-8 rounded-full bg-sky-600 mt-1 flex-shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                  {getQuestionText(question)}
                </h2>
              </div>
              {question.helpText && (
                <p className="text-slate-500 text-base ml-4">{question.helpText}</p>
              )}
            </div>

            {/* Voice button */}
            {voiceMode && sttSupported && (
              <div className="mb-6">
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl text-lg font-semibold transition-all active:scale-[0.98] ${
                    isListening
                      ? 'bg-red-50 text-red-600 border-2 border-red-200'
                      : 'bg-sky-50 text-sky-700 border-2 border-sky-200 hover:bg-sky-100'
                  }`}
                >
                  {isListening ? (
                    <>
                      <MicOff className="w-6 h-6 animate-pulse" />
                      Listening... Tap to stop
                    </>
                  ) : (
                    <>
                      <Mic className="w-6 h-6" />
                      Tap and speak your answer
                    </>
                  )}
                </button>
                {transcript && (
                  <p className="text-center text-slate-600 mt-3 text-sm">
                    Heard: "{transcript}"
                  </p>
                )}
                {!sttSupported && (
                  <p className="text-center text-amber-600 mt-2 text-sm">
                    Voice input isn't supported on this browser. Please use the buttons below.
                  </p>
                )}
              </div>
            )}

            {/* Answer options */}
            {question.type === 'choice' && question.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {question.options.map((opt) => {
                  const isSelected = currentAnswer === opt.value;
                  return (
                    <button
                      key={String(opt.value)}
                      onClick={() => selectAnswer(question.key, opt.value)}
                      className={`flex items-center justify-between px-5 py-4 rounded-xl text-left text-base font-medium transition-all active:scale-[0.98] ${
                        isSelected
                          ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {opt.label}
                      {isSelected && <Check className="w-5 h-5 flex-shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            )}

            {question.type === 'boolean' && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => selectAnswer(question.key, true)}
                  className={`flex items-center justify-center gap-2 py-6 rounded-xl text-lg font-semibold transition-all active:scale-[0.98] ${
                    currentAnswer === true
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                >
                  <Check className="w-6 h-6" />
                  Yes
                </button>
                <button
                  onClick={() => selectAnswer(question.key, false)}
                  className={`flex items-center justify-center gap-2 py-6 rounded-xl text-lg font-semibold transition-all active:scale-[0.98] ${
                    currentAnswer === false
                      ? 'bg-slate-600 text-white shadow-md shadow-slate-600/20'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <MicOff className="w-6 h-6" />
                  No
                </button>
              </div>
            )}

            {question.type === 'number' && (
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={numberInput}
                  onChange={(e) => setNumberInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNumberSubmit()}
                  placeholder="Enter age"
                  className="flex-1 px-5 py-4 rounded-xl text-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
                />
                <button
                  onClick={handleNumberSubmit}
                  className="px-6 py-4 bg-sky-600 text-white rounded-xl text-lg font-semibold hover:bg-sky-700 transition-colors"
                >
                  Submit
                </button>
              </div>
            )}

            {/* Repeat question button (voice) */}
            {voiceMode && ttsSupported && (
              <button
                onClick={() => speak(getQuestionText(question), { rate: 0.65 })}
                className="mt-6 flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Repeat question slowly
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={isLast ? finishIntake : handleNext}
              disabled={!isAnswered()}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
            >
              {isLast ? 'See My Results' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
