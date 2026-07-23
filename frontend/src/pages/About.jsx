import { useEffect, useState } from "react";
import api from "../api/axios";
import AboutSection from "../components/homeSection/AboutSection";
import FeaturedActivities from "../components/homeSection/FeaturedActivities";
import herobg from "../assets/herobg.jpg";
import surfsideVideo from "../assets/surfside.mp4";
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

  const image = galleryImages?.[17]?.image
    ? getImageUrl(galleryImages[17].image)
    : "https://www.coastaldreamrentals.com/img/home/d74d56b0-b8ac-4d34-84c0-ede6d2f0569c.jpeg";

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
     const Guestsimg  = galleryImages?.[15]?.image
    ? getImageUrl(galleryImages[15].image)
    : "https://destinbeachcondorentals.com/gallery-uploads/1784561207521-97328694.webp";
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
            About Us
          </h1>

          {/* <p className="text-gray-200 text-sm sm:text-base max-w-3xl mx-auto">
  Meet Shawn and Eileen O'Sullivan, the proud owners of Beach Therapy 30A in beautiful Grayton Beach, Florida. We are excited to share our slice of paradise with guests from around the world.
</p> */}
        </div>
      </section>

           {/* SECTION 1 */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">
      
            {/* Left - Video */}
      
            <div className="order-2 lg:order-1">
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
      
          <video
            src={surfsideVideo}
            className="w-full h-full object-cover rounded-3xl"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
          />
      
        </div>
      </div>
      
            {/* Right - Content */}
      
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h2
                className="mt-6 text-[#2C5A7B] leading-tight text-4xl sm:text-5xl lg:text-6xl"
                style={{
                  fontFamily: 'Yellowtail, "Yellowtail Fallback", cursive',
                }}
              >
                Experience Luxury
                <br />
                Along The Emerald Coast
              </h2>
      
              <p className="mt-8 text-gray-600 text-lg leading-8 font-montserrat">
                Welcome to Paradise Found and Sun N Sea, two beautifully appointed
                beachfront condominiums located at Surfside Beach Resort in
                Miramar Beach, Florida. Whether you're planning a relaxing family
                vacation, a couples' getaway, or a trip with friends, our homes
                provide the perfect combination of comfort, space, and breathtaking
                Gulf Coast scenery.
              </p>
      
              <p className="mt-6 text-gray-600 text-lg leading-8 font-montserrat">
                Enjoy spacious three-bedroom accommodations, oversized private
                balconies, resort-style amenities, and direct access to Surfside's
                private white-sand beach. Every detail has been thoughtfully prepared
                to help you relax, reconnect, and create unforgettable memories on
                Florida's Emerald Coast.
              </p>
      
              {/* Highlights */}
      
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
      
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  <span className="text-gray-700 font-medium">
                    Private Beach Access
                  </span>
                </div>
      
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  <span className="text-gray-700 font-medium">
                    Complimentary Beach Service
                  </span>
                </div>
      
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  <span className="text-gray-700 font-medium">
                    Resort Pool & Hot Tubs
                  </span>
                </div>
      
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  <span className="text-gray-700 font-medium">
                    Panoramic Gulf Views
                  </span>
                </div>
      
              </div>
      
              {/* Buttons */}
      
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
      
                <a
                  href="/properties"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
                >
                  Explore Our Condos
                </a>
      
                <a
                  href="/#contact"
                  className="border border-gray-300 hover:border-blue-600 hover:text-blue-600 px-8 py-4 rounded-full font-semibold transition-all duration-300"
                >
                  Contact Us
                </a>
      
              </div>
      
            </div>
      
          </div>
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

            
            </div>

            {/* Content */}

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[94px]  text-sky-900 text-center leading-tight"
             style={{ fontFamily: 'Yellowtail, "Yellowtail Fallback", cursive' }}>
                Why Guests Love
                Staying With Us 
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

<section className="py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">

    <div className="grid lg:grid-cols-2 gap-16 items-center">

      

      <div className="order-2 lg:order-1">
        <h2
          className="mt-6 text-[#2C5A7B] leading-tight text-5xl sm:text-6xl"
          style={{
            fontFamily: 'Yellowtail, "Yellowtail Fallback", cursive',
          }}
        >
          More Than A Stay...
         
          It's Your Beach Escape
        </h2>

        <p className="mt-8 text-lg leading-9 text-gray-600 font-montserrat">
          Paradise Found and Sun N Sea were thoughtfully designed to give
          families and groups a relaxing beachfront experience. From sunrise
          over the Gulf to evenings spent on your private balcony, every moment
          is an opportunity to slow down, reconnect, and enjoy the beauty of
          Florida's Emerald Coast.
        </p>

        <p className="mt-6 text-lg leading-9 text-gray-600 font-montserrat">
          Spacious interiors, fully equipped kitchens, resort-style amenities,
          private beach access, and breathtaking coastal views come together to
          create a vacation you'll remember long after you return home.
        </p>
      </div>

      

      <div className="order-1 lg:order-2 relative">

        <div className="absolute -top-6 -left-6 w-40 h-40 rounded-full bg-blue-100 blur-3xl opacity-60"></div>

        <div className="overflow-hidden rounded-[30px] shadow-2xl">

          <img
            src={image}
            alt="Surfside Resort"
            className="w-full h-[350px] sm:h-[500px] lg:h-[620px] object-cover transition duration-700 hover:scale-105"
          />

        </div>

      </div>

    </div>

  </div>
</section>

<section className="relative py-20 lg:py-28 overflow-hidden">
 

  <div className="absolute inset-0">
    <img
      src={Guestsimg}
      alt="Surfside Resort"
      className="w-[50%] h-full object-cover"
    />
 
  </div>

  <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

    <div className="flex justify-center lg:justify-end">

 

      <div className="w-full max-w-2xl  backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12">

        <h2
          className="mt-6 text-[#2C5A7B] text-4xl sm:text-5xl leading-tight"
          style={{
            fontFamily:
              'Yellowtail, "Yellowtail Fallback", cursive',
          }}
        >
          Why Guests Love
           
          Staying With Us
        </h2>

        <p className="mt-8 text-lg leading-8 text-gray-600 font-montserrat">
          Paradise Found and Sun N Sea combine the comfort of home with
          the beauty of Florida's Emerald Coast. Every detail has been
          thoughtfully prepared to give families and groups a relaxing,
          convenient, and memorable beachfront vacation experience.
        </p>

        <p className="mt-6 text-lg leading-8 text-gray-600 font-montserrat">
          Spacious three-bedroom layouts, panoramic Gulf views, private
          balconies, fully equipped kitchens, and premium resort amenities
          make every stay comfortable from arrival through departure.
          Whether you're visiting for a family vacation, beach wedding,
          or weekend escape, you'll enjoy everything Surfside Resort has
          to offer.
        </p>

       

      </div>

    </div>

  </div>
</section>
      
      {/* <FeaturedActivities /> */}
    </>
  );
}
