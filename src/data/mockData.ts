import { Game, PromoCode, CashbackItem } from '../types';

export const GAMES: Game[] = [
  {
    id: 'math-quest',
    title: 'Yunma Math Quest: Petualangan Berhitung',
    subtitle: 'Menghitung cepat, logika angka, & misi puzzle',
    category: 'Matematika',
    age: 'Usia 5-9 Th',
    price: 39000,
    originalPrice: 59000,
    color: '#06B6D4',
    gradient: 'from-cyan-600 via-blue-600 to-indigo-800',
    iconName: 'Calculator',
    description: 'Menghitung cepat, logika angka, dan misi puzzle matematika seru berhadiah lencana.',
    features: ['30+ Level Berhitung', 'Mode Tantangan Waktu', 'Lencana Matematikawan Cilik', 'Bebas Iklan']
  },
  {
    id: 'kata-ajaib',
    title: 'Yunma Kata Ajaib: Petualangan Membaca',
    subtitle: 'Mengenal huruf, mengeja kata, & cerita interaktif',
    category: 'Bahasa',
    age: 'Usia 4-8 Th',
    price: 39000,
    originalPrice: 79000,
    popular: true,
    color: '#FF6B6B',
    gradient: 'from-amber-500 via-rose-500 to-coral-600',
    iconName: 'BookOpen',
    description: 'Mengenal huruf, mengeja kata pertama, dongeng suara interaktif, dan kosakata baru.',
    features: ['40+ Level Petualangan Fonik', 'Narasi Bahasa Indonesia Ramah', 'Kamus Bergambar', 'Audio Edukator Asli']
  },
  {
    id: 'space-coder',
    title: 'Yunma Space Coder: Logika Astronot',
    subtitle: 'Algoritma blok & navigasi roket ruang angkasa',
    category: 'Coding',
    age: 'Usia 6-12 Th',
    price: 49000,
    originalPrice: 69000,
    color: '#8B5CF6',
    gradient: 'from-purple-600 via-indigo-600 to-blue-900',
    iconName: 'Rocket',
    description: 'Algoritma logika blok dan navigasi roket ruang angkasa untuk pemula tanpa kode rumit.',
    features: ['Pengenalan Computational Thinking', 'Puzzle Loop & Kondisional', 'Misi Galaksi 25 Level', 'Sertifikat Astronot']
  },
  {
    id: 'dino-lab',
    title: 'Yunma Dino Lab: Eksplorasi Sains',
    subtitle: 'Eksperimen fosil, flora fauna, & ekosistem bumi',
    category: 'Sains',
    age: 'Usia 5-10 Th',
    price: 39000,
    originalPrice: 59000,
    color: '#10B981',
    gradient: 'from-emerald-500 via-teal-600 to-cyan-800',
    iconName: 'Leaf',
    description: 'Eksperimen alam, fosil dinosaurus, dan ekosistem bumi yang seru bagi peneliti cilik.',
    features: ['3D Ekskavasi Fosil Dino', 'Laboratorium Tumbuhan Mini', 'Kuis Suara Satwa Rimba', 'Fakta Ensiklopedia Anak']
  }
];

export const PROMO_CODES: PromoCode[] = [
  {
    code: 'YUNMAJUARA',
    title: 'Diskon 20% semua game',
    discountPercent: 20,
    description: 'Diskon 20% semua game edukasi tanpa minimum belanja.'
  },
  {
    code: 'SUPER50',
    title: 'Potongan Rp 50.000, min. belanja Rp 100.000',
    fixedDiscount: 50000,
    minSpend: 100000,
    description: 'Potongan Rp 50.000 untuk pembelian paket bundling.'
  },
  {
    code: 'RAINBOW15',
    title: 'Diskon 15%, min. belanja Rp 150.000',
    discountPercent: 15,
    minSpend: 150000,
    description: 'Diskon 15% untuk koleksi komplit.'
  }
];

export const MOCK_CASHBACK_DATA: Record<string, { total: number; history: CashbackItem[] }> = {
  'zulandri40@gmail.com': {
    total: 15680,
    history: [
      { orderId: '#e5818b34', date: '2026-11-01', amount: 7840 },
      { orderId: '#e810ea00', date: '2026-11-01', amount: 3920 },
      { orderId: '#0af94a11', date: '2026-11-01', amount: 3920 }
    ]
  }
};

export const TESTIMONIALS = [
  {
    name: 'Ibu Rina, orang tua murid',
    quote: 'Anak saya yang biasanya susah diajak belajar jadi minta main Math Quest tiap hari. Sekarang jumlah sampai 20 sudah lancar!',
    rating: 5,
    verified: true
  },
  {
    name: 'Bapak Doni, orang tua murid',
    quote: 'Laporan kemajuannya membantu banget. Saya tahu persis level mana yang masih perlu diulang anak saya.',
    rating: 5,
    verified: true
  },
  {
    name: 'Bu Sari, Guru SD',
    quote: 'Saya pakai Yunma di kelas untuk latihan literasi. Anak-anak berlomba-lomba naik level — belajar jadi menyenangkan.',
    rating: 5,
    verified: true
  }
];

export const FORMAT_IDR = (num: number) => {
  return 'Rp ' + num.toLocaleString('id-ID');
};
