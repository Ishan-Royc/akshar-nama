import React, { useState, useMemo } from 'react';
import { 
  ArrowRightLeft, 
  Layers, 
  Search, 
  BookOpen, 
  Info 
} from 'lucide-react';
import { VOCABULARY_BRIDGE } from '../data/alphabetData';

const WORD_CATEGORIES = [
  { id: 'all', label: 'All Words' },
  { id: 'Core', label: 'Everyday Core' },
  { id: 'Nuqta', label: 'Nuqta Sounds' },
  { id: 'Aspiration', label: 'Aspirated Compounds' },
  { id: 'Non-Connectors', label: 'Non-Connector Chains' },
  { id: 'Ligatures', label: 'Cascading Ligatures' },
  { id: 'Poetry', label: 'Literary & Poetry' },
];

export default function WordBridgeSandbox({ currentPath = 'hindi-to-urdu' }) {
  const [selectedWord, setSelectedWord] = useState(VOCABULARY_BRIDGE[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [breakdownMode, setBreakdownMode] = useState(
    currentPath === 'urdu-to-hindi' ? 'hindi' : 'urdu'
  );

  const filteredWords = useMemo(() => {
    return VOCABULARY_BRIDGE.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        item.hindi.toLowerCase().includes(q) ||
        item.urdu.includes(q) ||
        item.translit.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q)
      );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handlePrevWord = () => {
    const currIdx = filteredWords.findIndex(w => w.translit === selectedWord.translit);
    const prevIdx = currIdx > 0 ? currIdx - 1 : filteredWords.length - 1;
    setSelectedWord(filteredWords[prevIdx]);
  };

  const handleNextWord = () => {
    const currIdx = filteredWords.findIndex(w => w.translit === selectedWord.translit);
    const nextIdx = currIdx < filteredWords.length - 1 ? currIdx + 1 : 0;
    setSelectedWord(filteredWords[nextIdx]);
  };

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-4 sm:space-y-8 view-enter">
      
      {/* Editorial Header */}
      <div className="bg-base-100 p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-base-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-base-content">
            Word Bridge: Dual-Script Laboratory
          </h1>
          <p className="text-xs sm:text-sm text-base-content/75 max-w-2xl mt-1 leading-relaxed font-normal">
            Analyze how individual letters fuse into cursive Nastaliq words and decompose Devanagari consonants into matra vowel diacritics and halant conjuncts.
          </p>
        </div>
        <div className="text-xs font-bold px-3 py-1.5 rounded-2xl bg-base-200 text-base-content/70 self-start md:self-center">
          {VOCABULARY_BRIDGE.length} Vocabulary Words
        </div>
      </div>

      {/* Main Two-Column Master-Detail Workspace: On mobile (<lg), active word analysis is prioritized first */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-start">
        
        {/* Right Column / Mobile Top: Active Word In-Depth Analysis Stage */}
        <div className="order-first lg:order-last lg:col-span-8 space-y-4 sm:space-y-6">
          
          {/* Dual Script Hero Card */}
          <div className="bg-base-100 p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-base-300 shadow-sm space-y-4 sm:space-y-6">
            
            {/* Header: Category, IPA & Mobile Quick Word Cycler */}
            <div className="flex items-center justify-between border-b border-base-200 pb-2.5 sm:pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-primary/10 text-primary">
                  Category: {selectedWord.category}
                </span>
                <span className="text-xs font-semibold text-base-content/60">
                  IPA: {selectedWord.ipa}
                </span>
              </div>

              {/* Mobile-only Quick Word Switcher in Header */}
              <div className="flex lg:hidden items-center gap-1.5 ml-auto">
                <button
                  onClick={handlePrevWord}
                  className="btn btn-xs btn-ghost border border-base-300 rounded-lg px-2"
                  title="Previous word"
                >
                  Prev
                </button>
                <span className="text-[11px] font-bold text-base-content/60 px-1">
                  {filteredWords.findIndex(w => w.translit === selectedWord.translit) + 1} / {filteredWords.length}
                </span>
                <button
                  onClick={handleNextWord}
                  className="btn btn-xs btn-primary text-white rounded-lg px-2"
                  title="Next word"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5 items-stretch">
              {/* Hindi Display Box */}
              <div className="bg-base-200/30 p-4 sm:p-6 rounded-2xl border border-base-300 text-center flex flex-col justify-between min-h-[140px] sm:min-h-[190px]">
                <div className="flex items-center justify-between border-b border-base-200/80 pb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-base-content/60">
                    Devanagari (Hindi)
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-base-200 text-base-content/70">
                    Left-to-Right
                  </span>
                </div>
                <div className="h-20 sm:h-28 flex items-center justify-center overflow-visible my-1">
                  <span className="font-devanagari text-3xl sm:text-5xl font-medium text-base-content select-none">
                    {selectedWord.hindi}
                  </span>
                </div>
                <div className="text-xs font-semibold text-base-content/70 pt-1.5 sm:pt-2">
                  Transliteration: <strong className="text-primary font-bold">{selectedWord.translit}</strong>
                </div>
              </div>

              {/* Urdu Display Box */}
              <div className="bg-base-200/30 p-4 sm:p-6 rounded-2xl border border-base-300 text-center flex flex-col justify-between min-h-[140px] sm:min-h-[190px]">
                <div className="flex items-center justify-between border-b border-base-200/80 pb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    Nastaliq (Urdu)
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                    Right-to-Left
                  </span>
                </div>
                <div className="h-20 sm:h-28 flex items-center justify-center overflow-visible my-1">
                  <span className="font-nastaliq text-3xl sm:text-5xl text-primary font-bold leading-normal select-none">
                    {selectedWord.urdu}
                  </span>
                </div>
                <div className="text-xs font-semibold text-base-content/70 pt-1.5 sm:pt-2">
                  Shared Meaning: <strong className="text-base-content font-bold">"{selectedWord.meaning}"</strong>
                </div>
              </div>
            </div>

          </div>

          {/* Letter Components Decomposition */}
          {selectedWord.components && (
            <div className="bg-base-100 p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-base-300 shadow-sm space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-sm sm:text-base text-base-content">
                  Isolated Alphabet Components (مفرد حروف)
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {selectedWord.components.map((comp, idx) => (
                  <div 
                    key={idx}
                    className="p-2.5 sm:p-3.5 rounded-2xl bg-base-200/40 border border-base-300 text-center min-w-[70px] sm:min-w-[80px] flex flex-col justify-between"
                  >
                    <div className="h-10 sm:h-14 flex items-center justify-center overflow-visible">
                      <span className="font-nastaliq text-2xl sm:text-3xl text-primary font-bold leading-none select-none">
                        {comp.ur}
                      </span>
                    </div>
                    <div className="pt-1.5 space-y-0.5">
                      <div className="font-devanagari text-sm sm:text-base font-medium text-base-content">
                        {comp.hi}
                      </div>
                      <div className="text-[10px] font-semibold text-base-content/60">
                        {comp.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step-by-Step Breakdown with View Perspective Toggle */}
          <div className="bg-base-100 p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-base-300 shadow-sm space-y-4 sm:space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-sm sm:text-base text-base-content">
                  {breakdownMode === 'urdu' 
                    ? 'Connected Cursive Breakdown (Right-to-Left)' 
                    : 'Devanagari Matra & Conjunct Assembly (Left-to-Right)'}
                </h3>
              </div>

              {/* Perspective Mode Switcher */}
              <div className="flex items-center gap-1 bg-base-200/70 p-1 rounded-2xl border border-base-300 self-start sm:self-auto">
                <button
                  onClick={() => setBreakdownMode('urdu')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    breakdownMode === 'urdu' 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'text-base-content/70 hover:text-base-content'
                  }`}
                >
                  Urdu Ligatures
                </button>
                <button
                  onClick={() => setBreakdownMode('hindi')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    breakdownMode === 'hindi' 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'text-base-content/70 hover:text-base-content'
                  }`}
                >
                  Hindi Matras
                </button>
              </div>
            </div>

            {/* Urdu Ligature Synthesis View */}
            {breakdownMode === 'urdu' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-3.5">
                {(selectedWord.breakdown || []).map((part, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-2xl bg-base-200/30 border border-base-300/80 space-y-2 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between border-b border-base-200/80 pb-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-primary/10 text-primary">
                        Step #{idx + 1}
                      </span>
                      <span className="font-devanagari font-medium text-sm text-base-content">
                        {part.hi}
                      </span>
                    </div>

                    <div className="text-center py-1.5 flex flex-col items-center justify-center">
                      <div className="h-16 sm:h-20 flex items-center justify-center overflow-visible">
                        <span className="font-nastaliq text-4xl sm:text-5xl text-primary leading-none select-none inline-block pb-2">
                          {part.ur}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-base-content/85 mt-2">
                        {part.sound}
                      </div>
                    </div>

                    <p className="text-[11px] text-base-content/75 leading-relaxed font-normal pt-1">
                      {part.note}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Hindi Devanagari Matra & Conjunct Assembly View */}
            {breakdownMode === 'hindi' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-3.5">
                {(selectedWord.hindiBreakdown || []).map((part, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-2xl bg-base-200/30 border border-base-300/80 space-y-2 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between border-b border-base-200/80 pb-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-primary/10 text-primary">
                        Element #{idx + 1}
                      </span>
                      <span className="text-[11px] font-bold text-base-content/70">
                        {part.matra}
                      </span>
                    </div>

                    <div className="text-center py-1.5 flex flex-col items-center justify-center">
                      <div className="h-16 sm:h-20 flex items-center justify-center overflow-visible">
                        <span className="font-devanagari text-4xl font-medium text-primary select-none">
                          {part.segment}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-base-content/85 mt-2">
                        {part.formula} ({part.sound})
                      </div>
                    </div>

                    <p className="text-[11px] text-base-content/75 leading-relaxed font-normal pt-1">
                      {part.note}
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Linguistic Rule Callout */}
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-base-200/40 border border-base-300 space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
              <Info className="w-4 h-4" />
              <span>Orthographic Synthesis Rule</span>
            </div>
            <p className="text-xs sm:text-sm text-base-content/85 leading-relaxed font-normal">
              {selectedWord.rule}
            </p>
          </div>

        </div>

        {/* Left Column / Mobile Bottom: Word Selector List with Search, Filters & Insights */}
        <div className="order-last lg:order-first lg:col-span-4 lg:sticky lg:top-6 space-y-4 w-full">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search words (e.g. 'Dosti', 'पानी')..."
              className="input input-sm sm:input-md input-bordered w-full pl-10 pr-3 rounded-2xl bg-base-100 border-base-300 text-xs sm:text-sm"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {WORD_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-base-200/70 hover:bg-base-200 text-base-content/70 hover:text-base-content border border-base-300/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Word Cards List */}
          <div className="space-y-2 max-h-[320px] sm:max-h-[420px] overflow-y-auto pr-1 no-scrollbar">
            {filteredWords.map((word) => {
              const isSelected = selectedWord.translit === word.translit;
              return (
                <div
                  key={word.translit}
                  onClick={() => {
                    setSelectedWord(word);
                    // On mobile, smoothly scroll to top of dual script hero card
                    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }
                  }}
                  className={`p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-primary/10 border-primary shadow-sm ring-1 ring-primary/20'
                      : 'bg-base-100 hover:bg-base-200/50 border-base-300/80 text-base-content'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-devanagari font-medium text-base text-base-content">
                        {word.hindi}
                      </span>
                      <span className="text-base-content/30">•</span>
                      <span className="font-bold text-xs text-primary">
                        {word.translit}
                      </span>
                    </div>
                    <div className="text-[11px] text-base-content/60 truncate">
                      "{word.meaning}"
                    </div>
                  </div>

                  <span className="font-nastaliq text-2xl text-base-content leading-normal pl-2 select-none">
                    {word.urdu}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Script Bridging Insights Companion Card */}
          <div className="bg-base-100 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-base-300 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-base-200 pb-2">
              <span className="text-xs font-bold text-base-content flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-primary" />
                Script Synthesis Key
              </span>
              <span className="text-[11px] font-semibold text-primary px-2 py-0.5 rounded-lg bg-primary/10">
                {filteredWords.length} Words Available
              </span>
            </div>

            <div className="space-y-2 text-xs text-base-content/80">
              <div className="flex items-start gap-2 bg-base-200/40 p-2.5 rounded-xl border border-base-300/60">
                <span className="w-5 h-5 rounded-md bg-primary/15 text-primary font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                <p className="text-[11px] leading-relaxed">
                  <strong>Direction:</strong> Urdu synthesizes Right-to-Left into cursive ligatures, whereas Devanagari builds Left-to-Right with matras.
                </p>
              </div>

              <div className="flex items-start gap-2 bg-base-200/40 p-2.5 rounded-xl border border-base-300/60">
                <span className="w-5 h-5 rounded-md bg-secondary/15 text-secondary font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                <p className="text-[11px] leading-relaxed">
                  <strong>Non-Connectors:</strong> Letters like <span className="font-nastaliq-inline text-sm font-bold text-primary">ا, د, ر, و</span> break the cursive joint, forcing the next letter to restart in isolated/initial form.
                </p>
              </div>

              <div className="flex items-start gap-2 bg-base-200/40 p-2.5 rounded-xl border border-base-300/60">
                <span className="w-5 h-5 rounded-md bg-accent/15 text-accent font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                <p className="text-[11px] leading-relaxed">
                  <strong>Aspirated Sounds:</strong> Devanagari uses dedicated letters (ख, घ, छ, झ...), while Urdu combines consonants with <span className="font-nastaliq-inline text-sm font-bold text-primary">ھ (Do-chashmi He)</span>.
                </p>
              </div>
            </div>

            {/* Quick Word Cycle Navigator */}
            <div className="flex items-center gap-2 pt-1 border-t border-base-200">
              <button
                onClick={handlePrevWord}
                className="btn btn-xs btn-ghost flex-1 rounded-xl text-xs border border-base-300 hover:bg-base-200"
              >
                Previous Word
              </button>
              <button
                onClick={handleNextWord}
                className="btn btn-xs btn-primary flex-1 rounded-xl text-xs text-white"
              >
                Next Word
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
