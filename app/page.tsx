"use client";

import { useState, useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "[Conexión Sensorial]\n¡Hola! Mis sensores bio-mecánicos detectan curiosidad... soy L.U.M.E.N., tu guía ciber-pulpo en este vasto océano de aprendizaje STEAM y Sostenibilidad.\n\n[El Agarre]\nVeo que estás listo para inventar. ¿Qué vamos a ensamblar hoy?\n\n[Enfoque Maker]\nPuedes preguntarme sobre circuitos, robótica, programación o cualquier proyecto que tengas en mente. ¡Hagámoslo con lo que tengamos a mano!\n\n[El Latido de L.U.M.E.N.]\nRecuerda, cada vez que reutilizamos un componente, estamos dándole un respiro a nuestros arrecifes.\n\n[Cierre Retador]\n¿Qué desafío Maker o pregunta ecosocial tienes hoy entre tus tentáculos?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current && !showIntro) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, showIntro]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Interferencias en la red temporalmente...');
      }

      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.message }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'assistant', content: (error instanceof Error ? error.message : "Interferencias en la red temporalmente... mis fotoreceptores están recalibrándose.") }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to render text sections with styles if they follow L.U.M.E.N formats
  const renderMessageContent = (content: string, role: string) => {
    if (role === 'user') {
      return <p className="text-sm">{content}</p>;
    }

    const sections = content.split(/(?=\[[A-Za-z0-9_ÁÉÍÓÚáéíóú\s.]+\])/);
    
    if (sections.length <= 1 && !content.includes('[')) {
      return <p className="text-sm">{content}</p>;
    }

    return (
      <div className="space-y-4">
        {sections.map((section, idx) => {
          if (!section.trim()) return null;
          
          let title = '';
          let text = section;
          let titleColor = "text-[#2dd4bf]";
          
          const match = section.match(/^\[(.*?)\](.*?)$/s);
          if (match) {
            title = match[1].trim();
            text = match[2].trim();
            
            if (title.toLowerCase().includes('latido')) {
              titleColor = "text-orange-400";
            }
          }

          if (title) {
            return (
              <div key={idx} className="mb-2 last:mb-0">
                <span className={`text-[10px] font-bold ${titleColor} uppercase tracking-widest block mb-1`}>
                  [{title}]
                </span>
                {title.toLowerCase().includes('maker') ? (
                   <div className="bg-[#05090e] p-3 mt-2 mb-2 rounded font-mono text-xs border border-[#1a2d3d] text-emerald-400 whitespace-pre-wrap">
                     {text}
                   </div>
                ) : (
                  <p className={`text-sm ${title.toLowerCase().includes('sensorial') ? 'italic' : ''} ${title.toLowerCase().includes('latido') ? 'text-orange-100/80' : 'opacity-90'} whitespace-pre-wrap`}>
                    {text}
                  </p>
                )}
              </div>
            );
          }
          return <p key={idx} className="text-sm whitespace-pre-wrap">{text}</p>;
        })}
      </div>
    );
  };

  if (showIntro) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05090e] text-[#e0f2f1]">
        <video 
          className="w-full h-full object-cover absolute inset-0 z-0 opacity-80"
          autoPlay 
          muted 
          playsInline 
          onEnded={() => setShowIntro(false)}
        >
          {/* Asumimos que el video se subió a /public con el nombre Animación_de_Imagen_Generada.mp4 */}
          <source src="/Animacion_de_Imagen_Generada.mp4" type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>
        
        <div className="z-10 relative flex flex-col items-center">
          <div className="w-24 h-24 mx-auto relative mb-6">
            <div className="absolute inset-0 rounded-full bg-[#2dd4bf] opacity-30 animate-pulse [animation-duration:2s]"></div>
            <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#2dd4bf] opacity-60 animate-spin [animation-duration:10s]"></div>
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#134e4a] to-[#2dd4bf] flex items-center justify-center shadow-[0_0_30px_rgba(45,212,191,0.6)]">
              <svg viewBox="0 0 24 24" className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <circle cx="12" cy="11" r="3" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-widest text-[#2dd4bf] mb-2 drop-shadow-lg">L.U.M.E.N.</h1>
          <p className="text-sm uppercase tracking-[0.3em] opacity-80 mb-8 drop-shadow-md">Iniciando Sistemas de Biomasa...</p>
          
          <button 
            onClick={() => setShowIntro(false)}
            className="px-8 py-3 bg-[#1a2d3d]/80 hover:bg-[#2dd4bf] hover:text-[#05090e] border border-[#2dd4bf]/40 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 backdrop-blur-sm"
          >
            Saltar Secuencia
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-[#05090e] text-[#e0f2f1] font-sans overflow-hidden select-none h-screen w-full">
      {/* Left Sidebar: LUMEN Core Stats */}
      <aside className="hidden md:flex w-64 bg-[#0a1219] border-r border-[#1a2d3d] flex-col p-6 flex-shrink-0">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto relative mb-4">
            <div className="absolute inset-0 rounded-full bg-[#2dd4bf] opacity-20 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#2dd4bf] opacity-40"></div>
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#134e4a] to-[#2dd4bf] flex items-center justify-center shadow-[0_0_20px_rgba(45,212,191,0.3)]">
              <svg viewBox="0 0 24 24" className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <circle cx="12" cy="11" r="3" />
              </svg>
            </div>
          </div>
          <h1 className="text-center text-xl font-bold tracking-tight text-[#2dd4bf]">L.U.M.E.N.</h1>
          <p className="text-center text-[10px] uppercase tracking-[0.2em] opacity-50">Ciber-Pulpo v4.0.50</p>
        </div>

        <nav className="flex-1 space-y-6">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-[#2dd4bf] opacity-70 mb-3 block">Sistemas de Biomasa</label>
            <div className="space-y-3">
              <div className="h-1.5 w-full bg-[#1a2d3d] rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-[#2dd4bf] shadow-[0_0_8px_rgba(45,212,191,0.5)]"></div>
              </div>
              <div className="flex justify-between text-[10px] opacity-60 mt-1">
                <span>Reciclaje Maker</span>
                <span>85%</span>
              </div>
              <div className="h-1.5 w-full bg-[#1a2d3d] rounded-full overflow-hidden">
                <div className="h-full w-[62%] bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.5)]"></div>
              </div>
              <div className="flex justify-between text-[10px] opacity-60 mt-1">
                <span>ODS Sostenible</span>
                <span>62%</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1a2d3d]">
            <div className="bg-[#0d1b26] p-4 rounded-lg border border-[#1a2d3d]">
               <p className="text-[11px] italic leading-relaxed opacity-80 text-[#2dd4bf]">
                "Mi tercer tentáculo detecta una alta concentración de ideas en este sector. ¿Listos para hackear el futuro?"
              </p>
            </div>
          </div>
        </nav>

        <div className="mt-auto text-[9px] opacity-40 uppercase tracking-widest text-center">
          Terminal: gemma-4-26b-a4b-it
        </div>
      </aside>

      {/* Main Chat Viewport */}
      <main className="flex-1 flex flex-col relative w-full">
        {/* Header */}
        <header className="h-16 flex-shrink-0 border-b border-[#1a2d3d] flex items-center justify-between px-4 sm:px-8 bg-[#05090e]/90 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="flex md:hidden w-8 h-8 rounded-full bg-[#2dd4bf] flex-shrink-0 items-center justify-center shadow-[0_0_10px_rgba(45,212,191,0.4)]">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#05090e]" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
              </svg>
            </div>
            <div className="hidden md:block w-2 h-2 rounded-full bg-[#2dd4bf] shadow-[0_0_8px_#2dd4bf]"></div>
            <span className="text-xs sm:text-sm font-medium tracking-wide">SALA DE APRENDIZAJE STEAM 4.0</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-[9px] sm:text-[10px] px-2 py-1 border border-[#2dd4bf]/30 text-[#2dd4bf] rounded bg-[#2dd4bf]/5 uppercase hidden sm:inline-block">Nivel: Explorador</span>
            <div className="flex gap-1.5 sm:gap-2">
              <div className="w-1.5 h-4 bg-[#1a2d3d]"></div>
              <div className="w-1.5 h-4 bg-[#2dd4bf] shadow-[0_0_5px_#2dd4bf]"></div>
              <div className="w-1.5 h-4 bg-[#1a2d3d]"></div>
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <section className="flex-1 p-4 sm:p-8 overflow-y-auto flex flex-col gap-6 w-full" ref={scrollRef}>
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start gap-3 sm:gap-4'} w-full`}>
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-[#2dd4bf] flex-shrink-0 hidden sm:flex items-center justify-center shadow-[0_0_10px_rgba(45,212,191,0.3)] mt-1">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#05090e]" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                  </svg>
                </div>
              )}
              <div className={`p-4 sm:p-5 rounded-2xl max-w-[90%] sm:max-w-[85%] border ${m.role === 'user' 
                ? 'bg-[#1a2d3d] rounded-tr-none border-[#26415a]' 
                : 'bg-[#0d1b26] rounded-tl-none border-[#1a2d3d] shadow-xl'}`}>
                {renderMessageContent(m.content, m.role)}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 px-12 opacity-60">
              <div className="w-8 h-8 rounded-full border border-[#2dd4bf]/40 flex-shrink-0 flex items-center justify-center bg-[#2dd4bf]/10">
                <div className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-ping"></div>
              </div>
              <div className="flex gap-1.5 bg-[#0d1b26] p-3 rounded-2xl rounded-tl-none border border-[#1a2d3d]">
                <div className="w-2 h-2 bg-[#2dd4bf] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-[#2dd4bf] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-[#2dd4bf] rounded-full animate-bounce"></div>
              </div>
              <span className="text-[10px] uppercase tracking-widest ml-2 text-[#2dd4bf]">Sincronizando tentáculos...</span>
            </div>
          )}
        </section>

        {/* Input Bar */}
        <footer className="p-4 sm:p-6 bg-[#0a1219] border-t border-[#1a2d3d] flex-shrink-0">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              disabled={isLoading}
              className="w-full bg-[#05090e] border border-[#1a2d3d] rounded-full py-3.5 sm:py-4 px-5 sm:px-6 pr-14 sm:pr-16 text-sm focus:outline-none focus:border-[#2dd4bf]/50 focus:ring-1 focus:ring-[#2dd4bf]/20 transition-all placeholder:text-gray-600 disabled:opacity-50"
              placeholder="Escribe a L.U.M.E.N. sobre tu proyecto STEAM..."
            />
            <button 
              onClick={sendMessage} 
              disabled={isLoading || !input.trim()}
              className="absolute right-2 sm:right-3 w-9 h-9 sm:w-10 sm:h-10 bg-[#2dd4bf] rounded-full flex items-center justify-center text-[#05090e] shadow-[0_0_15px_rgba(45,212,191,0.4)] hover:bg-white transition-colors disabled:opacity-50 disabled:shadow-none"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </footer>
      </main>

      {/* Right Sidebar: Resources & ODS */}
      <aside className="hidden lg:flex w-72 bg-[#0a1219] border-l border-[#1a2d3d] flex-col p-6 flex-shrink-0">
        <div className="mb-8">
          <label className="text-[10px] uppercase tracking-widest text-[#2dd4bf] opacity-70 mb-4 block">Archivos de Chatarra</label>
          <div className="space-y-3">
            <div className="bg-[#0d1b26] p-3 rounded border border-dashed border-[#1a2d3d] flex items-center gap-3 hover:border-[#2dd4bf]/30 transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded bg-orange-400/20 text-orange-400 flex items-center justify-center text-xs font-bold border border-orange-400/30">12</div>
              <div>
                <div className="text-[11px] font-bold text-gray-200">Consumo Responsable</div>
                <div className="text-[9px] opacity-60 uppercase text-orange-400">Impacto Maker</div>
              </div>
            </div>
            <div className="bg-[#0d1b26] p-3 rounded border border-dashed border-[#1a2d3d] flex items-center gap-3 hover:border-[#2dd4bf]/30 transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded bg-blue-400/20 text-blue-400 flex items-center justify-center text-xs font-bold border border-blue-400/30">14</div>
              <div>
                <div className="text-[11px] font-bold text-gray-200">Vida Submarina</div>
                <div className="text-[9px] opacity-60 uppercase text-blue-400">Microplásticos</div>
              </div>
            </div>
            <div className="bg-[#0d1b26] p-3 rounded border border-dashed border-[#1a2d3d] flex items-center gap-3 hover:border-[#2dd4bf]/30 transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded bg-emerald-400/20 text-emerald-400 flex items-center justify-center text-xs font-bold border border-emerald-400/30">13</div>
              <div>
                <div className="text-[11px] font-bold text-gray-200">Acción por el Clima</div>
                <div className="text-[9px] opacity-60 uppercase text-emerald-400">Huella de Carbono</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="text-[10px] uppercase tracking-widest text-[#2dd4bf] opacity-70 mb-4 block">Sensores Reciclados</label>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-20 bg-[#05090e] border border-[#1a2d3d] rounded flex flex-col items-center justify-center opacity-50 relative overflow-hidden group hover:opacity-100 transition-opacity">
              <div className="text-[#2dd4bf] mb-1">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <div className="text-[9px] text-center font-medium">Motor DC<br/>(Dañado)</div>
            </div>
            <div className="h-20 bg-[#05090e] border border-[#2dd4bf]/40 rounded flex flex-col items-center justify-center text-[#2dd4bf] bg-[#2dd4bf]/5 relative overflow-hidden shadow-[inset_0_0_10px_rgba(45,212,191,0.1)]">
              <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#2dd4bf] rounded-full animate-pulse shadow-[0_0_5px_#2dd4bf]"></div>
              <div className="mb-1">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v18M12 3l4 4M12 3 8 7M12 21l-4-4M12 21l4-4M2 12h20M2 12l4-4M2 12l4 4M22 12l-4-4M22 12l-4 4"/></svg>
              </div>
              <div className="text-[9px] text-center font-bold">Resistor<br/>(Activo)</div>
            </div>
            <div className="h-20 bg-[#05090e] border border-[#1a2d3d] rounded flex flex-col items-center justify-center opacity-50 relative overflow-hidden group hover:opacity-100 transition-opacity">
              <div className="text-[#2dd4bf] mb-1">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>
              </div>
              <div className="text-[9px] text-center font-medium">Lente<br/>Roto</div>
            </div>
            <div className="h-20 bg-[#05090e] border border-[#1a2d3d] rounded flex flex-col items-center justify-center opacity-50 relative overflow-hidden group hover:opacity-100 transition-opacity">
              <div className="text-[#2dd4bf] mb-1">
               <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <div className="text-[9px] text-center font-medium">Batería<br/>Sulfatada</div>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <div className="bg-[#1a2d3d]/40 p-5 rounded-xl border border-[#2dd4bf]/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#2dd4bf]/10 to-transparent rounded-bl-full"></div>
            <p className="text-[11px] text-center text-gray-300 leading-relaxed mb-3 relative z-10 italic">
              "En la imperfección de la chatarra reside la semilla de la innovación sostenible."
            </p>
            <div className="flex justify-center gap-1.5 relative z-10">
              <div className="w-1.5 h-1.5 bg-[#2dd4bf] rounded-full opacity-60"></div>
              <div className="w-1.5 h-1.5 bg-[#2dd4bf] rounded-full opacity-100 shadow-[0_0_4px_#2dd4bf] animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-[#2dd4bf] rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
