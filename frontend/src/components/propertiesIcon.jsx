import VrboLogo from "../assets/property-icon/vrbo.png";
import AirbnbLogo from "../assets/property-icon/airbnb.png";
import EcbyoLogo from "../assets/property-icon/ecbyo.png";
 
import FloridaRentalsLogo from "../assets/property-icon/floridarentals.png";

export default function PropertyIcon({ listing }) {
  const properties = [
    {
      id: 1,
      title: "Coastal Elegance with Panoramic Ocean Views",
      links: {
        ecbyo: "https://www.emeraldcoastbyowner.com/e1641",
        vrbo: "https://www.vrbo.com/1079434?dateless=true&brandcid=VRBO.OWNED.MMP.LODGINGPDP.DESKTOP-SHARELINK&shortlink=xxluafk1&af_siteid=9001001&af_sub1=3ea1cbb6-08b0-cd2f-3d2e-f5de3307d53f&af_ad=BRAND.VRBO.OWNED.MMP.LODGINGPDP.DESKTOP-SHARELINK&deep_link_value=https%3A%2F%2Fwww.vrbo.com%2F1079434%3Fdateless%3Dtrue&af_adset=VRBO&pid=BRAND&source_caller=api_v2&custom_web_attribute=3ea1cbb6-08b0-cd2f-3d2e-f5de3307d53f&s_dev_type=DESKTOP&c=SHARELINK-LODGINGPDP&af_sub_siteid=SHARELINK-LODGINGPDP",
        airbnb:" ",
        FloridaRentals:"https://www.floridarentals.com/5214/?utm_source=shared_listing&utm_medium=referral&utm_campaign=copyPropertyLink",
      },
    },
    {
      id: 2,
      title: "Endless Blue: Oceanfront Luxury at Surfside",
      links: {
        ecbyo: "https://www.emeraldcoastbyowner.com/e1907",
        vrbo: "https://www.vrbo.com/1079379?dateless=true&brandcid=VRBO.OWNED.MMP.LODGINGPDP.DESKTOP-SHARELINK&custom_web_attribute=3ea1cbb6-08b0-cd2f-3d2e-f5de3307d53f&c=SHARELINK-LODGINGPDP&deep_link_value=https%3A%2F%2Fwww.vrbo.com%2F1079379%3Fdateless%3Dtrue&af_adset=VRBO&source_caller=api_v2&af_siteid=9001001&af_sub1=3ea1cbb6-08b0-cd2f-3d2e-f5de3307d53f&af_sub_siteid=SHARELINK-LODGINGPDP&af_ad=BRAND.VRBO.OWNED.MMP.LODGINGPDP.DESKTOP-SHARELINK&shortlink=bwnkzcju&pid=BRAND&s_dev_type=DESKTOP",
        airbnb:" ",
        FloridaRentals:"https://www.floridarentals.com/1277/?utm_source=shared_listing&utm_medium=referral&utm_campaign=copyPropertyLink",
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
        normalizeTitle(listing?.property?.title),
    );

    if (!currentProperty) {
      return null;
    }

    return (
     <div className="w-full bg-white px-5 py-1 relative">

  <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-[#FFE600]/20 blur-3xl"></div>
  <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-sky-400/20 blur-3xl"></div>

  <h2 className="text-4xl font-extrabold text-sky-900 text-center">
    Book Your Way
  </h2>

  <p className="mt-2 text-center text-gray-600">
    Best Direct Booking Option
  </p>

  <div className="w-10 h-[2px] bg-blue-500 mx-auto mt-3 mb-8" />

  <div className="relative max-w-[460px] mx-auto bg-white rounded-3xl shadow-xl border border-gray-200 p-8">

    <span
      className="
      absolute
      -top-3
      left-1/2
      -translate-x-1/2
      bg-sky-900
      text-white
      text-xs
      font-semibold
      px-5
      py-1.5
      rounded-full
    "
    >
      BOOK DIRECT & SAVE
    </span>

    <div className="grid grid-cols-2 gap-5">

      {/* ECBYO */}
      <a
        href={currentProperty.links.ecbyo}
        target="_blank"
        rel="noopener noreferrer"
        className="h-28 rounded-2xl   hover:border-blue-500 hover:shadow-lg transition flex items-center justify-center"
      >
        <img
          src={EcbyoLogo}
          alt="ECBYO"
          className="h-14 object-contain"
        />
      </a>

      {/* VRBO */}
      <a
        href={currentProperty.links.vrbo}
        target="_blank"
        rel="noopener noreferrer"
        className="h-28 rounded-2xl   hover:border-blue-500 hover:shadow-lg transition flex items-center justify-center"
      >
        <img
          src={VrboLogo}
          alt="VRBO"
          className="h-10 object-contain"
        />
      </a>

      {/* Airbnb */}
      <a
        href={currentProperty.links.airbnb}
        target="_blank"
        rel="noopener noreferrer"
        className="h-28 rounded-2xl   hover:border-red-400 hover:shadow-lg transition flex items-center justify-center"
      >
        <img
          src={AirbnbLogo}
          alt="Airbnb"
          className="h-12 object-contain"
        />
      </a>

      {/* Florida Rentals */}
      <a
        href={currentProperty.links.FloridaRentals}
        target="_blank"
        rel="noopener noreferrer"
        className="h-28 rounded-2xl   hover:border-green-500 hover:shadow-lg transition flex items-center justify-center"
      >
        <img
          src={FloridaRentalsLogo}
          alt="Florida Rentals"
          className="h-12 object-contain"
        />
      </a>

    </div>

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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[94px]  text-sky-900 text-center leading-tight"
             style={{ fontFamily: 'Yellowtail, "Yellowtail Fallback", cursive' }}>
            Book Your Way
          </h2>

         <p className="font-montserrat p-5 text-gray-600 text-center max-w-3xl mx-auto text-lg md:text-xl">
            Whether you prefer to book directly through{" "}
            <strong className="text-black">ECBYO</strong> for potential savings
            and personalized service, or through the other platforms Airbnb or
            VRBO you’ll enjoy the same exceptional Gulf Life’s a Beach
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
                 bg-sky-400/10 blur-1xl
                 bg-[#FFE600]/10 blur-1xl
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
              
              "
            >
              <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-[#FFE600]/20 blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-sky-400/20 blur-3xl"></div>
              {/* PROPERTY NAME */}

              <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-center text-black">
                {property.title}
              </h3>
              <p className="mt-1 text-lg font-light text-black">
                Best Direct Booking Option
              </p>
              <div className="w-12 h-[2px] bg-blue-500 mt-6 mb-8 group-hover:w-24 transition-all duration-500" />

              {/* ECBYO */}

          <div className="relative w-full max-w-[430px] mt-5">

  {/* Ribbon */}
  <span
    className="
      absolute
      -top-3
      left-1/2
      -translate-x-1/2
      whitespace-nowrap
      bg-sky-900
      text-white
      px-4
      py-1
      rounded-full
      text-xs
      font-semibold
      tracking-wide
      z-10
    "
  >
    BOOK DIRECT & SAVE
  </span>

  <div className="grid grid-cols-2 gap-5 pt-6">

    {/* ECBYO */}
    <a
      href={property.links.ecbyo}
      target="_blank"
      rel="noopener noreferrer"
      className="
        h-28
        rounded-2xl
        border
        border-gray-200
        bg-white
        flex
        items-center
        justify-center
        hover:border-sky-500
        hover:shadow-xl
        transition-all
        duration-300
      "
    >
      <img
        src={EcbyoLogo}
        alt="ECBYO"
        className="h-16 object-contain"
      />
    </a>

    {/* VRBO */}
    <a
      href={property.links.vrbo}
      target="_blank"
      rel="noopener noreferrer"
      className="
        h-28
        rounded-2xl
        border
        border-gray-200
        bg-white
        flex
        items-center
        justify-center
        hover:border-sky-500
        hover:shadow-xl
        transition-all
        duration-300
      "
    >
      <img
        src={VrboLogo}
        alt="VRBO"
        className="h-12 object-contain"
      />
    </a>

    {/* Airbnb */}
    <a
      href={property.links.airbnb}
      target="_blank"
      rel="noopener noreferrer"
      className="
        h-28
        rounded-2xl
        border
        border-gray-200
        bg-white
        flex
        items-center
        justify-center
        hover:border-red-400
        hover:shadow-xl
        transition-all
        duration-300
      "
    >
      <img
        src={AirbnbLogo}
        alt="Airbnb"
        className="h-12 object-contain"
      />
    </a>

    {/* Florida Rentals */}
    <a
      href={property.links.FloridaRentals}
      target="_blank"
      rel="noopener noreferrer"
      className="
        h-28
        rounded-2xl
        border
        border-gray-200
        bg-white
        flex
        items-center
        justify-center
        hover:border-green-500
        hover:shadow-xl
        transition-all
        duration-300
      "
    >
      <img
        src={FloridaRentalsLogo}
        alt="Florida Rentals"
        className="h-12 object-contain"
      />
    </a>

  </div>

</div>

              {/* DIVIDER */}

              {/* <div className="w-full flex items-center gap-4 my-6">
                <div className="h-px bg-gray-300 flex-1" />

                <span className="text-xs uppercase tracking-[3px] text-gray-400 whitespace-nowrap">
                  Also Available On
                </span>

                <div className="h-px bg-gray-300 flex-1" />
              </div> */}

              {/* VRBO + AIRBNB */}

              {/* <div className="flex items-center justify-center gap-8 sm:gap-12">
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

                
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
