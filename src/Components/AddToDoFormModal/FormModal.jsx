import React, { useContext, useState } from "react";
import styles from "./modal.module.css";
import axios from "axios";
import { AuthContext } from "../../Context/userContext";

const FormModal = ({ showModal, closeModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [error, setError] = useState("");

  const { auth } = useContext(AuthContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.title || !formData.description) {
      setError("Please fill all the fields");
      return;
    } else {
      console.log(formData);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_SERVER_HOST}/api/add-task/${
            auth?.user?.userID
          }`,
          formData
        );
        alert(res.data?.message);
        closeModal();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div
        className={
          !showModal
            ? styles.overlay
            : `${styles.overlay} ${styles.show_overlay}`
        }
        onClick={closeModal}
      ></div>
      <div
        className={
          !showModal
            ? styles.form_modal
            : `${styles.form_modal} ${styles.show_form_modal}`
        }
      >
        <button onClick={closeModal}>❌</button>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.input_box}>
            <label>Title :</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className={styles.input_box}>
            <label>Description :</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          {/* <div className={styles.input_box}>
            <label>Name :</label>
            <input
              type="checkbox"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div> */}
          <p>{error}</p>
          <button type="submit" className={styles.btn}>
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default FormModal;
