import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Globe, Rocket, HelpCircle, FileCheck } from 'lucide-react';

interface VercelGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VercelGuideModal: React.FC<VercelGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyCode = (text: string, index: number) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-gray-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
              ▲
            </div>
            <div>
              <h3 className="font-editorial text-lg font-bold text-gray-950">
                Run Locally &amp; Deploy on Vercel
              </h3>
              <p className="text-xs text-gray-500">
                Complete evaluation &amp; hosting guide for BBA Digital Business
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-700">
          {/* Step 1: Run Locally */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-gray-950">
              <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center">
                1
              </span>
              <span>How to Run Locally</span>
            </div>
            <p className="text-xs text-gray-600">
              In your project folder (requires Node.js 18+ installed):
            </p>
            <div className="bg-gray-900 text-gray-100 p-3 rounded-xl font-mono text-xs flex items-center justify-between">
              <span>npm install &amp;&amp; npm run dev</span>
              <button
                onClick={() => copyCode('npm install && npm run dev', 1)}
                className="text-gray-400 hover:text-white cursor-pointer ml-2"
              >
                {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-[11px] text-gray-500">
              Open <code className="text-red-600">http://localhost:3000</code> or the Vite port shown in your terminal.
            </p>
          </div>

          {/* Step 2: Build Locally */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-gray-950">
              <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center">
                2
              </span>
              <span>How to Build for Production</span>
            </div>
            <p className="text-xs text-gray-600">
              Creates the optimized production bundle in the <code className="text-gray-800 font-mono">dist/</code> directory:
            </p>
            <div className="bg-gray-900 text-gray-100 p-3 rounded-xl font-mono text-xs flex items-center justify-between">
              <span>npm run build</span>
              <button
                onClick={() => copyCode('npm run build', 2)}
                className="text-gray-400 hover:text-white cursor-pointer ml-2"
              >
                {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Step 3: Deploy on Vercel (100% Free) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-gray-950">
              <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center">
                3
              </span>
              <span>Deploy on Vercel (Free Hobby Plan)</span>
            </div>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-gray-600">
              <li>Push this project repository to your GitHub account.</li>
              <li>Go to <strong className="text-gray-900">vercel.com</strong> and sign in with GitHub.</li>
              <li>Click <strong className="text-gray-900">&ldquo;Add New...&rdquo; &rarr; &ldquo;Project&rdquo;</strong>.</li>
              <li>Select your repository (<code className="text-gray-800">brand-breakdown</code>).</li>
              <li>Vercel automatically detects <strong className="text-gray-900">Vite</strong> as the framework!</li>
              <li>Click <strong className="text-red-600 font-bold">Deploy</strong>. Your site will be live on a <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">.vercel.app</code> domain in ~45 seconds.</li>
            </ol>
          </div>

          {/* Step 4: Environment Variables */}
          <div className="space-y-2 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-gray-800">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>Environment Variables</span>
            </div>
            <p className="text-xs text-gray-600">
              <strong>None required!</strong> The blog is self-contained with all 12 rich editorial articles and brand case studies embedded. It does not require any paid third-party database or server keys.
            </p>
          </div>

          {/* Step 5: Viva / Evaluation Presentation Tips */}
          <div className="space-y-2 bg-red-50/60 p-4 rounded-xl border border-red-200/80">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-red-700">
              <Rocket className="w-4 h-4" />
              <span>Tips for Viva / Project Presentation</span>
            </div>
            <ul className="text-xs text-gray-700 space-y-1 list-disc pl-4">
              <li>Highlight how <strong>Zomato</strong> uses conversational humor to escape commodity status.</li>
              <li>Explain <strong>Nike&apos;s</strong> emotional branding philosophy (&ldquo;Just Do It&rdquo; sells grit, not rubber).</li>
              <li>Show how <strong>Starbucks</strong> uses sensory retail to build the &ldquo;Third Place&rdquo;.</li>
              <li>Demonstrate the search bar, category filters, and mobile responsive menu live.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-950 hover:bg-gray-800 text-white text-xs font-bold rounded-lg cursor-pointer"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
