import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./auth-layout.module.css";

const AuthLayout = () => {
  return (
    <main
      className={`auth-page d-flex justify-content-center align-items-center ${styles["auth-page"]}`}
    >
      <Outlet />
    </main>
  );
};

export default AuthLayout;
