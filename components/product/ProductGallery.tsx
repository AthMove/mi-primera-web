"use client";

import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";

type ProductGalleryProps = {
  title: string;
  images: string[];
  selectedImage: string;
  conditionLabel: string;
  featured?: boolean;
  isFavorite: boolean;
  mousePosition: {
    x: number;
    y: number;
  };
  onSelectImage: (image: string) => void;
  onToggleFavorite: () => void;
  onImageMove: (event: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
};

export default function ProductGallery({
  title,
  images,
  selectedImage,
  conditionLabel,
  featured = false,
  isFavorite,
  mousePosition,
  onSelectImage,
onToggleFavorite,
onImageMove,
onMouseLeave,
}: ProductGalleryProps) {
  const safeImage = (src?: string) => {
    return src?.startsWith("http") || src?.startsWith("/")
      ? src
      : "/logo.png";
  };

  const [fullscreen, setFullscreen] = useState(false);

  const currentIndex = images.findIndex(
  (image) => image === selectedImage
);


useEffect(() => {
  images.forEach((image) => {
    const img = new window.Image();
    img.src = safeImage(image);
  });
}, [images]);

const goToPrevious = () => {
  const index =
    currentIndex <= 0 ? images.length - 1 : currentIndex - 1;

  onSelectImage(images[index]);
};

const goToNext = () => {
  const index =
    currentIndex >= images.length - 1 ? 0 : currentIndex + 1;

  onSelectImage(images[index]);
};

useEffect(() => {
  if (!fullscreen) return;

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Escape":
        setFullscreen(false);
        break;

      case "ArrowLeft":
        goToPrevious();
        break;

      case "ArrowRight":
        goToNext();
        break;
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [fullscreen, currentIndex]);

  return (
    <div className="product-gallery">
<div
  className="product-gallery-main"
  onMouseMove={onImageMove}
  onMouseLeave={onMouseLeave}
  onClick={() => setFullscreen(true)}
  style={{
    "--glow-x": `${mousePosition.x}%`,
    "--glow-y": `${mousePosition.y}%`,
  } as React.CSSProperties}
>
        <div className="product-gallery-badges">
          <span className="product-gallery-condition">
            {conditionLabel}
          </span>

          {featured && (
            <span className="product-gallery-featured">
              Selección ATHMOV
            </span>
          )}
          {images.length > 1 && (
  <div className="gallery-counter">
    {currentIndex + 1} / {images.length}
  </div>
)}
        </div>

        <button
          type="button"
          className={`product-gallery-favorite ${
            isFavorite ? "is-active" : ""
          }`}
          onClick={onToggleFavorite}
          aria-label={
            isFavorite
              ? "Eliminar de favoritos"
              : "Añadir a favoritos"
          }
          aria-pressed={isFavorite}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 20.5S4 16 4 9.8C4 6.6 6.2 5 8.4 5c1.5 0 2.9.8 3.6 2 0 0 1.3-2 3.6-2C17.8 5 20 6.6 20 9.8c0 6.2-8 10.7-8 10.7Z" />
          </svg>
        </button>

        <div className="product-gallery-glow" />

      <img
  key={selectedImage}
  src={safeImage(selectedImage)}
  alt={title || "Producto ATHMOV"}
  className="product-gallery-image product-gallery-image-fade"
style={{
  objectPosition: `${mousePosition.x}% ${mousePosition.y}%`,
  transform: `
    perspective(1400px)
    rotateY(${(mousePosition.x - 50) / 12}deg)
    rotateX(${-(mousePosition.y - 50) / 12}deg)
    scale(1.03)
  `,
}}
/>
      </div>

      {images.length > 1 && (
        <div className="product-gallery-thumbs">
          {images.map((image, index) => {
            const selected = selectedImage === image;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                className={`product-gallery-thumb ${
                  selected ? "is-selected" : ""
                }`}
                onClick={() => onSelectImage(image)}
                aria-label={`Ver imagen ${index + 1}`}
              >
                <Image
                  src={safeImage(image)}
                  alt={`${title} ${index + 1}`}
                  fill
                  sizes="180px"
                  style={{
                    objectFit: "contain",
                    padding: "14px",
                  }}
                />
              </button>
            );
          })}
        </div>
      )}

      {fullscreen && (
  <div
    className="gallery-fullscreen"
    onClick={() => setFullscreen(false)}
  >
   {images.length > 1 && (
  <>
    <button
      type="button"
      className="gallery-arrow gallery-arrow-left"
      onClick={(event) => {
        event.stopPropagation();
        goToPrevious();
      }}
      aria-label="Imagen anterior"
    >
      ‹
    </button>

    <button
      type="button"
      className="gallery-arrow gallery-arrow-right"
      onClick={(event) => {
        event.stopPropagation();
        goToNext();
      }}
      aria-label="Imagen siguiente"
    >
      ›
    </button>
  </>
)}

    <img
      src={safeImage(selectedImage)}
      alt={title}
      className="gallery-fullscreen-image"
    />
  </div>
)}

      <style jsx>{`

      .gallery-counter{
  position:absolute;
  bottom:22px;
  right:22px;
  z-index:5;

  padding:10px 16px;

  border-radius:999px;

  background:rgba(17,17,17,.72);
  color:#fff;

  backdrop-filter:blur(18px);
  -webkit-backdrop-filter:blur(18px);

  font-size:13px;
  font-weight:600;
  letter-spacing:.04em;
}
        .product-gallery {
          min-width: 0;
        }

        .product-gallery-main {
          position: relative;
          width: 100%;
          min-height: 720px;
          overflow: hidden;
          border: 1px solid rgba(17, 17, 17, 0.05);
          border-radius: 42px;
          background:
            radial-gradient(
              circle at 50% 28%,
              #ffffff 0%,
              #fcfcfb 28%,
              #f5f5f2 58%,
              #ecece8 100%
            );
          box-shadow: 0 45px 140px rgba(0, 0, 0, 0.12);
          cursor: zoom-in;
        }

        .product-gallery-badges {
          position: absolute;
          top: 22px;
          left: 22px;
          z-index: 5;
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
        }

        .product-gallery-condition,
        .product-gallery-featured {
          display: inline-flex;
          min-height: 36px;
          align-items: center;
          padding: 0 14px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .product-gallery-condition {
          border: 1px solid rgba(255, 255, 255, 0.7);
          background: rgba(255, 255, 255, 0.82);
          color: #141414;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .product-gallery-featured {
          border: 1px solid rgba(17, 17, 17, 0.85);
          background: rgba(17, 17, 17, 0.92);
          color: #ffffff;
        }

        .product-gallery-favorite {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 5;
          display: grid;
          width: 48px;
          height: 48px;
          place-items: center;
          padding: 0;
          border: 1px solid rgba(255, 255, 255, 0.75);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.82);
          color: #161616;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          cursor: pointer;
          transition:
            transform 250ms ease,
            background 250ms ease;
        }

        .product-gallery-favorite:hover {
          transform: scale(1.07);
          background: #ffffff;
        }

        .product-gallery-favorite svg {
          width: 21px;
          height: 21px;
          fill: transparent;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: fill 250ms ease;
        }

        .product-gallery-favorite.is-active svg {
          fill: currentColor;
        }

  .product-gallery-glow {
  position: absolute;
  z-index: 1;
  width: 560px;
  height: 560px;
  border-radius: 50%;
  background: rgba(255,255,255,.76);
  filter: blur(125px);
  pointer-events: none;

  left: var(--glow-x, 50%);
  top: var(--glow-y, 50%);

  transform: translate(-50%, -50%);
  transition:
    left .18s ease,
    top .18s ease;
}

        .product-gallery-image {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 720px;
          padding: 56px;
          object-fit: contain;
          filter: drop-shadow(0 45px 75px rgba(0, 0, 0, 0.19));
          transform: scale(1);
transition:
  transform 180ms ease-out,
  object-position 180ms ease-out,
  filter 250ms ease;
        }

        .product-gallery-thumbs {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-top: 18px;
        }

        .product-gallery-thumb {
          position: relative;
          height: 138px;
          overflow: hidden;
          padding: 0;
          border: 1px solid rgba(17, 17, 17, 0.07);
          border-radius: 24px;
          background: linear-gradient(180deg, #ffffff, #f4f4f0);
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.05);
          cursor: pointer;
          transition:
            transform 280ms ease,
            box-shadow 280ms ease,
            border-color 280ms ease;
        }

        .product-gallery-thumb:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 55px rgba(0, 0, 0, 0.09);
        }

        .product-gallery-thumb.is-selected {
          border-color: #111111;
          box-shadow:
            0 0 0 1px #111111,
            0 18px 50px rgba(0, 0, 0, 0.08);
        }

        .gallery-fullscreen{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.96);
  z-index:9999;

  display:flex;
  justify-content:center;
  align-items:center;

  animation:fadeIn .25s ease;
}

.gallery-fullscreen-image{
  max-width:92vw;
  max-height:90vh;
  object-fit:contain;
}

.gallery-close{
  position:absolute;
  top:26px;
  right:26px;

  width:54px;
  height:54px;

  border:none;
  border-radius:50%;

  background:rgba(255,255,255,.12);
  color:#fff;

  font-size:24px;
  cursor:pointer;
}
  .gallery-arrow{
  position:absolute;
  top:50%;
  transform:translateY(-50%);

  width:62px;
  height:62px;

  border:none;
  border-radius:50%;

  background:rgba(255,255,255,.12);
  color:white;

  font-size:42px;
  cursor:pointer;

  transition:all .25s ease;
}

.gallery-arrow:hover{
  background:rgba(255,255,255,.22);
  transform:translateY(-50%) scale(1.08);
}

.gallery-arrow-left{
  left:32px;
}

.gallery-arrow-right{
  right:32px;
}

@keyframes fadeIn{
  from{
    opacity:0;
  }

  to{
    opacity:1;
  }
}

        @media (max-width: 1000px) {
          .product-gallery-main {
            min-height: 560px;
          }
            .product-gallery-main:hover .product-gallery-image {
  filter: drop-shadow(0 55px 90px rgba(0, 0, 0, 0.24));
}

          .product-gallery-image {
            height: 560px;
          }
        }

        @media (max-width: 700px) {
          .product-gallery-main {
            min-height: 420px;
            border-radius: 28px;
            cursor: default;
          }

          .product-gallery-image {
            height: 420px;
            padding: 28px;
            object-position: center !important;
            transform: none !important;
          }

          .product-gallery-main:hover .product-gallery-image {
            transform: none;
          }

          .product-gallery-badges {
            top: 15px;
            left: 15px;
          }

          .product-gallery-condition,
          .product-gallery-featured {
            min-height: 31px;
            padding: 0 11px;
            font-size: 9px;
          }

          .product-gallery-favorite {
            top: 14px;
            right: 14px;
            width: 42px;
            height: 42px;
          }

          .product-gallery-thumbs {
            gap: 10px;
          }

          .product-gallery-thumb {
            height: 88px;
            border-radius: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .product-gallery-image,
          .product-gallery-favorite,
          .product-gallery-thumb {
            transition: none;
          }
        }
          .product-gallery-image-fade{
  animation: imageFade .35s ease;
}

@keyframes imageFade{
  from{
    opacity:0;
    transform:scale(.97);
  }

  to{
    opacity:1;
    transform:scale(1);
  }
      `}</style>
    </div>
  );
}