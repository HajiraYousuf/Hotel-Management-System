import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const Contact = () => (
  <div className="min-h-screen bg-[#faf8f2]">
    <section className="relative flex h-64 items-center overflow-hidden">
      <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1800&q=85" alt="RoyalStay resort" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[#092b24]/70" />
      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        <span className="text-xs font-bold uppercase tracking-[3px] text-[#e7bd75]">We're here to help</span>
        <h1 className="mt-3 font-serif text-5xl font-bold text-white">Get in Touch</h1>
        <p className="mt-4 text-sm text-white/80">We would love to hear from you. Let us help plan your perfect stay.</p>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="text-xs font-bold uppercase tracking-[2px] text-[#a97831]">Contact information</span>
          <h2 className="mt-3 font-serif text-3xl font-bold text-[#173d35]">We Are Always Happy to Help</h2>
          <p className="mt-4 text-sm leading-7 text-stone-500">Have a question about our rooms, services or reservations? Reach out to our friendly team.</p>

          <div className="mt-8 space-y-4">
            {[
              { icon: MapPin, title: "Our Location", text: "Hargeisa, Somaliland" },
              { icon: Phone, title: "Phone Number", text: "+252 63 000 0000" },
              { icon: Mail, title: "Email Address", text: "info@royalstay.com" },
              { icon: Clock, title: "Working Hours", text: "Available 24 hours, 7 days a week" },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4 rounded-xl border border-stone-200 bg-white p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#edf2e9] text-[#173d35]"><Icon size={21} /></div>
                <div><h3 className="font-semibold text-[#173d35]">{title}</h3><p className="mt-1 text-sm text-stone-500">{text}</p></div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-serif text-2xl font-bold text-[#173d35]">Send Us a Message</h2>
          <p className="mt-2 text-sm text-stone-500">Complete the form below to get in touch with our team.</p>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <label className="text-xs font-semibold text-stone-600">Your Name<input placeholder="Full name" className="mt-2 w-full rounded-lg border border-stone-200 bg-[#faf8f2] p-3.5 text-sm font-normal outline-none focus:border-[#a97831]" /></label>
            <label className="text-xs font-semibold text-stone-600">Email Address<input type="email" placeholder="you@example.com" className="mt-2 w-full rounded-lg border border-stone-200 bg-[#faf8f2] p-3.5 text-sm font-normal outline-none focus:border-[#a97831]" /></label>
          </div>
          <label className="mt-5 block text-xs font-semibold text-stone-600">Subject<select className="mt-2 w-full rounded-lg border border-stone-200 bg-[#faf8f2] p-3.5 text-sm font-normal"><option>General Inquiry</option><option>Room Reservation</option><option>Hotel Services</option><option>Feedback</option></select></label>
          <label className="mt-5 block text-xs font-semibold text-stone-600">Your Message<textarea rows={5} placeholder="How can we help you?" className="mt-2 w-full rounded-lg border border-stone-200 bg-[#faf8f2] p-3.5 text-sm font-normal outline-none focus:border-[#a97831]" /></label>
          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#123d32] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#205747]"><Send size={17} /> Send Message</button>

          <div className="mt-6 flex h-48 items-center justify-center overflow-hidden rounded-xl bg-stone-100">
            <div className="text-center">
              <MapPin size={32} className="mx-auto text-[#a97831]" />
              <p className="mt-2 font-semibold text-[#173d35]">RoyalStay Hotel & Resort</p>
              <p className="mt-1 text-xs text-stone-500">Hargeisa, Somaliland</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Contact;