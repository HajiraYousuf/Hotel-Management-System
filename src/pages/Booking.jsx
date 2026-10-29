
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  CalendarDays,
  Users,
  ShieldCheck,
  Tag,
  CheckCircle,
} from "lucide-react";

import rooms from "../data/rooms";

const Booking = () => {
  const location = useLocation();

  // Room data from RoomDetails page
  const selectedRoomId = location.state?.roomId;

  const [roomId, setRoomId] = useState(
    selectedRoomId ? String(selectedRoomId) : ""
  );

  const selectedRoom = rooms.find(
    (room) => room.id === Number(roomId)
  );

  // Booking information
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");

  // Guest information
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    requests: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [bookingId, setBookingId] = useState("");

  // Calculate nights
  const nights =
    checkIn && checkOut
      ? Math.round(
          (new Date(`${checkOut}T00:00:00`) -
            new Date(`${checkIn}T00:00:00`)) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  // Calculate total price
  const roomPrice = selectedRoom?.price || 0;
  const totalPrice = nights > 0 ? nights * roomPrice : 0;

  // Today's date
  const today = new Date().toLocaleDateString("en-CA");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle booking submission
  const handleBooking = (e) => {
    e.preventDefault();
    setError("");

    if (!selectedRoom) {
      setError("Please select a room.");
      return;
    }

    if (!checkIn || !checkOut) {
      setError("Please select check-in and check-out dates.");
      return;
    }

    if (checkIn < today) {
      setError("Check-in date cannot be in the past.");
      return;
    }

    if (checkOut <= checkIn) {
      setError("Check-out must be after check-in.");
      return;
    }

    if (Number(guests) > selectedRoom.capacity) {
      setError(`This room allows a maximum of ${selectedRoom.capacity} guests.`);
      return;
    }

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      setError("Please complete all required guest information.");
      return;
    }

    const newBookingId = `BK-${Date.now()}`;

    const newBooking = {
      id: newBookingId,
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      roomImage: selectedRoom.image,
      pricePerNight: roomPrice,
      checkIn,
      checkOut,
      guests: Number(guests),
      nights,
      totalPrice,
      guest: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      },
      specialRequests: formData.requests,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    // Save booking to localStorage
    const existingBookings = JSON.parse(
      localStorage.getItem("hotel_bookings") || "[]"
    );

    localStorage.setItem(
      "hotel_bookings",
      JSON.stringify([...existingBookings, newBooking])
    );

    setBookingId(newBookingId);
    setSuccess(true);
  };

  // Success screen
  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf8f2] px-5 py-12">
        <div className="w-full max-w-lg rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
          <CheckCircle
            size={60}
            className="mx-auto mb-5 text-green-600"
          />

          <h1 className="text-3xl font-bold text-[#173d35]">
            Booking Successful!
          </h1>

          <p className="mt-3 text-stone-500">
            Your booking request has been saved successfully.
          </p>

          <div className="my-7 rounded-xl bg-[#faf8f2] p-5">
            <p className="text-sm text-stone-500">Your Booking ID</p>
            <p className="mt-2 text-xl font-bold text-[#a97831]">
              {bookingId}
            </p>

            <div className="mt-5 space-y-2 text-sm text-stone-600">
              <p>{selectedRoom?.name}</p>
              <p>{nights} Nights · {guests} Guests</p>
              <p className="font-bold text-[#173d35]">
                Total: ${totalPrice}
              </p>
            </div>
          </div>

          <Link
            to="/rooms"
            className="inline-block w-full rounded-lg bg-[#173d35] px-6 py-4 font-bold text-white transition hover:bg-[#205747]"
          >
            Explore More Rooms
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f2] px-5 py-14 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Page Header */}
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[3px] text-[#a97831]">
            Your journey begins here
          </span>

          <h1 className="mt-3 font-serif text-4xl font-bold text-[#173d35] sm:text-5xl">
            Make a Reservation
          </h1>

          <p className="mt-3 text-sm text-stone-500">
            Fill in your details below to plan your perfect stay.
          </p>
        </div>

        <form onSubmit={handleBooking}>
          <div className="grid items-start gap-8 lg:grid-cols-[1.4fr_0.8fr]">

            {/* Booking Form */}
            <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">

              <h2 className="mb-7 font-serif text-2xl font-bold text-[#173d35]">
                Booking Information
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">

                {/* Check-in */}
                <label className="text-xs font-semibold text-stone-600">
                  Check-in Date

                  <input
                    type="date"
                    min={today}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-stone-200 bg-[#faf8f2] p-3.5 text-sm font-normal outline-none focus:border-[#a97831]"
                  />
                </label>

                {/* Check-out */}
                <label className="text-xs font-semibold text-stone-600">
                  Check-out Date

                  <input
                    type="date"
                    min={checkIn || today}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-stone-200 bg-[#faf8f2] p-3.5 text-sm font-normal outline-none focus:border-[#a97831]"
                  />
                </label>

                {/* Guests */}
                <label className="text-xs font-semibold text-stone-600">
                  Number of Guests

                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-stone-200 bg-[#faf8f2] p-3.5 text-sm font-normal outline-none focus:border-[#a97831]"
                  >
                    {Array.from(
                      { length: selectedRoom?.capacity || 4 },
                      (_, i) => i + 1
                    ).map((number) => (
                      <option key={number} value={number}>
                        {number} {number === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </label>

                {/* Room Type */}
                <label className="text-xs font-semibold text-stone-600">
                  Room Type

                  <select
                    value={roomId}
                    onChange={(e) => {
                      setRoomId(e.target.value);
                      setGuests("1");
                    }}
                    className="mt-2 w-full rounded-lg border border-stone-200 bg-[#faf8f2] p-3.5 text-sm font-normal outline-none focus:border-[#a97831]"
                  >
                    <option value="">Select a room</option>

                    {rooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name} - ${room.price}/night
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {/* Guest Information */}
              <h3 className="mb-5 mt-9 font-serif text-xl font-bold text-[#173d35]">
                Guest Information
              </h3>

              <div className="grid gap-5 sm:grid-cols-2">

                <label className="text-xs font-semibold text-stone-600">
                  First Name

                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Enter first name"
                    className="mt-2 w-full rounded-lg border border-stone-200 p-3.5 text-sm font-normal outline-none focus:border-[#a97831]"
                  />
                </label>

                <label className="text-xs font-semibold text-stone-600">
                  Last Name

                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Enter last name"
                    className="mt-2 w-full rounded-lg border border-stone-200 p-3.5 text-sm font-normal outline-none focus:border-[#a97831]"
                  />
                </label>

                <label className="text-xs font-semibold text-stone-600">
                  Email Address

                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-lg border border-stone-200 p-3.5 text-sm font-normal outline-none focus:border-[#a97831]"
                  />
                </label>

                <label className="text-xs font-semibold text-stone-600">
                  Phone Number

                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+252 63 000 0000"
                    className="mt-2 w-full rounded-lg border border-stone-200 p-3.5 text-sm font-normal outline-none focus:border-[#a97831]"
                  />
                </label>
              </div>

              {/* Special Requests */}
              <label className="mt-6 block text-xs font-semibold text-stone-600">
                Special Requests (Optional)

                <textarea
                  name="requests"
                  value={formData.requests}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Any special requests for your stay..."
                  className="mt-2 w-full resize-y rounded-lg border border-stone-200 p-3.5 text-sm font-normal outline-none focus:border-[#a97831]"
                />
              </label>

              {error && (
                <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="mt-7 w-full rounded-lg bg-[#123d32] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#205747]"
              >
                Confirm Booking →
              </button>
            </section>

            {/* Booking Summary */}
            <aside className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">

              <div className="bg-[#173d35] p-6 text-white">
                <h2 className="font-serif text-2xl font-bold">
                  Booking Summary
                </h2>

                <p className="mt-1 text-sm text-white/65">
                  Your reservation details
                </p>
              </div>

              <div className="p-6">

                {selectedRoom ? (
                  <>
                    <img
                      src={selectedRoom.image}
                      alt={selectedRoom.name}
                      className="h-48 w-full rounded-xl object-cover"
                    />

                    <h3 className="mt-4 font-serif text-xl font-bold text-[#173d35]">
                      {selectedRoom.name}
                    </h3>

                    <p className="mt-1 text-sm text-stone-500">
                      ${selectedRoom.price} / night
                    </p>
                  </>
                ) : (
                  <div className="flex h-48 items-center justify-center rounded-xl bg-[#faf8f2] text-sm text-stone-500">
                    Select a room to see details
                  </div>
                )}

                <div className="my-6 space-y-4 border-b border-stone-200 pb-6 text-sm text-stone-600">

                  <p className="flex items-center gap-3">
                    <CalendarDays size={17} className="shrink-0 text-[#a97831]" />
                    {checkIn && checkOut
                      ? `${checkIn} — ${checkOut}`
                      : "Select your check-in and check-out"}
                  </p>

                  <p className="flex items-center gap-3">
                    <Users size={17} className="shrink-0 text-[#a97831]" />
                    {guests} {Number(guests) === 1 ? "Guest" : "Guests"}
                  </p>

                  <p className="flex items-center gap-3">
                    <Tag size={17} className="shrink-0 text-[#a97831]" />
                    Flexible reservation
                  </p>
                </div>

                {/* Price Calculation */}
                <div className="space-y-4 text-sm">

                  <div className="flex justify-between text-stone-600">
                    <span>Room price</span>
                    <span>
                      ${roomPrice} × {nights > 0 ? nights : 0} nights
                    </span>
                  </div>

                  <div className="flex justify-between text-stone-600">
                    <span>Taxes & fees</span>
                    <span>Not included</span>
                  </div>

                  <div className="flex justify-between border-t border-stone-200 pt-4 font-bold text-[#173d35]">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3 rounded-xl bg-[#edf4ec] p-4 text-xs leading-5 text-[#315747]">
                  <ShieldCheck className="shrink-0" size={20} />
                  Your personal information is handled with care.
                </div>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;
