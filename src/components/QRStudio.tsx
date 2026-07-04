import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  QrCode, 
  Download, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  RotateCcw, 
  Upload, 
  Trash2, 
  Info, 
  Heart, 
  Star, 
  Circle, 
  Square, 
  RefreshCw,
  Sliders,
  Palette,
  Droplets
} from 'lucide-react';
import ColorWheel from './ColorWheel';

const ALIGNMENT_PATTERNS: { [key: number]: number[] } = {
  2: [6, 18],
  3: [6, 22],
  4: [6, 26],
  5: [6, 30],
  6: [6, 34],
  7: [6, 22, 38],
  8: [6, 24, 42],
  9: [6, 26, 46],
  10: [6, 28, 50],
  11: [6, 30, 54],
  12: [6, 32, 58],
  13: [6, 34, 62],
  14: [6, 26, 46, 66],
  15: [6, 26, 48, 70],
  16: [6, 26, 50, 74],
  17: [6, 30, 54, 78],
  18: [6, 30, 56, 82],
  19: [6, 30, 58, 86],
  20: [6, 34, 62, 90],
  21: [6, 28, 50, 72, 94],
  22: [6, 26, 50, 74, 98],
  23: [6, 30, 54, 78, 102],
  24: [6, 28, 54, 80, 106],
  25: [6, 32, 58, 84, 110],
  26: [6, 30, 58, 86, 114],
  27: [6, 34, 62, 90, 118],
  28: [6, 26, 50, 74, 98, 122],
  29: [6, 30, 54, 78, 102, 126],
  30: [6, 26, 52, 78, 104, 130],
  31: [6, 30, 56, 82, 108, 134],
  32: [6, 34, 60, 86, 112, 138],
  33: [6, 30, 58, 86, 114, 142],
  34: [6, 34, 62, 90, 118, 146],
  35: [6, 30, 54, 78, 102, 126, 150],
  36: [6, 24, 50, 76, 102, 128, 154],
  37: [6, 28, 54, 80, 106, 132, 158],
  38: [6, 32, 58, 84, 110, 136, 162],
  39: [6, 26, 54, 82, 110, 138, 166],
  40: [6, 30, 58, 86, 114, 142, 170]
};

interface QRStudioProps {
  onStyleUpdate: (style: string, fg: string, bg: string, hasLogo: boolean) => void;
}

export default function QRStudio({ onStyleUpdate }: QRStudioProps) {
  // Configs
  const [text, setText] = useState('https://github.com/HonoravelMacho/qrcodando');
  const [pointStyle, setPointStyle] = useState<'square' | 'circle' | 'heart' | 'star' | 'connected' | 'liquid'>('circle');
  const [fgColor, setFgColor] = useState<[number, number, number]>([15, 23, 42]); // #0F172A (slate-900) - Dark foreground
  const [bgColor, setBgColor] = useState<[number, number, number]>([255, 255, 255]); // #FFFFFF (white) - Light background
  const [bgMode, setBgMode] = useState<'solid' | 'radial' | 'transparent'>('solid');
  const [radialColor, setRadialColor] = useState<[number, number, number]>([241, 245, 249]); // #F1F5F9 (slate-100) - Soft light background
  const [paddingRatio, setPaddingRatio] = useState<number>(1.4); // how much margin around the logo (1.0 - 2.5)
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);
  const [logoName, setLogoName] = useState<string>('');
  
  // Real-time calculation states
  const [contrastRatio, setContrastRatio] = useState<number>(21);
  const [modulesSkippedPct, setModulesSkippedPct] = useState<number>(0);
  const [isReadable, setIsReadable] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Convert RGB to Hex for display
  const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('').toUpperCase();
  };

  // Convert Hex to RGB
  const hexToRgb = (hex: string): [number, number, number] => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result 
      ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
      : [0, 0, 0];
  };

  // Contrast Ratio Calculations (WCAG Guidelines)
  useEffect(() => {
    const getLuminance = (rgb: [number, number, number]): number => {
      const [aR, aG, aB] = rgb.map(v => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * aR + 0.7152 * aG + 0.0722 * aB;
    };

    const l1 = getLuminance(fgColor);
    const l2 = bgMode === 'transparent' ? 0.05 : getLuminance(bgColor);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    const ratio = (brightest + 0.05) / (darkest + 0.05);
    setContrastRatio(ratio);
  }, [fgColor, bgColor, bgMode]);

  // Main Canvas Rendering Loop
  useEffect(() => {
    renderQRCode();
  }, [text, pointStyle, fgColor, bgColor, bgMode, radialColor, paddingRatio, logoImg]);

  const renderQRCode = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      // 1. Generate QR matrix with Error Correction Level H (30%)
      const qr = QRCode.create(text || 'https://github.com/HonoravelMacho/qrcodando', { 
        errorCorrectionLevel: 'H' 
      });
      const N = qr.modules.size;
      
      const width = canvas.width;
      const height = canvas.height;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw background
      if (bgMode === 'solid') {
        ctx.fillStyle = `rgb(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]})`;
        ctx.fillRect(0, 0, width, height);
      } else if (bgMode === 'radial') {
        const grad = ctx.createRadialGradient(width/2, height/2, 20, width/2, height/2, width/2);
        grad.addColorStop(0, `rgb(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]})`);
        grad.addColorStop(1, `rgb(${radialColor[0]}, ${radialColor[1]}, ${radialColor[2]})`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      } else {
        // Transparent
        ctx.clearRect(0, 0, width, height);
      }

      const borderModules = 4;
      const borderPx = borderModules * (width / (N + 2 * borderModules));
      const boxSize = (width - 2 * borderPx) / N;

      // Prepare logo analyzer if we have a logo
      let logoWidth = 0;
      let logoHeight = 0;
      let logoX = 0;
      let logoY = 0;
      let logoAlphaData: Uint8Array | null = null;

      if (logoImg) {
        // Logo size should occupy max 26% of QR size
        const maxLogoSize = width * 0.26;
        const scale = Math.min(maxLogoSize / logoImg.width, maxLogoSize / logoImg.height);
        logoWidth = logoImg.width * scale;
        logoHeight = logoImg.height * scale;
        logoX = (width - logoWidth) / 2;
        logoY = (height - logoHeight) / 2;

        // Perform offscreen canvas analysis of logo transparency channel
        const offCanvas = document.createElement('canvas');
        offCanvas.width = Math.ceil(logoWidth);
        offCanvas.height = Math.ceil(logoHeight);
        const offCtx = offCanvas.getContext('2d');
        if (offCtx) {
          offCtx.drawImage(logoImg, 0, 0, logoWidth, logoHeight);
          const imgData = offCtx.getImageData(0, 0, logoWidth, logoHeight);
          // Store alpha values
          logoAlphaData = new Uint8Array(imgData.width * imgData.height);
          for (let i = 0; i < imgData.data.length; i += 4) {
            logoAlphaData[i / 4] = imgData.data[i + 3]; // Alpha channel (0-255)
          }
        }
      }

      // Check module collisions
      let modulesTotal = 0;
      let modulesSkipped = 0;

      // Draw modules
      ctx.fillStyle = `rgb(${fgColor[0]}, ${fgColor[1]}, ${fgColor[2]})`;

      for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
          const isActive = qr.modules.get(r, c) === 1;
          if (!isActive) continue;

          modulesTotal++;

          // Coordinates
          const x0 = borderPx + c * boxSize;
          const y0 = borderPx + r * boxSize;
          const x1 = x0 + boxSize;
          const y1 = y0 + boxSize;
          const cx = (x0 + x1) / 2;
          const cy = (y0 + y1) / 2;

          // --- Collision dodge algorithm ---
          if (logoImg && logoAlphaData) {
            // Check if center of module lies inside the logo bounding box
            if (cx >= logoX && cx <= logoX + logoWidth && cy >= logoY && cy <= logoY + logoHeight) {
              const localX = Math.floor(cx - logoX);
              const localY = Math.floor(cy - logoY);

              const checkWidth = Math.ceil(logoWidth);
              const checkHeight = Math.ceil(logoHeight);

              // Analyze neighborhood around (localX, localY) based on padding
              const padPx = Math.ceil(boxSize * paddingRatio);
              let isColliding = false;

              for (let dy = -padPx; dy <= padPx; dy++) {
                for (let dx = -padPx; dx <= padPx; dx++) {
                  const tx = localX + dx;
                  const ty = localY + dy;
                  if (tx >= 0 && tx < checkWidth && ty >= 0 && ty < checkHeight) {
                    const alphaIdx = ty * checkWidth + tx;
                    if (logoAlphaData[alphaIdx] > 40) { // Threshold for collision
                      isColliding = true;
                      break;
                    }
                  }
                }
                if (isColliding) break;
              }

              if (isColliding) {
                modulesSkipped++;
                continue; // Skip drawing to allow organic dodge!
              }
            }
          }

          // Finder patterns should remain solid squares for robust scanning
          const isFinder = (
            (r < 8 && c < 8) ||
            (r < 8 && c >= N - 8) ||
            (r >= N - 8 && c < 8)
          );

          // Alignment patterns should also remain solid squares for robust scanning
          const isAlignmentPattern = (() => {
            const version = Math.round((N - 17) / 4);
            const coords = ALIGNMENT_PATTERNS[version];
            if (!coords) return false;

            for (const rCenter of coords) {
              for (const cCenter of coords) {
                // Skip if center overlaps with finder patterns
                const isOverlappingFinder = 
                  (rCenter < 8 && cCenter < 8) ||
                  (rCenter < 8 && cCenter >= N - 8) ||
                  (rCenter >= N - 8 && cCenter < 8);
                
                if (isOverlappingFinder) continue;

                // Check if current (r, c) is inside the 5x5 alignment pattern centered at (rCenter, cCenter)
                if (Math.abs(r - rCenter) <= 2 && Math.abs(c - cCenter) <= 2) {
                  return true;
                }
              }
            }
            return false;
          })();

          if (isFinder || isAlignmentPattern) {
            // Classic full square finder / alignment pattern (drawn with slight overlap to prevent anti-aliasing gaps)
            ctx.fillRect(x0 - 0.15, y0 - 0.15, boxSize + 0.3, boxSize + 0.3);
          } else {
            // Draw styled custom point
            ctx.beginPath();
            if (pointStyle === 'square') {
              ctx.rect(x0, y0, boxSize, boxSize);
              ctx.fill();
            } else if (pointStyle === 'circle') {
              ctx.arc(cx, cy, (boxSize / 2) * 0.94, 0, 2 * Math.PI);
              ctx.fill();
            } else if (pointStyle === 'heart') {
              // Upgraded highly scannable, well-proportioned vector heart shape
              const w = boxSize;
              const h = boxSize;
              const topCleftY = y0 + h * 0.25;
              const bottomY = y0 + h * 0.95;
              const leftPeakX = x0 + w * 0.18;
              const leftPeakY = y0 + h * 0.08;
              const rightPeakX = x0 + w * 0.82;
              const rightPeakY = y0 + h * 0.08;
              const leftX = x0 + w * 0.02;
              const leftY = y0 + h * 0.42;
              const rightX = x0 + w * 0.98;
              const rightY = y0 + h * 0.42;

              ctx.moveTo(cx, topCleftY);
              // Left lobe curve
              ctx.bezierCurveTo(leftPeakX, leftPeakY - h*0.05, leftX, leftY - h*0.1, leftX, leftY);
              // Left-to-bottom curve
              ctx.bezierCurveTo(leftX, leftY + h*0.25, x0 + w * 0.25, bottomY - h*0.1, cx, bottomY);
              // Bottom-to-right curve
              ctx.bezierCurveTo(x0 + w * 0.75, bottomY - h*0.1, rightX, rightY + h*0.25, rightX, rightY);
              // Right lobe curve
              ctx.bezierCurveTo(rightX, rightY - h*0.1, rightPeakX, rightPeakY - h*0.05, cx, topCleftY);
              ctx.closePath();
              ctx.fill();
            } else if (pointStyle === 'liquid') {
              // Organic fluid droplet shape (teardrop pointing up-right with tiny splash satellites)
              const rMain = boxSize * 0.44;
              
              // Draw main teardrop bulb
              ctx.arc(cx - boxSize * 0.05, cy + boxSize * 0.05, rMain, 0.25 * Math.PI, 1.25 * Math.PI);
              // Draw top-right tapered tip
              ctx.lineTo(cx + boxSize * 0.35, cy - boxSize * 0.35);
              ctx.closePath();
              ctx.fill();

              // Draw a tiny secondary splash droplet separate from the main one
              ctx.beginPath();
              ctx.arc(cx + boxSize * 0.32, cy - boxSize * 0.32, boxSize * 0.11, 0, 2 * Math.PI);
              ctx.fill();

              // Draw a tiny secondary ripple drop on the other side
              ctx.beginPath();
              ctx.arc(cx - boxSize * 0.35, cy + boxSize * 0.35, boxSize * 0.07, 0, 2 * Math.PI);
              ctx.fill();
            } else if (pointStyle === 'star') {
              // Elegant 4-pointed star
              const rOuter = boxSize * 0.52;
              const rInner = boxSize * 0.18;
              ctx.moveTo(cx, cy - rOuter);
              ctx.lineTo(cx + rInner, cy - rInner);
              ctx.lineTo(cx + rOuter, cy);
              ctx.lineTo(cx + rInner, cy + rInner);
              ctx.lineTo(cx, cy + rOuter);
              ctx.lineTo(cx - rInner, cy + rInner);
              ctx.lineTo(cx - rOuter, cy);
              ctx.lineTo(cx - rInner, cy - rInner);
              ctx.closePath();
              ctx.fill();
            } else if (pointStyle === 'connected') {
              // Check adjacent modules to draw continuous lines
              const hasUp = r > 0 && qr.modules.get(r - 1, c) === 1;
              const hasDown = r < N - 1 && qr.modules.get(r + 1, c) === 1;
              const hasLeft = c > 0 && qr.modules.get(r, c - 1) === 1;
              const hasRight = c < N - 1 && qr.modules.get(r, c + 1) === 1;

              // Draw circular center
              ctx.arc(cx, cy, boxSize * 0.4, 0, 2 * Math.PI);
              ctx.fill();

              // Draw bridges to neighbors
              if (hasUp) ctx.fillRect(cx - boxSize*0.28, y0, boxSize*0.56, boxSize*0.5);
              if (hasDown) ctx.fillRect(cx - boxSize*0.28, cy, boxSize*0.56, boxSize*0.5);
              if (hasLeft) ctx.fillRect(x0, cy - boxSize*0.28, boxSize*0.5, boxSize*0.56);
              if (hasRight) ctx.fillRect(cx, cy - boxSize*0.28, boxSize*0.5, boxSize*0.56);
            }
          }
        }
      }

      // Calculate skipped data modules pct
      const skippedPct = modulesTotal > 0 ? (modulesSkipped / modulesTotal) * 100 : 0;
      setModulesSkippedPct(skippedPct);
      setIsReadable(skippedPct <= 30.0);

      // Draw the central logo on top of skipped points
      if (logoImg) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 8;
        ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);
        ctx.shadowBlur = 0; // reset
      }

      // Trigger update back to parent component for telemetry/status synchronization
      onStyleUpdate(pointStyle, rgbToHex(fgColor[0], fgColor[1], fgColor[2]), rgbToHex(bgColor[0], bgColor[1], bgColor[2]), !!logoImg);

    } catch (err) {
      console.error('Error generating QR code: ', err);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setLogoImg(img);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const clearLogo = () => {
    setLogoImg(null);
    setLogoName('');
    if (logoInputRef.current) logoInputRef.current.value = '';
  };

  const downloadQR = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `qrcodando_${pointStyle}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Helper for preset configurations
  const applyPreset = (presetText: string, style: typeof pointStyle, fg: [number, number, number], bg: [number, number, number]) => {
    setText(presetText);
    setPointStyle(style);
    setFgColor(fg);
    setBgColor(bg);
  };

  return (
    <div id="qr-studio-container" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* CONTROL PANEL (LEFT SIDE) */}
      <div id="studio-controls" className="lg:col-span-7 bg-[#1e293b] border border-[#334155] rounded-2xl p-6 shadow-xl flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sliders className="w-5 h-5 text-[#38bdf8]" />
            <h2 className="text-lg font-mono font-bold text-white uppercase tracking-wide">Configurações Artísticas</h2>
          </div>
          <p className="text-xs text-[#94a3b8]">Modifique os parâmetros do QR Code para gerar variações visuais em tempo real.</p>
        </div>

        {/* Text/URL Input */}
        <div>
          <label className="block text-xs font-semibold text-[#64748b] uppercase tracking-widest mb-2">
            Conteúdo do QR Code (URL ou Texto)
          </label>
          <input
            id="qr-data-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Cole seu link ou texto aqui..."
            className="w-full bg-[#0f172a] border border-[#334155] rounded-lg px-4 py-3 text-[#f1f5f9] placeholder-zinc-500 text-sm focus:outline-none focus:border-[#38bdf8] transition-colors"
          />
        </div>

        {/* Presets Row */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-[#64748b] self-center">Presets de teste:</span>
          <button
            onClick={() => applyPreset('https://github.com/HonoravelMacho/qrcodando', 'circle', [30, 58, 138], [255, 255, 255])}
            className="text-xs bg-[#0f172a] hover:bg-white/5 text-[#94a3b8] hover:text-[#f1f5f9] px-3 py-1.5 rounded-lg border border-[#334155] transition-colors"
          >
            GitHub Repo
          </button>
          <button
            onClick={() => applyPreset('Tiago Rabelo Sels', 'heart', [153, 27, 27], [254, 242, 242])}
            className="text-xs bg-[#0f172a] hover:bg-white/5 text-[#94a3b8] hover:text-[#f1f5f9] px-3 py-1.5 rounded-lg border border-[#334155] transition-colors"
          >
            Portfólio Tiago
          </button>
          <button
            onClick={() => applyPreset('WIFI:S:Qrcodando_Network;T:WPA;P:Apache2License;;', 'star', [6, 95, 70], [240, 253, 250])}
            className="text-xs bg-[#0f172a] hover:bg-white/5 text-[#94a3b8] hover:text-[#f1f5f9] px-3 py-1.5 rounded-lg border border-[#334155] transition-colors"
          >
            Config Wifi
          </button>
        </div>

        <hr className="border-[#334155]" />

        {/* Module Style Grid Selector */}
        <div>
          <label className="block text-xs font-semibold text-[#64748b] uppercase tracking-widest mb-3">
            Estilo dos Módulos (Pontos)
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[
              { id: 'square', label: 'Quadrados', icon: <Square className="w-4 h-4" /> },
              { id: 'circle', label: 'Círculos', icon: <Circle className="w-4 h-4" /> },
              { id: 'heart', label: 'Corações', icon: <Heart className="w-4 h-4" /> },
              { id: 'star', label: 'Estrelas', icon: <Star className="w-4 h-4" /> },
              { id: 'connected', label: 'Conexões', icon: <RefreshCw className="w-4 h-4" /> },
              { id: 'liquid', label: 'Líquido', icon: <Droplets className="w-4 h-4" /> }
            ].map((style) => (
              <button
                key={style.id}
                onClick={() => setPointStyle(style.id as any)}
                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border text-center transition-all ${
                  pointStyle === style.id
                    ? 'bg-[#38bdf8]/10 border-[#38bdf8] text-[#38bdf8] font-bold'
                    : 'bg-[#0f172a] border-[#334155] text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-white/5'
                }`}
              >
                {style.icon}
                <span className="text-[10px] uppercase font-semibold">{style.label}</span>
              </button>
            ))}
          </div>
        </div>

        <hr className="border-[#334155]" />

        {/* Colors Selection Workspace */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Wheel & Hex Colors */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#38bdf8]" />
              <span className="text-xs font-semibold text-[#64748b] uppercase tracking-widest">Seletor de Cores Digital</span>
            </div>
            
            <ColorWheel 
              color={fgColor} 
              onChange={(rgb) => setFgColor(rgb)} 
            />

            <div className="grid grid-cols-2 gap-2 mt-1">
              <div>
                <label className="block text-[10px] font-semibold text-zinc-500 uppercase mb-1">Pincel (Foreground)</label>
                <div className="flex items-center gap-1.5 bg-[#0f172a] border border-[#334155] p-2 rounded-lg">
                  <span className="w-4 h-4 rounded-md border border-white/20 block" style={{ backgroundColor: rgbToHex(fgColor[0], fgColor[1], fgColor[2]) }} />
                  <span className="text-xs font-mono text-zinc-300">{rgbToHex(fgColor[0], fgColor[1], fgColor[2])}</span>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-zinc-500 uppercase mb-1">Plano Fundo (Background)</label>
                <div className="flex items-center gap-1.5 bg-[#0f172a] border border-[#334155] p-2 rounded-lg cursor-pointer hover:border-zinc-700 transition-colors"
                     onClick={() => {
                       // Toggle simple background presets for convenience
                       const nextBg = bgColor[0] === 15 ? [255, 255, 255] : [15, 23, 42];
                       setBgColor(nextBg as any);
                     }}>
                  <span className="w-4 h-4 rounded-md border border-white/20 block" style={{ backgroundColor: rgbToHex(bgColor[0], bgColor[1], bgColor[2]) }} />
                  <span className="text-xs font-mono text-zinc-300">{rgbToHex(bgColor[0], bgColor[1], bgColor[2])}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Logo Collision and Padding Configurations */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold text-[#64748b] uppercase tracking-widest">Invasão de Logo Orgânica</span>
            
            {/* Real upload file block */}
            <div className="border border-[#334155] bg-[#0f172a] rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="bg-[#38bdf8]/10 p-2 rounded-lg text-[#38bdf8]">
                  <Upload className="w-4 h-4" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs text-white font-semibold truncate">
                    {logoName || "Carregar logo transparente"}
                  </p>
                  <p className="text-[10px] text-[#64748b]">PNG com canal Alfa (transparência)</p>
                </div>
              </div>

              <input
                id="logo-file-input"
                type="file"
                ref={logoInputRef}
                onChange={handleLogoUpload}
                accept="image/png, image/jpeg"
                className="hidden"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => logoInputRef.current?.click()}
                  className="flex-1 bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#0f172a] font-bold text-xs py-2 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Procurar Arquivo
                </button>
                {logoImg && (
                  <button
                    onClick={clearLogo}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded-lg transition-colors"
                    title="Remover logotipo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Slider to adjust organic margin padding */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[11px] font-semibold text-[#64748b] uppercase tracking-widest">
                  Margem de Segurança (Padding):
                </label>
                <span className="text-xs font-mono text-[#38bdf8] font-semibold">{(paddingRatio).toFixed(1)}x</span>
              </div>
              <input
                id="padding-slider"
                type="range"
                min="1.0"
                max="2.5"
                step="0.1"
                value={paddingRatio}
                disabled={!logoImg}
                onChange={(e) => setPaddingRatio(parseFloat(e.target.value))}
                className="w-full accent-[#38bdf8] h-1.5 bg-[#0f172a] rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              />
              <p className="text-[9px] text-[#64748b] mt-1">Ajuste o raio de evasão dos pontos ao redor das bordas do logo.</p>
            </div>

            {/* Background mode selector */}
            <div className="mt-1">
              <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-widest mb-1.5">Estilo de Fundo</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'solid', label: 'Sólido' },
                  { id: 'radial', label: 'Radial' },
                  { id: 'transparent', label: 'Transparente' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setBgMode(mode.id as any)}
                    className={`text-xs py-2 px-1 rounded-lg font-semibold text-center transition-all ${
                      bgMode === mode.id
                        ? 'bg-[#334155] border-none text-[#f1f5f9]'
                        : 'bg-[#0f172a] border border-[#334155] text-[#94a3b8] hover:text-[#f1f5f9]'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* PREVIEW PANEL (RIGHT SIDE) */}
      <div id="studio-preview-panel" className="lg:col-span-5 flex flex-col gap-6">
        
        {/* Real-time Renderer Canvas */}
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center gap-6">
          <div className="text-center w-full">
            <h3 className="text-xs font-mono font-semibold tracking-widest text-[#38bdf8] uppercase mb-1">
              Painel de Preview Interativo
            </h3>
            <p className="text-[11px] text-[#94a3b8]">Geração vetorial de altíssima fidelidade</p>
          </div>

          <div className="relative w-full max-w-[340px] aspect-square rounded-2xl bg-white shadow-[0_0_60px_rgba(56,189,248,0.15)] flex items-center justify-center p-4">
            <canvas
              id="qr-preview-canvas"
              ref={canvasRef}
              width={512}
              height={512}
              className="w-full h-full block rounded-lg bg-zinc-950 object-contain"
            />
          </div>

          <button
            onClick={downloadQR}
            className="w-full flex items-center justify-center gap-2 bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#0f172a] font-bold py-3 px-4 rounded-xl transition-all cursor-pointer text-sm shadow-[0_4px_12px_rgba(56,189,248,0.2)] hover:scale-[1.02]"
          >
            <Download className="w-4 h-4" />
            Exportar PNG de Alta Resolução
          </button>
        </div>

        {/* FEEDBACK DE LEGIBILIDADE (WCAG) */}
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-5 flex flex-col gap-4 shadow-md">
          <div className="flex items-center gap-2 border-b border-[#334155] pb-3">
            <Info className="w-4 h-4 text-[#38bdf8] animate-pulse" />
            <span className="text-xs font-mono font-semibold text-white tracking-wide uppercase">Diagnósticos WCAG & Segurança</span>
          </div>

          {/* WCAG Contrast Bar */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] text-[#64748b] uppercase font-semibold">Razão de Contraste WCAG:</span>
              <span className={`text-xs font-mono font-bold ${
                contrastRatio >= 4.5 ? 'text-green-400' : contrastRatio >= 3.0 ? 'text-amber-400' : 'text-red-400'
              }`}>
                {contrastRatio.toFixed(2)} : 1
              </span>
            </div>

            <div className="w-full bg-[#334155] h-2 rounded-full overflow-hidden flex gap-0.5">
              <div className={`h-full ${contrastRatio >= 4.5 ? 'bg-green-500 w-full' : contrastRatio >= 3.0 ? 'bg-amber-500 w-[60%]' : 'bg-red-500 w-[25%]'}`} />
            </div>

            <div className="flex items-center gap-1.5 mt-2">
              <div className={`w-2 h-2 rounded-full ${
                contrastRatio >= 4.5 ? 'bg-green-500' : contrastRatio >= 3.0 ? 'bg-amber-500' : 'bg-red-500'
              }`} />
              <p className="text-[10px] text-[#94a3b8]">
                {contrastRatio >= 4.5 
                  ? 'Contraste Excelente! Leitura perfeitamente garantida sob qualquer iluminação.' 
                  : contrastRatio >= 3.0 
                  ? 'Contraste Regular. Recomendado usar cores mais escuras no QR para maior robustez.' 
                  : 'Aviso de Baixo Contraste! Câmeras antigas podem falhar ao escanear.'}
              </p>
            </div>
          </div>

          {/* Reed-Solomon H Level Check */}
          <div className="border-t border-[#334155] pt-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] text-[#64748b] uppercase font-semibold">Tolerância Reed-Solomon (Nível H):</span>
              <span className={`text-xs font-mono font-semibold ${isReadable ? 'text-emerald-400' : 'text-rose-500'}`}>
                {modulesSkippedPct.toFixed(1)}% suprimido
              </span>
            </div>

            <div className={`flex items-start gap-2 p-2.5 rounded-lg border ${
              isReadable 
                ? 'bg-green-500/5 border-green-500/10 text-green-300' 
                : 'bg-red-500/5 border-red-500/10 text-red-300'
            }`}>
              {isReadable ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-[10px] leading-relaxed">
                    <span className="font-semibold text-emerald-300 block">Sinal Verde de Redundância</span>
                    A invasão do logo suprimiu menos de 30% da área útil de dados. O QR Code preserva sua legibilidade intacta.
                  </div>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div className="text-[10px] leading-relaxed">
                    <span className="font-semibold text-rose-400 block">Limite de Segurança Ultrapassado!</span>
                    Foram removidos mais de 30.0% dos dados para acomodar o logo. Aumente o tamanho do QR ou reduza a margem (Padding) para reativar pontos de dados cruciais.
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
