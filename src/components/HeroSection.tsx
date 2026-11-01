import React from 'react';
import { Play, ArrowRight, Gamepad2, Wallet, Star } from 'lucide-react';
import { sfx } from '../utils/audio';

interface Props {
  onPlayDemo: () => void;
  onExploreGames: () => void;
  isDarkMode: boolean;
}

export const HeroSection: React.FC<Props> = ({
  onPlayDemo,
  onExploreGames,
  isDarkMode
}) => {
  return (
    <section id="hero" className="relative pt-6 sm:pt-12 pb-12 sm:pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left Column Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-amber-400/40 bg-amber-400/10 text-amber-500 dark:text-amber-300">
              <span>✨</span>
              <span>GAME EDUKASI DIGITAL · ANAK INDONESIA</span>
            </div>

            {/* Playful Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-slate-900 dark:text-white">
              Belajar jadi{' '}
              <span className="inline-block">
                <span className="text-[#FF6B6B]">pe</span>
                <span className="text-[#F59E0B]">tu</span>
                <span className="text-[#10B981]">al</span>
                <span className="text-[#06B6D4]">an</span>
                <span className="text-[#8B5CF6]">gan</span>
              </span>{' '}
              paling seru!
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-xl">
              Yunma adalah koleksi game edukasi digital yang membuat anak-anak mencintai matematika, bahasa, sains, dan coding — lengkap dengan laporan kemajuan untuk orang tua.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  sfx.playFanfare();
                  onPlayDemo();
                }}
                className="py-3.5 px-6 rounded-full font-extrabold text-sm sm:text-base text-white shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer bg-gradient-to-r from-rose-500 via-indigo-600 to-cyan-500"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-white text-white translate-x-0.5" />
                </div>
                <span>Mainkan Demo</span>
              </button>

              <button
                onClick={() => {
                  sfx.playTap();
                  onExploreGames();
                }}
                className={`py-3.5 px-6 rounded-full font-bold text-sm sm:text-base border transition-all flex items-center gap-2 cursor-pointer ${
                  isDarkMode
                    ? 'border-[#334155] bg-[#141B2B] text-white hover:border-cyan-400'
                    : 'border-stone-300 bg-white text-slate-800 hover:bg-stone-50 shadow-xs'
                }`}
              >
                <span>Jelajahi Game</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Highlight Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-4">
              <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border ${
                isDarkMode ? 'bg-[#141B2B] border-[#334155] text-slate-300' : 'bg-white border-stone-200 text-slate-700 shadow-2xs'
              }`}>
                <Gamepad2 className="w-4 h-4 text-purple-400" />
                <span>4 Game Edukasi</span>
              </div>

              <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border ${
                isDarkMode ? 'bg-[#141B2B] border-[#334155] text-slate-300' : 'bg-white border-stone-200 text-slate-700 shadow-2xs'
              }`}>
                <Wallet className="w-4 h-4 text-emerald-400" />
                <span>10% Cashback tiap beli</span>
              </div>

              <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border ${
                isDarkMode ? 'bg-[#141B2B] border-[#334155] text-slate-300' : 'bg-white border-stone-200 text-slate-700 shadow-2xs'
              }`}>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>Rating 4.9 dari orang tua</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Tablet & Floating Badges */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Luminous Neon Rim Container */}
            <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl p-1 bg-gradient-to-tr from-[#FF6B6B] via-[#4CD7F6] to-[#8B5CF6] shadow-2xl">
              <div className="w-full h-full rounded-[22px] overflow-hidden bg-slate-900 relative">
                {/* Visual of happy Indonesian child with tablet */}
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80"
                  alt="Anak belajar ceria dengan tablet Yunma"
                  className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.05]"
                  loading="eager"
                />

                {/* Ambient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Top Badge: ⭐ +10 bintang */}
              <div className="absolute -top-4 -left-4 sm:-left-6 px-4 py-2.5 rounded-2xl bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white border border-stone-200 dark:border-slate-700 shadow-xl flex items-center gap-3 animate-float">
                <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-500 flex items-center justify-center font-bold text-lg">
                  ⭐
                </div>
                <div>
                  <div className="text-xs font-black leading-tight">+10 bintang</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Jawaban tepat!</div>
                </div>
              </div>

              {/* Floating Bottom Badge: 🎮 Level 3 selesai */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 px-4 py-2.5 rounded-2xl bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white border border-stone-200 dark:border-slate-700 shadow-xl flex items-center gap-3 animate-float-delayed">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-lg">
                  🎮
                </div>
                <div>
                  <div className="text-xs font-black leading-tight">Level 3 selesai</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Math Quest</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
