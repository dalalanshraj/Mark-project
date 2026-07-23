import React from "react";
import { Link } from "react-router-dom";
import { IoLocationOutline , IoBedOutline } from "react-icons/io5";
import { PiBathtub } from "react-icons/pi";
import { MdPeopleOutline } from "react-icons/md";
 

const PropertyCard = ({ listing }) => {
  if (!listing) return null;

  const getImageUrl = (photo) => {
    const base = import.meta.env.VITE_API_URL || "";

    // new object format
    if (photo?.url) {
      if (photo.url.startsWith("http")) {
        return photo.url;
      }

      return base.replace(/\/$/, "") + "/" + photo.url.replace(/^\//, "");
    }

    // old string fallback
    if (typeof photo === "string") {
      if (photo.startsWith("http")) {
        return photo;
      }

      return base.replace(/\/$/, "") + "/" + photo.replace(/^\//, "");
    }

    return "https://via.placeholder.com/400x300?text=No+Image";
  };

  // IMAGE
  const image = getImageUrl(listing?.photos?.[0]);

  // PRICE
  const originalPrice = listing?.rates?.[0]?.nightly || null;
  const dealPrice = listing?.deal?.discountedRate;

  return (
    <Link to={`/${listing?._id}`} className="block h-full">
     <div className="relative group bg-white rounded-[28px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 h-full flex flex-col"> 
        {/* DEAL RIBBON */}
      {listing?.deal && (
  <div className="absolute top-7 -left-15 z-20 rotate-[-45deg]">
    <div className="bg-gradient-to-r from-red-600 via-red-500  to-orange-500 text-white   font-bold text-[10px] uppercase tracking-wider px-12 py-2 shadow-2xl">
      <p className="mx-4 ">Special Deal</p> 
    </div>
  </div>
)}
        {/* IMAGE */}
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={listing?.property?.title}
            className=" w-full h-72 object-cover duration-700 group-hover:scale-110 "
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Heart */}

          {/* <button className=" absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center hover:scale-110 duration-300 ">
            ❤️
          </button> */}

          {/* Rating */}

          {/* <div className=" absolute top-4 left-4 bg-white rounded-full px-3 py-1 text-sm font-semibold shadow ">
            ⭐ 4.9
          </div> */}

          {/* Price */}

          {/* <div className=" absolute bottom-4 right-4 bg-[#F8F812] rounded-full px-5 py-2 font-bold shadow-xl ">
            ${dealPrice || originalPrice}
            <span className="text-sm font-normal">/night</span>
          </div> */}
        </div>

        {/* CONTENT */}
        <div className="p-6 flex flex-col flex-grow">
          {/* TITLE */}
          <h3 className=" text-2xl font-bold line-clamp-2 group-hover:text-[#44AAD8] duration-300 ">
            {listing?.property?.title}
          </h3>

          <p className="text-gray-900 mt-2 flex gap-1"><IoLocationOutline size={22} className="mt-0" /> {listing.location?.address || "Location"}</p>

          {/* PRICE */}
          <div className="flex gap-21 text-gray-600 text-sm mt-5">
            <div className="flex text-[16px] gap-1"> <IoBedOutline size={25}/> {listing?.property?.bedrooms || 3} Beds</div>

           <div className="flex text-[16px] gap-1"><PiBathtub size={25}/> {listing?.property?.bathrooms || 2} Baths</div>

            <div className="flex text-[16px] gap-1"><MdPeopleOutline size={25}/> {listing?.property?.maxSleeps || 8}</div>
          </div>

          {/* BUTTON */}
          <div className="mt-6">
            <div className=" flex justify-between items-center bg-[#1B252F] text-white rounded-xl px-5 py-3 group-hover:bg-[#44AAD8] duration-300 ">
              <span>View Details</span>

              <span className=" group-hover:translate-x-2 duration-300 ">
                →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
