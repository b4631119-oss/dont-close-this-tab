
import { motion } from 'framer-motion';

export const MobileLockScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-8 text-center bg-background text-white/90"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="max-w-md flex flex-col items-center gap-6"
      >
        <div className="w-16 h-16 border border-white/20 rounded-2xl flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        </div>
        <h1 className="text-2xl font-light tracking-wide">
          Доступ ограничен
        </h1>
        <p className="text-white/60 font-light leading-relaxed text-sm">
          Этот опыт был создан исключительно для настольных компьютеров. Пожалуйста, откройте ссылку на устройстве с большим экраном, чтобы погрузиться в полную атмосферу.
        </p>
      </motion.div>
    </motion.div>
  );
};
