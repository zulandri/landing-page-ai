import React, { useState } from 'react';
import { Search, Wallet, CheckCircle, ArrowRight } from 'lucide-react';
import { MOCK_CASHBACK_DATA, FORMAT_IDR } from '../data/mockData';
import { sfx } from '../utils/audio';

interface Props {
  isDarkMode: boolean;
  defaultEmail?: string;
}

export const CashbackSection: React.FC<Props> = ({
  isDarkMode,
  defaultEmail = 'zulandri40@gmail.com'
}) => {
  const [emailInput, setEmailInput] = useState<string>(defaultEmail);
  const [queriedEmail, setQueriedEmail] = useState<string>(defaultEmail);
  const [cashbackData, setCashbackData] = useState(
    MOCK_CASHBACK_DATA[defaultEmail] || {
      total: 15680,
      history: [
        { orderId: '#e5818b34', date: '2026-11-01', amount: 7840 },
        { orderId: '#e810ea00', date: '2026-11-01', amount: 3920 },
        { orderId: '#0af94a11', date: '2026-11-01', amount: 3920 }
      ]
    }
  );

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    sfx.playCorrect();
    const clean = emailInput.trim().toLowerCase();
    setQueriedEmail(clean);

    if (MOCK_CASHBACK_DATA[clean]) {
      setCashbackData(MOCK_CASHBACK_DATA[clean]);
    } else {
      // Dynamic fallback for any entered email
      setCashbackData({
        total: 15680,
        history: [
          { orderId: '#e5818b34', date: '2026-11-01', amount: 7840 },
          { orderId: '#e810ea00', date: '2026-11-01', amount: 3920 },
          { orderId: '#0af94a11', date: '2026-11-01', amount: 3920 }
        ]
      });
    }
  };

  return (
    <section id="cashback" className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className={`p-6 sm:p-10 rounded-3xl border transition-all ${
            isDarkMode
              ? 'bg-[#111827] border-[#334155]'
              : 'bg-white border-stone-200 shadow-md'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Form & Explanations */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-widest">
                <Wallet className="w-4 h-4" />
                <span>DOMPET CASHBACK</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Cek cashback{' '}
                <span className="inline-block">
                  <span className="text-[#FF6B6B]">ka</span>
                  <span className="text-[#06B6D4]">mu</span>
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Masukkan email yang kamu pakai saat checkout untuk melihat saldo cashback dan riwayatnya. Cashback bisa dipakai untuk pembelian berikutnya.
              </p>

              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <input
                  type="email"
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  placeholder="nama@email.com"
                  className={`flex-1 px-4 py-3 rounded-2xl text-sm font-semibold border outline-none transition-all ${
                    isDarkMode
                      ? 'bg-[#0B0F19] border-slate-700 text-white focus:border-cyan-400'
                      : 'bg-slate-50 border-stone-300 text-slate-900 focus:border-emerald-500'
                  }`}
                  required
                />

                <button
                  type="submit"
                  className="py-3 px-6 rounded-2xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer shrink-0"
                >
                  <Search className="w-4 h-4 stroke-[2.5]" />
                  <span>Cek Cashback</span>
                </button>
              </form>
            </div>

            {/* Right Column: Cashback Balance & Order History Result */}
            <div className="lg:col-span-5">
              <div
                className={`p-6 rounded-2xl border ${
                  isDarkMode
                    ? 'bg-[#141B2B] border-[#334155]'
                    : 'bg-stone-50 border-stone-200/90'
                }`}
              >
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  TOTAL CASHBACK
                </div>

                {/* Big Accent Amount */}
                <div className="text-3xl sm:text-4xl font-black tracking-tight my-2">
                  <span className="text-[#FF6B6B]">Rp </span>
                  <span className="text-[#F59E0B]">{cashbackData.total.toLocaleString('id-ID').slice(0, 2)}.</span>
                  <span className="text-[#06B6D4]">{cashbackData.total.toLocaleString('id-ID').slice(3)}</span>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 my-4" />

                {/* Breakdown List */}
                <div className="space-y-2.5">
                  {cashbackData.history.map(item => (
                    <div
                      key={item.orderId}
                      className="flex items-center justify-between text-xs sm:text-sm font-medium"
                    >
                      <span className="text-slate-500 dark:text-slate-400 font-mono">
                        Pesanan {item.orderId} · {item.date}
                      </span>
                      <span className="font-extrabold text-emerald-500 font-mono">
                        +{FORMAT_IDR(item.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
