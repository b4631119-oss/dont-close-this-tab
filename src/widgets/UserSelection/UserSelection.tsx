import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperience } from '@/app/providers/ExperienceProvider';
import { UserPath } from '@/types';
import { Button } from '@/shared/ui/Button/Button';

export const UserSelection = () => {
  const { setUserPath, setStage } = useExperience();
  const [showInput, setShowInput] = useState(false);
  const [customName, setCustomName] = useState('');

  const handleSelect = (path: UserPath) => {
    setUserPath(path);
    setTimeout(() => {
      setStage('MOOD_INTERACTION');
    }, 1500);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customName.trim().length > 0) {
      handleSelect(customName.trim());
    }
  };

  return (
    <motion.div
      key="user-selection"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
      transition={{ duration: 2.5, ease: "easeInOut" }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center gap-12 max-w-xl w-full px-6">
        <AnimatePresence mode="wait">
          {!showInput ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center gap-12 w-full"
            >
              <h1 className="text-white/80 font-light text-2xl tracking-widest text-center">
                Кто сегодня здесь?
              </h1>
              
              <div className="flex flex-col gap-6 w-full max-w-[280px]">
                <SelectionOption
                  label="Акчолпон"
                  onClick={() => handleSelect('akcholpon')}
                  delay={1.2}
                />
                <SelectionOption
                  label="Алфия"
                  onClick={() => handleSelect('alfiya')}
                  delay={1.4}
                />
                <SelectionOption
                  label="Другой гость"
                  onClick={() => setShowInput(true)}
                  delay={1.6}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="custom-input"
              initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center gap-10 w-full"
            >
              <h1 className="text-white/80 font-light text-2xl tracking-widest text-center">
                Как к тебе обращаться?
              </h1>
              
              <form onSubmit={handleCustomSubmit} className="flex flex-col items-center gap-8 w-full max-w-[320px]">
                <input
                  type="text"
                  autoFocus
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Имя..."
                  className="w-full bg-transparent border-b-2 border-white/20 text-center text-3xl font-light text-white outline-none transition-colors focus:border-white/60 py-2 placeholder:text-white/20"
                />
                <Button 
                  type="submit" 
                  variant="outline"
                  disabled={customName.trim().length === 0}
                  className="px-10 py-3 tracking-widest glass disabled:opacity-30"
                >
                  Продолжить
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const SelectionOption = ({ label, onClick, delay }: { label: string, onClick: () => void, delay: number }) => (
  <motion.button
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.8 }}
    whileHover={{ scale: 1.02, x: 10 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="group flex items-center gap-4 text-white/50 hover:text-white transition-colors duration-500 text-left w-full p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10"
  >
    <div className="w-4 h-4 rounded-full border border-white/30 group-hover:border-white flex items-center justify-center transition-colors">
      <div className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <span className="font-light tracking-wide text-lg">{label}</span>
  </motion.button>
);
