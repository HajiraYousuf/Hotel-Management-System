
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Edit,
  ShieldCheck,
  LogOut,
  Save,
  X,
} from "lucide-react";

const Profile = () => {
  // Get logged-in user
  const getCurrentUser = () => {
    try {
      return JSON.parse(localStorage.getItem("current_user") || "null");
    } catch {
      return null;
    }
  };

  const [user, setUser] = useState(getCurrentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "Hargeisa, Somaliland",
  });

  // Handle missing user
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf8f2] px-5">
        <div className="max-w-md rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
          <User size={45} className="mx-auto text-[#a97831]" />

          <h1 className="mt-5 text-2xl font-bold text-[#173d35]">
            Login Required
          </h1>

          <p className="mt-3 text-sm text-stone-500">
            Please sign in to view your profile.
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

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save updated profile
  const handleSave = (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      setError("Please complete all required fields.");
      return;
    }

    const updatedUser = {
      ...user,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
    };

    // Update current logged-in user
    localStorage.setItem(
      "current_user",
      JSON.stringify(updatedUser)
    );

    // Update registered user in hotel_users
    const users = JSON.parse(
      localStorage.getItem("hotel_users") || "[]"
    );

    const updatedUsers = users.map((item) =>
      item.id === user.id ? { ...item, ...updatedUser } : item
    );

    localStorage.setItem(
      "hotel_users",
      JSON.stringify(updatedUsers)
    );

    setUser(updatedUser);
    setIsEditing(false);
  };

  // Member since
  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Not available";

  // Profile information
  const profileItems = [
    {
      icon: User,
      label: "Full Name",
      value: user.fullName || "Not provided",
    },
    {
      icon: Mail,
      label: "Email Address",
      value: user.email || "Not provided",
    },
    {
      icon: Phone,
      label: "Phone Number",
      value: user.phone || "Not provided",
    },
    {
      icon: MapPin,
      label: "Address",
      value: user.address || "Hargeisa, Somaliland",
    },
    {
      icon: CalendarDays,
      label: "Member Since",
      value: memberSince,
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f2] px-4 py-12">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-[#a97831]">
            MY ACCOUNT
          </p>

          <h1 className="mt-2 font-serif text-3xl font-bold text-[#173d35]">
            My Profile
          </h1>

          <p className="mt-2 text-stone-500">
            Manage your personal information and account details.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-3">

          {/* Profile Card */}
          <div className="h-fit rounded-2xl bg-[#173d35] p-7 text-center text-white">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#e7bd75] bg-white/10">
              <User size={42} className="text-[#e7bd75]" />
            </div>

            <h2 className="mt-5 break-words font-serif text-2xl font-bold">
              {user.fullName}
            </h2>

            <p className="mt-1 break-all text-sm text-white/60">
              {user.email}
            </p>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[#e7bd75]">
              <ShieldCheck size={17} />
              Guest Account
            </div>

            <Link
              to="/my-bookings"
              className="mt-7 block rounded-xl bg-[#e7bd75] py-3 text-sm font-semibold text-[#173d35] transition hover:bg-[#f0d29b]"
            >
              My Bookings
            </Link>
          </div>

          {/* Personal Information */}
          <div className="rounded-2xl border border-stone-100 bg-white p-7 shadow-sm md:col-span-2">

            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-5">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#173d35]">
                  Personal Information
                </h2>

                <p className="mt-1 text-sm text-stone-500">
                  Your account information.
                </p>
              </div>

              {!isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      fullName: user.fullName || "",
                      email: user.email || "",
                      phone: user.phone || "",
                      address: user.address || "Hargeisa, Somaliland",
                    });
                    setError("");
                    setIsEditing(true);
                  }}
                  className="flex items-center gap-2 rounded-lg border border-[#173d35] px-4 py-2 text-sm font-semibold text-[#173d35] transition hover:bg-[#173d35] hover:text-white"
                >
                  <Edit size={15} />
                  Edit
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSave} className="mt-6 space-y-5">

                <label className="block text-sm font-semibold text-stone-600">
                  Full Name

                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-lg border border-stone-200 bg-[#faf8f2] p-3 text-sm font-normal outline-none focus:border-[#a97831]"
                  />
                </label>

                <label className="block text-sm font-semibold text-stone-600">
                  Email Address

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-lg border border-stone-200 bg-[#faf8f2] p-3 text-sm font-normal outline-none focus:border-[#a97831]"
                  />
                </label>

                <label className="block text-sm font-semibold text-stone-600">
                  Phone Number

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-lg border border-stone-200 bg-[#faf8f2] p-3 text-sm font-normal outline-none focus:border-[#a97831]"
                  />
                </label>

                <label className="block text-sm font-semibold text-stone-600">
                  Address

                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-stone-200 bg-[#faf8f2] p-3 text-sm font-normal outline-none focus:border-[#a97831]"
                  />
                </label>

                {error && (
                  <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                    {error}
                  </p>
                )}

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-lg bg-[#173d35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#205747]"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setError("");
                    }}
                    className="flex items-center gap-2 rounded-lg border border-stone-200 px-5 py-3 text-sm font-semibold text-stone-600 transition hover:bg-stone-50"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-6 space-y-6">
                {profileItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-4"
                    >
                      <div className="rounded-xl bg-[#faf8f2] p-3 text-[#a97831]">
                        <Icon size={20} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-stone-400">
                          {item.label}
                        </p>

                        <p className="mt-1 break-words text-sm font-semibold text-[#173d35]">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Logout */}
            {!isEditing && (
              <div className="mt-8 border-t border-stone-100 pt-6">
                <Link
                  to="/logout"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 transition hover:text-red-700"
                >
                  <LogOut size={17} />
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
