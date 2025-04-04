
// This component is redundant since we're using Home.tsx directly.
// Instead of modifying it, we'll just make it a simple proxy to Home to avoid conflicts.
import Home from '@/pages/Home';

const WelcomeScreen = () => {
  return <Home />;
};

export default WelcomeScreen;
