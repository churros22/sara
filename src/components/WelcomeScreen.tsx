
import Home from '@/pages/Home';

// This component is redundant since we're using Home.tsx directly.
// It now just wraps the Home component to avoid any conflicts
const WelcomeScreen = () => {
  return <Home />;
};

export default WelcomeScreen;
