import React, { useContext, useState } from "react";
import styles from "./register.module.css";
import bannerImg from "../../../public/images/bgImg.png.png";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLogIn, setIsLogIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError("");
    const { name, ...data } = formData;
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill all the fields");
      return;
    } else {
      console.log(formData);
      console.log(data);
    }
    // resetFormValue();
  };

  const resetFormValue = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <img src={bannerImg} alt="bannerImg" />
      </div>
      <div className={styles.form_section}>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <h1>{isLogIn ? "Log In" : "Sign Up"}</h1>
          {!isLogIn && (
            <div className={styles.input_box}>
              <label>Name :</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}
          <div className={styles.input_box}>
            <label>Email :</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.input_box}>
            <label>Password :</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className={styles.btn}>
            {isLogIn ? "Log In" : "Sign Up"}
          </button>
          {isLogIn ? (
            <p className={styles.info}>
              Don't have an Account{" "}
              <span onClick={() => setIsLogIn(false)}>Register here</span>
            </p>
          ) : (
            <p className={styles.info}>
              Already Have an account{" "}
              <span onClick={() => setIsLogIn(true)}>Log In</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
