import React, { useContext, useEffect, useState } from "react";
import styles from "./home.module.css";

import Header from "../../Components/Header/Header";
import FormModal from "../../Components/AddToDoFormModal/FormModal";
import TaskCard from "../../Components/TaskCard/TaskCard";
import { AuthContext } from "../../Context/userContext";

import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  // State variables
  const [showModal, setShowModal] = useState(false); // Controls the visibility of the modal
  const [data, setData] = useState([]); // Stores the task data
  const [editingTask, setEditingTask] = useState(null); // Stores the task being edited

  const { auth, token } = useContext(AuthContext);

  const handleShowModal = () => {
    setShowModal(true); // Shows the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hides the modal
  };

  const onEditTask = (task) => {
    setEditingTask(task); // Sets the task being edited
  };

  const config = {
    headers: {
      authorization: `${token}`,
    },
  };

  // Updates the task
  const handleUpdateTask = async (updateTask) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_HOST}/api/update-task/${updateTask.id}`,
        updateTask,
        config
      );
      toast.success(res.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
    setEditingTask(null); // Clears the editing task
  };

  // Deletes the task
  const handleDelete = async (taskId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_HOST}/api/delete-task/${taskId}`,
        config
      );
      if (res.status === 200) {
        setData(data.filter((task) => task.id !== taskId));
      }
      toast.success(res.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  // Fetches the tasks
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_SERVER_HOST}/api/get-tasks/${
          auth?.user?.userID
        }`
      )
      .then((res) => {
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
          Create New Task
        </button>
      </div>
      <FormModal showModal={showModal} closeModal={handleCloseModal} />

      <div className={styles.cards_container}>
        {data?.length === 0 ? (
          <h3 style={{ width: "100%", textAlign: "center" }}>
            ... No tasks found, Please Add Some Task
          </h3>
        ) : (
          <></>
        )}
        {data?.map((item, index) => (
          <TaskCard
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
