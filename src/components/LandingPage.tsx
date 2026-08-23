import { Mic, Heart, FileText, ShieldCheck, ArrowRight, Stethoscope, Mail, Phone } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Sahaay</h1>
              <p className="text-xs text-slate-500 -mt-0.5">Financial Navigator for Cancer Patients</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Privacy-first · No data stored</span>
          </div>
        </div>
      </header>

      {/* Main content — flex-1 to push footer down */}
      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-5 pt-12 pb-8 sm:pt-20 sm:pb-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-sm font-medium mb-6">
              <Stethoscope className="w-4 h-4" />
              For families facing cancer in India
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 leading-tight mb-4">
              No family should lose money they're owed<br className="hidden sm:block" /> because they couldn't read a form.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              Sahaay asks the right questions in your language, by voice, and tells you exactly which
              government schemes, NGO grants, and financial aid you qualify for — with a printable report
              you can carry to the hospital help desk.
            </p>
            <button
              onClick={onStart}
              className="inline-flex items-center gap-3 px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white text-lg font-semibold rounded-2xl shadow-lg shadow-sky-600/20 transition-all hover:shadow-xl"
            >
              <Mic className="w-6 h-6" />
              Start Voice Check
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-sm text-slate-400 mt-3">
              Takes 2 minutes · 100% voice · Free
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-6xl mx-auto px-5 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center mb-4">
                <Mic className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Answer by voice</h3>
              <p className="text-slate-600 leading-relaxed">
                Sahaay asks simple questions one at a time — about your state, income, hospital, and treatment.
                No reading or typing required.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Get verified matches</h3>
              <p className="text-slate-600 leading-relaxed">
                A rule-based engine matches your answers to real government schemes and NGO grants — no
                guessing, no hallucinations.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Carry your report</h3>
              <p className="text-slate-600 leading-relaxed">
                Get a printable eligibility report with scheme names, documents needed, and nearest help
                desk addresses — read aloud or printed.
              </p>
            </div>
          </div>
        </section>

        {/* Trust banner */}
        <section className="bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto px-5 py-10 text-center">
            <p className="text-lg font-medium mb-2">
              "The scheme already exists. The money already exists."
            </p>
            <p className="text-slate-400 text-sm">
              Sahaay asks the questions no one had time to ask — so no eligible family walks away
              empty-handed.
            </p>
          </div>
        </section>
      </main>

      {/* Footer with contact info */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-6xl mx-auto px-5 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            {/* Branding */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" fill="white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Sahaay</h3>
              </div>
              <p className="text-sm text-slate-600">Financial Navigator for Cancer Patients in India</p>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Contact Us</h4>
              <div className="space-y-2">
                <a
                  href="mailto:support@sahaay.org"
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-sky-600 transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  support@sahaay.org
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-sky-600 transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  +91 98765 43210
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">About</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-slate-600 hover:text-sky-600 transition-colors">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-600 hover:text-sky-600 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-600 hover:text-sky-600 transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-slate-200 mb-6" />

          {/* Copyright */}
          <div className="text-center text-sm text-slate-500">
            <p>© 2024 Sahaay. Built with ❤️ for families facing cancer in India.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
