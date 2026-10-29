
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserRound,
  CalendarDays,
  BedDouble,
  LayoutDashboard,
  LogOut,
  Eye,
  X,
  Users,
  CreditCard,
} from "lucide-react";

// Safely read localStorage
const getStorageData = (key, fallback) => {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return data ?? fallback;
  } catch {
    return fallback;
  }
};

const MyBookings = () => {
  const currentUser = getStorageData("current_user", null);
  const allBookings = getStorageData("hotel_bookings", []);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  // Match bookings with logged-in user
  const bookings = currentUser
    ? allBookings.filter((booking) => {
        const userEmail = currentUser.email?.toLowerCase();
        const bookingEmail = booking.userEmail?.toLowerCase();
        const guestEmail = booking.guest?.email?.toLowerCase();

        return (
          (currentUser.id && booking.userId === currentUser.id) ||
          (userEmail && bookingEmail === userEmail) ||
          (userEmail && guestEmail === userEmail)
        );
      })
    : [];

  const filters = [
    "All",
    "Pending",
    "Confirmed",
    "Completed",
    "Cancelled",
  ];

  // Apply status filter
  const filteredBookings =
    activeFilter === "All"
      ? bookings
      : bookings.filter(
          (booking) => booking.status === activeFilter
        );

  // Format dates
  const formatDate = (date) => {
    if (!date) return "Not selected";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    );
  };

  // Status styles
  const statusStyle = {
    Pending: "bg-amber-100 text-amber-700",
    Confirmed: "bg-green-100 text-green-700",
    Completed: "bg-blue-100 text-blue-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  // Login required
  if (!currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf8f2] px-5">
        <div className="max-w-md rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
          <UserRound
            size={45}
            className="mx-auto text-[#a97831]"
          />

          <h1 className="mt-5 text-2xl font-bold text-[#173d35]">
            Login Required
          </h1>

          <p className="mt-3 text-sm text-stone-500">
            Please sign in to view your reservations.
          </p>

          <Link
            to="/login"
            className="mt-6 inline-block rounded-lg bg-[#173d35] px-6 py-3 font-semibold text-white transition hover:bg-[#205747]"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f2]">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-[2px] text-[#a97831]">
            Your personal space
          </span>

          <h1 className="mt-2 font-serif text-4xl font-bold text-[#173d35]">
            My Bookings
          </h1>

          <p className="mt-2 text-sm text-stone-500">
            View and manage your hotel reservation details.
          </p>
        </div>

        <div className="grid items-start gap-7 lg:grid-cols-[240px_1fr]">

          {/* Sidebar */}
          <aside className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
            <div className="bg-[#123d32] px-5 py-7 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#e7bd75] bg-white/10 text-white">
                <UserRound size={31} />
              </div>

              <h2 className="mt-3 font-serif text-xl font-bold text-white">
                {currentUser.fullName || "Guest"}
              </h2>

              <p className="mt-1 break-all text-xs text-white/60">
                {currentUser.email}
              </p>
            </div>

            <div className="space-y-1 p-3">
              <div className="flex items-center gap-3 rounded-lg bg-[#eaf0e8] px-4 py-3 text-sm font-semibold text-[#173d35]">
                <LayoutDashboard size={18} />
                My Bookings
              </div>

              <Link
                to="/profile"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-stone-500 transition hover:bg-stone-50"
              >
                <UserRound size={18} />
                My Profile
              </Link>

              <Link
                to="/logout"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-stone-500 transition hover:bg-stone-50"
              >
                <LogOut size={18} />
                Logout
              </Link>
            </div>
          </aside>

          {/* Reservations */}
          <section className="min-w-0 overflow-hidden rounded-2xl border border-stone-200 bg-white">

            {/* Reservation Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 p-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#173d35]">
                  Reservation History
                </h2>

                <p className="mt-1 text-sm text-stone-500">
                  Your upcoming and previous stays.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-[#edf2e9] px-4 py-2.5 text-sm font-medium text-[#173d35]">
                <CalendarDays size={17} />
                {bookings.length} Reservations
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 border-b border-stone-100 p-5">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                    activeFilter === filter
                      ? "bg-[#173d35] text-white"
                      : "bg-[#faf8f2] text-stone-500 hover:bg-stone-100"
                  }`}
                >
                  {filter}
                  {filter === "All" && ` (${bookings.length})`}
                </button>
              ))}
            </div>

            {/* Booking List */}
            {filteredBookings.length > 0 ? (
              <div className="divide-y divide-stone-100">
                {filteredBookings.map((booking) => (
                  <article
                    key={booking.id}
                    className="grid gap-4 p-5 sm:grid-cols-[110px_1fr_auto] sm:items-center sm:p-6"
                  >
                    <img
                      src={booking.roomImage}
                      alt={booking.roomName}
                      className="h-24 w-full rounded-xl object-cover sm:w-[110px]"
                    />

                    <div>
                      <p className="text-xs text-stone-400">
                        {booking.id}
                      </p>

                      <h3 className="mt-1 font-serif text-lg font-bold text-[#173d35]">
                        {booking.roomName}
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-stone-500">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={14} />
                          {formatDate(booking.checkIn)}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <BedDouble size={14} />
                          {booking.guests} Guests
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-stone-500">
                        Check-out: {formatDate(booking.checkOut)}
                      </p>

                      <p className="mt-2 text-sm font-semibold text-[#173d35]">
                        ${booking.totalPrice}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          statusStyle[booking.status] ||
                          "bg-stone-100 text-stone-600"
                        }`}
                      >
                        {booking.status || "Pending"}
                      </span>

                      <button
                        type="button"
                        onClick={() => setSelectedBooking(booking)}
                        className="flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-2 text-xs font-semibold text-[#173d35] transition hover:bg-stone-50"
                      >
                        <Eye size={14} />
                        View Details
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="px-6 py-16 text-center">
                <BedDouble
                  size={45}
                  className="mx-auto text-stone-300"
                />

                <h3 className="mt-4 text-xl font-bold text-[#173d35]">
                  {bookings.length === 0
                    ? "No Bookings Yet"
                    : `No ${activeFilter} Bookings`}
                </h3>

                <p className="mt-2 text-sm text-stone-500">
                  {bookings.length === 0
                    ? "You haven't made any reservations yet. Explore our rooms and book your stay."
                    : "There are no reservations with this status."}
                </p>

                {bookings.length === 0 && (
                  <Link
                    to="/rooms"
                    className="mt-6 inline-block rounded-lg bg-[#173d35] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#205747]"
                  >
                    Explore Rooms
                  </Link>
                )}
              </div>
            )}

            <div className="border-t border-stone-200 bg-[#faf8f2] px-6 py-4 text-xs text-stone-500">
              Showing your personal reservation records.
            </div>
          </section>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-[#173d35] p-5 text-white">
              <h2 className="font-serif text-xl font-bold">
                Booking Details
              </h2>

              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="rounded-lg p-2 transition hover:bg-white/10"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <img
                src={selectedBooking.roomImage}
                alt={selectedBooking.roomName}
                className="h-48 w-full rounded-xl object-cover"
              />

              <h3 className="mt-4 font-serif text-2xl font-bold text-[#173d35]">
                {selectedBooking.roomName}
              </h3>

              <p className="mt-1 text-sm text-stone-500">
                Booking ID: {selectedBooking.id}
              </p>

              <div className="mt-5 space-y-4 text-sm">

                <div className="flex justify-between">
                  <span className="text-stone-500">Status</span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      statusStyle[selectedBooking.status] ||
                      "bg-stone-100 text-stone-600"
                    }`}
                  >
                    {selectedBooking.status || "Pending"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center gap-2 text-stone-500">
                    <CalendarDays size={16} />
                    Check-in
                  </span>

                  <span className="font-medium text-[#173d35]">
                    {formatDate(selectedBooking.checkIn)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center gap-2 text-stone-500">
                    <CalendarDays size={16} />
                    Check-out
                  </span>

                  <span className="font-medium text-[#173d35]">
                    {formatDate(selectedBooking.checkOut)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center gap-2 text-stone-500">
                    <Users size={16} />
                    Guests
                  </span>

                  <span className="font-medium text-[#173d35]">
                    {selectedBooking.guests}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-stone-500">
                    Number of nights
                  </span>

                  <span className="font-medium text-[#173d35]">
                    {selectedBooking.nights}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-stone-500">
                    Price per night
                  </span>

                  <span className="font-medium text-[#173d35]">
                    ${selectedBooking.pricePerNight}
                  </span>
                </div>

                <div className="flex justify-between border-t border-stone-200 pt-4">
                  <span className="flex items-center gap-2 font-semibold text-[#173d35]">
                    <CreditCard size={17} />
                    Total Price
                  </span>

                  <span className="text-lg font-bold text-[#a97831]">
                    ${selectedBooking.totalPrice}
                  </span>
                </div>

                {selectedBooking.specialRequests && (
                  <div className="rounded-lg bg-[#faf8f2] p-4">
                    <p className="font-semibold text-[#173d35]">
                      Special Requests
                    </p>

                    <p className="mt-2 text-stone-600">
                      {selectedBooking.specialRequests}
                    </p>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="mt-6 w-full rounded-lg bg-[#173d35] py-3 font-semibold text-white transition hover:bg-[#205747]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
