import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { 
  PenTool, 
  Feather,
  Eraser, 
  RotateCcw, 
  Trash2, 
  Download, 
  Eye, 
  EyeOff, 
  Sliders, 
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Info,
  Lightbulb
} from 'lucide-react';
import { 
  LEARNING_ENTRIES, 
  DIGITS_DATA, 
  getHindiRank, 
  getUrduRank 
} from '../data/alphabetData';

export default function InteractiveWhiteboard({ 
  currentPath, 
  initialLetter = null, 
  onBackToGrid 
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const pointsRef = useRef([]);

  const isHindiToUrdu = currentPath === 'hindi-to-urdu';
  
  // Combined practice items: alphabet letters + digits, sorted by target script
  // When target is Hindi (!isHindiToUrdu), ordered strictly according to Hindi Varnamala (a, aa, i, ii...)
  const practiceItems = useMemo(() => {
    const letters = [...LEARNING_ENTRIES];
    if (isHindiToUrdu) {
      letters.sort((a, b) => getUrduRank(a) - getUrduRank(b));
    } else {
      letters.sort((a, b) => getHindiRank(a) - getHindiRank(b));
    }
    return [...letters, ...DIGITS_DATA];
  }, [isHindiToUrdu]);

  // Selected letter for practice (default to initialLetter or first entry in target script order)
  const [selectedLetter, setSelectedLetter] = useState(() => {
    if (initialLetter) return initialLetter;
    const initialList = [...LEARNING_ENTRIES];
    if (currentPath === 'hindi-to-urdu') {
      initialList.sort((a, b) => getUrduRank(a) - getUrduRank(b));
    } else {
      initialList.sort((a, b) => getHindiRank(a) - getHindiRank(b));
    }
    return initialList[0] || LEARNING_ENTRIES[0];
  });

  // Keep selectedLetter synchronized if initialLetter prop updates
  useEffect(() => {
    if (initialLetter) {
      setSelectedLetter(initialLetter);
    }
  }, [initialLetter]);

  // If path flips and no initialLetter was explicitly clicked from modal, switch to beginning of that path
  useEffect(() => {
    if (!initialLetter && practiceItems.length > 0) {
      setSelectedLetter(practiceItems[0]);
    }
  }, [isHindiToUrdu, practiceItems, initialLetter]);

  // Drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('calligraphy'); // 'calligraphy' | 'pen' | 'eraser'
  const [strokeColor, setStrokeColor] = useState('#16a34a'); // toned-down vibrant green
  const [lineWidth, setLineWidth] = useState(7);
  const [showWatermark, setShowWatermark] = useState(true);
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.24);
  const [showGuidelines, setShowGuidelines] = useState(true);
  const [history, setHistory] = useState([]); // array of ImageData (capped at 8 for memory speed)
  const [historyStep, setHistoryStep] = useState(-1);

  // Target character to trace
  const charToTrace = isHindiToUrdu ? selectedLetter.urduChar : selectedLetter.hindiChar;
  const scriptFont = isHindiToUrdu ? 'font-nastaliq' : 'font-devanagari';

  // Palette colors for brush
  const colorPalette = [
    { name: 'Emerald Green', color: '#16a34a' },
    { name: 'Terracotta', color: '#8A341B' },
    { name: 'Ocean Blue', color: '#2563EB' },
    { name: 'Amethyst', color: '#8B5CF6' },
    { name: 'Charcoal', color: '#1E293B' },
    { name: 'Pure White', color: '#FFFFFF' },
  ];

  // Mobile breakpoint check
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  // Save canvas state to history for Undo (capped at 6 for optimal RAM and speed)
  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    setHistory((prev) => {
      const maxHistory = 6;
      const truncated = prev.slice(Math.max(0, historyStep - (maxHistory - 1)), historyStep + 1);
      return [...truncated, imageData];
    });
    setHistoryStep((prev) => Math.min(prev + 1, 5));
  }, [historyStep]);

  // Initialize and resize canvas
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Display size responsive: on mobile, square-ish canvas for natural finger tracing
    const width = rect.width;
    const isMobileView = width < 640 || (typeof window !== 'undefined' && window.innerWidth < 640);
    const height = isMobileView
      ? Math.max(340, Math.min(width, 420))
      : Math.min(Math.max(width * 0.65, 360), 520);

    // If canvas already had content, preserve it across resize
    let backupCanvas = null;
    if (canvas.width > 0 && canvas.height > 0) {
      backupCanvas = document.createElement('canvas');
      backupCanvas.width = canvas.width;
      backupCanvas.height = canvas.height;
      const bCtx = backupCanvas.getContext('2d');
      bCtx.drawImage(canvas, 0, 0);
    }

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Internal buffer size
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (backupCanvas) {
      ctx.drawImage(backupCanvas, 0, 0, width, height);
    } else {
      saveState();
    }
  }, [saveState]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setupCanvas();
    };
    setupCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setupCanvas]);

  // Update selected letter if initialLetter changes
  useEffect(() => {
    if (initialLetter) {
      setSelectedLetter(initialLetter);
      clearCanvas();
    }
  }, [initialLetter]);

  const undo = () => {
    if (historyStep > 0) {
      const prevStep = historyStep - 1;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.putImageData(history[prevStep], 0, 0);
      setHistoryStep(prevStep);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveState();
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);

    const coords = getCoordinates(e);
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    setIsDrawing(true);
    pointsRef.current = [coords];

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = lineWidth * 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.arc(coords.x, coords.y, (lineWidth * 3) / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (tool === 'calligraphy') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = strokeColor;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 0.8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      const nibWidth = lineWidth * 2.4;
      const angle = -Math.PI / 4.2; // 43° traditional cut for Nastaliq / Devanagari Qalam
      const dx = (nibWidth / 2) * Math.cos(angle);
      const dy = (nibWidth / 2) * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(coords.x - dx, coords.y - dy);
      ctx.lineTo(coords.x + dx, coords.y + dy);
      ctx.lineTo(coords.x + dx - dy * 0.35, coords.y + dy + dx * 0.35);
      ctx.lineTo(coords.x - dx - dy * 0.35, coords.y - dy + dx * 0.35);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else {
      // Smooth round pen
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = strokeColor;
      ctx.fillStyle = strokeColor;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.arc(coords.x, coords.y, lineWidth / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawStrokeSegment = (coords) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const pts = pointsRef.current;
    pts.push(coords);

    if (tool === 'calligraphy') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = strokeColor;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 0.8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      const nibWidth = lineWidth * 2.4;
      const angle = -Math.PI / 4.2; // 43° traditional cut for Nastaliq / Devanagari Qalam
      const dx = (nibWidth / 2) * Math.cos(angle);
      const dy = (nibWidth / 2) * Math.sin(angle);

      // Smooth mathematical Bézier ribbon offset: zero polygon facets or jagged edges
      if (pts.length >= 3) {
        const p0 = pts[pts.length - 3];
        const p1 = pts[pts.length - 2];
        const p2 = pts[pts.length - 1];
        const mid1 = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
        const mid2 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };

        ctx.beginPath();
        // Left boundary curve
        ctx.moveTo(mid1.x - dx, mid1.y - dy);
        ctx.quadraticCurveTo(p1.x - dx, p1.y - dy, mid2.x - dx, mid2.y - dy);
        // Connect to right boundary at mid2
        ctx.lineTo(mid2.x + dx, mid2.y + dy);
        // Right boundary curve back to mid1
        ctx.quadraticCurveTo(p1.x + dx, p1.y + dy, mid1.x + dx, mid1.y + dy);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else if (pts.length === 2) {
        const p0 = pts[0];
        const p1 = pts[1];
        const mid = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };

        ctx.beginPath();
        ctx.moveTo(p0.x - dx, p0.y - dy);
        ctx.lineTo(mid.x - dx, mid.y - dy);
        ctx.lineTo(mid.x + dx, mid.y + dy);
        ctx.lineTo(p0.x + dx, p0.y + dy);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      // Keep memory footprint minimal
      if (pts.length > 8) {
        pts.splice(0, pts.length - 4);
      }
    } else {
      // High-performance midpoint quadratic Bézier curve smoothing for Round Pen & Eraser
      if (tool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = lineWidth * 3;
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
      }
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (pts.length >= 3) {
        const p0 = pts[pts.length - 3];
        const p1 = pts[pts.length - 2];
        const p2 = pts[pts.length - 1];
        const mid1 = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
        const mid2 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };

        ctx.beginPath();
        ctx.moveTo(mid1.x, mid1.y);
        ctx.quadraticCurveTo(p1.x, p1.y, mid2.x, mid2.y);
        ctx.stroke();
      } else if (pts.length === 2) {
        const p0 = pts[0];
        const p1 = pts[1];
        const mid = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(mid.x, mid.y);
        ctx.stroke();
      }
    }
  };

  const handlePointerMove = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (e.getCoalescedEvents && typeof e.getCoalescedEvents === 'function') {
      const coalesced = e.getCoalescedEvents();
      if (coalesced && coalesced.length > 0) {
        for (let i = 0; i < coalesced.length; i++) {
          drawStrokeSegment(getCoordinates(coalesced[i]));
        }
        return;
      }
    }

    drawStrokeSegment(getCoordinates(e));
  };

  const handlePointerUp = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas && e.pointerId) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch (err) {
        // ignore
      }
    }

    // Flush last segment
    const pts = pointsRef.current;
    if (pts.length >= 2 && canvas) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      const pLast = pts[pts.length - 1];
      const pPrev = pts[pts.length - 2];
      const mid = { x: (pPrev.x + pLast.x) / 2, y: (pPrev.y + pLast.y) / 2 };

      if (tool === 'calligraphy') {
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = strokeColor;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 0.8;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        const nibWidth = lineWidth * 2.4;
        const angle = -Math.PI / 4.2;
        const dx = (nibWidth / 2) * Math.cos(angle);
        const dy = (nibWidth / 2) * Math.sin(angle);
        ctx.beginPath();
        ctx.moveTo(mid.x - dx, mid.y - dy);
        ctx.lineTo(pLast.x - dx, pLast.y - dy);
        ctx.lineTo(pLast.x + dx, pLast.y + dy);
        ctx.lineTo(mid.x + dx, mid.y + dy);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(mid.x, mid.y);
        ctx.lineTo(pLast.x, pLast.y);
        ctx.stroke();
      }
    }

    pointsRef.current = [];
    setIsDrawing(false);
    saveState();
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const expCtx = exportCanvas.getContext('2d', { willReadFrequently: true });

    expCtx.fillStyle = '#0d1117';
    expCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    expCtx.drawImage(canvas, 0, 0);

    const link = document.createElement('a');
    link.download = `practice-${selectedLetter.id || 'glyph'}.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
  };

  // Switch to next / previous character
  const currentIndex = practiceItems.findIndex(l => l.id === selectedLetter.id);
  const handlePrevLetter = () => {
    const prevIdx = (currentIndex - 1 + practiceItems.length) % practiceItems.length;
    setSelectedLetter(practiceItems[prevIdx]);
    clearCanvas();
  };
  const handleNextLetter = () => {
    const nextIdx = (currentIndex + 1) % practiceItems.length;
    setSelectedLetter(practiceItems[nextIdx]);
    clearCanvas();
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-4 sm:space-y-7 view-enter">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 bg-base-100 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-base-300 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-3xl font-extrabold text-base-content">
            Interactive Whiteboard & Baseline Practice
          </h1>

          <p className="text-xs sm:text-sm text-base-content/75 max-w-xl">
            {isHindiToUrdu 
              ? 'Urdu Nastaliq letters rest on the Khatt-e-Meezan baseline. Alif stands upright with its bottom touching the line.'
              : 'Hindi Devanagari letters hang suspended from the top headline (Shirorekha). Trace with steady horizontal anchors.'}
          </p>
        </div>

        <button
          onClick={onBackToGrid}
          className="btn btn-sm sm:btn-md btn-outline border-base-300 bg-base-100 hover:bg-base-200 rounded-xl sm:rounded-2xl text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 font-semibold shadow-sm self-start md:self-center"
        >
          <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Back to Alphabet</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-7 items-start">
        
        {/* Left Column / Mobile Top: Active Letter Inspector Card */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-base-100 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border border-base-300 shadow-sm space-y-3 sm:space-y-4">
            {/* Header: Category & Sound Transliteration Badge */}
            <div className="flex items-center justify-between pb-2 border-b border-base-200/80">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-base-content/60 uppercase">
                {selectedLetter.categoryLabel || 'Numeral'}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-primary/10 text-primary">
                {selectedLetter.romanTranslit || ''} {selectedLetter.ipa ? `(${selectedLetter.ipa})` : ''}
              </span>
            </div>

            {/* Script Character Showcase Canvas */}
            <div className="bg-base-200/30 rounded-2xl py-2.5 sm:py-3 px-3 sm:px-4 border border-base-200/80 text-center flex flex-col items-center justify-center min-h-[90px] sm:min-h-[110px]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-base-content/40 mb-0.5">
                Tracing Target
              </span>
              <div className={`${scriptFont} text-6xl sm:text-7xl ${scriptFont === 'font-nastaliq' ? 'font-bold' : 'font-medium'} text-primary leading-none select-none my-0.5`}>
                {charToTrace}
              </div>
            </div>

            {/* Symmetrical Dual Script Reference Boxes */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {/* Hindi Script Info */}
              <div className="bg-base-200/40 p-2 sm:p-2.5 rounded-xl border border-base-300/60 text-center flex flex-col justify-between min-h-[62px] sm:min-h-[68px]">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-base-content/50">
                  Hindi
                </span>
                <span className="font-devanagari text-lg sm:text-xl font-medium text-base-content my-0.5 select-none">
                  {selectedLetter.hindiChar}
                </span>
                <span className="text-[10px] text-base-content/60 font-semibold truncate">
                  {selectedLetter.hindiNameTranslit || selectedLetter.hindiName || selectedLetter.hindiChar}
                </span>
              </div>

              {/* Urdu Script Info */}
              <div className="bg-base-200/40 p-2 sm:p-2.5 rounded-xl border border-base-300/60 text-center flex flex-col justify-between min-h-[62px] sm:min-h-[68px]">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-primary">
                  Urdu
                </span>
                <span className="font-nastaliq text-xl sm:text-2xl font-bold text-primary my-0.5 leading-none select-none">
                  {selectedLetter.urduChar}
                </span>
                <span className="text-[10px] text-base-content/60 font-semibold truncate">
                  {selectedLetter.urduNameTranslit || selectedLetter.urduName || selectedLetter.urduChar}
                </span>
              </div>
            </div>

            {/* Previous / Next Letter Navigation */}
            <div className="flex items-center gap-2 pt-1.5 border-t border-base-200/80">
              <button
                onClick={handlePrevLetter}
                className="btn btn-xs sm:btn-sm btn-ghost flex-1 rounded-xl text-xs gap-1 border border-base-300"
                title="Previous letter"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
              <button
                onClick={handleNextLetter}
                className="btn btn-xs sm:btn-sm btn-ghost flex-1 rounded-xl text-xs gap-1 border border-base-300"
                title="Next letter"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Letter Dropdown Selector */}
            <div className="pt-0.5">
              <select
                value={selectedLetter.id}
                onChange={(e) => {
                  const found = practiceItems.find(l => l.id === e.target.value);
                  if (found) {
                    setSelectedLetter(found);
                    clearCanvas();
                  }
                }}
                className="select select-bordered select-xs sm:select-sm w-full rounded-xl text-xs bg-base-200/50 border-base-300"
                aria-label="Select character to practice"
              >
                {practiceItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {isHindiToUrdu
                      ? `${item.urduChar} — ${item.urduNameTranslit || item.romanTranslit} (${item.hindiChar})`
                      : `${item.hindiChar} — ${item.hindiNameTranslit || item.romanTranslit} (${item.urduChar})`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Calligraphic Rule Advice Box (Desktop: under inspector; Mobile: ordered neatly below) */}
          <div className="hidden lg:block bg-base-100 p-5 rounded-3xl border border-base-300 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>Calligraphic Baseline Rule</span>
            </div>
            <p className="text-xs text-base-content/80 leading-relaxed font-normal">
              {isHindiToUrdu ? (
                <>
                  In Urdu Nastaliq, <strong>Alif (ا)</strong> stands upright with its foot resting <strong>directly on the Khatt-e-Meezan (solid baseline)</strong>. It never crosses below. Only circular <em>dā'ira</em> letters (like ج, ع, س, ن, ی) dip below the line into the descender zone.
                </>
              ) : (
                <>
                  In Hindi Devanagari, letters hang suspended from the top horizontal <strong>Shirorekha (शिरोरेखा)</strong> headline anchor line.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Right Column: HTML5 Canvas Whiteboard Surface */}
        <div className="lg:col-span-3 space-y-3 sm:space-y-4">
          
          {/* Main Drawing Container with Calibrated Guidelines */}
          <div 
            ref={containerRef}
            className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-base-300 bg-base-200/30 shadow-inner min-h-[340px] sm:min-h-[460px] select-none"
          >
            {/* Unified SVG Calligraphic Guidelines & Synchronized Baseline Tracing Watermark */}
            <div className="absolute inset-0 pointer-events-none z-0 select-none overflow-hidden">
              <svg 
                viewBox={isMobile ? "0 0 600 600" : "0 0 1000 600"} 
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Guidelines Layer */}
                {showGuidelines && (
                  <g className="transition-opacity duration-200">
                    {!isHindiToUrdu ? (
                      /* Hindi Devanagari Guidelines: Upper Zone, Shirorekha, Base Line, Descender */
                      <g>
                        {/* Upper Matra Line (y = 120) */}
                        <line 
                          x1={isMobile ? "25" : "40"} 
                          y1="120" 
                          x2={isMobile ? "575" : "960"} 
                          y2="120" 
                          stroke="currentColor" 
                          strokeDasharray="6,6" 
                          strokeOpacity="0.12" 
                          strokeWidth="1" 
                        />
                        <text 
                          x={isMobile ? "30" : "50"} 
                          y="112" 
                          fill="currentColor" 
                          fillOpacity="0.28" 
                          fontSize={isMobile ? "11" : "12"} 
                          fontWeight="500"
                        >
                          {isMobile ? "ऊर्ध्व मात्रा रेखा (े, ै, ो, औ)" : "Upper Matra Zone (ऊर्ध्व मात्रा रेखा — े, ै, ो, औ, ं)"}
                        </text>

                        {/* Top Shirorekha Headline (y = 210) - PRIMARY ANCHOR */}
                        <line 
                          x1={isMobile ? "25" : "40"} 
                          y1="210" 
                          x2={isMobile ? "575" : "960"} 
                          y2="210" 
                          stroke="currentColor" 
                          strokeOpacity="0.25" 
                          strokeWidth="1.5" 
                        />
                        <text 
                          x={isMobile ? "30" : "50"} 
                          y="202" 
                          fill="currentColor" 
                          fillOpacity="0.35" 
                          fontSize={isMobile ? "11" : "12"} 
                          fontWeight="500"
                        >
                          {isMobile ? "शिरोरेखा (Headline)" : "Shirorekha (शिरोरेखा — Top Headline)"}
                        </text>

                        {/* Consonant Base Line (y = 405) */}
                        <line 
                          x1={isMobile ? "25" : "40"} 
                          y1="405" 
                          x2={isMobile ? "575" : "960"} 
                          y2="405" 
                          stroke="currentColor" 
                          strokeDasharray="8,6" 
                          strokeOpacity="0.2" 
                          strokeWidth="1.5" 
                        />
                        <text 
                          x={isMobile ? "30" : "50"} 
                          y="425" 
                          fill="currentColor" 
                          fillOpacity="0.35" 
                          fontSize={isMobile ? "11" : "12"} 
                          fontWeight="500"
                        >
                          {isMobile ? "आधार रेखा (Baseline)" : "Base Line (आधार रेखा — Consonant Foot)"}
                        </text>

                        {/* Lower Descender Line (y = 500) */}
                        <line 
                          x1={isMobile ? "25" : "40"} 
                          y1="500" 
                          x2={isMobile ? "575" : "960"} 
                          y2="500" 
                          stroke="currentColor" 
                          strokeDasharray="4,6" 
                          strokeOpacity="0.12" 
                          strokeWidth="1" 
                        />
                        <text 
                          x={isMobile ? "30" : "50"} 
                          y="520" 
                          fill="currentColor" 
                          fillOpacity="0.28" 
                          fontSize={isMobile ? "11" : "12"} 
                          fontWeight="500"
                        >
                          {isMobile ? "निम्न मात्रा रेखा (ु, ू, ृ)" : "Lower Matra Zone (निम्न मात्रा रेखा — ु, ू, ृ)"}
                        </text>
                      </g>
                    ) : (
                      /* Urdu Nastaliq Guidelines: Khatt-e-A'la, Khatt-e-Wast, Khatt-e-Meezan, Khatt-e-Daira */
                      <g>
                        {/* Ascender Line: Khatt-e-A'la (y = 150) */}
                        <line 
                          x1={isMobile ? "25" : "40"} 
                          y1="150" 
                          x2={isMobile ? "575" : "960"} 
                          y2="150" 
                          stroke="currentColor" 
                          strokeDasharray="6,6" 
                          strokeOpacity="0.12" 
                          strokeWidth="1" 
                        />
                        <text 
                          x={isMobile ? "570" : "940"} 
                          y="142" 
                          textAnchor="end" 
                          fill="currentColor" 
                          fillOpacity="0.28" 
                          fontSize={isMobile ? "11" : "12"} 
                          fontWeight="500"
                        >
                          {isMobile ? "خطِ اعلیٰ (Ascender)" : "Khatt-e-A'la (خطِ اعلیٰ — Ascender: ا, ل, ک)"}
                        </text>

                        {/* Meanline: Khatt-e-Wast (y = 275) */}
                        <line 
                          x1={isMobile ? "25" : "40"} 
                          y1="275" 
                          x2={isMobile ? "575" : "960"} 
                          y2="275" 
                          stroke="currentColor" 
                          strokeDasharray="4,6" 
                          strokeOpacity="0.12" 
                          strokeWidth="1" 
                        />
                        <text 
                          x={isMobile ? "570" : "940"} 
                          y="268" 
                          textAnchor="end" 
                          fill="currentColor" 
                          fillOpacity="0.28" 
                          fontSize={isMobile ? "11" : "12"} 
                          fontWeight="500"
                        >
                          {isMobile ? "خطِ وسط (Waistline)" : "Khatt-e-Wast (خطِ وسط — Waistline: ب, د, ر)"}
                        </text>

                        {/* Primary Baseline: KHATT-E-MEEZAN (y = 395) - SOLID ANCHOR */}
                        <line 
                          x1={isMobile ? "25" : "40"} 
                          y1="395" 
                          x2={isMobile ? "575" : "960"} 
                          y2="395" 
                          stroke="currentColor" 
                          strokeOpacity="0.28" 
                          strokeWidth="1.8" 
                        />
                        <text 
                          x={isMobile ? "570" : "940"} 
                          y="415" 
                          textAnchor="end" 
                          fill="currentColor" 
                          fillOpacity="0.35" 
                          fontSize={isMobile ? "11" : "12"} 
                          fontWeight="500"
                        >
                          {isMobile ? "خطِ میزان (Baseline)" : "Khatt-e-Meezan (خطِ میزان — Primary Baseline)"}
                        </text>

                        {/* Descender Line: Khatt-e-Daira (y = 510) */}
                        <line 
                          x1={isMobile ? "25" : "40"} 
                          y1="510" 
                          x2={isMobile ? "575" : "960"} 
                          y2="510" 
                          stroke="currentColor" 
                          strokeDasharray="8,6" 
                          strokeOpacity="0.16" 
                          strokeWidth="1.2" 
                        />
                        <text 
                          x={isMobile ? "570" : "940"} 
                          y="530" 
                          textAnchor="end" 
                          fill="currentColor" 
                          fillOpacity="0.28" 
                          fontSize={isMobile ? "11" : "12"} 
                          fontWeight="500"
                        >
                          {isMobile ? "خطِ دائرہ (Descender)" : "Khatt-e-Daira (خطِ دائرہ — Descender: ج, ع, ن, ی)"}
                        </text>
                      </g>
                    )}
                  </g>
                )}

                {/* Faint Tracing Watermark Text - Exact Typographic Baseline Match */}
                {showWatermark && (
                  <text
                    x={isMobile ? "300" : "500"}
                    y={isHindiToUrdu ? 395 : 405}
                    textAnchor="middle"
                    dominantBaseline="alphabetic"
                    className={scriptFont}
                    fill="currentColor"
                    fillOpacity={watermarkOpacity}
                    fontSize={isHindiToUrdu ? (isMobile ? 350 : 260) : (isMobile ? 320 : 318)}
                    fontWeight={isHindiToUrdu ? 'normal' : '500'}
                    style={{ userSelect: 'none' }}
                  >
                    {charToTrace}
                  </text>
                )}
              </svg>
            </div>

            {/* HTML5 Canvas Drawing Surface */}
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative z-10 cursor-crosshair w-full block"
              style={{ touchAction: 'none' }}
            />

            {/* Canvas Overlay Quick Toggles */}
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-4 z-20 flex items-center gap-1 sm:gap-1.5 bg-base-100/95 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-base-300 shadow-sm">
              <button
                onClick={() => setShowWatermark(!showWatermark)}
                className={`btn btn-xs rounded-lg sm:rounded-xl gap-1 ${showWatermark ? 'btn-primary' : 'btn-ghost'}`}
                title="Toggle watermark letter guide"
              >
                {showWatermark ? <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <EyeOff className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                <span className="text-[10px]">Watermark</span>
              </button>

              <button
                onClick={() => setShowGuidelines(!showGuidelines)}
                className={`btn btn-xs rounded-lg sm:rounded-xl ${showGuidelines ? 'btn-neutral' : 'btn-ghost text-base-content/60'}`}
                title="Toggle calligraphic baseline guidelines"
              >
                <Sliders className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="text-[10px]">Baselines</span>
              </button>
            </div>
          </div>

          {/* Stroke Tool Controls Bar: Highly responsive dual-row on mobile, single row on desktop */}
          <div className="bg-base-100 p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-base-300 shadow-sm space-y-2.5 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-3">
            
            {/* Row 1 on Mobile / Left Section on Desktop: Tool Selectors & Action Buttons */}
            <div className="flex items-center justify-between sm:justify-start gap-1.5 sm:gap-3 flex-wrap">
              {/* Tool Selection: Qalam vs Pen vs Eraser */}
              <div className="flex items-center gap-1 bg-base-200/60 p-0.5 sm:p-1 rounded-xl sm:rounded-2xl border border-base-300">
                <button
                  onClick={() => setTool('calligraphy')}
                  className={`btn btn-xs sm:btn-sm rounded-lg sm:rounded-xl gap-1 ${tool === 'calligraphy' ? 'btn-primary shadow-sm' : 'btn-ghost'}`}
                  title="Traditional angled calligraphy chisel nib (Qalam)"
                >
                  <Feather className="w-3.5 h-3.5" />
                  <span className="text-xs">Qalam</span>
                </button>
                <button
                  onClick={() => setTool('pen')}
                  className={`btn btn-xs sm:btn-sm rounded-lg sm:rounded-xl gap-1 ${tool === 'pen' ? 'btn-primary shadow-sm' : 'btn-ghost'}`}
                  title="Smooth rounded pen"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span className="text-xs">Pen</span>
                </button>
                <button
                  onClick={() => setTool('eraser')}
                  className={`btn btn-xs sm:btn-sm rounded-lg sm:rounded-xl gap-1 ${tool === 'eraser' ? 'btn-neutral shadow-sm' : 'btn-ghost'}`}
                  title="Eraser"
                >
                  <Eraser className="w-3.5 h-3.5" />
                  <span className="text-xs">Eraser</span>
                </button>
              </div>

              {/* Action Buttons: Undo, Clear, Save (shown here on mobile for one-hand reach) */}
              <div className="flex items-center gap-1 sm:hidden">
                <button
                  onClick={undo}
                  disabled={historyStep <= 0}
                  className="btn btn-xs btn-ghost rounded-lg border border-base-300 p-1.5"
                  title="Undo last stroke"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={clearCanvas}
                  className="btn btn-xs btn-ghost hover:btn-error rounded-lg border border-base-300 p-1.5"
                  title="Clear entire canvas"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={downloadDrawing}
                  className="btn btn-xs btn-primary rounded-lg px-2 gap-1 shadow-sm"
                  title="Export drawing as PNG"
                >
                  <Download className="w-3 h-3" />
                  <span className="text-[11px]">Save</span>
                </button>
              </div>
            </div>

            {/* Row 2 on Mobile / Middle & Right Section on Desktop */}
            <div className="flex items-center justify-between sm:justify-end gap-3 flex-wrap">
              {/* Brush Width Slider */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] sm:text-xs font-semibold text-base-content/70">Nib:</span>
                <input
                  type="range"
                  min="2"
                  max="18"
                  value={lineWidth}
                  onChange={(e) => setLineWidth(Number(e.target.value))}
                  className="range range-xs range-primary w-20 sm:w-24"
                />
                <span className="text-[11px] sm:text-xs font-semibold text-base-content/60 w-5">{lineWidth}px</span>
              </div>

              {/* Brush Color Palette */}
              {tool !== 'eraser' && (
                <div className="flex items-center gap-1 sm:gap-1.5">
                  {colorPalette.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => setStrokeColor(p.color)}
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border shadow-sm transition-transform ${
                        strokeColor === p.color ? 'scale-125 ring-2 ring-primary ring-offset-2 ring-offset-base-100' : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: p.color }}
                      title={p.name}
                    />
                  ))}
                </div>
              )}

              {/* Desktop Action Buttons: Undo, Clear, Save */}
              <div className="hidden sm:flex items-center gap-1.5 sm:ml-2">
                <button
                  onClick={undo}
                  disabled={historyStep <= 0}
                  className="btn btn-sm btn-ghost rounded-xl border border-base-300 gap-1.5"
                  title="Undo last stroke"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="text-xs">Undo</span>
                </button>

                <button
                  onClick={clearCanvas}
                  className="btn btn-sm btn-ghost hover:btn-error rounded-xl border border-base-300 gap-1.5"
                  title="Clear entire canvas"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="text-xs">Clear</span>
                </button>

                <button
                  onClick={downloadDrawing}
                  className="btn btn-sm btn-primary rounded-xl gap-1.5 shadow-sm"
                  title="Export drawing as PNG"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="text-xs">Save</span>
                </button>
              </div>
            </div>

          </div>

          {/* Calligraphic Rule Advice Box (Visible on mobile below canvas) */}
          <div className="block lg:hidden bg-base-100 p-4 rounded-2xl border border-base-300 shadow-sm space-y-2 mt-4">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>Calligraphic Baseline Rule</span>
            </div>
            <p className="text-xs text-base-content/80 leading-relaxed font-normal">
              {isHindiToUrdu ? (
                <>
                  In Urdu Nastaliq, <strong>Alif (ا)</strong> stands upright with its foot resting <strong>directly on the Khatt-e-Meezan (solid baseline)</strong>. It never crosses below. Only circular <em>dā'ira</em> letters (like ج, ع, س, ن, ی) dip below the line into the descender zone.
                </>
              ) : (
                <>
                  In Hindi Devanagari, letters hang suspended from the top horizontal <strong>Shirorekha (शिरोरेखा)</strong> headline anchor line.
                </>
              )}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
