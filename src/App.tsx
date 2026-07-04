import { useState } from 'react';
import { 
  QrCode, 
  Sparkles, 
  BookOpen, 
  Settings, 
  Heart, 
  Info, 
  Github, 
  Terminal, 
  Code2, 
  HelpCircle,
  Award
} from 'lucide-react';
import QRStudio from './components/QRStudio';
import CodeExplorer from './components/CodeExplorer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'studio' | 'explorer'>('studio');
  
  // Real-time telemetry values mirrored from the Active Studio to render in the system status bar
  const [telemetry, setTelemetry] = useState({
    style: 'circle',
    fgHex: '#0F172A',
    bgHex: '#FFFFFF',
    hasLogo: false
  });

  const handleStyleTelemetry = (style: string, fg: string, bg: string, hasLogo: boolean) => {
    setTelemetry({ style, fgHex: fg, bgHex: bg, hasLogo });
  };

  return (
    <div id="qrcodando-root-app" className="min-h-screen bg-[#0f172a] text-[#f1f5f9] flex flex-col font-sans selection:bg-[#38bdf8] selection:text-[#0f172a]">
      
      {/* GLORIOUS HEADER SECTION */}
      <header className="border-b border-[#334155] bg-[#1e293b] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-[#38bdf8] to-[#0ea5e9] rounded-xl flex items-center justify-center shadow-lg shadow-[#38bdf8]/15">
              <QrCode className="w-5 h-5 text-[#0f172a] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-mono font-bold tracking-wider text-[#38bdf8] leading-none">
                  QRCODANDO <span className="text-[#64748b] font-light text-sm">v1.0.0</span>
                </h1>
                <span className="bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                  Apache 2.0
                </span>
              </div>
              <p className="text-[10px] text-[#94a3b8] font-sans tracking-wide mt-1 uppercase">
                Estúdio de Design de QR Code Artístico
              </p>
            </div>
          </div>

          {/* Absolute Requirement - Exibição elegante: "Feito por Tiago Rabelo" */}
          <div className="flex flex-col items-end text-right">
            <span className="text-[11px] text-[#64748b] font-semibold tracking-wider uppercase font-mono">AUTOR DO PROJETO</span>
            <span className="text-sm font-light text-[#94a3b8] italic border border-[#334155] px-3.5 py-1 rounded-full bg-white/5 mt-1">
              Feito por Tiago Rabelo
            </span>
          </div>

        </div>
      </header>

      {/* SUBHEADER: TELEMETRY STATUS BAR */}
      <section className="bg-[#0f172a] border-b border-[#1e293b] py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[#64748b]">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
              <span className="text-[#64748b] uppercase font-semibold">Sistema:</span>
              <span className="text-[#10b981] font-bold">ONLINE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#64748b] uppercase font-semibold">Estilo:</span>
              <span className="text-zinc-200 capitalize font-semibold">{telemetry.style}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#64748b] uppercase font-semibold">Pincel:</span>
              <span className="text-[#38bdf8] font-semibold">{telemetry.fgHex}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#64748b] uppercase font-semibold">Logo:</span>
              <span className={telemetry.hasLogo ? 'text-[#10b981] font-semibold' : 'text-zinc-600'}>
                {telemetry.hasLogo ? 'Ativo (Collision Dodge)' : 'Inativo'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/HonoravelMacho/qrcodando" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>HonoravelMacho/qrcodando</span>
            </a>
          </div>
        </div>
      </section>

      {/* MAIN LAYOUT WRAPPER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        
        {/* PRESENTATION HERO CARD */}
        <div className="bg-gradient-to-r from-[#1e293b] via-[#0f172a]/80 to-[#0f172a]/40 border border-[#334155] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
          {/* Subtle background decoration */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#38bdf8]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 bg-[#38bdf8]/10 text-[#38bdf8] text-xs font-semibold px-3 py-1 rounded-full border border-[#38bdf8]/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Conceito Aberto de Alta Engenharia</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
              Gerador de QR Codes Artísticos & Customizáveis
            </h2>
            <p className="text-sm text-[#94a3b8] mt-2 max-w-2xl leading-relaxed">
              O <strong>Qrcodando</strong> revoluciona a escaneabilidade ao fundir geometrias artísticas customizadas com contorno e desvio automático de logotipos (Collision Dodge) usando canais de transparência, tudo operando sob o nível Reed-Solomon H (30%) de correção matemática.
            </p>
          </div>

          {/* Navigation Tab Selectors */}
          <div className="flex bg-[#0f172a] p-1.5 rounded-2xl border border-[#334155] shrink-0 self-start md:self-center">
            <button
              onClick={() => setActiveTab('studio')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
                activeTab === 'studio'
                  ? 'bg-[#38bdf8] text-[#0f172a] shadow-lg shadow-[#38bdf8]/20'
                  : 'text-[#94a3b8] hover:text-[#f1f5f9]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              QR Studio Live
            </button>
            <button
              onClick={() => setActiveTab('explorer')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
                activeTab === 'explorer'
                  ? 'bg-[#38bdf8] text-[#0f172a] shadow-lg shadow-[#38bdf8]/20'
                  : 'text-[#94a3b8] hover:text-[#f1f5f9]'
              }`}
            >
              <Code2 className="w-4 h-4" />
              Código Python
            </button>
          </div>
        </div>

        {/* ACTIVE TAB COMPONENT CONTAINER */}
        <div className="transition-all duration-300">
          {activeTab === 'studio' ? (
            <QRStudio onStyleUpdate={handleStyleTelemetry} />
          ) : (
            <CodeExplorer />
          )}
        </div>

      </main>

      {/* FOOTER SECTION */}
      <footer className="border-t border-[#1e293b] bg-[#020617] py-10 mt-12 text-[#64748b] text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0f172a] rounded-lg flex items-center justify-center border border-[#1e293b]">
              <QrCode className="w-4 h-4 text-[#38bdf8]" />
            </div>
            <div>
              <p className="text-zinc-300 font-bold tracking-wider">QRCODANDO</p>
              <p className="text-[10px] text-[#64748b]">Desenvolvido em ambiente Pop!_OS com Zsh e editor Micro.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[#64748b] text-[10px]">
            <span>LICENSE: Apache-2.0</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Feito com <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-bounce" /> por Tiago Rabelo
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
