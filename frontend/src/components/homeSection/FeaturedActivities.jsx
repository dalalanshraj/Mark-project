import React from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";

import img1 from "../../assets/activity-img.jpg";
import img2 from "../../assets/activity-img2.jpg";
import img3 from "../../assets/activity-img3.jpg";
import img4 from "../../assets/activity-img4.jpg";

const activities = [
  {
    id: "big-kahuna-water-park",
    title: "Big Kahuna Water Park",
    location:"Destin Florida",
    description:
      "Spend the day enjoying exciting water slides, lazy rivers, wave pools, and family-friendly attractions at one of Destin's most popular water parks.",
    image: img1,
    type: "Water Park",
  },
  {
    id: "ajs-seafood-oyster-bar",
    title: "AJ’s Seafood & Oyster Bar",
    location:"Destin Florida Restaurants",
    description:
      "Experience fresh Gulf seafood, live music, waterfront dining, and a lively atmosphere at the iconic AJ’s Seafood & Oyster Bar.",
    image: img2,
    type: "Dining",
  },
  {
    id: "big-daddys-bike-rental",
    title: "Big Daddy's Bike Rental",
    location:"30A-Beaches-South Walton",
    description:
      "Explore the scenic 30A trails with quality bike rentals, perfect for families, couples, and outdoor enthusiasts of all ages.",
    image: img3,
    type: "Bike Rental",
  },
  {
    id: "great-southern-cafe",
    title: "Great Southern Cafe",
    location:"30A-Beaches-South Walton Restaurants",
    description:
      "Enjoy Southern-inspired cuisine, fresh local seafood, and a relaxed atmosphere at the award-winning Great Southern Cafe.",
    image: img4, // Replace with a dedicated image if available
    type: "Restaurant",
  },
];

const FeaturedActivities = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-5">

        {/* Heading */}

        <div className="text-center mb-14">
 
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-sky-900 text-center leading-tight">

            Thing To Do
          </h2>

         <p className="  text-gray-600 max-w-4xl mx-auto text-lg md:text-xl leading-[2]">
            Discover unforgettable experiences around the Emerald Coast,
            from relaxing parks to exciting outdoor adventures.
          </p>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">

          {activities.map((item) => (

            <div
              key={item.id}
              className="
              group
              bg-white
              rounded-[28px]
              overflow-hidden
              shadow-lg
              hover:shadow-2xl
              duration-500
              hover:-translate-y-3
              flex
              flex-col
              "
            >

              {/* IMAGE */}

              <div className="relative overflow-hidden">

                <img
                  src={item.image}
                  alt={item.title}
                  className="
                  w-full
                  h-64
                  sm:h-72
                  object-cover
                  duration-700
                  group-hover:scale-110
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                {/* Floating Icon */}

                {/* <div
                  className="
                  absolute
                  top-5
                  right-5
                  w-12
                  h-12
                  rounded-full
                  bg-white/20
                  backdrop-blur-lg
                  border
                  border-white/30
                  flex
                  items-center
                  justify-center
                  text-white
                  text-xl
                  group-hover:rotate-12
                  duration-300
                  "
                >
                  <IoSearch />
                </div> */}

                {/* Badge */}

                <div
                  className="
                  absolute
                  left-5
                  top-5
                  bg-[#FFE600]
                  text-black
                  font-semibold
                  px-4
                  py-2
                  rounded-full
                  text-xs
                  shadow-lg
                  "
                >
                  {item.type}
                </div>

              </div>

              {/* Content */}

              <div className="p-6 flex flex-col flex-1">

                <div className="flex items-center gap-2 text-sky-600 text-sm font-medium mb-3">
                  <HiOutlineLocationMarker />
                  {item.location}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 duration-300">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-7 flex-1">
                  {item.description}
                </p>

                {/* <Link
                  to={`/activity/${item.id}`}
                  className="mt-6"
                >

                  <button
                    className="
                    w-full
                    py-3
                    rounded-xl
                    bg-slate-900
                    text-white
                    font-semibold
                    hover:bg-sky-600
                    duration-300
                    "
                  >
                    Explore Activity →
                  </button>

                </Link> */}

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default FeaturedActivities;