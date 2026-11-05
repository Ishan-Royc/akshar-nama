import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Trophy, 
  Flame,
  ArrowRight,
  BookOpen,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LEARNING_ENTRIES, VOCABULARY_BRIDGE } from '../data/alphabetData';

// Map of multiple phonetically valid equivalents between scripts
const MULTI_EQUIVALENTS = {
  // Hindi sound -> all valid Urdu spellings
  'त': ['ت', 'ط'],
  'स': ['س', 'ص', 'ث'],
  'ज़': ['ز', 'ذ', 'ض', 'ظ'],
  'ह': ['ہ', 'ح'],
  'अ': ['ا', 'ع'],
  'आ': ['آ', 'ا'],
  'क': ['ک'],
  'क़': ['ق'],
  'ख़': ['خ'],
  'ग़': ['غ'],
  'फ़': ['ف'],
  'ड़': ['ڑ'],
  'ढ़': ['ڑھ'],
  'ष': ['ش', 'س'],
  // Urdu letter -> all valid Hindi equivalents
  'ت': ['त'],
  'ط': ['त'],
  'س': ['स'],
  'ص': ['स'],
  'ث': ['स'],
  'ش': ['श', 'ष'],
  'ز': ['ज़'],
  'ذ': ['ज़', 'ज'],
  'ض': ['ज़', 'ज'],
  'ظ': ['ज़', 'ज'],
  'ہ': ['ह'],
  'ح': ['ह', 'ह़'],
  'ا': ['अ', 'आ'],
  'آ': ['आ'],
  'ع': ['अ', 'आ', 'ए'],
  'ق': ['क़', 'क'],
  'خ': ['ख़', 'ख'],
  'ग़': ['ग़', 'ग'],
  'ف': ['फ़', 'फ'],
  'ڑ': ['ड़'],
  'ڑھ': ['ढ़']
};

export default function ScriptQuiz({ currentPath, onOpenWhiteboard }) {
  const isHindiToUrdu = currentPath === 'hindi-to-urdu';

  // Mode state: 'letters' (Alphabet characters) | 'words' (Whole vocabulary words)
  const [drillMode, setDrillMode] = useState('letters');
  const [questionCount, setQuestionCount] = useState(15);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizSeed, setQuizSeed] = useState(0);

  // Generate randomized questions based on selected mode (Letters vs Whole Words)
  const questions = useMemo(() => {
    const askForUrdu = isHindiToUrdu;

    if (drillMode === 'words') {
      // Whole Words Quiz: pulls from curated VOCABULARY_BRIDGE
      const validWords = (VOCABULARY_BRIDGE || []).filter(w => w.hindi && w.urdu);
      const shuffled = [...validWords].sort(() => 0.5 - Math.random()).slice(0, Math.min(questionCount, validWords.length));

      return shuffled.map((item) => {
        const questionPrompt = askForUrdu
          ? `What is the Urdu (Nastaliq) spelling of:`
          : `What is the Hindi (Devanagari) spelling of:`;

        const promptText = askForUrdu ? item.hindi : item.urdu;
        const promptFont = askForUrdu ? 'font-devanagari' : 'font-nastaliq';

        const primaryAnswer = askForUrdu ? item.urdu : item.hindi;
        const answerFont = askForUrdu ? 'font-nastaliq' : 'font-devanagari';
        const validAnswers = [primaryAnswer];

        // Pick 3 distractors from the rest of the vocabulary pool
        const allTargetWords = validWords
          .map(w => (askForUrdu ? w.urdu : w.hindi))
          .filter(w => w !== primaryAnswer);
        const uniqueDistractors = Array.from(new Set(allTargetWords)).sort(() => 0.5 - Math.random()).slice(0, 3);
        const options = [primaryAnswer, ...uniqueDistractors].sort(() => 0.5 - Math.random());

        return {
          id: item.translit || item.hindi,
          mode: 'words',
          questionPrompt,
          promptText,
          promptFont,
          primaryAnswer,
          validAnswers,
          answerFont,
          options,
          translit: item.translit,
          meaning: item.meaning,
          notes: item.rule || `${item.translit} ("${item.meaning}")`,
        };
      });
    }

    // Letters Quiz: pulls from LEARNING_ENTRIES, strictly excluding isolated Do-chashmi He
    const pool = LEARNING_ENTRIES.filter(
      (e) => e.urduChar && e.urduChar !== '—' && e.hindiChar && e.hindiChar !== '—' && e.urduChar !== 'ھ' && e.id !== 'h-do-chashmi-he'
    );
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, questionCount);

    return shuffled.map((item) => {
      const questionPrompt = askForUrdu
        ? `What is the Urdu (Nastaliq) equivalent of:`
        : `What is the Hindi (Devanagari) equivalent of:`;

      const promptText = askForUrdu ? item.hindiChar : item.urduChar;
      const promptFont = askForUrdu ? 'font-devanagari' : 'font-nastaliq';

      const primaryAnswer = askForUrdu ? item.urduChar : item.hindiChar;
      const answerFont = askForUrdu ? 'font-nastaliq' : 'font-devanagari';

      const equivalentList = (MULTI_EQUIVALENTS[promptText] || []).filter(c => c !== 'ھ');
      const validAnswers = Array.from(new Set([primaryAnswer, ...equivalentList])).filter(c => c !== 'ھ');

      const allTargetChars = pool
        .map((d) => (askForUrdu ? d.urduChar : d.hindiChar))
        .filter((c) => c !== 'ھ' && c !== '—');
      const distractorPool = allTargetChars.filter((c) => !validAnswers.includes(c));
      const uniqueDistractors = Array.from(new Set(distractorPool)).sort(() => 0.5 - Math.random()).slice(0, 3);
      const options = [primaryAnswer, ...uniqueDistractors].sort(() => 0.5 - Math.random());

      return {
        id: item.id,
        mode: 'letters',
        letterData: item,
        questionPrompt,
        promptText,
        promptFont,
        primaryAnswer,
        validAnswers,
        answerFont,
        options,
        translit: item.romanTranslit,
        meaning: item.sampleWords?.meaning || '',
        notes: item.linguisticNotes?.summary || item.linguisticNotes?.rule || '',
      };
    });
  }, [currentPath, drillMode, questionCount, quizFinished, quizSeed, isHindiToUrdu]);

  const currentQ = questions[currentQuestionIndex];

  const handleSelectOption = (opt) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const isCorrect = currentQ.validAnswers.includes(opt);
    if (isCorrect) {
      setScore((s) => s + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > highestStreak) setHighestStreak(newStreak);

      if (newStreak % 3 === 0) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      }
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const restartQuiz = () => {
    setQuizSeed((s) => s + 1);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setQuizFinished(false);
  };

  const handleModeChange = (mode) => {
    if (drillMode === mode) return;
    setDrillMode(mode);
    if (mode === 'words' && questionCount > 25) {
      setQuestionCount(15);
    }
    restartQuiz();
  };

  const handleLengthChange = (len) => {
    setQuestionCount(len);
    restartQuiz();
  };

  return (
    <div className="max-w-4xl w-full mx-auto px-3.5 sm:px-6 py-2 sm:py-3.5 my-auto space-y-2.5 sm:space-y-3 view-enter">
      
      {/* Header & Controls Banner */}
      <div className="bg-base-100 px-3.5 py-2.5 sm:px-5 sm:py-2.5 rounded-2xl sm:rounded-3xl border border-base-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3">
        
        {/* Left: Title & Mode Toggle (Letters vs Whole Words) - Centered on mobile */}
        <div className="flex items-center justify-center md:justify-start gap-2.5 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary flex-shrink-0" />
            <h1 className="text-base sm:text-lg font-extrabold text-base-content whitespace-nowrap">
              Script Quiz
            </h1>
          </div>

          {/* Mode Switcher */}
          <div className="inline-flex items-center gap-1 bg-base-200/80 p-0.5 rounded-xl border border-base-300">
            <button
              onClick={() => handleModeChange('letters')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                drillMode === 'letters'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-base-content/65 hover:text-base-content'
              }`}
              title="Practice individual characters"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Letters</span>
            </button>
            <button
              onClick={() => handleModeChange('words')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                drillMode === 'words'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-base-content/65 hover:text-base-content'
              }`}
              title="Practice complete vocabulary words"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Whole Words</span>
            </button>
          </div>
        </div>

        {/* Right: Question Count Selector & Scores - Centered on mobile */}
        <div className="flex items-center justify-center md:justify-end gap-2 sm:gap-2.5 flex-wrap">
          <div className="flex items-center gap-1 bg-base-200/60 p-0.5 sm:p-1 rounded-xl sm:rounded-2xl border border-base-300">
            {(drillMode === 'words' ? [5, 10, 15, 25] : [10, 15, 25, 40]).map((num) => (
              <button
                key={num}
                onClick={() => handleLengthChange(num)}
                className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl text-xs font-bold transition-all ${
                  questionCount === num
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-base-content/60 hover:text-base-content'
                }`}
                title={`Set quiz length to ${num} questions`}
              >
                {num}Q
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 bg-base-200/50 px-2.5 py-1 rounded-xl sm:rounded-2xl border border-base-300 shadow-sm" title="Streak">
            <Flame className={`w-3.5 h-3.5 ${streak > 0 ? 'text-warning fill-warning' : 'text-base-content/40'}`} />
            <span className="text-xs font-bold text-base-content">{streak}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-base-200/50 px-2.5 py-1 rounded-xl sm:rounded-2xl border border-base-300 shadow-sm" title="Score">
            <Trophy className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-bold text-base-content">{score}/{questions.length}</span>
          </div>
        </div>
      </div>

      {!quizFinished && currentQ ? (
        <div className="bg-base-100 p-3.5 sm:p-4 lg:p-5 rounded-2xl sm:rounded-3xl border border-base-300 shadow-sm space-y-2.5 sm:space-y-3">
          
          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-base-content/60 font-semibold px-0.5">
              <span>Question {currentQuestionIndex + 1} of {questions.length} • <span className="capitalize font-bold text-base-content/80">{drillMode}</span> Mode</span>
              <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
            </div>
            <progress 
              className="progress progress-primary w-full h-1.5" 
              value={currentQuestionIndex + 1} 
              max={questions.length} 
            />
          </div>

          {/* Side-by-Side Arena on Tablet/Laptop: Stable dimensions that never move or shift */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-stretch">
            
            {/* Left: Question Prompt Card */}
            <div className="md:col-span-5 text-center p-3.5 sm:p-4 lg:p-5 bg-base-200/30 rounded-2xl sm:rounded-3xl border border-base-300/80 flex flex-col justify-between items-center space-y-2 h-full min-h-[170px] sm:min-h-[195px] md:min-h-[222px] lg:min-h-[248px]">
              <p className="text-xs sm:text-sm font-semibold text-base-content/75">
                {currentQ.questionPrompt}
              </p>

              <div className="flex-1 flex items-center justify-center overflow-visible py-1 sm:py-2 my-auto w-full">
                <span className={`${currentQ.promptFont} ${
                  currentQ.mode === 'words'
                    ? (currentQ.promptFont === 'font-nastaliq' ? 'text-3xl sm:text-4xl md:text-5xl leading-[1.6] py-1' : 'text-3xl sm:text-4xl md:text-5xl font-medium')
                    : (currentQ.promptFont === 'font-nastaliq' ? 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.65] py-2' : 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium')
                } text-base-content select-none inline-block overflow-visible`}>
                  {currentQ.promptText}
                </span>
              </div>

              <div className="flex items-center justify-center gap-1.5 pt-0.5 flex-wrap">
                <span className="text-xs sm:text-sm px-3 py-1 rounded-xl bg-base-100 border border-base-300 font-bold text-base-content/80 shadow-sm">
                  {currentQ.mode === 'words' && currentQ.meaning 
                    ? `${currentQ.translit} ("${currentQ.meaning}")` 
                    : `Sound: ${currentQ.translit}`}
                </span>
              </div>
            </div>

            {/* Right: 2x2 Options Grid with rock-solid fixed height buttons (NO moving on click) */}
            <div className="md:col-span-7 grid grid-cols-2 gap-2.5 sm:gap-3 items-stretch">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === option;
                const isCorrectEquivalent = currentQ.validAnswers.includes(option);

                let btnClass = 'bg-base-100 hover:bg-base-200/60 border-base-300 hover:border-primary/40 text-base-content';
                if (isAnswered) {
                  if (isCorrectEquivalent) {
                    btnClass = 'bg-success/15 border-success text-success font-bold ring-2 ring-success/20 shadow-sm';
                  } else if (isSelected && !isCorrectEquivalent) {
                    btnClass = 'bg-error/15 border-error text-error font-bold ring-2 ring-error/20 shadow-sm';
                  } else {
                    btnClass = 'opacity-35 border-base-200 bg-base-100';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option)}
                    disabled={isAnswered}
                    className={`h-[78px] sm:h-[90px] md:h-[105px] lg:h-[118px] w-full px-2.5 sm:px-4 rounded-2xl border-2 flex items-center justify-center transition-all duration-150 overflow-visible ${btnClass} ${
                      !isAnswered ? 'hover:scale-[1.01] active:scale-[0.99] shadow-sm' : 'cursor-default'
                    }`}
                  >
                    <span className={`${currentQ.answerFont} ${
                      currentQ.mode === 'words'
                        ? (currentQ.answerFont === 'font-nastaliq' ? 'text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-[1.6] pt-0.5 pb-1.5' : 'text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium')
                        : (currentQ.answerFont === 'font-nastaliq' ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.65] pt-1 pb-2' : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium')
                    } select-none inline-block overflow-visible px-1 max-w-full text-center`}>
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Dedicated Full-Width Feedback & Action Tray (Fixed footprint: Zero layout shift or jumps) */}
          <div className="pt-0.5">
            {!isAnswered ? (
              <div className="min-h-[58px] sm:min-h-[64px] px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-base-200/40 border border-base-300/80 flex items-center justify-center text-center text-xs sm:text-sm text-base-content/65">
                <span className="font-medium">
                  Select the matching {drillMode === 'words' ? 'word' : 'letter'} from the 4 options
                </span>
              </div>
            ) : (
              <div className={`min-h-[58px] sm:min-h-[64px] px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 animate-in fade-in duration-150 text-xs sm:text-sm ${
                currentQ.validAnswers.includes(selectedOption)
                  ? 'bg-success/10 border-success/30'
                  : 'bg-error/10 border-error/30'
              }`}>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {currentQ.validAnswers.includes(selectedOption) ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-success flex-shrink-0" />
                        <span className="font-extrabold text-success text-sm sm:text-base">
                          Correct!
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-error flex-shrink-0" />
                        <span className="font-extrabold text-error text-sm sm:text-base flex items-center gap-1.5 flex-wrap">
                          <span>Incorrect — Correct Answer:</span>
                          <span className={currentQ.answerFont === 'font-nastaliq' ? 'font-nastaliq text-base sm:text-lg leading-normal' : 'font-devanagari text-base sm:text-lg'}>
                            {currentQ.validAnswers.join(' or ')}
                          </span>
                        </span>
                      </>
                    )}
                  </div>
                  {currentQ.notes && (
                    <p className="text-xs text-base-content/80 leading-normal mt-0.5 break-words">
                      {currentQ.notes}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleNext}
                  className="btn btn-primary btn-sm sm:btn-md rounded-xl px-4 sm:px-6 gap-2 font-bold shadow-md hover:shadow-lg self-end sm:self-center flex-shrink-0"
                >
                  <span>{currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

        </div>
      ) : (
        /* Quiz Completed Screen */
        <div className="bg-base-100 p-6 sm:p-10 rounded-3xl border border-base-300 text-center space-y-5 shadow-sm">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-base-content">
              Drill Completed!
            </h2>
            <p className="text-xs sm:text-sm text-base-content/70">
              You scored <strong className="text-primary font-bold">{score}</strong> out of {questions.length} questions correctly in <strong className="capitalize">{drillMode}</strong> mode.
            </p>
          </div>

          <div className="flex items-center justify-center gap-8 py-3">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-base-content">
                {Math.round((score / questions.length) * 100)}%
              </div>
              <div className="text-[10px] text-base-content/60 font-semibold uppercase">Accuracy</div>
            </div>
            <div className="w-px h-10 bg-base-300" />
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-primary">{highestStreak}</div>
              <div className="text-[10px] text-base-content/60 font-semibold uppercase">Best Streak</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              onClick={restartQuiz}
              className="btn btn-primary rounded-2xl px-6 sm:px-8 gap-2 font-bold shadow-lg shadow-primary/20"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Practice Another Set</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
