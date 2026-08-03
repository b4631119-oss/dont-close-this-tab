import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperience } from '@/app/providers/ExperienceProvider';
import { Button } from '@/shared/ui/Button/Button';

const MOODS = [
  { id: 'calm', label: 'Спокойное', reaction: 'Отлично. Спокойствие — лучший старт для чего-то нового.' },
  { id: 'energetic', label: 'Энергичное', reaction: 'Супер! Значит, мы быстро со всем справимся.' },
  { id: 'mysterious', label: 'Загадочное', reaction: 'Интригует... Тогда не будем терять эту атмосферу.' }
];

export const MoodInteraction = () => {
  const { setStage } = useExperience();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    setTimeout(() => {
      setStage('MATH_GAME');
    }, 6500); // Wait for reaction to show
  };

  const selectedMoodData = MOODS.find(m => m.id === selectedMood);

  return (
    <motion.div
      key="mood-interaction"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-background p-6"
    >
      <div className="max-w-xl w-full text-center">
        <AnimatePresence mode="wait">
          {!selectedMood ? (
            <motion.div
              key="mood-question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.5 }}
              className="flex flex-col items-center gap-10"
            >
              <h2 className="text-white/80 font-light text-2xl md:text-3xl tracking-widest">
                Какое настроение сегодня?
              </h2>
              <div className="flex flex-col gap-4 w-64">
                {MOODS.map((mood, i) => (
                  <motion.div
                    key={mood.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.4, duration: 1 }}
                  >
                    <Button 
                      variant="outline" 
                      onClick={() => handleMoodSelect(mood.id)}
                      className="w-full py-4 text-lg font-light tracking-wider hover:bg-white/10"
                    >
                      {mood.label}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="mood-reaction"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2 }}
              className="flex items-center justify-center min-h-[200px]"
            >
              <p className="text-white/90 font-light text-xl md:text-2xl tracking-wide leading-relaxed">
                {selectedMoodData?.reaction}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
