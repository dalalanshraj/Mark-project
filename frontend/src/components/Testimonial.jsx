import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { FaUserCircle } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function TestimonialCarousel() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await api.get("/listings/reviews");

      setReviews(res.data.reviews || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-12 bg-white">
    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[94px]  text-sky-900 text-center leading-tight p-30"
             style={{ fontFamily: 'Yellowtail, "Yellowtail Fallback", cursive' }}>
        What Guests Are Saying
      </h2>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={reviews.length > 3}
        centeredSlides={true}
        grabCursor={true}
        slidesPerView={1}
        spaceBetween={30}
        breakpoints={{
          768: {
            slidesPerView: 3,
          },
        }}
        className="w-full max-w-6xl"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="testimonial-card bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center max-w-sm mx-auto transition-all duration-500">
             <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
  <FaUserCircle
    size={60}
    className="text-gray-500"
  />
</div>

              <h3 className="font-bold text-lg">{review.user}</h3>

              <p className="text-xs text-gray-500 mb-2">
                {review.property?.title}
              </p>

              <div className="flex justify-center my-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="text-gray-700 text-sm md:text-base max-h-40 overflow-y-auto">
                {review.review}
              </p>

             {review.stayDate && (
  <p className="text-xs text-black mt-3">
   Stay Date: {new Date(review.stayDate).toLocaleDateString("en-CA")}
  </p>
)}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-slide {
          opacity: 0.4;
          transform: scale(0.9);
          transition: all .4s ease-in-out;
        }

        .swiper-slide-active {
          opacity: 1 !important;
          transform: scale(1.05) !important;
        }
      `}</style>
    </div>
  );
}
