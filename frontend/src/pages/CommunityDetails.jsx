import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import PropertyCard from "../components/PropertyCard";

export default function CommunityDetails() {
  const { slug } = useParams();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // COMMUNITY DATA
  const communityData = {
    "crystal-sands": {
      title: "Crystal Sands",

      description:
        "You can't describe the view from this unit. The sugar white sand, emerald green water and activity on the water and the sun setting in the evening leaves one wishing they had more time to enjoy Crystal Sands.",

      heroImage:
        "https://donnadanielrealty.com/gallery-uploads/1779469070677-606811805.webp",
    },

    mediterranea: {
      title: "Mediterranea",

      description:
        "The Mediterrania is very special and is designed with luxury in mind. It is close to wonderful restaurants, shopping, near Pompano Joes, and just minutes from the outlet mall and Destin Commons.",

      heroImage:
        "https://donnadanielrealty.com/gallery-uploads/1779469935010-248028726.webp",
    },
  };

  const currentCommunity =
    communityData[slug] || {};

  useEffect(() => {
    fetchProperties();
  }, [slug]);

  const fetchProperties = async () => {
    try {
      const res = await api.get(
        "/listings/published"
      );

      const filtered = res.data.filter(
        (item) => {

          const title =
            item.property?.title
              ?.toLowerCase()
              .trim() || "";

          // CRYSTAL SANDS
          if (slug === "crystal-sands") {
            return (
              title.includes("crystal") &&
              title.includes("sand")
            );
          }

          // MEDITERRANEA
          if (slug === "mediterranea") {
            return (
              title.includes("med")
            );
          }

          return false;
        }
      );

      setProperties(filtered);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HERO */}
      <section
        className="relative h-[60vh] md:h-[75vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${currentCommunity.heroImage})`,
        }}
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* CONTENT */}
        <div className="relative z-10 text-center px-4 max-w-4xl">

          <h1 className="text-4xl md:text-6xl font-extrabold mb-5 mt-16">
            {currentCommunity.title}
          </h1>

          {/* <p className="text-lg md:text-xl leading-relaxed text-gray-100">
            {currentCommunity.description}
          </p> */}

        </div>
      </section>

      {/* CONTENT */}
      <div className="bg-gray-100 min-h-screen py-14 px-4 md:px-8">

        <div className="max-w-7xl mx-auto">

          {/* HEADING */}
          <div className="text-center mb-12">

            <h2 className="text-3xl md:text-4xl font-bold text-[#355e73] uppercase">
             {currentCommunity.title}
            </h2>

            <p className="text-gray-500 mt-3 text-lg">
              Explore vacation rentals in{" "}
              {currentCommunity.description}
            </p>

          </div>

          {/* LOADING */}
          {loading && (
            <div className="text-center text-lg">
              Loading properties...
            </div>
          )}

          {/* EMPTY */}
          {!loading &&
            properties.length === 0 && (
              <div className="text-center text-red-500 text-lg">
                No properties found
              </div>
            )}

          {/* PROPERTY GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {properties.map((listing) => (

              <PropertyCard
                key={listing._id}
                listing={listing}
              />

            ))}

          </div>

        </div>

      </div>
    </>
  );
}