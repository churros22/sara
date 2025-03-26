
import { useNavigate } from "react-router-dom";

const Saraprise = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sara-pink/20 via-background to-sara-purple/20">
      <div className="container py-8">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full hover:bg-muted transition-colors mr-4"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
            </svg>
          </button>
          <h1 className="text-3xl font-bold">Saraprise</h1>
        </div>

        <div className="max-w-4xl mx-auto glass p-10 rounded-2xl shadow-lg">
          {/* This is a placeholder for your custom HTML content */}
          <div id="custom-content" className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-6 text-center">Your Special Surprise</h2>
            
            <p className="text-center mb-8">This space is reserved for your custom message, photos, videos, or any other content you'd like to add for Sara.</p>
            
            <div className="flex justify-center">
              <div className="glass rounded-xl p-6 animate-pulse-gentle">
                <p className="text-lg font-medium">Coming soon...</p>
                <p className="text-muted-foreground">Check back on your birthday!</p>
              </div>
            </div>
            
            {/* Instructions for customization */}
            <div className="mt-16 p-6 border border-dashed border-muted rounded-lg bg-muted/20">
              <h3 className="text-xl font-semibold mb-4">Customization Instructions</h3>
              <p>To add your own custom content to this page:</p>
              <ol className="list-decimal list-inside space-y-2 mt-2">
                <li>Open the file <code>src/pages/Saraprise.tsx</code></li>
                <li>Locate the div with id="custom-content"</li>
                <li>Replace the placeholder content with your own HTML</li>
                <li>You can add images, videos, text, or any other content here</li>
                <li>For images, place them in the <code>/assets/images/</code> folder</li>
                <li>For videos, place them in the <code>/assets/videos/</code> folder</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saraprise;
