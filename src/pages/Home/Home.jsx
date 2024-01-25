import React, { useState } from "react";
import styles from "./home.module.css";
import Header from "../../Components/Header/Header";
import FormModal from "../../Components/AddToDoFormModal/FormModal";
import ToDoCard from "../../Components/ToDoCard/ToDoCard";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(Array.from({ length: 4 }).fill(0));
  const [editingNote, setEditingNote] = useState(null);
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onEditNote = (note) => {
    setEditingNote(note);
  };
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.addTodo}>
        <button className={styles.btn} onClick={handleShowModal}>
          Create New ToDo
        </button>
      </div>
      <FormModal showModal={showModal} closeModal={handleCloseModal} />
      <div className={styles.cards_container}>
        {data.map((item, index) => (
          <ToDoCard
            key={index}
            item={item}
            editing={editingNote?.id === item.id}
            editNote={onEditNote}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
