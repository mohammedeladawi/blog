import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import logoImg from "../../assets/images/logo.png";

import styles from "./Home.module.css";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="py-5 bg-light">
      <Container>
        <Row>
          <Col sm="12" md="10" lg="8" className="mx-auto">
            <div className="d-flex flex-column align-items-center text-center">
              <img className={styles.hero_img} src={logoImg} alt="logo" />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero
                blanditiis ipsa sint ut. Quaerat error provident veniam
                similique delectus officia cum praesentium perferendis, non
                corporis.
              </p>
              <div className="mt-4">
                <Button size="lg" onClick={() => navigate("/blog/new")}>
                  Add new article
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
