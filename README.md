# AksharNama (अक्षरनामा | اکشر نامہ)

<img width="2752" height="1536" alt="CoverImg" src="https://github.com/user-attachments/assets/46124ecc-81c1-43ee-a1c0-c20c1b656df9" />

Hindi and Urdu share deep linguistic roots. They have a closely related grammatical structure, extensive everyday vocabulary, and a rich collection of shared cultural expressions. In spoken communication, speakers of both languages can often understand one another with little difficulty.

One of the most visible distinctions, however, is their writing systems: **Devanagari**, written from left to right, and **Urdu Nastaliq**, traditionally written from right to left.

**AksharNama** is an interactive script-learning platform designed to make the transition between these writing systems easier. Rather than teaching an entirely new language, it focuses on helping learners recognize, understand, read, and practice the scripts using sounds and vocabulary they may already know.

---

## Features

### 1. Two-Way Phonetic Alphabet Explorer

Explore the relationship between Hindi and Urdu characters through a structured, interactive alphabet grid.

- Switch between **Hindi → Urdu** and **Urdu → Hindi** modes.
- Explore characters organized by phonetic categories, including vowels, stops, fricatives, nasals, aspirated consonants, and Nuqta-based sounds.
- Select individual characters to view their detailed profiles.
- Access IPA pronunciation, Roman transliteration, phonetic information, and example vocabulary in both scripts.

<!-- ![Alphabet Grid Explorer](docs/screenshots/alphabet-grid.png) -->

### 2. Interactive Calligraphy Whiteboard

A dedicated writing canvas for practicing the visual structure and stroke patterns of both scripts.

- **Calligraphic Qalam:** An angled, chisel-style pen simulation designed to approximate the thick and thin strokes associated with traditional script writing.
- **Script-specific Guidelines:**
  - Urdu Nastaliq slope guides (Khatt) for writing alignment.
  - Devanagari Shirorekha guides for practicing the characteristic horizontal headline.
- **Character Tracing:** Faint reference outlines help learners follow the structure of individual characters.
- **Practice Controls:** Adjustable stroke width and opacity, undo and redo, canvas clearing, and image export.

<!-- ![Whiteboard Tracing Demo](docs/screenshots/whiteboard-canvas.gif) -->

### 3. Word Bridge and Urdu Letter Breakdown

Understand how individual characters combine to form complete words, with particular emphasis on the connected nature of Urdu writing.

- Enter or select a word to explore its Urdu representation.
- Examine how characters connect and change shape according to their position: isolated, initial, medial, and final.
- View the constituent letters of a connected Urdu word.
- Compare the corresponding Devanagari representation alongside the Urdu breakdown.

This feature helps learners move beyond recognizing individual characters and develop an understanding of how complete words are constructed.

<!-- ![Word Bridge Breakdown](docs/screenshots/word-bridge.png) -->

### 4. Interactive Script Quiz

Practice character recognition and vocabulary through interactive exercises.

- **Character Recognition:** Identify individual characters across both scripts.
- **Vocabulary Practice:** Test recognition of complete words.
- **Instant Feedback:** Receive immediate verification with relevant linguistic explanations.
- **Progress Tracking:** Monitor accuracy, maintain consecutive correct-answer streaks, and track personal bests.
- **Standard Orthography:** Practice sets focus on standard character recognition rather than treating positional forms as independent alphabet entries.

<!-- ![Script Quiz](docs/screenshots/quiz-view.png) -->

### 5. Numerals and Linguistic Reference Guides

A dedicated reference section covering numeral systems and important concepts that distinguish the two writing traditions.

**Numeral Comparison**

Compare Devanagari, Eastern Arabic-Indic, and Latin numerals side by side, with support for digits 0–9.

**Linguistic Reference Guides**

- **Aspiration (Mahaprana):** Understand how aspirated Hindi consonants such as `ख`, `घ`, `छ`, and `झ` are represented in Urdu, including the use of Do-chashmi He (`ھ`).
- **Nuqta:** Explore how the Nuqta distinguishes several Perso-Arabic-derived sounds from their closely related Indic counterparts, such as `क` and `क़`, `ज` and `ज़`, or `फ` and `फ़`.
- **Homophones (Mushtarak Alfaz):** Understand why Urdu may use multiple characters for similar or identical pronunciations, such as `ت` and `ط` for *ta*, or `س`, `ص`, and `ث` for *sa*.

---

## Technology Stack

| Component | Technologies |
|---|---|
| Frontend | React 18 |
| Build Tool | Vite |
| Styling | Tailwind CSS, DaisyUI |
| Icons | Lucide React |
| Drawing Engine | HTML5 Canvas 2D API |
| Typography | Noto Nastaliq Urdu, Gulzar, Amiri, Noto Sans Devanagari, Tiro Devanagari Hindi |
| Deployment | GitHub Pages |
| CI/CD | GitHub Actions |

### Canvas Implementation

The whiteboard uses the HTML5 Canvas 2D API with custom Bézier-based stroke smoothing and velocity-aware rendering to approximate calligraphic writing characteristics.

---

## Getting Started

Follow these steps to run AksharNama locally.

### Prerequisites

- Node.js (LTS recommended)
- npm
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
```

**2. Navigate to the project directory**

```bash
cd <your-repo-name>
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

To generate an optimized production build:

```bash
npm run build
```

The generated files will be available in the `dist/` directory.

---

## Contributing

Contributions that improve the platform's functionality, linguistic accuracy, accessibility, and learning experience are welcome.

Areas where contributions are particularly valuable include:

- Linguistic corrections and improvements to character mappings.
- Additional vocabulary and pronunciation references.
- Improvements to writing and tracing functionality.
- Typography, rendering, and cross-device compatibility.
- Bug fixes and usability improvements.

To contribute, open an issue to discuss a proposed change or submit a pull request with a description of your improvements.

---

## License

Please refer to the repository's license file for usage and distribution terms.
