import { Link } from "react-router-dom";
import { Star, Users, BedDouble, Maximize2 } from "lucide-react";

const RoomCard = ({ id, image, name, price, description, size = "30 m²" }) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-[#173d35] px-3 py-1.5 text-xs font-medium text-white">
          Luxury Stay
        </span>
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-serif text-xl font-bold text-[#173d35]">
            {name}
          </h3>
          <span className="shrink-0 text-sm font-bold text-[#a97831]">
            {price}
            <span className="font-normal text-stone-500"> /night</span>
          </span>
        </div>

        <div className="mb-3 flex items-center gap-1 text-[#d59b3c]">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} size={13} fill="currentColor" />
          ))}
          <span className="ml-1 text-xs text-stone-500">
            4.9 (124 reviews)
          </span>
        </div>

        <p className="mb-5 text-sm leading-6 text-stone-500">
          {description}
        </p>

        <div className="mb-5 flex flex-wrap gap-4 border-b border-stone-100 pb-4 text-xs text-stone-600">
          <span className="flex items-center gap-1.5">
            <Users size={15} /> 2 Guests
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble size={15} /> 1 King Bed
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize2 size={14} /> {size}
          </span>
        </div>

        <Link
          to={`/rooms/${id}`}
          className="block rounded-lg bg-[#123d32] py-3 text-center text-sm font-semibold text-white transition hover:bg-[#205747]"
        >
          View Details
        </Link>
      </div>
    </article>
  );
};

export default RoomCard;
