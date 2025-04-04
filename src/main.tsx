
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Use a try-catch block to handle potential errors during rendering
try {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    createRoot(rootElement).render(<App />);
  } else {
    console.error("Root element not found in the DOM");
  }
} catch (error) {
  console.error("Error rendering app:", error);
}
