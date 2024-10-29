import React, { useState } from "react";
import styles from "./nav.module.css";
import Display from "../icons/display";
import Down from "../icons/down";

const Nav = ({setUser, user,status, setStatus, priority, setPriority }) => {
  const [model, setModel] = useState(false);
  return (
    <div className={styles.body}>
      <div
        className={styles.btn}
        onClick={() => {
          setModel(!model);
        }}
      >
        <Display />
        <div className={styles.txt}>Display</div>
        <Down />
      </div>
      <div></div>
      {model && (
        <div className={styles.model}>
          <div className={styles.group}>
            <div className={styles.motext}>Grouping</div>
            <div className={styles.moselect} onClick={() => {
                setUser(false)
                setStatus(true)
                setPriority(false)
                }}>
              Status
              <Down />
            </div>
          </div>
          <div className={styles.order}>
            <div className={styles.motext}>Ordering</div>
            <div className={styles.moselect}
            onClick={() => {
                setUser(false)
                setStatus(false)
                setPriority(true)
                }}>
              Priority
              <Down />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
