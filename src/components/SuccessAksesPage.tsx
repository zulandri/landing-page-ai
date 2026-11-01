import React, { useState } from 'react';
import { Check, Star, Copy, Download, Share2, MessageCircle, Users, ExternalLink, ArrowRight, Smartphone, Laptop, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { OrderState } from '../types';
import { FORMAT_IDR } from '../data/mockData';
import { sfx } from '../utils/audio';

interface Props {
  orderState: OrderState;
  onOpenGame: () => void;
  onOpenReport: () => void;
  onBackToHome: () => void;
  isDarkMode: boolean;
}

export const SuccessAksesPage: React.FC<Props> = ({
  orderState,
  onOpenGame,
  onOpenReport,
  onBackToHome,
  isDarkMode
}) => {
  const [copiedPin, setCopiedPin] = useState<boolean>(false);
  const [resendStatus, setResendStatus] = useState<string>('');
  const [downloadedItem, setDownloadedItem] = useState<string>('');

  const childName = orderState.childName || 'Aisyah';
  const childPin = orderState.childPin || '4920';
  const email = orderState.email || 'zulandri40@gmail.com';
  const phone = orderState.whatsapp || '+62 812-3456-7890';
  const orderId = orderState.orderId || '#YNM-20261102-8841';

  const handleCopyPin = () => {
    sfx.playTap();
    navigator.clipboard.writeText(childPin).catch(() => {});
    setCopiedPin(true);
    setTimeout(() => setCopiedPin(false), 2000);
  };

  const handleResend = () => {
    sfx.playTap();
    setResendStatus('Terkirim!');
    setTimeout(() => setResendStatus(''), 2500);
  };

  const handleDownload = (name: string) => {
    sfx.playCorrect();
    setDownloadedItem(name);
    setTimeout(() => setDownloadedItem(''), 2500);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-[#0B0F19] text-[#DCE2F7]' : 'bg-[#FAF7F2] text-slate-800'
    }`}>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 text-white text-xs sm:text-sm font-semibold py-2 px-4 text-center">
        <span>✨ Promo Libur Pintar: Gunakan kode <strong>YUNMAJUARA</strong> untuk diskon 20% & dapatkan 10% cashback instan!</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Stepper Progress Bar */}
        <div className={`p-4 rounded-2xl border flex items-center justify-between text-xs sm:text-sm font-bold ${
          isDarkMode ? 'bg-[#111827] border-[#334155]' : 'bg-white border-stone-200 shadow-xs'
        }`}>
          {/* Step 1 */}
          <div className="flex items-center gap-2 text-emerald-500">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span>1. Pesan</span>
          </div>

          <div className="flex-1 mx-2 sm:mx-6 h-0.5 bg-emerald-500 rounded-full" />

          {/* Step 2 */}
          <div className="flex items-center gap-2 text-emerald-500">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span>2. QRIS</span>
          </div>

          <div className="flex-1 mx-2 sm:mx-6 h-0.5 bg-emerald-500 rounded-full" />

          {/* Step 3 */}
          <div className="flex items-center gap-2 text-rose-500">
            <div className="w-6 h-6 rounded-full bg-[#FF6B6B] text-white flex items-center justify-center font-bold text-xs shadow-md animate-pulse">
              ★
            </div>
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white">3. Akses Aktif 🚀</span>
            </div>
          </div>
        </div>

        {/* Celebration Header */}
        <div className="flex flex-col items-center text-center space-y-3 pt-2 pb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <Sparkles className="w-4 h-4" />
            <span>Hore! Pembayaran QRIS Berhasil Diverifikasi Otomatis</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950 dark:text-white">
            Selamat Datang di Dunia Petualangan,{' '}
            <span className="text-amber-500">{childName.slice(0, 3)}</span>
            <span className="text-cyan-500">{childName.slice(3)}</span>!
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Akses game edukasi <strong className="text-slate-900 dark:text-white">Yunma Kata Ajaib</strong> sudah <strong className="text-emerald-500">100% Aktif</strong>. Mainkan seketika via browser di HP, tablet, maupun laptop tanpa perlu download yang rumit!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-200 dark:bg-[#1E293B] text-slate-700 dark:text-slate-300">
              ID: {orderId}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-200 dark:bg-[#1E293B] text-slate-600 dark:text-slate-400">
              ● 2 Menit yang lalu
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              ✓ Lunas (QRIS Instan)
            </span>
          </div>
        </div>

        {/* Automatic Delivery Alert Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-600 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 text-xl">
              ✉️
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider block text-emerald-100">
                KIRIM OTOMATIS SUKSES
              </span>
              <p className="text-xs sm:text-sm text-emerald-50">
                Bukti pembelian, PIN anak, & link game instan dikirim ke <strong>{email}</strong> dan WhatsApp <strong>{phone}</strong>.
              </p>
            </div>
          </div>

          <button
            onClick={handleResend}
            className="px-4 py-2 rounded-xl bg-white text-emerald-700 hover:bg-emerald-50 font-bold text-xs shrink-0 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{resendStatus || 'Kirim Ulang'}</span>
          </button>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Game Access Card */}
            <div className={`p-6 sm:p-7 rounded-3xl border shadow-md relative overflow-hidden ${
              isDarkMode ? 'bg-[#111827] border-[#334155]' : 'bg-white border-stone-200'
            }`}>
              {/* Badges */}
              <div className="flex items-center justify-between mb-5">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  Game Siap Dimainkan
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  Usia Rekomendasi: 4 - 8 Tahun
                </span>
              </div>

              {/* Title & Info */}
              <div className="flex gap-4 items-start mb-5">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-coral-600 flex items-center justify-center text-white font-black text-3xl shrink-0 shadow-lg">
                  ABC
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 dark:text-white leading-tight">
                    Yunma Kata Ajaib: Petualangan Membaca
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                    Jelajahi 40+ level petualangan mencari kata berima, menyusun suku kata, dan berpetualang bersama robot lucu Yunma. Dilengkapi narasi suara Bahasa Indonesia ramah anak.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    <span>✓ Bebas Iklan</span>
                    <span>•</span>
                    <span>✓ Akses Multi-Device</span>
                    <span>•</span>
                    <span>✓ Audio Edukator Asli</span>
                  </div>
                </div>
              </div>

              {/* Huge Play Button */}
              <button
                onClick={() => {
                  sfx.playFanfare();
                  confetti({ particleCount: 60, spread: 80, origin: { y: 0.5 } });
                  onOpenGame();
                }}
                className="w-full py-4 px-6 rounded-2xl text-white font-black text-base sm:text-lg tracking-wide shadow-xl active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:brightness-110"
              >
                <span>🚀 Mulai Main Sekarang (Buka Game)</span>
              </button>

              {/* Device Quick Shortcuts */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  onClick={() => {
                    sfx.playTap();
                    onOpenGame();
                  }}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    isDarkMode ? 'bg-[#1E293B] border-slate-700 hover:bg-[#2A374F]' : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <Laptop className="w-4 h-4 text-cyan-500" />
                  <span>Buka di Tablet/Laptop</span>
                </button>
                <button
                  onClick={() => {
                    sfx.playTap();
                    onOpenGame();
                  }}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    isDarkMode ? 'bg-[#1E293B] border-slate-700 hover:bg-[#2A374F]' : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-emerald-500" />
                  <span>Shortcut Android/iOS</span>
                </button>
              </div>

              {/* Child PIN Box */}
              <div className={`mt-5 p-4 rounded-2xl border ${
                isDarkMode ? 'bg-[#1E293B]/60 border-[#334155]' : 'bg-amber-50/60 border-amber-200'
              }`}>
                <div className="flex items-center justify-between text-xs font-bold mb-3">
                  <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                    🔒 PROFIL PEMAIN & KUNCI MASUK ANAK
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black">
                    Mode Ramah Anak
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 items-center">
                  <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-[#0B0F19]' : 'bg-white shadow-xs'}`}>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">
                      NAMA AKUN ANAK
                    </span>
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                      {childName} (6 Tahun)
                    </span>
                  </div>

                  <div className={`p-3 rounded-xl flex items-center justify-between ${isDarkMode ? 'bg-[#0B0F19]' : 'bg-white shadow-xs'}`}>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">
                        PIN 4 DIGIT
                      </span>
                      <span className="text-base font-mono font-black text-amber-500 tracking-widest flex items-center gap-1">
                        ⭐ {childPin.split('').join(' ')}
                      </span>
                    </div>

                    <button
                      onClick={handleCopyPin}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold flex items-center gap-1 text-slate-700 dark:text-slate-300"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedPin ? 'Tersalin!' : 'Salin'}</span>
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2.5">
                  Ketikkan PIN 4 digit ini jika diminta saat pertama kali masuk ke permainan di perangkat baru.
                </p>
              </div>
            </div>

            {/* Bonus Materials Download Card */}
            <div className={`p-6 rounded-3xl border shadow-xs ${
              isDarkMode ? 'bg-[#111827] border-[#334155]' : 'bg-white border-stone-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm sm:text-base font-extrabold flex items-center gap-2 text-slate-900 dark:text-white">
                  <span>🎨</span>
                  <span>Materi Pendamping Belajar Fisik (Bonus)</span>
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  Gratis Untukmu
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Kombinasikan screen-time dengan aktivitas motorik halus. Unduh bundel lembar kerja huruf & mewarnai karakter Yunma untuk dicetak di rumah.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => handleDownload('Lembar Mewarnai')}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between group transition-all ${
                    isDarkMode ? 'bg-[#1E293B] border-slate-700 hover:border-cyan-400' : 'bg-stone-50 border-stone-200 hover:border-cyan-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 rounded bg-rose-500 text-white font-black text-xs">
                      PDF
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        Lembar Huruf & Mewarnai
                      </div>
                      <div className="text-[10px] text-slate-400">24 Halaman Siap Cetak (A4)</div>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 transition-colors" />
                </button>

                <button
                  onClick={() => handleDownload('Panduan Ortu')}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between group transition-all ${
                    isDarkMode ? 'bg-[#1E293B] border-slate-700 hover:border-purple-400' : 'bg-stone-50 border-stone-200 hover:border-purple-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 rounded bg-purple-600 text-white font-black text-xs">
                      PDF
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        Panduan Orang Tua Pintar
                      </div>
                      <div className="text-[10px] text-slate-400">Tips 15 Menit Belajar Ceria</div>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-purple-500 transition-colors" />
                </button>
              </div>

              {downloadedItem && (
                <p className="text-xs text-emerald-500 font-bold mt-3 text-center">
                  ✓ Berhasil mengunduh {downloadedItem}!
                </p>
              )}
            </div>
          </div>

          {/* Right Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Cashback Reward Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500 to-rose-600 text-white shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-100 flex items-center gap-1.5">
                  🪙 KOIN CASHBACK MASUK
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white">
                  10% CASHBACK
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-black tracking-tight my-2">
                +Rp 3.120
              </div>

              <p className="text-xs text-amber-50 leading-relaxed mb-4">
                Berhasil ditambahkan ke saldo dompet akun <strong>{email}</strong>. Bisa langsung digunakan untuk game berikutnya!
              </p>

              <div className="pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                <span>Total Saldo Cashback Kamu:</span>
                <span className="text-base font-black font-mono">Rp 18.800</span>
              </div>
            </div>

            {/* Dashboard Pantau Belajar */}
            <div className={`p-6 rounded-3xl border shadow-xs ${
              isDarkMode ? 'bg-[#111827] border-[#334155]' : 'bg-white border-stone-200'
            }`}>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-500 flex items-center justify-center font-bold">
                  📊
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Dashboard Pantau Belajar
                  </h4>
                  <p className="text-[11px] text-slate-400">Pantau progres kosakata & fokus {childName}</p>
                </div>
              </div>

              <div className="mt-4 mb-4">
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-500">Target Minggu Ini</span>
                  <span className="text-cyan-500 font-bold">0 / 15 Kosakata Baru</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full w-[10%]" />
                </div>
                <p className="text-[10px] text-slate-400 mt-1.5">
                  Laporan otomatis terkirim tiap hari Minggu ke email Ayah/Bunda.
                </p>
              </div>

              <button
                onClick={() => {
                  sfx.playTap();
                  onOpenReport();
                }}
                className={`w-full py-2.5 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  isDarkMode ? 'bg-[#1E293B] border-slate-700 hover:bg-[#2A374F] text-cyan-400' : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-cyan-600'
                }`}
              >
                <span>Buka Laporan Orang Tua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Rincian Pembayaran Card */}
            <div className={`p-6 rounded-3xl border shadow-xs ${
              isDarkMode ? 'bg-[#111827] border-[#334155]' : 'bg-white border-stone-200'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
                <h4 className="text-sm font-extrabold flex items-center gap-1.5 text-slate-900 dark:text-white">
                  <span>🧾</span>
                  <span>Rincian Pembayaran</span>
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  Lunas
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Yunma Kata Ajaib (Lisensi Seumur Hidup)</span>
                  <span className="font-semibold text-slate-800 dark:text-white">Rp 39.000</span>
                </div>
                <div className="flex justify-between text-rose-500">
                  <span>Kupon YUNMAJUARA (-20%)</span>
                  <span>-Rp 7.800</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Biaya Layanan Gerbang QRIS</span>
                  <span className="text-emerald-500 font-bold">GRATIS</span>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between font-bold text-sm">
                  <span className="text-slate-900 dark:text-white">Total Terbayar</span>
                  <span className="text-slate-950 dark:text-white text-base font-black">Rp 31.200</span>
                </div>

                <div className="pt-2 text-[11px] text-slate-400 space-y-0.5">
                  <div>Metode: QRIS Bank / E-Wallet Instan</div>
                  <div>Waktu: 02 November 2026, 14:22 WIB</div>
                  <div>Lisensi: Akses Selamanya (Free Updates)</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <button
                  onClick={() => handleDownload('Invoice PDF')}
                  className="py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold flex items-center justify-center gap-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh PDF</span>
                </button>
                <a
                  href={`https://wa.me/?text=Hai%2C%20berikut%20bukti%20akses%20game%20Yunma%20untuk%20Aisyah%3A%20PIN%204920`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-3 rounded-xl border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center gap-1 hover:bg-emerald-500/10 text-center"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Kirim ke WA</span>
                </a>
              </div>
            </div>

            {/* Customer Success Box */}
            <div className={`p-6 rounded-3xl border shadow-xs text-center space-y-3 ${
              isDarkMode ? 'bg-[#111827] border-[#334155]' : 'bg-white border-stone-200'
            }`}>
              <div className="text-2xl">🎧</div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                PERLU BANTUAN TEKNIS?
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Tim edukator dan customer success Yunma siap mendampingi Ayah & Bunda 24 jam bila ada kendala audio atau perangkat.
              </p>

              <div className="space-y-2 pt-1">
                <a
                  href="https://wa.me/6281234567890?text=Halo%20CS%20Yunma%2C%20saya%20sudah%20membeli%20akses%20game"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-full font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat WhatsApp CS Yunma (Balas Cepat)</span>
                </a>

                <a
                  href="https://chat.whatsapp.com"
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-2.5 px-4 rounded-full font-bold text-xs border flex items-center justify-center gap-2 transition-all ${
                    isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-stone-300 text-slate-700 hover:bg-stone-100'
                  }`}
                >
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>Gabung Grup WhatsApp Bunda Cerdas</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center pt-8 pb-4">
          <button
            onClick={() => {
              sfx.playTap();
              onBackToHome();
            }}
            className="text-xs font-bold text-slate-400 hover:text-cyan-500 underline decoration-dotted"
          >
            ← Kembali ke Katalog Utama Yunma
          </button>
        </div>
      </div>
    </div>
  );
};
