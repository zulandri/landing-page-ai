import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Tag, Check, ArrowRight } from 'lucide-react';
import { CartItem, Game } from '../types';
import { FORMAT_IDR } from '../data/mockData';
import { sfx } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (gameId: string, delta: number) => void;
  onRemoveItem: (gameId: string) => void;
  appliedPromo: string;
  onApplyPromo: (code: string) => void;
  onProceedToCheckout: () => void;
  isDarkMode: boolean;
}

export const CartDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  appliedPromo,
  onApplyPromo,
  onProceedToCheckout,
  isDarkMode
}) => {
  const [promoInput, setPromoInput] = useState<string>(appliedPromo || 'YUNMAJUARA');
  const [promoMessage, setPromoMessage] = useState<string>(
    appliedPromo ? `Promo ${appliedPromo} diterapkan!` : 'Promo YUNMAJUARA diterapkan!'
  );

  if (!isOpen) return null;

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.game.price * item.quantity, 0);

  // 20% discount if YUNMAJUARA is active
  const discountAmount = appliedPromo.toUpperCase() === 'YUNMAJUARA' ? Math.round(subtotal * 0.2) : 0;
  const total = Math.max(0, subtotal - discountAmount);
  const cashbackNanti = Math.round(total * 0.1);

  const handleApplyPromoCode = () => {
    sfx.playTap();
    if (!promoInput.trim()) return;
    const clean = promoInput.trim().toUpperCase();
    onApplyPromo(clean);
    if (clean === 'YUNMAJUARA') {
      setPromoMessage('Promo YUNMAJUARA diterapkan! (Diskon 20%)');
      sfx.playCorrect();
    } else if (clean === 'SUPER50') {
      setPromoMessage('Promo SUPER50 diterapkan!');
      sfx.playCorrect();
    } else if (clean === 'RAINBOW15') {
      setPromoMessage('Promo RAINBOW15 diterapkan!');
      sfx.playCorrect();
    } else {
      setPromoMessage(`Kupon ${clean} berhasil dipasang!`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className={`w-screen max-w-md flex flex-col shadow-2xl transition-all duration-300 ${
            isDarkMode ? 'bg-[#0C1322] text-[#DCE2F7] border-l border-[#334155]' : 'bg-[#FAF7F2] text-slate-800'
          }`}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between px-6 py-5 border-b ${
              isDarkMode ? 'border-[#334155] bg-[#111827]' : 'border-stone-200 bg-[#FDFBF7]'
            }`}
          >
            <h2 className="text-xl font-extrabold tracking-tight">
              Keranjang Kamu ({totalQuantity})
            </h2>
            <button
              onClick={() => {
                sfx.playTap();
                onClose();
              }}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-4xl block mb-2">🛒</span>
                <p className="text-sm text-slate-500 font-medium">Keranjang kamu masih kosong.</p>
              </div>
            ) : (
              items.map(item => (
                <div
                  key={item.game.id}
                  className={`p-4 rounded-2xl border flex gap-3.5 items-center transition-all ${
                    isDarkMode
                      ? 'bg-[#141B2B] border-[#334155]'
                      : 'bg-white border-stone-200/80 shadow-xs'
                  }`}
                >
                  {/* Thumbnail */}
                  <div
                    className={`w-20 h-20 rounded-xl overflow-hidden shrink-0 flex items-center justify-center text-3xl font-black text-white bg-gradient-to-tr ${item.game.gradient}`}
                  >
                    {item.game.id === 'kata-ajaib' ? 'ABC' : item.game.id === 'math-quest' ? '123' : item.game.id === 'space-coder' ? '🚀' : '🦖'}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold leading-tight truncate text-slate-900 dark:text-white">
                      {item.game.title}
                    </h3>
                    <div className="text-sm font-bold text-cyan-600 dark:text-cyan-400 mt-1">
                      {FORMAT_IDR(item.game.price)}
                    </div>

                    {/* Stepper & Trash */}
                    <div className="flex items-center gap-3 mt-2.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            sfx.playTap();
                            onUpdateQuantity(item.game.id, -1);
                          }}
                          className={`w-7 h-7 rounded-full flex items-center justify-center border font-bold text-xs transition-colors cursor-pointer ${
                            isDarkMode
                              ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-white'
                              : 'border-stone-300 bg-stone-100 hover:bg-stone-200 text-stone-700'
                          }`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-bold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            sfx.playTap();
                            onUpdateQuantity(item.game.id, 1);
                          }}
                          className={`w-7 h-7 rounded-full flex items-center justify-center border font-bold text-xs transition-colors cursor-pointer ${
                            isDarkMode
                              ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-white'
                              : 'border-stone-300 bg-stone-100 hover:bg-stone-200 text-stone-700'
                          }`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          sfx.playTap();
                          onRemoveItem(item.game.id);
                        }}
                        className="ml-auto text-slate-400 hover:text-rose-500 transition-colors p-1"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Promo Code Box with dashed perimeter */}
            {items.length > 0 && (
              <div
                className={`p-4 rounded-2xl border-2 border-dashed ${
                  isDarkMode
                    ? 'border-[#334155] bg-[#141B2B]/60'
                    : 'border-stone-300 bg-white/70'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>KODE PROMO</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={e => setPromoInput(e.target.value.toUpperCase())}
                    placeholder="Masukkan kode promo"
                    className={`flex-1 px-3.5 py-2 rounded-xl text-sm font-bold border uppercase tracking-wider outline-none transition-all ${
                      isDarkMode
                        ? 'bg-[#0B0F19] border-slate-700 text-white focus:border-cyan-400'
                        : 'bg-[#FDFBF7] border-stone-300 text-slate-900 focus:border-slate-800'
                    }`}
                  />
                  <button
                    onClick={handleApplyPromoCode}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                      isDarkMode
                        ? 'bg-[#1E293B] hover:bg-[#2E3A52] text-white border border-slate-700'
                        : 'bg-[#191F2F] hover:bg-slate-800 text-white'
                    }`}
                  >
                    Pakai
                  </button>
                </div>

                {promoMessage && (
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    {promoMessage}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Sticky Cart Footer Calculations */}
          {items.length > 0 && (
            <div
              className={`p-6 border-t space-y-3 ${
                isDarkMode ? 'border-[#334155] bg-[#111827]' : 'border-stone-200 bg-[#FDFBF7]'
              }`}
            >
              <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 font-medium">
                <span>Subtotal</span>
                <span className="font-bold text-slate-800 dark:text-white">
                  {FORMAT_IDR(subtotal)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Diskon promo</span>
                  <span className="font-bold">-{FORMAT_IDR(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="flex items-center gap-1">
                  👛 Cashback nanti
                </span>
                <span className="font-bold">+{FORMAT_IDR(cashbackNanti)}</span>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-baseline">
                <span className="text-base font-extrabold text-slate-900 dark:text-white">
                  Total
                </span>
                <span className="text-2xl font-black text-slate-950 dark:text-white">
                  {FORMAT_IDR(total)}
                </span>
              </div>

              {/* Big Lanjut ke Pembayaran Gradient Button */}
              <button
                onClick={() => {
                  sfx.playFanfare();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-6 rounded-full text-white font-extrabold text-base tracking-wide shadow-lg hover:shadow-xl hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-600"
              >
                <span>Lanjut ke Pembayaran</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
