
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Get the DOM element where our app will be mounted
const rootElement = document.getElementById("root")

// Only mount if the element exists
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found. Make sure there is a div with id 'root' in the HTML.");
}
