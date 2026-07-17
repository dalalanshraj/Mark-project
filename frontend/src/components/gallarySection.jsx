import { useEffect, useState } from "react";
import api from "../api/axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function GallerySection() {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  const BASE_URL =
    import.meta.env.VITE_API_URL  ;

  const getImageUrl = (path) => {
    if (!path || typeof path !== "string") return "";

    const base = import.meta.env.VITE_API_URL || "";

    if (path.startsWith("http")) return path;

    return base.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
  };

  // ===========================
  // FETCH GALLERY IMAGES
  // ===========================
  useEffect(() => {
    api
      .get("/gallery/published")
      .then((res) => {
        const data = res.data || [];

        const formatted = data.map((img) => getImageUrl(img.image));

        console.log("IMAGES:", formatted);

        setImages(formatted);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  // ===========================
  // AUTO SLIDE
  // ===========================
  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images]);

  // NAVIGATION
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  // ===========================
  // UI STATES
  // ===========================
  if (loading) {
    return <p className="text-center py-20">Loading gallery...</p>;
  }

  if (!images.length) {
    return <p className="text-center py-20">No images found</p>;
  }

  return (
  <section className="relative py-16 lg:py-24 bg-gradient-to-b from-white via-slate-50 to-white">

    <div className="max-w-7xl mx-auto px-5">

      {/* Heading */}

      <div className="text-center mb-12">

       

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
          Property Gallery
        </h2>

           <p className="  text-gray-600 max-w-4xl mx-auto text-lg md:text-xl leading-[2]">
          Explore stunning interiors, breathtaking views, luxurious amenities,
          and everything waiting for you during your stay.
        </p>

      </div>

      {/* Slider */}

      <div className="relative rounded-[32px] overflow-hidden shadow-2xl group">

        {/* Images */}

        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              className="relative w-full flex-shrink-0"
            >

              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                className="
                  w-full
                  h-[280px]
                  sm:h-[420px]
                  lg:h-[620px]
                  object-cover
                  duration-700
                  group-hover:scale-105
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

            </div>
          ))}
        </div>

        {/* Counter */}

        <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-full font-semibold">
          {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </div>

        {/* Previous */}

        <button
          onClick={prevSlide}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            w-12
            h-12
            rounded-full
            bg-white/20
            backdrop-blur-lg
            border
            border-white/20
            text-white
            flex
            items-center
            justify-center
            hover:bg-white
            hover:text-black
            duration-300
          "
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next */}

        <button
          onClick={nextSlide}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            w-12
            h-12
            rounded-full
            bg-white/20
            backdrop-blur-lg
            border
            border-white/20
            text-white
            flex
            items-center
            justify-center
            hover:bg-white
            hover:text-black
            duration-300
          "
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots */}

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">

          {images.map((_, i) => (

            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`
                transition-all
                duration-300
                rounded-full
                ${
                  current === i
                    ? "w-10 h-3 bg-[#FFE600]"
                    : "w-3 h-3 bg-white/60"
                }
              `}
            />

          ))}

        </div>

      </div>

      {/* Button */}

      <div className="flex justify-center mt-12">

        <Link to="/gallery">

          <button
            className="
              group
              bg-[#FFE600]
              hover:bg-slate-900
              hover:text-white
              text-black
              font-semibold
              px-8
              py-4
              rounded-full
              shadow-xl
              transition-all
              duration-300
              hover:scale-105
            "
          >
            View Full Gallery
            <span 
            // className="ml-2 group-hover:translate-x-1 inline-block duration-300"
            >
              →
            </span>
          </button>

        </Link>

      </div>

    </div>

  </section>
);
}
