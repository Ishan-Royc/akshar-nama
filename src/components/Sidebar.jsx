import React from 'react';
import { 
  BookOpen, 
  Palette, 
  ArrowRightLeft, 
  PenTool, 
  GraduationCap,
  Layers,
  Hash,
  X,
  Menu,
  Compass
} from 'lucide-react';

export default function Sidebar({ 
  isOpen, 
  onClose, 
  onToggleCollapse,
  currentPath, 
  onPathChange, 
  currentTheme, 
  onOpenThemeModal,
  activeView, 
  onViewChange 
}) {
  const isHindiToUrdu = currentPath === 'hindi-to-urdu';

  const navItems = [
    { id: 'intro', label: 'Overview', icon: BookOpen, desc: 'Script comparison & guide' },
    { id: 'learn', label: 'Alphabet Grid', icon: Layers, desc: 'Phonetic letter explorer' },
    { id: 'digits', label: 'Digits (0–9)', icon: Hash, desc: 'Numerals in Hindi & Urdu' },
    { id: 'guides', label: 'Linguistic Rules', icon: Compass, desc: 'Aspiration, Nuqta & Homophones' },
    { id: 'whiteboard', label: 'Whiteboard Canvas', icon: PenTool, desc: 'Calligraphic stroke tracing' },
    { id: 'quiz', label: 'Script Quiz', icon: GraduationCap, desc: 'Interactive recognition drill' },
    { id: 'sandbox', label: 'Word Bridge', icon: ArrowRightLeft, desc: 'Ligatures & vocabulary' },
  ];

  const handleNavClick = (viewId) => {
    onViewChange(viewId);
    // On mobile / tablet screens, close the sidebar drawer after selection
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile / Tablet Backdrop (Only visible on screens < 1024px when sidebar is open) */}
      <div 
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-neutral/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Sidebar Panel: Full Drawer on mobile/expanded, Mini-Dock (w-20) when minimized on desktop */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-base-100 border-r border-base-300 flex flex-col justify-between transition-[width,transform] duration-300 ease-in-out shadow-xl lg:shadow-none overflow-x-hidden ${
          // Mobile: off-canvas drawer
          isOpen ? 'translate-x-0 w-72 sm:w-80' : '-translate-x-full lg:translate-x-0 w-72 sm:w-80 lg:w-20'
        }`}
      >
        {/* Top Header & Menu Toggle / Stylized Latin Logo */}
        <div className={`h-16 sm:h-20 border-b border-base-300 flex items-center overflow-hidden flex-shrink-0 transition-all ${
          isOpen ? 'px-3.5 sm:px-4 justify-between' : 'px-2 justify-center'
        }`}>
          {/* Brand Logo on mobile / "Menu" label on laptop & widescreen when open */}
          {isOpen && (
            <>
              {/* Mobile: Full Logo as currently */}
              <div 
                onClick={() => handleNavClick('intro')}
                className="flex lg:hidden items-center gap-2.5 cursor-pointer group flex-shrink-0 select-none"
                title="AksharNama"
              >
                <div className="w-9 h-9 rounded-2xl bg-primary text-primary-content flex items-center justify-center font-black text-lg shadow-sm group-hover:scale-105 transition-transform flex-shrink-0 font-sans tracking-tight">
                  A
                </div>
                <div className="leading-tight overflow-hidden whitespace-nowrap">
                  <div className="font-extrabold text-sm sm:text-base tracking-tight text-base-content truncate font-sans">
                    AksharNama
                  </div>
                </div>
              </div>

              {/* Laptop & Wide Screen: Says the word "Menu" instead of repeating logo */}
              <div className="hidden lg:flex items-center gap-2 select-none pl-1">
                <span className="font-extrabold text-lg tracking-tight text-base-content font-sans">
                  Menu
                </span>
              </div>
            </>
          )}

          {/* Three-lines Menu Toggle (Desktop) */}
          <button
            onClick={onToggleCollapse}
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl hidden lg:flex items-center justify-center hover:bg-base-200 text-base-content/80 hover:text-base-content transition-all duration-200 flex-shrink-0"
            title={isOpen ? "Minimize sidebar" : "Expand sidebar"}
            aria-label={isOpen ? "Minimize sidebar" : "Expand sidebar"}
          >
            <Menu className="w-5 h-5" strokeWidth={2.2} />
          </button>

          {/* Mobile Drawer Close Button */}
          <button
            onClick={onClose}
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl flex lg:hidden items-center justify-center hover:bg-base-200 text-base-content/70 hover:text-base-content transition-colors flex-shrink-0"
            title="Close navigation"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Learning Path Quick Selector (Clean English) */}
        <div className="border-b border-base-300 bg-base-200/40 p-2.5 sm:p-3 overflow-hidden flex-shrink-0">
          <button
            onClick={() => onPathChange(isHindiToUrdu ? 'urdu-to-hindi' : 'hindi-to-urdu')}
            className={`w-full flex items-center justify-between p-2 rounded-2xl bg-base-100 hover:bg-base-200 border border-base-300 text-xs font-semibold transition-all group shadow-sm overflow-hidden whitespace-nowrap ${
              !isOpen ? 'justify-center' : ''
            }`}
            title={`Learning Path: ${isHindiToUrdu ? 'Hindi ➔ Urdu' : 'Urdu ➔ Hindi'} (Click to switch)`}
          >
            <div className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
              isOpen ? 'opacity-100 max-w-[160px]' : 'opacity-0 max-w-0 pointer-events-none'
            }`}>
              <span className="px-2 py-0.5 rounded-lg text-xs font-bold bg-primary/15 text-primary">
                {isHindiToUrdu ? 'Hindi ➔ Urdu' : 'Urdu ➔ Hindi'}
              </span>
            </div>
            <ArrowRightLeft className={`w-4 h-4 text-primary group-hover:rotate-180 transition-transform duration-300 flex-shrink-0 ${!isOpen ? 'mx-auto' : ''}`} />
          </button>
        </div>

        {/* Navigation Items with Persistent Elements and Smooth Fade */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar p-2.5 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 sm:py-3 rounded-2xl text-left text-xs sm:text-sm font-semibold transition-all duration-200 overflow-hidden ${
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-base-content/75 hover:text-base-content hover:bg-base-200/60'
                }`}
                title={!isOpen ? item.label : undefined}
                aria-label={item.label}
              >
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-base-content/60'}`} />
                </div>
                <div className={`flex-1 min-w-0 transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${
                  isOpen ? 'opacity-100 max-w-[200px] translate-x-0' : 'opacity-0 max-w-0 -translate-x-2'
                }`}>
                  <div className="truncate leading-tight">{item.label}</div>
                  <div className={`text-[10px] truncate ${isActive ? 'text-white/80' : 'text-base-content/45'}`}>
                    {item.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer: Theme Button, GitHub Link & Minimal Brand */}
        <div className="p-2.5 sm:p-3 border-t border-base-300 bg-base-200/30 overflow-hidden flex-shrink-0 space-y-1.5">
          <button
            onClick={onOpenThemeModal}
            className={`w-full flex items-center gap-2.5 p-2 rounded-2xl bg-base-100 hover:bg-base-200 border border-base-300 text-xs font-semibold text-base-content transition-all shadow-sm group overflow-hidden whitespace-nowrap ${
              !isOpen ? 'justify-center' : ''
            }`}
            title={`Theme: ${currentTheme} (Click to change)`}
            aria-label="Open theme selector"
          >
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
              <Palette className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
            </div>
            <div className={`flex-1 min-w-0 flex items-center justify-between transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
              isOpen ? 'opacity-100 max-w-[200px] translate-x-0' : 'opacity-0 max-w-0 -translate-x-2'
            }`}>
              <span>Theme: <strong className="capitalize">{currentTheme}</strong></span>
              <span className="text-[11px] font-bold text-primary group-hover:underline ml-1">Change</span>
            </div>
          </button>

          {/* GitHub Link Button */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full flex items-center gap-2.5 p-2 rounded-2xl bg-base-100 hover:bg-base-200 border border-base-300 text-xs font-semibold text-base-content hover:text-primary transition-all shadow-sm group overflow-hidden whitespace-nowrap ${
              !isOpen ? 'justify-center' : ''
            }`}
            title="GitHub Profile / Repository"
            aria-label="GitHub Profile / Repository"
          >
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 text-base-content/75 group-hover:text-primary transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </div>
            <div className={`flex-1 min-w-0 flex items-center justify-between transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
              isOpen ? 'opacity-100 max-w-[200px] translate-x-0' : 'opacity-0 max-w-0 -translate-x-2'
            }`}>
              <span>GitHub</span>
              <span className="text-[10px] font-bold text-primary group-hover:underline">Link</span>
            </div>
          </a>

          <div className={`text-[10px] text-base-content/40 text-center pt-0.5 font-semibold tracking-wide transition-all duration-300 overflow-hidden whitespace-nowrap ${
            isOpen ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0'
          }`}>
            AksharNama
          </div>
        </div>

      </aside>
    </>
  );
}
