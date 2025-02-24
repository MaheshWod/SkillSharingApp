import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import NavFooter from "../../Components/NavFooter";
import UserMenu from "./UserMenu";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();
const navigate = useNavigate()
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // get user data
  useEffect(() => {
    const { email, name, phone } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
      });

      if (data?.error) {
        console.log(data.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));

        // Display success alert using Swal
        Swal.fire({
          icon: "success",
          title: "Profile Updated Successfully",
          text: "Your profile information has been updated.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
        navigate("/dashboard/user")
      }
    } catch (error) {
      console.log(error);
      console.log("Something went wrong");
    }
  };

  return (
    <NavFooter title={"Your Profile"}>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <UserMenu />
          </div>
          <div className="md:w-3/4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <form onSubmit={handleSubmit}>
                <h4 className="text-2xl font-semibold mb-4">USER PROFILE</h4>

                <div className="mb-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded bg-gray-100"
                    placeholder="Enter Your Email"
                    disabled
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Your Password"
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Your Phone"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </NavFooter>
  );
};

export default Profile;
