import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SEQUENCE = [
  { id: 1, text: "Ну что...", duration: 4000 },
  { id: 2, text: "Наш маленький эксперимент подошел к концу.", duration: 6000 },
  { id: 3, text: "...", duration: 3000 },
  { id: 4, text: "Надеюсь, это вызвало у тебя улыбку.", duration: 5000 },
  { id: 5, text: "Продолжай создавать, учиться и пробовать новое.", duration: 7000 },
  { id: 6, text: "...", duration: 3000 },
  { id: 7, text: "FINAL", duration: 0 }
];

export const FinalScene = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= SEQUENCE.length) return;
    
    const currentStep = SEQUENCE[currentIndex];
    if (currentStep.text === "FINAL") return;

    const timer = setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, currentStep.duration);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const currentStep = SEQUENCE[currentIndex];
  const isFinalStep = currentStep?.text === "FINAL";

  return (
    <motion.div
      key="final-scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      className="absolute inset-0 flex items-center justify-center bg-background p-6"
    >
      <div className="max-w-2xl text-center flex flex-col items-center justify-center min-h-[300px]">
        <AnimatePresence mode="wait">
          {!isFinalStep && currentStep && (
            <motion.p
              key={currentStep.id}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="text-white/80 font-light text-xl md:text-2xl tracking-wide leading-relaxed whitespace-pre-line"
            >
              {currentStep.text}
            </motion.p>
          )}

          {isFinalStep && (
            <motion.div
              key="final-message"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 4, ease: "easeOut" }}
              className="flex flex-col items-center gap-6"
            >
              <h1 className="text-3xl md:text-5xl font-light text-white tracking-[0.2em] uppercase">
                Don't close this tab
              </h1>
              <div className="w-16 h-[1px] bg-white/20 my-4" />
              <p className="text-white/50 tracking-widest uppercase text-sm md:text-base">
                До новых идей ✨
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
