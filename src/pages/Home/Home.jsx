import React, { useContext, useEffect, useState } from "react";
import styles from "./home.module.css";
import Header from "../../Components/Header/Header";
import FormModal from "../../Components/AddToDoFormModal/FormModal";
import ToDoCard from "../../Components/ToDoCard/ToDoCard";
import { AuthContext } from "../../Context/userContext";

import axios from "axios";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const { auth } = useContext(AuthContext);
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onEditTask = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = async (updateTask) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_HOST}/api/update-task/${updateTask.id}`,
        updateTask
      );
      console.log(res);
    } catch (error) {}
    setEditingTask(null);
  };
  const handleDelete = async (taskId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_HOST}/api/delete-task/${taskId}`
      );
      console.log(res);
      if (res.status === 200) {
        setData(data.filter((task) => task.id !== taskId));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_SERVER_HOST}/api/get-tasks/${
          auth?.user?.userID
        }`
      )
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [showModal, editingTask]);
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
        {data?.reverse().map((item, index) => (
          <ToDoCard
            key={index}
            item={item}
            editing={editingTask?.id === item.id}
            completed={item.isCompleted === 1 ? true : false}
            editTask={onEditTask}
            deleteTask={() => handleDelete(item.id)}
            completeTask={handleUpdateTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
