import React, { useState, useMemo } from 'react';
import { 
  ArrowUpDown, 
  Search, 
  BookOpen, 
  Compass,
  Layers
} from 'lucide-react';
import LetterCard from './LetterCard';
import { 
  LEARNING_ENTRIES, 
  HINDI_VARNAMALA_IDS, 
  getHindiRank, 
  getUrduRank 
} from '../data/alphabetData';

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All entries' },
  { id: 'vowel', label: 'Vowels' },
  { id: 'velar', label: 'Velars (क-वर्ग)' },
  { id: 'palatal', label: 'Palatals (च-वर्ग)' },
  { id: 'retroflex', label: 'Retroflexes (ट-वर्ग)' },
  { id: 'dental', label: 'Dentals (त-वर्ग)' },
  { id: 'labial', label: 'Labials (प-वर्ग)' },
  { id: 'semivowel', label: 'Semivowels & Rhotics' },
  { id: 'sibilant', label: 'Sibilants & Fricatives' },
  { id: 'aspirate', label: 'Aspirates (ھ / ह)' },
  { id: 'nuqta', label: 'Nuqta & Loan Sounds' },
];

// Pure native Devanagari Varnamala IDs (vowels + vyanjans up to 'ह')
const NATIVE_HINDI_IDS = new Set([
  'a-alif', 'aa-alif-madd', 'i-vowel', 'ii-vowel', 'u-vowel', 'uu-vowel',
  'ri-vowel', 'e-bari-ye', 'ai-vowel', 'o-vowel', 'au-vowel', 'ng-nun-ghunna',
  'k-kaf', 'asp-kha', 'g-gaf', 'asp-gha', 'nga-varga',
  'ch-che', 'asp-cha', 'j-jim', 'asp-jha', 'nya-varga',
  'tt-te-retroflex', 'asp-ttha', 'dd-dal-retroflex', 'asp-ddha', 'nna-varga',
  't-te', 'asp-tha', 'd-dal', 'asp-dha', 'n-nun',
  'p-pe', 'asp-pha', 'b-be', 'asp-bha', 'm-mim',
  'y-choti-ye', 'r-re', 'l-lam', 'v-vao',
  'sh-shin', 'sh-ssha', 's-sin', 'h-choti-he'
]);

// Extended vowel combinations in Urdu (secondary vowel markers)
const URDU_VOWEL_COMBO_IDS = new Set([
  'i-vowel', 'ii-vowel', 'u-vowel', 'uu-vowel', 'ri-vowel', 'ai-vowel', 'o-vowel', 'au-vowel'
]);

export default function AlphabetGrid({ 
  currentPath, 
  onSelectLetter, 
  onOpenWhiteboard, 
  onOpenGuides 
}) {
  const [sortOrder, setSortOrder] = useState('target'); // 'target' | 'root'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const isHindiToUrdu = currentPath === 'hindi-to-urdu';
  const rootLanguageName = isHindiToUrdu ? 'Hindi Varnamala' : 'Urdu Abjad';
  const targetLanguageName = isHindiToUrdu ? 'Urdu Abjad' : 'Hindi Varnamala';

  const isUrduOrder = (isHindiToUrdu && sortOrder === 'target') || (!isHindiToUrdu && sortOrder === 'root');
  const isHindiOrder = (!isHindiToUrdu && sortOrder === 'target') || (isHindiToUrdu && sortOrder === 'root');

  const processedLetters = useMemo(() => {
    let result = [...LEARNING_ENTRIES];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((letter) => {
        if (selectedCategory === 'aspirate') {
          return letter.category === 'aspirate' || letter.isAspiratedCompound;
        }
        return letter.category === selectedCategory;
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((letter) => (
        String(letter.romanTranslit || '').toLowerCase().includes(query) ||
        String(letter.urduChar || '').includes(query) ||
        String(letter.hindiChar || '').includes(query) ||
        String(letter.urduNameTranslit || '').toLowerCase().includes(query) ||
        String(letter.hindiNameTranslit || '').toLowerCase().includes(query) ||
        String(letter.ipa || '').toLowerCase().includes(query) ||
        String(letter.sampleWords?.meaning || '').toLowerCase().includes(query)
      ));
    }

    // Primary sorting
    const primaryOrder = isUrduOrder ? getUrduRank : getHindiRank;
    result.sort((a, b) => {
      const diff = primaryOrder(a) - primaryOrder(b);
      if (diff !== 0) return diff;
      return a.id.localeCompare(b.id);
    });

    return result;
  }, [sortOrder, searchQuery, selectedCategory, isUrduOrder, isHindiOrder]);

  // Determine section grouping when browsing all entries without search
  const isSectioned = selectedCategory === 'all' && !searchQuery.trim();

  // Urdu-ordered sections:
  // 1. Primary 40 Abjad letters
  // 2. Vowel combinations & signs (Alif-zer, Alif-pesh, Alif-choti-ye...)
  // 3. Aspirated compounds (Do-chashmi He)
  const urduSections = useMemo(() => {
    if (!isSectioned || !isUrduOrder) return null;

    const core = processedLetters.filter(l => (l.abjadOrder || 0) <= 40 && !URDU_VOWEL_COMBO_IDS.has(l.id) && !l.isAspiratedCompound);
    const vowelCombos = processedLetters.filter(l => URDU_VOWEL_COMBO_IDS.has(l.id));
    const aspirates = processedLetters.filter(l => l.isAspiratedCompound || (l.abjadOrder && l.abjadOrder >= 41 && l.abjadOrder <= 51));

    return { core, vowelCombos, aspirates };
  }, [isSectioned, isUrduOrder, processedLetters]);

  // Hindi-ordered sections:
  // 1. Traditional Native Varnamala (Vowels + 5x5 Consonant Vargas + Antastha + Ushma)
  // 2. Nuqta Sounds (क़, ख़, ग़, ज़, फ़, ड़, ढ़, and loan letters)
  const hindiSections = useMemo(() => {
    if (!isSectioned || !isHindiOrder) return null;

    const vowelIds = [
      'a-alif', 'aa-alif-madd', 'i-vowel', 'ii-vowel', 'u-vowel', 'uu-vowel',
      'ri-vowel', 'e-bari-ye', 'ai-vowel', 'o-vowel', 'au-vowel', 'ng-nun-ghunna'
    ];
    const vowels = vowelIds.map(id => processedLetters.find(l => l.id === id)).filter(Boolean);

    const vargaGroups = [
      {
        name: 'क-वर्ग (Ka-varga • Velars: क, ख, ग, घ, ङ)',
        ids: ['k-kaf', 'asp-kha', 'g-gaf', 'asp-gha', 'nga-varga']
      },
      {
        name: 'च-वर्ग (Cha-varga • Palatals: च, छ, ज, झ, ञ)',
        ids: ['ch-che', 'asp-cha', 'j-jim', 'asp-jha', 'nya-varga']
      },
      {
        name: 'ट-वर्ग (Ṭa-varga • Retroflexes: ट, ठ, ड, ढ, ण)',
        ids: ['tt-te-retroflex', 'asp-ttha', 'dd-dal-retroflex', 'asp-ddha', 'nna-varga']
      },
      {
        name: 'त-वर्ग (Ta-varga • Dentals: त, थ, द, ध, न)',
        ids: ['t-te', 'asp-tha', 'd-dal', 'asp-dha', 'n-nun']
      },
      {
        name: 'प-वर्ग (Pa-varga • Labials: प, फ, ब, भ, म)',
        ids: ['p-pe', 'asp-pha', 'b-be', 'asp-bha', 'm-mim']
      },
    ].map(g => ({
      name: g.name,
      letters: g.ids.map(id => processedLetters.find(l => l.id === id)).filter(Boolean)
    }));

    const antastha = ['y-choti-ye', 'r-re', 'l-lam', 'v-vao']
      .map(id => processedLetters.find(l => l.id === id))
      .filter(Boolean);

    const ushma = ['sh-shin', 'sh-ssha', 's-sin', 'h-choti-he']
      .map(id => processedLetters.find(l => l.id === id))
      .filter(Boolean);

    const nuqtas = processedLetters.filter(l => !NATIVE_HINDI_IDS.has(l.id));

    return { vowels, vargas: vargaGroups, antastha, ushma, nuqtas };
  }, [isSectioned, isHindiOrder, processedLetters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-9 space-y-6 sm:space-y-8 view-enter">
      
      {/* Editorial Page Header without cluttered eyebrow badges */}
      <section className="bg-base-100 p-6 sm:p-8 rounded-3xl border border-base-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="min-w-0 space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-base-content">
            {isHindiToUrdu ? 'Learn Urdu Script' : 'Learn Hindi Script'}
          </h1>

          <p className="text-xs sm:text-sm text-base-content/75 max-w-2xl leading-relaxed">
            {isHindiToUrdu
              ? 'Explore Urdu letters, connected cursive forms, and aspirate combinations through your Hindi phonetic knowledge.'
              : 'Explore Devanagari vowels and consonants with corresponding Urdu spelling references and pronunciation rules.'}
          </p>
        </div>

        <button 
          onClick={onOpenGuides} 
          className="btn btn-outline border-base-300 bg-base-100 hover:bg-base-200/80 rounded-2xl text-xs sm:text-sm flex items-center gap-2 font-semibold shadow-sm flex-shrink-0 self-start md:self-center"
        >
          <BookOpen className="w-4 h-4 text-primary" />
          <span>Linguistic Guide</span>
        </button>
      </section>

      {/* Control Bar: Search & Sorting Toggle */}
      <section className="bg-base-100 p-4 sm:p-5 rounded-3xl border border-base-300 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4" aria-label="Alphabet controls">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50" aria-hidden="true" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search letters, sounds (e.g. 'k', 'kha', 'क़', 'ک')..."
            className="input input-bordered w-full pl-11 pr-4 py-2 text-xs sm:text-sm rounded-2xl bg-base-200/50 focus:bg-base-100 border-base-300"
          />
        </div>

        {/* Sorting Order Switcher with Constant Size */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setSortOrder(prev => prev === 'target' ? 'root' : 'target')}
            className="btn btn-sm sm:btn-md w-full sm:w-56 justify-between rounded-2xl bg-base-200/70 hover:bg-base-300/80 border-base-300 text-xs sm:text-sm font-semibold transition-all shadow-sm"
            title={`Currently sorted by: ${sortOrder === 'target' ? targetLanguageName : rootLanguageName}. Click to toggle.`}
          >
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span className="text-base-content/70">Sort:</span>
            </div>
            <span className="text-base-content font-bold truncate">
              {sortOrder === 'target' ? targetLanguageName : rootLanguageName}
            </span>
          </button>
        </div>

      </section>

      {/* Category Filter Pills */}
      <section className="flex items-center gap-1.5 overflow-x-auto pb-1" aria-label="Filter categories">
        {CATEGORY_FILTERS.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                isSelected
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-base-200/60 hover:bg-base-200 text-base-content/70 hover:text-base-content border border-base-300/50'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </section>

      {/* Empty State */}
      {processedLetters.length === 0 ? (
        <div className="text-center py-16 bg-base-100 rounded-3xl border border-base-300 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-base-200 flex items-center justify-center mx-auto text-base-content/40">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-base-content">No characters match your search</h3>
          <p className="text-xs text-base-content/60 max-w-sm mx-auto">
            Try searching for another letter, roman sound, or clear your category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="btn btn-xs btn-outline rounded-xl mt-2"
          >
            Reset Filters
          </button>
        </div>
      ) : isSectioned && urduSections ? (
        /* Urdu-ordered layout: Main 40 Abjad Grid + Special Vowels Below + Aspirated Compounds Below */
        <div className="space-y-10">
          
          {/* Main 40 Abjad Letters */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-base-300 pb-2">
              <h2 className="text-lg font-bold text-base-content">
                Primary Urdu Alphabet (حروفِ تہجی)
              </h2>
              <span className="text-xs font-semibold text-base-content/60">
                {urduSections.core.length} Letters (1–40)
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
              {urduSections.core.map((letter) => (
                <LetterCard
                  key={letter.id}
                  letter={letter}
                  currentPath={currentPath}
                  onClick={() => onSelectLetter(letter)}
                  onOpenWhiteboard={() => onOpenWhiteboard(letter)}
                />
              ))}
            </div>
          </div>

          {/* Special Section 1: Extended Vowel Combinations & Diacritic Signs */}
          {urduSections.vowelCombos.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-base-300">
              <div className="flex items-center justify-between border-b border-base-200 pb-2">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-base-content">
                    Vowel Combinations & Diacritics (اعراب و حرکات)
                  </h2>
                  <p className="text-xs text-base-content/60">
                    Alif with Zer (اِ), Pesh (اُ), Choti Ye (ای), and vocalic markers representing Devanagari independent vowels
                  </p>
                </div>
                <span className="text-xs font-semibold text-base-content/50">
                  {urduSections.vowelCombos.length} entries
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
                {urduSections.vowelCombos.map((letter) => (
                  <LetterCard
                    key={letter.id}
                    letter={letter}
                    currentPath={currentPath}
                    onClick={() => onSelectLetter(letter)}
                    onOpenWhiteboard={() => onOpenWhiteboard(letter)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Special Section 2: Aspirated Compounds with Do-Chashmī He */}
          {urduSections.aspirates.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-base-300">
              <div className="flex items-center justify-between border-b border-base-200 pb-2">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-base-content">
                    Aspirated Compounds (مرکب حروف / دو چشمی ہے)
                  </h2>
                  <p className="text-xs text-base-content/60">
                    Systematic breath ligatures formed by coupling base consonants with Do-Chashmī He (ھ)
                  </p>
                </div>
                <span className="text-xs font-semibold text-base-content/50">
                  {urduSections.aspirates.length} aspirates
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
                {urduSections.aspirates.map((letter) => (
                  <LetterCard
                    key={letter.id}
                    letter={letter}
                    currentPath={currentPath}
                    onClick={() => onSelectLetter(letter)}
                    onOpenWhiteboard={() => onOpenWhiteboard(letter)}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      ) : isSectioned && hindiSections ? (
        /* Hindi-ordered layout: Vowels + 5-Letter Varga Rows + Antastha + Ushma + Nuqtas */
        <div className="space-y-10">
          
          {/* Section 1: Independent Vowels (स्वर) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-base-300 pb-2">
              <div>
                <h2 className="text-lg font-bold text-base-content">
                  Independent Vowels (स्वर एवं अनुस्वार)
                </h2>
                <p className="text-xs text-base-content/60">
                  Devanagari vowels (अ to औ) and nasal marker Anusvara (अं)
                </p>
              </div>
              <span className="text-xs font-semibold text-base-content/60">
                {hindiSections.vowels.length} Vowels
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
              {hindiSections.vowels.map((letter) => (
                <LetterCard
                  key={letter.id}
                  letter={letter}
                  currentPath={currentPath}
                  onClick={() => onSelectLetter(letter)}
                  onOpenWhiteboard={() => onOpenWhiteboard(letter)}
                />
              ))}
            </div>
          </div>

          {/* Section 2: Consonants by Articulatory Vargas (स्पर्श व्यंजन: क-वर्ग से प-वर्ग तक) */}
          <div className="space-y-6 pt-2 border-t border-base-300">
            <div className="flex items-center justify-between border-b border-base-200 pb-2">
              <div>
                <h2 className="text-lg font-bold text-base-content">
                  Articulatory Vargas (स्पर्श व्यंजन • 5 Rows of 5)
                </h2>
                <p className="text-xs text-base-content/60">
                  Classified by articulation point from throat to lips, each ending in its varga nasal (पंचमाक्षर: ङ, ञ, ण, न, म)
                </p>
              </div>
              <span className="text-xs font-semibold text-base-content/60">
                25 Consonants (5×5)
              </span>
            </div>

            <div className="space-y-5">
              {hindiSections.vargas.map((varga) => (
                <div key={varga.name} className="space-y-2.5 bg-base-200/20 p-3 sm:p-4 rounded-2xl border border-base-300/60">
                  <div className="text-xs font-bold text-primary tracking-wide px-1">
                    {varga.name}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                    {varga.letters.map((letter) => (
                      <LetterCard
                        key={letter.id}
                        letter={letter}
                        currentPath={currentPath}
                        onClick={() => onSelectLetter(letter)}
                        onOpenWhiteboard={() => onOpenWhiteboard(letter)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Semivowels (अन्तस्थ) & Sibilants / Glottal (ऊष्म) */}
          <div className="space-y-6 pt-2 border-t border-base-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Antastha */}
              <div className="space-y-3 bg-base-200/20 p-3 sm:p-4 rounded-2xl border border-base-300/60">
                <div className="flex items-center justify-between px-1">
                  <div className="text-xs font-bold text-primary tracking-wide">
                    अन्तस्थ व्यंजन (Semivowels • य, र, ल, व)
                  </div>
                  <span className="text-xs font-semibold text-base-content/50">4 Letters</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {hindiSections.antastha.map((letter) => (
                    <LetterCard
                      key={letter.id}
                      letter={letter}
                      currentPath={currentPath}
                      onClick={() => onSelectLetter(letter)}
                      onOpenWhiteboard={() => onOpenWhiteboard(letter)}
                    />
                  ))}
                </div>
              </div>

              {/* Ushma */}
              <div className="space-y-3 bg-base-200/20 p-3 sm:p-4 rounded-2xl border border-base-300/60">
                <div className="flex items-center justify-between px-1">
                  <div className="text-xs font-bold text-primary tracking-wide">
                    ऊष्म व्यंजन (Sibilants & Aspirate • श, ष, स, ह)
                  </div>
                  <span className="text-xs font-semibold text-base-content/50">4 Letters</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {hindiSections.ushma.map((letter) => (
                    <LetterCard
                      key={letter.id}
                      letter={letter}
                      currentPath={currentPath}
                      onClick={() => onSelectLetter(letter)}
                      onOpenWhiteboard={() => onOpenWhiteboard(letter)}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Section 4: Nuqta Sounds & Loan Letters (नुक़्ता ध्वनियाँ) */}
          {hindiSections.nuqtas.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-base-300">
              <div className="flex items-center justify-between border-b border-base-200 pb-2">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-base-content">
                    Nuqta Sounds & Perso-Arabic Loan Letters (नुक़्ता ध्वनियाँ)
                  </h2>
                  <p className="text-xs text-base-content/60">
                    Letters with Nuqta dots representing Persian, Arabic, and retroflex loan phonemes (क़, ख़, ग़, ज़, फ़, ड़, ढ़) and Urdu homophones
                  </p>
                </div>
                <span className="text-xs font-semibold text-base-content/50">
                  {hindiSections.nuqtas.length} entries
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
                {hindiSections.nuqtas.map((letter) => (
                  <LetterCard
                    key={letter.id}
                    letter={letter}
                    currentPath={currentPath}
                    onClick={() => onSelectLetter(letter)}
                    onOpenWhiteboard={() => onOpenWhiteboard(letter)}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Unified Search or Category Filtered Grid */
        <section 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4" 
          aria-label="Alphabet Cards Grid"
        >
          {processedLetters.map((letter) => (
            <LetterCard
              key={letter.id}
              letter={letter}
              currentPath={currentPath}
              onClick={() => onSelectLetter(letter)}
              onOpenWhiteboard={() => onOpenWhiteboard(letter)}
            />
          ))}
        </section>
      )}

    </div>
  );
}
