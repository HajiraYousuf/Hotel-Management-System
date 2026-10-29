
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, ArrowRight, Hotel } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("hotel_users") || "[]");

    const user = users.find(
      (item) =>
        item.email === email.trim().toLowerCase() &&
        item.password === password
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    const currentUser = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
    };


localStorage.setItem("current_user", JSON.stringify(currentUser));
    window.dispatchEvent(new Event("authChanged"));

const destination = location.state?.from;

navigate(destination?.pathname || "/", {
  state: destination?.state,
  replace: true,
});

    if (rememberMe) {
      localStorage.setItem("remember_user", "true");
    } else {
      localStorage.removeItem("remember_user");
    }

    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf8f2] px-4 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">

        <div className="hidden flex-col justify-between bg-[#173d35] p-12 text-white md:flex">
          <div>
            <Hotel size={38} className="text-[#e7bd75]" />
            <h2 className="mt-6 font-serif text-4xl font-bold">
              Welcome Back
            </h2>
            <p className="mt-4 leading-7 text-white/70">
              Experience exceptional comfort and luxury. Sign in to continue
              your journey with RoyalStay.
            </p>
          </div>
          <p className="text-sm text-[#e7bd75]">
            RoyalStay Hotel & Resort
          </p>
        </div>

        <div className="p-8 sm:p-12">
          <Link to="/" className="text-sm font-semibold text-[#173d35]">
            ← Back to Home
          </Link>

          <h1 className="mt-8 font-serif text-3xl font-bold text-[#173d35]">
            Sign In
          </h1>

          <p className="mt-2 text-sm text-stone-500">
            Enter your details to access your account.
          </p>

          {location.state?.registered && (
            <p className="mt-5 rounded-lg bg-green-50 p-3 text-sm text-green-700">
              Account created successfully. You can now sign in.
            </p>
          )}

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Email Address
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-stone-200 px-4 py-3 focus-within:border-[#173d35]">
                <Mail size={18} className="text-stone-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Password
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-stone-200 px-4 py-3 focus-within:border-[#173d35]">
                <Lock size={18} className="text-stone-400" />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full text-sm outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-stone-500">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#173d35]"
                />
                Remember me
              </label>

              <Link
                to="/register"
                className="font-semibold text-[#a97831] hover:underline"
              >
                Create account
              </Link>
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#173d35] py-3.5 font-semibold text-white transition hover:bg-[#205747]"
            >
              Sign In <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-stone-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-[#a97831]">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
