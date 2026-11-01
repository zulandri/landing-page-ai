import React from 'react';

interface Props {
  isDarkMode: boolean;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<Props> = ({ isDarkMode, onNavigateSection }) => {
  return (
    <footer
      className={`border-t transition-colors duration-200 ${
        isDarkMode
          ? 'bg-[#080D18] border-[#334155] text-slate-400'
          : 'bg-[#F8F5EE] border-stone-200 text-slate-600'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-cyan-400 p-0.5 flex items-center justify-center">
                <div className={`w-full h-full rounded-full flex items-center justify-center font-bold text-xs ${
                  isDarkMode ? 'bg-[#0B0F19] text-white' : 'bg-white text-slate-900'
                }`}>
                  Y
                </div>
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Yunma
              </span>
            </div>

            <p className="text-xs leading-relaxed max-w-sm">
              Platform edukasi anak interaktif karya pengembang Indonesia. Membantu orang tua dan pendidik menghadirkan waktu layar (screen-time) yang cerdas dan membangun potensi anak.
            </p>

            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider block text-slate-400 dark:text-slate-500 mb-2">
                METODE PEMBAYARAN INSTAN:
              </span>
              <div className="flex flex-wrap gap-2">
                {['QRIS', 'GoPay', 'OVO', 'BCA/Mandiri VA'].map(m => (
                  <span
                    key={m}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${
                      isDarkMode
                        ? 'bg-[#141B2B] border-slate-700 text-slate-300'
                        : 'bg-white border-stone-200 text-slate-700'
                    }`}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Links 1: Katalog Game */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              KATALOG GAME
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('katalog')}
                  className="hover:text-cyan-500 transition-colors text-left"
                >
                  Yunma Math Quest
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('katalog')}
                  className="hover:text-cyan-500 transition-colors text-left"
                >
                  Yunma Kata Ajaib
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('katalog')}
                  className="hover:text-cyan-500 transition-colors text-left"
                >
                  Yunma Space Coder
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('katalog')}
                  className="hover:text-cyan-500 transition-colors text-left"
                >
                  Yunma Dino Lab
                </button>
              </li>
            </ul>
          </div>

          {/* Links 2: Fitur & Dukungan */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              FITUR & DUKUNGAN
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('demo')}
                  className="hover:text-cyan-500 transition-colors text-left"
                >
                  Demo Interaktif
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('promo')}
                  className="hover:text-cyan-500 transition-colors text-left"
                >
                  Promo & Kode Diskon
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('cashback')}
                  className="hover:text-cyan-500 transition-colors text-left"
                >
                  Cek Dompet Cashback
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('ulasan')}
                  className="hover:text-cyan-500 transition-colors text-left"
                >
                  Testimoni Sekolah
                </button>
              </li>
            </ul>
          </div>

          {/* Links 3: Tanya Jawab (FAQ) */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              TANYA JAWAB (FAQ)
            </h4>
            <div className="space-y-3 text-xs leading-relaxed">
              <div>
                <strong className="block text-slate-800 dark:text-slate-200">Apakah butuh install app?</strong>
                <span className="text-[11px] text-slate-500">Tidak, langsung dapat dibuka di peramban web modern.</span>
              </div>
              <div>
                <strong className="block text-slate-800 dark:text-slate-200">Bagaimana akses dikirim?</strong>
                <span className="text-[11px] text-slate-500">Instan melalui email & WhatsApp langsung setelah pembayaran berhasil.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-12 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
          <p>© 2026 Yunma Edukasi Digital. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-4 text-xs">
            <a href="#syarat" className="hover:text-cyan-500 transition-colors">Syarat & Ketentuan</a>
            <span>•</span>
            <a href="#privasi" className="hover:text-cyan-500 transition-colors">Kebijakan Privasi</a>
            <span>•</span>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="hover:text-cyan-500 transition-colors">Bantuan WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
