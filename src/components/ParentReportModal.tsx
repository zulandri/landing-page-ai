import React from 'react';
import { X, CheckCircle, Award, Clock, Brain, BookOpen, ShieldCheck, Download, Share2 } from 'lucide-react';
import { sfx } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  childName?: string;
  isDarkMode?: boolean;
}

export const ParentReportModal: React.FC<Props> = ({
  isOpen,
  onClose,
  childName = 'Aisyah',
  isDarkMode = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-2xl rounded-3xl overflow-hidden border shadow-2xl flex flex-col max-h-[90vh] ${
          isDarkMode ? 'bg-[#0F172A] border-[#334155] text-white' : 'bg-white border-stone-200 text-slate-800'
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${
          isDarkMode ? 'bg-[#1E293B] border-[#334155]' : 'bg-stone-50 border-stone-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-500 flex items-center justify-center font-bold text-xl">
              📊
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">Laporan Pantau Belajar Orang Tua</h3>
              <p className="text-xs text-slate-400">Profil Anak: <span className="font-semibold text-cyan-500">{childName} (6 Th)</span> · Real-Time Sync</p>
            </div>
          </div>
          <button
            onClick={() => {
              sfx.playTap();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400 hover:text-slate-600 dark:hover:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Target Mingguan */}
          <div className={`p-4 rounded-2xl border ${
            isDarkMode ? 'bg-[#1E293B]/60 border-[#334155]' : 'bg-stone-50 border-stone-200'
          }`}>
            <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-2">
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-500" />
                Target Kosakata Minggu Ini
              </span>
              <span className="text-emerald-500 font-bold">12 / 15 Kata (80%)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full w-[80%]" />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Tersisa 3 kata baru untuk membuka Lencana Penjelajah Bahasa Level 2!
            </p>
          </div>

          {/* Skill Breakdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className={`p-3.5 rounded-2xl border text-center ${
              isDarkMode ? 'bg-[#1E293B]/40 border-[#334155]' : 'bg-stone-50 border-stone-200'
            }`}>
              <span className="text-2xl mb-1 block">🎯</span>
              <div className="text-lg font-bold text-cyan-500">92%</div>
              <div className="text-xs text-slate-400 font-medium">Akurasi Ejaan</div>
            </div>
            <div className={`p-3.5 rounded-2xl border text-center ${
              isDarkMode ? 'bg-[#1E293B]/40 border-[#334155]' : 'bg-stone-50 border-stone-200'
            }`}>
              <span className="text-2xl mb-1 block">⏱️</span>
              <div className="text-lg font-bold text-amber-500">18 Menit</div>
              <div className="text-xs text-slate-400 font-medium">Rata-Rata / Sesi</div>
            </div>
            <div className={`p-3.5 rounded-2xl border text-center col-span-2 sm:col-span-1 ${
              isDarkMode ? 'bg-[#1E293B]/40 border-[#334155]' : 'bg-stone-50 border-stone-200'
            }`}>
              <span className="text-2xl mb-1 block">🌟</span>
              <div className="text-lg font-bold text-purple-500">Level 3</div>
              <div className="text-xs text-slate-400 font-medium">Tahap Fonik</div>
            </div>
          </div>

          {/* Rekomendasi Edukator Yunma */}
          <div className={`p-4 rounded-2xl border ${
            isDarkMode ? 'bg-emerald-950/20 border-emerald-800/40' : 'bg-emerald-50 border-emerald-200'
          }`}>
            <h4 className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 mb-1.5">
              <Brain className="w-4 h-4" />
              Saran Edukator Yunma untuk Bunda & Ayah
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {childName} menunjukkan ketertarikan tinggi pada kata-kata berima bertema binatang. Dianjurkan mengajak bermain tebak kata serupa di sela-sela aktivitas harian untuk memperkuat memori asosiatifnya.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className={`px-6 py-3.5 border-t flex items-center justify-between text-xs ${
          isDarkMode ? 'bg-[#1E293B] border-[#334155]' : 'bg-stone-50 border-stone-200'
        }`}>
          <span className="text-slate-400">Laporan terkirim otomatis ke email tiap Minggu</span>
          <button
            onClick={() => {
              sfx.playTap();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
