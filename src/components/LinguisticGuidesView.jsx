import React, { useState } from 'react';
import { 
  BookOpen, 
  Wind, 
  Dot, 
  Layers, 
  PenTool, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Info,
  CheckCircle2,
  Waves,
  Link2,
  Split,
  Maximize2
} from 'lucide-react';
import { 
  ASPIRATED_COMPOUNDS, 
  NUQTA_RULES, 
  HOMOPHONE_SETS, 
  VOWEL_SYSTEM 
} from '../data/alphabetData';

// 9 Comprehensive Orthographic Bridge Lessons (No underlying subtitle clutter)
const LESSONS = [
  {
    id: 'aspiration',
    number: '01',
    icon: Wind,
    title: 'Aspiration & Do-Chashmī He',
    category: 'Consonants',
    badge: '11 Aspirate Ligatures',
    summary: 'How Urdu combines base consonants with Do-chashmī He (ھ) to create the Sanskrit Mahaprana aspirated sounds (ख, घ, छ, झ...).',
  },
  {
    id: 'nuqta',
    number: '02',
    icon: Dot,
    title: 'The Nuqta Loan System',
    category: 'Phonology',
    badge: 'Perso-Arabic Loan Sounds',
    summary: 'Why Persian, Arabic, and Turkic loanwords receive a Nuqta dot in Devanagari (क़, ख़, ग़, ज़, फ़) while Urdu has dedicated letters.',
  },
  {
    id: 'homophones',
    number: '03',
    icon: Layers,
    title: 'Urdu Homophone Families',
    category: 'Orthography',
    badge: 'Etymological Spellings',
    summary: 'Why one Hindi sound maps to multiple Urdu letters (स ➔ س, ص, ث | ज़ ➔ ز, ذ, ض, ظ | त ➔ ت, ط) due to classical Arabic roots.',
  },
  {
    id: 'vowels',
    number: '04',
    icon: BookOpen,
    title: 'Vowel Bridge & Harakat',
    category: 'Vowels',
    badge: 'Matras vs Diacritics',
    summary: 'How Devanagari standalone vowels and matras correspond to Urdu vowel carriers (Alif, Vao, Ye) and Harakat diacritics.',
  },
  {
    id: 'non-connectors',
    number: '05',
    icon: Split,
    title: 'The 9 Non-Connector Letters',
    category: 'Cursive Mechanics',
    badge: 'Cursive Break Rules',
    summary: 'The 9 stubborn Urdu letters (ا, د, ڈ, ذ, ر, ڑ, ز, ژ, و) that refuse to connect to following letters on the left.',
  },
  {
    id: 'nasalization',
    number: '06',
    icon: Waves,
    title: 'Nasalization & Nun Ghunna',
    category: 'Phonology',
    badge: 'Anusvara vs Chandrabindu',
    summary: 'How Hindi distinguishes consonant nasal Anusvara (ं) from vowel nasal Chandrabindu (ँ), and how Urdu represents them with ں.',
  },
  {
    id: 'gemination',
    number: '07',
    icon: Link2,
    title: 'Gemination & Half-Letters',
    category: 'Orthography',
    badge: 'Conjuncts vs Tashdeed',
    summary: 'How Devanagari cuts letters in half for doubled consonants (पत्ता, बच्चा) while Urdu writes Tashdeed (ّ) over a single consonant.',
  },
  {
    id: 'silent-he',
    number: '08',
    icon: BookOpen,
    title: 'Word-Final Silent Vowels',
    category: 'Morphology',
    badge: 'Final Long /aː/ Rule',
    summary: 'Why thousands of everyday Urdu masculine nouns end in silent Choti He (کمرہ, راستہ, بچّہ) while Hindi spells them with Aa ki Matra (ा).',
  },
  {
    id: 'hamza',
    number: '09',
    icon: Maximize2,
    title: 'Hamza & Vowel Glides',
    category: 'Hiatus Mechanics',
    badge: 'Vocalic Hiatus (آؤ, گئے)',
    summary: 'How Hindi writes standalone independent vowels for consecutive sounds (आओ, गए, कोई), whereas Urdu places a Hamza (ء) on a tooth.',
  },
];

// Rich Nasalization Word Examples Data
const NASALIZATION_EXAMPLES = [
  { hi: 'माँ', ur: 'ماں', tr: 'Maa', type: 'Final Vowel Nasal (ँ)', rule: 'End of word: Written with dotless Nun Ghunna (ں)', m: 'Mother' },
  { hi: 'यहाँ', ur: 'یہاں', tr: 'Yahan', type: 'Final Vowel Nasal (ँ)', rule: 'End of word: Written with dotless Nun Ghunna (ں)', m: 'Here' },
  { hi: 'वहाँ', ur: 'وہاں', tr: 'Wahan', type: 'Final Vowel Nasal (ँ)', rule: 'End of word: Written with dotless Nun Ghunna (ں)', m: 'There' },
  { hi: 'नहीं', ur: 'نہیں', tr: 'Nahin', type: 'Final Vowel Nasal (ँ)', rule: 'End of word: Written with dotless Nun Ghunna (ں)', m: 'No / Not' },
  { hi: 'लड़कियाँ', ur: 'لڑکیاں', tr: 'Larkiyan', type: 'Plural Feminine (ँ)', rule: 'Plural suffix -aan written with final Nun Ghunna', m: 'Girls' },
  { hi: 'किताबें', ur: 'کتابیں', tr: 'Kitabein', type: 'Plural Feminine (ँ)', rule: 'Plural suffix -ein written with final Nun Ghunna', m: 'Books' },
  { hi: 'चाँद', ur: 'چاند', tr: 'Chaand', type: 'Medial Vowel Nasal (ँ)', rule: 'Inside word: Written with dotted Nun (ن) before Dal', m: 'Moon' },
  { hi: 'आँख', ur: 'آنکھ', tr: 'Aankh', type: 'Medial Vowel Nasal (ँ)', rule: 'Inside word: Dotted Nun (ن) before aspirated Kha', m: 'Eye' },
  { hi: 'गाँव', ur: 'گاؤں', tr: 'Gaaon', type: 'Medial Hiatus Nasal', rule: 'Vao with Hamza followed by final Nun Ghunna (ں)', m: 'Village' },
  { hi: 'साँप', ur: 'سانپ', tr: 'Saanp', type: 'Medial Vowel Nasal (ँ)', rule: 'Inside word: Dotted Nun (ن) before Pe', m: 'Snake' },
  { hi: 'दाँत', ur: 'دانت', tr: 'Daant', type: 'Medial Vowel Nasal (ँ)', rule: 'Inside word: Dotted Nun (ن) before Te', m: 'Tooth' },
  { hi: 'रंग', ur: 'رنگ', tr: 'Rang', type: 'Consonantal Anusvara (ं)', rule: 'Velar nasal stop (ŋ) before Gaf (گ)', m: 'Color' },
  { hi: 'पंखा', ur: 'پنکھا', tr: 'Pankha', type: 'Consonantal Anusvara (ं)', rule: 'Velar nasal stop before aspirated Kha (کھ)', m: 'Fan' },
  { hi: 'जंगल', ur: 'جنگل', tr: 'Jangal', type: 'Consonantal Anusvara (ं)', rule: 'Velar nasal stop before Gaf (گ)', m: 'Forest' },
  { hi: 'पतंग', ur: 'پتنگ', tr: 'Patang', type: 'Consonantal Anusvara (ं)', rule: 'Velar nasal stop before Gaf (گ)', m: 'Kite' },
];

export default function LinguisticGuidesView({ currentPath, onOpenWhiteboard }) {
  const [selectedLessonId, setSelectedLessonId] = useState(null);

  const currentLesson = LESSONS.find(l => l.id === selectedLessonId);
  const currentLessonIndex = LESSONS.findIndex(l => l.id === selectedLessonId);

  const goToPrevLesson = () => {
    if (currentLessonIndex > 0) {
      setSelectedLessonId(LESSONS[currentLessonIndex - 1].id);
    }
  };

  const goToNextLesson = () => {
    if (currentLessonIndex < LESSONS.length - 1) {
      setSelectedLessonId(LESSONS[currentLessonIndex + 1].id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 view-enter">
      
      {/* Editorial Header */}
      <section className="bg-base-100 p-6 sm:p-8 rounded-3xl border border-base-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-base-content">
            Linguistic & Orthographic Guide
          </h1>
          <p className="text-xs sm:text-sm text-base-content/75 max-w-2xl mt-1.5 leading-relaxed font-normal">
            Master the core phonetic, calligraphic, and orthographic principles bridging Hindi Devanagari and Urdu Nastaliq. Select a lesson card below to study comprehensive explanations and word breakdowns.
          </p>
        </div>

        {selectedLessonId && (
          <button
            onClick={() => setSelectedLessonId(null)}
            className="btn btn-sm btn-outline border-base-300 rounded-2xl gap-2 font-semibold self-start md:self-center"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>All Lessons</span>
          </button>
        )}
      </section>

      {/* Main Content: Lesson Overview Cards Hub OR Detailed Lesson View */}
      {!selectedLessonId ? (
        /* LESSON CARDS HUB with Distinct Card Shadow */
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {LESSONS.map((lesson) => {
              const Icon = lesson.icon;
              return (
                <div
                  key={lesson.id}
                  onClick={() => setSelectedLessonId(lesson.id)}
                  className="bg-base-100 hover:bg-base-200/50 border border-base-300/80 hover:border-primary/60 rounded-3xl p-6 transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                        {lesson.number}
                      </span>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-base-200 text-base-content/70">
                        {lesson.badge}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-base-content group-hover:text-primary transition-colors">
                        {lesson.title}
                      </h2>
                    </div>

                    <p className="text-xs text-base-content/75 leading-relaxed font-normal">
                      {lesson.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-base-200/80 flex items-center justify-between text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform">
                    <span>Open Lesson</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        /* EXPANDED DETAILED LESSON VIEW */
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Lesson Header Navigation without underlying titles */}
          <div className="bg-base-100 p-6 sm:p-7 rounded-3xl border border-base-300 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-primary text-white font-extrabold text-sm flex items-center justify-center shadow-sm flex-shrink-0">
                {currentLesson.number}
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-base-content">
                  {currentLesson.title}
                </h2>
                <div className="text-xs font-semibold text-base-content/60">
                  {currentLesson.badge}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={goToPrevLesson}
                disabled={currentLessonIndex === 0}
                className="btn btn-sm btn-outline border-base-300 rounded-xl gap-1 text-xs"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
              <button
                onClick={goToNextLesson}
                disabled={currentLessonIndex === LESSONS.length - 1}
                className="btn btn-sm btn-outline border-base-300 rounded-xl gap-1 text-xs"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ============================================================== */}
          {/* LESSON 1: ASPIRATION & DO-CHASHMI HE                           */}
          {/* ============================================================== */}
          {selectedLessonId === 'aspiration' && (
            <div className="space-y-6">
              <div className="bg-base-100 p-6 sm:p-8 rounded-3xl border border-base-300 shadow-sm space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-base-content flex items-center gap-2">
                  <Wind className="w-5 h-5 text-primary" />
                  <span>The Mechanics of Aspiration in Hindustani</span>
                </h3>
                <p className="text-sm sm:text-base text-base-content/85 leading-relaxed font-normal">
                  In Sanskrit and Hindi, aspirated consonants (Mahaprana / महाप्राण) possess dedicated individual alphabet characters: <strong className="font-devanagari font-medium text-primary">ख, घ, छ, झ, ठ, ढ, थ, ध, फ, भ</strong>. 
                  In Urdu, there are no standalone individual letters for these sounds. Instead, Urdu builds all aspirated sounds systematically by coupling base consonants with a specialized breath modifier called <strong className="font-nastaliq-inline text-xl px-1 text-primary">دو چشمی ہے (Do-chashmī He / ھ)</strong>.
                </p>
                
                <div className="p-4 sm:p-5 rounded-2xl bg-base-200/50 border border-base-300/80 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
                  <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-base-content font-bold">The Golden Rule: </strong>
                    Urdu has two separate letters for 'H': <strong>چھوٹی ہے (Chhoṭī He: ہ)</strong> and <strong>دو چشمی ہے (Do-chashmī He: ھ)</strong>. 
                    Chhoti He (ہ) is NEVER used for consonant aspiration! Whenever you add a puff of breath to a consonant, you MUST attach Do-chashmi He (e.g. ک + ھ = کھ).
                  </div>
                </div>
              </div>

              {/* 11 Aspirate Compounds Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {ASPIRATED_COMPOUNDS.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-base-100 p-5 rounded-3xl border border-base-300 shadow-sm space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-primary/10 text-primary">
                        {item.translit} ({item.ipa})
                      </span>

                      {/* Visual Equation */}
                      <div className="flex items-center justify-center gap-3 bg-base-200/40 p-4 rounded-2xl border border-base-300/60">
                        <div className="text-center">
                          <div className="font-nastaliq text-2xl text-base-content/75 leading-none">{item.baseUrdu}</div>
                          <div className="font-devanagari text-xs text-base-content/50">{item.baseHindi}</div>
                        </div>
                        <span className="text-base-content/40 font-bold">+</span>
                        <div className="text-center">
                          <div className="font-nastaliq text-2xl text-primary leading-none">ھ</div>
                          <div className="text-[10px] text-base-content/50">breath</div>
                        </div>
                        <span className="text-base-content/40 font-bold">=</span>
                        <div className="text-center">
                          <div className="font-nastaliq text-4xl text-primary font-bold leading-none">{item.urduChar}</div>
                          <div className="font-devanagari text-lg text-base-content font-medium">{item.hindiChar}</div>
                        </div>
                      </div>

                      <p className="text-xs text-base-content/75 leading-relaxed font-normal">
                        {item.notes}
                      </p>
                    </div>

                    {/* Example Word */}
                    <div className="pt-3 border-t border-base-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-devanagari font-medium">{item.example.hindi}</span>
                        <span className="text-base-content/30 mx-1.5">•</span>
                        <span className="font-nastaliq-inline text-lg text-primary leading-none">{item.example.urdu}</span>
                      </div>
                      <span className="text-xs text-base-content/65 font-medium">
                        {item.example.meaning}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* LESSON 2: NUQTA SYSTEM & PERSO-ARABIC LOAN SOUNDS              */}
          {/* ============================================================== */}
          {selectedLessonId === 'nuqta' && (
            <div className="space-y-6">
              <div className="bg-base-100 p-6 sm:p-8 rounded-3xl border border-base-300 shadow-sm space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-base-content flex items-center gap-2">
                  <Dot className="w-6 h-6 text-primary flex-shrink-0" />
                  <span>The Nuqta System: Transcribing Foreign Phonemes into Hindi</span>
                </h3>
                <p className="text-sm sm:text-base text-base-content/85 leading-relaxed font-normal">
                  When Persian, Arabic, and Turkic words entered Hindustani, Sanskrit-derived Devanagari lacked native letters for sounds like <span className="font-bold">/q/, /x/, /ɣ/, /z/, /f/</span>. Grammarians resolved this by placing a dot called <strong>Nuqta (नुक्ता / نقطہ)</strong> beneath the closest native consonant.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {NUQTA_RULES.map((rule) => (
                  <div 
                    key={rule.id}
                    className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-devanagari font-medium text-2xl shadow-sm">
                          {rule.hindiChar}
                        </div>
                        <div>
                          <div className="font-bold text-base text-base-content">
                            {rule.soundName}
                          </div>
                          <div className="text-xs font-semibold text-base-content/60">
                            {rule.translit} ({rule.ipa})
                          </div>
                        </div>
                      </div>

                      <span className="font-nastaliq text-3xl text-primary leading-tight">
                        {rule.urduChar}
                      </span>
                    </div>

                    {/* Base vs Nuqta Transformation */}
                    <div className="flex items-center gap-2 bg-base-200/50 p-3 rounded-2xl text-xs font-medium">
                      <span className="font-devanagari text-base font-medium text-base-content/70">
                        {rule.baseHindi}
                      </span>
                      <span className="text-base-content/40">+ Nuqta (़) ➔</span>
                      <span className="font-devanagari text-lg font-medium text-primary">
                        {rule.hindiChar}
                      </span>
                      <span className="ml-auto font-nastaliq-inline text-xl text-primary leading-tight">
                        {rule.urduChar}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-base-content/80 leading-relaxed font-normal">
                      {rule.explanation}
                    </p>

                    {/* Word Example */}
                    <div className="pt-3 border-t border-base-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-devanagari font-medium">{rule.example.hindi}</span>
                        <span className="text-base-content/30">•</span>
                        <span className="font-nastaliq-inline text-xl text-primary leading-tight">{rule.example.urdu}</span>
                      </div>
                      <span className="text-xs text-base-content/65 font-medium">
                        "{rule.example.meaning}"
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* LESSON 3: URDU HOMOPHONE FAMILIES                              */}
          {/* ============================================================== */}
          {selectedLessonId === 'homophones' && (
            <div className="space-y-6">
              <div className="bg-base-100 p-6 sm:p-8 rounded-3xl border border-base-300 shadow-sm space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-base-content flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>The Homophone Sets: Why Urdu Has Multiple Letters for One Sound</span>
                </h3>
                <p className="text-sm sm:text-base text-base-content/85 leading-relaxed font-normal">
                  In classical Arabic, letters like <span className="font-nastaliq-inline text-base">س</span> and <span className="font-nastaliq-inline text-base">ص</span>, or <span className="font-nastaliq-inline text-base">ز</span> and <span className="font-nastaliq-inline text-base">ض</span> had distinct guttural and emphatic articulations. When Hindustani adopted these words, the sounds merged phonetically into standard Indian phonology. However, <strong>Urdu orthography preserves the classical historical spelling</strong>.
                </p>
              </div>

              <div className="space-y-5">
                {HOMOPHONE_SETS.map((set, idx) => (
                  <div 
                    key={idx}
                    className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm space-y-4"
                  >
                    <div className="flex items-center gap-3 border-b border-base-200/80 pb-3">
                      <span className="w-12 h-12 rounded-2xl bg-primary/10 text-primary font-devanagari font-medium text-2xl flex items-center justify-center shadow-sm">
                        {set.hindiLetter}
                      </span>
                      <div>
                        <h4 className="font-bold text-base sm:text-lg text-base-content">
                          The {set.sound} Family
                        </h4>
                        <p className="text-xs text-base-content/65">
                          All pronounced identically as '{set.hindiLetter}' in everyday Hindustani speech
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {set.urduLetters.map((ul, uIdx) => (
                        <div 
                          key={uIdx}
                          className="bg-base-200/30 p-5 rounded-2xl border border-base-300 hover:border-primary/50 transition-all space-y-3.5 flex flex-col justify-between shadow-sm"
                        >
                          {/* Top Header: Role & Title */}
                          <div className="flex items-center justify-between border-b border-base-200/80 pb-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                              {ul.role || 'Urdu Variant'}
                            </span>
                            <span className="text-xs font-bold text-base-content/75">
                              {ul.name}
                            </span>
                          </div>

                          {/* Large High-Contrast Glyph Canvas Box */}
                          <div className="text-center py-2 bg-base-100 rounded-2xl border border-base-200/90 shadow-inner">
                            <span className="font-nastaliq text-5xl sm:text-6xl text-primary leading-tight select-none">
                              {ul.char}
                            </span>
                          </div>

                          {/* Etymology & Usage Guidance */}
                          <div className="space-y-1">
                            <div className="text-[11px] font-bold text-primary/80">
                              {ul.origin}
                            </div>
                            <p className="text-xs text-base-content/80 leading-relaxed font-normal">
                              {ul.note}
                            </p>
                          </div>

                          {/* Minimal Pair Examples */}
                          {ul.examples && ul.examples.length > 0 && (
                            <div className="pt-2 border-t border-base-200/80 space-y-1.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-base-content/50">
                                Common Vocabulary:
                              </span>
                              <div className="space-y-1">
                                {ul.examples.map((ex, eIdx) => (
                                  <div key={eIdx} className="flex items-center justify-between text-xs bg-base-100 px-2.5 py-1.5 rounded-xl border border-base-200">
                                    <span className="font-nastaliq text-base text-primary leading-none">{ex.ur}</span>
                                    <span className="font-devanagari font-medium text-base-content">{ex.hi}</span>
                                    <span className="text-[11px] text-base-content/60">{ex.tr} ("{ex.meaning}")</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-2xl bg-base-200/40 text-xs sm:text-sm text-base-content/80 font-normal">
                      <strong className="text-primary font-bold">Rule of Thumb: </strong>
                      {set.rule}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* LESSON 4: VOWELS & MATRAS                                      */}
          {/* ============================================================== */}
          {selectedLessonId === 'vowels' && (
            <div className="space-y-6">
              <div className="bg-base-100 p-6 sm:p-8 rounded-3xl border border-base-300 shadow-sm space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-base-content flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Vowel Bridge: Abugida Matras vs Abjad Harakat</span>
                </h3>
                <p className="text-sm sm:text-base text-base-content/85 leading-relaxed font-normal">
                  Devanagari writes vowels with dedicated standalone letters (अ, आ, इ...) and matras attached to consonants (ा, ि, ी...). Urdu uses consonantal vowel carriers (<span className="font-nastaliq-inline text-lg px-1">ا, و, ی, ے</span>) combined with short vowel diacritics (<span className="font-nastaliq-inline text-lg px-1">ـَ, ـِ, ـُ</span>) which are usually omitted in everyday printing.
                </p>
              </div>

              {/* Spacious Table with Balanced Font Sizes */}
              <div className="bg-base-100 rounded-3xl border border-base-300 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full text-sm">
                    <thead>
                      <tr className="bg-base-200/70 text-base-content/80 font-bold border-b border-base-300 text-xs sm:text-sm">
                        <th className="py-4 px-5">Sound</th>
                        <th className="py-4 px-5">Hindi Independent</th>
                        <th className="py-4 px-5">Hindi Matra</th>
                        <th className="py-4 px-5">Urdu Representation</th>
                        <th className="py-4 px-5">Urdu Example</th>
                        <th className="py-4 px-5 min-w-[280px]">Linguistic Explanation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-base-200/60">
                      {VOWEL_SYSTEM.map((v, idx) => {
                        let cleanUrduSign = v.urduSign;
                        let signLabel = '';
                        if (v.urduSign.includes('(')) {
                          const parts = v.urduSign.split('(');
                          cleanUrduSign = parts[0].trim();
                          signLabel = parts[1].replace(')', '').trim();
                        }

                        return (
                          <tr key={idx} className="hover:bg-base-200/40 transition-colors">
                            <td className="font-bold text-primary py-4 px-5 whitespace-nowrap">
                              {v.vowelSound}
                            </td>
                            <td className="font-devanagari font-medium text-xl py-4 px-5 text-base-content">
                              {v.hindiIndependent}
                            </td>
                            <td className="font-devanagari text-lg font-medium py-4 px-5 text-base-content/80">
                              {v.hindiMatra}
                            </td>
                            <td className="py-4 px-5">
                              <div className="flex flex-col items-start gap-0.5">
                                <span className="font-nastaliq text-xl text-primary leading-tight">
                                  {cleanUrduSign}
                                </span>
                                {signLabel && (
                                  <span className="text-[11px] font-semibold text-base-content/60">
                                    {signLabel}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="font-nastaliq text-xl text-secondary py-4 px-5 leading-tight">
                              {v.urduExample}
                            </td>
                            <td className="text-xs sm:text-sm text-base-content/85 py-4 px-5 leading-relaxed font-normal">
                              {v.explanation}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* LESSON 5: NON-CONNECTORS                                       */}
          {/* ============================================================== */}
          {selectedLessonId === 'non-connectors' && (
            <div className="space-y-6">
              <div className="bg-base-100 p-6 sm:p-8 rounded-3xl border border-base-300 shadow-sm space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-base-content flex items-center gap-2">
                  <Split className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>The 9 Non-Connector Letters (شرارتی نو)</span>
                </h3>
                <p className="text-sm sm:text-base text-base-content/85 leading-relaxed font-normal">
                  In Urdu cursive script, almost all letters connect both to the right (preceding letter) and to the left (following letter). 
                  However, exactly <strong>9 letters</strong> refuse to connect to the left. When one of these letters occurs, the cursive chain breaks, and the next letter must start in its initial or isolated form.
                </p>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 sm:gap-3.5">
                {[
                  { char: 'ا', name: 'Alif', sound: 'a' },
                  { char: 'د', name: 'Dal', sound: 'd' },
                  { char: 'ڈ', name: 'Ḍal', sound: 'ḍ' },
                  { char: 'ذ', name: 'Zal', sound: 'z' },
                  { char: 'ر', name: 'Re', sound: 'r' },
                  { char: 'ڑ', name: 'Ṛe', sound: 'ṛ' },
                  { char: 'ز', name: 'Ze', sound: 'z' },
                  { char: 'ژ', name: 'Zhe', sound: 'zh' },
                  { char: 'و', name: 'Vao', sound: 'v / o / u' },
                ].map((nc, i) => (
                  <div key={i} className="bg-base-100 p-3.5 sm:p-4 rounded-2xl border border-base-300 text-center shadow-sm flex flex-col justify-between min-h-[140px] sm:min-h-[150px]">
                    <div className="h-16 sm:h-18 flex items-center justify-center overflow-visible my-1">
                      <span className="font-nastaliq text-4xl sm:text-5xl text-primary font-bold leading-none select-none">
                        {nc.char}
                      </span>
                    </div>
                    <div className="pt-1.5 space-y-0.5">
                      <div className="text-xs font-bold text-base-content">{nc.name}</div>
                      <div className="text-[10px] font-semibold text-base-content/60">{nc.sound}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm space-y-4">
                <h4 className="font-bold text-base text-base-content">
                  Real Word Breakdown: "اردو" (Urdu) & "دروازہ" (Darwaza)
                </h4>
                <p className="text-xs sm:text-sm text-base-content/80 leading-relaxed font-normal">
                  Notice why the word <span className="font-nastaliq-inline text-xl font-bold text-primary">اردو</span> (Urdu) is written as three completely detached letters: <span className="font-bold">ا + ر + د + و</span>. All four characters belong to the 9 Non-Connectors! Similarly in <span className="font-nastaliq-inline text-xl font-bold text-primary">دروازہ</span> (Darwaza), <span className="font-bold">د + ر + व + ا</span> never attach to each other.
                </p>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* LESSON 6: NASALIZATION & NUN GHUNNA (EXPANDED WITH EXAMPLES)   */}
          {/* ============================================================== */}
          {selectedLessonId === 'nasalization' && (
            <div className="space-y-6">
              <div className="bg-base-100 p-6 sm:p-8 rounded-3xl border border-base-300 shadow-sm space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-base-content flex items-center gap-2">
                  <Waves className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Nasalization: Anusvara (ं) & Chandrabindu (ँ) vs Nun Ghunna (ں)</span>
                </h3>
                <p className="text-sm sm:text-base text-base-content/85 leading-relaxed font-normal">
                  In Hindi, there is a clear phonetic distinction between:
                </p>
                <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-base-content/80 pl-2">
                  <li><strong>Anusvara (ं):</strong> A true consonantal nasal stop that physically touches the roof of the mouth and assimilates to the following consonant (e.g. रंग - rəŋg, पंखा - pəŋkʰa, जंगल - dʒəŋgəl).</li>
                  <li><strong>Chandrabindu (ँ):</strong> Pure vocalic nasalization where air escapes simultaneously through the nose and mouth during vowel articulation without any tongue contact (e.g. माँ - mɑ̃ː, यहाँ - jəɦɑ̃ː, चाँद - tʃɑ̃ːnd).</li>
                </ul>
              </div>

              {/* Two Core Rules Explained */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm space-y-3">
                  <h4 className="font-bold text-base text-base-content">
                    1. Word-Final Position: Dotless Nun (ں)
                  </h4>
                  <p className="text-xs sm:text-sm text-base-content/80 leading-relaxed font-normal">
                    Whenever nasalization occurs at the end of an Urdu word or suffix, it is written with a dotless Nun called <strong>نُون غُنّہ (Nun Ghunna: ں)</strong>.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-2xl bg-base-200/50 text-center flex flex-col justify-between min-h-[120px]">
                      <div className="font-devanagari text-lg font-medium text-base-content">माँ</div>
                      <div className="h-12 flex items-center justify-center overflow-visible my-0.5">
                        <span className="font-nastaliq text-[1.5rem] text-primary leading-none select-none">ماں</span>
                      </div>
                      <div className="text-[11px] font-semibold text-base-content/65 pt-1">Maa (Mother)</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-base-200/50 text-center flex flex-col justify-between min-h-[120px]">
                      <div className="font-devanagari text-lg font-medium text-base-content">यहाँ</div>
                      <div className="h-12 flex items-center justify-center overflow-visible my-0.5">
                        <span className="font-nastaliq text-[1.5rem] text-primary leading-none select-none">یہاں</span>
                      </div>
                      <div className="text-[11px] font-semibold text-base-content/65 pt-1">Yahan (Here)</div>
                    </div>
                  </div>
                </div>

                <div className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm space-y-3">
                  <h4 className="font-bold text-base text-base-content">
                    2. Medial Position: Dotted Nun (ن)
                  </h4>
                  <p className="text-xs sm:text-sm text-base-content/80 leading-relaxed font-normal">
                    Inside connected words, Urdu cannot omit the dot because a dotless tooth would be unreadable. Therefore, regular dotted Nun (ن) is used inside words for both Chandrabindu and Anusvara.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-2xl bg-base-200/50 text-center flex flex-col justify-between min-h-[120px]">
                      <div className="font-devanagari text-lg font-medium text-base-content">चाँद</div>
                      <div className="h-12 flex items-center justify-center overflow-visible my-0.5">
                        <span className="font-nastaliq text-[1.5rem] text-primary leading-none select-none">چاند</span>
                      </div>
                      <div className="text-[11px] font-semibold text-base-content/65 pt-1">Chaand (Moon)</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-base-200/50 text-center flex flex-col justify-between min-h-[120px]">
                      <div className="font-devanagari text-lg font-medium text-base-content">आँख</div>
                      <div className="h-12 flex items-center justify-center overflow-visible my-0.5">
                        <span className="font-nastaliq text-[1.5rem] text-primary leading-none select-none">آنکھ</span>
                      </div>
                      <div className="text-[11px] font-semibold text-base-content/65 pt-1">Aankh (Eye)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comprehensive Comparative Examples Table */}
              <div className="bg-base-100 rounded-3xl border border-base-300 overflow-hidden shadow-sm space-y-3 p-5 sm:p-6">
                <h4 className="font-bold text-base text-base-content">
                  Extensive Nasalization Word Bank (15 Practice Pairs)
                </h4>
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-base-200/70 text-base-content/80 font-bold border-b border-base-300">
                        <th className="py-3 px-4">Hindi</th>
                        <th className="py-3 px-4">Urdu</th>
                        <th className="py-3 px-4">Pronunciation</th>
                        <th className="py-3 px-4">Nasal Classification</th>
                        <th className="py-3 px-4">Meaning</th>
                        <th className="py-3 px-4 min-w-[200px]">Orthographic Rule</th>
                      </tr>
                    </thead>
                    <tbody>
                      {NASALIZATION_EXAMPLES.map((ex, i) => (
                        <tr key={i} className="hover:bg-base-200/40">
                          <td className="font-devanagari font-medium text-base py-3 px-4">{ex.hi}</td>
                          <td className="font-nastaliq text-[1.5rem] text-primary py-3 px-4 leading-normal">{ex.ur}</td>
                          <td className="font-bold py-3 px-4">{ex.tr}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-lg bg-base-200 text-xs font-semibold">
                              {ex.type}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-base-content/80 font-medium">"{ex.m}"</td>
                          <td className="py-3 px-4 text-xs text-base-content/70">{ex.rule}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* LESSON 7: GEMINATION & TASHDEED                                */}
          {/* ============================================================== */}
          {selectedLessonId === 'gemination' && (
            <div className="space-y-6">
              <div className="bg-base-100 p-6 sm:p-8 rounded-3xl border border-base-300 shadow-sm space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-base-content flex items-center gap-2">
                  <Link2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Gemination (Doubled Consonants): Devanagari Half-Letters vs Urdu Tashdeed</span>
                </h3>
                <p className="text-sm sm:text-base text-base-content/85 leading-relaxed font-normal">
                  In Hindustani, consonant gemination occurs when a consonant sound is held for double duration (e.g. <em>Patta, Bachha, Kutte</em>).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-base-200/40 border border-base-300/80 space-y-2">
                    <div className="font-bold text-sm text-base-content">Hindi: Adha Akshar (आधा अक्षर)</div>
                    <p className="text-xs text-base-content/75 leading-relaxed">
                      Hindi physically truncates the first consonant glyph by dropping its vertical stem: <strong className="font-devanagari font-medium">त् + त = त्त</strong> (पत्ता), <strong className="font-devanagari font-medium">च् + च = च्च</strong> (बच्चा).
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-base-200/40 border border-base-300/80 space-y-2">
                    <div className="font-bold text-sm text-base-content">Urdu: Tashdeed (تشدید / ّ)</div>
                    <p className="text-xs text-base-content/75 leading-relaxed">
                      Urdu writes the consonant letter only ONCE and places a small 'w'-shaped mark called Tashdeed (ّ) directly above it: <strong className="font-nastaliq-inline text-lg text-primary">پتّہ</strong> (Patta), <strong className="font-nastaliq-inline text-lg text-primary">بچّہ</strong> (Bachha).
                    </p>
                  </div>
                </div>
              </div>

              {/* Gemination Practice Examples */}
              <div className="bg-base-100 p-6 sm:p-7 rounded-3xl border border-base-300 shadow-sm space-y-4">
                <h4 className="font-bold text-base text-base-content">
                  Core Gemination Practice Words (Devanagari Half-Letter vs Urdu Tashdeed)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
                  {[
                    { hi: 'पत्ता', ur: 'پتّہ', tr: 'Patta', m: 'Leaf', note: 'त् + त = त्त (تّ)' },
                    { hi: 'बच्चा', ur: 'بچّہ', tr: 'Bachha', m: 'Child', note: 'च् + च = च्च (چّ)' },
                    { hi: 'दिल्ली', ur: 'دِلّی', tr: 'Dilli', m: 'Delhi', note: 'ल् + ल = ल्ल (لّ)' },
                    { hi: 'सच्चा', ur: 'سچّا', tr: 'Sachha', m: 'True', note: 'च् + च = च्च (چّ)' },
                    { hi: 'अब्बा', ur: 'ابّا', tr: 'Abba', m: 'Father', note: 'ब् + ब = ब्ब (بّ)' },
                    { hi: 'हिम्मत', ur: 'ہمّت', tr: 'Himmat', m: 'Courage', note: 'म् + म = म्म (مّ)' },
                    { hi: 'चक्कर', ur: 'چکّر', tr: 'Chakkar', m: 'Round / Spin', note: 'क् + क = क्क (کّ)' },
                    { hi: 'इज़्ज़त', ur: 'عزّت', tr: 'Izzat', m: 'Honor', note: 'ज़् + ज़ = ज़्ज़ (زّ)' },
                    { hi: 'कुत्ता', ur: 'کُتّا', tr: 'Kutta', m: 'Dog', note: 'त् + त = त्त (تّ)' },
                    { hi: 'मुद्दत', ur: 'مدّت', tr: 'Muddat', m: 'Duration', note: 'द् + द = द्द (دّ)' },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-base-200/40 p-4 rounded-2xl border border-base-300 text-center flex flex-col justify-between space-y-1">
                      <div className="font-devanagari text-base font-medium text-base-content">{item.hi}</div>
                      <div className="h-12 flex items-center justify-center overflow-visible my-0.5">
                        <span className="font-nastaliq text-3xl text-primary leading-none select-none">{item.ur}</span>
                      </div>
                      <div className="text-xs font-semibold text-base-content/85 pt-1">{item.tr}</div>
                      <div className="text-[10px] text-base-content/60">"{item.m}"</div>
                      <div className="font-devanagari text-xs sm:text-sm font-medium text-primary px-2 py-1 rounded-xl bg-primary/10 tracking-wide mt-1 select-none">{item.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* LESSON 8: SILENT FINAL HE                                      */}
          {/* ============================================================== */}
          {selectedLessonId === 'silent-he' && (
            <div className="space-y-6">
              <div className="bg-base-100 p-6 sm:p-8 rounded-3xl border border-base-300 shadow-sm space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-base-content flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Word-Final Silent Chhoti He (ہ) Acting as Vowel 'Aa' (ा)</span>
                </h3>
                <p className="text-sm sm:text-base text-base-content/85 leading-relaxed font-normal">
                  One of the most frequent sources of spelling confusion for Hindi speakers learning Urdu is the letter <strong className="font-nastaliq-inline text-xl text-primary">ہ (Chhoti He)</strong> at the end of masculine nouns.
                </p>
                <div className="p-4 rounded-2xl bg-base-200/50 border border-base-300/80 text-xs sm:text-sm leading-relaxed">
                  <strong className="text-base-content font-bold">The Rule: </strong>
                  In words borrowed from Persian, word-final short 'a' or long 'ā' is written with Chhoti He (ہ). Although it is spelled with 'H', the 'H' is <strong>completely silent</strong> and pronounced as the long vowel <strong>/aː/ (आ)</strong>!
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
                {[
                  { hi: 'कमरा', ur: 'کمرہ', tr: 'Kamra', m: 'Room' },
                  { hi: 'रास्ता', ur: 'راستہ', tr: 'Raasta', m: 'Path / Road' },
                  { hi: 'दरवाज़ा', ur: 'دروازہ', tr: 'Darwaza', m: 'Door' },
                  { hi: 'बच्चा', ur: 'بچّہ', tr: 'Bachha', m: 'Child' },
                  { hi: 'तोहफ़ा', ur: 'تحفہ', tr: 'Tohfa', m: 'Gift' },
                  { hi: 'पर्दा', ur: 'پردہ', tr: 'Parda', m: 'Curtain' },
                  { hi: 'ख़र्चा', ur: 'خرچہ', tr: 'Kharcha', m: 'Expense' },
                  { hi: 'शीशा', ur: 'شیشہ', tr: 'Sheesha', m: 'Mirror / Glass' },
                  { hi: 'चश्मा', ur: 'چشمہ', tr: 'Chashma', m: 'Glasses / Spring' },
                  { hi: 'क़िस्सा', ur: 'قصّہ', tr: 'Qissa', m: 'Tale / Story' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-base-100 p-4 rounded-2xl border border-base-300 text-center flex flex-col justify-between shadow-sm space-y-1">
                    <div className="font-devanagari text-base font-medium text-base-content">{item.hi}</div>
                    <div className="h-12 flex items-center justify-center overflow-visible my-0.5">
                      <span className="font-nastaliq text-3xl text-primary leading-none select-none">{item.ur}</span>
                    </div>
                    <div className="text-xs font-semibold text-base-content/85 pt-1">{item.tr}</div>
                    <div className="text-[10px] text-base-content/60">"{item.m}"</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* LESSON 9: HAMZA & VOWEL GLIDES                                 */}
          {/* ============================================================== */}
          {selectedLessonId === 'hamza' && (
            <div className="space-y-6">
              <div className="bg-base-100 p-6 sm:p-8 rounded-3xl border border-base-300 shadow-sm space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-base-content flex items-center gap-2">
                  <Maximize2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Hamza (ء) & Vowel Glides (Vocalic Hiatus)</span>
                </h3>
                <p className="text-sm sm:text-base text-base-content/85 leading-relaxed font-normal">
                  When two vowel sounds follow each other in consecutive syllables without any consonant between them (vocalic hiatus):
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-base-200/40 border border-base-300/80 space-y-1">
                    <div className="font-bold text-sm text-base-content">In Hindi:</div>
                    <p className="text-xs text-base-content/75 leading-relaxed">
                      Hindi simply writes the second vowel using its independent letter form: <strong className="font-devanagari font-medium">आओ, गए, कोई, भाई, चाय</strong>.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-base-200/40 border border-base-300/80 space-y-1">
                    <div className="font-bold text-sm text-base-content">In Urdu:</div>
                    <p className="text-xs text-base-content/75 leading-relaxed">
                      Urdu places a <strong className="font-nastaliq-inline text-lg text-primary">ہمزہ (Hamza: ء)</strong> on the second vowel carrier (or on a tooth) to signal the smooth vocalic glide: <strong className="font-nastaliq-inline text-xl text-primary">آؤ, گئے, کوئی, بھائی, چائے</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
                {[
                  { hi: 'आओ', ur: 'آؤ', tr: 'Aao', m: 'Come' },
                  { hi: 'गए', ur: 'گئے', tr: 'Gaye', m: 'Went' },
                  { hi: 'कोई', ur: 'کوئی', tr: 'Koi', m: 'Someone' },
                  { hi: 'भाई', ur: 'بھائی', tr: 'Bhai', m: 'Brother' },
                  { hi: 'चाय', ur: 'چائے', tr: 'Chai', m: 'Tea' },
                  { hi: 'नई', ur: 'نئی', tr: 'Nayi', m: 'New (Feminine)' },
                  { hi: 'मिठाई', ur: 'مٹھائی', tr: 'Mithai', m: 'Sweet dessert' },
                  { hi: 'खाओ', ur: 'کھاؤ', tr: 'Khao', m: 'Eat' },
                  { hi: 'बताइए', ur: 'بتائیے', tr: 'Bataiye', m: 'Please tell' },
                  { hi: 'सुई', ur: 'سوئی', tr: 'Sui', m: 'Needle' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-base-100 p-4 rounded-2xl border border-base-300 text-center flex flex-col justify-between shadow-sm space-y-1">
                    <div className="font-devanagari text-base font-medium text-base-content">{item.hi}</div>
                    <div className="h-12 flex items-center justify-center overflow-visible my-0.5">
                      <span className="font-nastaliq text-3xl text-primary leading-none select-none">{item.ur}</span>
                    </div>
                    <div className="text-xs font-semibold text-base-content/85 pt-1">{item.tr}</div>
                    <div className="text-[10px] text-base-content/60">"{item.m}"</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
