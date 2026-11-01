import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, CheckCircle } from 'lucide-react';

interface Props {
  isDarkMode: boolean;
}

export const TestimoniSection: React.FC<Props> = ({ isDarkMode }) => {
  return (
    <section id="ulasan" className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500 mb-1.5 block">
            KATA MEREKA
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Dipercaya{' '}
            <span className="inline-block text-[#FF6B6B]">orang tua</span> &{' '}
            <span className="inline-block text-[#06B6D4]">guru</span>
          </h2>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
            *Tampilan contoh — pemilik toko dapat mengganti dengan testimoni asli.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
                isDarkMode
                  ? 'bg-[#111827] border-[#334155]'
                  : 'bg-white border-stone-200 shadow-xs'
              }`}
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-500 shrink-0" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {t.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
