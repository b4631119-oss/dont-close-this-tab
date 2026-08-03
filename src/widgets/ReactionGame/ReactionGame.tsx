import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperience } from '@/app/providers/ExperienceProvider';
import { Button } from '@/shared/ui/Button/Button';

type Phase = 'waiting' | 'ready' | 'result';

export const ReactionGame = () => {
  const { setStage } = useExperience();
  const [phase, setPhase] = useState<Phase>('waiting');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    startChallenge();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const startChallenge = () => {
    setPhase('waiting');
    setReactionTime(null);
    
    // Random delay between 2 and 6 seconds
    const delay = Math.random() * 4000 + 2000;
    
    timeoutRef.current = setTimeout(() => {
      setPhase('ready');
      startTimeRef.current = Date.now();
    }, delay);
  };

  const handlePress = () => {
    if (phase === 'waiting') {
      // Pressed too early, restart
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      startChallenge();
      return;
    }

    if (phase === 'ready') {
      const time = Date.now() - startTimeRef.current;
      setReactionTime(time);
      setPhase('result');
      
      // Move to final scene after a very relaxed delay
      setTimeout(() => {
        setStage('FINAL_SCENE');
      }, 6000); // Wait 6 seconds before moving on to let them read
    }
  };

  const getReactionMessage = (time: number) => {
    if (time < 200) return "Невероятно быстро! ⚡";
    if (time <= 300) return "Отличная реакция! 🔥";
    if (time <= 450) return "Очень хорошо 🙂";
    return "Главное — не скорость, а удовольствие 😄";
  };

  return (
    <motion.div
      key="reaction-game"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-background p-6"
    >
      <div className="max-w-xl w-full text-center flex flex-col items-center gap-12 min-h-[300px] justify-center">
        <AnimatePresence mode="wait">
          {phase === 'waiting' && (
            <motion.div
              key="waiting"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="flex flex-col items-center gap-8"
            >
              <h2 className="text-2xl md:text-3xl font-light text-white/80 tracking-widest">
                Приготовься...
              </h2>
              <Button 
                disabled 
                className="w-48 h-48 rounded-full border-white/10 bg-white/5 opacity-50 cursor-not-allowed"
                variant="outline"
              >
                <span className="sr-only">Ждать</span>
              </Button>
            </motion.div>
          )}

          {phase === 'ready' && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center gap-8"
            >
              <h2 className="text-2xl md:text-3xl font-light text-white tracking-widest">
                ЖМИ!
              </h2>
              <button 
                onClick={handlePress}
                className="w-48 h-48 rounded-full border border-emerald-500/50 bg-emerald-500/20 text-emerald-100 hover:bg-emerald-500/30 transition-colors shadow-[0_0_50px_rgba(16,185,129,0.3)] flex items-center justify-center text-2xl font-bold tracking-widest"
              >
                ЖМИ!
              </button>
            </motion.div>
          )}

          {phase === 'result' && reactionTime !== null && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="flex flex-col items-center gap-6"
            >
              <h3 className="text-xl md:text-2xl font-light text-white/60 tracking-widest">
                Твоя реакция:
              </h3>
              <p className="text-4xl md:text-5xl font-light text-white">
                {reactionTime} мс
              </p>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 2 }}
                className="mt-6 text-lg md:text-xl text-white/80 font-light tracking-wide"
              >
                {getReactionMessage(reactionTime)}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
