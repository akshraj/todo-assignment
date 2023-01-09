import React from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Navbar from "../navbar";
import "./mainLayout.scss";

export default function MainLayout() {
  const { user } = useAuth();
  return (
    <div className="mainLayout">
      <Navbar user={user} />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}
