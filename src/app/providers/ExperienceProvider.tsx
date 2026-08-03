import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserPath, StoryStage } from '@/types';
import { eventBus, AppEvent } from '@/shared/lib/EventBus';
import { storage, STORAGE_KEYS } from '@/shared/lib/storage';

interface ExperienceContextType {
  userPath: UserPath;
  setUserPath: (path: UserPath) => void;
  isIntroComplete: boolean;
  completeIntro: () => void;
  stage: StoryStage;
  setStage: (stage: StoryStage) => void;
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

export const ExperienceProvider = ({ children }: { children: ReactNode }) => {
  const [userPath, setUserPathState] = useState<UserPath>(null);
  const [isIntroComplete, setIsIntroCompleteState] = useState(false);
  const [stage, setStage] = useState<StoryStage>('INTRO');

  useEffect(() => {
    // Restore basic state
    const savedPath = storage.get<UserPath>(STORAGE_KEYS.USER_PATH, null);
    const savedIntro = storage.get<boolean>(STORAGE_KEYS.INTRO_COMPLETE, false);
    
    if (savedPath) setUserPathState(savedPath);
    if (savedIntro) setIsIntroCompleteState(savedIntro);

    const handleUserSelected = (path: UserPath) => setUserPathState(path);
    const handleIntroCompleted = () => setIsIntroCompleteState(true);

    eventBus.on(AppEvent.USER_SELECTED, handleUserSelected);
    eventBus.on(AppEvent.INTRO_COMPLETED, handleIntroCompleted);

    return () => {
      eventBus.off(AppEvent.USER_SELECTED, handleUserSelected);
      eventBus.off(AppEvent.INTRO_COMPLETED, handleIntroCompleted);
    };
  }, []);

  const setUserPath = (path: UserPath) => {
    setUserPathState(path);
    storage.set(STORAGE_KEYS.USER_PATH, path);
    eventBus.emit(AppEvent.USER_SELECTED, path);
  };

  const completeIntro = () => {
    setIsIntroCompleteState(true);
    setStage('USER_SELECTION');
    storage.set(STORAGE_KEYS.INTRO_COMPLETE, true);
    eventBus.emit(AppEvent.INTRO_COMPLETED);
  };

  return (
    <ExperienceContext.Provider
      value={{
        userPath,
        setUserPath,
        isIntroComplete,
        completeIntro,
        stage,
        setStage,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperience = () => {
  const context = useContext(ExperienceContext);
  if (context === undefined) {
    throw new Error('useExperience must be used within an ExperienceProvider');
  }
  return context;
};
