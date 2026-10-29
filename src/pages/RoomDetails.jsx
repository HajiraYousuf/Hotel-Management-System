
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Users,
  Maximize,
  BedDouble,
  Wifi,
  Wind,
  Tv,
  Coffee,
  Bath,
  ShieldCheck,
  Check,
} from "lucide-react";

import rooms from "../data/rooms";

const amenityIcons = {
  "Free WiFi": Wifi,
  "Air Conditioning": Wind,
  "Flat-screen TV": Tv,
  "Mini Bar": Coffee,
  "Room Service": Bath,
  "Safe Box": ShieldCheck,
};

const RoomDetails =()=> {
  const { id } = useParams();
  const navigate = useNavigate();

  const room = rooms.find((item) => item.id === Number(id));

  const [activeImage, setActiveImage] = useState(0);

  if (!room) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf8f2] px-5 text-center">
        <h2 className="mb-3 text-3xl font-bold text-[#173d35]">
          Room Not Found
        </h2>
        <p className="mb-6 text-stone-500">
          Sorry, this room does not exist.
        </p>
        <Link
          to="/rooms"
          className="rounded-lg bg-[#173d35] px-6 py-3 text-white"
        >
          Browse Rooms
        </Link>
      </div>
    );
  }

  const gallery = room.gallery?.length
    ? room.gallery
    : [room.image];

  
const handleBooking = () => {
  const bookingDetails = {
    roomId: room.id,
    roomName: room.name,
    price: room.price,
  };

  const currentUser = JSON.parse(
    localStorage.getItem("current_user") || "null"
  );

  if (!currentUser) {
    navigate("/login", {
      state: {
        from: {
          pathname: "/booking",
          state: bookingDetails,
        },
      },
    });

    return;
  }

  navigate("/booking", {
    state: bookingDetails,
  });
};

  return (
    <main className="min-h-screen bg-[#faf8f2] px-5 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Back Navigation */}
        <Link
          to="/rooms"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-[#a97831]"
        >
          <ArrowLeft size={18} />
          Back to Rooms
        </Link>

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="mb-3 inline-block rounded-full bg-[#e7bd75]/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#a97831]">
              {room.category}
            </span>

            <h1 className="text-3xl font-bold text-[#173d35] md:text-5xl">
              {room.name}
            </h1>

            <div className="mt-3 flex items-center gap-2 text-sm text-stone-500">
              <Star size={17} className="fill-[#d9a441] text-[#d9a441]" />
              <span className="font-semibold text-stone-700">
                {room.rating}
              </span>
              <span>({room.reviews} reviews)</span>
            </div>
          </div>

          <div>
            <span className="text-3xl font-bold text-[#173d35]">
              ${room.price}
            </span>
            <span className="text-stone-500"> / night</span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="relative overflow-hidden rounded-2xl lg:col-span-2">
            <img
              src={gallery[activeImage]}
              alt={room.name}
              className="h-[300px] w-full object-cover sm:h-[450px]"
            />

            {gallery.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveImage(
                      (activeImage - 1 + gallery.length) % gallery.length
                    )
                  }
                  className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#173d35] shadow-md transition hover:bg-[#e7bd75]"
                  aria-label="Previous image"
                >
                  <ArrowLeft size={20} />
                </button>

                <button
                  onClick={() =>
                    setActiveImage((activeImage + 1) % gallery.length)
                  }
                  className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#173d35] shadow-md transition hover:bg-[#e7bd75]"
                  aria-label="Next image"
                >
                  <ArrowRight size={20} />
                </button>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
            {gallery.slice(0, 2).map((image, index) => (
              <button
                key={image}
                onClick={() => setActiveImage(index)}
                className={`overflow-hidden rounded-2xl border-2 ${
                  activeImage === index
                    ? "border-[#a97831]"
                    : "border-transparent"
                }`}
              >
                <img
                  src={image}
                  alt={`${room.name} view ${index + 1}`}
                  className="h-[140px] w-full object-cover transition duration-300 hover:scale-105 sm:h-[215px]"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Room Information */}
        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">

            {/* Room Features */}
            <div className="grid grid-cols-2 gap-4 border-b border-stone-200 pb-8 sm:grid-cols-4">
              <div className="flex items-center gap-3">
                <Users className="text-[#a97831]" size={22} />
                <div>
                  <p className="text-xs text-stone-500">Guests</p>
                  <p className="font-semibold text-[#173d35]">
                    {room.capacity} Guests
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Maximize className="text-[#a97831]" size={22} />
                <div>
                  <p className="text-xs text-stone-500">Room Size</p>
                  <p className="font-semibold text-[#173d35]">
                    {room.size}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <BedDouble className="text-[#a97831]" size={22} />
                <div>
                  <p className="text-xs text-stone-500">Bed Type</p>
                  <p className="font-semibold text-[#173d35]">
                    {room.bed}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Star className="text-[#a97831]" size={22} />
                <div>
                  <p className="text-xs text-stone-500">Rating</p>
                  <p className="font-semibold text-[#173d35]">
                    {room.rating}/5
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <section className="border-b border-stone-200 py-8">
              <h2 className="mb-4 text-2xl font-bold text-[#173d35]">
                About This Room
              </h2>

              <p className="leading-8 text-stone-600">
                {room.description}
              </p>
            </section>

            {/* Amenities */}
            <section className="py-8">
              <h2 className="mb-6 text-2xl font-bold text-[#173d35]">
                Room Amenities
              </h2>

              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
                {room.amenities?.map((amenity) => {
                  const Icon = amenityIcons[amenity] || Check;

                  return (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 text-stone-600"
                    >
                      <Icon size={20} className="text-[#a97831]" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Booking Information - No booking form here */}
          <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-7 shadow-sm">
            <p className="text-sm font-medium text-stone-500">
              Your Stay
            </p>

            <div className="my-4">
              <span className="text-4xl font-bold text-[#173d35]">
                ${room.price}
              </span>
              <span className="text-stone-500"> / night</span>
            </div>

            <div className="space-y-4 border-y border-stone-200 py-5">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Room</span>
                <span className="font-semibold text-[#173d35]">
                  {room.name}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Maximum Guests</span>
                <span className="font-semibold text-[#173d35]">
                  {room.capacity}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Room Size</span>
                <span className="font-semibold text-[#173d35]">
                  {room.size}
                </span>
              </div>
            </div>

            <button
              onClick={handleBooking}
              className="mt-6 w-full rounded-xl bg-[#173d35] px-5 py-4 font-semibold text-white transition hover:bg-[#a97831]"
            >
              Book This Room
            </button>

            <p className="mt-4 text-center text-xs text-stone-400">
              Continue to the booking page to reserve this room.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
export default RoomDetails;