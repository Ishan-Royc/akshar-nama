import React, { useState, useEffect } from 'react';
import { 
  X, 
  PenTool, 
  Compass, 
  ChevronLeft, 
  ChevronRight, 
  Info, 
  Check, 
  ArrowRightLeft,
  AlertCircle
} from 'lucide-react';

export default function DetailedLetterModal({
  letter,
  allLetters,
  currentPath,
  onClose,
  onSelectLetter,
  onOpenWhiteboard,
}) {
  const [copiedKey, setCopiedKey] = useState(null);

  // Keyboard navigation: Left/Right to cycle, Escape to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [letter, allLetters]);

  const currentIndex = allLetters.findIndex((l) => l.id === letter.id);
  const totalLetters = allLetters.length;

  const goToPrev = () => {
    const prevIdx = (currentIndex - 1 + totalLetters) % totalLetters;
    onSelectLetter(allLetters[prevIdx]);
  };

  const goToNext = () => {
    const nextIdx = (currentIndex + 1) % totalLetters;
    onSelectLetter(allLetters[nextIdx]);
  };

  const isHindiToUrdu = currentPath === 'hindi-to-urdu';
  const targetScript = isHindiToUrdu ? 'Urdu (Nastaliq)' : 'Hindi (Devanagari)';
  const rootScript = isHindiToUrdu ? 'Hindi (Devanagari)' : 'Urdu (Nastaliq)';

  const copyChar = (text, key) => {
    if (!text || text === '—') return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-3xl bg-base-100 border border-base-300 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto animate-in zoom-in-95 duration-150">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-base-300 bg-base-200/50">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-primary/15 text-primary">
              {letter.romanTranslit}
            </span>
            <span className="text-xs font-semibold text-base-content/60">
              IPA: {letter.ipa}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-base-200 text-base-content/75 font-medium">
              {letter.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            <button
              onClick={goToPrev}
              className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-base-200 text-base-content/70"
              title="Previous letter (Left Arrow)"
              aria-label="Previous letter"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-base-200 text-base-content/70"
              title="Next letter (Right Arrow)"
              aria-label="Next letter"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-base-200 text-base-content/70 ml-1"
              title="Close modal (Esc)"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Main Dual Script Typography Showcase - Decoupled with zero overlap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-base-200/40 p-4 sm:p-5 rounded-3xl border border-base-300">
            
            {/* Target Script Display */}
            <div className="flex flex-col items-center justify-between p-4 sm:p-5 bg-base-100 rounded-2xl border border-base-300 shadow-sm space-y-3">
              <div className="w-full flex items-center justify-between border-b border-base-200/80 pb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  Target: {targetScript}
                </span>
                <span className="text-[10px] text-base-content/50 font-semibold">
                  {isHindiToUrdu ? `Abjad #${letter.abjadOrder || '-'}` : `Varnamala #${letter.varnamalaOrder || '-'}`}
                </span>
              </div>
              
              <div className="h-28 sm:h-32 flex items-center justify-center my-1 overflow-visible">
                <span 
                  onClick={() => copyChar(isHindiToUrdu ? letter.urduChar : letter.hindiChar)}
                  className={`${
                    isHindiToUrdu ? 'font-nastaliq text-6xl sm:text-7xl leading-[1.6]' : 'font-devanagari text-6xl sm:text-7xl font-medium'
                  } text-base-content hover:text-primary transition-colors cursor-pointer select-none`}
                  title="Click to copy character"
                >
                  {isHindiToUrdu ? letter.urduChar : letter.hindiChar}
                </span>
              </div>

              {/* Decoupled Name Display */}
              <div className="w-full text-center space-y-0.5 pt-1">
                <div className="text-xs font-bold text-base-content">
                  {isHindiToUrdu ? letter.urduNameTranslit : letter.hindiNameTranslit}
                </div>
                <div className={`${isHindiToUrdu ? 'font-nastaliq text-xl sm:text-2xl text-primary' : 'font-devanagari text-sm font-medium text-base-content/75'}`}>
                  {isHindiToUrdu ? letter.urduName : letter.hindiName}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => copyChar(isHindiToUrdu ? letter.urduChar : letter.hindiChar, 'target')}
                  className="btn btn-xs btn-outline border-base-300 rounded-xl gap-1 text-xs"
                >
                  {copiedKey === 'target' ? <Check className="w-3.5 h-3.5 text-success" /> : 'Copy character'}
                </button>
              </div>
            </div>

            {/* Root Script Reference Display */}
            <div className="flex flex-col items-center justify-between p-4 sm:p-5 bg-base-100 rounded-2xl border border-base-300 shadow-sm space-y-3">
              <div className="w-full flex items-center justify-between border-b border-base-200/80 pb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-base-content/60">
                  Reference: {rootScript}
                </span>
                <span className="text-[10px] text-base-content/50 font-semibold">
                  {isHindiToUrdu ? `Varnamala #${letter.varnamalaOrder || '-'}` : `Abjad #${letter.abjadOrder || '-'}`}
                </span>
              </div>
              
              <div className="h-28 sm:h-32 flex items-center justify-center my-1 overflow-visible">
                {letter.id === 'hamza' && isHindiToUrdu ? (
                  <div className="text-center px-4">
                    <span className="text-sm font-semibold text-base-content/75">
                      No standalone Hindi letter
                    </span>
                    <p className="text-[11px] text-base-content/50 mt-1">
                      Functions as vowel glide (स्वर संधि) in words like आइए, गए
                    </p>
                  </div>
                ) : (
                  <span 
                    onClick={() => copyChar(isHindiToUrdu ? letter.hindiChar : letter.urduChar, 'root')}
                    className={`${
                      isHindiToUrdu ? 'font-devanagari text-6xl sm:text-7xl font-medium' : 'font-nastaliq text-6xl sm:text-7xl leading-[1.6]'
                    } text-base-content/85 hover:text-primary transition-colors cursor-pointer select-none`}
                    title="Click to copy character"
                  >
                    {isHindiToUrdu ? letter.hindiChar : letter.urduChar}
                  </span>
                )}
              </div>

              {/* Decoupled Reference Name */}
              <div className="w-full text-center space-y-0.5 pt-1">
                <div className="text-xs font-bold text-base-content">
                  {isHindiToUrdu ? letter.hindiNameTranslit : letter.urduNameTranslit}
                </div>
                <div className={`${isHindiToUrdu ? 'font-devanagari text-sm font-medium text-base-content/75' : 'font-nastaliq text-xl sm:text-2xl text-primary'}`}>
                  {isHindiToUrdu ? letter.hindiName : letter.urduName}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                {letter.id !== 'hamza' && (
                  <button
                    onClick={() => copyChar(isHindiToUrdu ? letter.hindiChar : letter.urduChar, 'root')}
                    className="btn btn-xs btn-outline border-base-300 rounded-xl gap-1 text-xs"
                  >
                    {copiedKey === 'root' ? <Check className="w-3.5 h-3.5 text-success" /> : 'Copy character'}
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* URDU POSITIONAL FORMS (Tatweel connected shapes) */}
          {letter.urduForms && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-base-content">
                    Urdu Positional Forms (اشکالِ حروف)
                  </h3>
                  <div className="tooltip" data-tip="Urdu is cursive: letters alter shapes depending on position. Non-connectors do not attach to the left.">
                    <Info className="w-4 h-4 text-base-content/50 cursor-pointer" />
                  </div>
                </div>

                {letter.isConnector ? (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-success/15 text-success">
                    Connector (All 4 forms join)
                  </span>
                ) : (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-warning/15 text-warning-content">
                    Non-Connector (Breaks cursive chain on left)
                  </span>
                )}
              </div>

              {/* 4 Forms Grid - Spacious cards with dedicated labels */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'isolated', label: 'Isolated', urduLabel: 'مفرد', char: letter.urduForms.isolated, desc: 'Standalone glyph', colorClass: 'text-base-content' },
                  { id: 'initial', label: 'Initial', urduLabel: 'ابتدائی', char: letter.urduForms.initial, desc: letter.isConnector ? 'Connects left' : 'Does not join left', colorClass: 'text-primary' },
                  { id: 'medial', label: 'Medial', urduLabel: 'درمیانی', char: letter.urduForms.medial, desc: letter.isConnector ? 'Connects both' : 'Joins right only', colorClass: 'text-secondary' },
                  { id: 'final', label: 'Final', urduLabel: 'آخری', char: letter.urduForms.final, desc: 'Closes word', colorClass: 'text-accent' },
                ].map((form) => (
                  <div key={form.id} className="bg-base-200/40 p-3.5 rounded-2xl border border-base-300 text-center flex flex-col justify-between">
                    <div className="border-b border-base-300/60 pb-1.5 mb-1 flex items-center justify-between px-1">
                      <span className="text-[11px] font-bold text-base-content">{form.label}</span>
                      <span className="font-nastaliq text-sm sm:text-base text-base-content/75 leading-none">{form.urduLabel}</span>
                    </div>

                    <div className="h-20 sm:h-24 flex items-center justify-center overflow-visible my-1">
                      <span className={`font-nastaliq text-5xl sm:text-6xl ${form.colorClass} leading-[1.6]`}>
                        {form.char}
                      </span>
                    </div>

                    <div className="text-[10px] text-base-content/55 pt-1">
                      {form.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LINGUISTIC NOTES & CONTEXT */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm sm:text-base text-base-content flex items-center gap-2">
              <Compass className="w-4 h-4 text-primary" />
              <span>Linguistic Analysis & Orthographic Rules</span>
            </h3>

            <div className="bg-base-200/40 p-5 rounded-2xl border border-base-300 space-y-3 text-xs sm:text-sm">
              <p className="text-base-content font-medium">
                {letter.linguisticNotes?.summary}
              </p>
              
              <p className="text-base-content/75 leading-relaxed">
                {letter.linguisticNotes?.rule}
              </p>

              {letter.linguisticNotes?.aspirationInfo && (
                <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-primary font-semibold text-xs flex items-start gap-2">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{letter.linguisticNotes.aspirationInfo}</span>
                </div>
              )}

              {letter.linguisticNotes?.nuqtaInfo && (
                <div className="p-3 bg-secondary/10 rounded-xl border border-secondary/20 text-secondary font-semibold text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{letter.linguisticNotes.nuqtaInfo}</span>
                </div>
              )}
            </div>
          </div>

          {/* SAMPLE WORD IN BOTH SCRIPTS - Clean decoupled cards */}
          {letter.sampleWords && (
            <div className="p-5 rounded-2xl bg-base-200/40 border border-base-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-base-content/60">
                  Shared Hindustani Vocabulary Example
                </span>
                <span className="text-xs font-semibold text-base-content/75">
                  "{letter.sampleWords.roman}" — {letter.sampleWords.meaning}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Hindi Card */}
                <div className="p-3.5 rounded-xl bg-base-100 border border-base-300">
                  <div className="text-[10px] font-bold text-base-content/50 uppercase">Hindi</div>
                  <div className="font-devanagari text-2xl font-medium text-base-content pt-0.5">{letter.sampleWords.hindi}</div>
                </div>

                {/* Urdu Card */}
                <div className="p-3.5 rounded-xl bg-base-100 border border-base-300">
                  <div className="text-[10px] font-bold text-primary uppercase">Urdu</div>
                  <div className="font-nastaliq text-4xl text-primary leading-normal py-1">{letter.sampleWords.urdu}</div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Actions */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-t border-base-300 bg-base-200/50">
          <div className="text-xs text-base-content/65 hidden sm:block max-w-sm truncate">
            {letter.strokeOrderHint}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={() => {
                onOpenWhiteboard(letter);
                onClose();
              }}
              className="btn btn-primary btn-sm rounded-xl gap-2 font-bold shadow-sm"
            >
              <PenTool className="w-4 h-4" />
              <span>Practice on Whiteboard</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
