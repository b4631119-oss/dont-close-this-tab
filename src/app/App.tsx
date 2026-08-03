
import { ExperienceProvider } from './providers/ExperienceProvider';
import { StoryManager } from '@/features/StoryManager/StoryManager';
import { NotificationSystem } from '@/widgets/NotificationSystem/NotificationSystem';
import { MobileLockScreen } from '@/widgets/MobileLockScreen/MobileLockScreen';
import { useIsMobile } from '@/shared/hooks/useIsMobile';

const App = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileLockScreen />;
  }

  return (
    <ExperienceProvider>
      <StoryManager />
      <NotificationSystem />
    </ExperienceProvider>
  );
};

export default App;
