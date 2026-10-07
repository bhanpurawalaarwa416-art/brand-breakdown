import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section className="py-16 sm:py-20 bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500">
          <Mail className="w-4 h-4" />
          <span>Weekly Editorial Dispatch</span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Stay in the Loop.
        </h2>

        <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto leading-relaxed font-normal">
          Get the latest brand stories, marketing insights and digital trends delivered straight to your inbox.
        </p>

        {submitted ? (
          <div className="p-6 bg-gray-800/90 rounded-2xl border border-gray-700 max-w-md mx-auto space-y-2 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-lg">
              <CheckCircle2 className="w-6 h-6" />
              <span>You&apos;re on the list!</span>
            </div>
            <p className="text-xs text-gray-400">
              Welcome aboard. Keep an eye out for our upcoming deep dive breakdown.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setEmail('');
              }}
              className="text-xs text-gray-400 hover:text-white underline pt-2 cursor-pointer"
            >
              Subscribe with another email
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto space-y-2"
          >
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter your student or work email..."
                aria-label="Email address for newsletter"
                className="flex-1 px-4 py-3.5 bg-gray-800/90 border border-gray-700 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            {error && <p className="text-xs text-red-400 text-left pl-1">{error}</p>}
            <p className="text-[11px] text-gray-500 pt-2">
              Academic demonstration only · Zero spam · No data collected or shared.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
