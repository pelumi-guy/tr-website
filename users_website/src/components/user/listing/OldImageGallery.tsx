'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiPlayCircle, FiBookmark } from 'react-icons/fi';

import ReactImageGallery, {  ReactImageGalleryItem } from "react-image-gallery";
// import stylesheet if you're not already using CSS @import


export interface GalleryImage {
  id: string | number;
  src: string;
  alt: string;
  type: 'image' | 'video'; // To differentiate content
  videoSrc?: string; // If type is video
}

interface ImageGalleryProps {
  // galleryImages: GalleryImage[];
  galleryImages: string[];
  initialImageIndex?: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ galleryImages }) => {
  // const [currentIndex, setCurrentIndex] = useState(initialImageIndex);
  // const [showVideo, setShowVideo] = useState(false);

  // const imagesForGallery = galleryImages.map(img => {if (img.type == "image") return img.src});

  const imagesForGallery : ReactImageGalleryItem[] = galleryImages
  .map(imageItem => ({
    original: imageItem,
    thumbnail: imageItem,
    originalHeight: 400,
    originalWidth: 400,
    sizes: 400
  }));

  if (!galleryImages || galleryImages.length === 0) {
    return <div className="image-gallery-placeholder">No images available.</div>;
  }

  return (
    <div className="image-gallery-container">
      <ReactImageGallery items={imagesForGallery}
       showIndex autoPlay
      />;
      {/* <div className="main-image-wrapper shadow-sm position-relative"> */}
      {/* {showVideo && currentImage.type === 'video' && currentImage.videoSrc ? (
          <video src={currentImage.videoSrc} controls autoPlay className="main-gallery-media" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        ) : (
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            layout="fill"
            objectFit="cover" // or "contain" depending on desired look
            priority // Prioritize loading the main image
            className="main-gallery-media"
          />
        )} */}

      {/* Navigation Arrows */}
      {/* {images.length > 1 && (
          <>
            <button onClick={goToPrevious} className="gallery-nav prev-btn" aria-label="Previous image">
              <FiChevronLeft size={32} />
            </button>
            <button onClick={goToNext} className="gallery-nav next-btn" aria-label="Next image">
              <FiChevronRight size={32} />
            </button>
          </>
        )} */}

      {/* Overlays: Bookmark and Play */}
      {/* <button className="gallery-overlay-btn bookmark-icon-btn" aria-label="Bookmark this property">
          <FiBookmark size={24} />
        </button>
        {currentImage.type === 'video' && !showVideo && (
          <button onClick={handlePlayClick} className="gallery-overlay-btn play-icon-btn" aria-label="Play video">
            <FiPlayCircle size={64} />
          </button>
        )} */}
      {/* </div> */}

      {/* Thumbnails */}
      {/* {images.length > 1 && (
        <div className="thumbnails-wrapper mt-3 d-flex flex-wrap justify-content-start">
          {images.map((img, index) => (
            <div
              key={img.id}
              className={`thumbnail-item ${index === currentIndex ? 'active' : ''}`}
              onClick={() => selectImage(index)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && selectImage(index)}
              aria-label={`View image ${index + 1}: ${img.alt}`}
            >
              <Image src={img.src} alt={img.alt} width={100} height={75} objectFit="cover" />
              {img.type === 'video' && <FiPlayCircle size={24} className="thumbnail-play-icon" />}
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default ImageGallery;


interface ReactImageGalleryItem {
  original: string;
  thumbnail?: string;
  description?: string;
  // ... and other optional properties
}