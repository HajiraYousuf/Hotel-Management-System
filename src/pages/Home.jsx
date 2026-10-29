
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Users,
  ShieldCheck,
  Clock,
  Wifi,
  Star,
} from "lucide-react";

import RoomCard from "../components/RoomCard";
import rooms from "../data/rooms";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [guests, setGuests] = useState("2");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(
      `/rooms?search=${encodeURIComponent(searchTerm)}&guests=${guests}`
    );
  };

  const features = [
    {
      icon: ShieldCheck,
      title: "Best Price Guarantee",
      sub: "Get the best rates",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      sub: "We're always here",
    },
    {
      icon: Wifi,
      title: "Free WiFi",
      sub: "Stay connected",
    },
    {
      icon: Star,
      title: "Luxury Experience",
      sub: "More than just a stay",
    },
  ];

  return (
    <div className="bg-[#faf8f2]">

      {/* HERO SECTION */}
      <section className="relative flex min-h-[570px] items-center overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=90"
          alt="RoyalStay Luxury Hotel"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#092b24]/90 via-[#092b24]/55 to-black/10" />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">

          <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[3px] text-[#edc57d]">
            Welcome to RoyalStay Hotel
          </span>

          <h1 className="max-w-2xl font-serif text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
            Luxury Stay.
            <br />
            Unforgettable Experience.
          </h1>

          <p className="mt-6 max-w-lg text-sm leading-7 text-white/80 sm:text-base">
            Relax, unwind and enjoy the perfect blend of comfort and elegance
            at your home away from home.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              to="/booking"
              className="rounded-lg bg-[#e7bd75] px-6 py-3.5 text-sm font-bold text-[#173d35] transition hover:bg-white"
            >
              Book Your Stay
            </Link>

            <Link
              to="/rooms"
              className="rounded-lg border border-white/60 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore Rooms
            </Link>

          </div>
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-5">

        <form
          onSubmit={handleSearch}
          className="grid gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-xl md:grid-cols-3 md:p-5"
        >

          {/* ROOM SEARCH */}
          <label className="flex items-center gap-3 rounded-lg bg-stone-50 p-3">

            <Search className="shrink-0 text-[#a97831]" size={20} />

            <span className="w-full text-xs text-stone-500">
              Search Room

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter room name..."
                className="mt-1 block w-full bg-transparent text-sm text-[#173d35] outline-none"
              />
            </span>

          </label>

          {/* GUESTS */}
          <label className="flex items-center gap-3 rounded-lg bg-stone-50 p-3">

            <Users className="shrink-0 text-[#a97831]" size={20} />

            <span className="w-full text-xs text-stone-500">
              Guests

              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="mt-1 block w-full bg-transparent text-sm text-[#173d35] outline-none"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
              </select>
            </span>

          </label>

          {/* SEARCH BUTTON */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-lg bg-[#123d32] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#205747]"
          >
            <Search size={17} />
            Search Rooms
          </button>

        </form>
      </section>

      {/* FEATURED ROOMS */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="mb-9 flex items-end justify-between gap-4">

          <div>
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#ae813f]">
              Stay in comfort
            </span>

            <h2 className="mt-2 font-serif text-3xl font-bold text-[#173d35] sm:text-4xl">
              Featured Rooms
            </h2>

            <p className="mt-2 text-sm text-stone-500">
              Discover our most popular rooms designed for your comfort.
            </p>
          </div>

          <Link
            to="/rooms"
            className="hidden text-sm font-semibold text-[#a97831] hover:underline sm:block"
          >
            View All Rooms →
          </Link>

        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {rooms.slice(0, 4).map((room) => (
            <RoomCard key={room.id} {...room} />
          ))}

        </div>
      </section>

      {/* HOTEL FEATURES */}
      <section className="border-y border-stone-200 bg-white">

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-7 px-6 py-10 md:grid-cols-4 lg:px-8">

          {features.map(({ icon: Icon, title, sub }) => (

            <div key={title} className="flex items-center gap-3">

              <Icon
                className="shrink-0 text-[#b58a48]"
                size={25}
              />

              <div>
                <h3 className="text-sm font-bold text-[#173d35]">
                  {title}
                </h3>

                <p className="mt-1 text-xs text-stone-500">
                  {sub}
                </p>
              </div>

            </div>

          ))}

        </div>
      </section>

    </div>
  );
};

export default Home;
