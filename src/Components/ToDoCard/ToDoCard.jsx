import React, { useState } from "react";
import styles from "./card.module.css";
import editIcon from "../../../public/images/icons8-edit-48.png";

const ToDoCard = ({ item, editNote, editing }) => {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  const handleSaveNote = () => {
    const updatedNote = { ...item, title, description };
    // saveNote(updatedNote);
  };

  return (
    <div className={styles.note_card}>
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
          <button className={styles.save_btn} onClick={handleSaveNote}>
            Save
          </button>
        </>
      ) : (
        <>
          <h3 className={styles.note_title}>{item.title}</h3>
          <p className={styles.note_content}>{item.description}</p>

          <img
            src={editIcon}
            alt="edit-icon"
            className={styles.edit_icon}
            onClick={() => editNote(item)}
          />
        </>
      )}
    </div>
  );
};

export default ToDoCard;
