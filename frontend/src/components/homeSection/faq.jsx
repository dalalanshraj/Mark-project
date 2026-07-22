import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Background Image
import faqBg from "../../assets/faq.jpg"; // <-- change your image path

const faqs = [
  {
    icon: "🏖️",
    question: "Is the beach private?",
    answer:
      "Yes. Surfside Beach Resort offers private beach access exclusively for owners and guests, providing a quieter and more relaxing beach experience."
  },

  {
    icon: "☂️",
    question: "Is complimentary beach service included?",
    answer:
      "Yes. Your stay includes 2 sets of beach service (4 chairs and 2 umbrellas) from March 1 through October 31."
  },

  {
    icon: "👨‍👩‍👧‍👦",
    question: "How many guests can the condos accommodate?",
    answer:
      "Unit 1001 comfortably sleeps up to 10 guests, while Unit 908 accommodates up to 12 guests. Each condo offers spacious bedrooms, multiple bathrooms, and open living areas ideal for families and groups."
  },

  {
    icon: "🛏️",
    question: "What are the sleeping arrangements?",
    answer:
      "Both condos feature three spacious bedrooms with King, Queen, Full beds, plus a Queen sleeper sofa. Bedding arrangements vary slightly by unit and are listed on each property page."
  },

  {
    icon: "🏊",
    question: "What amenities are available at Surfside Resort?",
    answer:
      "Guests enjoy a large swimming pool, kiddie pool, two hot tubs, fitness center, tennis courts, pickleball, basketball court, covered parking, beach bar, Royal Palm Grill restaurant, spa, beauty salon, and 24-hour security."
  },

  {
    icon: "📶",
    question: "Is Wi-Fi included?",
    answer:
      "Yes. Complimentary high-speed Fiber Optic Internet is available throughout both condos."
  },

  {
    icon: "🚗",
    question: "Is parking available?",
    answer:
      "Yes. Covered parking is available for registered guests staying at Surfside Beach Resort."
  },

  {
    icon: "🕓",
    question: "What are the check-in and check-out times?",
    answer:
      "Standard check-in begins in the afternoon, while check-out is in the morning. Exact times are provided with your booking confirmation."
  },

  {
    icon: "🚭",
    question: "Are pets or smoking allowed?",
    answer:
      "No. Both vacation rentals are strictly non-smoking and pets are not permitted in accordance with the Surfside Resort association rules."
  },

  {
    icon: "🔞",
    question: "Is there a minimum age requirement?",
    answer:
      "Yes. Guests must be at least 25 years old to rent the property. A valid government-issued photo ID is required during check-in."
  },

  {
    icon: "💳",
    question: "When is payment due?",
    answer:
      "A refundable $300 reservation/damage deposit is required to secure your booking. The remaining balance is due 30 days before arrival."
  },

  {
    icon: "❌",
    question: "What is the cancellation policy?",
    answer:
      "Reservations canceled 60 or more days before arrival receive a full refund. Cancellations within 60 days are refunded only if the dates are successfully rebooked."
  },

  {
    icon: "💍",
    question: "Is Surfside Resort a wedding venue?",
    answer:
      "Yes. Surfside Resort is a popular beachfront wedding destination. Island Sands Beach Weddings can help you plan your ceremony."
  },

  {
    icon: "🌅",
    question: "Do the condos have ocean views?",
    answer:
      "Absolutely. Both condos feature large private balconies with beautiful Gulf views. Unit 1001 offers breathtaking panoramic corner views, while Unit 908 provides stunning ocean views from its spacious balcony."
  },

  {
    icon: "🍽️",
    question: "Is the kitchen fully equipped?",
    answer:
      "Yes. Each condo includes a fully equipped kitchen with quartz countertops, white cabinets, refrigerator, stove, microwave, dishwasher, cookware, dishes, utensils, and an in-unit washer and dryer."
  }
];

export default function FAQ() {
  const [active, setActive] = useState(0);

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section 
      className="relative w-full py-24 overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${faqBg})`,
      }}
    >
      {/* Overlay */}
      <div  className="absolute inset-0 bg-slate-900/25 backdrop-blur-[2px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
           <h2  className="text-3xl sm:text-4xl md:text-5xl lg:text-[94px]  text-white text-center leading-tight"
             style={{ fontFamily: 'Yellowtail, "Yellowtail Fallback", cursive' }}>
            Frequently Asked Questions
          </h2>

         <p className="font-montserrat p-5 text-white text-center max-w-3xl mx-auto text-lg md:text-xl">
            Have questions about our vacation rentals or property
            management? Check here first or send us a message below.
          </p>
        </div>

        {/* FAQ */}
        <div className="max-w-5xl mx-auto space-y-5">
          {faqs.map((item, index) => {
            const open = active === index;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300"
              >
                {/* Header */}
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-5 px-6 py-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{item.icon}</span>

                    <h3 className="font-montserrat text-lg sm:text-xl font-semibold text-slate-800">
                      {item.question}
                    </h3>
                  </div>

                  <ChevronDown
                    className={`h-6 w-6 text-slate-600 transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Content */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    open
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div id="faq" className="overflow-hidden">
                    <div className="border-t border-gray-200 px-6 pb-7 pt-6">
                      <p className="font-montserrat text-[17px] leading-9 text-gray-700">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}