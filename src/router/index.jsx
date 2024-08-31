import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DefaultLayout from "../layouts/DefaultLayout";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import Article from "../pages/blog/Article";
import Blog from "../pages/blog/Blog";
import NewPost from "../pages/blog/NewPost";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import { AuthContext } from "../context/AuthContext";

const MainRouter = () => {
  const { isAuth } = useContext(AuthContext);
  console.log(isAuth);
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/blog" element={<DefaultLayout />}>
        <Route index element={<Blog />} />
        {isAuth ? (
          <Route path="new" element={<NewPost />} />
        ) : (
          <Route path="new" element={<Navigate to="/login" replace />} />
        )}
        <Route path=":slug" element={<Article />} />
      </Route>
      <Route path="/" element={<AuthLayout />}>
        {!isAuth ? (
          <Route path="login" element={<Login />} />
        ) : (
          <Route path="login" element={<Navigate to="/" replace />} />
        )}
        {!isAuth ? (
          <Route path="signup" element={<SignUp />} />
        ) : (
          <Route path="signup" element={<Navigate to="/" replace />} />
        )}
      </Route>
    </Routes>
  );
};

export default MainRouter;
