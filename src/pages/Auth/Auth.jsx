import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.css";

import axios from "axios";
import toast from "react-hot-toast";

import bannerImg from "../../../public/images/bgImg.png.png";
import { AuthContext } from "../../Context/userContext";

const Auth = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLogIn, setIsLogIn] = useState(false);

  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleUserRegister = (e) => {
    e.preventDefault();
    setError("");
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill all the fields");
      return;
    } else {
      axios
        .post(`${import.meta.env.VITE_SERVER_HOST}/api/register`, formData)
        .then((res) => {
          if (res.status === 201) {
            toast.success(res?.data?.message);
            setIsLogIn(true);
            resetFormValue();
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.message);
        });
    }
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    setError("");
    const { name, ...data } = formData;
    if (!formData.email || !formData.password) {
      setError("Please fill all the fields");
      return;
    } else {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_SERVER_HOST}/api/login`,
          data
        );
        if (res.status === 200) {
          toast.success(res?.data?.message);
          setAuth(res.data);
          localStorage.setItem("authData", JSON.stringify(res.data));
          navigate("/home");
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message);
      }
    }
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
        <form
          className={styles.form}
          onSubmit={isLogIn ? handleUserLogin : handleUserRegister}
        >
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
          {error && <p className={styles.error}>{error}</p>}
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

export default Auth;
