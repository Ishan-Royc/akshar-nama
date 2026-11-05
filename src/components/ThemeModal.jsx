import React, { useEffect } from 'react';
import { Palette, X, Check } from 'lucide-react';

export default function ThemeModal({ isOpen, onClose, currentTheme, onSelectTheme }) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const themes = [
    {
      id: 'dark',
      name: 'Dark (Default)',
      subtitle: 'Deep obsidian slate with vibrant green accents',
      primaryColor: '#16a34a',
      bgColor: '#0d1117',
      cardBg: '#161b22',
      textColor: '#f0f6fc',
      borderColor: '#30363d',
    },
    {
      id: 'verdant',
      name: 'Verdant (Green & White)',
      subtitle: 'Crisp white paper with fresh emerald green accents',
      primaryColor: '#16a34a',
      bgColor: '#ffffff',
      cardBg: '#f6fbf7',
      textColor: '#172b1d',
      borderColor: '#e6f4ea',
    },
    {
      id: 'retro',
      name: 'Retro (Vedic)',
      subtitle: 'Traditional warm parchment with terracotta ink',
      primaryColor: '#8A341B',
      bgColor: '#FFF9ED',
      cardBg: '#F5EBDD',
      textColor: '#2c2523',
      borderColor: '#E6D5C3',
    },
    {
      id: 'dracula',
      name: 'Dracula',
      subtitle: 'Gothic dark purple with vibrant neon contrast',
      primaryColor: '#bd93f9',
      bgColor: '#282a36',
      cardBg: '#343746',
      textColor: '#f8f8f2',
      borderColor: '#44475a',
    },
    {
      id: 'light',
      name: 'Light (Apple Peach)',
      subtitle: 'Clean daylight aesthetic with warm apple peach and slate highlights',
      primaryColor: '#FA7268',
      bgColor: '#ffffff',
      cardBg: '#FFF7F5',
      textColor: '#1F2937',
      borderColor: '#FEE8E3',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-base-100 rounded-3xl border border-base-300 shadow-2xl overflow-hidden z-10 transition-all view-enter">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-base-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-base-content">Select Theme</h2>
              <p className="text-xs text-base-content/60">Choose your preferred visual aesthetic</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-base-200 text-base-content/60 hover:text-base-content transition-colors"
            aria-label="Close theme selector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme List */}
        <div className="p-4 sm:p-6 space-y-2.5 max-h-[65vh] overflow-y-auto">
          {themes.map((themeOption) => {
            const isSelected = currentTheme === themeOption.id;
            return (
              <button
                key={themeOption.id}
                onClick={() => {
                  onSelectTheme(themeOption.id);
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 group ${
                  isSelected 
                    ? 'border-primary ring-2 ring-primary/20 bg-base-200/80 shadow-sm'
                    : 'border-base-300/80 bg-base-100 hover:bg-base-200/50 hover:border-base-300'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Color Swatch Preview */}
                  <div 
                    className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center border shadow-inner relative overflow-hidden"
                    style={{ 
                      backgroundColor: themeOption.bgColor,
                      borderColor: themeOption.borderColor 
                    }}
                  >
                    <span 
                      className="w-4 h-4 rounded-full shadow-sm"
                      style={{ backgroundColor: themeOption.primaryColor }}
                    />
                  </div>

                  {/* Title & Description */}
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-base-content flex items-center gap-2">
                      <span>{themeOption.name}</span>
                      {isSelected && (
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-primary text-white">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-base-content/65 truncate mt-0.5">
                      {themeOption.subtitle}
                    </div>
                  </div>
                </div>

                {/* Selection Checkmark */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                  isSelected 
                    ? 'bg-primary text-white' 
                    : 'border border-base-300 text-transparent group-hover:border-base-content/40'
                }`}>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-base-300 bg-base-200/40 flex justify-end">
          <button
            onClick={onClose}
            className="btn btn-sm btn-primary px-6 rounded-xl font-bold"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
