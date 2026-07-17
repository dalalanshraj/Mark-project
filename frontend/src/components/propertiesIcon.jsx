import VrboLogo from "../assets/property-icon/vrbo.png";
import AirbnbLogo from "../assets/property-icon/airbnb.png";
import EcbyoLogo from "../assets/property-icon/ecbyo.png";

export default function PropertyIcon({ listing }) {
  const properties = [
    {
      id: 1,
      title: "Unit 908 Surfside",
      links: {
        ecbyo: " ",
        vrbo: "",
        airbnb:
          " ",
      },
    },
    {
      id: 2,
      title: "1001 OCEAN FRONT",
      links: {
        ecbyo: " ",
        vrbo: " ",
        airbnb:
          " ",
      },
    },
  ];

  const normalizeTitle = (value = "") =>
    value.toLowerCase().trim().replace(/\s+/g, " ");

  // ==================================================
  // PROPERTY DETAIL PAGE
  // ==================================================

  if (listing) {
    const currentProperty = properties.find(
      (property) =>
        normalizeTitle(property.title) ===
        normalizeTitle(listing?.property?.title)
    );

    if (!currentProperty) {
      return null;
    }

    return (
      <div className="w-full bg-white px-5 py-6">
        {/* HEADING */}

        <h2 className="font-playfair text-xl font-bold text-center text-black">
          Book Your Way
        </h2>

        <div className="w-10 h-[2px] bg-black mx-auto mt-3 mb-7" />

        {/* ECBYO */}

        <a
          href={currentProperty.links.ecbyo}
          target="_blank"
          rel="noopener noreferrer"
          className="
            relative
            w-full
            flex
            items-center
            justify-center
            gap-3
            px-4
            py-5
            border-2
            border-[#2f9bad]
            rounded-xl
            transition-all
            duration-300
            hover:shadow-md
          "
        >
          <span
            className="
              absolute
              -top-3
              left-1/2
              -translate-x-1/2
              whitespace-nowrap
              px-3
              py-1
              rounded-full
              bg-[#2f9bad]
              text-white
              text-[11px]
              font-semibold
              tracking-[1px]
            "
          >
            BOOK DIRECT & SAVE
          </span>

          <img
            src={EcbyoLogo}
            alt="ECBYO"
            className="w-[80px] h-[100px] object-contain shrink-0"
          />

          <div>
            <p className="text-[11px] uppercase tracking-[1px] text-[#2f9bad] font-semibold">
              Recommended
            </p>

            <p className="text-md text-black mt-1">
              Direct Booking
            </p>
          </div>
        </a>

        {/* VRBO + AIRBNB */}

        <div className="flex items-center justify-center gap-7 mt-7">
          <a
            href={currentProperty.links.vrbo}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[75px] h-[40px] flex items-center justify-center opacity-70 hover:opacity-100"
          >
            <img
              src={VrboLogo}
              alt="VRBO"
              className="max-w-full max-h-[35px] object-contain"
            />
          </a>

          <div className="h-7 w-px bg-gray-200" />

          <a
            href={currentProperty.links.airbnb}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[75px] h-[40px] flex items-center justify-center opacity-70 hover:opacity-100"
          >
            <img
              src={AirbnbLogo}
              alt="Airbnb"
              className="max-w-full max-h-[35px] object-contain"
            />
          </a>
        </div>
      </div>
    );
  }

  // ==================================================
  // HOME PAGE
  // listing undefined hai, isliye yahan code chalega
  // ==================================================

  return (
    <section className="w-full bg-white py-20 px-5">
      <div className="max-w-6xl mx-auto">

        {/* HEADING */}

        <div className="text-center mb-16">
       <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-sky-900 text-center leading-tight">

            Book Your Way
          </h2>

          <p className="mt-8 text-gray-600 max-w-4xl mx-auto text-lg md:text-xl leading-[2]">
            Whether you prefer to book directly through{" "}
            <strong className="text-black">ECBYO</strong> for potential savings
            and personalized service, or  through the other platforms Airbnb or VRBO  
             you’ll enjoy the same exceptional Gulf Life’s a Beach
            experience, responsive local support, and professionally maintained
            accommodations.
          </p>
        </div>

        {/* BOTH PROPERTY CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {properties.map((property) => (
            <div
              key={property.id}
              className="
                group
                border
                border-gray-200
                bg-[#f8f8f6]
                px-6
                sm:px-10
                py-10
                flex
                flex-col
                items-center
                justify-center
                transition-all
                duration-500
                hover:-translate-y-2
                hover:shadow-xl
              "
            >
              {/* PROPERTY NAME */}

              <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-center text-black">
                {property.title}
              </h3>

              <div className="w-12 h-[2px] bg-black mt-6 mb-8 group-hover:w-24 transition-all duration-500" />

              {/* ECBYO */}

              <a
                href={property.links.ecbyo}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  relative
                  w-full
                  max-w-[430px]
                  min-h-[145px]
                  px-6
                  py-5
                  flex
                  flex-col
                  sm:flex-row
                  items-center
                  justify-center
                  gap-4
                  bg-white
                  border-2
                  border-[#2f9bad]
                  rounded-2xl
                  shadow-md
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >
                <span
                  className="
                    absolute
                    -top-3
                    left-1/2
                    -translate-x-1/2
                    whitespace-nowrap
                    bg-[#2f9bad]
                    text-white
                    px-4
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    tracking-wide
                  "
                >
                  BOOK DIRECT & SAVE
                </span>

                <img
                  src={EcbyoLogo}
                  alt="Emerald Coast By Owner"
                  className="w-[150px] sm:w-[180px] max-h-[100px] object-contain"
                />

                <div className="text-center sm:text-left">
                  <p className="text-xs uppercase tracking-[2px] text-[#2f9bad] font-semibold">
                    Recommended
                  </p>

                  <p className="mt-1 text-lg font-light text-black">
                    Best Direct Booking Option
                  </p>
                </div>
              </a>

              {/* DIVIDER */}

              <div className="w-full flex items-center gap-4 my-6">
                <div className="h-px bg-gray-300 flex-1" />

                <span className="text-xs uppercase tracking-[3px] text-gray-400 whitespace-nowrap">
                  Also Available On
                </span>

                <div className="h-px bg-gray-300 flex-1" />
              </div>

              {/* VRBO + AIRBNB */}

              <div className="flex items-center justify-center gap-8 sm:gap-12">
                <a
                  href={property.links.vrbo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[100px] sm:w-[125px] h-[60px] flex items-center justify-center opacity-70 hover:opacity-100"
                >
                  <img
                    src={VrboLogo}
                    alt="VRBO"
                    className="max-w-full max-h-[65px] object-contain"
                  />
                </a>

                <a
                  href={property.links.airbnb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[100px] sm:w-[125px] h-[60px] flex items-center justify-center opacity-70 hover:opacity-100"
                >
                  <img
                    src={AirbnbLogo}
                    alt="Airbnb"
                    className="max-w-full max-h-[65px] object-contain"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}