import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperience } from '@/app/providers/ExperienceProvider';
import { eventBus, AppEvent } from '@/shared/lib/EventBus';

const QUESTIONS = [
  {
    text: "Что создает структуру веб-страницы?",
    options: ["HTML", "CSS", "JavaScript"],
    correct: 0
  },
  {
    text: "Какой тег используется для самого главного заголовка?",
    options: ["<header>", "<h1>", "<title>"],
    correct: 1
  },
  {
    text: "Какое свойство CSS меняет цвет текста?",
    options: ["background", "color", "font-weight"],
    correct: 1
  },
  {
    text: "Какой атрибут дает уникальный идентификатор?",
    options: ["class", "style", "id"],
    correct: 2
  },
  {
    text: "Как выбрать все элементы с классом 'card' в CSS?",
    options: ["#card", ".card", "card"],
    correct: 1
  },
  {
    text: "Какое свойство делает элементы гибкими (flexbox)?",
    options: ["display: flex", "position: flex", "align: flex"],
    correct: 0
  }
];

export const QuizGame = () => {
  const { setStage } = useExperience();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  const currentQuestion = QUESTIONS[currentIdx];

  const handleSelect = (idx: number) => {
    if (selectedOpt !== null) return;
    
    setSelectedOpt(idx);
    
    if (idx === currentQuestion.correct) {
      eventBus.emit(AppEvent.SHOW_NOTIFICATION, {
        title: 'Верно!',
        description: 'Отлично справляешься.',
        type: 'success'
      });
      
      setTimeout(() => {
        setSelectedOpt(null);
        if (currentIdx < QUESTIONS.length - 1) {
          setCurrentIdx(prev => prev + 1);
        } else {
          setStage('REACTION_GAME');
        }
      }, 2500);
    } else {
      eventBus.emit(AppEvent.SHOW_NOTIFICATION, {
        title: 'Упс...',
        description: 'Ничего страшного, попробуй еще раз.',
        type: 'warning'
      });
      setTimeout(() => setSelectedOpt(null), 2000);
    }
  };

  return (
    <motion.div
      key="quiz-game"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-background p-6"
    >
      <div className="max-w-xl w-full flex flex-col items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/50 tracking-widest uppercase text-sm text-center"
        >
          Мини-квиз: {currentIdx + 1} / {QUESTIONS.length}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`q-${currentIdx}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-full flex flex-col items-center gap-10"
          >
            <h2 className="text-2xl md:text-3xl font-light text-white text-center leading-relaxed">
              {currentQuestion.text}
            </h2>

            <div className="flex flex-col gap-4 w-full md:w-80">
              {currentQuestion.options.map((opt, idx) => {
                let btnClass = "border-white/10 hover:border-white/30 hover:bg-white/5";
                if (selectedOpt === idx) {
                  btnClass = idx === currentQuestion.correct 
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" 
                    : "border-red-500 bg-red-500/10 text-red-400";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={selectedOpt !== null}
                    className={`w-full p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 text-lg font-light tracking-wide text-white/80 ${btnClass}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
