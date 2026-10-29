import { Link } from "react-router-dom";
import { Crown, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#12372f] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3 lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Crown className="text-[#e7bd75]" size={30} />
            <span className="font-serif text-2xl font-bold">RoyalStay</span>
          </div>
          <p className="max-w-sm text-sm leading-7 text-white/65">
            Discover exceptional comfort, thoughtful hospitality, and
            unforgettable luxury experiences.
          </p>
        </div>

        <div>
          <h3 className="mb-5 font-serif text-lg text-[#e7bd75]">
            Quick Links
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-white/70">
            <Link to="/">Home</Link>
            <Link to="/rooms">Our Rooms</Link>
            <Link to="/services">Services</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/my-bookings">My Bookings</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-5 font-serif text-lg text-[#e7bd75]">
            Contact Information
          </h3>
          <div className="space-y-4 text-sm text-white/70">
            <p className="flex items-center gap-3">
              <MapPin size={17} className="text-[#e7bd75]" />
              Hargeisa, Somaliland
            </p>
            <p className="flex items-center gap-3">
              <Phone size={17} className="text-[#e7bd75]" />
              +252 63 000 0000
            </p>
            <p className="flex items-center gap-3">
              <Mail size={17} className="text-[#e7bd75]" />
              info@royalstay.com
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/50">
        © 2026 RoyalStay Hotel & Resort. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;