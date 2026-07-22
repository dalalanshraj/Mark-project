import { useState } from "react";
import contactImage from "../../assets/contect.jpg"; // Change image path
import api from "../../api/axios";
import emailjs from "@emailjs/browser";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setSuccess("");
  setError("");

  try {
    // Validation
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.message.trim()
    ) {
      throw new Error("Please fill all required fields.");
    }

    // Save to database
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
    };

    const res = await api.post("/contact", payload);

    console.log("Backend Response:", res.data);

    // Get emails from backend
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const emails = (res.data.emails || [])
      .map((email) => email.trim())
      .filter((email) => emailRegex.test(email));

    console.log("Valid Emails:", emails);

    if (emails.length === 0) {
      throw new Error("No valid recipient email found.");
    }

    // Send email to every recipient
    for (const recipient of emails) {
      console.log("Sending email to:", recipient);

      await emailjs.send(
        "service_4f5lqrd",
        "template_tkl5eoj",
        {
          to_email: recipient,

          from_name: "Mark Hall Rentals",

          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,

          property: res.data.propertyTitle || "",
        },
        "3nPh-Y0a99gtk1fpP"
      );
    }

    setSuccess("Message sent successfully!");

    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  } catch (err) {
    console.error("ERROR:", err);

    setError(
      err?.text ||
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <section  className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">
          {/* LEFT */}
          <div>
             <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[84px]  text-sky-900 text-center leading-tight"
             style={{ fontFamily: 'Yellowtail, "Yellowtail Fallback", cursive' }}>
              Contact Us Today
            </h2>

             <p className="font-montserrat p-5 text-gray-600 text-center max-w-3xl mx-auto text-lg md:text-xl">
              To learn more, send us a message here.
            </p>

            <form id="contact" onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Name Email Phone */}

              <div className="grid sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-100 px-5 h-14 outline-none border border-transparent focus:border-blue-500 transition"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-100 px-5 h-14 outline-none border border-transparent focus:border-blue-500 transition"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-100 px-5 h-14 outline-none border border-transparent focus:border-blue-500 transition"
                />
              </div>

              {/* Message */}

              <textarea
                rows={6}
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                className="w-full rounded-xl bg-gray-100 px-5 py-4 outline-none border border-transparent focus:border-blue-500 transition resize-none"
              />

              {/* Alerts */}

              {success && (
                <div className="rounded-lg bg-green-100 text-green-700 px-4 py-3 font-medium">
                  {success}
                </div>
              )}

              {error && (
                <div className="rounded-lg bg-red-100 text-red-700 px-4 py-3 font-medium">
                  {error}
                </div>
              )}

              {/* Button */}

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative overflow-hidden rounded-full bg-[#2E617B] px-10 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#234E63] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="relative z-10">
                    {loading ? "Sending..." : "Send Message"}
                  </span>

                  <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full"></span>
                </button>

                <p className="text-sm text-gray-500">
                  We'll respond within 24 hours.
                </p>
              </div>
            </form>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <a
                href="tel:+13343195912"
                className="group rounded-2xl border bg-white p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <h4 className="font-semibold text-gray-900">📞 Call Us</h4>

                <p className="mt-2 text-gray-500">+1 (334) 319-5912</p>
              </a>

              <a
                href="mailto:marksgetaway@gmail.com"
                className="group rounded-2xl border bg-white p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <h4 className="font-semibold text-gray-900">✉️ Email</h4>

                <p className="mt-2 break-all text-gray-500">
                  marksgetaway@gmail.com
                </p>
              </a>
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={contactImage}
                alt="Contact"
                className="w-full h-[300px] sm:h-[450px] lg:h-[520px] object-cover hover:scale-105 transition duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
