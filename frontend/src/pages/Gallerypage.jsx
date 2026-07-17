import { useEffect, useState } from "react";
import api from "../api/axios";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import herobg from "../assets/herobg.jpg";
export default function Gallery() {
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const getImageUrl = (path) => {
    if (!path || typeof path !== "string") return "";

    const base = import.meta.env.VITE_API_URL || "";

    if (path.startsWith("http")) return path;

    return base.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
  };

  useEffect(() => {
    api
      .get("/gallery/published")
      .then((res) => {
        setImages(Array.isArray(res.data) ? res.data : []);
      })
      .catch(console.log);
  }, []);

  // HERO IMAGE
  const image1 =
    getImageUrl(images[0]?.image) ||
    "https://beachtherapy30a.com/gallery-uploads/1779828994964-193545868.webp";

  // ============================
  // SLIDER FUNCTIONS
  // ============================

  const closeSlider = () => {
    setActiveIndex(null);
  };

  const nextSlide = () => {
    if (!images.length) return;

    setActiveIndex((current) => {
      if (current === null) return null;

      return (current + 1) % images.length;
    });
  };

  const previousSlide = () => {
    if (!images.length) return;

    setActiveIndex((current) => {
      if (current === null) return null;

      return (current - 1 + images.length) % images.length;
    });
  };

  // ============================
  // KEYBOARD NAVIGATION
  // ============================

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        setActiveIndex(
          (current) => (current + 1) % images.length
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex(
          (current) =>
            (current - 1 + images.length) % images.length
        );
      }

      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = "";
    };
  }, [activeIndex, images.length]);

  return (
    <>
      {/* ================= HERO SECTION ================= */}

      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white overflow-hidden">
        {/* BG IMAGE */}

        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{
            backgroundImage: `url("${herobg}")`,
          }}
        />

        {/* DARK OVERLAY */}

        <div className="absolute inset-0 bg-black/50" />

        {/* CONTENT */}

        <div className="relative z-10 text-center px-4 sm:px-6 mt-34">
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mt-15">
            Our Gallery
          </h1>
        </div>
      </section>

      {/* ================= GALLERY GRID ================= */}

      <section className="bg-white px-6 md:px-16 py-16">
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((img, index) => (
            <div
              key={img._id || index}
              className="
                relative
                break-inside-avoid
                overflow-hidden
                rounded-2xl
                group
                cursor-pointer
              "
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={getImageUrl(img.image)}
                alt={`Gallery ${index + 1}`}
                loading="lazy"
                className="
                  block
                  w-full
                  h-auto
                  rounded-2xl
                  transition-transform
                  duration-700
                  group-hover:scale-110
                "
                onError={(event) => {
                  console.log(
                    "Gallery IMG ERROR:",
                    event.currentTarget.src
                  );

                  event.currentTarget.onerror = null;
                  event.currentTarget.src = "/placeholder.png";
                }}
              />

              {/* OVERLAY */}

              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition pointer-events-none" />
            </div>
          ))}
        </div>
      </section>

      {/* ================= LIGHTBOX SLIDER ================= */}

      {activeIndex !== null && images[activeIndex] && (
        <div
          className="
            fixed
            inset-0
            bg-black/95
            flex
            items-center
            justify-center
            z-[99999]
            overflow-hidden
          "
          onClick={closeSlider}
        >
          {/* CLOSE BUTTON */}

          <button
            type="button"
            aria-label="Close gallery"
            onClick={(event) => {
              event.stopPropagation();
              closeSlider();
            }}
            className="
              absolute
              top-5
              right-5
              md:top-7
              md:right-8
              z-50

              w-11
              h-11

              flex
              items-center
              justify-center

              rounded-full

              bg-white/15
              backdrop-blur-md

              text-white

              hover:bg-white
              hover:text-black

              transition
            "
          >
            <X size={26} />
          </button>

          {/* IMAGE COUNTER */}

          <div
            className="
              absolute
              top-6
              left-1/2
              -translate-x-1/2
              z-40

              px-4
              py-2

              rounded-full

              bg-black/50
              backdrop-blur-md

              text-white
              text-sm
            "
          >
            {activeIndex + 1} / {images.length}
          </div>

          {/* PREVIOUS BUTTON */}

          {images.length > 1 && (
            <button
              type="button"
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation();
                previousSlide();
              }}
              className="
                absolute
                left-2
                sm:left-4
                md:left-8

                top-1/2
                -translate-y-1/2

                z-50

                w-11
                h-11

                md:w-14
                md:h-14

                flex
                items-center
                justify-center

                rounded-full

                bg-white/15
                backdrop-blur-md

                text-white

                hover:bg-white
                hover:text-black

                transition
              "
            >
              <ChevronLeft className="w-7 h-7 md:w-9 md:h-9" />
            </button>
          )}

          {/* ACTIVE IMAGE */}

          <div
            className="
              w-full
              h-full

              px-14
              sm:px-16
              md:px-28

              py-20

              flex
              items-center
              justify-center
            "
            onClick={(event) => event.stopPropagation()}
          >
            <img
              key={images[activeIndex]._id || activeIndex}
              src={getImageUrl(images[activeIndex].image)}
              alt={`Gallery preview ${activeIndex + 1}`}
              draggable={false}
              className="
                block

                max-w-full
                max-h-full

                w-auto
                h-auto

                object-contain

                rounded-xl

                select-none
              "
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/placeholder.png";
              }}
            />
          </div>

          {/* NEXT BUTTON */}

          {images.length > 1 && (
            <button
              type="button"
              aria-label="Next image"
              onClick={(event) => {
                event.stopPropagation();
                nextSlide();
              }}
              className="
                absolute
                right-2
                sm:right-4
                md:right-8

                top-1/2
                -translate-y-1/2

                z-50

                w-11
                h-11

                md:w-14
                md:h-14

                flex
                items-center
                justify-center

                rounded-full

                bg-white/15
                backdrop-blur-md

                text-white

                hover:bg-white
                hover:text-black

                transition
              "
            >
              <ChevronRight className="w-7 h-7 md:w-9 md:h-9" />
            </button>
          )}
        </div>
      )}
    </>
  );
}