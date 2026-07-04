import { useState } from 'react';
import { 
  Folder, 
  FileCode, 
  Terminal, 
  Copy, 
  Check, 
  Download, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  BookOpen, 
  Heart,
  Settings,
  Github
} from 'lucide-react';
import { repoCodeFiles, RepoFile } from '../data/repoCode';

export default function CodeExplorer() {
  const [selectedFile, setSelectedFile] = useState<RepoFile>(repoCodeFiles[3]); // Default to core/generator.py
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'files' | 'terminal'>('files');

  // Folders structure grouping for display
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    'core': true,
    'gui': true,
    'utils': true,
    '.github': true,
    '.github/workflows': true
  });

  const toggleFolder = (folder: string) => {
    setOpenFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = (file: RepoFile) => {
    const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name.includes('/') ? file.name.split('/').pop()! : file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const filteredFiles = repoCodeFiles.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="code-explorer-container" className="flex flex-col gap-6">
      
      {/* Header controls for sub-navigation (Files vs Terminal commands) */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#334155] pb-4">
        <div className="flex items-center gap-2">
          <Folder className="w-5 h-5 text-[#38bdf8]" />
          <h2 className="text-lg font-mono font-bold text-white uppercase tracking-wide">Arquitetura do Software (MVC)</h2>
        </div>
        
        <div className="flex bg-[#0f172a] p-1 rounded-xl border border-[#334155]">
          <button
            onClick={() => setActiveSubTab('files')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeSubTab === 'files' 
                ? 'bg-[#38bdf8] text-[#0f172a] font-bold shadow-md' 
                : 'text-[#94a3b8] hover:text-[#f1f5f9]'
            }`}
          >
            <FileCode className="w-4 h-4" />
            Estrutura de Arquivos
          </button>
          <button
            onClick={() => setActiveSubTab('terminal')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeSubTab === 'terminal' 
                ? 'bg-[#38bdf8] text-[#0f172a] font-bold shadow-md' 
                : 'text-[#94a3b8] hover:text-[#f1f5f9]'
            }`}
          >
            <Terminal className="w-4 h-4" />
            Instalação e Comandos Zsh
          </button>
        </div>
      </div>

      {activeSubTab === 'files' ? (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          
          {/* FILE BAR / SIDEBAR TREE (LEFT 4 COLS) */}
          <div className="xl:col-span-4 bg-[#1e293b] border border-[#334155] rounded-2xl p-4 flex flex-col gap-4">
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
              <input
                id="file-search-input"
                type="text"
                placeholder="Pesquisar código ou arquivos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0f172a] border border-[#334155] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#38bdf8] transition-colors"
              />
            </div>

            {/* Folder list */}
            <div className="flex flex-col gap-1 max-h-[460px] overflow-y-auto pr-1">
              {searchQuery ? (
                // Search Results list
                <div>
                  <p className="text-[10px] uppercase font-semibold text-zinc-500 px-2 mb-2">Resultados da busca:</p>
                  {filteredFiles.map(file => (
                    <button
                      key={file.name}
                      onClick={() => setSelectedFile(file)}
                      className={`w-full text-left flex items-center gap-2 py-2 px-3 rounded-xl transition-colors text-xs ${
                        selectedFile.name === file.name 
                          ? 'bg-[#38bdf8]/10 text-[#38bdf8] font-bold' 
                          : 'text-[#94a3b8] hover:bg-white/5'
                      }`}
                    >
                      <FileCode className="w-4 h-4 text-[#38bdf8]" />
                      <div className="truncate">
                        <span className="block font-medium">{file.name}</span>
                        <span className="block text-[9px] text-[#64748b] truncate">{file.description}</span>
                      </div>
                    </button>
                  ))}
                  {filteredFiles.length === 0 && (
                    <p className="text-xs text-zinc-500 px-3 py-4 text-center">Nenhum arquivo correspondente encontrado.</p>
                  )}
                </div>
              ) : (
                // Clean Folder Tree View
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold px-2">Repositório: qrcodando/</span>
                  
                  {/* core/ Folder */}
                  <div>
                    <button 
                      onClick={() => toggleFolder('core')}
                      className="w-full text-left flex items-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold text-zinc-300 hover:bg-zinc-800/50"
                    >
                      {openFolders['core'] ? <ChevronDown className="w-3.5 h-3.5 text-zinc-500" /> : <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />}
                      <Folder className="w-4 h-4 text-purple-500" />
                      <span>core/</span>
                    </button>
                    {openFolders['core'] && (
                      <div className="pl-6 border-l border-zinc-800/80 ml-4 mt-1 flex flex-col gap-0.5">
                        {repoCodeFiles.filter(f => f.name.startsWith('core/')).map(file => (
                          <button
                            key={file.name}
                            onClick={() => setSelectedFile(file)}
                            className={`w-full text-left flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs transition-all ${
                              selectedFile.name === file.name 
                                ? 'bg-purple-600/10 text-purple-400 font-semibold' 
                                : 'text-zinc-400 hover:text-white'
                            }`}
                          >
                            <FileCode className="w-3.5 h-3.5" />
                            <span className="truncate">{file.name.replace('core/', '')}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* gui/ Folder */}
                  <div>
                    <button 
                      onClick={() => toggleFolder('gui')}
                      className="w-full text-left flex items-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold text-zinc-300 hover:bg-white/5"
                    >
                      {openFolders['gui'] ? <ChevronDown className="w-3.5 h-3.5 text-zinc-500" /> : <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />}
                      <Folder className="w-4 h-4 text-[#38bdf8]" />
                      <span>gui/</span>
                    </button>
                    {openFolders['gui'] && (
                      <div className="pl-6 border-l border-[#334155] ml-4 mt-1 flex flex-col gap-0.5">
                        {repoCodeFiles.filter(f => f.name.startsWith('gui/')).map(file => (
                          <button
                            key={file.name}
                            onClick={() => setSelectedFile(file)}
                            className={`w-full text-left flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs transition-all ${
                              selectedFile.name === file.name 
                                ? 'bg-[#38bdf8]/10 text-[#38bdf8] font-bold' 
                                : 'text-[#94a3b8] hover:text-[#f1f5f9]'
                            }`}
                          >
                            <FileCode className="w-3.5 h-3.5" />
                            <span className="truncate">{file.name.replace('gui/', '')}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* utils/ Folder */}
                  <div>
                    <button 
                      onClick={() => toggleFolder('utils')}
                      className="w-full text-left flex items-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold text-zinc-300 hover:bg-white/5"
                    >
                      {openFolders['utils'] ? <ChevronDown className="w-3.5 h-3.5 text-zinc-500" /> : <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />}
                      <Folder className="w-4 h-4 text-[#38bdf8]" />
                      <span>utils/</span>
                    </button>
                    {openFolders['utils'] && (
                      <div className="pl-6 border-l border-[#334155] ml-4 mt-1 flex flex-col gap-0.5">
                        {repoCodeFiles.filter(f => f.name.startsWith('utils/')).map(file => (
                          <button
                            key={file.name}
                            onClick={() => setSelectedFile(file)}
                            className={`w-full text-left flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs transition-all ${
                              selectedFile.name === file.name 
                                ? 'bg-[#38bdf8]/10 text-[#38bdf8] font-bold' 
                                : 'text-[#94a3b8] hover:text-[#f1f5f9]'
                            }`}
                          >
                            <FileCode className="w-3.5 h-3.5" />
                            <span className="truncate">{file.name.replace('utils/', '')}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Workflows Folder */}
                  <div>
                    <button 
                      onClick={() => toggleFolder('.github')}
                      className="w-full text-left flex items-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold text-zinc-300 hover:bg-white/5"
                    >
                      {openFolders['.github'] ? <ChevronDown className="w-3.5 h-3.5 text-zinc-500" /> : <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />}
                      <Folder className="w-4 h-4 text-[#38bdf8]" />
                      <span>.github/workflows/</span>
                    </button>
                    {openFolders['.github'] && (
                      <div className="pl-6 border-l border-[#334155] ml-4 mt-1 flex flex-col gap-0.5">
                        {repoCodeFiles.filter(f => f.name.includes('workflows/')).map(file => (
                          <button
                            key={file.name}
                            onClick={() => setSelectedFile(file)}
                            className={`w-full text-left flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs transition-all ${
                              selectedFile.name === file.name 
                                ? 'bg-[#38bdf8]/10 text-[#38bdf8] font-bold' 
                                : 'text-[#94a3b8] hover:text-[#f1f5f9]'
                            }`}
                          >
                            <FileCode className="w-3.5 h-3.5" />
                            <span className="truncate">{file.name.split('/').pop()}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* General files on root */}
                  <div className="flex flex-col gap-1.5 pt-2 border-t border-[#334155]">
                    <span className="text-[9px] uppercase font-semibold text-[#64748b] px-2 mb-1">Arquivos Raiz</span>
                    {repoCodeFiles.filter(f => !f.name.includes('/')).map(file => (
                      <button
                        key={file.name}
                        onClick={() => setSelectedFile(file)}
                        className={`w-full text-left flex items-center gap-2 py-1.5 px-3 rounded-lg text-xs transition-all ${
                          selectedFile.name === file.name 
                            ? 'bg-[#38bdf8]/10 text-[#38bdf8] font-bold' 
                            : 'text-[#94a3b8] hover:text-[#f1f5f9]'
                        }`}
                      >
                        <FileCode className="w-3.5 h-3.5 text-[#38bdf8]" />
                        <span className="truncate">{file.name}</span>
                      </button>
                    ))}
                  </div>

                </div>
              )}
            </div>

          </div>

          {/* ACTIVE CODE VIEWER (RIGHT 8 COLS) */}
          <div className="xl:col-span-8 bg-[#0f172a] border border-[#334155] rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[580px]">
            
            {/* Editor Header */}
            <div className="bg-[#1e293b] px-5 py-3 border-b border-[#334155] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#38bdf8]/10 text-[#38bdf8] p-2 rounded-xl">
                  <FileCode className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-mono text-zinc-100 font-semibold">{selectedFile.name}</h3>
                  <span className="block text-[10px] text-[#94a3b8] font-sans">{selectedFile.description}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(selectedFile.content)}
                  className="flex items-center gap-1.5 bg-[#0f172a] hover:bg-white/5 border border-[#334155] text-[#94a3b8] hover:text-[#f1f5f9] text-xs px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Código</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => downloadFile(selectedFile)}
                  className="flex items-center gap-1.5 bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#0f172a] font-bold text-xs px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                  title="Baixar arquivo localmente"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar</span>
                </button>
              </div>
            </div>

            {/* Code Content Container */}
            <div className="flex-1 overflow-auto p-5 font-mono text-xs text-[#f1f5f9] bg-[#090d16] leading-relaxed">
              <pre className="whitespace-pre overflow-x-auto select-text">
                {selectedFile.content.split('\n').map((line, idx) => (
                  <div key={idx} className="table-row">
                    <span className="table-cell text-right pr-4 text-[#64748b] select-none text-[11px] w-10">{idx + 1}</span>
                    <span className="table-cell text-left pl-2 text-[#e2e8f0] whitespace-pre">{line}</span>
                  </div>
                ))}
              </pre>
            </div>

          </div>

        </div>
      ) : (
        // TERMINAL COMMANDS TAB
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Detailed Tutorial Steps */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6 shadow-xl flex flex-col gap-6">
              
              <div>
                <h3 className="text-base font-mono font-bold text-white uppercase tracking-wide flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#38bdf8]" />
                  Guia Rápido de Produtividade no Terminal (Pop!_OS / Zsh)
                </h3>
                <p className="text-xs text-[#94a3b8] mt-1">Siga este roteiro direto de comandos para sincronizar seu repositório no GitHub e executar o Qrcodando localmente.</p>
              </div>

              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="bg-[#38bdf8]/10 text-[#38bdf8] w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-1">Clonar e Configurar Estrutura</h4>
                  <p className="text-xs text-[#94a3b8] mb-2">Inicie o repositório local e organize a arquitetura MVC (Model-View-Controller) necessária.</p>
                  <div className="bg-[#0f172a] p-3.5 rounded-xl border border-[#334155] relative group">
                    <button 
                      onClick={() => copyToClipboard(`mkdir -p ~/Projetos/qrcodando\ncd ~/Projetos/qrcodando\ngit init -b main\nmkdir -p core gui utils .github/workflows`)}
                      className="absolute right-2.5 top-2.5 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <code className="block text-[11px] text-[#e2e8f0] font-mono whitespace-pre leading-5">
                      mkdir -p ~/Projetos/qrcodando<br />
                      cd ~/Projetos/qrcodando<br />
                      git init -b main<br />
                      mkdir -p core gui utils .github/workflows
                    </code>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="bg-[#38bdf8]/10 text-[#38bdf8] w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-1">Configurar Ambiente Python & Dependências</h4>
                  <p className="text-xs text-[#94a3b8] mb-2">Crie o ambiente virtual isolado (.venv) e instale o PySide6 de forma limpa.</p>
                  <div className="bg-[#0f172a] p-3.5 rounded-xl border border-[#334155] relative group">
                    <button 
                      onClick={() => copyToClipboard(`python3 -m venv .venv\nsource .venv/bin/activate\npip install --upgrade pip\npip install -r requirements.txt`)}
                      className="absolute right-2.5 top-2.5 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <code className="block text-[11px] text-[#e2e8f0] font-mono whitespace-pre leading-5">
                      python3 -m venv .venv<br />
                      source .venv/bin/activate<br />
                      pip install --upgrade pip<br />
                      pip install -r requirements.txt
                    </code>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="bg-[#38bdf8]/10 text-[#38bdf8] w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-1">Editor Micro: Atalhos Rápidos</h4>
                  <p className="text-xs text-[#94a3b8] mb-2">Insira os códigos com o editor Micro no terminal. Use os atalhos abaixo para acelerar a gravação:</p>
                  <div className="grid grid-cols-2 gap-2 bg-[#0f172a] p-3 rounded-xl border border-[#334155] text-[11px] text-[#94a3b8]">
                    <div className="flex justify-between border-b border-[#334155] pb-1.5">
                      <span className="text-[#64748b] font-semibold">Salvar arquivo:</span>
                      <kbd className="bg-[#1e293b] px-1.5 py-0.5 rounded font-mono text-[#38bdf8]">Ctrl + S</kbd>
                    </div>
                    <div className="flex justify-between border-b border-[#334155] pb-1.5">
                      <span className="text-[#64748b] font-semibold">Sair do editor:</span>
                      <kbd className="bg-[#1e293b] px-1.5 py-0.5 rounded font-mono text-[#38bdf8]">Ctrl + Q</kbd>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-[#64748b] font-semibold">Desfazer ação:</span>
                      <kbd className="bg-[#1e293b] px-1.5 py-0.5 rounded font-mono text-[#38bdf8]">Ctrl + Z</kbd>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-[#64748b] font-semibold">Copiar/Colar:</span>
                      <kbd className="bg-[#1e293b] px-1.5 py-0.5 rounded font-mono text-[#38bdf8]">Ctrl + C / V</kbd>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="bg-[#38bdf8]/10 text-[#38bdf8] w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">
                  4
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-1">Sincronização Ativa com GitHub</h4>
                  <p className="text-xs text-[#94a3b8] mb-2">Sincronize o código e envie suas atualizações de tags para o GitHub disparar o GitHub Actions CI/CD.</p>
                  <div className="bg-[#0f172a] p-3.5 rounded-xl border border-[#334155] relative group">
                    <button 
                      onClick={() => copyToClipboard(`git remote add origin https://github.com/HonoravelMacho/qrcodando.git\ngit add .\ngit commit -m "feat: setup motor de colisao e interface pyside6"\ngit push -u origin main\n\n# Dispara CI/CD\ngit tag -a v1.0.0 -m "Release v1.0.0"\ngit push origin v1.0.0`)}
                      className="absolute right-2.5 top-2.5 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <code className="block text-[11px] text-[#e2e8f0] font-mono whitespace-pre leading-5">
                      git remote add origin https://github.com/HonoravelMacho/qrcodando.git<br />
                      git add .<br />
                      git commit -m "feat: setup motor de colisao e interface pyside6"<br />
                      git push -u origin main<br />
                      <span className="text-[#64748b]"># Dispara CI/CD de empacotamento deb/rpm</span><br />
                      git tag -a v1.0.0 -m "Release v1.0.0"<br />
                      git push origin v1.0.0
                    </code>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* DevOps Pipeline Explanation (RIGHT 5 COLS) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6 shadow-xl flex flex-col gap-4">
              
              <div className="flex items-center gap-2 text-[#38bdf8] border-b border-[#334155] pb-3">
                <Settings className="w-5 h-5" />
                <span className="text-xs font-mono font-bold uppercase tracking-wide">DevOps Pipeline & Release</span>
              </div>

              <div className="flex flex-col gap-3">
                <div className="bg-[#0f172a] p-4 rounded-xl border border-[#334155]">
                  <h4 className="text-xs font-semibold text-white flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Compilação com PyApp
                  </h4>
                  <p className="text-[11px] text-[#94a3b8] leading-relaxed">
                    O pipeline utiliza o <strong>pyapp</strong> para congelar todo o interpretador do Python 3 e as dependências (Pillow, OpenCV, PySide6) diretamente em um binário executável portátil e autossuficiente para Linux e Windows.
                  </p>
                </div>

                <div className="bg-[#0f172a] p-4 rounded-xl border border-[#334155]">
                  <h4 className="text-xs font-semibold text-white flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                    Empacotamento com NFPM
                  </h4>
                  <p className="text-[11px] text-[#94a3b8] leading-relaxed">
                    Para garantir que o Qrcodando rode nativamente no Pop!_OS, Debian, Fedora e RedHat, o arquivo de workflow invoca o <strong>NFPM</strong>, gerando pacotes de distribuição nativos <code>.deb</code> e <code>.rpm</code> em milissegundos sem peso extra.
                  </p>
                </div>

                <div className="bg-[#0f172a] p-4 rounded-xl border border-[#334155]">
                  <h4 className="text-xs font-semibold text-white flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    GitHub API Integrada
                  </h4>
                  <p className="text-[11px] text-[#94a3b8] leading-relaxed">
                    Sempre que você criar uma tag como <code>v1.0.0</code>, o GitHub Actions realiza o build automaticamente, publicando os binários prontos para o seu usuário <strong>HonoravelMacho</strong> na aba de Releases do GitHub!
                  </p>
                </div>
              </div>

              <div className="mt-2 text-center p-3 rounded-xl bg-[#38bdf8]/5 border border-[#38bdf8]/10">
                <a 
                  href="https://github.com/HonoravelMacho/qrcodando" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#38bdf8] hover:text-[#7dd3fc] transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Ir para o Repositório Github do Projeto
                </a>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
