import React, { useContext } from "react";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("authData");
    navigate("/");
  };
  return (
    <header className={styles.Header}>
      <div className={styles.logo}>
        <h1>ToDo</h1>
      </div>
      <div className={styles.user_info}>
        <p>UserName</p>
      </div>
      <button className={styles.btn} onClick={logoutUser}>
        Logout
      </button>
    </header>
  );
};

export default Header;
