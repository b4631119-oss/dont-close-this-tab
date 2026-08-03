import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperience } from '@/app/providers/ExperienceProvider';
import { eventBus, AppEvent } from '@/shared/lib/EventBus';
import { Button } from '@/shared/ui/Button/Button';

const EQUATIONS = [
  { text: '7 + 8 = ?', answer: 15 },
  { text: '20 - 6 = ?', answer: 14 },
  { text: '5 + 9 - 3 = ?', answer: 11 },
  { text: '12 + 15 = ?', answer: 27 },
  { text: '30 - 18 = ?', answer: 12 },
  { text: '8 + 8 + 4 = ?', answer: 20 }
];

export const MathGame = () => {
  const { setStage } = useExperience();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [score, setScore] = useState(0);

  const currentEquation = EQUATIONS[currentIdx];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;

    const val = parseInt(inputValue, 10);
    if (val === currentEquation.answer) {
      setIsSuccess(true);
      setIsError(false);
      setScore(s => s + 100);
      eventBus.emit(AppEvent.SHOW_NOTIFICATION, {
        title: 'Правильно!',
        description: '+100 очков.',
        type: 'success'
      });

      setTimeout(() => {
        setIsSuccess(false);
        setInputValue('');
        if (currentIdx < EQUATIONS.length - 1) {
          setCurrentIdx(prev => prev + 1);
        } else {
          setStage('HTML_CSS_QUIZ');
        }
      }, 2500); // Slower delay before next question
    } else {
      setIsError(true);
      setInputValue('');
      eventBus.emit(AppEvent.SHOW_NOTIFICATION, {
        title: 'Ой!',
        description: 'Попробуй еще раз.',
        type: 'warning'
      });
      setTimeout(() => setIsError(false), 500);
    }
  };

  return (
    <motion.div
      key="math-game"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-background p-6"
    >
      <div className="max-w-md w-full text-center flex flex-col items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/50 tracking-widest uppercase text-sm flex flex-col items-center gap-2"
        >
          <span>Разминка: {currentIdx + 1} / {EQUATIONS.length}</span>
          <motion.span 
            key={score}
            initial={{ scale: 1.5, color: '#34d399' }}
            animate={{ scale: 1, color: '#ffffff' }}
            transition={{ duration: 0.8 }}
            className="text-white/80 font-medium"
          >
            Очки: {score}
          </motion.span>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`eq-${currentIdx}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="text-5xl md:text-7xl font-light text-white tracking-widest"
          >
            {currentEquation.text}
          </motion.div>
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full">
          <motion.input
            type="number"
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className={`w-32 h-16 bg-white/5 border-b-2 text-center text-3xl font-light text-white outline-none transition-colors ${
              isError ? 'border-red-500 text-red-400' : 
              isSuccess ? 'border-emerald-500 text-emerald-400' : 'border-white/20 focus:border-white/60'
            }`}
          />
          <Button 
            type="submit" 
            variant="outline" 
            className="px-12 py-3 tracking-widest glass"
          >
            Проверить
          </Button>
        </form>
      </div>
    </motion.div>
  );
};
