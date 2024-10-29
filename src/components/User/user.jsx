import React from "react";
import styles from "./user.module.css";

const User = ({ firstName, lastName }) => {
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const initials = `${firstName ? firstName[0].toUpperCase() : ''}${lastName ? lastName[0].toUpperCase() : ''}`;

  return (
    <div
      className={styles.userPhoto}
      style={{
        backgroundColor: getRandomColor(),
      }}
    >
      {initials || '?'}
    </div>
  );
};

export default User;
