import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
import NavFooter from "../Components/NavFooter";
import Swal from "sweetalert2";
import { useAuth } from "../Context/auth";
const Login = () => {
  // const location = useLocation();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [auth, setAuth] = useAuth();

//   // Handle Login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/api/v1/auth/login", { email, password });
//       // console.log("Login Payload:", { email, password });

//       if (res && res.data.success) {
//         Swal.fire({
//           title: "Success!",
//           text: res.data.message,
//           icon: "success",
//           confirmButtonText: "OK",
//         });
//         // Save user data in context and local storage
//         setAuth({ ...auth,
//            user: res.data.user,
//             token: res.data.token });
//         localStorage.setItem("auth", JSON.stringify(res.data));
// if(auth){
//   navigate( "/"  );

// }
//       } else {
//         Swal.fire({
//           title: "Error!",
//           text: res.data.message,
//           icon: "error",
//           confirmButtonText: "Try Again",
//         });
//       }
//     } catch (error) {
//       console.log("Login Error: ", error);
//       Swal.fire({
//         title: "Error!",
//         text: "Something went wrong. Please try again later.",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     }
//   };

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [auth, setAuth] = useAuth();

const navigate = useNavigate();
const location = useLocation();

// form function
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("/api/v1/auth/login", {
      email,
      password,
    });

    if (res && res.data.success) {
      localStorage.setItem("auth", JSON.stringify(res.data)); // ✅ Store full auth data
      setAuth(res.data); // ✅ Update auth state

      // console.log("Token saved:", res.data.token);
      // console.log("Stored auth in localStorage:", localStorage.getItem("auth"));

      Swal.fire({
        title: "Success!",
        text: res.data.message,
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate(location?.state?.from || "/");
    } else {
      Swal.fire({
        title: "Error!",
        text: res.data.message,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  } catch (error) {
    console.log("Login Error: ", error);
    Swal.fire({
      title: "Error!",
      text: "Something went wrong. Please try again later.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};

  return (
    <NavFooter>
      <div className="grid md:grid-cols-2 overflow-hidden md:my-7 my-8 shadow-2xl md:w-11/12 w-11/12 mx-auto border rounded-lg">
        {/* Image Section */}
        <img
          src="/images/login2.jpg"
          onError={(e) => (e.target.src = "/images/default-login.jpg")} // Fallback image
          className="md:w-10/12 md:h-10/12 mt-0 h-4/12 w-9/12 md:p-4 p-2 mx-auto"
          alt="Login Illustration"
        />
        {/* Form Section */}
        <div className="flex flex-col md:px-8 md:mt-[95px] mt-0 px-2">
          <h2 className="md:text-4xl text-xl md:font-bold font-semibold text-slate-500">
            Log-In
          </h2>
          <p className="md:text-lg text-slate-400">
            Enter your registered email and password.
          </p>
          <form onSubmit={handleSubmit} className="md:mt-4 md:space-y-6 space-y-2">
            <div className="flex flex-col">
              <label className="md:font-semibold text-slate-500 md:text-lg mb-1">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                name="email"
                type="email"
                value={email}
                placeholder="Enter your Email"
                className="md:p-3 p-1 border border-slate-600 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="md:font-semibold text-slate-500 md:text-lg mb-1">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                required
                name="password"
                type="password"
                value={password}
                placeholder="**********************"
                className="md:p-3 p-1 border border-slate-600 rounded"
              />
            </div>
            <div className="my-2 flex flex-col space-y-4">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="md:py-2 py-1 md:px-8 px-2 rounded bg-indigo-300 hover:bg-zinc-300 hover:text-black text-white font-semibold"
              >
                Forgot Password
              </button>
              <button
                type="submit"
                className="md:py-2 py-1 md:px-8 px-2 rounded bg-slate-500 hover:bg-zinc-300 hover:text-black text-white font-semibold"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </NavFooter>
  );
};

export default Login;



