import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperience } from '@/app/providers/ExperienceProvider';
import { Button } from '@/shared/ui/Button/Button';

const SEQUENCE = [
  { id: 1, text: "...", duration: 3000 },
  { id: 2, text: "Подожди...", duration: 4000 },
  { id: 3, text: "...", duration: 3000 },
  { id: 4, text: "Кажется, ты открыла что-то необычное.", duration: 6000 },
  { id: 5, text: "...", duration: 3000 },
  { id: 6, text: "Это не обычный сайт.", duration: 5000 },
  { id: 7, text: "...", duration: 3000 },
  { id: 8, text: "Здесь тебя ждет кое-что интересное.", duration: 6000 },
  { id: 9, text: "ACTION", duration: 0 }
];

export const OpeningSequence = () => {
  const { completeIntro } = useExperience();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= SEQUENCE.length) return;
    
    const currentStep = SEQUENCE[currentIndex];
    if (currentStep.text === "ACTION") return;

    const timer = setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, currentStep.duration);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const currentStep = SEQUENCE[currentIndex];
  const isActionStep = currentStep?.text === "ACTION";

  return (
    <motion.div
      key="opening-sequence"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      className="absolute inset-0 flex items-center justify-center bg-background p-6"
    >
      <div className="max-w-2xl text-center flex flex-col items-center justify-center min-h-[200px]">
        <AnimatePresence mode="wait">
          {!isActionStep && currentStep && (
            <motion.p
              key={currentStep.id}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="text-white/80 font-light text-xl md:text-2xl tracking-wide leading-relaxed whitespace-pre-line"
            >
              {currentStep.text}
            </motion.p>
          )}

          {isActionStep && (
            <motion.div
              key="action-button"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              <Button 
                variant="outline" 
                onClick={completeIntro}
                className="px-12 py-4 text-lg tracking-[0.2em] uppercase glass hover:bg-white/10"
              >
                Начать
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
