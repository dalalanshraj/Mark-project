import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import YearCalendar from "../components/adminCalendar/YearCalendar";
import herobg from "../assets/herobg.jpg";

export default function AdminCalendar() {
  // ==========================================
  // STATE
  // ==========================================

  const [listings, setListings] = useState([]);

  const [selectedListing, setSelectedListing] = useState("");

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [calendar, setCalendar] = useState([]);

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [error, setError] = useState("");

  // ==========================================
  // YEARS
  // ==========================================

  const years = useMemo(() => {
    const current = new Date().getFullYear();

    return Array.from({ length: 10 }, (_, i) => current - 2 + i);
  }, []);

  // ==========================================
  // LOAD LISTINGS
  // ==========================================

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    try {
      setLoading(true);

      const res = await api.get("/calendar/all/listings");

      setListings(res.data || []);

      if (res.data.length > 0) {
        setSelectedListing(res.data[0]._id);
      }
    } catch (err) {
      console.log(err);

      setError("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD CALENDAR
  // ==========================================

  useEffect(() => {
    if (!selectedListing) return;

    loadCalendar();
  }, [selectedListing]);

  const loadCalendar = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/calendar/${selectedListing}/calendar`);

      setCalendar(res.data.calendar || []);
    } catch (err) {
      console.log(err);

      setError("Failed to load calendar");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // DATE FORMAT
  // ==========================================

  const formatDate = (date) => {
    const d = new Date(date);

    const y = d.getFullYear();

    const m = String(d.getMonth() + 1).padStart(2, "0");

    const day = String(d.getDate()).padStart(2, "0");

    return `${y}-${m}-${day}`;
  };

  // ==========================================
  // CALENDAR MAP
  // ==========================================

  const calendarMap = useMemo(() => {
    const map = {};

    calendar.forEach((item) => {
      const key = formatDate(item.date);

      if (!map[key]) {
        map[key] = [];
      }

      map[key].push(item);
    });

    return map;
  }, [calendar]);

  // ==========================================
  // REFRESH
  // ==========================================

  const refreshCalendar = () => {
    if (!selectedListing) return;

    loadCalendar();
  };
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
  // ==========================================
  // PAGE UI
  // ==========================================

  return (
    <>
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
               Properties Calendar
             </h1>
   
             {/* <p className="text-gray-200 text-sm sm:text-base max-w-3xl mx-auto">
     Meet Shawn and Eileen O'Sullivan, the proud owners of Beach Therapy 30A in beautiful Grayton Beach, Florida. We are excited to share our slice of paradise with guests from around the world.
   </p> */}
           </div>
         </section>
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8 ">
      {/* Header */}

      {/* <div className="">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Admin Calendar
        </h1>

        <p className="mt-2 text-gray-600">
          View and manage property availability for the entire year.
        </p>
      </div> */}

      {/* Toolbar */}

      <div className="bg-white rounded-xl shadow-md p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Property */}

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Property
            </label>

            <select
              value={selectedListing}
              onChange={(e) => setSelectedListing(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              {listings.map((listing) => (
                <option key={listing._id} value={listing._id}>
                  {listing.title}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Year
            </label>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Refresh */}

          <div className="flex items-end">
            <button
              onClick={refreshCalendar}
              className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold transition hover:bg-blue-700"
            >
              Refresh Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Legend */}

      <div className="bg-white rounded-xl shadow-md p-5 mb-6">
        <h2 className="font-bold text-lg mb-4">Calendar Legend</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded bg-[#d9f8e8]"></span>
            <span>Available</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded bg-[#5C5CFF]"></span>
            <span>Booked</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded bg-yellow-400"></span>
            <span>Hold</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded bg-[linear-gradient(135deg,#d9f8e8_0%,#d9f8e8_50%,#5B5BF7_50%,#5B5BF7_100%)]"></span>
            <span>Check In</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded bg-[linear-gradient(315deg,#d9f8e8_0%,#d9f8e8_50%,#5B5BF7_50%,#5B5BF7_100%)]"></span>
            <span>Check Out</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="relative w-5 h-5 rounded bg-[#5C5CFF] overflow-hidden">
              <span className="absolute w-[140%] h-[2px] bg-black top-1/2 left-[-20%] rotate-135"></span>
            </span>
            Turnover
          </div>
          
        </div>
      </div>

      {/* Loading */}

      {loading && (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <div className="text-lg font-semibold">Loading Calendar...</div>
        </div>
      )}

      {/* Error */}

      {!loading && error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-5 text-red-600">
          {error}
        </div>
      )}

      {/* Calendar */}

      {!loading && !error && (
        <div className="bg-white rounded-xl shadow-lg p-5">
          <YearCalendar year={selectedYear} calendarMap={calendarMap} />
        </div>
      )}
    </div>
    </>
  );
}
