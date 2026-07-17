import api from "../api/axios.js";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoMdClose } from "react-icons/io";
import emailjs from "@emailjs/browser";

export default function InquiryModal({
  propertyId,
  listing,
  arrival,
  departure,
  onClose,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    Arrival: arrival || null,
    Departure: departure || null,
    Adults: "1",
    Kids: "0",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [propertyTitle, setPropertyTitle] = useState("");

  //  useEffect(() => {
  //   setForm((prev) => ({
  //     ...prev,
  //     Arrival: arrival || null,
  //     Departure: departure || null,
  //   }));
  // }, [arrival, departure]);

  // 🔒 Lock background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validation
      if (!propertyId) {
        throw new Error("Property ID missing");
      }

      if (!form.Arrival || !form.Departure) {
        throw new Error("Please select dates");
      }

      // =====================================
      // DATABASE SAVE
      // =====================================

     const payload = {
  property: propertyId,

  name: form.name,
  email: form.email,
  phone: form.phone,
  message: form.message,

  Arrival: form.Arrival,
  Departure: form.Departure,

  Adults: String(form.Adults || "1"),
  Kids: String(form.Kids || "0"),
};
      // console.log("PAYLOAD:", payload);
      console.log({
        Arrival: form.Arrival,
        Departure: form.Departure,
      });

      const res = await api.post("/inquiries", payload);

      // console.log("DB SUCCESS:", res.data);

      // =====================================
      // EMAILJS TEST
      // =====================================

      const toEmail = [listing?.property?.email, listing?.property?.altEmail]
        .filter(Boolean)
        .join(",");

      // console.log("TO EMAIL:", toEmail);

      if (!toEmail) {
        throw new Error("No recipient email found");
      }
      const propertyName =
        listing?.property?.title ||
        res?.data?.inquiry?.property?.property?.title ||
        "Property";

    const templateParams = {
  to_email: toEmail,
 from_name: "Mark Hall Rental",
  name: form.name,
  email: form.email,
  phone: form.phone,

  Arrival: form.Arrival
    ? form.Arrival.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "",

  Departure: form.Departure
    ? form.Departure.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "",

  adults: form.Adults || "1",
  kids: form.Kids || "0",

  message: form.message || "",
  property: propertyName,
};

      // console.log("EMAIL PARAMS:", templateParams);

      const emailRes = await emailjs.send(
        "service_4f5lqrd",
        "template_z8xtl64",
        templateParams,
        "3nPh-Y0a99gtk1fpP",
      );

      // console.log("EMAIL SUCCESS:", emailRes);

      // =====================================
      // SUCCESS
      // =====================================

      setSuccess("Inquiry sent successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        Arrival: null,
        Departure: null,
        Adults: "",
        Kids: "",
        message: "",
      });

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      // console.error("FULL ERROR:", err);

      setError(
        err?.text ||
          err?.message ||
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start z-[9999] pt-3 px-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl md:w-[50%] w-[100%] h-[77%]  p-8 relative mt-33 shadow-2xl border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 rounded-full w-10 h-10 flex items-center justify-center transition cursor-pointer"
        >
          <IoMdClose />
        </button>

        <h2 className="text-3xl font-bold mb-5 text-gray-800">Send Inquiry</h2>

        {/* SUCCESS */}
        {success && (
          <p className="bg-green-100 border border-green-300 text-green-700 p-3 rounded-xl mb-4 text-center">
            Inquiry sent for <strong>{propertyTitle}</strong>
          </p>
        )}

        {/* ERROR */}
        {error && (
          <p className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-xl mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-1">
          {/* NAME + EMAIL */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* PHONE */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          {/* DATE PICKER */}
          <div className="grid grid-cols-2 gap-4 items-start ">
            {/* ARRIVAL */}
            <div className="w-full min-w-0 ">
              <DatePicker
                selected={form.Arrival}
                onChange={(date) => setForm({ ...form, Arrival: date })}
                placeholderText="Arrival Date"
                dateFormat="dd-MM-yyyy"
                minDate={new Date()}
                popperPlacement="bottom-start"
                popperClassName="z-[999999]"
                showPopperArrow={false}
                wrapperClassName="w-full"
                calendarClassName="shadow-xl border rounded-xl"
                // popperModifiers={[
                //   {
                //     name: "flip",
                //     enabled: false,
                //   },
                // ]}
                className="
        w-full
        min-w-0
        h-[52px]
        border border-gray-300
        px-4
        rounded-xl
        outline-none
        focus:ring-2 focus:ring-blue-500
      "
              />
            </div>

            {/* DEPARTURE */}
            <div className="w-full min-w-0">
              <DatePicker
                selected={form.Departure}
                onChange={(date) => setForm({ ...form, Departure: date })}
                placeholderText="Departure Date"
                dateFormat="dd-MM-yyyy"
                minDate={form.Arrival || new Date()}
                popperPlacement="bottom-start"
                popperClassName="z-[999999]"
                showPopperArrow={false}
                wrapperClassName="w-full"
                calendarClassName="shadow-xl border rounded-xl"
                // popperModifiers={[
                //   {
                //     name: "flip",
                //     enabled: false,
                //   },
                // ]}
                className="
        w-full
        min-w-0
        h-[52px]
        border border-gray-300
        px-4
        rounded-xl
        outline-none
        focus:ring-2 focus:ring-blue-500
      "
              />
            </div>
          </div>

          {/* GUESTS */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="Adults"
              placeholder="Adults"
              value={form.Adults}
              onChange={handleChange}
              required
              min="1"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              name="Kids"
              placeholder="Kids"
              value={form.Kids}
              onChange={handleChange}
              min="0"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* MESSAGE */}
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 cursor-pointer rounded-xl text-white font-semibold shadow-md transition ${
              loading
                ? "bg-gray-400"
                : "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
            }`}
          >
            {loading ? "Sending..." : "Submit Inquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}
