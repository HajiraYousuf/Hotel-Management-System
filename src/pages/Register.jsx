
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User, Mail, Lock, Phone, Hotel, ArrowRight,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const fields = [
    { name: "fullName", label: "Full Name", placeholder: "Your full name", icon: User, type: "text" },
    { name: "email", label: "Email Address", placeholder: "you@example.com", icon: Mail, type: "email" },
    { name: "phone", label: "Phone Number", placeholder: "+252 63 0000000", icon: Phone, type: "tel" },
    { name: "password", label: "Password", placeholder: "Create a password", icon: Lock, type: "password" },
    { name: "confirmPassword", label: "Confirm Password", placeholder: "Confirm your password", icon: Lock, type: "password" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agree) {
      setError("Please accept the Terms & Conditions.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("hotel_users") || "[]");

    const emailExists = users.some(
      (user) => user.email.toLowerCase() === formData.email.trim().toLowerCase()
    );

    if (emailExists) {
      setError("An account with this email already exists.");
      return;
    }

    const newUser = {
      id: Date.now(),
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      password: formData.password,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "hotel_users",
      JSON.stringify([...users, newUser])
    );

    navigate("/login", {
      state: { registered: true },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf8f2] px-4 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">

        <div className="hidden flex-col justify-between bg-[#173d35] p-12 text-white md:flex">
          <div>
            <Hotel size={38} className="text-[#e7bd75]" />
            <h2 className="mt-6 font-serif text-4xl font-bold">Join RoyalStay</h2>
            <p className="mt-4 leading-7 text-white/70">
              Create your account and discover a new level of hospitality,
              comfort and unforgettable experiences.
            </p>
          </div>
          <p className="text-sm text-[#e7bd75]">Your comfort, our priority.</p>
        </div>

        <div className="p-8 sm:p-12">
          <Link to="/" className="text-sm font-semibold text-[#173d35]">
            ← Back to Home
          </Link>

          <h1 className="mt-7 font-serif text-3xl font-bold text-[#173d35]">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-stone-500">
            Register to enjoy your RoyalStay experience.
          </p>

          <form onSubmit={handleRegister} className="mt-7 space-y-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  {field.label}
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-stone-200 px-4 py-3 focus-within:border-[#173d35]">
                  <field.icon size={18} className="shrink-0 text-stone-400" />

                  <input
                    name={field.name}
                    type={field.type}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    className="w-full text-sm outline-none"
                  />
                </div>
              </div>
            ))}

            <label className="flex items-start gap-2 text-xs leading-5 text-stone-500">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 accent-[#173d35]"
              />
              I agree to the Terms & Conditions and Privacy Policy.
            </label>

            {error && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#173d35] py-3.5 font-semibold text-white transition hover:bg-[#205747]"
            >
              Create Account <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-stone-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#a97831]">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
