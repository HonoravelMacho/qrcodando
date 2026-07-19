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
  Droplets,
  Layers,
  Image as ImageIcon
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

const isPointInPolygon = (x: number, y: number, points: [number, number][]): boolean => {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const xi = points[i][0], yi = points[i][1];
    const xj = points[j][0], yj = points[j][1];
    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
};

const getCirclePoints = (cx: number, cy: number, size: number): [number, number][] => {
  const points: [number, number][] = [];
  const radius = size * 0.51;
  const steps = 120;
  for (let i = 0; i < steps; i++) {
    const angle = (i / steps) * 2 * Math.PI;
    points.push([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]);
  }
  return points;
};

const getHeartPoints = (cx: number, cy: number, size: number): [number, number][] => {
  const points: [number, number][] = [];
  const steps = 125;
  const scale = size / 31.5; // Perfectly scaled to fit full width nicely
  const offsetY = cy + size * 0.06;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * 2 * Math.PI;
    // Classic heart parametric equations
    const x = cx + scale * 16 * Math.pow(Math.sin(t), 3);
    const y = offsetY - scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    points.push([x, y]);
  }
  return points;
};

const drawStyledPoint = (
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  cx: number,
  cy: number,
  boxSize: number,
  pointStyle: string
) => {
  if (pointStyle === 'square') {
    const drawSize = boxSize * 0.88;
    const dx = (boxSize - drawSize) / 2;
    const rx = x0 + dx;
    const ry = y0 + dx;
    if (ctx.roundRect) {
      ctx.roundRect(rx, ry, drawSize, drawSize, drawSize * 0.22);
    } else {
      ctx.rect(rx, ry, drawSize, drawSize);
    }
    ctx.fill();
  } else if (pointStyle === 'circle') {
    ctx.arc(cx, cy, (boxSize / 2) * 0.94, 0, 2 * Math.PI);
    ctx.fill();
  } else if (pointStyle === 'heart') {
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
    ctx.bezierCurveTo(leftPeakX, leftPeakY - h * 0.05, leftX, leftY - h * 0.1, leftX, leftY);
    ctx.bezierCurveTo(leftX, leftY + h * 0.25, x0 + w * 0.25, bottomY - h * 0.1, cx, bottomY);
    ctx.bezierCurveTo(x0 + w * 0.75, bottomY - h * 0.1, rightX, rightY + h * 0.25, rightX, rightY);
    ctx.bezierCurveTo(rightX, rightY - h * 0.1, rightPeakX, rightPeakY - h * 0.05, cx, topCleftY);
    ctx.closePath();
    ctx.fill();
  } else if (pointStyle === 'liquid') {
    const rMain = boxSize * 0.42;
    ctx.arc(cx - boxSize * 0.04, cy + boxSize * 0.04, rMain, 0.25 * Math.PI, 1.25 * Math.PI);
    ctx.lineTo(cx + boxSize * 0.38, cy - boxSize * 0.38);
    ctx.closePath();
    ctx.fill();
  } else if (pointStyle === 'star') {
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
    ctx.arc(cx, cy, boxSize * 0.4, 0, 2 * Math.PI);
    ctx.fill();
  }
};

const drawFakeFinder = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  fgColor: [number, number, number],
  bgColor: [number, number, number],
  bgMode: string
) => {
  const s7 = size;
  const s5 = size * (5 / 7);
  const s3 = size * (3 / 7);

  // Outer ring
  ctx.fillStyle = `rgb(${fgColor[0]}, ${fgColor[1]}, ${fgColor[2]})`;
  ctx.fillRect(x - s7 / 2, y - s7 / 2, s7, s7);

  // Inner separator (using background color)
  ctx.fillStyle = bgMode === 'transparent' ? '#ffffff' : `rgb(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]})`;
  ctx.fillRect(x - s5 / 2, y - s5 / 2, s5, s5);

  // Inner solid core
  ctx.fillStyle = `rgb(${fgColor[0]}, ${fgColor[1]}, ${fgColor[2]})`;
  ctx.fillRect(x - s3 / 2, y - s3 / 2, s3, s3);
};

interface QRStudioProps {
  onStyleUpdate: (style: string, fg: string, bg: string, hasLogo: boolean) => void;
}

export default function QRStudio({ onStyleUpdate }: QRStudioProps) {
  // Configs
  const [text, setText] = useState('https://github.com/HonoravelMacho/qrcodando');
  const [pointStyle, setPointStyle] = useState<'square' | 'circle' | 'heart' | 'star' | 'connected' | 'liquid'>('circle');
  const [qrShape, setQrShape] = useState<'square' | 'circle' | 'heart'>('square');
  const [drawOutline, setDrawOutline] = useState<boolean>(true);
  const [outlineWidth, setOutlineWidth] = useState<number>(6);
  const [fgColor, setFgColor] = useState<[number, number, number]>([15, 23, 42]); // #0F172A (slate-900) - Dark foreground
  const [bgColor, setBgColor] = useState<[number, number, number]>([255, 255, 255]); // #FFFFFF (white) - Light background
  const [bgMode, setBgMode] = useState<'solid' | 'radial' | 'transparent'>('solid');
  const [radialColor, setRadialColor] = useState<[number, number, number]>([241, 245, 249]); // #F1F5F9 (slate-100) - Soft light background
  const [paddingRatio, setPaddingRatio] = useState<number>(1.4); // how much margin around the logo (1.0 - 2.5)
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);
  const [logoName, setLogoName] = useState<string>('');
  
  // New States for Background Image & Tab Control
  const [showLogo, setShowLogo] = useState<boolean>(true);
  const [bgImg, setBgImg] = useState<HTMLImageElement | null>(null);
  const [bgName, setBgName] = useState<string>('');
  const [showBgImage, setShowBgImage] = useState<boolean>(false);
  const [adaptiveContrast, setAdaptiveContrast] = useState<boolean>(true);
  const [bgImageData, setBgImageData] = useState<Uint8ClampedArray | null>(null);
  const [activeTab, setActiveTab] = useState<'logo' | 'background'>('logo');
  const bgInputRef = useRef<HTMLInputElement>(null);
  const [bgImageOpacity, setBgImageOpacity] = useState<number>(0.85);
  const [qrPlateOpacity, setQrPlateOpacity] = useState<number>(0.15);
  const [activeColorSlot, setActiveColorSlot] = useState<'fg' | 'bg'>('fg');

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
  }, [text, pointStyle, qrShape, drawOutline, outlineWidth, fgColor, bgColor, bgMode, radialColor, paddingRatio, logoImg, showLogo, bgImg, showBgImage, adaptiveContrast, bgImageData, bgImageOpacity, qrPlateOpacity]);

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

      // Draw standard solid/radial background backdrop FIRST (so transparent PNGs don't show a black canvas)
      if (bgMode === 'solid') {
        ctx.fillStyle = `rgb(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]})`;
        ctx.fillRect(0, 0, width, height);
      } else if (bgMode === 'radial') {
        const grad = ctx.createRadialGradient(width/2, height/2, 20, width/2, height/2, width/2);
        grad.addColorStop(0, `rgb(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]})`);
        grad.addColorStop(1, `rgb(${radialColor[0]}, ${radialColor[1]}, ${radialColor[2]})`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw background image with adjustable opacity on top
      if (bgImg && showBgImage) {
        ctx.save();
        ctx.globalAlpha = bgImageOpacity;
        ctx.drawImage(bgImg, 0, 0, width, height);
        ctx.restore();
      }

      const borderModules = 4;
      const borderPx = borderModules * (width / (N + 2 * borderModules));
      const boxSize = (width - 2 * borderPx) / N;

      // Prepare overall shape points
      const qrSize = width - 2 * borderPx;
      const centerX = width / 2;
      const centerY = height / 2;
      let shapePoints: [number, number][] = [];
      if (qrShape === 'circle') {
        shapePoints = getCirclePoints(centerX, centerY, qrSize);
      } else if (qrShape === 'heart') {
        shapePoints = getHeartPoints(centerX, centerY, qrSize);
      }

      // Helper to sample background luminance at standard coordinates, blending with bgColor based on alpha and opacity
      const getLuminanceAt = (sx: number, sy: number): number => {
        if (!bgImageData) {
          return 0.2126 * (bgColor[0] / 255) + 0.7152 * (bgColor[1] / 255) + 0.0722 * (bgColor[2] / 255);
        }
        const px = Math.min(511, Math.max(0, Math.floor(sx)));
        const py = Math.min(511, Math.max(0, Math.floor(sy)));
        const idx = (py * 512 + px) * 4;
        const rVal = bgImageData[idx];
        const gVal = bgImageData[idx+1];
        const bVal = bgImageData[idx+2];
        const aVal = bgImageData[idx+3] / 255; // Alpha from 0.0 to 1.0
        
        // Blend image pixel with standard background color (bgColor) based on opacity and alpha
        const effectiveAlpha = aVal * bgImageOpacity;
        const rBlended = rVal * effectiveAlpha + bgColor[0] * (1 - effectiveAlpha);
        const gBlended = gVal * effectiveAlpha + bgColor[1] * (1 - effectiveAlpha);
        const bBlended = bVal * effectiveAlpha + bgColor[2] * (1 - effectiveAlpha);
        
        return 0.2126 * (rBlended / 255) + 0.7152 * (gBlended / 255) + 0.0722 * (bBlended / 255);
      };

      const bgLuminance = 0.2126 * (bgColor[0] / 255) + 0.7152 * (bgColor[1] / 255) + 0.0722 * (bgColor[2] / 255);
      const isBgLight = bgLuminance > 0.45;

      // Finder pattern color: if we draw a clean bgColor plate behind the finders,
      // their contrast is defined solely by whether bgColor is light or dark!
      const finderColor = isBgLight ? `rgb(${fgColor[0]}, ${fgColor[1]}, ${fgColor[2]})` : '#ffffff';

      // Module color resolver with adaptive contrast and uniform finder protection
      const getModuleColor = (x: number, y: number, r: number = -1, c: number = -1): string => {
        // If it's part of a finder pattern, return its pre-calculated uniform color (GUARANTEES scanability!)
        if (r >= 0 && c >= 0) {
          if (r < 8 && c < 8) return finderColor;
          if (r < 8 && c >= N - 8) return finderColor;
          if (r >= N - 8 && c < 8) return finderColor;
        }

        if (bgImg && showBgImage && adaptiveContrast && bgImageData) {
          // If contrast plate is opaque enough, just draw standard dark modules on top of it
          if (qrPlateOpacity > 0.4) {
            return isBgLight ? `rgb(${fgColor[0]}, ${fgColor[1]}, ${fgColor[2]})` : '#ffffff';
          }
          
          const l = getLuminanceAt(x, y);
          
          if (l > 0.45) {
            return `rgb(${fgColor[0]}, ${fgColor[1]}, ${fgColor[2]})`;
          } else {
            return '#ffffff';
          }
        }
        return `rgb(${fgColor[0]}, ${fgColor[1]}, ${fgColor[2]})`;
      };

      // Prepare logo analyzer if we have a logo
      let logoWidth = 0;
      let logoHeight = 0;
      let logoX = 0;
      let logoY = 0;
      let logoAlphaData: Uint8Array | null = null;

      const activeLogo = (logoImg && showLogo) ? logoImg : null;

      if (activeLogo) {
        // Logo size should occupy max 26% of QR size
        const maxLogoSize = width * 0.26;
        const scale = Math.min(maxLogoSize / activeLogo.width, maxLogoSize / activeLogo.height);
        logoWidth = activeLogo.width * scale;
        logoHeight = activeLogo.height * scale;
        logoX = (width - logoWidth) / 2;
        logoY = (height - logoHeight) / 2;

        // Perform offscreen canvas analysis of logo transparency channel
        const offCanvas = document.createElement('canvas');
        offCanvas.width = Math.ceil(logoWidth);
        offCanvas.height = Math.ceil(logoHeight);
        const offCtx = offCanvas.getContext('2d');
        if (offCtx) {
          offCtx.drawImage(activeLogo, 0, 0, logoWidth, logoHeight);
          const imgData = offCtx.getImageData(0, 0, logoWidth, logoHeight);
          // Store alpha values
          logoAlphaData = new Uint8Array(imgData.width * imgData.height);
          for (let i = 0; i < imgData.data.length; i += 4) {
            logoAlphaData[i / 4] = imgData.data[i + 3]; // Alpha channel (0-255)
          }
        }
      }

      // Helper to draw rounded rectangle for background plate
      const drawRoundedRect = (ctx2d: CanvasRenderingContext2D, px: number, py: number, pw: number, ph: number, pr: number) => {
        ctx2d.beginPath();
        ctx2d.moveTo(px + pr, py);
        ctx2d.lineTo(px + pw - pr, py);
        ctx2d.quadraticCurveTo(px + pw, py, px + pw, py + pr);
        ctx2d.lineTo(px + pw, py + ph - pr);
        ctx2d.quadraticCurveTo(px + pw, py + ph, px + pw - pr, py + ph);
        ctx2d.lineTo(px + pr, py + ph);
        ctx2d.quadraticCurveTo(px, py + ph, px, py + ph - pr);
        ctx2d.lineTo(px, py + pr);
        ctx2d.quadraticCurveTo(px, py, px + pr, py);
        ctx2d.closePath();
        ctx2d.fill();
      };

      // Draw shape-matching QR Plate (backplate) for perfect contrast
      if (qrPlateOpacity > 0) {
        ctx.save();
        ctx.fillStyle = `rgba(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]}, ${qrPlateOpacity})`;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
        ctx.shadowBlur = 15;

        if (qrShape === 'heart') {
          const S = qrSize * 0.44;
          const margin = 16;
          const S_out = S + margin * Math.sqrt(2);
          const R_out = S_out / 2;
          const leftLobeX_out = centerX - S_out * 0.35355;
          const rightLobeX_out = centerX + S_out * 0.35355;
          const lobeY_out = centerY - S_out * 0.35355;

          ctx.beginPath();
          ctx.arc(leftLobeX_out, lobeY_out, R_out, -Math.PI / 4, 3 * Math.PI / 4, true);
          ctx.lineTo(centerX, centerY + S_out * 0.70715);
          ctx.lineTo(centerX + S_out * 0.70715, centerY);
          ctx.arc(rightLobeX_out, lobeY_out, R_out, Math.PI / 4, 5 * Math.PI / 4, true);
          ctx.closePath();
          ctx.fill();
        } else if (qrShape === 'circle') {
          const R = qrSize * 0.5;
          ctx.beginPath();
          ctx.arc(centerX, centerY, R + 16, 0, 2 * Math.PI);
          ctx.closePath();
          ctx.fill();
        } else {
          // Square shape
          const platePadding = 16;
          const plateX = centerX - qrSize / 2 - platePadding;
          const plateY = centerY - qrSize / 2 - platePadding;
          const plateW = qrSize + platePadding * 2;
          const plateH = qrSize + platePadding * 2;
          drawRoundedRect(ctx, plateX, plateY, plateW, plateH, 24);
        }
        ctx.restore();
      }

      // Check module collisions
      let modulesTotal = 0;
      let modulesSkipped = 0;

      if (qrShape === 'heart') {
        // --- HIGH-PRECISION DUAL-STRUCTURE HEART SHAPE DESIGN ---
        // S is the side of the rotated square core (diamond)
        const S = qrSize * 0.44;
        const sBoxSize = S / N;
        const sStart = -S / 2;

        // Radii and positions of the lobes (mathematically perfect tangent heart)
        const R = S / 2;
        const leftLobeX = centerX - S * 0.35355;
        const rightLobeX = centerX + S * 0.35355;
        const lobeY = centerY - S * 0.35355;

        // 1. Draw the decorative lobes (straight/aligned) with clipping to match lobe curves
        ctx.save();
        ctx.beginPath();
        ctx.arc(leftLobeX, lobeY, R, 0, 2 * Math.PI);
        ctx.arc(rightLobeX, lobeY, R, 0, 2 * Math.PI);
        ctx.clip();

        // Draw beautiful grid of fake decorative modules inside the lobes (uniformly styled)
        for (let lx = leftLobeX - R; lx <= rightLobeX + R; lx += sBoxSize) {
          for (let ly = lobeY - R; ly <= lobeY + R; ly += sBoxSize) {
            // Avoid overlapping the central rotated QR code (plus a safe quiet zone gap to prevent module merging)
            const rx = lx - centerX;
            const ry = ly - centerY;
            const cos = Math.cos(-Math.PI / 4);
            const sin = Math.sin(-Math.PI / 4);
            const rotX = rx * cos - ry * sin;
            const rotY = rx * sin + ry * cos;
            const gapFactor = pointStyle === 'square' ? 0.75 : 0.45;
            if (Math.abs(rotX) <= S / 2 + sBoxSize * gapFactor && Math.abs(rotY) <= S / 2 + sBoxSize * gapFactor) {
              continue;
            }

            // Pseudo-random stable hash for decorative module placement to match QR texture
            const hash = Math.sin(lx * 12.9898 + ly * 78.233) * 43758.5453;
            const rand = hash - Math.floor(hash);
            if (rand > 0.46) {
              ctx.fillStyle = getModuleColor(lx, ly);
              ctx.beginPath();
              const cx = lx;
              const cy = ly;
              // Use perfect sizing for a dense, highly professional grid texture with clean gaps
              const sizeToDraw = sBoxSize;
              const x0 = lx - sizeToDraw / 2;
              const y0 = ly - sizeToDraw / 2;
              drawStyledPoint(ctx, x0, y0, cx, cy, sizeToDraw, pointStyle);
            }
          }
        }
        ctx.restore();

        // 2. Draw the real QR Code rotated 45 degrees centered at (centerX, centerY)
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(Math.PI / 4);

        // Draw solid backgrounds under the three finder patterns to protect them from the background image
        if (showBgImage) {
          ctx.fillStyle = `rgb(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]})`;
          const fpSize = sBoxSize * 8; // 8 modules wide (7 finder + 1 quiet zone)
          // Top-Left Finder
          ctx.fillRect(sStart - sBoxSize * 0.5, sStart - sBoxSize * 0.5, fpSize, fpSize);
          // Top-Right Finder
          ctx.fillRect(sStart + (N - 7.5) * sBoxSize, sStart - sBoxSize * 0.5, fpSize, fpSize);
          // Bottom-Left Finder
          ctx.fillRect(sStart - sBoxSize * 0.5, sStart + (N - 7.5) * sBoxSize, fpSize, fpSize);
        }

        for (let r = 0; r < N; r++) {
          for (let c = 0; c < N; c++) {
            const isActive = qr.modules.get(r, c) === 1;
            if (!isActive) continue;

            modulesTotal++;

            const x0 = sStart + c * sBoxSize;
            const y0 = sStart + r * sBoxSize;
            const x1 = x0 + sBoxSize;
            const y1 = y0 + sBoxSize;
            const cx = (x0 + x1) / 2;
            const cy = (y0 + y1) / 2;

            // Screen-space position for logo collisions
            const cosVal = Math.cos(Math.PI / 4);
            const sinVal = Math.sin(Math.PI / 4);
            const screenX = centerX + (cx * cosVal - cy * sinVal);
            const screenY = centerY + (cx * sinVal + cy * cosVal);

            if (activeLogo && logoAlphaData) {
              if (screenX >= logoX && screenX <= logoX + logoWidth && screenY >= logoY && screenY <= logoY + logoHeight) {
                const localX = Math.floor(screenX - logoX);
                const localY = Math.floor(screenY - logoY);

                const checkWidth = Math.ceil(logoWidth);
                const checkHeight = Math.ceil(logoHeight);

                const padPx = Math.ceil(sBoxSize * paddingRatio);
                let isColliding = false;

                for (let dy = -padPx; dy <= padPx; dy++) {
                  for (let dx = -padPx; dx <= padPx; dx++) {
                    const tx = localX + dx;
                    const ty = localY + dy;
                    if (tx >= 0 && tx < checkWidth && ty >= 0 && ty < checkHeight) {
                      const alphaIdx = ty * checkWidth + tx;
                      if (logoAlphaData[alphaIdx] > 40) {
                        isColliding = true;
                        break;
                      }
                    }
                  }
                  if (isColliding) break;
                }

                if (isColliding) {
                  modulesSkipped++;
                  continue;
                }
              }
            }

            const isFinder = (
              (r < 8 && c < 8) ||
              (r < 8 && c >= N - 8) ||
              (r >= N - 8 && c < 8)
            );

            const isAlignmentPattern = (() => {
              const version = Math.round((N - 17) / 4);
              const coords = ALIGNMENT_PATTERNS[version];
              if (!coords) return false;

              for (const rCenter of coords) {
                for (const cCenter of coords) {
                  const isOverlappingFinder = 
                     (rCenter < 8 && cCenter < 8) ||
                    (rCenter < 8 && cCenter >= N - 8) ||
                    (rCenter >= N - 8 && cCenter < 8);
                  
                  if (isOverlappingFinder) continue;

                  if (Math.abs(r - rCenter) <= 2 && Math.abs(c - cCenter) <= 2) {
                    return true;
                  }
                }
              }
              return false;
            })();

            ctx.fillStyle = getModuleColor(screenX, screenY, r, c);
            if (isFinder || isAlignmentPattern) {
              ctx.fillRect(x0 - 0.15, y0 - 0.15, sBoxSize + 0.3, sBoxSize + 0.3);
            } else {
              ctx.beginPath();
              drawStyledPoint(ctx, x0, y0, cx, cy, sBoxSize, pointStyle);
            }
          }
        }
        ctx.restore();

        // 3. Draw the overall heart outline if requested (restoring the previous perfect mathematical contour)
        if (drawOutline) {
          ctx.beginPath();
          // We add a uniform 4.5px safety margin around the QR code's boundary to protect formatting and timing patterns
          const margin = 4.5;
          const S_out = S + margin * Math.sqrt(2);
          const R_out = S_out / 2;
          const leftLobeX_out = centerX - S_out * 0.35355;
          const rightLobeX_out = centerX + S_out * 0.35355;
          const lobeY_out = centerY - S_out * 0.35355;

          // Arc around left lobe: from cleft (angle -Math.PI / 4) to left corner (3 * Math.PI / 4)
          ctx.arc(leftLobeX_out, lobeY_out, R_out, -Math.PI / 4, 3 * Math.PI / 4, true);
          // Line straight to the bottom tip
          ctx.lineTo(centerX, centerY + S_out * 0.70715);
          // Line straight to the right corner
          ctx.lineTo(centerX + S_out * 0.70715, centerY);
          // Arc around right lobe: from right corner (Math.PI / 4) to cleft (5 * Math.PI / 4)
          ctx.arc(rightLobeX_out, lobeY_out, R_out, Math.PI / 4, 5 * Math.PI / 4, true);
          ctx.closePath();

          ctx.strokeStyle = `rgb(${fgColor[0]}, ${fgColor[1]}, ${fgColor[2]})`;
          ctx.lineWidth = outlineWidth;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }

      } else if (qrShape === 'circle') {
        // --- HIGH-PRECISION DUAL-STRUCTURE CIRCLE DESIGN ---
        const R = qrSize * 0.5;
        const S = qrSize * 0.68;
        const sBoxSize = S / N;
        const sStart = -S / 2;

        // Draw beautiful grid of fake decorative modules inside the circle (but outside the real QR square)
        for (let lx = centerX - R; lx <= centerX + R; lx += sBoxSize) {
          for (let ly = centerY - R; ly <= centerY + R; ly += sBoxSize) {
            const distToCenter = Math.sqrt((lx - centerX) ** 2 + (ly - centerY) ** 2);
            // Inside the circle?
            if (distToCenter > R * 0.98) {
              continue;
            }

            // Avoid overlapping the central QR code (plus a safe quiet zone gap to prevent module merging)
            const gapFactor = pointStyle === 'square' ? 0.75 : 0.45;
            if (Math.abs(lx - centerX) <= S / 2 + sBoxSize * gapFactor && Math.abs(ly - centerY) <= S / 2 + sBoxSize * gapFactor) {
              continue;
            }

            // Pseudo-random stable hash for decorative module placement to match QR texture
            const hash = Math.sin(lx * 12.9898 + ly * 78.233) * 43758.5453;
            const rand = hash - Math.floor(hash);
            if (rand > 0.46) {
              ctx.fillStyle = getModuleColor(lx, ly);
              ctx.beginPath();
              const cx = lx;
              const cy = ly;
              // Use perfect sizing for a dense, highly professional grid texture with clean gaps
              const sizeToDraw = sBoxSize;
              const x0 = lx - sizeToDraw / 2;
              const y0 = ly - sizeToDraw / 2;
              drawStyledPoint(ctx, x0, y0, cx, cy, sizeToDraw, pointStyle);
            }
          }
        }

        // Draw the real QR Code centered at (centerX, centerY) - NO ROTATION
        ctx.save();
        ctx.translate(centerX, centerY);

        // Draw solid backgrounds under the three finder patterns to protect them from the background image
        if (showBgImage) {
          ctx.fillStyle = `rgb(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]})`;
          const fpSize = sBoxSize * 8; // 8 modules wide
          // Top-Left Finder
          ctx.fillRect(sStart - sBoxSize * 0.5, sStart - sBoxSize * 0.5, fpSize, fpSize);
          // Top-Right Finder
          ctx.fillRect(sStart + (N - 7.5) * sBoxSize, sStart - sBoxSize * 0.5, fpSize, fpSize);
          // Bottom-Left Finder
          ctx.fillRect(sStart - sBoxSize * 0.5, sStart + (N - 7.5) * sBoxSize, fpSize, fpSize);
        }

        for (let r = 0; r < N; r++) {
          for (let c = 0; c < N; c++) {
            const isActive = qr.modules.get(r, c) === 1;
            if (!isActive) continue;

            modulesTotal++;

            const x0 = sStart + c * sBoxSize;
            const y0 = sStart + r * sBoxSize;
            const x1 = x0 + sBoxSize;
            const y1 = y0 + sBoxSize;
            const cx = (x0 + x1) / 2;
            const cy = (y0 + y1) / 2;

            // Screen-space position for logo collisions
            const screenX = centerX + cx;
            const screenY = centerY + cy;

            if (activeLogo && logoAlphaData) {
              if (screenX >= logoX && screenX <= logoX + logoWidth && screenY >= logoY && screenY <= logoY + logoHeight) {
                const localX = Math.floor(screenX - logoX);
                const localY = Math.floor(screenY - logoY);

                const checkWidth = Math.ceil(logoWidth);
                const checkHeight = Math.ceil(logoHeight);

                const padPx = Math.ceil(sBoxSize * paddingRatio);
                let isColliding = false;

                for (let dy = -padPx; dy <= padPx; dy++) {
                  for (let dx = -padPx; dx <= padPx; dx++) {
                    const tx = localX + dx;
                    const ty = localY + dy;
                    if (tx >= 0 && tx < checkWidth && ty >= 0 && ty < checkHeight) {
                      const alphaIdx = ty * checkWidth + tx;
                      if (logoAlphaData[alphaIdx] > 40) {
                        isColliding = true;
                        break;
                      }
                    }
                  }
                  if (isColliding) break;
                }

                if (isColliding) {
                  modulesSkipped++;
                  continue;
                }
              }
            }

            const isFinder = (
              (r < 8 && c < 8) ||
              (r < 8 && c >= N - 8) ||
              (r >= N - 8 && c < 8)
            );

            const isAlignmentPattern = (() => {
              const version = Math.round((N - 17) / 4);
              const coords = ALIGNMENT_PATTERNS[version];
              if (!coords) return false;

              for (const rCenter of coords) {
                for (const cCenter of coords) {
                  const isOverlappingFinder = 
                    (rCenter < 8 && cCenter < 8) ||
                    (rCenter < 8 && cCenter >= N - 8) ||
                    (rCenter >= N - 8 && cCenter < 8);
                  
                  if (isOverlappingFinder) continue;

                  if (Math.abs(r - rCenter) <= 2 && Math.abs(c - cCenter) <= 2) {
                    return true;
                  }
                }
              }
              return false;
            })();

            ctx.fillStyle = getModuleColor(screenX, screenY, r, c);
            if (isFinder || isAlignmentPattern) {
              ctx.fillRect(x0 - 0.15, y0 - 0.15, sBoxSize + 0.3, sBoxSize + 0.3);
            } else {
              ctx.beginPath();
              drawStyledPoint(ctx, x0, y0, cx, cy, sBoxSize, pointStyle);
            }
          }
        }
        ctx.restore();

        // Draw the overall circle outline if requested
        if (drawOutline) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, R, 0, 2 * Math.PI);
          ctx.closePath();

          ctx.strokeStyle = `rgb(${fgColor[0]}, ${fgColor[1]}, ${fgColor[2]})`;
          ctx.lineWidth = outlineWidth;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }

      } else {
        // Standard Square shape drawing logic
        // Draw solid backgrounds under the three finder patterns to protect them from the background image
        if (showBgImage) {
          ctx.fillStyle = `rgb(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]})`;
          const fpSize = boxSize * 8; // 8 modules wide
          // Top-Left Finder
          ctx.fillRect(borderPx - boxSize * 0.5, borderPx - boxSize * 0.5, fpSize, fpSize);
          // Top-Right Finder
          ctx.fillRect(borderPx + (N - 7.5) * boxSize, borderPx - boxSize * 0.5, fpSize, fpSize);
          // Bottom-Left Finder
          ctx.fillRect(borderPx - boxSize * 0.5, borderPx + (N - 7.5) * boxSize, fpSize, fpSize);
        }

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
            if (activeLogo && logoAlphaData) {
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

            ctx.fillStyle = getModuleColor(cx, cy, r, c);

            if (isFinder || isAlignmentPattern) {
              // Classic full square finder / alignment pattern (drawn with slight overlap to prevent anti-aliasing gaps)
              ctx.fillRect(x0 - 0.15, y0 - 0.15, boxSize + 0.3, boxSize + 0.3);
            } else {
              // Draw styled custom point
              ctx.beginPath();
              drawStyledPoint(ctx, x0, y0, cx, cy, boxSize, pointStyle);
            }
          }
        }
      }

      // Calculate skipped data modules pct
      const skippedPct = modulesTotal > 0 ? (modulesSkipped / modulesTotal) * 100 : 0;
      setModulesSkippedPct(skippedPct);
      setIsReadable(skippedPct <= 30.0);

      // Draw the central logo on top of skipped points
      if (activeLogo) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 8;
        ctx.drawImage(activeLogo, logoX, logoY, logoWidth, logoHeight);
        ctx.shadowBlur = 0; // reset
      }

      // Trigger update back to parent component for telemetry/status synchronization
      onStyleUpdate(pointStyle, rgbToHex(fgColor[0], fgColor[1], fgColor[2]), rgbToHex(bgColor[0], bgColor[1], bgColor[2]), !!activeLogo);

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

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBgName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setBgImg(img);
        setShowBgImage(true);
        
        // Analyze background image colors for adaptive contrast
        const offCanvas = document.createElement('canvas');
        offCanvas.width = 512;
        offCanvas.height = 512;
        const offCtx = offCanvas.getContext('2d');
        if (offCtx) {
          offCtx.drawImage(img, 0, 0, 512, 512);
          const imgData = offCtx.getImageData(0, 0, 512, 512);
          setBgImageData(imgData.data);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const clearBg = () => {
    setBgImg(null);
    setBgName('');
    setBgImageData(null);
    if (bgInputRef.current) bgInputRef.current.value = '';
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

        {/* Overall Shape Silhouette Selector */}
        <div>
          <label className="block text-xs font-semibold text-[#64748b] uppercase tracking-widest mb-1.5">
            Silhueta Geral (Formas Personalizadas)
          </label>
          <p className="text-[11px] text-[#94a3b8] mb-3">
            Escolha uma máscara externa para recortar o QR Code em formas especiais.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { id: 'square', label: 'Quadrado', icon: <Square className="w-4 h-4" /> },
              { id: 'circle', label: 'Círculo', icon: <Circle className="w-4 h-4" /> },
              { id: 'heart', label: 'Coração', icon: <Heart className="w-4 h-4 text-red-500" /> }
            ].map((shape) => (
              <button
                key={shape.id}
                onClick={() => setQrShape(shape.id as any)}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                  qrShape === shape.id
                    ? 'bg-[#38bdf8]/10 border-[#38bdf8] text-[#38bdf8] font-bold'
                    : 'bg-[#0f172a] border-[#334155] text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-white/5'
                }`}
              >
                {shape.icon}
                <span className="text-[11px] uppercase font-semibold">{shape.label}</span>
              </button>
            ))}
          </div>

          {/* Sub-config for borders (shown when shape !== square) */}
          {qrShape !== 'square' && (
            <div className="mt-4 bg-[#0f172a] border border-dashed border-[#334155] rounded-xl p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-white font-semibold">Desenhar Borda (Contorno Externo)</span>
                  <span className="text-[10px] text-[#94a3b8]">Ative para destacar a silhueta ou desative para remover a borda completamente</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={drawOutline}
                    onChange={(e) => setDrawOutline(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-[#334155] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#38bdf8]"></div>
                </label>
              </div>

              {drawOutline && (
                <div className="border-t border-[#334155]/50 pt-3">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[10px] font-semibold text-[#64748b] uppercase tracking-widest">
                      Espessura do Contorno (Borda):
                    </label>
                    <span className="text-xs font-mono text-[#38bdf8] font-semibold">{outlineWidth}px</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="14"
                    step="1"
                    value={outlineWidth}
                    onChange={(e) => setOutlineWidth(parseInt(e.target.value))}
                    className="w-full accent-[#38bdf8] h-1.5 bg-[#1e293b] rounded-lg cursor-pointer"
                  />
                </div>
              )}
            </div>
          )}
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
              color={activeColorSlot === 'fg' ? fgColor : bgColor} 
              onChange={(rgb) => {
                if (activeColorSlot === 'fg') {
                  setFgColor(rgb);
                } else {
                  setBgColor(rgb);
                }
              }} 
            />

            <div className="grid grid-cols-2 gap-2 mt-1">
              <button
                type="button"
                onClick={() => setActiveColorSlot('fg')}
                className={`flex flex-col text-left p-2 rounded-lg border transition-all cursor-pointer ${
                  activeColorSlot === 'fg' 
                    ? 'bg-[#1e293b] border-[#38bdf8]' 
                    : 'bg-[#0f172a] border-[#334155] opacity-70 hover:opacity-100'
                }`}
              >
                <label className="block text-[9px] font-semibold text-zinc-400 uppercase mb-1 cursor-pointer">Pincel (Foreground)</label>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-md border border-white/20 block" style={{ backgroundColor: rgbToHex(fgColor[0], fgColor[1], fgColor[2]) }} />
                  <span className="text-xs font-mono text-zinc-300">{rgbToHex(fgColor[0], fgColor[1], fgColor[2])}</span>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => setActiveColorSlot('bg')}
                className={`flex flex-col text-left p-2 rounded-lg border transition-all cursor-pointer ${
                  activeColorSlot === 'bg' 
                    ? 'bg-[#1e293b] border-[#38bdf8]' 
                    : 'bg-[#0f172a] border-[#334155] opacity-70 hover:opacity-100'
                }`}
              >
                <label className="block text-[9px] font-semibold text-zinc-400 uppercase mb-1 cursor-pointer">Plano Fundo (Background)</label>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-md border border-white/20 block" style={{ backgroundColor: rgbToHex(bgColor[0], bgColor[1], bgColor[2]) }} />
                  <span className="text-xs font-mono text-zinc-300">{rgbToHex(bgColor[0], bgColor[1], bgColor[2])}</span>
                </div>
              </button>
            </div>
          </div>

          {/* CUSTOMIZER TABS FOR LOGO / BACKGROUND */}
          <div className="flex flex-col gap-4">
            {/* Tab Headers */}
            <div className="flex bg-[#0f172a] p-1.5 rounded-xl border border-[#334155]">
              <button
                onClick={() => setActiveTab('logo')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'logo'
                    ? 'bg-[#334155] text-white shadow-md'
                    : 'text-[#94a3b8] hover:text-[#f1f5f9]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Logo Central
              </button>
              <button
                onClick={() => setActiveTab('background')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'background'
                    ? 'bg-[#334155] text-white shadow-md'
                    : 'text-[#94a3b8] hover:text-[#f1f5f9]'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Fundo de Imagem
              </button>
            </div>

            {/* TAB CONTENT: LOGO CENTRAL */}
            {activeTab === 'logo' && (
              <div className="flex flex-col gap-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#64748b] uppercase tracking-widest">Invasão de Logo Orgânica</span>
                  
                  {/* Logo visibility toggle */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-zinc-400">Exibir Logo</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={showLogo}
                        onChange={(e) => setShowLogo(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-8 h-4.5 bg-[#334155] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#38bdf8]"></div>
                    </label>
                  </div>
                </div>

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
                      <p className="text-[10px] text-[#64748b]">PNG ou JPG (canal alfa recomendado)</p>
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
                    disabled={!logoImg || !showLogo}
                    onChange={(e) => setPaddingRatio(parseFloat(e.target.value))}
                    className="w-full accent-[#38bdf8] h-1.5 bg-[#0f172a] rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  />
                  <p className="text-[9px] text-[#64748b] mt-1">Ajuste o raio de evasão dos pontos ao redor das bordas do logo.</p>
                </div>
              </div>
            )}

            {/* TAB CONTENT: BACKGROUND IMAGE */}
            {activeTab === 'background' && (
              <div className="flex flex-col gap-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#64748b] uppercase tracking-widest">Imagem de Fundo Artística</span>
                  
                  {/* Background visibility toggle */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-zinc-400">Ativar Imagem</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={showBgImage}
                        disabled={!bgImg}
                        onChange={(e) => setShowBgImage(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-8 h-4.5 bg-[#334155] peer-focus:outline-none rounded-full peer peer-disabled:opacity-30 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#38bdf8]"></div>
                    </label>
                  </div>
                </div>

                {/* Upload Section with specific dimensions and instructions */}
                <div className="border border-[#334155] bg-[#0f172a] rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#38bdf8]/10 p-2 rounded-lg text-[#38bdf8]">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-xs text-white font-semibold truncate">
                        {bgName || "Carregar imagem de fundo"}
                      </p>
                      <p className="text-[10px] text-[#38bdf8] font-semibold">Tamanho ideal: 512x512 pixels</p>
                    </div>
                  </div>

                  <p className="text-[10px] text-[#94a3b8] leading-relaxed bg-[#1e293b]/40 p-2 rounded-lg border border-[#334155]/30">
                    💡 <span className="font-semibold text-white">Instruções:</span> A imagem será redimensionada para encaixar no canvas. Formatos compatíveis: JPG ou PNG. Use imagens contrastantes para resultados espetaculares.
                  </p>

                  <input
                    id="bg-file-input"
                    type="file"
                    ref={bgInputRef}
                    onChange={handleBgUpload}
                    accept="image/png, image/jpeg"
                    className="hidden"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={() => bgInputRef.current?.click()}
                      className="flex-1 bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#0f172a] font-bold text-xs py-2 rounded-lg transition-colors cursor-pointer text-center"
                    >
                      Procurar Imagem
                    </button>
                    {bgImg && (
                      <button
                        onClick={clearBg}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded-lg transition-colors"
                        title="Remover imagem de fundo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Adaptive Contrast Option */}
                <div className="bg-[#0f172a] border border-[#334155]/60 rounded-xl p-3.5 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-white font-semibold">Contraste Adaptativo</span>
                      <span className="text-[9px] text-[#94a3b8]">Inverte os pontos dinamicamente para manter 100% legível</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={adaptiveContrast}
                        disabled={!bgImg || !showBgImage}
                        onChange={(e) => setAdaptiveContrast(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-8 h-4.5 bg-[#334155] peer-focus:outline-none rounded-full peer peer-disabled:opacity-30 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#38bdf8]"></div>
                    </label>
                  </div>
                </div>

                {/* Sliders for background image customization */}
                <div className="flex flex-col gap-4 bg-[#0f172a] border border-[#334155]/60 rounded-xl p-3.5">
                  {/* Background Image Opacity Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-[11px] font-semibold text-[#64748b] uppercase tracking-widest">
                        Opacidade da Imagem:
                      </label>
                      <span className="text-xs font-mono text-[#38bdf8] font-semibold">{Math.round(bgImageOpacity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={bgImageOpacity}
                      disabled={!bgImg || !showBgImage}
                      onChange={(e) => setBgImageOpacity(parseFloat(e.target.value))}
                      className="w-full accent-[#38bdf8] h-1.5 bg-[#1e293b] rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                    />
                    <p className="text-[9px] text-[#94a3b8] mt-1">
                      Reduza para misturar com a cor de fundo escolhida e destacar mais o QR.
                    </p>
                  </div>

                  {/* QR Contrast Plate Opacity Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-[11px] font-semibold text-[#64748b] uppercase tracking-widest">
                        Placa de Contraste (QR):
                      </label>
                      <span className="text-xs font-mono text-[#38bdf8] font-semibold">{Math.round(qrPlateOpacity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.0"
                      max="1.0"
                      step="0.05"
                      value={qrPlateOpacity}
                      disabled={!bgImg || !showBgImage}
                      onChange={(e) => setQrPlateOpacity(parseFloat(e.target.value))}
                      className="w-full accent-[#38bdf8] h-1.5 bg-[#1e293b] rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                    />
                    <p className="text-[9px] text-[#94a3b8] mt-1">
                      Adiciona um escudo inteligente (no mesmo formato do QR) garantindo 100% de leitura!
                    </p>
                  </div>
                </div>

                {/* Fallback background style selector */}
                <div className="mt-1">
                  <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-widest mb-1.5">Fallback do Fundo (Sem Imagem)</label>
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
            )}
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
