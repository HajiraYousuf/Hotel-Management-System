
import { useState } from "react";
import {
  ArrowUpRight,
  X,
  CalendarDays,
  Clock,
  UserRound,
  CheckCircle2,
  Send,
  Sparkles,
} from "lucide-react";

import services from "../data/services";

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    notes: "",
  });

  // OPEN SERVICE DETAILS
  const handleDiscover = (service) => {
    setSelectedService(service);
    setIsBooking(false);
    setIsSubmitted(false);
  };

  // OPEN BOOKING FORM
  const handleBooking = () => {
    setIsBooking(true);
    setIsSubmitted(false);
  };

  // HANDLE INPUT CHANGES
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SUBMIT SERVICE REQUEST
  const handleSubmit = (e) => {
    e.preventDefault();

    const newBooking = {
      id: Date.now(),
      serviceId: selectedService.id,
      serviceName: selectedService.title,
      customerName: formData.name,
      date: formData.date,
      time: formData.time,
      notes: formData.notes,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    const existingBookings = JSON.parse(
      localStorage.getItem("service_bookings") || "[]"
    );

    localStorage.setItem(
      "service_bookings",
      JSON.stringify([...existingBookings, newBooking])
    );

    setIsSubmitted(true);
    setFormData({
      name: "",
      date: "",
      time: "",
      notes: "",
    });
  };

  // CLOSE MODAL
  const handleClose = () => {
    setSelectedService(null);
    setIsBooking(false);
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#faf8f2]">

      {/* HERO SECTION */}
      <section className="relative flex h-72 items-center overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1800&q=85"
          alt="RoyalStay Resort"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#092b24]/90 to-[#092b24]/35" />

        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">

          <span className="text-xs font-bold uppercase tracking-[3px] text-[#e7bd75]">
            Experience the difference
          </span>

          <h1 className="mt-3 font-serif text-4xl font-bold text-white sm:text-5xl">
            Our Services
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/80">
            Thoughtful amenities and exceptional hospitality to make every
            moment memorable.
          </p>

        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        <div className="mx-auto mb-10 max-w-2xl text-center">

          <span className="text-xs font-bold uppercase tracking-[2px] text-[#a97831]">
            Designed around you
          </span>

          <h2 className="mt-3 font-serif text-3xl font-bold text-[#173d35] sm:text-4xl">
            Everything You Need
          </h2>

          <p className="mt-3 text-sm leading-7 text-stone-500">
            From relaxing escapes to productive business stays, discover
            services designed for your comfort.
          </p>

        </div>

        {/* SERVICE CARDS */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.id}
                className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                {/* IMAGE */}
                <div className="h-52 overflow-hidden">

                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                </div>

                {/* CONTENT */}
                <div className="p-6">

                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf0e8] text-[#173d35]">
                    <Icon size={22} />
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-wider text-[#a97831]">
                    {service.category}
                  </span>

                  <h3 className="mt-2 font-serif text-xl font-bold text-[#173d35]">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-stone-500">
                    {service.desc}
                  </p>

                  <button
                    onClick={() => handleDiscover(service)}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#a97831] transition hover:gap-3"
                  >
                    Discover More
                    <ArrowUpRight size={16} />
                  </button>

                </div>
              </article>
            );
          })}

        </div>
      </section>

      {/* SERVICE DETAILS MODAL */}
      {selectedService && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
          onClick={handleClose}
        >

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-title"
            className="relative my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE BUTTON */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-stone-700 shadow transition hover:bg-stone-100"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* SUCCESS MESSAGE */}
            {isSubmitted ? (

              <div className="px-7 py-14 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <CheckCircle2 size={36} />
                </div>

                <h2 className="mt-5 font-serif text-2xl font-bold text-[#173d35]">
                  Request Submitted!
                </h2>

                <p className="mt-3 text-sm leading-6 text-stone-500">
                  Your request for {selectedService.title} has been saved.
                  Its status is Pending.
                </p>

                <button
                  onClick={handleClose}
                  className="mt-7 rounded-lg bg-[#123d32] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#205747]"
                >
                  Done
                </button>

              </div>

            ) : (

              <>

                {/* MODAL IMAGE */}
                <div className="relative h-52">

                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  <span className="absolute bottom-5 left-6 rounded-full bg-[#e7bd75] px-4 py-1.5 text-xs font-bold text-[#173d35]">
                    {selectedService.category}
                  </span>

                </div>

                <div className="p-6 sm:p-8">

                  {/* SERVICE INFORMATION */}
                  {!isBooking ? (

                    <>

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf0e8] text-[#173d35]">
                          <selectedService.icon size={22} />
                        </div>

                        <div>
                          <h2
                            id="service-title"
                            className="font-serif text-2xl font-bold text-[#173d35]"
                          >
                            {selectedService.title}
                          </h2>

                          <p className="text-xs text-stone-500">
                            {selectedService.category}
                          </p>
                        </div>

                      </div>

                      <p className="mt-5 text-sm leading-7 text-stone-600">
                        {selectedService.details}
                      </p>

                      <div className="mt-6 rounded-xl bg-[#faf8f2] p-4">

                        <div className="flex items-center gap-2 text-sm font-semibold text-[#173d35]">
                          <Sparkles size={18} className="text-[#a97831]" />
                          Enjoy Your Stay
                        </div>

                        <p className="mt-2 text-xs leading-6 text-stone-500">
                          Submit a service request and our hotel team can
                          review your preferred schedule.
                        </p>

                      </div>

                      <button
                        onClick={handleBooking}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#123d32] py-3.5 text-sm font-semibold text-white transition hover:bg-[#205747]"
                      >
                        Book This Service
                        <ArrowUpRight size={17} />
                      </button>

                    </>

                  ) : (

                    /* BOOKING FORM */
                    <>

                      <div className="mb-6">

                        <span className="text-xs font-bold uppercase tracking-wider text-[#a97831]">
                          Service Request
                        </span>

                        <h2 className="mt-2 font-serif text-2xl font-bold text-[#173d35]">
                          Book {selectedService.title}
                        </h2>

                        <p className="mt-2 text-sm text-stone-500">
                          Enter your details to submit a request.
                        </p>

                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">

                        {/* NAME */}
                        <label className="block">

                          <span className="mb-2 block text-xs font-semibold text-stone-600">
                            Full Name
                          </span>

                          <div className="flex items-center gap-3 rounded-lg border border-stone-200 px-3 py-3 focus-within:border-[#a97831]">

                            <UserRound size={17} className="text-stone-400" />

                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Enter your full name"
                              required
                              className="w-full text-sm outline-none"
                            />

                          </div>

                        </label>

                        {/* DATE */}
                        <label className="block">

                          <span className="mb-2 block text-xs font-semibold text-stone-600">
                            Preferred Date
                          </span>

                          <div className="flex items-center gap-3 rounded-lg border border-stone-200 px-3 py-3 focus-within:border-[#a97831]">

                            <CalendarDays size={17} className="text-stone-400" />

                            <input
                              type="date"
                              name="date"
                              value={formData.date}
                              onChange={handleChange}
                              required
                              className="w-full text-sm outline-none"
                            />

                          </div>

                        </label>

                        {/* TIME */}
                        <label className="block">

                          <span className="mb-2 block text-xs font-semibold text-stone-600">
                            Preferred Time
                          </span>

                          <div className="flex items-center gap-3 rounded-lg border border-stone-200 px-3 py-3 focus-within:border-[#a97831]">

                            <Clock size={17} className="text-stone-400" />

                            <input
                              type="time"
                              name="time"
                              value={formData.time}
                              onChange={handleChange}
                              required
                              className="w-full text-sm outline-none"
                            />

                          </div>

                        </label>

                        {/* NOTES */}
                        <label className="block">

                          <span className="mb-2 block text-xs font-semibold text-stone-600">
                            Additional Notes (Optional)
                          </span>

                          <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Any special requests..."
                            rows="3"
                            className="w-full resize-none rounded-lg border border-stone-200 px-3 py-3 text-sm outline-none transition focus:border-[#a97831]"
                          />

                        </label>

                        {/* ACTIONS */}
                        <div className="flex gap-3 pt-2">

                          <button
                            type="button"
                            onClick={() => setIsBooking(false)}
                            className="w-1/3 rounded-lg border border-stone-200 py-3 text-sm font-semibold text-stone-600 transition hover:bg-stone-50"
                          >
                            Back
                          </button>

                          <button
                            type="submit"
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#123d32] py-3 text-sm font-semibold text-white transition hover:bg-[#205747]"
                          >
                            Submit Request
                            <Send size={16} />
                          </button>

                        </div>

                      </form>

                    </>

                  )}

                </div>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default Services;
