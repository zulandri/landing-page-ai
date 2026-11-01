import React, { useState, useEffect } from 'react';
import { GAMES } from './data/mockData';
import { Game, CartItem, OrderState } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { KatalogSection } from './components/KatalogSection';
import { DemoTrailerSection } from './components/DemoTrailerSection';
import { PromoSection } from './components/PromoSection';
import { CashbackSection } from './components/CashbackSection';
import { TestimoniSection } from './components/TestimoniSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutPage } from './components/CheckoutPage';
import { SuccessAksesPage } from './components/SuccessAksesPage';
import { FullGameModal } from './components/FullGameModal';
import { ParentReportModal } from './components/ParentReportModal';
import { sfx } from './utils/audio';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'checkout' | 'success'>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isGameModalOpen, setIsGameModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  // Cart starts with Yunma Kata Ajaib so badge count is 1 matching screenshots
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      game: GAMES.find(g => g.id === 'kata-ajaib') || GAMES[1],
      quantity: 1
    }
  ]);

  // Order state initialized with prompt user data (Zulandri Arifin, Aisyah, 6 Th, YUNMAJUARA)
  const [orderState, setOrderState] = useState<OrderState>({
    parentName: 'Zulandri Arifin',
    email: 'zulandri40@gmail.com',
    whatsapp: '+62 81234567890',
    childName: 'Aisyah',
    childAge: '6 Th',
    paymentMethod: 'qris',
    ewalletProvider: 'gopay',
    vaBank: 'bca',
    appliedPromo: 'YUNMAJUARA',
    useCashbackWallet: false,
    orderId: '#YNM-20261102-8841',
    childPin: '4920',
    paidAt: '02 November 2026, 14:22 WIB',
    bundleAddonSelected: false
  });

  // Sync dark class to root document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Cart Management
  const handleAddToCart = (game: Game) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.game.id === game.id);
      if (existing) {
        return prev.map(item =>
          item.game.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { game, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (gameId: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.game.id === gameId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveFromCart = (gameId: string) => {
    setCartItems(prev => prev.filter(item => item.game.id !== gameId));
  };

  const handleApplyPromo = (code: string) => {
    setOrderState(prev => ({ ...prev, appliedPromo: code }));
  };

  const handleUpdateOrderState = (updates: Partial<OrderState>) => {
    setOrderState(prev => ({ ...prev, ...updates }));
  };

  const handleNavigateSection = (sectionId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={`min-h-screen selection:bg-rose-500/30 transition-colors duration-200 ${
      isDarkMode ? 'bg-[#0B0F19] text-[#DCE2F7]' : 'bg-[#FAF7F2] text-slate-800'
    }`}>
      {/* View 1: Main Landing / Home */}
      {currentView === 'home' && (
        <div className="flex flex-col min-h-screen">
          <Header
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode(!isDarkMode)}
            onNavigateSection={handleNavigateSection}
          />

          <main className="flex-1">
            <HeroSection
              onPlayDemo={() => setIsGameModalOpen(true)}
              onExploreGames={() => handleNavigateSection('katalog')}
              isDarkMode={isDarkMode}
            />

            <KatalogSection
              onAddToCart={handleAddToCart}
              isDarkMode={isDarkMode}
            />

            <DemoTrailerSection
              onOpenFullGame={() => setIsGameModalOpen(true)}
              onExploreCatalog={() => handleNavigateSection('katalog')}
              isDarkMode={isDarkMode}
            />

            <PromoSection
              onUsePromo={(code) => {
                handleApplyPromo(code);
                setIsCartOpen(true);
              }}
              isDarkMode={isDarkMode}
            />

            <CashbackSection
              isDarkMode={isDarkMode}
              defaultEmail={orderState.email}
            />

            <TestimoniSection
              isDarkMode={isDarkMode}
            />
          </main>

          <Footer
            isDarkMode={isDarkMode}
            onNavigateSection={handleNavigateSection}
          />
        </div>
      )}

      {/* View 2: Checkout & Bayar Page */}
      {currentView === 'checkout' && (
        <CheckoutPage
          cartItems={cartItems}
          orderState={orderState}
          onUpdateOrderState={handleUpdateOrderState}
          onBackToHome={() => setCurrentView('home')}
          onPaymentSuccess={() => {
            setCurrentView('success');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        />
      )}

      {/* View 3: Akses Langsung / Success Page */}
      {currentView === 'success' && (
        <div>
          <Header
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode(!isDarkMode)}
            onNavigateSection={handleNavigateSection}
          />

          <SuccessAksesPage
            orderState={orderState}
            onOpenGame={() => setIsGameModalOpen(true)}
            onOpenReport={() => setIsReportModalOpen(true)}
            onBackToHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isDarkMode={isDarkMode}
          />

          <Footer
            isDarkMode={isDarkMode}
            onNavigateSection={handleNavigateSection}
          />
        </div>
      )}

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        appliedPromo={orderState.appliedPromo}
        onApplyPromo={handleApplyPromo}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setCurrentView('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isDarkMode={isDarkMode}
      />

      {/* Full Playable Game Modal */}
      <FullGameModal
        isOpen={isGameModalOpen}
        onClose={() => setIsGameModalOpen(false)}
        gameTitle={cartItems[0]?.game.title || 'Yunma Kata Ajaib: Petualangan Membaca'}
        childName={orderState.childName}
        childPin={orderState.childPin}
      />

      {/* Parent Report Dashboard Modal */}
      <ParentReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        childName={orderState.childName}
        isDarkMode={isDarkMode}
      />

      {/* Quick Screen Switcher Pill Dock */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 p-1.5 rounded-full bg-slate-900/90 text-white backdrop-blur-md border border-slate-700/80 shadow-2xl text-[11px] font-bold">
        <button
          onClick={() => {
            sfx.playTap();
            setCurrentView('home');
          }}
          className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
            currentView === 'home' && !isCartOpen
              ? 'bg-rose-500 text-white shadow-xs'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Beranda
        </button>

        <button
          onClick={() => {
            sfx.playTap();
            setIsCartOpen(true);
          }}
          className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
            isCartOpen
              ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Keranjang ({totalCartCount})
        </button>

        <button
          onClick={() => {
            sfx.playTap();
            setCurrentView('checkout');
          }}
          className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
            currentView === 'checkout'
              ? 'bg-cyan-500 text-slate-950 font-black shadow-xs'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Checkout
        </button>

        <button
          onClick={() => {
            sfx.playTap();
            setCurrentView('success');
          }}
          className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
            currentView === 'success'
              ? 'bg-emerald-500 text-slate-950 font-black shadow-xs'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Akses Aktif
        </button>

        <button
          onClick={() => {
            sfx.playTap();
            setIsGameModalOpen(true);
          }}
          className="px-2.5 py-1.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-[10px] cursor-pointer"
        >
          🎮 Main
        </button>

        <button
          onClick={() => {
            sfx.playTap();
            setIsDarkMode(!isDarkMode);
          }}
          className="px-2.5 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 text-[10px] cursor-pointer"
          title="Toggle Light / Dark Mode"
        >
          {isDarkMode ? '☀️ Terang' : '🌙 Gelap'}
        </button>
      </div>
    </div>
  );
}
