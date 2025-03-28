
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Image {
  id: string;
  src: string;
  alt: string;
}

interface ImageGridProps {
  images: Image[];
}

const ImageGrid = ({ images }: ImageGridProps) => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Preload images
  useEffect(() => {
    const imagePromises = images.map((image) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages((prev) => new Set(prev).add(image.id));
          resolve(true);
        };
        img.onerror = () => resolve(false);
        img.src = image.src;
      });
    });
    
    Promise.all(imagePromises);
  }, [images]);

  const openModal = (image: Image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="image-grid-item group cursor-pointer"
            onClick={() => openModal(image)}
          >
            <div className="aspect-square overflow-hidden relative">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all z-10" />
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className={cn(
                  "w-full h-full object-cover transition-all duration-300 group-hover:scale-105",
                  loadedImages.has(image.id) ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setLoadedImages(prev => new Set(prev).add(image.id))}
              />
              {!loadedImages.has(image.id) && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" />
          <div 
            className="relative z-10 max-w-5xl max-h-[90vh] overflow-hidden rounded-xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-full object-contain"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 glass rounded-full p-2 animate-hover"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
