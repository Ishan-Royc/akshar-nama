import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import HeaderBar from './components/HeaderBar';
import IntroLanding from './components/IntroLanding';
import AlphabetGrid from './components/AlphabetGrid';
import DigitsView from './components/DigitsView';
import DetailedLetterModal from './components/DetailedLetterModal';
import InteractiveWhiteboard from './components/InteractiveWhiteboard';
import LinguisticGuidesView from './components/LinguisticGuidesView';
import ScriptQuiz from './components/ScriptQuiz';
import WordBridgeSandbox from './components/WordBridgeSandbox';
import ThemeModal from './components/ThemeModal';
import { LEARNING_ENTRIES, DIGITS_DATA } from './data/alphabetData';

export default function App() {
  // Theme state: Default strictly to 'dark' with #157F1A green primary!
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('hindustani_theme') || 'dark';
  });

  // Theme selection modal state
  const [themeModalOpen, setThemeModalOpen] = useState(false);

  // Learning path state ('hindi-to-urdu' | 'urdu-to-hindi')
  const [currentPath, setCurrentPath] = useState(() => {
    return localStorage.getItem('hindustani_path') || 'hindi-to-urdu';
  });

  // Active view: 'intro' | 'learn' | 'digits' | 'guides' | 'whiteboard' | 'quiz' | 'sandbox'
  const [activeView, setActiveView] = useState('intro');

  // Sidebar expanded / minimized state
  // On desktop: true = expanded (w-72), false = mini-dock (w-20)
  // On mobile (<1024px): true = open drawer, false = closed off-canvas
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1280;
    }
    return false;
  });

  // Modal state for detailed letter inspection
  const [selectedLetter, setSelectedLetter] = useState(null);

  // Pre-selected letter/digit for whiteboard practice
  const [whiteboardLetter, setWhiteboardLetter] = useState(null);

  // Sync theme to HTML document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hindustani_theme', theme);
  }, [theme]);

  // Sync learning path
  useEffect(() => {
    localStorage.setItem('hindustani_path', currentPath);
  }, [currentPath]);

  const handleOpenWhiteboardForItem = (item) => {
    setWhiteboardLetter(item);
    setActiveView('whiteboard');
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content selection:bg-primary selection:text-white transition-colors duration-200 flex">
      
      {/* Collapsible / Closable Sidebar with Mini-Dock Mode */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={() => setSidebarOpen(!sidebarOpen)}
        currentPath={currentPath}
        onPathChange={setCurrentPath}
        currentTheme={theme}
        onOpenThemeModal={() => setThemeModalOpen(true)}
        activeView={activeView}
        onViewChange={(view) => {
          setActiveView(view);
        }}
      />

      {/* Main Content Viewport: Adjust padding for desktop expanded (lg:pl-72 sm:lg:pl-80) vs mini-dock (lg:pl-20) */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out pl-0 ${
          sidebarOpen ? 'lg:pl-[19rem] sm:lg:pl-[21rem]' : 'lg:pl-20'
        }`}
      >
        
        {/* Top Header Bar with Menu toggle and Quick Controls */}
        <HeaderBar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
          activeView={activeView}
          currentPath={currentPath}
          onPathChange={setCurrentPath}
          currentTheme={theme}
          onOpenThemeModal={() => setThemeModalOpen(true)}
          onViewChange={(view) => {
            setActiveView(view);
          }}
        />

        {/* Dynamic Page Views */}
        <main className={`flex-1 ${activeView === 'quiz' ? 'pb-2 flex flex-col justify-center' : 'pb-16'}`}>
          {activeView === 'intro' && (
            <IntroLanding
              currentPath={currentPath}
              onPathSelect={setCurrentPath}
              onStartLearning={() => setActiveView('learn')}
              onOpenDigits={() => setActiveView('digits')}
            />
          )}

          {activeView === 'learn' && (
            <AlphabetGrid
              currentPath={currentPath}
              onSelectLetter={setSelectedLetter}
              onOpenWhiteboard={handleOpenWhiteboardForItem}
              onOpenGuides={() => setActiveView('guides')}
            />
          )}

          {activeView === 'digits' && (
            <DigitsView
              currentPath={currentPath}
              onOpenWhiteboard={handleOpenWhiteboardForItem}
            />
          )}

          {activeView === 'guides' && (
            <LinguisticGuidesView
              currentPath={currentPath}
              onOpenWhiteboard={handleOpenWhiteboardForItem}
            />
          )}

          {activeView === 'whiteboard' && (
            <InteractiveWhiteboard
              currentPath={currentPath}
              initialLetter={whiteboardLetter}
              onBackToGrid={() => setActiveView('learn')}
            />
          )}

          {activeView === 'quiz' && (
            <ScriptQuiz
              currentPath={currentPath}
              onOpenWhiteboard={handleOpenWhiteboardForItem}
            />
          )}

          {activeView === 'sandbox' && (
            <WordBridgeSandbox currentPath={currentPath} />
          )}
        </main>

        {/* Detailed Letter Inspection Modal */}
        {selectedLetter && (
          <DetailedLetterModal
            letter={selectedLetter}
            allLetters={LEARNING_ENTRIES}
            currentPath={currentPath}
            onClose={() => setSelectedLetter(null)}
            onSelectLetter={setSelectedLetter}
            onOpenWhiteboard={() => {
              const toOpen = selectedLetter;
              setSelectedLetter(null);
              handleOpenWhiteboardForItem(toOpen);
            }}
          />
        )}

        {/* Interactive Theme Selection Popup Modal */}
        <ThemeModal
          isOpen={themeModalOpen}
          onClose={() => setThemeModalOpen(false)}
          currentTheme={theme}
          onSelectTheme={(newTheme) => {
            setTheme(newTheme);
          }}
        />

      </div>

    </div>
  );
}
