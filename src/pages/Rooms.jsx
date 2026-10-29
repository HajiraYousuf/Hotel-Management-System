
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Search, Users, X } from "lucide-react";

import RoomCard from "../components/RoomCard";
import rooms from "../data/rooms";

const categories = [
  "All Rooms",
  "Standard",
  "Deluxe",
  "Executive",
  "Family",
  "Suites",
];

const Rooms = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const [guests, setGuests] = useState(
    searchParams.get("guests") || "2"
  );

  const [activeCategory, setActiveCategory] = useState("All Rooms");
  const [maxPrice, setMaxPrice] = useState("500");
  const [showFilters, setShowFilters] = useState(false);

  // FILTER ROOMS
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    const matchesGuests = room.capacity >= Number(guests);

    const matchesCategory =
      activeCategory === "All Rooms" ||
      room.category === activeCategory;

    const matchesPrice = room.price <= Number(maxPrice);

    return (
      matchesSearch &&
      matchesGuests &&
      matchesCategory &&
      matchesPrice
    );
  });

  // UPDATE URL SEARCH
  const handleSearch = (e) => {
    e.preventDefault();

    setSearchParams({
      search: searchTerm,
      guests: guests,
    });
  };

  // RESET FILTERS
  const clearFilters = () => {
    setSearchTerm("");
    setGuests("2");
    setActiveCategory("All Rooms");
    setMaxPrice("500");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#faf8f2]">

      {/* PAGE HERO */}
      <section className="relative flex h-64 items-center justify-center overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1800&q=85"
          alt="Elegant hotel room"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[#092b24]/65" />

        <div className="relative px-5 text-center text-white">

          <span className="text-xs font-bold uppercase tracking-[3px] text-[#e7bd75]">
            Find your perfect stay
          </span>

          <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
            Our Rooms
          </h1>

          <p className="mt-3 text-sm text-white/80">
            Comfortable rooms, elegant design and modern amenities.
          </p>

        </div>
      </section>

      {/* ROOMS CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

        {/* SEARCH AND FILTER */}
        <div className="mb-8 rounded-xl border border-stone-200 bg-white p-4">

          <form
            onSubmit={handleSearch}
            className="grid gap-3 md:grid-cols-3"
          >

            {/* SEARCH */}
            <label className="flex items-center gap-3 rounded-lg bg-stone-50 p-3">

              <Search size={19} className="shrink-0 text-[#a97831]" />

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

              <Users size={19} className="shrink-0 text-[#a97831]" />

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
              className="flex items-center justify-center gap-2 rounded-lg bg-[#123d32] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#205747]"
            >
              <Search size={17} />
              Search Rooms
            </button>

          </form>

          {/* CATEGORY FILTER */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">

            <div className="flex flex-wrap gap-2">

              {categories.map((category) => (

                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-5 py-2.5 text-xs font-semibold transition ${
                    activeCategory === category
                      ? "bg-[#123d32] text-white"
                      : "bg-stone-50 text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  {category}
                </button>

              ))}

            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-lg border border-stone-200 px-4 py-3 text-sm text-stone-600 transition hover:bg-stone-50"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>

          </div>

          {/* ADVANCED FILTER */}
          {showFilters && (
            <div className="mt-5 rounded-lg bg-stone-50 p-5">

              <div className="flex flex-wrap items-center justify-between gap-4">

                <div className="w-full max-w-xs">

                  <label className="text-sm font-semibold text-[#173d35]">
                    Maximum Price: ${maxPrice}
                  </label>

                  <input
                    type="range"
                    min="80"
                    max="500"
                    step="10"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="mt-3 w-full accent-[#123d32]"
                  />

                  <div className="flex justify-between text-xs text-stone-500">
                    <span>$80</span>
                    <span>$500</span>
                  </div>

                </div>

                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
                >
                  <X size={16} />
                  Clear Filters
                </button>

              </div>

            </div>
          )}

        </div>

        {/* ROOM RESULTS HEADER */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">

          <div>
            <h2 className="font-serif text-2xl font-bold text-[#173d35]">
              Explore Our Rooms
            </h2>

            <p className="mt-1 text-sm text-stone-500">
              Find the perfect space for your stay.
            </p>
          </div>

          <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#173d35]">
            {filteredRooms.length.toString().padStart(2, "0")} Rooms Found
          </span>

        </div>

        {/* ROOM CARDS */}
        {filteredRooms.length > 0 ? (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {filteredRooms.map((room) => (
              <RoomCard key={room.id} {...room} />
            ))}

          </div>

        ) : (

          /* EMPTY STATE */
          <div className="rounded-2xl border border-stone-200 bg-white px-5 py-16 text-center">

            <Search size={40} className="mx-auto text-stone-300" />

            <h3 className="mt-4 font-serif text-xl font-bold text-[#173d35]">
              No Rooms Found
            </h3>

            <p className="mt-2 text-sm text-stone-500">
              We couldn't find any rooms matching your search.
              Try changing your filters.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 rounded-lg bg-[#123d32] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#205747]"
            >
              Clear All Filters
            </button>

          </div>

        )}

      </section>
    </div>
  );
};

export default Rooms;
