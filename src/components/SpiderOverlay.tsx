import React, { useEffect, useRef, useState } from "react";

/**
 * SpiderOverlay
 * - Renders a full-viewport spiderweb image (from /freepik__upload__57498.png)
 * - Shows a small prompt that can be dismissed with the "Okay I will" button
 * - The prompt is interactive (pointer-events enabled) while the rest of the overlay
 *   is pointer-events:none so the page remains usable.
 */
const SpiderOverlay: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(true);
  const promptRef = useRef<HTMLDivElement | null>(null);

  // Move focus to prompt when it appears for accessibility
  useEffect(() => {
    if (showPrompt && promptRef.current) {
      // small timeout to ensure element is focusable after mount
      setTimeout(() => promptRef.current?.focus(), 50);
    }
  }, [showPrompt]);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none" aria-hidden={!showPrompt && true}>
      {/* Decorative overlay image. Empty alt because it's a purely decorative effect. */}
      <img
        src="/freepik__upload__57498.png"
        alt=""
        className="pointer-events-none w-full h-full object-cover opacity-60 mix-blend-multiply"
      />

      {/* Prompt — only this box accepts pointer events */}
      {showPrompt && (
        <div
          ref={promptRef}
          role="dialog"
          aria-modal="false"
          tabIndex={-1}
          className="pointer-events-auto fixed left-1/2 bottom-8 transform -translate-x-1/2 max-w-xl w-[90%] bg-white/95 dark:bg-black/80 text-black dark:text-white rounded-lg p-4 shadow-lg border border-slate-200/20"
        >
          <p className="text-sm leading-relaxed">
            The site appears covered in spiderwebs. If you want to remove the spider webs,
            you need to write a message to Yacine or call him.
          </p>

          <div className="mt-3 flex justify-end">
            <button
              onClick={() => setShowPrompt(false)}
              className="inline-flex items-center px-3 py-1.5 bg-sky-600 text-white rounded hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              Okay I will
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpiderOverlay;
