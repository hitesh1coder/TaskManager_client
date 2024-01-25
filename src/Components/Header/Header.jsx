import React from "react";
import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.Header}>
      <div className={styles.logo}>
        <h1>ToDo</h1>
      </div>
      <div className={styles.user_info}>
        <p>UserName</p>
      </div>
      <button className={styles.btn}>Logout</button>
    </header>
  );
};

export default Header;
