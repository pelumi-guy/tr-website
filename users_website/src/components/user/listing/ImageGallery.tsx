// components/ImageGallery.tsx
'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import ReactImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; // Import the stylesheet
import { FiPlayCircle } from 'react-icons/fi';

// This is the prop type from your page component
export interface GalleryImage {
  id: string | number;
  src: string;
  alt: string;
  type: 'image' | 'video';
  videoSrc?: string;
}

interface ImageGalleryProps {
  galleryImages: GalleryImage[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ galleryImages }) => {
  // 1. State to control what is displayed: the image gallery or the video player
  const [displayMode, setDisplayMode] = useState<'image' | 'video'>('image');

  // 2. State to track the active image index (for highlighting our custom thumbnail)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 3. A ref to control the ReactImageGallery component from our custom thumbnails
  const galleryRef = useRef<ReactImageGallery>(null);

  // 4. Separate video and image data from the incoming props
  const videoItem = galleryImages.find(item => item.type === 'video');
  const imageItems = galleryImages.filter(item => item.type === 'image');

  // 5. Prepare the items array specifically for the react-image-gallery library
  const imagesForGallery: ReactImageGalleryItem[] = imageItems.map(image => ({
    original: image.src,
    thumbnail: image.src, // We hide this, but it's good practice to have it
    originalAlt: image.alt,
    thumbnailAlt: image.alt,
    originalHeight: 600
  }));

  // Handler for when one of our custom image thumbnails is clicked
  const handleImageThumbnailClick = (index: number) => {
    setDisplayMode('image'); // Switch display to image mode
    setCurrentImageIndex(index);
    galleryRef.current?.slideToIndex(index); // Tell the gallery to slide to this index
  };

  // Handler for when the video thumbnail is clicked
  const handleVideoThumbnailClick = () => {
    setDisplayMode('video');
  };

  return (
    <div className="custom-gallery-container">
      {/* --- MAIN DISPLAY AREA --- */}
      <div className="main-display-area shadow-sm">
        {displayMode === 'video' && videoItem ? (
          <video
            src={videoItem.videoSrc}
            poster={videoItem.src} // Use thumbnail as poster
            controls
            autoPlay
            muted
            playsInline
            className="main-display-media video-player"
            key={videoItem.id} // Add key to force re-render if video changes
            height={600}
            width={600}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <ReactImageGallery
            ref={galleryRef}
            items={imagesForGallery}
            showThumbnails={false} // IMPORTANT: We are building our own thumbnails
            showPlayButton={true}
            showFullscreenButton={false}
            showBullets={true} // Keep bullets for a nice indicator
            onSlide={(index) => setCurrentImageIndex(index)} // Update our active index state
            lazyLoad
          />
        )}
      </div>

      {/* --- CUSTOM THUMBNAIL AREA --- */}
      <div className="custom-thumbnails-wrapper mt-3 d-flex align-items-center">
        {/* Video Thumbnail (Left) */}
        {videoItem && (
          <div
            className={`custom-thumbnail-item video-thumbnail ${displayMode === 'video' ? 'active' : ''}`}
            onClick={handleVideoThumbnailClick}
            role="button"
          >
            <Image src={videoItem.src} alt={videoItem.alt} width={100} height={75} objectFit="cover" />
            <FiPlayCircle size={32} className="thumbnail-play-icon" />
          </div>
        )}

        {/* Separator */}
        {videoItem && imageItems.length > 0 && <div className="thumbnail-separator mx-2"></div>}

        {/* Image Thumbnails (Right) */}
        <div className="custom-image-thumbnails d-flex flex-wrap">
          {imageItems.map((img, index) => (
            <div
              key={img.id}
              className={`custom-thumbnail-item image-thumbnail ${displayMode === 'image' && index === currentImageIndex ? 'active' : ''}`}
              onClick={() => handleImageThumbnailClick(index)}
              role="button"
            >
              <Image src={img.src} alt={img.alt} width={100} height={75} objectFit="cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;