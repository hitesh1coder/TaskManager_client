import React from "react";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("authData");
    navigate("/");
    toast.success("Logged out successfully");
  };
  return (
    <header className={styles.Header}>
      <div className={styles.logo}>
        <h1>TaskManager</h1>
      </div>
      <div className={styles.user_info}>
        <h2>Welcome to Dashboard</h2>
      </div>
      <button className={styles.btn} onClick={logoutUser}>
        Logout
      </button>
    </header>
  );
};

export default Header;
