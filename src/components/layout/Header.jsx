import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import styles from "./Header.module.css";

import logoImg from "../../assets/images/logo.png";
import { AuthContext } from "../../context/AuthContext";

const DLink = ({ slug, end, title, children }) => {
  return (
    <Nav.Link as="span">
      <NavLink className={styles.navLink} to={slug} end={!!end}>
        {title} {children}
      </NavLink>
    </Nav.Link>
  );
};

const Header = () => {
  const { isAuth, logout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as="span">
            <DLink slug="/">
              <img src={logoImg} alt="Codv logo" />
            </DLink>
          </Navbar.Brand>
          <Nav className="ms-auto">
            <DLink title="Home" slug="/" end />
            <DLink title="Blog" slug="/blog" end />
            {isAuth ? (
              <>
                <DLink title="New post" slug="/blog/new" />
                <Button onClick={logout}>Log out</Button>
              </>
            ) : (
              <>
                <DLink title="Login" slug="/login" />
                <DLink title="Sign up" slug="/signup" />
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
