import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { akcholponDialog } from '@/dialogs/akcholpon';
import { alfiyaDialog } from '@/dialogs/alfiya';

export const DialogueEngine = ({ path }: { path: 'akcholpon' | 'alfiya' }) => {
  const dialogs = path === 'akcholpon' ? akcholponDialog : alfiyaDialog;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typeInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (currentIndex >= dialogs.length) return;

    const currentMsg = dialogs[currentIndex];
    setDisplayedText('');
    
    const timeout = setTimeout(() => {
      setIsTyping(true);
      let charIndex = 0;
      const speed = currentMsg.typingSpeed || 50;
      
      typeInterval.current = setInterval(() => {
        setDisplayedText(currentMsg.text.slice(0, charIndex + 1));
        charIndex++;
        
        if (charIndex >= currentMsg.text.length) {
          if (typeInterval.current) clearInterval(typeInterval.current);
          setIsTyping(false);
          // Wait a bit before moving to the next message
          setTimeout(() => {
             setCurrentIndex(prev => prev + 1);
          }, 3000); // stay on screen time
        }
      }, speed);
      
    }, currentMsg.delayBefore || 0);

    return () => {
      clearTimeout(timeout);
      if (typeInterval.current) clearInterval(typeInterval.current);
    };
  }, [currentIndex, dialogs, path]);

  if (currentIndex >= dialogs.length) return null;

  return (
    <div className="flex flex-col items-center justify-center max-w-lg w-full min-h-[100px] z-10 pointer-events-none">
      <AnimatePresence mode="wait">
         <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`text-xl font-light text-center leading-relaxed tracking-wide ${path === 'alfiya' ? 'font-mono text-green-400/90' : 'text-white/90'}`}
          >
            {displayedText}
            {isTyping && <span className="animate-pulse ml-1 opacity-70">|</span>}
         </motion.div>
      </AnimatePresence>
    </div>
  );
};
