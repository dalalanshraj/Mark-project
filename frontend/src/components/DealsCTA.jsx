import { Link } from "react-router-dom";
import video from "../assets/dealbook.mp4";
export default function DealsCTA() {
  return (
    <section className="relative h-[500px] md:h-[400px] overflow-hidden">
      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/20" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center justify-center lg:justify-end px-4 md:px-10 lg:px-20">
        <div
          className="
            w-full
            max-w-[700px]
            rounded-[30px]
            bg-white/75
            backdrop-blur-md
            shadow-2xl
            p-6
            md:p-10
            lg:p-14
          "
        >
          <p className="text-black text-base md:text-lg mb-4">
            Ready for a vacation to remember?
          </p>

          <h2
            className="
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-sky-900  leading-tight
            "
          >
            Book Now for Great Deals!
          </h2>

          <Link to={"/properties"}>
            {" "}
            <button
              className="
              bg-[#234b72]
              hover:bg-[#1d3f60]
              text-white
              px-8
              md:px-12
              py-4
              rounded-full
              font-semibold
              text-lg
              transition
            "
            >
              BOOK NOW
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
