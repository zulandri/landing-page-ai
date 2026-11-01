import React, { useState } from 'react';
import { GAMES, FORMAT_IDR } from '../data/mockData';
import { Game } from '../types';
import { Plus, Check, Sparkles } from 'lucide-react';
import { sfx } from '../utils/audio';

interface Props {
  onAddToCart: (game: Game) => void;
  isDarkMode: boolean;
}

export const KatalogSection: React.FC<Props> = ({
  onAddToCart,
  isDarkMode
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua Game');
  const [addedGameId, setAddedGameId] = useState<string | null>(null);

  const categories = ['Semua Game', 'Matematika', 'Bahasa', 'Coding', 'Sains'];

  const filteredGames = selectedCategory === 'Semua Game'
    ? GAMES
    : GAMES.filter(g => g.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleAdd = (game: Game) => {
    sfx.playFanfare();
    onAddToCart(game);
    setAddedGameId(game.id);
    setTimeout(() => setAddedGameId(null), 1600);
  };

  return (
    <section id="katalog" className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-rose-500 mb-1.5 block">
              KATALOG PEMBELAJARAN
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Pilih petualangan terbaik untuk si kecil
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Dapat dimainkan di browser tablet, iPad, laptop, maupun smartphone tanpa instalasi rumit.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map(cat => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    sfx.playTap();
                    setSelectedCategory(cat);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? isDarkMode
                        ? 'bg-cyan-500 text-slate-950 shadow-md scale-105'
                        : 'bg-[#191F2F] text-white shadow-md scale-105'
                      : isDarkMode
                      ? 'bg-[#141B2B] text-slate-400 hover:text-white border border-[#334155]'
                      : 'bg-white text-stone-600 hover:text-slate-950 border border-stone-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {filteredGames.map(game => {
            const isAdded = addedGameId === game.id;
            return (
              <div
                key={game.id}
                className={`relative rounded-3xl p-4 flex flex-col justify-between border transition-all duration-300 hover:shadow-xl group ${
                  game.popular
                    ? isDarkMode
                      ? 'border-amber-400/80 bg-[#141B2B] ring-2 ring-amber-400/20'
                      : 'border-amber-400 bg-white shadow-md ring-2 ring-amber-400/20'
                    : isDarkMode
                    ? 'border-[#334155] bg-[#111827] hover:border-slate-600'
                    : 'border-stone-200 bg-white hover:border-stone-300 shadow-xs'
                }`}
              >
                {/* Popular Ribbon if applicable */}
                {game.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                    PALING POPULER
                  </div>
                )}

                <div>
                  {/* Visual Top Tile */}
                  <div
                    className={`relative w-full aspect-[16/10] rounded-2xl p-4 flex flex-col items-center justify-center text-white bg-gradient-to-tr ${game.gradient} shadow-md overflow-hidden group-hover:scale-[1.02] transition-transform`}
                  >
                    {/* Age Pill inside tile */}
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/30 backdrop-blur-xs text-white">
                      {game.age}
                    </span>

                    {/* Icon / Character emblem */}
                    <div className="text-4xl filter drop-shadow-md">
                      {game.id === 'math-quest' && '123'}
                      {game.id === 'kata-ajaib' && '📖'}
                      {game.id === 'space-coder' && '🚀'}
                      {game.id === 'dino-lab' && '🦖'}
                    </div>

                    <span className="font-extrabold text-xs tracking-wide mt-2 text-white/95 text-center px-2">
                      {game.title.split(':')[0]}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div className="mt-4 space-y-1.5">
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                      {game.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {game.description}
                    </p>
                  </div>
                </div>

                {/* Price and CTA Button */}
                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 line-through block">
                      {FORMAT_IDR(game.originalPrice)}
                    </span>
                    <span className="text-base font-black text-slate-950 dark:text-white">
                      {FORMAT_IDR(game.price)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAdd(game)}
                    className={`py-2 px-4 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md active:scale-95 ${
                      isAdded
                        ? 'bg-emerald-500 text-slate-950'
                        : game.popular
                        ? 'bg-[#FF6B6B] hover:bg-[#F85858] text-slate-950 font-black'
                        : isDarkMode
                        ? 'bg-cyan-500/15 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/40'
                        : 'bg-stone-100 hover:bg-stone-200 text-slate-900 border border-stone-200'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Ditambahkan!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Beli</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
