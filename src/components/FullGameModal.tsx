import React, { useState } from 'react';
import { X, Star, Sparkles, Volume2, VolumeX, RotateCcw, Trophy, ArrowRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sfx } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  gameTitle?: string;
  childName?: string;
  childPin?: string;
}

export const FullGameModal: React.FC<Props> = ({
  isOpen,
  onClose,
  gameTitle = 'Yunma Kata Ajaib: Petualangan Membaca',
  childName = 'Aisyah',
  childPin = '4920'
}) => {
  const [level, setLevel] = useState<number>(1);
  const [stars, setStars] = useState<number>(12);
  const [lives, setLives] = useState<number>(3);
  const [score, setScore] = useState<number>(140);
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const readingLevels = [
    {
      word: 'KUCING',
      clue: 'Hewan berbulu yang suka mengeong: K - U - C - I - N - ?',
      options: ['G', 'K', 'T', 'P'],
      answer: 'G',
      icon: '🐱'
    },
    {
      word: 'BINTANG',
      clue: 'Benda langit yang bersinar di malam hari: B - I - N - T - A - N - ?',
      options: ['G', 'M', 'R', 'L'],
      answer: 'G',
      icon: '⭐'
    },
    {
      word: 'PELANGI',
      clue: 'Warna-warni indah setelah hujan: P - E - L - A - N - G - ?',
      options: ['I', 'U', 'O', 'A'],
      answer: 'I',
      icon: '🌈'
    },
    {
      word: 'SEPATU',
      clue: 'Dipakai di kaki saat pergi ke sekolah: S - E - P - A - T - ?',
      options: ['U', 'I', 'O', 'E'],
      answer: 'U',
      icon: '👟'
    }
  ];

  if (!isOpen) return null;

  const currentQ = readingLevels[activeQuestion % readingLevels.length];

  const handleSelect = (choice: string) => {
    sfx.playTap();
    setSelectedAnswer(choice);

    if (choice === currentQ.answer) {
      sfx.playCorrect();
      setIsAnswerCorrect(true);
      setScore(s => s + 20);
      setStars(st => st + 1);

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
        if (activeQuestion + 1 >= readingLevels.length) {
          sfx.playFanfare();
          setLevel(l => l + 1);
          setActiveQuestion(0);
        } else {
          setActiveQuestion(q => q + 1);
        }
      }, 1500);
    } else {
      sfx.playTryAgain();
      setIsAnswerCorrect(false);
      setLives(l => Math.max(1, l - 1));

      setTimeout(() => {
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#0B0F19] text-[#F8FAFC] border-2 border-[#334155] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#111827] border-b border-[#334155]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-lg shadow-md">
              🤖
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-white leading-tight">
                {gameTitle}
              </h3>
              <p className="text-xs text-slate-400">
                Pemain: <span className="text-cyan-400 font-bold">{childName}</span> · PIN: <span className="font-mono text-amber-300 font-bold">{childPin}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const next = sfx.toggleMute();
                setIsMuted(next);
              }}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-300 transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button
              onClick={() => {
                sfx.playTap();
                onClose();
              }}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Game HUD Bar */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-[#1E293B] border-b border-[#334155]/60 text-xs sm:text-sm font-bold">
          <div className="flex items-center gap-1.5 text-rose-400">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={i}
                className={`w-4 h-4 ${i < lives ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`}
              />
            ))}
            <span className="ml-1 text-slate-300">Level {level}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{stars} Bintang</span>
            </div>
            <div className="flex items-center gap-1 text-cyan-300">
              <Trophy className="w-4 h-4 text-cyan-400" />
              <span>{score} Pts</span>
            </div>
          </div>
        </div>

        {/* Main interactive play area */}
        <div className="p-6 sm:p-10 flex-1 overflow-y-auto flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-rose-500/20 border-2 border-amber-500/30 flex items-center justify-center text-5xl mb-4 shadow-lg animate-bounce">
            {currentQ.icon}
          </div>

          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-1">
            Misi {activeQuestion + 1} dari {readingLevels.length}
          </span>

          <p className="text-sm sm:text-base text-slate-300 max-w-md font-medium mb-4">
            {currentQ.clue}
          </p>

          <div className="text-4xl sm:text-5xl font-black text-white tracking-widest mb-6 font-mono bg-[#111827] px-6 py-3 rounded-2xl border border-slate-700 shadow-inner">
            {currentQ.word.slice(0, -1)}
            <span className="text-amber-400 underline decoration-wavy">?</span>
          </div>

          {/* Letter Choice Buttons */}
          <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full max-w-md">
            {currentQ.options.map(opt => {
              const isPicked = selectedAnswer === opt;
              let btnStyle = 'bg-[#1E293B] border-[#334155] text-white hover:border-cyan-400';
              if (isPicked) {
                if (isAnswerCorrect) {
                  btnStyle = 'bg-emerald-600 border-emerald-400 text-white scale-105';
                } else {
                  btnStyle = 'bg-rose-600 border-rose-400 text-white animate-shake';
                }
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  disabled={selectedAnswer !== null}
                  className={`py-4 rounded-2xl text-2xl sm:text-3xl font-black border-2 transition-all cursor-pointer shadow-lg active:scale-95 ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {isAnswerCorrect !== null && (
            <div
              className={`mt-5 px-5 py-2.5 rounded-full text-sm font-extrabold flex items-center gap-2 ${
                isAnswerCorrect
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500'
              }`}
            >
              {isAnswerCorrect ? <Sparkles className="w-4 h-4" /> : null}
              {isAnswerCorrect ? 'Hore! Jawabanmu Benar Sekali!' : 'Ups, hampir tepat! Coba lagi ya.'}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#111827] border-t border-[#334155] flex items-center justify-between text-xs text-slate-400">
          <span>Tersinkronisasi dengan akun orang tua</span>
          <button
            onClick={() => {
              sfx.playTap();
              onClose();
            }}
            className="px-4 py-2 rounded-full bg-[#1E293B] hover:bg-[#2E3545] text-slate-200 font-bold transition-colors cursor-pointer"
          >
            Selesai Bermain
          </button>
        </div>
      </div>
    </div>
  );
};
