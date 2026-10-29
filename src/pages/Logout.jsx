
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, CheckCircle, ArrowLeft, Hotel } from "lucide-react";

const Logout = () => {
  const navigate = useNavigate();
  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("current_user");
    localStorage.removeItem("remember_user");
    // Immediately update Navbar
    window.dispatchEvent(new Event("authChanged"));

    setLoggedOut(true);
  };

  const finishLogout = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf8f2] px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-stone-100 bg-white p-8 text-center shadow-xl sm:p-12">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f8eee0]">
          {loggedOut ? (
            <CheckCircle size={34} className="text-green-600" />
          ) : (
            <LogOut size={34} className="text-[#a97831]" />
          )}
        </div>

        <Hotel size={30} className="mx-auto mt-7 text-[#173d35]" />

        <h1 className="mt-5 font-serif text-3xl font-bold text-[#173d35]">
          {loggedOut ? "Logged Out Successfully!" : "Leaving So Soon?"}
        </h1>

        <p className="mt-3 text-sm leading-6 text-stone-500">
          {loggedOut
            ? "You have successfully signed out of your RoyalStay account. We hope to see you again."
            : "Thank you for choosing RoyalStay. Are you sure you want to log out?"}
        </p>

        <div className="mt-8 space-y-3">
          {!loggedOut ? (
            <>
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#173d35] py-3.5 font-semibold text-white transition hover:bg-[#205747]"
              >
                <CheckCircle size={18} />
                Confirm Logout
              </button>

              <Link
                to="/"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200 py-3.5 font-semibold text-[#173d35] transition hover:bg-[#faf8f2]"
              >
                <ArrowLeft size={18} />
                Back to Home
              </Link>
            </>
          ) : (
            <button
              onClick={finishLogout}
              className="w-full rounded-xl bg-[#173d35] py-3.5 font-semibold text-white transition hover:bg-[#205747]"
            >
              Continue to Login
            </button>
          )}
        </div>

        <p className="mt-8 text-xs text-stone-400">
          RoyalStay Hotel & Resort · Your comfort, our priority.
        </p>
      </div>
    </div>
  );
};

export default Logout;
