import React, { useState } from 'react';
import { InteractiveGamePlayer } from './InteractiveGamePlayer';
import { Sparkles, Play } from 'lucide-react';
import { sfx } from '../utils/audio';

interface Props {
  onOpenFullGame: () => void;
  onExploreCatalog: () => void;
  isDarkMode: boolean;
}

export const DemoTrailerSection: React.FC<Props> = ({
  onOpenFullGame,
  onExploreCatalog,
  isDarkMode
}) => {
  const [activeGameId, setActiveGameId] = useState<string>('math-quest');

  return (
    <section id="demo" className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Header with Title and Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-500 mb-1.5 block">
              ✨ DEMO & TRAILER
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Lihat gamenya{' '}
              <span className="inline-block">
                <span className="text-[#FF6B6B]">se</span>
                <span className="text-[#F59E0B]">be</span>
                <span className="text-[#06B6D4]">lum</span>{' '}
                <span className="text-[#8B5CF6]">beli</span>
              </span>
            </h2>
          </div>

          <button
            onClick={() => {
              sfx.playFanfare();
              onOpenFullGame();
            }}
            className="py-2.5 px-5 rounded-full font-bold text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer self-start sm:self-auto shrink-0"
          >
            <span>Coba Demo Interaktif</span>
          </button>
        </div>

        {/* Embedded Interactive Console */}
        <InteractiveGamePlayer
          activeGameId={activeGameId}
          onSelectGame={setActiveGameId}
          isDarkMode={isDarkMode}
          onExploreCatalog={onExploreCatalog}
        />
      </div>
    </section>
  );
};
