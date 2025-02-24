import React, { useState } from "react";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/auth";
import axios from "axios";
import NavFooter from "../Components/NavFooter";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone,setPhoneNumber] = useState()
  const [answer,setAnswer] = useState("")
  // const [success, setSuccess] = useState(false); // Track if signup was successful

const [auth,setAuth] = useAuth()
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post("/api/v1/auth/register", 
      { email, password,name,answer,phone });

    if (data.success) {
      setAuth({ user: data.user,
         token: data.token }); // Update auth state
      localStorage.setItem("auth", JSON.stringify({ user: data.user, token: data.token })); // Store in localStorage
      Swal.fire({
                   title: "Success!",
                  text: data.message,
                   icon: "success",
                   confirmButtonText: "OK",
                 });
      navigate("/dashboard"); // Redirect user after signup
    } else {
      alert(data.message); // Show error message if signup fails
    }
  } catch (error) {
    console.error("Signup failed:", error);
  }
     
    }

  return (
    <>
      <NavFooter>
        <div className="grid md:grid-cols-2 overflow-hidden md:my-4 my-2 md:shadow-2xl shadow-lg border rounded-lg w-11/12 mx-auto">
          <img
            src="./images/signup1.jpg"
            className="md:w-10/12 md:h-10/12 mt-0 h-4/12 w-9/12 md:p-4 p-2 mx-auto"
            alt="Signup"
          />
          <div className="flex flex-col md:px-8  mt-1">
            <h2 className="md:text-4xl text-2xl font-bold text-slate-500">
              New Users
            </h2>
            <p className="md:text-lg text-slate-400">
              Create your account to start shopping
            </p>

            <form
              onSubmit={handleSubmit}
              className="md:mt-2 md:space-y-2 space-y-2"
            >
              <div className="flex flex-col">
                <label className="md:font-semibold text-slate-500 md:text-lg text-[14px] mb-1">
                  Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  required
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  className="md:p-3 p-1 border border-slate-600 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="md:font-semibold text-slate-500 md:text-lg mb-1">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  name="email"
                  type="email"
                  placeholder="Enter your Email"
                  value={email}
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
                  placeholder="**********************"
                  value={password}
                  className="md:p-3 p-1 border border-slate-600 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="md:font-semibold text-slate-500 md:text-lg mb-1">
                  PhoneNumber
                </label>
                <input
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  name="phone"
                  type="number"
                  placeholder="9858392882"
                  value={phone}
                  className="md:p-3 p-1 border border-slate-600 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="md:font-semibold text-slate-500 md:text-lg mb-1">
                  New Answer
                </label>
                <input
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                  name="forgotpassword"
                  type="text"
                  placeholder="What is your favorite Game"
                  value={answer}
                  className="md:p-3 p-1 border border-slate-600 rounded"
                />
              </div>

              {/* Conditionally render button */}
              
              
                
                  <button
                  type="submit"
                  className="md:py-2 md:px-8 px-3 py-1 rounded bg-slate-500 mt-4 hover:bg-zinc-300 hover:text-black text-white font-semibold"
                >
                  Sign Up
                </button>
                 
           
             
            </form>
          </div>
        </div>
      </NavFooter>
    </>
  );
};

export default SignUp;
