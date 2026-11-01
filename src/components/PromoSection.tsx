import React, { useState } from 'react';
import { PROMO_CODES } from '../data/mockData';
import { PromoCode } from '../types';
import { Copy, ArrowRight, Check, Sparkles, Wallet } from 'lucide-react';
import { sfx } from '../utils/audio';

interface Props {
  onUsePromo: (code: string) => void;
  isDarkMode: boolean;
}

export const PromoSection: React.FC<Props> = ({
  onUsePromo,
  isDarkMode
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    sfx.playTap();
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1800);
  };

  const handleApply = (code: string) => {
    sfx.playCorrect();
    onUsePromo(code);
  };

  return (
    <section id="promo" className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-rose-500 mb-1.5 block">
            PROMO & DISKON
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Hemat lebih banyak,{' '}
            <span className="inline-block">
              <span className="text-[#FF6B6B]">ti</span>
              <span className="text-[#10B981]">ap</span>{' '}
              <span className="text-[#8B5CF6]">hari</span>
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Pakai kode di bawah saat checkout, lalu dapatkan cashback otomatis setelah pembayaran.
          </p>
        </div>

        {/* 3 Voucher Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PROMO_CODES.map(promo => {
            const isCopied = copiedCode === promo.code;
            return (
              <div
                key={promo.code}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isDarkMode
                    ? 'bg-[#111827] border-[#334155]'
                    : 'bg-white border-stone-200 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                    <span>🎟️</span>
                    <span>KODE PROMO</span>
                  </div>

                  {/* Colorful Code Text */}
                  <div className="text-xl sm:text-2xl font-black tracking-wider my-1">
                    {promo.code === 'YUNMAJUARA' ? (
                      <span>
                        <span className="text-[#FF6B6B]">YUN</span>
                        <span className="text-[#F59E0B]">MA</span>
                        <span className="text-[#06B6D4]">JUARA</span>
                      </span>
                    ) : promo.code === 'SUPER50' ? (
                      <span>
                        <span className="text-[#FF6B6B]">SUPER</span>
                        <span className="text-[#10B981]">50</span>
                      </span>
                    ) : (
                      <span>
                        <span className="text-[#FF6B6B]">RAIN</span>
                        <span className="text-[#F59E0B]">BOW</span>
                        <span className="text-[#10B981]">15</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">
                    {promo.title}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => handleCopy(promo.code)}
                    className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      isDarkMode
                        ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                        : 'border-stone-200 hover:bg-stone-50 text-slate-700'
                    }`}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Tersalin' : 'Salin'}</span>
                  </button>

                  <button
                    onClick={() => handleApply(promo.code)}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#191F2F] dark:bg-rose-500 dark:hover:bg-rose-600 text-white hover:bg-slate-800 text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-all cursor-pointer"
                  >
                    <span>Pakai</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cashback 10% Feature Banner */}
        <div
          className={`p-6 sm:p-7 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-all ${
            isDarkMode
              ? 'bg-[#111827] border-[#334155]'
              : 'bg-[#161B2A] text-white border-slate-800 shadow-xl'
          }`}
        >
          <div className="flex items-start gap-4">
            {/* Glowing Wallet Emblem */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-500 to-cyan-400 p-0.5 shrink-0 shadow-lg">
              <div className="w-full h-full bg-[#111827] rounded-[14px] flex items-center justify-center text-2xl">
                👛
              </div>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                Cashback 10% untuk semua pembelian
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
                Setiap pembayaran selesai, cashback otomatis masuk ke dompet Yunma. Cek saldonya kapan saja dengan email kamu di bagian bawah halaman.
              </p>
            </div>
          </div>

          <div className="text-left md:text-right shrink-0 border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto">
            <div className="text-2xl sm:text-3xl font-black">
              <span className="text-[#F59E0B]">Rp </span>
              <span className="text-[#10B981]">4.900 </span>
              <span className="text-xs text-slate-400 font-normal">/contoh</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Saldo dapat langsung dipakai belanja berikutnya
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
