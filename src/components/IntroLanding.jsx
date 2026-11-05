import React from 'react';
import { 
  ArrowRight, 
  Compass, 
  BookOpen, 
  CheckCircle2, 
  ArrowRightLeft,
  Hash,
  PenTool
} from 'lucide-react';

export default function IntroLanding({ currentPath, onPathSelect, onStartLearning, onOpenDigits }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24 view-enter">
      
      {/* Editorial Hero Header */}
      <section className="text-center space-y-5 sm:space-y-7 max-w-3xl mx-auto pt-4">
        
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-base-content leading-tight">
          Shared Phonetics. <br />
          <span className="text-primary">
            Two Timeless Scripts.
          </span>
        </h1>

        <p className="text-sm sm:text-lg text-base-content/75 max-w-2xl mx-auto leading-relaxed font-normal">
          Speakers of Hindi and Urdu share grammar, spoken vocabulary, and phonetic roots. This application bridges the script gap between <strong className="font-semibold text-base-content font-devanagari">देवनागरी (Devanagari)</strong> and <span className="font-semibold text-base-content font-nastaliq-inline text-xl px-1">نستعلیق</span> <strong>(Nastaliq)</strong> with linguistic accuracy.
        </p>

        {/* Learning Path Selection Cards - Clean English Instructions */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 text-left">
          
          {/* Path 1: I know Hindi */}
          <div 
            onClick={() => {
              onPathSelect('hindi-to-urdu');
              onStartLearning();
            }}
            className={`cursor-pointer rounded-3xl p-6 sm:p-8 border-2 transition-all duration-200 relative group flex flex-col justify-between ${
              currentPath === 'hindi-to-urdu'
                ? 'bg-base-100 border-primary shadow-lg ring-2 ring-primary/20'
                : 'bg-base-100 hover:bg-base-200/40 border-base-300 hover:border-primary/50 shadow-sm'
            }`}
          >
            <div className="space-y-4">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-2xl bg-primary text-primary-content font-medium flex items-center justify-center text-xl font-devanagari shadow-sm">
                    क
                  </span>
                  <ArrowRight className="w-4 h-4 text-base-content/40 group-hover:translate-x-1 transition-transform" />
                  <span className="w-11 h-11 rounded-2xl bg-base-200 text-base-content font-bold flex items-center justify-center text-2xl font-nastaliq shadow-sm">
                    ک
                  </span>
                </div>
                
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-base-200 text-base-content/70">
                  Hindi ➔ Urdu
                </span>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-base-content group-hover:text-primary transition-colors">
                  I know Hindi (Devanagari)
                </h2>
                <div className="text-xs font-semibold text-primary mt-0.5">
                  Goal: Learn the Urdu Nastaliq Script
                </div>
              </div>

              <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
                Learn the 39 Urdu alphabet characters, the 4 connected cursive positional forms (ـ), aspiration mechanics with Do-chashmi He (ھ), and Perso-Arabic homophones.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-base-200 flex items-center justify-between text-xs sm:text-sm font-bold text-primary">
              <span className="flex items-center gap-2 group-hover:gap-3 transition-all">
                <span>Start Learning Urdu</span>
                <ArrowRight className="w-4 h-4" />
              </span>
              <span className="text-xs text-base-content/50 font-medium">39 Letters</span>
            </div>
          </div>

          {/* Path 2: I know Urdu */}
          <div 
            onClick={() => {
              onPathSelect('urdu-to-hindi');
              onStartLearning();
            }}
            className={`cursor-pointer rounded-3xl p-6 sm:p-8 border-2 transition-all duration-200 relative group flex flex-col justify-between ${
              currentPath === 'urdu-to-hindi'
                ? 'bg-base-100 border-primary shadow-lg ring-2 ring-primary/20'
                : 'bg-base-100 hover:bg-base-200/40 border-base-300 hover:border-primary/50 shadow-sm'
            }`}
          >
            <div className="space-y-4">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-2xl bg-primary text-primary-content font-bold flex items-center justify-center text-2xl font-nastaliq shadow-sm">
                    ک
                  </span>
                  <ArrowRight className="w-4 h-4 text-base-content/40 group-hover:translate-x-1 transition-transform" />
                  <span className="w-11 h-11 rounded-2xl bg-base-200 text-base-content font-medium flex items-center justify-center text-xl font-devanagari shadow-sm">
                    क
                  </span>
                </div>

                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-base-200 text-base-content/70">
                  Urdu ➔ Hindi
                </span>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-base-content group-hover:text-primary transition-colors">
                  I know Urdu (Nastaliq)
                </h2>
                <div className="text-xs font-semibold text-primary mt-0.5">
                  Goal: Learn the Hindi Devanagari Script
                </div>
              </div>

              <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
                Learn the traditional Devanagari Varnamala, independent vowels, matra signs attached to consonants, articulatory vargas, and Nuqta loan sounds.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-base-200 flex items-center justify-between text-xs sm:text-sm font-bold text-primary">
              <span className="flex items-center gap-2 group-hover:gap-3 transition-all">
                <span>Start Learning Hindi</span>
                <ArrowRight className="w-4 h-4" />
              </span>
              <span className="text-xs text-base-content/50 font-medium">52 Letters</span>
            </div>
          </div>

        </div>

      </section>

      {/* Script Architecture Comparison */}
      <section className="bg-base-100 border border-base-300 rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-extrabold text-base-content tracking-tight">
            How The Two Writing Systems Differ
          </h2>
          <p className="text-xs sm:text-sm text-base-content/65">
            A concise overview of directionality, script type, and structure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
          
          {/* Devanagari Overview */}
          <div className="bg-base-200/40 rounded-2xl p-6 border border-base-300/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-base-300/80">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl font-medium font-devanagari text-primary">क ख ग</span>
                <span className="font-bold text-base text-base-content">Devanagari</span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-base-100 text-base-content/70 border border-base-300">
                Abugida
              </span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-base-content/80">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span><strong>Direction:</strong> Written Left-to-Right (LTR).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span><strong>Type:</strong> Alphasyllabary (Abugida). Every consonant contains an inherent short vowel /a/.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span><strong>Top Hanging Line (Shirorekha):</strong> Horizontal line at the top from which glyphs hang.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span><strong>Vowels:</strong> Standalone vowels (अ, आ, इ) and dependent matra signs (ा, ि, ी) attached to consonants.</span>
              </li>
            </ul>
          </div>

          {/* Nastaliq Overview */}
          <div className="bg-base-200/40 rounded-2xl p-6 border border-base-300/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-base-300/80">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl font-nastaliq text-primary leading-none">نستعلیق</span>
                <span className="font-bold text-base text-base-content">Nastaliq</span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-base-100 text-base-content/70 border border-base-300">
                Abjad
              </span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-base-content/80">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span><strong>Direction:</strong> Written Right-to-Left (RTL) with a flowing vertical cascade.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span><strong>Type:</strong> Consonantal Alphabet (Abjad). Short vowels are diacritics and omitted in everyday text.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span><strong>4 Connected Forms:</strong> Cursive by nature. Letters alter shapes across Isolated, Initial, Medial, and Final positions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span><strong>Non-Connectors:</strong> 9 letters refuse to connect to following letters on the left.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Action Footer Call To Action */}
      <section className="bg-base-200/50 rounded-3xl p-8 sm:p-12 border border-base-300 text-center space-y-5 shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-base-content">
          Ready to Begin?
        </h2>
        <p className="text-xs sm:text-sm text-base-content/70 max-w-md mx-auto">
          Explore the alphabet grid, practice writing on the canvas whiteboard, or study digits and numerals.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <button 
            onClick={onStartLearning}
            className="btn btn-primary px-6 rounded-2xl text-xs sm:text-sm font-bold shadow-md"
          >
            <span>Open Alphabet Grid</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
          <button 
            onClick={onOpenDigits}
            className="btn btn-outline border-base-300 bg-base-100 px-6 rounded-2xl text-xs sm:text-sm font-bold"
          >
            <Hash className="w-4 h-4 mr-1" />
            <span>Study Digits (0–9)</span>
          </button>
        </div>
      </section>

    </div>
  );
}
