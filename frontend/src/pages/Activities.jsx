import React, { useEffect, useState } from "react";
import FeaturedActivities from "../components/FeaturedActivitiesCard";
import api from "../api/axios";
import herobg from "../assets/herobg.jpg";
import herobg2 from "../assets/herobg2.jpg";

export default function Activities() {
  const [loading, setLoading] = useState(true);
  const [galleryImages, setGalleryImages] = useState([]);
  const [images, setImages] = useState([]);

  const getImageUrl = (path) => {
    if (!path) return "/placeholder.png";
    if (path.startsWith("http")) return path;
    return `${import.meta.env.VITE_API_URL}/${path.replace(/^\//, "")}`;
  };

  useEffect(() => {
    api
      .get("/gallery/published")
      .then((res) => {
        setGalleryImages(res.data || []);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  const image = galleryImages?.[1]?.image
    ? getImageUrl(galleryImages[0].image)
    : "https://via.placeholder.com/600x400";

  const heroImage = galleryImages[0]?.image
    ? getImageUrl(galleryImages[0].image)
    : herobg;

  return (
    <>
      <section
             className="relative h-[60vh] md:h-[70vh]  bg-cover bg-center flex items-center justify-center text-white"
             style={{
                 backgroundImage: `url(${herobg2})`,
               }}
           >

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative text-center px-4 mt-32">
          <h1 className="text-4xl md:text-7xl font-bold">Things To Do</h1>
        </div>
      </section>

      {/* Show ALL Activities */}
      <FeaturedActivities />
    </>
  );
}
