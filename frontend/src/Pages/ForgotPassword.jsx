

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavFooter from "../Components/NavFooter";
import Swal from "sweetalert2";
// import { useAuth } from "../Context/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer,setAnswer] = useState("")

//   const [auth,setAuth] = useAuth()
  
  // Handle Login
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", { email, newPassword,answer });

      if (res && res.data.success) {
         // Set login state to true
        Swal.fire({
          title: "Success!",
          text: res.data.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          
          navigate("/login");
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: res.data.message,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    }
    catch (error) {
      console.error(error);
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
      <div className=" overflow-hidden md:my-7 my-8 shadow-2xl md:w-6/12 w-11/12 mx-auto border rounded-lg">
        
          {/* // Logout View */}
            
            <div className="flex flex-col md:px-12 md:mt-[12px] mt-0 px-2">
              <h2 className="md:text-4xl text-xl md:font-bold font-semibold text-slate-500">
                Re-Register
              </h2>
              <p className="md:text-lg text-slate-400">
                Enter your registered email and password.
              </p>
              <form onSubmit={handleLogout} className="md:mt-3 md:space-y-6 space-y-2 my-2">
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
                        NewPassword
                  </label>
                  <input
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    name="newpassword"
                    type="password"
                    value={newPassword}
                    placeholder="Enter your favorout sport"
                    className="md:p-3 p-1 border border-slate-600 rounded "
                  />
                </div>
                <div className="flex flex-col">
                  <label className="md:font-semibold text-slate-500 md:text-lg mb-1">
                    Answer
                  </label>
                  <input
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                    name="password"
                    type="password"
                    value={answer}
                    placeholder="**********************"
                    className="md:p-3 p-1 border border-slate-600 rounded"
                  />
                </div>
             
            
                <button className="md:py-2 py-1 md:px-8 px-2 rounded bg-slate-500 mt-4 hover:bg-zinc-300 hover:text-black text-white font-semibold">
                  Reset
                </button>
        
              </form>
      
      </div>
      </div>
    </NavFooter>
  );
};

export default ForgotPassword;
