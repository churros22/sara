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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </button>
          <h1 className="text-3xl font-bold">Saraprise</h1>
        </div>

        <div className="max-w-4xl mx-auto glass p-10 rounded-2xl shadow-lg">
          {/* Embed the external HTML page using an iframe */}
          <iframe
            src="./assets/index_saraprise.html"
            title="Saraprise Content"
            className="w-full h-[500px] rounded-lg border border-gray-300"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Saraprise;