import React, { useEffect, useRef, useState } from 'react';

interface ColorWheelProps {
  color: [number, number, number]; // [r, g, b]
  onChange: (rgb: [number, number, number]) => void;
}

// Convert HSV to RGB
function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (h >= 60 && h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (h >= 120 && h < 180) {
    [r, g, b] = [0, c, x];
  } else if (h >= 180 && h < 240) {
    [r, g, b] = [0, x, c];
  } else if (h >= 240 && h < 300) {
    [r, g, b] = [x, 0, c];
  } else if (h >= 300 && h < 360) {
    [r, g, b] = [c, 0, x];
  }

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
}

// Convert RGB to HSV
function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const d = max - min;

  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h * 360, s, v];
}

export default function ColorWheel({ color, onChange }: ColorWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const size = 160;
  const radius = size / 2;

  // Track handle position based on RGB color input
  const [h, s] = rgbToHsv(color[0], color[1], color[2]);
  const angleRad = (h * Math.PI) / 180;
  const handleX = radius + radius * s * Math.cos(angleRad);
  const handleY = radius + radius * s * Math.sin(angleRad);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.hypot(dx, dy);

        if (dist <= radius) {
          // Angle in degrees [0, 360]
          let angle = Math.atan2(dy, dx) * (180 / Math.PI);
          if (angle < 0) angle += 360;

          // Saturation [0, 1]
          const sat = dist / radius;

          // Value is fixed to 0.95 for vibrancy
          const [r, g, b] = hsvToRgb(angle, sat, 0.95);

          const idx = (y * width + x) * 4;
          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = 255; // fully opaque
        } else {
          // Make outer corners transparent or matching background
          const idx = (y * width + x) * 4;
          data[idx + 3] = 0;
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }, []);

  const handleSelectColor = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - radius;
    const dy = y - radius;
    const dist = Math.hypot(dx, dy);

    // Bound to circle radius
    const targetDist = Math.min(dist, radius);
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    if (angle < 0) angle += 360;

    const sat = targetDist / radius;
    const rgb = hsvToRgb(angle, sat, 0.95);
    onChange(rgb);
  };

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    handleSelectColor(e);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    handleSelectColor(e);
  };

  const onMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <div id="color-wheel-wrapper" className="relative flex flex-col items-center justify-center p-2">
      <div className="relative w-[160px] h-[160px] rounded-full overflow-hidden shadow-lg border-4 border-[#1e293b] bg-zinc-950/20">
        <canvas
          id="color-wheel-canvas"
          ref={canvasRef}
          width={size}
          height={size}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          onMouseLeave={onMouseUpOrLeave}
          className="cursor-crosshair w-full h-full block"
        />

        {/* Selected color pointer/handle */}
        <div
          id="color-wheel-indicator"
          className="absolute w-4 h-4 -ml-2 -mt-2 rounded-full border-2 border-white shadow-[0_0_4px_rgba(0,0,0,0.5)] pointer-events-none transition-all duration-75"
          style={{
            left: `${handleX}px`,
            top: `${handleY}px`,
            backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
          }}
        />
      </div>
    </div>
  );
}
