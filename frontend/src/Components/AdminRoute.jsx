
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/auth";
import Spiner from "./Spiner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.token) {
      setOk(false);
      return;
    }

    const authCheck = async () => {
      try {
        const res = await axios.get("/api/v1/auth/admin-auth", {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });

        setOk(res.data.ok);
      } catch (error) {
        console.error("Admin authentication check failed:", error);
        setOk(false);
        navigate("/login");
      }
    };

    authCheck();
  }, [auth?.token, navigate]);

  return ok ? <Outlet /> : <Spiner path="" />;
}
