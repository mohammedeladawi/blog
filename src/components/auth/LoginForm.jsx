import { useFormik } from "formik";
import React, { useContext } from "react";
import { Button, Card, Form } from "react-bootstrap";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
    }),
    onSubmit: (vals) => {
      try {
        login({ email: vals.email, password: vals.password });
      } catch (error) {
        console.log(error.message);
      }
    },
  });
  return (
    <Card className="p-4 bg-light">
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.email && formik.errors.email}
          />
          {formik.touched.email && formik.errors.email && (
            <Form.Text className="text-danger">{formik.errors.email}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            isInvalid={formik.touched.password && formik.errors.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <Form.Text className="text-danger">
              {formik.errors.password}{" "}
            </Form.Text>
          )}
        </Form.Group>

        <Button
          className="w-100"
          variant="primary"
          type="submit"
          disabled={!formik.isValid}
        >
          Submit
        </Button>
      </Form>
    </Card>
  );
};

export default LoginForm;
