import React from 'react';
import { 
  Menu, 
  ArrowRightLeft, 
  Palette, 
  Compass,
  BookOpen,
  Layers,
  Hash,
  PenTool,
  GraduationCap
} from 'lucide-react';

export default function HeaderBar({ 
  onToggleSidebar, 
  sidebarOpen, 
  activeView, 
  currentPath, 
  onPathChange, 
  currentTheme,
  onOpenThemeModal
}) {
  const isHindiToUrdu = currentPath === 'hindi-to-urdu';

  const viewTitles = {
    intro: { title: 'Overview', icon: BookOpen },
    learn: { title: 'Alphabet Grid', icon: Layers },
    digits: { title: 'Digits (0–9)', icon: Hash },
    guides: { title: 'Linguistic Rules', icon: Compass },
    whiteboard: { title: 'Whiteboard Canvas', icon: PenTool },
    quiz: { title: 'Script Quiz', icon: GraduationCap },
    sandbox: { title: 'Word Bridge', icon: ArrowRightLeft },
  };

  const currentViewMeta = viewTitles[activeView] || viewTitles.intro;
  const ViewIcon = currentViewMeta.icon;

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-base-100/90 border-b border-base-300 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-20">
          
          {/* Left: Mobile 3-Lines Menu Toggle, Stylized Latin Logo & View Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile-only Menu Button: Compact & ergonomic on mobile */}
            <button
              onClick={onToggleSidebar}
              className="lg:hidden w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-base-200/80 hover:bg-base-300/80 text-base-content border border-base-300 flex items-center justify-center transition-all shadow-sm flex-shrink-0"
              title={sidebarOpen ? "Close navigation" : "Open navigation"}
              aria-label="Toggle navigation"
            >
              <Menu className="w-4 h-4 sm:w-6 sm:h-6 text-base-content" strokeWidth={2.2} />
            </button>

            {/* Stylized Latin Logo */}
            <div className="flex items-center gap-2 sm:gap-2.5 select-none">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-primary text-primary-content font-black text-base sm:text-lg flex items-center justify-center shadow-sm flex-shrink-0 font-sans tracking-tight">
                A
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="font-extrabold text-sm sm:text-base tracking-tight text-base-content font-sans">
                  AksharNama
                </div>
              </div>
            </div>

            <div className="h-4 sm:h-5 w-px bg-base-300 hidden sm:block" />

            <div className="flex items-center gap-1.5 sm:gap-2">
              <ViewIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary hidden sm:inline" />
              <span className="font-extrabold text-xs sm:text-base text-base-content truncate max-w-[120px] sm:max-w-none">
                {currentViewMeta.title}
              </span>
            </div>
          </div>

          {/* Right: Path Quick Switcher & Theme Modal Trigger */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            {/* Learning Path Switcher (Compact on mobile) */}
            <button
              onClick={() => onPathChange(isHindiToUrdu ? 'urdu-to-hindi' : 'hindi-to-urdu')}
              className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-base-200/80 hover:bg-base-300/80 border border-base-300 text-[11px] sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              title="Click to switch learning path"
            >
              <span className={`font-semibold ${isHindiToUrdu ? 'text-primary' : 'text-base-content/80'}`}>
                {isHindiToUrdu ? 'Hindi ➔ Urdu' : 'Urdu ➔ Hindi'}
              </span>
              <ArrowRightLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-base-content/40" />
            </button>

            {/* Theme Selector Popup Modal Trigger (Compact on mobile) */}
            <button
              onClick={onOpenThemeModal}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl border border-base-300 bg-base-200/60 hover:bg-base-300/80 flex items-center justify-center transition-all shadow-sm text-base-content hover:text-primary flex-shrink-0"
              title={`Current Theme: ${currentTheme}. Click to open theme selector.`}
              aria-label="Open theme selector modal"
            >
              <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
