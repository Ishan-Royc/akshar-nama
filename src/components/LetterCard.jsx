import React, { memo } from 'react';
import { PenTool } from 'lucide-react';

function LetterCard({ letter, currentPath, onSelectLetter, onClick, onOpenWhiteboard }) {
  const handleClick = onClick || onSelectLetter;
  const isHindiToUrdu = currentPath === 'hindi-to-urdu';
  
  // Primary letter to feature prominently
  const primaryChar = isHindiToUrdu ? letter.urduChar : letter.hindiChar;
  const primaryName = isHindiToUrdu ? letter.urduNameTranslit : letter.hindiNameTranslit;
  const secondaryChar = letter.id === 'hamza' && isHindiToUrdu ? '' : (isHindiToUrdu ? letter.hindiChar : letter.urduChar);
  const fontPrimary = isHindiToUrdu ? 'font-nastaliq' : 'font-devanagari';
  const fontSecondary = isHindiToUrdu ? 'font-devanagari' : 'font-nastaliq';

  const handleWhiteboardClick = (e) => {
    e.stopPropagation();
    if (onOpenWhiteboard) {
      onOpenWhiteboard(letter);
    }
  };

  return (
    <div
      onClick={() => handleClick && handleClick(letter)}
      className="group relative bg-base-100 hover:bg-base-200/50 border border-base-300 hover:border-primary/60 rounded-2xl p-3 sm:p-3.5 transition-[border-color,background-color] duration-150 cursor-pointer shadow-none flex flex-col justify-between overflow-visible min-h-[125px] sm:min-h-[135px]"
    >
      {/* Top Meta: Roman Transliteration & Secondary Script Counterpart */}
      <div className="flex items-center justify-between gap-1 w-full min-w-0">
        <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-base-200/70 text-base-content/80 group-hover:bg-primary/15 group-hover:text-primary transition-colors truncate">
          {(letter.romanTranslit || '').toLowerCase()}
        </span>
        <span className={`${fontSecondary} ${
          !isHindiToUrdu 
            ? 'text-lg sm:text-xl font-bold text-primary leading-none' 
            : 'text-[1rem] font-medium text-base-content/80 leading-none'
        } group-hover:text-primary transition-colors select-none`}>
          {secondaryChar}
        </span>
      </div>

      {/* Main Glyph Display */}
      <div className="my-1 text-center flex items-center justify-center h-14 sm:h-16 overflow-visible">
        <span 
          className={`${fontPrimary} ${
            isHindiToUrdu 
              ? 'text-4xl sm:text-5xl leading-[1.4]' 
              : 'text-3xl sm:text-4xl font-medium leading-normal'
          } text-base-content group-hover:text-primary transition-colors select-none`}
        >
          {primaryChar}
        </span>
      </div>

      {/* Bottom Sub-Row: Name & Whiteboard Action */}
      <div className="pt-1 flex items-center justify-between text-xs text-base-content/70">
        <span className="text-[11px] font-semibold text-base-content/75 truncate group-hover:text-base-content transition-colors">
          {primaryName}
        </span>
        {onOpenWhiteboard && (
          <button
            onClick={handleWhiteboardClick}
            className="w-6 h-6 rounded-lg flex items-center justify-center text-base-content/40 hover:text-primary hover:bg-base-200 transition-colors flex-shrink-0 ml-1"
            title="Practice on Whiteboard"
            aria-label="Practice on Whiteboard"
          >
            <PenTool className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}

// Memoized export prevents unnecessary re-rendering
export default memo(LetterCard);
