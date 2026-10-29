import { Award, HeartHandshake, ShieldCheck, MapPin, Star } from "lucide-react";

const About = () => (
  <div className="bg-[#faf8f2]">
    <section className="relative flex min-h-[310px] items-center overflow-hidden">
      <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=90" alt="RoyalStay hotel exterior" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#092b24]/90 via-[#092b24]/55 to-transparent" />
      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        <span className="text-xs font-bold uppercase tracking-[3px] text-[#e7bd75]">Our story & hospitality</span>
        <h1 className="mt-3 font-serif text-5xl font-bold text-white">About RoyalStay</h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-white/80">More than just a hotel — we create memorable experiences for every guest.</p>
      </div>
    </section>

    <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
      <div>
        <span className="text-xs font-bold uppercase tracking-[2px] text-[#a97831]">Welcome to our world</span>
        <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#173d35] sm:text-4xl">Hospitality That Feels Like Home</h2>
        <p className="mt-6 text-sm leading-8 text-stone-600">At RoyalStay Hotel & Resort, we believe that every stay should be special. Our approach combines elegant spaces, thoughtful amenities and genuine hospitality to create a comfortable experience for every guest.</p>
        <p className="mt-4 text-sm leading-8 text-stone-600">Whether you are travelling for business, enjoying a family holiday or celebrating a special occasion, our team is dedicated to making your visit relaxing and memorable.</p>
        <div className="mt-7 grid grid-cols-2 gap-5">
          <div className="rounded-xl border border-stone-200 bg-white p-5"><p className="font-serif text-3xl font-bold text-[#a97831]">24/7</p><p className="mt-2 text-xs text-stone-500">Guest Assistance</p></div>
          <div className="rounded-xl border border-stone-200 bg-white p-5"><p className="font-serif text-3xl font-bold text-[#a97831]">5-Star</p><p className="mt-2 text-xs text-stone-500">Luxury Experience</p></div>
        </div>
      </div>
      <div className="relative">
        <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1100&q=90" alt="Beautiful RoyalStay guest room" className="h-[480px] w-full rounded-2xl object-cover shadow-lg" />
        <div className="absolute -bottom-5 left-4 right-4 rounded-xl border border-stone-200 bg-white p-5 shadow-lg sm:left-8 sm:right-8">
          <div className="flex items-center gap-3">
            <HeartHandshake className="text-[#a97831]" size={34} />
            <div><h3 className="font-serif text-lg font-bold text-[#173d35]">Your Comfort Is Our Priority</h3><p className="mt-1 text-xs text-stone-500">Thoughtful hospitality in every detail.</p></div>
          </div>
        </div>
      </div>
    </section>

    <section className="border-y border-stone-200 bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 text-center"><span className="text-xs font-bold uppercase tracking-[2px] text-[#a97831]">The RoyalStay promise</span><h2 className="mt-3 font-serif text-3xl font-bold text-[#173d35]">Why Choose Us?</h2></div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: MapPin, title: "Prime Location", desc: "Convenient access to nearby attractions and essential destinations." },
            { icon: Award, title: "Quality Service", desc: "Attentive hospitality focused on every guest's needs." },
            { icon: ShieldCheck, title: "Comfort & Safety", desc: "A welcoming environment designed for peace of mind." },
            { icon: Star, title: "Luxury & Comfort", desc: "Beautiful rooms and thoughtful modern amenities." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-stone-100 bg-[#faf8f2] p-6">
              <Icon size={28} className="text-[#a97831]" />
              <h3 className="mt-4 font-serif text-lg font-bold text-[#173d35]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-stone-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;