
# Sara's Birthday Website

A personalized birthday website for Sara with interactive sections and customizable content.

## Features

- **Entry Screen**: Requires Sara's birthday (11-04) to access
- **Welcome Screen**: Personalized welcome message with background music
- **Four Interactive Sections**:
  - **Saranterest**: Pinterest-inspired image grid
  - **Googolu**: Custom Google-like search results with compliments
  - **Saratify**: Spotify-inspired music player
  - **Saraprise**: Space for custom surprise content

## How to Customize

### Adding Images for Saranterest

1. Place your images in the `/public/assets/images/` folder
2. Update the `dummyImages` array in `src/pages/Saranterest.tsx` with your image paths

### Modifying Compliments in Googolu

1. Edit the `searchResults` array in `src/pages/Googolu.tsx`
2. Update titles and descriptions with personalized compliments and achievements

### Adding Songs in Saratify

1. Place audio files in `/public/assets/audio/` folder
2. Place cover images in `/public/assets/images/` folder
3. Update the `songs` array in `src/pages/Saratify.tsx` with:
   - Song titles
   - Artist names
   - File paths
   - Cover image paths
   - Custom lyrics or messages

### Customizing the Saraprise Page

1. Open `src/pages/Saraprise.tsx`
2. Locate the div with `id="custom-content"`
3. Replace the placeholder content with your custom HTML
4. Add images, videos, messages, or any other content

## Asset Organization

Create the following folders in the `/public` directory:
- `/public/assets/images/` - For all images
- `/public/assets/audio/` - For music files
- `/public/assets/videos/` - For video content (if needed)

## Running the Project

```sh
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## Technical Details

This project is built with:
- React
- TypeScript
- Tailwind CSS
- React Router

The code is structured for easy customization with clear comments indicating where to add your personal content.
