// Supplementary reference arrays for Hindustani Script Learner
// Aspirated compounds, Nuqta rules, Homophone families, Vowels, and Vocabulary

export const TATWEEL = '\u0640';

export const ASPIRATED_COMPOUNDS = [
  {
    id: "asp-kha",
    urduChar: "کھ",
    hindiChar: "ख",
    baseUrdu: "ک",
    baseHindi: "क",
    translit: "kha",
    ipa: "/kʰ/",
    name: "Khā / ख",
    urduForms: {
      isolated: "کھ",
      initial: `کھ${TATWEEL}`,
      medial: `${TATWEEL}کھ${TATWEEL}`,
      final: `${TATWEEL}کھ`,
    },
    example: { hindi: "खाना", urdu: "کھانا", roman: "Khaana", meaning: "Food / To eat" },
    notes: "Kāf (ک) + Do-chashmi He (ھ) = کھ. Aspiration adds a strong puff of breath to /k/.",
  },
  {
    id: "asp-gha",
    urduChar: "گھ",
    hindiChar: "घ",
    baseUrdu: "گ",
    baseHindi: "ग",
    translit: "gha",
    ipa: "/ɡʱ/",
    name: "Gha / घ",
    urduForms: {
      isolated: "گھ",
      initial: `گھ${TATWEEL}`,
      medial: `${TATWEEL}گھ${TATWEEL}`,
      final: `${TATWEEL}گھ`,
    },
    example: { hindi: "घर", urdu: "گھر", roman: "Ghar", meaning: "Home" },
    notes: "Gāf (گ) + Do-chashmi He (ھ) = گھ. Voiced aspirated velar.",
  },
  {
    id: "asp-cha",
    urduChar: "چھ",
    hindiChar: "छ",
    baseUrdu: "چ",
    baseHindi: "च",
    translit: "chha",
    ipa: "/t͡ʃʰ/",
    name: "Chha / छ",
    urduForms: {
      isolated: "چھ",
      initial: `چھ${TATWEEL}`,
      medial: `${TATWEEL}چھ${TATWEEL}`,
      final: `${TATWEEL}چھ`,
    },
    example: { hindi: "छतरी", urdu: "چھتری", roman: "Chhatri", meaning: "Umbrella" },
    notes: "Che (چ) + Do-chashmi He (ھ) = چھ. Voiceless aspirated palatal.",
  },
  {
    id: "asp-jha",
    urduChar: "جھ",
    hindiChar: "झ",
    baseUrdu: "ج",
    baseHindi: "ज",
    translit: "jha",
    ipa: "/d͡ʒʱ/",
    name: "Jha / झ",
    urduForms: {
      isolated: "جھ",
      initial: `جھ${TATWEEL}`,
      medial: `${TATWEEL}جھ${TATWEEL}`,
      final: `${TATWEEL}جھ`,
    },
    example: { hindi: "झंडा", urdu: "جھنڈا", roman: "Jhanda", meaning: "Flag" },
    notes: "Jim (ج) + Do-chashmi He (ھ) = جھ. Voiced aspirated palatal.",
  },
  {
    id: "asp-ttha",
    urduChar: "ٹھ",
    hindiChar: "ठ",
    baseUrdu: "ٹ",
    baseHindi: "ट",
    translit: "ṭha",
    ipa: "/ʈʰ/",
    name: "Ṭha / ठ",
    urduForms: {
      isolated: "ٹھ",
      initial: `ٹھ${TATWEEL}`,
      medial: `${TATWEEL}ٹھ${TATWEEL}`,
      final: `${TATWEEL}ٹھ`,
    },
    example: { hindi: "ठीक", urdu: "ٹھیک", roman: "Ṭheek", meaning: "Fine / Correct" },
    notes: "Ṭe (ٹ) + Do-chashmi He (ھ) = ٹھ. Voiceless aspirated retroflex.",
  },
  {
    id: "asp-ddha",
    urduChar: "ڈھ",
    hindiChar: "ढ",
    baseUrdu: "ڈ",
    baseHindi: "ड",
    translit: "ḍha",
    ipa: "/ɖʱ/",
    name: "Ḍha / ढ",
    urduForms: {
      isolated: "ڈھ",
      initial: `ڈھ${TATWEEL}`,
      medial: `${TATWEEL}ڈھ${TATWEEL}`,
      final: `${TATWEEL}ڈھ`,
    },
    example: { hindi: "ढोल", urdu: "ڈھول", roman: "Ḍhol", meaning: "Drum" },
    notes: "Ḍal (ڈ) + Do-chashmi He (ھ) = ڈھ. Voiced aspirated retroflex.",
  },
  {
    id: "asp-rrha",
    urduChar: "ڑھ",
    hindiChar: "ढ़",
    baseUrdu: "ڑ",
    baseHindi: "ड़",
    translit: "ṛha",
    ipa: "/ɽʱ/",
    name: "Ṛha / ढ़",
    urduForms: {
      isolated: "ڑھ",
      initial: "ڑھ",
      medial: `${TATWEEL}ڑھ`,
      final: `${TATWEEL}ڑھ`,
    },
    example: { hindi: "पढ़ना", urdu: "پڑھنا", roman: "Paṛhna", meaning: "To read" },
    notes: "Ṛe (ڑ) + Do-chashmi He (ھ) = ڑھ. Aspirated retroflex flap. Corresponds to ढ़ in Hindi.",
  },
  {
    id: "asp-tha",
    urduChar: "تھ",
    hindiChar: "थ",
    baseUrdu: "ت",
    baseHindi: "त",
    translit: "tha",
    ipa: "/t̪ʰ/",
    name: "Tha / थ",
    urduForms: {
      isolated: "تھ",
      initial: `تھ${TATWEEL}`,
      medial: `${TATWEEL}تھ${TATWEEL}`,
      final: `${TATWEEL}تھ`,
    },
    example: { hindi: "थाली", urdu: "تھالی", roman: "Thaali", meaning: "Plate" },
    notes: "Te (ت) + Do-chashmi He (ھ) = تھ. Voiceless aspirated dental.",
  },
  {
    id: "asp-dha",
    urduChar: "دھ",
    hindiChar: "ध",
    baseUrdu: "د",
    baseHindi: "द",
    translit: "dha",
    ipa: "/d̪ʱ/",
    name: "Dha / ध",
    urduForms: {
      isolated: "دھ",
      initial: "دھ",
      medial: `${TATWEEL}دھ`,
      final: `${TATWEEL}دھ`,
    },
    example: { hindi: "धोबी", urdu: "دھوبی", roman: "Dhobi", meaning: "Washerman" },
    notes: "Dal (د) + Do-chashmi He (ھ) = دھ. Voiced aspirated dental.",
  },
  {
    id: "asp-pha",
    urduChar: "پھ",
    hindiChar: "फ",
    baseUrdu: "پ",
    baseHindi: "प",
    translit: "pha",
    ipa: "/pʰ/",
    name: "Pha / फ",
    urduForms: {
      isolated: "پھ",
      initial: `پھ${TATWEEL}`,
      medial: `${TATWEEL}پھ${TATWEEL}`,
      final: `${TATWEEL}پھ`,
    },
    example: { hindi: "फल", urdu: "پھل", roman: "Phal", meaning: "Fruit" },
    notes: "Pe (پ) + Do-chashmi He (ھ) = پھ. Voiceless aspirated labial. Crucially distinct from fricative फ़ / ف (fa)!",
  },
  {
    id: "asp-bha",
    urduChar: "بھ",
    hindiChar: "भ",
    baseUrdu: "ب",
    baseHindi: "ब",
    translit: "bha",
    ipa: "/bʱ/",
    name: "Bha / भ",
    urduForms: {
      isolated: "بھ",
      initial: `بھ${TATWEEL}`,
      medial: `${TATWEEL}بھ${TATWEEL}`,
      final: `${TATWEEL}بھ`,
    },
    example: { hindi: "भाई", urdu: "بھائی", roman: "Bhai", meaning: "Brother" },
    notes: "Be (ب) + Do-chashmi He (ھ) = بھ. Voiced aspirated labial.",
  },
];

export const NUQTA_RULES = [
  {
    id: "nuqta-qa",
    hindiChar: "क़",
    baseHindi: "क",
    urduChar: "ق",
    ipa: "/q/",
    translit: "q",
    soundName: "Voiceless Uvular Stop",
    explanation: "Deep guttural 'k' made further back in the throat at the uvula. In Hindi, written with a Nuqta under क to preserve Persian and Arabic loan pronunciations.",
    example: { hindi: "क़ीमत", urdu: "قیمت", roman: "Qeemat", meaning: "Price / Value" },
  },
  {
    id: "nuqta-kha",
    hindiChar: "ख़",
    baseHindi: "ख",
    urduChar: "خ",
    ipa: "/x/",
    translit: "kh (x)",
    soundName: "Voiceless Velar Fricative",
    explanation: "A raspy, scratchy friction sound made at the soft palate. Hindi adds a Nuqta to ख (/kʰ/) so readers do not confuse it with native aspirated ख.",
    example: { hindi: "ख़बर", urdu: "خبر", roman: "Khabar", meaning: "News" },
  },
  {
    id: "nuqta-gha",
    hindiChar: "ग़",
    baseHindi: "ग",
    urduChar: "غ",
    ipa: "/ɣ/",
    translit: "gh (ɣ)",
    soundName: "Voiced Velar Fricative",
    explanation: "A voiced gargling friction sound (like the French 'r'). Hindi adds a Nuqta to ग to represent the Arabic/Persian letter Ghain (غ).",
    example: { hindi: "ग़लत", urdu: "غلط", roman: "Ghalat", meaning: "Wrong / Incorrect" },
  },
  {
    id: "nuqta-za",
    hindiChar: "ज़",
    baseHindi: "ज",
    urduChar: "ز / ذ / ض / ظ",
    ipa: "/z/",
    translit: "z",
    soundName: "Voiced Alveolar Fricative",
    explanation: "A buzzing 'z' sound. Hindi native phonology lacked /z/, having only affricate ज (/d͡ʒ/). Adding a Nuqta to ज creates ज़, which covers four different Urdu letters (ز, ذ, ض, ظ).",
    example: { hindi: "ज़मीन", urdu: "زمین", roman: "Zameen", meaning: "Earth / Land" },
  },
  {
    id: "nuqta-fa",
    hindiChar: "फ़",
    baseHindi: "फ",
    urduChar: "ف",
    ipa: "/f/",
    translit: "f",
    soundName: "Voiceless Labiodental Fricative",
    explanation: "Teeth touching lower lip (/f/). Distinct from native bilabial aspirated फ (/pʰ/). In Urdu, represented by Fe (ف).",
    example: { hindi: "फ़ायदा", urdu: "فائدہ", roman: "Faayda", meaning: "Benefit" },
  },
  {
    id: "nuqta-rra",
    hindiChar: "ड़",
    baseHindi: "ड",
    urduChar: "ڑ",
    ipa: "/ɽ/",
    translit: "ṛ",
    soundName: "Voiced Retroflex Flap",
    explanation: "Native Indo-Aryan sound (tongue curling up and flapping down). Because ancient Devanagari did not have an independent letter for this reflex of ड, a Nuqta was introduced.",
    example: { hindi: "पेड़", urdu: "پیڑ", roman: "Peṛ", meaning: "Tree" },
  },
  {
    id: "nuqta-rrha",
    hindiChar: "ढ़",
    baseHindi: "ढ",
    urduChar: "ڑھ",
    ipa: "/ɽʱ/",
    translit: "ṛh",
    soundName: "Aspirated Retroflex Flap",
    explanation: "Aspirated version of the retroflex flap. In Hindi, formed with Nuqta on ढ. In Urdu, formed with Ṛe (ڑ) + Do-chashmi He (ھ).",
    example: { hindi: "सीढ़ी", urdu: "سیڑھی", roman: "Seeṛhi", meaning: "Stairs / Ladder" },
  },
];

export const HOMOPHONE_SETS = [
  {
    sound: "/s/ (स)",
    hindiLetter: "स",
    urduLetters: [
      { 
        char: "س", 
        name: "Seen (سین)", 
        role: "Primary Hindustani Sound", 
        origin: "Native Indo-Aryan & Standard Persian", 
        note: "The default, most ubiquitous 's' in Hindustani vocabulary.",
        examples: [
          { hi: "सच", ur: "سچ", tr: "Sach", meaning: "Truth" },
          { hi: "सिर", ur: "سر", tr: "Sir", meaning: "Head" }
        ]
      },
      { 
        char: "ص", 
        name: "Swaad (صاد)", 
        role: "Arabic Emphatic Root", 
        origin: "Classical Arabic (velarized /sˤ/)", 
        note: "Used exclusively in words of Arabic etymological lineage.",
        examples: [
          { hi: "साफ़", ur: "صاف", tr: "Saaf", meaning: "Clean" },
          { hi: "सब्र", ur: "صبر", tr: "Sabr", meaning: "Patience" }
        ]
      },
      { 
        char: "ث", 
        name: "Se (ثے)", 
        role: "Arabic Interdental Loan", 
        origin: "Classical Arabic (originally /θ/ as in 'thin')", 
        note: "Found in specific classical religious, legal, and academic loanwords.",
        examples: [
          { hi: "साबित", ur: "ثابت", tr: "Saabit", meaning: "Proven" },
          { hi: "मिसाल", ur: "مثال", tr: "Misaal", meaning: "Example" }
        ]
      },
    ],
    rule: "Urdu distinguishes these 3 letters for etymological reasons (historical Arabic and Persian roots), even though in everyday Hindustani speech they all make the identical /s/ sound as Hindi 'स'.",
  },
  {
    sound: "/z/ (ज़)",
    hindiLetter: "ज़",
    urduLetters: [
      { 
        char: "ز", 
        name: "Ze (زے)", 
        role: "Primary /z/ Consonant", 
        origin: "Persian & Native Hindustani", 
        note: "Standard voiced sibilant used across modern everyday words.",
        examples: [
          { hi: "ज़िंदगी", ur: "زندگی", tr: "Zindagi", meaning: "Life" },
          { hi: "ज़मीन", ur: "زمین", tr: "Zameen", meaning: "Earth / Land" }
        ]
      },
      { 
        char: "ذ", 
        name: "Zaal (ذال)", 
        role: "Arabic Dental Fricative", 
        origin: "Classical Arabic (/ð/ like 'then')", 
        note: "Preserved in classical Arabic vocabulary and scholarly terms.",
        examples: [
          { hi: "ज़िक्र", ur: "ذکر", tr: "Zikr", meaning: "Remembrance" },
          { hi: "ज़ाती", ur: "ذاتی", tr: "Zaati", meaning: "Personal" }
        ]
      },
      { 
        char: "ض", 
        name: "Zwaad (ضاد)", 
        role: "Arabic Emphatic Voiced", 
        origin: "Classical Arabic (/dˤ/ velarized)", 
        note: "Crucial Arabic root letter (e.g. Zaroorat, Zameer, Haazir).",
        examples: [
          { hi: "ज़रूरत", ur: "ضرورت", tr: "Zaroorat", meaning: "Necessity" },
          { hi: "हाज़िर", ur: "حاضر", tr: "Haazir", meaning: "Present" }
        ]
      },
      { 
        char: "ظ", 
        name: "Zoe (ظوئے)", 
        role: "Arabic Emphatic Interdental", 
        origin: "Classical Arabic (/ðˤ/ velarized)", 
        note: "Found in Arabic roots dealing with vision, injustice, and appearance.",
        examples: [
          { hi: "ज़ाहिर", ur: "ظاہر", tr: "Zaahir", meaning: "Apparent" },
          { hi: "नज़र", ur: "نظر", tr: "Nazar", meaning: "Sight / Vision" }
        ]
      },
    ],
    rule: "Hindi collapses all four Arabic/Persian letters into a single character: 'ज़' (ज with Nuqta). Urdu maintains the 4 distinct spellings based on historical origin.",
  },
  {
    sound: "/t/ (त)",
    hindiLetter: "त",
    urduLetters: [
      { 
        char: "ت", 
        name: "Te (تے)", 
        role: "Universal Dental 't'", 
        origin: "Native Indo-Aryan & General Vocabulary", 
        note: "The universal dental /t̪/ for 95%+ of spoken Hindustani words.",
        examples: [
          { hi: "तुम", ur: "تم", tr: "Tum", meaning: "You" },
          { hi: "रात", ur: "رات", tr: "Raat", meaning: "Night" }
        ]
      },
      { 
        char: "ط", 
        name: "Toe (طوئے)", 
        role: "Arabic Emphatic 't'", 
        origin: "Classical Arabic (/tˤ/ velarized)", 
        note: "Strictly signals an Arabic loanword (Tota, Tareeqa, Tabiyat).",
        examples: [
          { hi: "तरीक़ा", ur: "طریقہ", tr: "Tareeqa", meaning: "Method / Way" },
          { hi: "तोता", ur: "طوطا", tr: "Tota", meaning: "Parrot" }
        ]
      },
    ],
    rule: "Both letters are pronounced as pure dental त (/t̪/) in Hindustani. The letter 'ط' exclusively signals an Arabic loanword.",
  },
  {
    sound: "/h/ (ह)",
    hindiLetter: "ह",
    urduLetters: [
      { 
        char: "ہ", 
        name: "Chhoti He (چھوٹی ہے)", 
        role: "Standard Hindustani 'h'", 
        origin: "Native Indo-Aryan & Persian", 
        note: "Universal glottal /h/. Also functions as word-final short 'a' vowel marker.",
        examples: [
          { hi: "हम", ur: "ہم", tr: "Hum", meaning: "We / Us" },
          { hi: "हवा", ur: "ہوا", tr: "Hawa", meaning: "Air / Breeze" }
        ]
      },
      { 
        char: "ح", 
        name: "Badi He (بڑی ہے)", 
        role: "Arabic Pharyngeal 'h'", 
        origin: "Classical Arabic (/ħ/ deep friction)", 
        note: "Pronounced as ordinary /h/ in Hindustani, but retains Arabic orthography.",
        examples: [
          { hi: "हाल", ur: "حال", tr: "Haal", meaning: "Condition" },
          { hi: "हक़", ur: "حق", tr: "Haq", meaning: "Right / Truth" }
        ]
      },
    ],
    rule: "Do not confuse either with Do-chashmi He (ھ), which is strictly reserved for aspirated compound letters (ख, घ, भ, etc.).",
  },
];

export const VOWEL_SYSTEM = [
  {
    vowelSound: "Short 'a' (/ə/)",
    hindiIndependent: "अ",
    hindiMatra: "Inherent (no sign)",
    urduSign: "َ (Zabar / Fatha)",
    urduExample: "اَب (अब - Ab)",
    explanation: "In Devanagari, every consonant has an inherent /ə/ unless cancelled by a Halant (्). In Urdu, it is denoted by a diagonal stroke above the letter called Zabar, which is usually omitted in informal writing.",
  },
  {
    vowelSound: "Short 'i' (/ɪ/)",
    hindiIndependent: "इ",
    hindiMatra: "ि (Chhoti Ee ki Matra)",
    urduSign: "ِ (Zer / Kasra)",
    urduExample: "اِس (इस - Is)",
    explanation: "Hindi places the 'ि' sign to the LEFT of the consonant. Urdu places a diagonal stroke called Zer underneath the letter.",
  },
  {
    vowelSound: "Short 'u' (/ʊ/)",
    hindiIndependent: "उ",
    hindiMatra: "ु (Chhota Oo ki Matra)",
    urduSign: "ُ (Pesh / Damma)",
    urduExample: "اُس (उस - Us)",
    explanation: "Urdu places a small loop called Pesh above the consonant.",
  },
  {
    vowelSound: "Long 'ā' (/aː/)",
    hindiIndependent: "आ",
    hindiMatra: "ा (Aa ki Matra)",
    urduSign: "آ (Alif Madd) / ا (Alif)",
    urduExample: "عام (आम - Aam)",
    explanation: "Word-initial 'ā' is written with Alif Madd (آ). After a consonant, it is written with a connecting Alif (ا).",
  },
  {
    vowelSound: "Long 'ī' (/iː/)",
    hindiIndependent: "ई",
    hindiMatra: "ी (Badi Ee ki Matra)",
    urduSign: "ی (Chhoti Ye)",
    urduExample: "پانی (पानी - Paani)",
    explanation: "Urdu uses Chhoti Ye (ی) preceded by Zer (often implicit) to write long /iː/.",
  },
  {
    vowelSound: "Long 'ū' (/uː/)",
    hindiIndependent: "ऊ",
    hindiMatra: "ू (Bada Oo ki Matra)",
    urduSign: "و (Vao with Pesh)",
    urduExample: "دور (दूर - Door)",
    explanation: "Urdu uses Vao (و) preceded by Pesh to write long /uː/.",
  },
  {
    vowelSound: "Long 'e' (/eː/)",
    hindiIndependent: "ए",
    hindiMatra: "े (E ki Matra)",
    urduSign: "ے (Bari Ye)",
    urduExample: "لڑکے (लड़के - Larke)",
    explanation: "At the end of words, Urdu uses Bari Ye (ے). In the middle of words, it uses Chhoti Ye form without zer.",
  },
  {
    vowelSound: "Diphthong 'ai' (/ɛː/)",
    hindiIndependent: "ऐ",
    hindiMatra: "ै (Ai ki Matra)",
    urduSign: "َ + ے (Zabar + Bari Ye)",
    urduExample: "پَیسہ (पैसा - Paisa)",
    explanation: "Urdu writes this with a Zabar followed by Ye.",
  },
  {
    vowelSound: "Long 'o' (/oː/)",
    hindiIndependent: "ओ",
    hindiMatra: "ो (O ki Matra)",
    urduSign: "و (Plain Vao)",
    urduExample: "لوگ (लोग - Log)",
    explanation: "Plain Vao without pesh represents /oː/.",
  },
  {
    vowelSound: "Diphthong 'au' (/ɔː/)",
    hindiIndependent: "औ",
    hindiMatra: "ौ (Au ki Matra)",
    urduSign: "َ + و (Zabar + Vao)",
    urduExample: "عَورَت (औरत - Aurat)",
    explanation: "Urdu writes this with Zabar on the preceding letter followed by Vao.",
  },
  {
    vowelSound: "Gemination (Half-consonant)",
    hindiIndependent: "् (Halant / Adha Akshar)",
    hindiMatra: "बिल्कुल / पत्ता",
    urduSign: "ّ (Tashdeed / Shaddah)",
    urduExample: "پتّہ (पत्ता - Patta)",
    explanation: "Hindi writes doubled consonants by cutting the first letter in half (त् + त = त्त) or with a Halant. Urdu writes the consonant once and places a small 'w'-shaped mark called Tashdeed (ّ) above it.",
  },
  {
    vowelSound: "Absence of Vowel (Sukoon)",
    hindiIndependent: "् (Halant)",
    hindiMatra: "क्, त्",
    urduSign: "ْ (Jazm / Sukoon)",
    urduExample: "شَکْ (शक - Shak)",
    explanation: "Indicates that the consonant has no following vowel. In Hindi, indicated by the Halant (्) or by the fact that word-final consonants drop their inherent 'a'.",
  },
];

export const VOCABULARY_BRIDGE = [
  // --- CORE CATEGORY ---
  {
    hindi: "दोस्ती",
    urdu: "دوستی",
    translit: "Dosti",
    ipa: "/d̪oːs.t̪iː/",
    meaning: "Friendship",
    category: "Core",
    rule: "Dal (د) and Vao (و) are both Non-Connectors; Sin (سـ) connects directly to Te (ـتـ) and Choti Ye (ـی).",
    components: [
      { ur: "د", hi: "द", name: "Dal" },
      { ur: "و", hi: "ो", name: "Vao" },
      { ur: "س", hi: "स्", name: "Sin" },
      { ur: "ت", hi: "त", name: "Te" },
      { ur: "ی", hi: "ी", name: "Choti Ye" }
    ],
    breakdown: [
      { hi: "द + ो", ur: "دو", sound: "Do", note: "Non-connector Dal followed by detached Vao" },
      { hi: "स्", ur: "سـ", sound: "s", note: "Sin initial tooth connecting to Te" },
      { hi: "ती", ur: "ـتی", sound: "ti", note: "Te medial body flowing into final Choti Ye" }
    ],
    hindiBreakdown: [
      { segment: "दो", formula: "द + ो", matra: "ओ की मात्रा (ो)", sound: "Do", note: "Consonant base 'द' combined with post-consonant 'ओ' matra sign" },
      { segment: "स्त", formula: "स् (आधा स) + त", matra: "हलंत संयुक्ताक्षर (स्)", sound: "st", note: "Half-consonant 'स' (halant s) fused with full dental 'त'" },
      { segment: "ती", formula: "त + ी", matra: "बड़ी ई की मात्रा (ी)", sound: "tee", note: "Dental 'त' extended with rightward long 'ई' matra stroke" }
    ]
  },
  {
    hindi: "किताब",
    urdu: "کتاب",
    translit: "Kitaab",
    ipa: "/kɪ.t̪aːb/",
    meaning: "Book",
    category: "Core",
    rule: "Kaf (کـ) connects to Te (ـتـ), which ascends vertically into Alif (ـا). Final Be (ب) remains isolated.",
    components: [
      { ur: "ک", hi: "क", name: "Kaf" },
      { ur: "ت", hi: "त", name: "Te" },
      { ur: "ا", hi: "ा", name: "Alif" },
      { ur: "ب", hi: "ब", name: "Be" }
    ],
    breakdown: [
      { hi: "कि", ur: "کـ", sound: "Ki", note: "Kaf stroke with implicit short zer vowel" },
      { hi: "ता", ur: "ـتا", sound: "taa", note: "Te tooth rising straight into tall vertical Alif" },
      { hi: "ब", ur: "ب", sound: "b", note: "Be sitting isolated following non-connector Alif" }
    ],
    hindiBreakdown: [
      { segment: "कि", formula: "क + ि", matra: "छोटी इ की मात्रा (ि)", sound: "Ki", note: "Consonant 'क' preceded by the left-arching short 'इ' matra" },
      { segment: "ता", formula: "त + ा", matra: "आ की मात्रा (ा)", sound: "Taa", note: "Dental 'त' followed by the upright 'आ' vertical matra stem" },
      { segment: "ब", formula: "ब (अन्त्य)", matra: "अन्तर्निहित 'अ'", sound: "b", note: "Word-final base consonant 'ब' with silent inherent schwa" }
    ]
  },
  {
    hindi: "कलम",
    urdu: "قلم",
    translit: "Qalam",
    ipa: "/qə.ləm/",
    meaning: "Pen",
    category: "Core",
    rule: "Qaf (قـ) loops into Lam (ـلـ), which flows directly into final Mim (ـم).",
    components: [
      { ur: "ق", hi: "क़", name: "Qaf" },
      { ur: "ل", hi: "ल", name: "Lam" },
      { ur: "م", hi: "म", name: "Mim" }
    ],
    breakdown: [
      { hi: "क़", ur: "قـ", sound: "Qa", note: "Initial Qaf with 2 dots" },
      { hi: "ल", ur: "ـلـ", sound: "la", note: "Medial Lam linking high" },
      { hi: "म", ur: "ـم", sound: "m", note: "Final closed Mim loop dipping below" }
    ],
    hindiBreakdown: [
      { segment: "क", formula: "क / क़", matra: "अन्तर्निहित स्वर", sound: "Qa", note: "Base velar consonant without vowel sign" },
      { segment: "ल", formula: "ल", matra: "अन्तर्निहित स्वर", sound: "la", note: "Base lateral consonant" },
      { segment: "म", formula: "म", matra: "अन्त्य व्यंजन", sound: "m", note: "Final base consonant" }
    ]
  },
  {
    hindi: "वक़्त",
    urdu: "وقت",
    translit: "Waqt",
    ipa: "/ʋəqt̪/",
    meaning: "Time",
    category: "Core",
    rule: "Non-connector Vao (و) sits detached; initial Qaf (قـ) links to flat basin Te (ـت).",
    components: [
      { ur: "و", hi: "व", name: "Vao" },
      { ur: "ق", hi: "क़्", name: "Qaf" },
      { ur: "ت", hi: "त", name: "Te" }
    ],
    breakdown: [
      { hi: "व", ur: "و", sound: "Wa", note: "Detached initial Vao" },
      { hi: "क़्त", ur: "قت", sound: "qt", note: "Two-dotted Qaf attached to final Te basin" }
    ],
    hindiBreakdown: [
      { segment: "व", formula: "व", matra: "अन्तर्निहित स्वर", sound: "Wa", note: "Base semivowel consonant" },
      { segment: "क़्त", formula: "क़् + त", matra: "हलंत संयुक्ताक्षर", sound: "qt", note: "Half-consonant 'क़' combined with dental 'त'" }
    ]
  },
  {
    hindi: "सड़क",
    urdu: "سڑک",
    translit: "Saṛak",
    ipa: "/sə.ɽək/",
    meaning: "Street / Road",
    category: "Core",
    rule: "Sin (سـ) connects to retroflex Ṛe (ـڑ), which is a non-connector, leaving Kaf (ک) isolated.",
    components: [
      { ur: "س", hi: "स", name: "Sin" },
      { ur: "ڑ", hi: "ड़", name: "Ṛe" },
      { ur: "ک", hi: "क", name: "Kaf" }
    ],
    breakdown: [
      { hi: "सड़", ur: "سڑ", sound: "Saṛ", note: "Sin tooth linking downward to Ṛe with small Toe" },
      { hi: "क", ur: "ک", sound: "k", note: "Isolated Kaf after non-connector Ṛe" }
    ],
    hindiBreakdown: [
      { segment: "स", formula: "स", matra: "अन्तर्निहित स्वर", sound: "Sa", note: "Base dental sibilant" },
      { segment: "ड़", formula: "ड़ (ड + नुक़्ता)", matra: "उत्क्षिप्त व्यंजन", sound: "ṛa", note: "Flapped retroflex consonant with Nuqta dot" },
      { segment: "क", formula: "क", matra: "अन्त्य व्यंजन", sound: "k", note: "Final velar stop" }
    ]
  },
  {
    hindi: "पानी",
    urdu: "پانی",
    translit: "Paani",
    ipa: "/paː.niː/",
    meaning: "Water",
    category: "Core",
    rule: "Pe (پـ) links upwards to Alif (ـا); Nun (نـ) connects seamlessly into rounded Choti Ye (ـی).",
    components: [
      { ur: "پ", hi: "प", name: "Pe" },
      { ur: "ا", hi: "ा", name: "Alif" },
      { ur: "ن", hi: "न", name: "Nun" },
      { ur: "ی", hi: "ी", name: "Choti Ye" }
    ],
    breakdown: [
      { hi: "पा", ur: "پا", sound: "Paa", note: "Three dots beneath initial Pe rising into Alif" },
      { hi: "नी", ur: "نی", sound: "nee", note: "Single-dot Nun tooth connecting into cursive Choti Ye" }
    ],
    hindiBreakdown: [
      { segment: "पा", formula: "प + ा", matra: "आ की मात्रा (ा)", sound: "Paa", note: "Labial 'प' with upright 'आ' matra" },
      { segment: "नी", formula: "न + ी", matra: "ई की मात्रा (ी)", sound: "nee", note: "Dental 'न' with long 'ई' matra stroke" }
    ]
  },
  {
    hindi: "आसमान",
    urdu: "آسمان",
    translit: "Aasman",
    ipa: "/aːs.maːn/",
    meaning: "Sky",
    category: "Core",
    rule: "Alif Madd (آ) starts the word; Sin (سـ) connects directly into Mim (ـمـ), rising to Alif, ending in Nun (ن).",
    components: [
      { ur: "آ", hi: "आ", name: "Alif Madd" },
      { ur: "س", hi: "स्", name: "Sin" },
      { ur: "م", hi: "म", name: "Mim" },
      { ur: "ا", hi: "ा", name: "Alif" },
      { ur: "ن", hi: "न", name: "Nun" }
    ],
    breakdown: [
      { hi: "आ", ur: "آ", sound: "Aa", note: "Standalone long vowel /aː/ carrier Alif Madd" },
      { hi: "समा", ur: "سما", sound: "sma", note: "Sin teeth connecting to Mim ascending to Alif" },
      { hi: "न", ur: "ن", sound: "n", note: "Independent deep basin Nun with centered dot" }
    ],
    hindiBreakdown: [
      { segment: "आ", formula: "आ (स्वतंत्र स्वर)", matra: "दीर्घ स्वर", sound: "Aa", note: "Independent full vowel letter 'आ'" },
      { segment: "स", formula: "स", matra: "अन्तर्निहित स्वर", sound: "s", note: "Base dental sibilant" },
      { segment: "मा", formula: "म + ा", matra: "आ की मात्रा (ा)", sound: "maa", note: "Labial nasal 'म' with 'आ' matra" },
      { segment: "न", formula: "न", matra: "अन्त्य व्यंजन", sound: "n", note: "Final dental nasal stop" }
    ]
  },
  {
    hindi: "दुनिया",
    urdu: "دنیا",
    translit: "Duniya",
    ipa: "/d̪ʊ.nɪ.jaː/",
    meaning: "World",
    category: "Core",
    rule: "Non-connector Dal (د); Nun tooth (نـ) attaches to Choti Ye tooth (ـیـ), rising into Alif (ـا).",
    components: [
      { ur: "د", hi: "द", name: "Dal" },
      { ur: "ن", hi: "न", name: "Nun" },
      { ur: "ی", hi: "य", name: "Choti Ye" },
      { ur: "ا", hi: "ा", name: "Alif" }
    ],
    breakdown: [
      { hi: "दु", ur: "د", sound: "Du", note: "Isolated Dal with implied Pesh diacritic" },
      { hi: "निया", ur: "نیا", sound: "niya", note: "Nun tooth + Ye tooth flowing upward into tall Alif" }
    ],
    hindiBreakdown: [
      { segment: "दु", formula: "द + ु", matra: "ह्रस्व उ की मात्रा (ु)", sound: "Du", note: "Dental 'द' with short 'उ' bottom curl" },
      { segment: "नि", formula: "न + ि", matra: "ह्रस्व इ की मात्रा (ि)", sound: "ni", note: "Dental 'न' with short 'इ' arch" },
      { segment: "या", formula: "य + ा", matra: "आ की मात्रा (ा)", sound: "yaa", note: "Semivowel 'य' with long 'आ' vertical stroke" }
    ]
  },
  {
    hindi: "इंसान",
    urdu: "انسان",
    translit: "Insaan",
    ipa: "/ɪn.saːn/",
    meaning: "Human Being",
    category: "Core",
    rule: "Alif (ا); Nun (نـ) joins Sin (ـسـ), ascending into Alif (ـا), ending with independent Nun (ن).",
    components: [
      { ur: "ا", hi: "इ", name: "Alif" },
      { ur: "ن", hi: "न्", name: "Nun" },
      { ur: "س", hi: "स", name: "Sin" },
      { ur: "ا", hi: "ा", name: "Alif" },
      { ur: "ن", hi: "न", name: "Nun" }
    ],
    breakdown: [
      { hi: "इ", ur: "ا", sound: "In", note: "Initial Alif with Zer diacritic" },
      { hi: "न्सा", ur: "نسا", sound: "saa", note: "Nun tooth fusing into Sin teeth ascending to Alif" },
      { hi: "न", ur: "ن", sound: "n", note: "Final rounded basin Nun" }
    ],
    hindiBreakdown: [
      { segment: "इं", formula: "इ + ं", matra: "अनुस्वार (ं)", sound: "In", note: "Short vowel 'इ' topped with nasal Anusvara dot" },
      { segment: "सा", formula: "स + ा", matra: "आ की मात्रा (ा)", sound: "saa", note: "Dental sibilant 'स' with vertical 'आ' matra" },
      { segment: "न", formula: "न", matra: "अन्त्य व्यंजन", sound: "n", note: "Final base consonant" }
    ]
  },
  {
    hindi: "दिल",
    urdu: "دل",
    translit: "Dil",
    ipa: "/d̪ɪl/",
    meaning: "Heart",
    category: "Core",
    rule: "Non-connector Dal (د) followed by tall, elegant Lam (ل).",
    components: [
      { ur: "د", hi: "द", name: "Dal" },
      { ur: "ل", hi: "ल", name: "Lam" }
    ],
    breakdown: [
      { hi: "दि", ur: "د", sound: "Di", note: "Isolated Dal with implicit Zer" },
      { hi: "ल", ur: "ل", sound: "l", note: "Deep sweeping loop Lam dipping into descender zone" }
    ],
    hindiBreakdown: [
      { segment: "दि", formula: "द + ि", matra: "छोटी इ की मात्रा (ि)", sound: "Di", note: "Dental 'द' with short 'इ' leftward arch" },
      { segment: "ल", formula: "ल", matra: "अन्त्य व्यंजन", sound: "l", note: "Final lateral consonant" }
    ]
  },

  // --- NUQTA CATEGORY ---
  {
    hindi: "ज़िंदगी",
    urdu: "زندگی",
    translit: "Zindagi",
    ipa: "/zɪn.d̪ə.ɡiː/",
    meaning: "Life",
    category: "Nuqta",
    rule: "Nuqta Za (ز) is a non-connector; Nun (نـ) and Dal (ـد) fuse; Gaf (گـ) connects to final Ye (ـی).",
    components: [
      { ur: "ز", hi: "ज़", name: "Ze" },
      { ur: "ن", hi: "न्", name: "Nun" },
      { ur: "द", hi: "द", name: "Dal" },
      { ur: "گ", hi: "ग", name: "Gaf" },
      { ur: "ی", hi: "ी", name: "Choti Ye" }
    ],
    breakdown: [
      { hi: "ज़ि", ur: "ز", sound: "Zin", note: "Non-connector Ze with Zer diacritic" },
      { hi: "न्द", ur: "ند", sound: "da", note: "Dotted Nun tooth connecting into Dal" },
      { hi: "गी", ur: "گی", sound: "gee", note: "Double-barred Gaf attaching to final Choti Ye" }
    ],
    hindiBreakdown: [
      { segment: "ज़िं", formula: "ज़ + ि + ं", matra: "नुक़्ता + इ मात्रा + अनुस्वार", sound: "Zin", note: "Nuqta letter 'ज़' with short 'इ' arch and nasal Anusvara dot" },
      { segment: "द", formula: "द", matra: "अन्तर्निहित स्वर", sound: "da", note: "Base dental consonant" },
      { segment: "गी", formula: "ग + ी", matra: "बड़ी ई की मात्रा (ी)", sound: "gee", note: "Velar stop 'ग' with long 'ई' rightward matra" }
    ]
  },
  {
    hindi: "ख़ुशी",
    urdu: "خوشی",
    translit: "Khushi",
    ipa: "/xʊ.ʃiː/",
    meaning: "Happiness",
    category: "Nuqta",
    rule: "Nuqta Khe (خـ) cascades into silent Vao (و-معدولہ); Shin (شـ) links with 3 dots into Choti Ye (ـی).",
    components: [
      { ur: "خ", hi: "ख़", name: "Khe" },
      { ur: "و", hi: "ु", name: "Vao (silent)" },
      { ur: "ش", hi: "श", name: "Shin" },
      { ur: "ی", hi: "ी", name: "Choti Ye" }
    ],
    breakdown: [
      { hi: "ख़ु", ur: "خو", sound: "Khu", note: "Khe followed by silent historical Persian Vao" },
      { hi: "शी", ur: "شی", sound: "shi", note: "Three-toothed Shin flowing into final Ye" }
    ],
    hindiBreakdown: [
      { segment: "ख़ु", formula: "ख़ + ु", matra: "ह्रस्व उ की मात्रा (ु)", sound: "Khu", note: "Nuqta fricative 'ख़' with bottom 'उ' loop" },
      { segment: "शी", formula: "श + ी", matra: "बड़ी ई की मात्रा (ी)", sound: "shee", note: "Talavya 'श' with rightward long 'ई' matra" }
    ]
  },
  {
    hindi: "सफ़र",
    urdu: "سفر",
    translit: "Safar",
    ipa: "/sə.fəɾ/",
    meaning: "Journey",
    category: "Nuqta",
    rule: "Sin (سـ) links to loop Fe (ـفـ), linking downward into terminal Re (ـر).",
    components: [
      { ur: "س", hi: "स", name: "Sin" },
      { ur: "ف", hi: "फ़", name: "Fe" },
      { ur: "ر", hi: "र", name: "Re" }
    ],
    breakdown: [
      { hi: "स", ur: "سـ", sound: "Sa", note: "Three initial Sin teeth" },
      { hi: "फ़", ur: "ـفـ", sound: "fa", note: "Raised circle head of Fe with single upper dot" },
      { hi: "र", ur: "ـر", sound: "ra", note: "Final descending Re stroke" }
    ],
    hindiBreakdown: [
      { segment: "स", formula: "स", matra: "अन्तर्निहित स्वर", sound: "Sa", note: "Dental sibilant base" },
      { segment: "फ़", formula: "फ़ (फ + नुक़्ता)", matra: "नुक़्ता व्यंजन", sound: "fa", note: "Labiodental fricative formed by adding Nuqta to 'फ'" },
      { segment: "र", formula: "र", matra: "अन्त्य व्यंजन", sound: "ra", note: "Final rhotic consonant" }
    ]
  },
  {
    hindi: "ग़ज़ल",
    urdu: "غزل",
    translit: "Ghazal",
    ipa: "/ɣə.zəl/",
    meaning: "Lyrical Ode",
    category: "Nuqta",
    rule: "Ghain (غـ) with top dot links to Ze (ـز), leaving Lam (ل) detached as Ze is non-connector.",
    components: [
      { ur: "غ", hi: "ग़", name: "Ghain" },
      { ur: "ز", hi: "ज़", name: "Ze" },
      { ur: "ل", hi: "ल", name: "Lam" }
    ],
    breakdown: [
      { hi: "ग़", ur: "غـ", sound: "Gha", note: "Initial Ghain head with single top dot" },
      { hi: "ज़", ur: "ـز", sound: "za", note: "Ze connecting from Ghain, then breaking cursive chain" },
      { hi: "ल", ur: "ل", sound: "l", note: "Isolated Lam with sweeping tail" }
    ],
    hindiBreakdown: [
      { segment: "ग़", formula: "ग़ (ग + नुक़्ता)", matra: "नुक़्ता व्यंजन", sound: "Gha", note: "Voiced uvular fricative /ɣ/ marked by Nuqta dot beneath 'ग'" },
      { segment: "ज़", formula: "ज़ (ज + नुक़्ता)", matra: "नुक़्ता व्यंजन", sound: "za", note: "Voiced alveolar sibilant /z/ marked by Nuqta beneath 'ज'" },
      { segment: "ल", formula: "ल", matra: "अन्त्य व्यंजन", sound: "la", note: "Base lateral consonant" }
    ]
  },
  {
    hindi: "फ़ैसला",
    urdu: "فیصلہ",
    translit: "Faisla",
    ipa: "/fɛːs.laː/",
    meaning: "Decision / Verdict",
    category: "Nuqta",
    rule: "Fe (فـ) links into Ye tooth (ـیـ), cascading into Swad (ـصـ), Lam (ـلـ), ending in short He (ـہ).",
    components: [
      { ur: "ف", hi: "फ़", name: "Fe" },
      { ur: "ی", hi: "ै", name: "Choti Ye" },
      { ur: "ص", hi: "स", name: "Swad" },
      { ur: "ل", hi: "ल", name: "Lam" },
      { ur: "ہ", hi: "ा", name: "Choti He" }
    ],
    breakdown: [
      { hi: "फ़ै", ur: "فیـ", sound: "Fai", note: "Fe loop linked to Ye tooth with two dots below" },
      { hi: "स", ur: "ـصـ", sound: "sa", note: "Arabic emphatic Swad loop linking forward" },
      { hi: "ला", ur: "ـلہ", sound: "la", note: "Lam connecting to final silent He sounding as /aː/" }
    ],
    hindiBreakdown: [
      { segment: "फ़ै", formula: "फ़ + ै", matra: "ऐ की मात्रा (ै)", sound: "Fai", note: "Nuqta consonant 'फ़' with double top horns of 'ऐ' matra" },
      { segment: "स", formula: "स", matra: "अन्तर्निहित स्वर", sound: "sa", note: "Base dental sibilant (represents Arabic Swad)" },
      { segment: "ला", formula: "ल + ा", matra: "आ की मात्रा (ा)", sound: "laa", note: "Lateral 'ल' with vertical 'आ' matra stem" }
    ]
  },
  {
    hindi: "क़रीब",
    urdu: "قریب",
    translit: "Qareeb",
    ipa: "/qə.ɾiːb/",
    meaning: "Near / Close",
    category: "Nuqta",
    rule: "Qaf (قـ) connects into Re (ـر), breaking chain; Ye tooth (یـ) attaches to final Be (ـب).",
    components: [
      { ur: "ق", hi: "क़", name: "Qaf" },
      { ur: "ر", hi: "र", name: "Re" },
      { ur: "ی", hi: "ी", name: "Choti Ye" },
      { ur: "ب", hi: "ब", name: "Be" }
    ],
    breakdown: [
      { hi: "क़", ur: "قر", sound: "Qar", note: "Qaf with two dots linking to downward dipping Re" },
      { hi: "रीब", ur: "یب", sound: "eeb", note: "Choti Ye tooth connecting into full Be basin" }
    ],
    hindiBreakdown: [
      { segment: "क़", formula: "क़ (क + नुक़्ता)", matra: "नुक़्ता व्यंजन", sound: "Qa", note: "Voiceless uvular stop /q/ marked by Nuqta beneath 'क'" },
      { segment: "री", formula: "र + ी", matra: "बड़ी ई की मात्रा (ी)", sound: "ree", note: "Rhotic 'र' with long 'ई' matra stroke" },
      { segment: "ब", formula: "ब", matra: "अन्त्य व्यंजन", sound: "b", note: "Word-final labial stop" }
    ]
  },

  // --- NON-CONNECTORS CATEGORY ---
  {
    hindi: "दरवाज़ा",
    urdu: "دروازہ",
    translit: "Darwaza",
    ipa: "/d̪əɾ.ʋaː.zaː/",
    meaning: "Door",
    category: "Non-Connectors",
    rule: "Classic demonstration of 4 consecutive Non-Connectors (د + ر + و + ا) plus final silent He (ہ = /aː/).",
    components: [
      { ur: "د", hi: "द", name: "Dal" },
      { ur: "ر", hi: "र", name: "Re" },
      { ur: "و", hi: "व", name: "Vao" },
      { ur: "ا", hi: "ा", name: "Alif" },
      { ur: "ز", hi: "ज़", name: "Ze" },
      { ur: "ہ", hi: "ा", name: "Choti He" }
    ],
    breakdown: [
      { hi: "दर", ur: "در", sound: "Dar", note: "Two non-connectors sitting side-by-side without fusion" },
      { hi: "वा", ur: "وا", sound: "wa", note: "Non-connector Vao followed by detached Alif" },
      { hi: "ज़ा", ur: "زہ", sound: "za", note: "Non-connector Ze followed by silent Choti He sounding as /aː/" }
    ],
    hindiBreakdown: [
      { segment: "द", formula: "द", matra: "अन्तर्निहित स्वर", sound: "da", note: "Base dental consonant" },
      { segment: "र", formula: "र", matra: "अन्तर्निहित स्वर", sound: "ra", note: "Base rhotic consonant" },
      { segment: "वा", formula: "व + ा", matra: "आ की मात्रा (ा)", sound: "waa", note: "Semivowel 'व' with vertical 'आ' matra" },
      { segment: "ज़ा", formula: "ज़ + ा", matra: "आ की मात्रा (ा)", sound: "zaa", note: "Nuqta sibilant 'ज़' with vertical 'आ' matra" }
    ]
  },
  {
    hindi: "आवाज़",
    urdu: "آواز",
    translit: "Aawaaz",
    ipa: "/aː.ʋaːz/",
    meaning: "Voice / Sound",
    category: "Non-Connectors",
    rule: "Composed entirely of Non-Connectors: Alif Madd (آ) + Vao (و) + Alif (ا) + Ze (ز). Not a single letter connects!",
    components: [
      { ur: "آ", hi: "आ", name: "Alif Madd" },
      { ur: "و", hi: "व", name: "Vao" },
      { ur: "ا", hi: "ा", name: "Alif" },
      { ur: "ز", hi: "ज़", name: "Ze" }
    ],
    breakdown: [
      { hi: "आ", ur: "آ", sound: "Aa", note: "Independent initial Alif Madd" },
      { hi: "वा", ur: "وا", sound: "waa", note: "Detached Vao followed by detached Alif" },
      { hi: "ज़", ur: "ز", sound: "z", note: "Detached Ze completing the 4 non-connector sequence" }
    ],
    hindiBreakdown: [
      { segment: "आ", formula: "आ (स्वतंत्र स्वर)", matra: "दीर्घ स्वर", sound: "Aa", note: "Full independent long vowel 'आ'" },
      { segment: "वा", formula: "व + ा", matra: "आ की मात्रा (ा)", sound: "waa", note: "Semivowel 'व' with 'आ' vertical matra" },
      { segment: "ज़", formula: "ज़ (ज + नुक़्ता)", matra: "नुक़्ता व्यंजन", sound: "z", note: "Voiced sibilant Nuqta consonant" }
    ]
  },
  {
    hindi: "आज़ादी",
    urdu: "آزادی",
    translit: "Aazaadi",
    ipa: "/aː.zaː.d̪iː/",
    meaning: "Freedom / Liberty",
    category: "Non-Connectors",
    rule: "Four consecutive Non-Connectors (آ + ز + ا + د) followed by final Choti Ye (ی).",
    components: [
      { ur: "آ", hi: "आ", name: "Alif Madd" },
      { ur: "ز", hi: "ज़", name: "Ze" },
      { ur: "ا", hi: "ा", name: "Alif" },
      { ur: "د", hi: "द", name: "Dal" },
      { ur: "ی", hi: "ी", name: "Choti Ye" }
    ],
    breakdown: [
      { hi: "आ", ur: "آ", sound: "Aa", note: "Initial long Alif Madd" },
      { hi: "ज़ा", ur: "زا", sound: "zaa", note: "Non-connector Ze with detached Alif" },
      { hi: "दी", ur: "دی", sound: "dee", note: "Non-connector Dal with detached final Choti Ye" }
    ],
    hindiBreakdown: [
      { segment: "आ", formula: "आ (स्वतंत्र स्वर)", matra: "दीर्घ स्वर", sound: "Aa", note: "Independent initial vowel 'आ'" },
      { segment: "ज़ा", formula: "ज़ + ा", matra: "आ की मात्रा (ा)", sound: "zaa", note: "Nuqta 'ज़' with 'आ' matra" },
      { segment: "दी", formula: "द + ी", matra: "बड़ी ई की मात्रा (ी)", sound: "dee", note: "Dental 'द' with long 'ई' matra stroke" }
    ]
  },
  {
    hindi: "रास्ता",
    urdu: "راستہ",
    translit: "Raasta",
    ipa: "/ɾaːs.t̪aː/",
    meaning: "Pathway / Road",
    category: "Non-Connectors",
    rule: "Re (ر) and Alif (ا) are non-connectors; Sin (سـ) connects directly into Te (ـتـ), ending with He (ـہ = /aː/).",
    components: [
      { ur: "ر", hi: "र", name: "Re" },
      { ur: "ا", hi: "ा", name: "Alif" },
      { ur: "س", hi: "स्", name: "Sin" },
      { ur: "त", hi: "त", name: "Te" },
      { ur: "ہ", hi: "ा", name: "Choti He" }
    ],
    breakdown: [
      { hi: "रा", ur: "را", sound: "Raa", note: "Two detached non-connectors Re and Alif" },
      { hi: "स्ता", ur: "ستہ", sound: "staa", note: "Sin teeth connecting to Te and final silent He" }
    ],
    hindiBreakdown: [
      { segment: "रा", formula: "र + ा", matra: "आ की मात्रा (ा)", sound: "Raa", note: "Rhotic 'र' with vertical 'आ' matra" },
      { segment: "स्त", formula: "स् (आधा स) + त", matra: "हलंत संयुक्ताक्षर", sound: "sta", note: "Half 'स' fused with dental 'त'" },
      { segment: "ता", formula: "त + ा", matra: "आ की मात्रा (ा)", sound: "taa", note: "Dental 'त' extended with vertical 'आ' matra" }
    ]
  },

  // --- LIGATURES CATEGORY ---
  {
    hindi: "मोहब्बत",
    urdu: "محبت",
    translit: "Mohabbat",
    ipa: "/mʊ.ɦəb.bət̪/",
    meaning: "Love",
    category: "Ligatures",
    rule: "Mim (مـ) ascends and cascades into Badi He (ـحـ), followed by Be with Tashdeed (بّ) for doubled 'bb'.",
    components: [
      { ur: "م", hi: "म", name: "Mim" },
      { ur: "ح", hi: "ह", name: "Badi He" },
      { ur: "ب", hi: "ब्ब", name: "Be (ّ)" },
      { ur: "त", hi: "त", name: "Te" }
    ],
    breakdown: [
      { hi: "मो", ur: "مـ", sound: "Mo", note: "Initial high-hanging Mim loop" },
      { hi: "ह", ur: "ـحـ", sound: "hab", note: "Cascading Badi He connecting downward" },
      { hi: "ब्ब", ur: "ـبّـ", sound: "ba", note: "Be with Tashdeed mark indicating doubled consonant" },
      { hi: "त", ur: "ـت", sound: "at", note: "Final shallow basin Te completing the ligature" }
    ],
    hindiBreakdown: [
      { segment: "मो", formula: "म + ो", matra: "ओ की मात्रा (ो)", sound: "Mo", note: "Labial 'म' with 'ओ' matra sign" },
      { segment: "ह", formula: "ह", matra: "अन्तर्निहित स्वर", sound: "ha", note: "Base glottal consonant (maps to Badi He in Arabic roots)" },
      { segment: "ब्ब", formula: "ब् + ब", matra: "द्वित्व व्यंजन (Tashdeed)", sound: "bba", note: "Doubled 'ब' consonant corresponding to Arabic Tashdeed (ّ)" },
      { segment: "त", formula: "त", matra: "अन्त्य व्यंजन", sound: "t", note: "Final dental stop" }
    ]
  },
  {
    hindi: "चाँदनी",
    urdu: "چاندنی",
    translit: "Chandni",
    ipa: "/tʃaːnd̪.niː/",
    meaning: "Moonlight",
    category: "Ligatures",
    rule: "Che (چـ) + Alif; Medial Nun (نـ) gives nasal vowel before Dal (ـد); Nun + Ye (نی) ends.",
    components: [
      { ur: "چ", hi: "च", name: "Che" },
      { ur: "ا", hi: "ा", name: "Alif" },
      { ur: "ن", hi: "ँ", name: "Nun (nasal)" },
      { ur: "د", hi: "द", name: "Dal" },
      { ur: "ن", hi: "न", name: "Nun" },
      { ur: "ی", hi: "ी", name: "Choti Ye" }
    ],
    breakdown: [
      { hi: "चाँ", ur: "چان", sound: "Chaan", note: "Che linked to Alif, with dotted Nun acting as Chandrabindu" },
      { hi: "द", ur: "ـد", sound: "da", note: "Dal attached to Nun, stopping the connection" },
      { hi: "नी", ur: "نی", sound: "nee", note: "Fresh initial Nun connecting to final Choti Ye" }
    ],
    hindiBreakdown: [
      { segment: "चाँ", formula: "च + ा + ँ", matra: "आ मात्रा + चंद्रबिंदु (ँ)", sound: "Chaan", note: "Palatal 'च' with 'आ' matra topped by true nasal Chandrabindu" },
      { segment: "द", formula: "द", matra: "अन्तर्निहित स्वर", sound: "da", note: "Base dental consonant" },
      { segment: "नी", formula: "न + ी", matra: "बड़ी ई की मात्रा (ी)", sound: "nee", note: "Dental nasal 'न' with long 'ई' matra stroke" }
    ]
  },
  {
    hindi: "तकलीफ़",
    urdu: "تکلیف",
    translit: "Takleef",
    ipa: "/t̪ək.liːf/",
    meaning: "Trouble / Hardship",
    category: "Ligatures",
    rule: "Te (تـ) links to diagonal Kaf (ـکـ), which cascades directly into tall Lam (ـلـ) and Ye (ـیـ), ending with Fe (ـف).",
    components: [
      { ur: "ت", hi: "त", name: "Te" },
      { ur: "ک", hi: "क्", name: "Kaf" },
      { ur: "ل", hi: "ल", name: "Lam" },
      { ur: "ی", hi: "ी", name: "Choti Ye" },
      { ur: "ف", hi: "फ़", name: "Fe" }
    ],
    breakdown: [
      { hi: "तक", ur: "تکـ", sound: "Tak", note: "Initial Te tooth flowing into slanted Kaf diagonal" },
      { hi: "ली", ur: "ـلیـ", sound: "lee", note: "Cascading Lam linking downwards to Ye tooth" },
      { hi: "फ़", ur: "ـف", sound: "f", note: "Terminal Fe with single dot" }
    ],
    hindiBreakdown: [
      { segment: "त", formula: "त", matra: "अन्तर्निहित स्वर", sound: "ta", note: "Base dental consonant" },
      { segment: "क्ली", formula: "क् + ल + ी", matra: "संयुक्ताक्षर + ई मात्रा", sound: "klee", note: "Half 'क' conjunct with 'ल' and long 'ई' matra" },
      { segment: "फ़", formula: "फ़ (फ + नुक़्ता)", matra: "नुक़्ता व्यंजन", sound: "f", note: "Final labiodental fricative" }
    ]
  },
  {
    hindi: "हिम्मत",
    urdu: "ہمت",
    translit: "Himmat",
    ipa: "/ɦɪm.mət̪/",
    meaning: "Courage / Determination",
    category: "Ligatures",
    rule: "Hooked He (ہـ) cascades into loop Mim with Tashdeed (ـمّـ), ending in shallow basin Te (ـت).",
    components: [
      { ur: "ہ", hi: "ह", name: "Chhoti He" },
      { ur: "م", hi: "म्म", name: "Mim (ّ)" },
      { ur: "ت", hi: "त", name: "Te" }
    ],
    breakdown: [
      { hi: "हि", ur: "ہـ", sound: "Hi", note: "Chhoti He hook with implicit Zer vowel" },
      { hi: "म्म", ur: "ـمّـ", sound: "mma", note: "Medial Mim with Tashdeed doubled consonant mark" },
      { hi: "त", ur: "ـت", sound: "t", note: "Final dental Te basin" }
    ],
    hindiBreakdown: [
      { segment: "हि", formula: "ह + ि", matra: "छोटी इ की मात्रा (ि)", sound: "Hi", note: "Glottal 'ह' with short 'इ' arch" },
      { segment: "म्म", formula: "म् + म", matra: "द्वित्व व्यंजन", sound: "mma", note: "Doubled labial nasal 'म' consonant" },
      { segment: "त", formula: "त", matra: "अन्त्य व्यंजन", sound: "t", note: "Final dental stop" }
    ]
  },
  {
    hindi: "क़ुदरत",
    urdu: "قدرت",
    translit: "Qudrat",
    ipa: "/qʊd̪.ɾət̪/",
    meaning: "Nature / Divine Power",
    category: "Ligatures",
    rule: "Initial Qaf (قـ) loops into attached Dal (ـد), which breaks the chain; Re (ر) and Te (ت) sit independently.",
    components: [
      { ur: "ق", hi: "क़", name: "Qaf" },
      { ur: "د", hi: "द", name: "Dal" },
      { ur: "ر", hi: "र", name: "Re" },
      { ur: "ت", hi: "त", name: "Te" }
    ],
    breakdown: [
      { hi: "क़ुद", ur: "قد", sound: "Qud", note: "Qaf loop connecting into Dal" },
      { hi: "रत", ur: "رت", sound: "rat", note: "Detached Re followed by separate Te" }
    ],
    hindiBreakdown: [
      { segment: "क़ु", formula: "क़ + ु", matra: "ह्रस्व उ की मात्रा (ु)", sound: "Qu", note: "Uvular 'क़' with short 'उ' bottom loop" },
      { segment: "द", formula: "द", matra: "अन्तर्निहित स्वर", sound: "da", note: "Base dental stop" },
      { segment: "र", formula: "र", matra: "अन्तर्निहित स्वर", sound: "ra", note: "Base rhotic consonant" },
      { segment: "त", formula: "त", matra: "अन्त्य व्यंजन", sound: "t", note: "Final dental stop" }
    ]
  },

  // --- ASPIRATION CATEGORY ---
  {
    hindi: "घर",
    urdu: "گھر",
    translit: "Ghar",
    ipa: "/ɡʱəɾ/",
    meaning: "Home / House",
    category: "Aspiration",
    rule: "Gaf (گـ) fuses with Do-chashmī He (ـھـ) to forge the aspirated 'Gh' (घ), connecting into Re (ـر).",
    components: [
      { ur: "گ", hi: "ग", name: "Gaf" },
      { ur: "ھ", hi: "ह", name: "Do-chashmi He" },
      { ur: "ر", hi: "र", name: "Re" }
    ],
    breakdown: [
      { hi: "घ", ur: "گھـ", sound: "Gha", note: "Gaf coupled with two-eyed Do-chashmi He for aspiration" },
      { hi: "र", ur: "ـر", sound: "ra", note: "Re dipping downward from the aspirated ligature" }
    ],
    hindiBreakdown: [
      { segment: "घ", formula: "घ (महाप्राण ग)", matra: "महाप्राण वर्ण", sound: "Gha", note: "Single Devanagari aspirated consonant /ɡʱ/ (Ka-varga 4th letter)" },
      { segment: "र", formula: "र", matra: "अन्त्य व्यंजन", sound: "ra", note: "Final rhotic consonant" }
    ]
  },
  {
    hindi: "आँख",
    urdu: "آنکھ",
    translit: "Aankh",
    ipa: "/aːŋkʰ/",
    meaning: "Eye",
    category: "Aspiration",
    rule: "Alif Madd (آ); Nun tooth (نـ) precedes aspirated Kaf ligature (ک + ھ = کھ).",
    components: [
      { ur: "آ", hi: "आ", name: "Alif Madd" },
      { ur: "ن", hi: "ँ", name: "Nun" },
      { ur: "ک", hi: "क", name: "Kaf" },
      { ur: "ھ", hi: "ह", name: "Do-chashmi He" }
    ],
    breakdown: [
      { hi: "आँ", ur: "آنـ", sound: "Aan", note: "Long Alif Madd with medial nasal Nun" },
      { hi: "ख", ur: "ـکھ", sound: "kha", note: "Kaf connected to Do-chashmi He for Sanskrit Mahaprana 'Kha'" }
    ],
    hindiBreakdown: [
      { segment: "आँ", formula: "आ + ँ", matra: "चंद्रबिंदु (ँ)", sound: "Aan", note: "Long vowel 'आ' topped with nasal Chandrabindu" },
      { segment: "ख", formula: "ख (महाप्राण क)", matra: "महाप्राण वर्ण", sound: "kha", note: "Single Devanagari aspirated consonant /kʰ/ (Ka-varga 2nd letter)" }
    ]
  },
  {
    hindi: "भरोसा",
    urdu: "بھروسہ",
    translit: "Bharosa",
    ipa: "/bʱə.ɾoː.saː/",
    meaning: "Trust / Reliance",
    category: "Aspiration",
    rule: "Aspirated Be (ب + ھ = بھـ) connects into Re (ـر); Vao (و) is non-connector; Sin (سـ) links to final He (ـہ).",
    components: [
      { ur: "ب", hi: "ब", name: "Be" },
      { ur: "ھ", hi: "ह", name: "Do-chashmi He" },
      { ur: "ر", hi: "र", name: "Re" },
      { ur: "و", hi: "ो", name: "Vao" },
      { ur: "س", hi: "स", name: "Sin" },
      { ur: "ہ", hi: "ा", name: "Choti He" }
    ],
    breakdown: [
      { hi: "भर", ur: "بھر", sound: "Bhar", note: "Be + Do-chashmi He aspirated Bha linked into Re" },
      { hi: "रो", ur: "رو", sound: "ro", note: "Re with detached Vao" },
      { hi: "सा", ur: "سہ", sound: "saa", note: "Sin tooth linking to final silent He sounding /aː/" }
    ],
    hindiBreakdown: [
      { segment: "भ", formula: "भ (महाप्राण ब)", matra: "महाप्राण वर्ण", sound: "Bha", note: "Single Devanagari aspirated labial stop /bʱ/" },
      { segment: "रो", formula: "र + ो", matra: "ओ की मात्रा (ो)", sound: "ro", note: "Rhotic 'र' with 'ओ' matra" },
      { segment: "सा", formula: "स + ा", matra: "आ की मात्रा (ा)", sound: "saa", note: "Dental sibilant 'स' with 'आ' matra" }
    ]
  },
  {
    hindi: "थाली",
    urdu: "تھالی",
    translit: "Thaali",
    ipa: "/t̪ʰaː.liː/",
    meaning: "Plate / Platter",
    category: "Aspiration",
    rule: "Aspirated Te (ت + ھ = تھـ) ascends directly into Alif (ـا); Lam (لـ) connects into Choti Ye (ـی).",
    components: [
      { ur: "ت", hi: "त", name: "Te" },
      { ur: "ھ", hi: "ह", name: "Do-chashmi He" },
      { ur: "ا", hi: "ा", name: "Alif" },
      { ur: "ل", hi: "ल", name: "Lam" },
      { ur: "ی", hi: "ी", name: "Choti Ye" }
    ],
    breakdown: [
      { hi: "था", ur: "تھا", sound: "Thaa", note: "Te + Do-chashmi He rising straight into vertical Alif" },
      { hi: "ली", ur: "لی", sound: "lee", note: "High Lam loop curving into final Choti Ye" }
    ],
    hindiBreakdown: [
      { segment: "था", formula: "थ + ा", matra: "आ की मात्रा (ा)", sound: "Thaa", note: "Devanagari aspirated dental 'थ' with vertical 'आ' matra" },
      { segment: "ली", formula: "ल + ी", matra: "बड़ी ई की मात्रा (ी)", sound: "lee", note: "Lateral 'ल' with long 'ई' matra stroke" }
    ]
  },
  {
    hindi: "फूल",
    urdu: "پھول",
    translit: "Phool",
    ipa: "/pʰuːl/",
    meaning: "Flower",
    category: "Aspiration",
    rule: "Aspirated Pe (پ + ھ = پھـ) links to Vao (ـو) for long 'oo'; final Lam (ل) remains detached.",
    components: [
      { ur: "پ", hi: "प", name: "Pe" },
      { ur: "ھ", hi: "ह", name: "Do-chashmi He" },
      { ur: "و", hi: "ू", name: "Vao" },
      { ur: "ل", hi: "ल", name: "Lam" }
    ],
    breakdown: [
      { hi: "फू", ur: "پھو", sound: "Phoo", note: "Pe + Do-chashmi He aspirated Pha connected to long vowel Vao" },
      { hi: "ल", ur: "ل", sound: "l", note: "Isolated Lam after non-connector Vao" }
    ],
    hindiBreakdown: [
      { segment: "फू", formula: "फ + ू", matra: "दीर्घ ऊ की मात्रा (ू)", sound: "Phoo", note: "Aspirated labial 'फ' with long 'ऊ' bottom tail" },
      { segment: "ल", formula: "ल", matra: "अन्त्य व्यंजन", sound: "l", note: "Base lateral consonant" }
    ]
  },

  // --- POETRY CATEGORY ---
  {
    hindi: "शायरी",
    urdu: "شاعری",
    translit: "Shayari",
    ipa: "/ʃaː.ɪ.ɾiː/",
    meaning: "Poetry",
    category: "Poetry",
    rule: "Shin (شـ) + Alif; Ain (ع) provides vocalic break; Re (ر) + Choti Ye (ی) finish the musical word.",
    components: [
      { ur: "ش", hi: "श", name: "Shin" },
      { ur: "ا", hi: "ा", name: "Alif" },
      { ur: "ع", hi: "अ", name: "Ain" },
      { ur: "ر", hi: "र", name: "Re" },
      { ur: "ی", hi: "ी", name: "Choti Ye" }
    ],
    breakdown: [
      { hi: "शा", ur: "شا", sound: "Shaa", note: "Initial Shin linked to tall Alif" },
      { hi: "य", ur: "ع", sound: "yi", note: "Arabic Ain providing etymological syllable break" },
      { hi: "री", ur: "ری", sound: "ree", note: "Detached Re followed by final flowing Choti Ye" }
    ],
    hindiBreakdown: [
      { segment: "शा", formula: "श + ा", matra: "आ की मात्रा (ा)", sound: "Shaa", note: "Talavya 'श' with vertical 'आ' matra" },
      { segment: "य", formula: "य (अ / ऐन)", matra: "अन्तर्निहित स्वर", sound: "ya", note: "Corresponds to Arabic Ain vocalic syllable break" },
      { segment: "री", formula: "र + ी", matra: "बड़ी ई की मात्रा (ी)", sound: "ree", note: "Rhotic 'र' with long 'ई' matra stroke" }
    ]
  },
  {
    hindi: "इश्क़",
    urdu: "عشق",
    translit: "Ishq",
    ipa: "/ɪʃq/",
    meaning: "Passionate Love",
    category: "Poetry",
    rule: "Initial Ain (عـ) with Zer links into three-toothed Shin (ـشـ), ending with deep basin Qaf (ـق).",
    components: [
      { ur: "ع", hi: "इ", name: "Ain" },
      { ur: "ش", hi: "श्", name: "Shin" },
      { ur: "ق", hi: "क़", name: "Qaf" }
    ],
    breakdown: [
      { hi: "इ", ur: "عـ", sound: "I", note: "Initial Ain crescent head acting as vowel carrier for /ɪ/" },
      { hi: "श्क़", ur: "ـشق", sound: "shq", note: "Shin teeth flowing seamlessly into two-dotted Qaf basin" }
    ],
    hindiBreakdown: [
      { segment: "इ", formula: "इ (स्वतंत्र स्वर)", matra: "ह्रस्व स्वर", sound: "I", note: "Initial independent short vowel 'इ' (Urdu uses initial Ain ع)" },
      { segment: "श्क़", formula: "श् + क़", matra: "हलंत संयुक्ताक्षर + नुक़्ता", sound: "shq", note: "Half 'श' fused with uvular Nuqta stop 'क़'" }
    ]
  },
  {
    hindi: "जुस्तजू",
    urdu: "جستجو",
    translit: "Justaju",
    ipa: "/d͡ʒʊs.t̪ə.d͡ʒuː/",
    meaning: "Quest / Persistent Search",
    category: "Poetry",
    rule: "Jim (جـ) joins Sin (ـسـ) and Te (ـतـ); fresh Jim (جـ) connects to non-connector Vao (ـو).",
    components: [
      { ur: "ج", hi: "ज", name: "Jim" },
      { ur: "س", hi: "स्", name: "Sin" },
      { ur: "त", hi: "त", name: "Te" },
      { ur: "ج", hi: "ज", name: "Jim" },
      { ur: "و", hi: "ू", name: "Vao" }
    ],
    breakdown: [
      { hi: "जुस्त", ur: "جستـ", sound: "Just", note: "High Jim wave connecting into Sin teeth and Te tooth" },
      { hi: "जू", ur: "ـجو", sound: "joo", note: "Second Jim linking directly into long vowel Vao" }
    ],
    hindiBreakdown: [
      { segment: "जु", formula: "ज + ु", matra: "ह्रस्व उ की मात्रा (ु)", sound: "Ju", note: "Palatal 'ज' with short 'उ' bottom loop" },
      { segment: "स्त", formula: "स् + त", matra: "हलंत संयुक्ताक्षर", sound: "sta", note: "Half 'स' fused with dental 'त'" },
      { segment: "जू", formula: "ज + ू", matra: "दीर्घ ऊ की मात्रा (ू)", sound: "joo", note: "Palatal 'ज' with long 'ऊ' tail" }
    ]
  },
  {
    hindi: "उम्मीद",
    urdu: "امید",
    translit: "Ummeed",
    ipa: "/ʊm.miːd̪/",
    meaning: "Hope / Expectation",
    category: "Poetry",
    rule: "Alif (ا) with Pesh; Mim (مـ) links into Choti Ye (ـیـ), which attaches to final non-connector Dal (ـد).",
    components: [
      { ur: "ا", hi: "उ", name: "Alif" },
      { ur: "م", hi: "म्म", name: "Mim" },
      { ur: "ی", hi: "ी", name: "Choti Ye" },
      { ur: "د", hi: "द", name: "Dal" }
    ],
    breakdown: [
      { hi: "उ", ur: "ا", sound: "Um", note: "Isolated Alif vowel carrier with Pesh" },
      { hi: "मीद", ur: "مید", sound: "meed", note: "Mim loop connected through Ye tooth into final Dal" }
    ],
    hindiBreakdown: [
      { segment: "उ", formula: "उ (स्वतंत्र स्वर)", matra: "ह्रस्व स्वर", sound: "U", note: "Independent initial short vowel 'उ'" },
      { segment: "म्मी", formula: "म् + म + ी", matra: "द्वित्व व्यंजन + ई मात्रा", sound: "mmee", note: "Doubled 'म' with rightward long 'ई' matra stroke" },
      { segment: "द", formula: "द", matra: "अन्त्य व्यंजन", sound: "d", note: "Final dental stop" }
    ]
  }
];
