import React, { useState } from 'react';
import { ShoppingBag, Moon, Sun, Menu, X, Sparkles } from 'lucide-react';
import { sfx } from '../utils/audio';

interface Props {
  cartCount: number;
  onOpenCart: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<Props> = ({
  cartCount,
  onOpenCart,
  isDarkMode,
  onToggleTheme,
  onNavigateSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'katalog', label: 'Katalog' },
    { id: 'demo', label: 'Demo' },
    { id: 'promo', label: 'Promo' },
    { id: 'cashback', label: 'Cashback' },
    { id: 'ulasan', label: 'Ulasan' }
  ];

  const handleNavClick = (id: string) => {
    sfx.playTap();
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-colors duration-200">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 text-white text-xs font-semibold py-1.5 px-4 text-center flex items-center justify-center gap-1.5 shadow-xs">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Promo Libur Pintar: Gunakan kode <strong>YUNMAJUARA</strong> untuk diskon 20% & dapatkan 10% cashback instan!</span>
      </div>

      {/* Main Navbar */}
      <div
        className={`w-full backdrop-blur-md border-b transition-colors duration-200 ${
          isDarkMode
            ? 'bg-[#0B0F19]/90 border-[#334155] text-white'
            : 'bg-[#FAF7F2]/95 border-stone-200 text-slate-800'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            {/* Rainbow spiral logo circle matching Yunma logo in screenshots */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-cyan-400 p-0.5 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className={`w-full h-full rounded-full flex items-center justify-center font-black text-sm ${
                isDarkMode ? 'bg-[#0B0F19] text-white' : 'bg-white text-slate-900'
              }`}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-cyan-500 font-extrabold text-base">
                  Y
                </span>
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Yunma
              </span>
              <span className="text-xl font-black text-cyan-500">.</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'text-slate-300 hover:text-white'
                    : 'text-stone-700 hover:text-slate-950'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right actions: Theme toggle + Cart */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sfx.playTap();
                onToggleTheme();
              }}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isDarkMode
                  ? 'text-amber-300 hover:bg-slate-800'
                  : 'text-stone-700 hover:bg-stone-200'
              }`}
              title={isDarkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => {
                sfx.playTap();
                onOpenCart();
              }}
              className={`flex items-center gap-2 py-2 px-4 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md ${
                isDarkMode
                  ? 'bg-[#1E293B] hover:bg-[#2B384F] text-white border border-[#334155]'
                  : 'bg-[#191F2F] hover:bg-slate-800 text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Keranjang</span>
              <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => {
                sfx.playTap();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden px-6 py-4 border-b space-y-3 shadow-lg ${
            isDarkMode ? 'bg-[#111827] border-[#334155] text-white' : 'bg-white border-stone-200 text-slate-800'
          }`}
        >
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left py-2 text-sm font-bold hover:text-cyan-500"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
