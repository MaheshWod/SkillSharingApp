import { useAuth } from "../Context/auth";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spiner from "./Spiner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/v1/auth/user-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spiner path="" />;
}


