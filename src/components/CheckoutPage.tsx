import React, { useState, useEffect } from 'react';
import { ArrowLeft, Moon, Sun, Check, Clock, ShieldCheck, Zap, Lock, MessageCircle, Info, ChevronDown, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { OrderState, CartItem } from '../types';
import { FORMAT_IDR } from '../data/mockData';
import { sfx } from '../utils/audio';

interface Props {
  cartItems: CartItem[];
  orderState: OrderState;
  onUpdateOrderState: (updates: Partial<OrderState>) => void;
  onBackToHome: () => void;
  onPaymentSuccess: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const CheckoutPage: React.FC<Props> = ({
  cartItems,
  orderState,
  onUpdateOrderState,
  onBackToHome,
  onPaymentSuccess,
  isDarkMode,
  onToggleTheme
}) => {
  const [countdownMinutes, setCountdownMinutes] = useState<number>(9);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(18);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [promoInput, setPromoInput] = useState<string>(orderState.appliedPromo || 'YUNMAJUARA');
  const [promoApplied, setPromoApplied] = useState<boolean>(true);

  // QRIS Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds(prevSec => {
        if (prevSec > 0) return prevSec - 1;
        setCountdownMinutes(prevMin => (prevMin > 0 ? prevMin - 1 : 0));
        return 59;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate pricing
  const baseItem = cartItems[0]?.game || {
    id: 'kata-ajaib',
    title: 'Yunma Kata Ajaib: Petualangan Membaca',
    price: 39000,
    originalPrice: 79000,
    age: 'Usia 4-8 Th'
  };

  const bundleAddonPrice = 25000;
  const subtotal = baseItem.price + (orderState.bundleAddonSelected ? bundleAddonPrice : 0);

  // 20% discount if YUNMAJUARA is active
  const discountAmount = promoApplied ? Math.round(subtotal * 0.2) : 0;
  const cashbackWalletBalance = 15680;
  const cashbackDeduction = orderState.useCashbackWallet ? cashbackWalletBalance : 0;

  const totalFinal = Math.max(0, subtotal - discountAmount - cashbackDeduction);
  const cashbackEarned = Math.round((subtotal - discountAmount) * 0.1);

  const handleSimulatePayment = () => {
    sfx.playFanfare();
    setIsVerifying(true);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setIsVerifying(false);
      onPaymentSuccess();
    }, 1200);
  };

  const handleApplyPromo = () => {
    sfx.playTap();
    if (promoInput.trim().toUpperCase() === 'YUNMAJUARA') {
      setPromoApplied(true);
      onUpdateOrderState({ appliedPromo: 'YUNMAJUARA' });
      sfx.playCorrect();
    } else {
      setPromoApplied(true);
      onUpdateOrderState({ appliedPromo: promoInput.toUpperCase() });
      sfx.playCorrect();
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-[#0B0F19] text-[#DCE2F7]' : 'bg-[#FAF7F2] text-slate-800'
    }`}>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 text-white text-xs sm:text-sm font-semibold py-2 px-4 text-center flex items-center justify-center gap-2">
        <span>✨ Promo Libur Pintar: Gunakan kode <strong className="underline uppercase">YUNMAJUARA</strong> untuk diskon 20% & dapatkan 10% cashback instan!</span>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Header bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              sfx.playTap();
              onBackToHome();
            }}
            className={`flex items-center gap-2 p-2 rounded-full transition-colors cursor-pointer ${
              isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-stone-200 text-slate-700'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline font-bold text-sm">Kembali</span>
          </button>

          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Checkout & Bayar</h1>
            <p className="text-xs text-emerald-500 font-semibold flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Sesi Aman 256-Bit
            </p>
          </div>

          <button
            onClick={() => {
              sfx.playTap();
              onToggleTheme();
            }}
            className={`p-2.5 rounded-full transition-colors cursor-pointer ${
              isDarkMode ? 'bg-[#1E293B] text-amber-300 hover:bg-[#2A374F]' : 'bg-white text-slate-700 hover:bg-stone-100 shadow-xs'
            }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* 3-Step Wizard Progress Bar */}
        <div className={`p-4 rounded-2xl mb-8 border flex items-center justify-between text-xs sm:text-sm font-bold ${
          isDarkMode ? 'bg-[#111827] border-[#334155]' : 'bg-white border-stone-200 shadow-xs'
        }`}>
          {/* Step 1: Keranjang */}
          <div className="flex items-center gap-2 text-emerald-500">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span>Keranjang</span>
          </div>

          <div className="flex-1 mx-3 sm:mx-6 h-0.5 bg-emerald-500/40 rounded-full" />

          {/* Step 2: Data & Bayar */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#FF6B6B] text-white flex items-center justify-center font-bold text-xs shadow-md">
              2
            </div>
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white">Data & Pembayaran</span>
              <span className="block text-[10px] text-[#FF6B6B] font-bold uppercase tracking-wider">SEDANG DIISI</span>
            </div>
          </div>

          <div className="flex-1 mx-3 sm:mx-6 h-0.5 bg-slate-300 dark:bg-slate-700 rounded-full" />

          {/* Step 3: Akses Langsung */}
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <span className="hidden sm:inline">Akses Langsung</span>
          </div>
        </div>

        {/* Two-column Layout: Left Form + Right Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Forms & Payment) - 7 cols */}
          <div className="lg:col-span-7 space-y-6">
            {/* Form Card 1: Informasi Orang Tua & Profil Anak */}
            <div className={`p-5 sm:p-6 rounded-2xl border ${
              isDarkMode ? 'bg-[#111827] border-[#334155]' : 'bg-white border-stone-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👨‍👩‍👧</span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold leading-tight">
                      Informasi Orang Tua & Profil Anak
                    </h2>
                    <p className="text-xs text-slate-400">Akses akun game dan invoice resmi dikirimkan langsung ke kontak ini</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                  Kirim Instan &lt; 1 Menit
                </span>
              </div>

              <div className="space-y-4">
                {/* Nama Orang Tua */}
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                    Nama Lengkap Orang Tua <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={orderState.parentName}
                    onChange={e => onUpdateOrderState({ parentName: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl text-sm font-semibold border outline-none transition-all ${
                      isDarkMode
                        ? 'bg-[#0B0F19] border-slate-700 text-white focus:border-cyan-400'
                        : 'bg-[#F8FAFC] border-stone-300 text-slate-900 focus:border-cyan-600'
                    }`}
                  />
                </div>

                {/* Email Aktif */}
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                    Alamat Email Aktif <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={orderState.email}
                      onChange={e => onUpdateOrderState({ email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl text-sm font-semibold border outline-none pr-28 transition-all ${
                        isDarkMode
                          ? 'bg-[#0B0F19] border-slate-700 text-white focus:border-cyan-400'
                          : 'bg-[#F8FAFC] border-stone-300 text-slate-900 focus:border-cyan-600'
                      }`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      Terverifikasi
                    </span>
                  </div>
                </div>

                {/* Nomor WhatsApp */}
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                    Nomor WhatsApp Aktif <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex">
                    <span className={`inline-flex items-center px-3.5 rounded-l-xl border-y border-l text-xs font-bold ${
                      isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-stone-100 border-stone-300 text-slate-700'
                    }`}>
                      +62
                    </span>
                    <input
                      type="text"
                      value={orderState.whatsapp.replace('+62', '').trim()}
                      onChange={e => onUpdateOrderState({ whatsapp: `+62 ${e.target.value.replace(/^(\+62|0)/, '')}` })}
                      className={`flex-1 px-4 py-3 rounded-r-xl text-sm font-semibold border outline-none transition-all ${
                        isDarkMode
                          ? 'bg-[#0B0F19] border-slate-700 text-white focus:border-cyan-400'
                          : 'bg-[#F8FAFC] border-stone-300 text-slate-900 focus:border-cyan-600'
                      }`}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Cadangan kode aktivasi via WhatsApp Bot Yunma
                  </p>
                </div>

                {/* Profil Anak: Nama & Usia */}
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                    Profil Anak (Pemain Game)
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    <input
                      type="text"
                      placeholder="Nama Anak"
                      value={orderState.childName}
                      onChange={e => onUpdateOrderState({ childName: e.target.value })}
                      className={`col-span-2 px-4 py-3 rounded-xl text-sm font-semibold border outline-none transition-all ${
                        isDarkMode
                          ? 'bg-[#0B0F19] border-slate-700 text-white focus:border-cyan-400'
                          : 'bg-[#F8FAFC] border-stone-300 text-slate-900 focus:border-cyan-600'
                      }`}
                    />
                    <div className="relative">
                      <select
                        value={orderState.childAge}
                        onChange={e => onUpdateOrderState({ childAge: e.target.value })}
                        className={`w-full px-3 py-3 rounded-xl text-sm font-semibold border appearance-none outline-none cursor-pointer transition-all ${
                          isDarkMode
                            ? 'bg-[#0B0F19] border-slate-700 text-white focus:border-cyan-400'
                            : 'bg-[#F8FAFC] border-stone-300 text-slate-900 focus:border-cyan-600'
                        }`}
                      >
                        {['4 Th', '5 Th', '6 Th', '7 Th', '8 Th', '9 Th', '10 Th', '11 Th', '12 Th'].map(age => (
                          <option key={age} value={age} className="bg-slate-900 text-white">
                            {age}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Tingkat kesulitan modul game akan disesuaikan otomatis
                  </p>
                </div>
              </div>
            </div>

            {/* Form Card 2: Metode Pembayaran */}
            <div className={`p-5 sm:p-6 rounded-2xl border ${
              isDarkMode ? 'bg-[#111827] border-[#334155]' : 'bg-white border-stone-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💳</span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold leading-tight">
                      Pilih Metode Pembayaran
                    </h2>
                    <p className="text-xs text-slate-400">Konfirmasi otomatis tanpa perlu upload struk transfer</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 shrink-0 flex items-center gap-1">
                  ⚡ Verifikasi Real-Time
                </span>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-slate-100 dark:bg-[#1E293B] mb-5 text-xs font-bold">
                {[
                  { id: 'qris', label: 'QRIS Instan', badge: 'Paling Cepat' },
                  { id: 'ewallet', label: 'E-Wallet', badge: '' },
                  { id: 'va', label: 'Virtual Account', badge: '' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      sfx.playTap();
                      onUpdateOrderState({ paymentMethod: tab.id as any });
                    }}
                    className={`py-2.5 px-2 rounded-lg transition-all flex flex-col items-center justify-center cursor-pointer ${
                      orderState.paymentMethod === tab.id
                        ? isDarkMode
                          ? 'bg-[#0B0F19] text-white shadow-md border border-slate-700'
                          : 'bg-white text-slate-900 shadow-xs border border-stone-200'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span className="text-[9px] text-emerald-500 font-extrabold">{tab.badge}</span>
                    )}
                  </button>
                ))}
              </div>

              {/* QRIS View */}
              {orderState.paymentMethod === 'qris' && (
                <div className="p-5 sm:p-7 rounded-2xl bg-[#0F172A] text-white flex flex-col items-center text-center border border-slate-800 shadow-inner">
                  {/* Countdown Header */}
                  <div className="flex items-center justify-between w-full mb-5 text-xs">
                    <span className="font-extrabold tracking-wider text-slate-400 uppercase text-[11px]">
                      BATAS WAKTU BAYAR
                    </span>
                    <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 font-mono font-bold flex items-center gap-1.5 border border-rose-500/30">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                      {countdownMinutes < 10 ? `0${countdownMinutes}` : countdownMinutes}:
                      {countdownSeconds < 10 ? `0${countdownSeconds}` : countdownSeconds}
                    </span>
                  </div>

                  {/* QR Code Container (Pure white for 100% scan clarity as in design spec) */}
                  <div className="p-4 sm:p-5 bg-white rounded-2xl shadow-xl w-60 sm:w-64 max-w-full text-slate-900 border-2 border-cyan-400/30">
                    <div className="flex items-center justify-between border-b pb-2 mb-3">
                      <span className="font-black text-rose-600 tracking-tight text-sm">QRIS</span>
                      <span className="text-[10px] font-bold text-slate-500">GPN BERSAMA</span>
                    </div>

                    {/* Stylized high-contrast QR visual matching the screenshot */}
                    <div className="aspect-square w-full bg-stone-50 rounded-xl p-3 flex flex-col items-center justify-center relative border border-slate-200">
                      {/* Realistic SVG representation of the QR pattern */}
                      <svg viewBox="0 0 100 100" className="w-full h-full fill-slate-900">
                        {/* Corner markers */}
                        <rect x="5" y="5" width="28" height="28" rx="4" fill="black" />
                        <rect x="9" y="9" width="20" height="20" rx="2" fill="white" />
                        <rect x="13" y="13" width="12" height="12" rx="1" fill="black" />

                        <rect x="67" y="5" width="28" height="28" rx="4" fill="black" />
                        <rect x="71" y="9" width="20" height="20" rx="2" fill="white" />
                        <rect x="75" y="13" width="12" height="12" rx="1" fill="black" />

                        <rect x="5" y="67" width="28" height="28" rx="4" fill="black" />
                        <rect x="9" y="71" width="20" height="20" rx="2" fill="white" />
                        <rect x="13" y="75" width="12" height="12" rx="1" fill="black" />

                        {/* Center dot in orange/red accent as in screen_47314c21.png */}
                        <rect x="44" y="44" width="12" height="12" rx="2" fill="#FF6B6B" />

                        {/* Data dots */}
                        <rect x="38" y="10" width="8" height="8" rx="1" fill="black" />
                        <rect x="50" y="10" width="8" height="8" rx="1" fill="black" />
                        <rect x="38" y="24" width="8" height="8" rx="1" fill="black" />
                        <rect x="50" y="24" width="8" height="8" rx="1" fill="black" />

                        <rect x="10" y="38" width="8" height="8" rx="1" fill="black" />
                        <rect x="24" y="38" width="8" height="8" rx="1" fill="black" />
                        <rect x="68" y="38" width="8" height="8" rx="1" fill="black" />
                        <rect x="82" y="38" width="8" height="8" rx="1" fill="black" />

                        <rect x="38" y="68" width="8" height="8" rx="1" fill="black" />
                        <rect x="50" y="68" width="8" height="8" rx="1" fill="black" />
                        <rect x="68" y="52" width="8" height="8" rx="1" fill="black" />
                        <rect x="82" y="68" width="8" height="8" rx="1" fill="black" />
                        <rect x="68" y="82" width="8" height="8" rx="1" fill="black" />
                        <rect x="52" y="82" width="8" height="8" rx="1" fill="black" />
                      </svg>
                    </div>

                    <div className="mt-3 text-[10px] font-mono tracking-wider text-slate-500 font-bold">
                      NMID: ID102026YUNMA99
                    </div>
                  </div>

                  {/* Instructions */}
                  <h3 className="text-base font-extrabold text-white mt-5">
                    Scan dengan Aplikasi Apapun
                  </h3>
                  <p className="text-xs text-slate-300 max-w-sm mt-1 mb-4 leading-relaxed">
                    Screenshot kode QR ini lalu upload/scan di GoPay, OVO, Dana, ShopeePay, BCA atau m-Banking Anda, lalu arahkan kamera ke kode QR.
                  </p>

                  {/* Payment partner chips */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 mb-5">
                    {['GoPay', 'OVO', 'Dana', 'ShopeePay', 'BCA Mobile', "Livin' Mandiri"].map(app => (
                      <span key={app} className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {app}
                      </span>
                    ))}
                  </div>

                  {/* Immediate Simulation Button */}
                  <button
                    onClick={handleSimulatePayment}
                    disabled={isVerifying}
                    className="w-full max-w-xs py-3 px-6 rounded-full font-bold text-sm bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>{isVerifying ? 'Memverifikasi Transaksi...' : '✓ Simulasi Sudah Bayar'}</span>
                  </button>
                  <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Status dicek otomatis tiap 5 detik
                  </p>
                </div>
              )}

              {/* E-Wallet View */}
              {orderState.paymentMethod === 'ewallet' && (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Pilih aplikasi dompet digital favorit Anda:
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { id: 'gopay', name: 'GoPay', color: 'text-emerald-500' },
                      { id: 'ovo', name: 'OVO', color: 'text-purple-500' },
                      { id: 'dana', name: 'DANA', color: 'text-sky-500' },
                      { id: 'shopeepay', name: 'ShopeePay', color: 'text-orange-500' }
                    ].map(ew => (
                      <button
                        key={ew.id}
                        onClick={() => {
                          sfx.playTap();
                          onUpdateOrderState({ ewalletProvider: ew.id as any });
                        }}
                        className={`p-3 rounded-xl border font-bold text-sm flex items-center justify-between cursor-pointer transition-all ${
                          orderState.ewalletProvider === ew.id
                            ? 'border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
                            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className={ew.color}>{ew.name}</span>
                        {orderState.ewalletProvider === ew.id && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleSimulatePayment}
                    className="w-full py-3 rounded-full bg-emerald-500 text-slate-950 font-bold text-sm mt-3 hover:bg-emerald-400 cursor-pointer"
                  >
                    Buka Aplikasi {orderState.ewalletProvider.toUpperCase()} & Bayar
                  </button>
                </div>
              )}

              {/* VA View */}
              {orderState.paymentMethod === 'va' && (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Pilih bank penerbit Virtual Account:
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {['bca', 'mandiri', 'bni', 'bri'].map(bank => (
                      <button
                        key={bank}
                        onClick={() => {
                          sfx.playTap();
                          onUpdateOrderState({ vaBank: bank as any });
                        }}
                        className={`p-3 rounded-xl border font-bold text-sm uppercase flex items-center justify-between cursor-pointer transition-all ${
                          orderState.vaBank === bank
                            ? 'border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
                            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span>Bank {bank}</span>
                        {orderState.vaBank === bank && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                      Nomor Virtual Account
                    </span>
                    <div className="text-lg font-mono font-bold text-cyan-600 dark:text-cyan-400">
                      89201 0812 3456 7890
                    </div>
                  </div>

                  <button
                    onClick={handleSimulatePayment}
                    className="w-full py-3 rounded-full bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 cursor-pointer"
                  >
                    ✓ Saya Sudah Transfer VA
                  </button>
                </div>
              )}
            </div>

            {/* Three Value Trust Badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className={`p-3.5 rounded-2xl border text-center ${
                isDarkMode ? 'bg-[#111827] border-[#334155]' : 'bg-white border-stone-200 shadow-xs'
              }`}>
                <div className="text-xl mb-1">🛡️</div>
                <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  Aman 100% Untuk Anak
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Bebas iklan, tanpa konten berbahaya, aman ditatap mandiri.
                </div>
              </div>

              <div className={`p-3.5 rounded-2xl border text-center ${
                isDarkMode ? 'bg-[#111827] border-[#334155]' : 'bg-white border-stone-200 shadow-xs'
              }`}>
                <div className="text-xl mb-1">⚡</div>
                <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  Akses Instan 1 Menit
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Lisensi digital & panduan main langsung aktif otomatis di browser.
                </div>
              </div>

              <div className={`p-3.5 rounded-2xl border text-center ${
                isDarkMode ? 'bg-[#111827] border-[#334155]' : 'bg-white border-stone-200 shadow-xs'
              }`}>
                <div className="text-xl mb-1">🔒</div>
                <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  Enkripsi 256-bit
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Transaksi dilindungi standar keamanan Bank Indonesia & PCI-DSS.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Order Summary & Actions) - 5 cols */}
          <div className="lg:col-span-5 space-y-5">
            <div className={`p-5 sm:p-6 rounded-2xl border ${
              isDarkMode ? 'bg-[#111827] border-[#334155]' : 'bg-white border-stone-200 shadow-xs'
            }`}>
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Ringkasan Pesanan
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  1 Game Utama
                </span>
              </div>

              {/* Main Game Card */}
              <div className="flex gap-3.5 items-center py-4 border-b border-slate-200 dark:border-slate-800">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center text-white font-black text-2xl shrink-0 shadow-md">
                  ABC
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {baseItem.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {baseItem.age} • Lisensi Selamanya
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                      {FORMAT_IDR(baseItem.price)}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      {FORMAT_IDR(baseItem.originalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bundling Upsell Offer */}
              <div className="my-4 p-3.5 rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-50/70 dark:bg-amber-950/20">
                <div className="flex items-center justify-between text-[11px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-2">
                  <span className="flex items-center gap-1">
                    🌟 PENAWARAN BUNDLING HEMAT
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px]">
                    Hemat 45%
                  </span>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={orderState.bundleAddonSelected}
                    onChange={e => {
                      sfx.playTap();
                      onUpdateOrderState({ bundleAddonSelected: e.target.checked });
                    }}
                    className="mt-1 w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      Yunma Math Quest (Berhitung)
                    </span>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                        +{FORMAT_IDR(bundleAddonPrice)}
                      </span>
                      <span className="text-slate-400 line-through text-[11px]">
                        Rp 45.000
                      </span>
                    </div>
                  </div>
                </label>
              </div>

              {/* Promo Coupon Box */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <span>🏷️ KUPON PROMO YUNMA</span>
                  <span className="text-emerald-500 font-extrabold">HEMAT 20%</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={e => setPromoInput(e.target.value.toUpperCase())}
                    className={`flex-1 px-3.5 py-2 rounded-xl text-sm font-bold border uppercase tracking-wider outline-none ${
                      isDarkMode ? 'bg-[#0B0F19] border-slate-700 text-white' : 'bg-stone-50 border-stone-300 text-slate-900'
                    }`}
                  />
                  <button
                    onClick={handleApplyPromo}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                      isDarkMode
                        ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-md'
                        : 'bg-[#191F2F] hover:bg-slate-800 text-white'
                    }`}
                  >
                    Pakai
                  </button>
                </div>

                {promoApplied && (
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Kupon {promoInput} aktif (Diskon 20%)
                  </p>
                )}
              </div>

              {/* Dompet Cashback Yunma Switch */}
              <div className={`p-3.5 rounded-xl border flex items-center justify-between mb-4 ${
                isDarkMode ? 'bg-[#1E293B] border-[#334155]' : 'bg-stone-50 border-stone-200'
              }`}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-sm shadow-xs">
                    👛
                  </div>
                  <div>
                    <span className="text-xs font-bold block text-slate-900 dark:text-white">
                      Dompet Cashback Yunma
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Saldo: <strong className="text-emerald-500 font-bold">{FORMAT_IDR(cashbackWalletBalance)}</strong>
                    </span>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={orderState.useCashbackWallet}
                    onChange={e => {
                      sfx.playTap();
                      onUpdateOrderState({ useCashbackWallet: e.target.checked });
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 dark:bg-slate-700"></div>
                </label>
              </div>
              <p className="text-[10px] text-slate-400 -mt-2 mb-4">
                Aktifkan untuk memotong sisa tagihan langsung dari saldo akun Anda.
              </p>

              {/* Price Calculation Lines */}
              <div className="space-y-2.5 text-xs sm:text-sm font-medium pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal Item</span>
                  <span className="font-bold text-slate-900 dark:text-white">{FORMAT_IDR(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-rose-500 font-semibold">
                    <span>🎟️ Diskon Voucher</span>
                    <span>-{FORMAT_IDR(discountAmount)}</span>
                  </div>
                )}

                {orderState.useCashbackWallet && (
                  <div className="flex justify-between text-emerald-500 font-semibold">
                    <span>👛 Saldo Dompet Dipotong</span>
                    <span>-{FORMAT_IDR(cashbackDeduction)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Biaya Layanan & Server</span>
                  <span className="text-emerald-500 font-bold">GRATIS (Rp 0)</span>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white block">
                      Total Akhir
                    </span>
                    <span className="text-[11px] text-emerald-500 font-bold flex items-center gap-1">
                      ✨ +{FORMAT_IDR(cashbackEarned)} cashback masuk dompet
                    </span>
                  </div>
                  <span className="text-2xl font-black text-slate-950 dark:text-white">
                    {FORMAT_IDR(totalFinal)}
                  </span>
                </div>
              </div>

              {/* Huge Action Button */}
              <button
                onClick={handleSimulatePayment}
                className="w-full mt-5 py-4 px-6 rounded-2xl text-white font-black text-sm tracking-wide shadow-xl active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 via-indigo-600 to-cyan-600 hover:brightness-105"
              >
                <Lock className="w-4 h-4" />
                <span>Bayar Sekarang via QRIS ({FORMAT_IDR(totalFinal)})</span>
              </button>

              {/* Support & Guarantee */}
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
                <a
                  href="https://wa.me/6281234567890?text=Halo%20CS%20Yunma%2C%20saya%20butuh%20bantuan%20checkout"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-emerald-500/10 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Butuh Bantuan? WhatsApp CS Kami (24/7)</span>
                </a>
                <p className="text-[10px] text-slate-400 mt-2">
                  Garansi 100% uang kembali jika akses game terkendala teknis.
                </p>
              </div>
            </div>

            {/* Social Trust Proof */}
            <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
              isDarkMode ? 'bg-[#111827] border-[#334155]' : 'bg-white border-stone-200 shadow-xs'
            }`}>
              <div className="flex -space-x-2 shrink-0">
                <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-900 font-bold text-xs flex items-center justify-center border-2 border-white dark:border-slate-900">
                  B
                </span>
                <span className="w-7 h-7 rounded-full bg-cyan-500 text-slate-900 font-bold text-xs flex items-center justify-center border-2 border-white dark:border-slate-900">
                  S
                </span>
                <span className="w-7 h-7 rounded-full bg-rose-500 text-white font-bold text-xs flex items-center justify-center border-2 border-white dark:border-slate-900">
                  M
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Telah dipercaya oleh <strong className="text-slate-800 dark:text-white">12.400+ orang tua & guru</strong> TK/SD di seluruh Indonesia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
