
import { AnimatePresence } from 'framer-motion';
import { useExperience } from '@/app/providers/ExperienceProvider';
import { OpeningSequence } from '@/widgets/OpeningSequence/OpeningSequence';
import { UserSelection } from '@/widgets/UserSelection/UserSelection';
import { MoodInteraction } from '@/widgets/MoodInteraction/MoodInteraction';
import { MathGame } from '@/widgets/MathGame/MathGame';
import { QuizGame } from '@/widgets/QuizGame/QuizGame';
import { ReactionGame } from '@/widgets/ReactionGame/ReactionGame';
import { FinalScene } from '@/widgets/FinalScene/FinalScene';

export const StoryManager = () => {
  const { stage } = useExperience();

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        {stage === 'INTRO' && <OpeningSequence key="intro" />}
        {stage === 'USER_SELECTION' && <UserSelection key="user-selection" />}
        {stage === 'MOOD_INTERACTION' && <MoodInteraction key="mood" />}
        {stage === 'MATH_GAME' && <MathGame key="math" />}
        {stage === 'HTML_CSS_QUIZ' && <QuizGame key="quiz" />}
        {stage === 'REACTION_GAME' && <ReactionGame key="reaction" />}
        {stage === 'FINAL_SCENE' && <FinalScene key="final" />}
      </AnimatePresence>
    </div>
  );
};
