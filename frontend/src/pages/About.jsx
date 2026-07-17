import { useEffect, useState } from "react";
import api from "../api/axios";
import AboutSection from "../components/homeSection/AboutSection";
import FeaturedActivities from "../components/homeSection/FeaturedActivities";
import herobg from "../assets/herobg.jpg";
import {
  MapPin,
  Home,
  Umbrella,
  Waves,
  UtensilsCrossed,
  Sparkles,
} from "lucide-react";

export default function About({ userId }) {
  const [images, setImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const aboutSectionImage = galleryImages[1]?.image
    ? getImageUrl(galleryImages[1].image)
    : "/placeholder.png";

  const bannerImage = galleryImages[2]?.image
    ? getImageUrl(galleryImages[2].image)
    : herobg;

  const whyChooseUsImage = galleryImages[3]?.image
    ? getImageUrl(galleryImages[3].image)
    : "/placeholder.png";
  return (
    <>
      {/* 🔥 HERO (FIXED IMAGE) */}
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
            About
          </h1>

          {/* <p className="text-gray-200 text-sm sm:text-base max-w-3xl mx-auto">
  Meet Shawn and Eileen O'Sullivan, the proud owners of Beach Therapy 30A in beautiful Grayton Beach, Florida. We are excited to share our slice of paradise with guests from around the world.
</p> */}
        </div>
      </section>

      {/* 🔥 ABOUT SECTION */}
      <AboutSection userId="6a59081d8e08e38026c7b78b" />

      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white">
        {/* FIXED BACKGROUND */}
        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center"
          style={{
            backgroundImage: `url(${bannerImage})`,
          }}
        />

        {/* <div className="absolute inset-0 bg-black/60" /> */}

        <div className="relative text-center px-4 sm:px-6"></div>
      </section>
      {/* 🔥 WHY CHOOSE THIS PROPERTY */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-slate-50 via-white to-slate-100 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="overflow-hidden rounded-[32px] shadow-2xl group">
                <img
                  src={image}
                  alt="Why Choose This Property"
                  className="w-full h-[320px] sm:h-[450px] lg:h-[900px] object-cover duration-700 group-hover:scale-110"
                />
              </div>

              {/* Floating Badge */}

              <div className="absolute bottom-8 left-8 bg-white rounded-2xl shadow-xl px-6 py-4">
                <p className="text-3xl font-bold text-sky-700">4.9 ★</p>

                <p className="text-gray-500 text-sm">Guest Rating</p>
              </div>
            </div>

            {/* Content */}

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
                Why Guests Love
                <span className="block text-sky-700">Staying With Us</span>
              </h2>

              <p className="mt-6 text-gray-600 leading-8 text-lg">
                Experience the perfect blend of luxury, comfort, and
                breathtaking Gulf Coast beauty at our beautifully maintained
                Surfside Resort vacation homes. Wake up to panoramic emerald
                water views, relax on spacious private balconies, and enjoy
                resort-style amenities designed to make every vacation
                unforgettable. Whether you're planning a family getaway, a beach
                vacation with friends, or a peaceful escape, our thoughtfully
                furnished condos provide everything you need for an exceptional
                stay on the Emerald Coast.
              </p>

              {/* Features */}

              <div className="grid sm:grid-cols-2 gap-5 mt-10">
                <div className="flex gap-4 p-5 rounded-2xl bg-white shadow-md hover:shadow-xl duration-300">
                  <MapPin className="text-sky-700 mt-1" />
                  <div>
                    <h4 className="font-bold">Prime Beachfront Location</h4>
                    <p className="text-gray-500 text-sm">
                      Private beach access with stunning Gulf views.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-2xl bg-white shadow-md hover:shadow-xl duration-300">
                  <Home className="text-sky-700 mt-1" />
                  <div>
                    <h4 className="font-bold">Spacious Family Condo</h4>
                    <p className="text-gray-500 text-sm">
                      Three bedrooms, three bathrooms, sleeps up to 12 guests.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-2xl bg-white shadow-md hover:shadow-xl duration-300">
                  <Umbrella className="text-sky-700 mt-1" />
                  <div>
                    <h4 className="font-bold">Complimentary Beach Service</h4>
                    <p className="text-gray-500 text-sm">
                      Seasonal beach chairs and umbrellas included with your
                      stay.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-2xl bg-white shadow-md hover:shadow-xl duration-300">
                  <Waves className="text-sky-700 mt-1" />
                  <div>
                    <h4 className="font-bold">Luxury Resort Amenities</h4>
                    <p className="text-gray-500 text-sm">
                      Pool, hot tubs, fitness center, tennis & pickleball
                      courts.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-2xl bg-white shadow-md hover:shadow-xl duration-300 sm:col-span-2">
                  <UtensilsCrossed className="text-sky-700 mt-1" />
                  <div>
                    <h4 className="font-bold">
                      Dining, Shopping & Entertainment
                    </h4>
                    <p className="text-gray-500 text-sm">
                      Conveniently located near award-winning restaurants,
                      shopping centers, golf courses, scenic walking trails,
                      family attractions, and everything the beautiful Emerald
                      Coast has to offer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <FeaturedActivities />
    </>
  );
}
