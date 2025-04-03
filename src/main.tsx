
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Get the DOM element where our app will be mounted
const rootElement = document.getElementById("root")

// Only mount if the element exists
if (rootElement) {
  try {
    createRoot(rootElement).render(<App />);
    console.log("App successfully mounted");
  } catch (error) {
    console.error("Failed to render App:", error);
  }
} else {
  console.error("Root element not found. Make sure there is a div with id 'root' in the HTML.");
}
