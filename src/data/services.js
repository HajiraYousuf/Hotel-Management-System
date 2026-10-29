
import {
  Utensils,
  Waves,
  Sparkles,
  Dumbbell,
  Presentation,
  CarFront,
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "Restaurant & Bar",
    category: "Dining",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=85",
    desc: "Enjoy delicious meals and refreshing drinks in our elegant dining space.",
    details:
      "Experience exceptional dining with a variety of delicious meals, fresh ingredients and refreshing drinks. Our restaurant offers a welcoming atmosphere for breakfast, lunch and dinner.",
  },
  {
    id: 2,
    title: "Swimming Pool",
    category: "Relaxation",
    icon: Waves,
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=900&q=85",
    desc: "Relax and unwind in our beautiful pool with a peaceful atmosphere.",
    details:
      "Enjoy a refreshing swimming experience in our beautiful pool. Whether you want to relax, exercise or spend quality time with family, our swimming facilities are designed for your comfort.",
  },
  {
    id: 3,
    title: "Spa & Wellness",
    category: "Relaxation",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85",
    desc: "Rejuvenate your mind and body with our relaxing wellness experiences.",
    details:
      "Take a break from your busy schedule with relaxing spa experiences. Enjoy a peaceful environment designed to help you refresh your mind and body.",
  },
  {
    id: 4,
    title: "Fitness Center",
    category: "Fitness",
    icon: Dumbbell,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85",
    desc: "Stay fit during your stay with our modern fitness facilities.",
    details:
      "Maintain your fitness routine while staying with us. Our fitness center provides a comfortable workout environment with modern exercise equipment.",
  },
  {
    id: 5,
    title: "Conference Room",
    category: "Business",
    icon: Presentation,
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",
    desc: "Professional meeting spaces for conferences and special events.",
    details:
      "Host productive meetings, business presentations and special events in our professional conference spaces. Our meeting facilities provide a comfortable environment for business activities.",
  },
  {
    id: 6,
    title: "Airport Pickup",
    category: "Transportation",
    icon: CarFront,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=85",
    desc: "Travel comfortably with convenient private transportation options.",
    details:
      "Make your arrival easier with our airport pickup service. Submit your travel details and preferred pickup time so the hotel team can review your transportation request.",
  },
];

export default services;
