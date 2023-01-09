import React from "react";
import "./navbar.scss";
import Profile from "../../assets/image/profile.jpeg";

export default function Navbar({ user }) {
  const logoutUser = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <div className="navbar">
      <div className="logo">
        <img src={Profile} alt="profile" />
        <p>{user?.name}</p>
      </div>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
}
