import React from 'react';
import { 
  Hash, 
  PenTool, 
  BookOpen, 
  ArrowRightLeft, 
  CheckCircle2, 
  Info 
} from 'lucide-react';
import { DIGITS_DATA } from '../data/alphabetData';

export default function DigitsView({ currentPath, onOpenWhiteboard }) {
  const isHindiToUrdu = currentPath === 'hindi-to-urdu';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 view-enter">
      
      {/* Editorial Header */}
      <section className="bg-base-100 p-6 sm:p-8 rounded-3xl border border-base-300 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content">
              {isHindiToUrdu ? 'Urdu Numerals (Eastern Arabic)' : 'Hindi Numerals (Devanagari)'}
            </h1>
            <p className="text-xs sm:text-sm text-base-content/75 max-w-2xl mt-1.5 leading-relaxed font-normal">
              In spoken Hindustani, counting is identical: both Hindi and Urdu speakers say <em>Ek, Do, Teen, Chaar...</em> Explore the distinct visual glyphs for digits 0 through 9 side-by-side with stroke tracing.
            </p>
          </div>
        </div>

        {/* Direction Callout Note */}
        <div className="p-4 rounded-2xl bg-base-200/50 border border-base-300/80 flex items-start gap-3">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-base-content/85 leading-relaxed font-normal">
            <strong className="text-base-content font-bold">Important Direction Rule: </strong>
            Even though Urdu words and sentences flow from <strong>Right to Left</strong>, 
            multi-digit numbers in Urdu (like 1947: ۱۹۴۷) are written from <strong>Left to Right</strong>, exactly like Hindi (१९४७) and English (1947)!
          </div>
        </div>
      </section>

      {/* Digits Grid (10 Cards: 0 through 9) - Sleek, Uncluttered & Compact */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4" aria-label="Hindustani Digits Grid">
        {DIGITS_DATA.map((digit) => {
          const primaryGlyph = isHindiToUrdu ? digit.urduChar : digit.hindiChar;
          const secondaryGlyph = isHindiToUrdu ? digit.hindiChar : digit.urduChar;
          const primaryFont = isHindiToUrdu ? 'font-nastaliq' : 'font-devanagari';
          const secondaryFont = isHindiToUrdu ? 'font-devanagari' : 'font-nastaliq';

          return (
            <div
              key={digit.id}
              className="bg-base-100 rounded-2xl p-4 sm:p-5 border border-base-300 hover:border-primary/50 shadow-sm transition-all duration-150 flex flex-col justify-between space-y-3 group"
            >
              {/* Card Header: Value & Spoken Roman Name */}
              <div className="flex items-center justify-between border-b border-base-200/70 pb-2">
                <span className="w-7 h-7 rounded-lg bg-base-200 text-base-content/80 font-bold text-xs flex items-center justify-center">
                  #{digit.digitValue}
                </span>
                <span className="text-[11px] font-bold text-primary">
                  {digit.romanTranslit}
                </span>
              </div>

              {/* Center: Primary Large Glyph with Counterpart */}
              <div className="text-center py-1 space-y-1">
                <div className="h-14 sm:h-16 flex items-center justify-center overflow-visible">
                  <span className={`${primaryFont} ${
                    isHindiToUrdu 
                      ? 'text-4xl sm:text-5xl font-bold leading-normal' 
                      : 'text-3xl sm:text-4xl font-medium'
                  } text-primary select-none`}>
                    {primaryGlyph}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-base-content/70">
                  <span className="text-base-content/40 font-medium">Equiv:</span>
                  <span className={`${secondaryFont} ${
                    !isHindiToUrdu 
                      ? 'text-2xl sm:text-3xl text-primary font-bold leading-none inline-block pb-[0.9rem]' 
                      : 'text-xl font-medium text-base-content'
                  } select-none`}
                  style={!isHindiToUrdu ? { paddingBottom: '0.9rem' } : undefined}>
                    {secondaryGlyph}
                  </span>
                </div>
              </div>

              {/* Spoken Word (Hindi & Urdu Script) */}
              <div className="pt-1.5 text-center text-base-content/75 flex items-center justify-center gap-2">
                <span className="font-devanagari font-medium text-[1rem] leading-none text-base-content">{digit.hindiName}</span>
                <span className="text-base-content/30 text-xs">•</span>
                <span className="font-nastaliq text-base font-bold text-primary inline-block pb-[0.7rem] leading-none" style={{ paddingBottom: '0.7rem' }}>{digit.urduName}</span>
              </div>

              {/* Whiteboard Practice Button */}
              <button
                onClick={() => onOpenWhiteboard(digit)}
                className="w-full btn btn-xs btn-outline border-base-300 hover:border-primary hover:bg-primary/10 hover:text-primary rounded-xl gap-1.5 font-semibold text-xs mt-0.5"
                title="Practice tracing this numeral on the whiteboard"
              >
                <PenTool className="w-3 h-3" />
                <span>Trace</span>
              </button>
            </div>
          );
        })}
      </section>

      {/* Comparison Reference Table */}
      <section className="bg-base-100 rounded-3xl border border-base-300 overflow-hidden shadow-sm">
        <div className="p-5 sm:p-6 border-b border-base-300 bg-base-200/30 flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-primary" />
          <div>
            <h2 className="text-base font-bold text-base-content">Complete Digits Quick Reference</h2>
            <p className="text-xs text-base-content/60">Western, Devanagari, and Eastern Arabic numeral equivalents</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-xs sm:text-sm">
            <thead>
              <tr className="bg-base-200/60 text-base-content/75 font-bold border-b border-base-300">
                <th className="py-3 px-4 w-14 sm:w-16">Value</th>
                <th className="py-3 px-4 w-28 sm:w-32">Devanagari (Hindi)</th>
                <th className="py-3 px-4 w-32 sm:w-36">Eastern Arabic (Urdu)</th>
                <th className="py-3 px-4 min-w-[290px] lg:min-w-[340px] w-[38%]">Shared Spoken Name</th>
                <th className="py-3 px-4 min-w-[220px] w-[35%]">Visual Shape Comparison</th>
              </tr>
            </thead>
            <tbody>
              {DIGITS_DATA.map((d) => (
                <tr key={d.id} className="hover:bg-base-200/40">
                  <td className="font-bold text-primary py-3.5 px-4">{d.digitValue}</td>
                  <td className="font-devanagari font-medium text-2xl py-3.5 px-4">{d.hindiChar}</td>
                  <td className="font-nastaliq text-[2rem] pt-3 pb-[1.7rem] px-4 text-primary leading-normal" style={{ paddingBottom: '1.7rem' }}>{d.urduChar}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-semibold text-sm sm:text-base text-base-content">{d.sampleWords.roman}</span>
                    <span className="text-base-content/60 ml-2 inline-flex items-center gap-1.5 whitespace-nowrap align-middle">
                      <span className="text-xs sm:text-sm text-base-content/50">(</span>
                      <span className="font-devanagari font-medium text-[1rem] text-base-content">{d.hindiName}</span>
                      <span className="text-xs sm:text-sm text-base-content/40">/</span>
                      <span className="font-nastaliq text-base sm:text-lg font-bold text-primary inline-block -translate-y-0.5 leading-none">{d.urduName}</span>
                      <span className="text-xs sm:text-sm text-base-content/50">)</span>
                    </span>
                  </td>
                  <td className="text-xs text-base-content/75 py-3.5 px-4 leading-relaxed">{d.linguisticNotes.rule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
