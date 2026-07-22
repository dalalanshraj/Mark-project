import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import video from "../assets/dealbook.mp4";

export default function DealsCTA() {
  return (
    <section className="relative overflow-hidden h-[520px] sm:h-[560px] lg:h-[650px]">

      {/* VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b2340]/80 via-[#103f66]/60 to-black/50" />

      {/* Decorative Blur */}
      <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-[#FFE600]/20 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-sky-400/20 blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-5 sm:px-8 lg:px-10">

        <div
          className="
          w-full
          lg:max-w-2xl
          bg-white/10
          backdrop-blur-xl
          border
          border-white/20
          rounded-[30px]
          p-7
          sm:p-10
          lg:p-14
          shadow-[0_20px_60px_rgba(0,0,0,.35)]
        "
        >

          {/* Badge */}

         
          {/* Heading */}

          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-tight"
           style={{ fontFamily: 'Yellowtail, "Yellowtail Fallback", cursive' }}>
            Escape To Paradise
            <span className="block text-[#F8F812]">
              Save More On Every Stay
            </span>
          </h2>

          {/* Text */}

          <p className="mt-6 text-gray-200 text-base sm:text-lg leading-8 max-w-xl">
            Experience luxury beachfront vacations with exclusive seasonal
            offers, premium amenities, and unforgettable memories waiting for
            you on the Emerald Coast.
          </p>

          {/* Stats */}

          {/* <div className="grid grid-cols-3 gap-4 mt-8 mb-8">

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#FFE600]">
                250+
              </h3>
              <p className="text-gray-300 text-sm">
                Happy Guests
              </p>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#FFE600]">
                4.9★
              </h3>
              <p className="text-gray-300 text-sm">
                Guest Rating
              </p>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#FFE600]">
                24/7
              </h3>
              <p className="text-gray-300 text-sm">
                Support
              </p>
            </div>

          </div> */}

          {/* Button */}

          <Link to="/properties">

            <button
              className="
              group
              inline-flex
              items-center
              gap-3
             text-black font-medium shadow-md bg-[#F8F812]  hover:bg-[#1B252F] hover:text-white hover:scale-105
              px-8
              sm:px-10
              py-4
              rounded-full
              transition-all
              duration-300
              shadow-xl
              hover:scale-105
            "
            >
              Book Your Stay
              <FaArrowRight 
              // className="group-hover:translate-x-1 duration-300" 
              />
            </button>

          </Link>

        </div>

      </div>
    </section>
  );
}