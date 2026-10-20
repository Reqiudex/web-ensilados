import React, { useState } from 'react'

export const ImageGallery: React.FC = () => {
  const images = Object.values(
    import.meta.glob('/src/assets/*.jpeg', { eager: true, as: 'url' })
  ) as string[]

  const [showAll, setShowAll] = useState(false)

  const handleToggle = () => {
    setShowAll(!showAll)
  }

  const isMobile = window.innerWidth <= 600
  const visibleImages = isMobile && !showAll ? images.slice(0, 2) : images

  return (
    <div className="gallery-wrapper">
      <div className={`gallery ${isMobile && !showAll ? 'clipped' : ''}`}>
        {visibleImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Imagen ${index + 1}`}
            className="gallery-image"
          />
        ))}
      </div>

      {isMobile && !showAll && (
        <div className="fade-overlay">
          <button className="show-button" onClick={handleToggle}>
            VER TODAS LAS FOTOS
          </button>
        </div>
      )}
    </div>
  )
}
