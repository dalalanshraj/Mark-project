import React, { useEffect, useState } from "react";
import api from "../api/axios.js";
import PropertyCard from "../components/PropertyCard.jsx";
import herobg from "../assets/herobg.jpg";
const SpecialsDeals = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
   const [images, setImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await api.get("/deals/active");
        setListings(res.data || []);
      } catch (err) {
        console.error("Deals fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);
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
      {/* HERO */}
    <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white">
          {/* FIXED BACKGROUND */}
          <div
            className="absolute inset-0 bg-fixed bg-cover bg-center"
            style={{
              backgroundImage: `url(${herobg})`,
            }}
          />
  
          <div className="absolute inset-0 bg-black/60" />
  
          <div className="relative text-center px-4 sm:px-6 mt-34">
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mt-15">
             Specials & Deals
            </h1>
  
            {/* <p className="text-gray-200 text-sm sm:text-base max-w-3xl mx-auto">
    Meet Shawn and Eileen O'Sullivan, the proud owners of Beach Therapy 30A in beautiful Grayton Beach, Florida. We are excited to share our slice of paradise with guests from around the world.
  </p> */}
          </div>
        </section>

      {/* LISTINGS */}
      <div className="p-10 bg-gray-100 min-h-screen">

        {loading && (
          <p className="text-center text-gray-500">
            Loading properties...
          </p>
        )}

        {!loading && listings.length === 0 && (
          <p className="text-center text-red-500">
            No deals available
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {listings.map((listing) => (
            <PropertyCard
              key={listing._id}
              listing={listing}
            />
          ))}
        </div>

      </div>
    </>
  );
};

export default SpecialsDeals;