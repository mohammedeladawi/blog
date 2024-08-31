import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../context/FirebaseContext";
import { PostsContext } from "../../context/PostsContext";

const MainNewPost = () => {
  const navigate = useNavigate();
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const { db } = useContext(FirebaseContext);
  const { refetch } = useContext(PostsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const excert = e.target.excert.value;
    const image = e.target.image.value;
    // first blog => first-blog-1231545
    const slug = title.split(" ").join("-") + "-" + new Date().getTime();

    setLoading(true);

    try {
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        title,
        excert,
        slug,
        image,
        body,
        user: "Hossam",
        createdAt: serverTimestamp(),
      });
      e.target.reset();
      setBody("");
      setLoading(false);
      refetch();
      navigate("/blog/" + slug);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };
  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col md="8" lg="6" className="mx-auto">
            <h2 className="mb-4"> Add new post</h2>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Post Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter post title"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formExcert">
                <Form.Label>Post Excert</Form.Label>
                <Form.Control
                  type="text"
                  name="excert"
                  placeholder="Enter post excert"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formImage">
                <Form.Label>Post Image</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  placeholder="Enter image url"
                />
              </Form.Group>
              <ReactQuill theme="snow" value={body} onChange={setBody} />
              <Button type="submit" className="mt-4 w-100" disabled={loading}>
                submit {loading ? "..." : ""}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MainNewPost;
