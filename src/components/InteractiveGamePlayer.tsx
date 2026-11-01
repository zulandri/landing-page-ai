import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Star, Sparkles, Trophy, Award, CheckCircle2, ChevronRight, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sfx } from '../utils/audio';

interface Props {
  activeGameId: string;
  onSelectGame: (id: string) => void;
  isDarkMode: boolean;
  onExploreCatalog?: () => void;
}

export const InteractiveGamePlayer: React.FC<Props> = ({
  activeGameId,
  onSelectGame,
  isDarkMode,
  onExploreCatalog
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(6);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ message: string; type: 'correct' | 'wrong' | null }>({
    message: '',
    type: null
  });

  // Math Quest state
  const [mathNum1, setMathNum1] = useState<number>(5);
  const [mathNum2, setMathNum2] = useState<number>(3);
  const [mathOptions, setMathOptions] = useState<number[]>([6, 7, 8, 9]);

  // Kata Ajaib state
  const kataPuzzles = [
    { question: 'B - U - K - ?', target: 'U', word: 'BUKU 📖', options: ['U', 'A', 'I', 'E'] },
    { question: 'R - U - M - A - ?', target: 'H', word: 'RUMAH 🏡', options: ['H', 'K', 'N', 'S'] },
    { question: 'B - E - L - A - J - A - ?', target: 'R', word: 'BELAJAR 🎓', options: ['R', 'N', 'T', 'M'] }
  ];
  const [kataIndex, setKataIndex] = useState(0);

  // Space Coder state
  const [coderStep, setCoderStep] = useState(0);

  // Dino Lab state
  const [dinoIndex, setDinoIndex] = useState(0);
  const dinoQuestions = [
    { name: 'Tyrannosaurus Rex', trait: 'Gigi pemakan daging tajam', options: ['T-Rex 🦖', 'Triceratops 🦏', 'Brachiosaurus 🦕'] },
    { name: 'Triceratops', trait: 'Tiga cula pelindung di kepala', options: ['Triceratops 🦏', 'Pterodactyl 🦅', 'Stegosaurus 🐢'] }
  ];

  // Timer simulation for trailer video bar
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= 14) return 0;
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleToggleSound = () => {
    const next = sfx.toggleMute();
    setIsMuted(next);
  };

  const handleMathChoice = (selected: number) => {
    sfx.playTap();
    const correctAnswer = mathNum1 + mathNum2;
    if (selected === correctAnswer) {
      sfx.playCorrect();
      setScore(prev => prev + 10);
      setFeedback({ message: 'Hebat! Jawabanmu Tepat! +10 Bintang ⭐', type: 'correct' });

      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 }
      });

      // generate next fun math question
      setTimeout(() => {
        const n1 = Math.floor(Math.random() * 5) + 3;
        const n2 = Math.floor(Math.random() * 5) + 2;
        const correct = n1 + n2;
        const opts = Array.from(new Set([correct, correct - 1, correct + 1, correct + 2])).sort(() => Math.random() - 0.5);
        setMathNum1(n1);
        setMathNum2(n2);
        setMathOptions(opts);
        setFeedback({ message: '', type: null });
      }, 1200);
    } else {
      sfx.playTryAgain();
      setFeedback({ message: 'Ayo coba lagi, kamu pasti bisa!', type: 'wrong' });
      setTimeout(() => setFeedback({ message: '', type: null }), 1400);
    }
  };

  const handleKataChoice = (choice: string) => {
    sfx.playTap();
    const currentPuzzle = kataPuzzles[kataIndex];
    if (choice === currentPuzzle.target) {
      sfx.playCorrect();
      setScore(prev => prev + 10);
      setFeedback({ message: `Hore! Jadi kata: ${currentPuzzle.word} ⭐`, type: 'correct' });

      confetti({
        particleCount: 35,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        setKataIndex((kataIndex + 1) % kataPuzzles.length);
        setFeedback({ message: '', type: null });
      }, 1400);
    } else {
      sfx.playTryAgain();
      setFeedback({ message: 'Cari huruf yang tepat yuk!', type: 'wrong' });
      setTimeout(() => setFeedback({ message: '', type: null }), 1400);
    }
  };

  const handleCoderClick = (action: string) => {
    sfx.playTap();
    if (action === 'Maju' && coderStep === 0) {
      setCoderStep(1);
      sfx.playCorrect();
    } else if (action === 'Nyalakan Roket' && coderStep === 1) {
      setCoderStep(2);
      sfx.playFanfare();
      setScore(prev => prev + 15);
      setFeedback({ message: 'Misi Sukses! Roket Meluncur ke Bintang 🚀⭐', type: 'correct' });
      confetti({ particleCount: 40, spread: 80, origin: { y: 0.6 } });
      setTimeout(() => {
        setCoderStep(0);
        setFeedback({ message: '', type: null });
      }, 1800);
    } else {
      setFeedback({ message: 'Pilih perintah navigasi berikutnya!', type: 'wrong' });
      setTimeout(() => setFeedback({ message: '', type: null }), 1200);
    }
  };

  const handleDinoChoice = (ans: string) => {
    sfx.playTap();
    const target = dinoQuestions[dinoIndex].options[0];
    if (ans === target) {
      sfx.playCorrect();
      setScore(prev => prev + 10);
      setFeedback({ message: 'Fosil Berhasil Diidentifikasi! 🦖🌿', type: 'correct' });
      confetti({ particleCount: 35, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => {
        setDinoIndex((dinoIndex + 1) % dinoQuestions.length);
        setFeedback({ message: '', type: null });
      }, 1400);
    } else {
      sfx.playTryAgain();
      setFeedback({ message: 'Lihat ciri-ciri khususnya lagi ya!', type: 'wrong' });
      setTimeout(() => setFeedback({ message: '', type: null }), 1200);
    }
  };

  return (
    <div className="w-full">
      {/* Game Selector Tab Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {[
          { id: 'math-quest', label: 'Yunma Math Quest', color: '#06B6D4' },
          { id: 'space-coder', label: 'Yunma Space Coder', color: '#8B5CF6' },
          { id: 'kata-ajaib', label: 'Yunma Kata Ajaib', color: '#FF6B6B' },
          { id: 'dino-lab', label: 'Yunma Dino Lab', color: '#10B981' }
        ].map(tab => {
          const isActive = activeGameId === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sfx.playTap();
                onSelectGame(tab.id);
                setFeedback({ message: '', type: null });
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? isDarkMode
                    ? 'bg-[#1E293B] text-white border-2'
                    : 'bg-white text-slate-900 border-2 shadow-sm'
                  : isDarkMode
                  ? 'bg-[#191F2F] text-slate-400 hover:text-white border border-[#334155]/60'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-900 border border-stone-200'
              }`}
              style={{
                borderColor: isActive ? tab.color : undefined
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: tab.color }}
              />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Game Screen Console */}
      <div
        className={`relative w-full rounded-2xl overflow-hidden border shadow-xl transition-all duration-300 ${
          isDarkMode
            ? 'bg-[#0E1524] border-[#334155]'
            : 'bg-[#0B1021] text-white border-slate-700'
        }`}
      >
        {/* Console Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
              Mode Coba Interaktif
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A2338] border border-slate-700 text-xs font-bold text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Skor: {score} poin</span>
          </div>
        </div>

        {/* Game Stage Content Area */}
        <div className="px-4 sm:px-8 py-8 sm:py-12 flex flex-col items-center justify-center min-h-[260px] sm:min-h-[300px]">
          {activeGameId === 'math-quest' && (
            <div className="w-full max-w-md flex flex-col items-center text-center">
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-2">
                Level 1 · Operasi Penjumlahan Cepat
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-wider my-3 font-mono">
                {mathNum1} + {mathNum2} = ?
              </div>

              {/* Multiple Choice Options */}
              <div className="grid grid-cols-4 gap-2.5 sm:gap-4 w-full mt-4">
                {mathOptions.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleMathChoice(opt)}
                    className="py-3 sm:py-4 px-2 rounded-xl text-xl sm:text-2xl font-bold bg-[#1C263B] text-white border-2 border-slate-700/80 hover:border-cyan-400 hover:bg-[#25324E] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <p className="text-xs text-slate-400 mt-5">
                Sentuh angka yang tepat untuk mencoba kuis interaktif.
              </p>
            </div>
          )}

          {activeGameId === 'kata-ajaib' && (
            <div className="w-full max-w-md flex flex-col items-center text-center">
              <span className="text-xs uppercase tracking-widest text-rose-400 font-semibold mb-2">
                Petualangan Literasi · Susun Huruf
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-widest my-3 font-mono">
                {kataPuzzles[kataIndex].question}
              </div>

              <div className="grid grid-cols-4 gap-2.5 sm:gap-4 w-full mt-4">
                {kataPuzzles[kataIndex].options.map(letter => (
                  <button
                    key={letter}
                    onClick={() => handleKataChoice(letter)}
                    className="py-3 sm:py-4 px-2 rounded-xl text-xl sm:text-2xl font-bold bg-[#1C263B] text-white border-2 border-slate-700/80 hover:border-rose-400 hover:bg-[#25324E] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
                  >
                    {letter}
                  </button>
                ))}
              </div>

              <p className="text-xs text-slate-400 mt-5">
                Pilih huruf yang pas untuk melengkapi kata!
              </p>
            </div>
          )}

          {activeGameId === 'space-coder' && (
            <div className="w-full max-w-md flex flex-col items-center text-center">
              <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-2">
                Misi Luar Angkasa · Navigasi Blok
              </span>
              <div className="flex items-center justify-center gap-4 my-2 p-3 rounded-xl bg-[#141C2E] border border-slate-700 w-full">
                <span className="text-2xl">🤖</span>
                <span className="text-slate-400">---&gt;</span>
                <span className="text-2xl">{coderStep >= 1 ? '🚀' : '🛸'}</span>
                <span className="text-slate-400">---&gt;</span>
                <span className="text-2xl animate-bounce">⭐</span>
              </div>
              <div className="flex gap-2 sm:gap-3 w-full mt-4">
                <button
                  onClick={() => handleCoderClick('Maju')}
                  className={`flex-1 py-3 px-2 rounded-xl text-sm sm:text-base font-bold border-2 transition-all cursor-pointer ${
                    coderStep === 0
                      ? 'bg-purple-600 border-purple-400 text-white animate-pulse'
                      : 'bg-[#1C263B] border-slate-700 text-slate-300'
                  }`}
                >
                  1. Maju ➡️
                </button>
                <button
                  onClick={() => handleCoderClick('Nyalakan Roket')}
                  className={`flex-1 py-3 px-2 rounded-xl text-sm sm:text-base font-bold border-2 transition-all cursor-pointer ${
                    coderStep === 1
                      ? 'bg-purple-600 border-purple-400 text-white animate-pulse'
                      : 'bg-[#1C263B] border-slate-700 text-slate-300'
                  }`}
                >
                  2. Nyalakan Roket 🚀
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-5">
                Latih alur logika urutan langkah pemrograman.
              </p>
            </div>
          )}

          {activeGameId === 'dino-lab' && (
            <div className="w-full max-w-md flex flex-col items-center text-center">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
                Laboratorium Arkeologi Cilik
              </span>
              <div className="text-lg sm:text-xl font-bold text-white my-2">
                "Ciri: {dinoQuestions[dinoIndex].trait}"
              </div>
              <div className="flex flex-col gap-2 w-full mt-3">
                {dinoQuestions[dinoIndex].options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleDinoChoice(opt)}
                    className="py-2.5 px-4 rounded-xl text-sm sm:text-base font-bold bg-[#1C263B] text-white border-2 border-slate-700/80 hover:border-emerald-400 hover:bg-[#25324E] text-left transition-all cursor-pointer"
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-5">
                Sentuh nama dinosaurus yang sesuai fosil.
              </p>
            </div>
          )}

          {/* Feedback banner */}
          {feedback.message && (
            <div
              className={`mt-4 px-4 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                feedback.type === 'correct'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
              }`}
            >
              {feedback.type === 'correct' ? <Sparkles className="w-4 h-4" /> : null}
              {feedback.message}
            </div>
          )}
        </div>

        {/* Video / Player Controls Bar */}
        <div className="border-t border-slate-800 bg-[#090D18]/90 px-4 py-3">
          {/* Progress bar line with neon gradient */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full mb-3 overflow-hidden cursor-pointer">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-rose-400 rounded-full transition-all duration-300"
              style={{ width: `${(currentTime / 14) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-slate-400 text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  sfx.playTap();
                  setIsPlaying(!isPlaying);
                }}
                className="hover:text-white transition-colors cursor-pointer"
                title={isPlaying ? 'Jeda' : 'Putar'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  sfx.playTap();
                  setCurrentTime(0);
                  setIsPlaying(true);
                }}
                className="hover:text-white transition-colors cursor-pointer"
                title="Putar Ulang"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <span className="font-mono tabular-nums text-slate-300">
                0:{currentTime < 10 ? `0${currentTime}` : currentTime} / 0:14
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleSound}
                className="hover:text-white transition-colors cursor-pointer"
                title={isMuted ? 'Buka Suara' : 'Bisukan Suara'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  sfx.playTap();
                }}
                className="hover:text-white transition-colors cursor-pointer"
                title="Layar Penuh"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-2.5">
        Trailer ini diputar otomatis di browser — tanpa unduhan. Coba juga demo interaktifnya!
      </p>

      {/* Mobile catalog exploration CTA button if on mobile */}
      {onExploreCatalog && (
        <div className="mt-4 sm:hidden flex justify-center">
          <button
            onClick={() => {
              sfx.playTap();
              onExploreCatalog();
            }}
            className="w-full py-3 px-4 rounded-xl text-center font-bold text-sm bg-emerald-500 text-slate-950 shadow-md active:scale-95 transition-all"
          >
            Coba Game Lengkap di Katalog
          </button>
        </div>
      )}
    </div>
  );
};
