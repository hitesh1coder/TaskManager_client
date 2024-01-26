import React, { useState } from "react";
import styles from "./card.module.css";
import editIcon from "../../../public/images/icons8-edit-48.png";
import deleteIcon from "../../../public/images/icons8-delete-30.png";

const ToDoCard = ({
  completeTask,
  item,
  editTask,
  editing,
  deleteTask,
  completed,
}) => {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [status, setStatus] = useState(item.isCompleted);

  const handleUpdateTask = () => {
    const updatedTask = { ...item, title, description };
    completeTask(updatedTask);
  };
  const handleStatus = () => {
    const updatedTask = {
      ...item,
      isCompleted: item.isCompleted === "0" ? false : true,
    };
    completeTask(updatedTask);
  };

  return (
    <div
      className={styles.card}
      style={{
        background: completed ? "rgba(0, 0, 0, 0.1)" : "#fff",
      }}
    >
      {editing ? (
        <>
          <input
            className={styles.title_input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className={styles.content_input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className={styles.save_btn} onClick={handleUpdateTask}>
            Save
          </button>
        </>
      ) : (
        <>
          <h3 className={styles.task_title}>{item.title}</h3>
          <p className={styles.task_content}>{item.description}</p>
          <div className={styles.btns}>
            <div
              className={styles.isCompleted}
              style={{
                pointerEvents: completed ? "none" : "auto",
                background: completed ? "rgb(4, 182, 4)" : "rgb(240, 236, 19)",
              }}
            >
              <label>
                <input
                  type="checkbox"
                  checked={status === 1 ? true : false}
                  onChange={handleStatus}
                />
                {item.isCompleted === 1 ? "Completed" : "Pending"}
              </label>
            </div>
            <img
              src={deleteIcon}
              alt="deleteicon"
              className={styles.edit_icon}
              onClick={deleteTask}
            />

            <img
              src={editIcon}
              alt="edit-icon"
              className={styles.edit_icon}
              onClick={() => editTask(item)}
              style={{ display: completed ? "none" : "initial" }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ToDoCard;
