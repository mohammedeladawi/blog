import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import notFoundImg from "../../assets/images/not-found.png";

import styles from "./NotFound.module.css";

const MainNotFound = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.not_found}>
      <Container>
        <div className={styles.not_found_items}>
          <img src={notFoundImg} alt="not found" />
          <h1> Page Not Found </h1>
          <Button
            variant="outline-secondary"
            size="lg"
            className="px-5"
            onClick={() => navigate("/")}
          >
            go home
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default MainNotFound;
