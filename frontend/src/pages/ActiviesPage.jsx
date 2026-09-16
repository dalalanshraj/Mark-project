import React from "react";
import { Link } from "react-router-dom";
import {
  FaUmbrellaBeach,
  FaFish,
  FaGolfBall,
  FaShoppingBag,
} from "react-icons/fa";
import { MdRestaurant } from "react-icons/md";

 
import FeaturedActivities from "./FeaturedActivities";

const categories = [
  {
    title: "Water Adventures",
    icon: <FaUmbrellaBeach />,
    description:
      "Jet skiing, parasailing, dolphin cruises, pontoon rentals, Crab Island adventures and more.",
  },
  {
    title: "Fishing Charters",
    icon: <FaFish />,
    description:
      "Experience world-class deep sea fishing and inshore charters with experienced local captains.",
  },
  {
    title: "Championship Golf",
    icon: <FaGolfBall />,
    description:
      "Play some of Florida's most beautiful golf courses surrounded by emerald waters.",
  },
  {
    title: "Restaurants",
    icon: <MdRestaurant />,
    description:
      "Fresh Gulf seafood, waterfront dining, family restaurants and local favourites.",
  },
  {
    title: "Shopping",
    icon: <FaShoppingBag />,
    description:
      "Browse boutiques, premium outlets and the famous HarborWalk Village.",
  },
];

export default function Activities() {
  return (
    <main className="bg-white overflow-hidden">
      {/* HERO */}

      {/* <section className="relative h-[75vh] min-h-[600px]">
        <img
          src={heroImg}
          alt="Things To Do in Destin"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-5">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#FFE600] text-black font-semibold px-5 py-2 rounded-full mb-6">
              Destin • Florida
            </span>

            <h1
              className="text-white text-5xl md:text-7xl lg:text-8xl leading-tight"
              style={{
                fontFamily: 'Yellowtail, "Yellowtail Fallback", cursive',
              }}
            >
              Things To Do
            </h1>

            <p className="mt-8 text-gray-200 text-lg md:text-xl leading-9 max-w-2xl font-montserrat">
              Whether you're seeking adventure on the water, championship golf,
              incredible restaurants, or unforgettable family attractions,
              Destin offers something for everyone. Discover the very best of
              Florida's Emerald Coast just minutes from your vacation rental.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">
              <Link
                to="/properties"
                className="bg-[#44AAD8] hover:bg-sky-700 duration-300 text-white px-8 py-4 rounded-xl font-semibold"
              >
                Browse Rentals
              </Link>

              <a
                href="#activities"
                className="border border-white text-white hover:bg-white hover:text-black duration-300 px-8 py-4 rounded-xl font-semibold"
              >
                Explore Activities
              </a>
            </div>
          </div>
        </div>
      </section> */}

      {/* INTRO */}

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Explore the Emerald Coast
            </h2>

            <p className="mt-8 text-lg leading-9 text-gray-600">
              From relaxing beach days to exciting outdoor adventures, Destin is
              filled with unforgettable experiences. Enjoy boating, parasailing,
              jet skiing, championship golf, shopping, waterfront restaurants,
              dolphin cruises and much more while creating lasting memories with
              family and friends.
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORY GRID */}

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-7">
            {categories.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl duration-500 p-8 border border-gray-100 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-sky-100 text-[#44AAD8] flex items-center justify-center text-3xl mb-6 group-hover:bg-[#44AAD8] group-hover:text-white duration-300">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4 text-slate-900">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-8">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ACTIVITIES */}

     <FeaturedActivities />
    </main>
  );
}