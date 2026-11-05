import React, { useState } from 'react';
import { 
  BookOpen, 
  Palette, 
  ArrowRightLeft, 
  PenTool, 
  Compass, 
  GraduationCap,
  Layers,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ 
  currentPath, 
  onPathChange, 
  currentTheme, 
  onThemeChange, 
  activeView, 
  onViewChange 
}) {
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const themes = [
    { id: 'light', name: 'Light', desc: 'Minimal paper & ink', bg: '#ffffff', border: '#e2e8f0' },
    { id: 'dark', name: 'Dark', desc: 'Emerald & deep slate', bg: '#0d1117', border: '#30363d' },
    { id: 'retro', name: 'Retro', desc: 'Vedic terracotta & parchment', bg: '#FFF9ED', border: '#E6D5C3' },
    { id: 'dracula', name: 'Dracula', desc: 'Vibrant purple & night slate', bg: '#282a36', border: '#44475a' },
  ];

  const isHindiToUrdu = currentPath === 'hindi-to-urdu';

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-base-100/90 border-b border-base-300/70 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Logo & Branding */}
          <div 
            onClick={() => onViewChange('intro')} 
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-primary text-primary-content flex items-center justify-center font-black text-xl sm:text-2xl shadow-sm group-hover:scale-105 transition-transform duration-200 flex-shrink-0 font-sans tracking-tight">
              A
            </div>
            
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-base-content truncate font-sans">
                  AksharNama
                </span>
              </div>
              <p className="text-xs text-base-content/60 font-medium flex items-center gap-2 truncate">
                <span>Devanagari ⇋ Nastaliq Script Bridge</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-base-200/50 p-1.5 rounded-2xl border border-base-300/60">
            <button
              onClick={() => onViewChange('intro')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeView === 'intro'
                  ? 'bg-primary text-primary-content shadow-sm'
                  : 'text-base-content/75 hover:text-base-content hover:bg-base-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => onViewChange('learn')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeView === 'learn'
                  ? 'bg-primary text-primary-content shadow-sm'
                  : 'text-base-content/75 hover:text-base-content hover:bg-base-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Alphabet</span>
            </button>

            <button
              onClick={() => onViewChange('guides')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeView === 'guides'
                  ? 'bg-primary text-primary-content shadow-sm'
                  : 'text-base-content/75 hover:text-base-content hover:bg-base-100'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Linguistic Rules</span>
            </button>

            <button
              onClick={() => onViewChange('whiteboard')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeView === 'whiteboard'
                  ? 'bg-primary text-primary-content shadow-sm'
                  : 'text-base-content/75 hover:text-base-content hover:bg-base-100'
              }`}
            >
              <PenTool className="w-4 h-4" />
              <span>Whiteboard</span>
            </button>

            <button
              onClick={() => onViewChange('quiz')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeView === 'quiz'
                  ? 'bg-primary text-primary-content shadow-sm'
                  : 'text-base-content/75 hover:text-base-content hover:bg-base-100'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Quiz</span>
            </button>

            <button
              onClick={() => onViewChange('sandbox')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeView === 'sandbox'
                  ? 'bg-primary text-primary-content shadow-sm'
                  : 'text-base-content/75 hover:text-base-content hover:bg-base-100'
              }`}
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>Word Bridge</span>
            </button>
          </nav>

          {/* Right Action Controls: Symmetrical Path Toggle & Theme Selector */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Symmetrical Learning Path Switcher */}
            <button 
              onClick={() => onPathChange(isHindiToUrdu ? 'urdu-to-hindi' : 'hindi-to-urdu')}
              className="px-3 sm:px-4 py-2 rounded-2xl bg-base-200/80 hover:bg-base-300/80 border border-base-300 text-xs sm:text-sm font-medium flex items-center gap-2 transition-all shadow-sm group"
              title="Switch Learning Path"
            >
              {isHindiToUrdu ? (
                <>
                  <span className="font-semibold text-primary font-devanagari">हिन्दी</span>
                  <ArrowRightLeft className="w-3.5 h-3.5 text-base-content/50 group-hover:rotate-180 transition-transform duration-300" />
                  <span className="font-nastaliq text-base leading-none">اردو</span>
                </>
              ) : (
                <>
                  <span className="font-nastaliq text-base leading-none text-primary">اردو</span>
                  <ArrowRightLeft className="w-3.5 h-3.5 text-base-content/50 group-hover:rotate-180 transition-transform duration-300" />
                  <span className="font-semibold font-devanagari">हिन्दी</span>
                </>
              )}
            </button>

            {/* Theme Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="w-10 h-10 rounded-2xl border border-base-300 bg-base-200/60 hover:bg-base-300/80 flex items-center justify-center transition-all shadow-sm"
                aria-label="Theme selector"
                title="Select Theme"
              >
                <Palette className="w-4 h-4 text-base-content/80" />
              </button>

              {themeDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setThemeDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-56 p-2 rounded-2xl bg-base-100 border border-base-300 shadow-xl z-40 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-base-content/50 uppercase tracking-wider">
                      Theme Selection
                    </div>
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          onThemeChange(t.id);
                          setThemeDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs sm:text-sm transition-all ${
                          currentTheme === t.id 
                            ? 'bg-primary text-primary-content font-bold shadow-sm' 
                            : 'hover:bg-base-200 text-base-content'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span 
                            className="w-4 h-4 rounded-full border shadow-inner flex-shrink-0"
                            style={{ backgroundColor: t.bg, borderColor: t.border }}
                          />
                          <div>
                            <div className="leading-tight">{t.name}</div>
                            <div className={`text-[10px] ${currentTheme === t.id ? 'text-primary-content/80' : 'text-base-content/60'}`}>
                              {t.desc}
                            </div>
                          </div>
                        </div>
                        {currentTheme === t.id && (
                          <span className="w-2 h-2 rounded-full bg-current" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

          </div>

        </div>

        {/* Mobile Navigation bar - Smooth scrolling with generous touch area */}
        <div className="flex lg:hidden overflow-x-auto py-2.5 gap-2 border-t border-base-300/40 no-scrollbar">
          {[
            { id: 'intro', label: 'Overview', icon: BookOpen },
            { id: 'learn', label: 'Alphabet', icon: Layers },
            { id: 'guides', label: 'Rules', icon: Compass },
            { id: 'whiteboard', label: 'Draw', icon: PenTool },
            { id: 'quiz', label: 'Quiz', icon: GraduationCap },
            { id: 'sandbox', label: 'Word Bridge', icon: ArrowRightLeft },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-primary text-primary-content shadow-sm'
                    : 'text-base-content/75 bg-base-200/50 hover:bg-base-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
