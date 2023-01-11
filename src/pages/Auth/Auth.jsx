import "./auth.scss";
import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Input } from "../../components";
import { useFormik } from "formik";
import { loginSchema } from "./auth.validation";
import useAuth from "../../hooks/useAuth";

export default function Auth() {
  const { user } = useAuth();
  const { loggedInUser, error } = useSelector((state) => state.auth);
  if (loggedInUser && Object.keys(loggedInUser)?.length > 0) {
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  }
  const { loginUser } = useActions();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userId: "",
      name: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      loginUser({ id: Math.floor(Math.random() * 100), ...values });
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser, navigate]);

  return (
    <div className="auth">
      <Card height="249px" width="296px">
        <p>Login</p>
        <form className="container" onSubmit={formik.handleSubmit}>
          <Input
            type="text"
            placeholder="Id"
            name="userId"
            onChange={formik.handleChange}
            value={formik.values.userId}
          />
          {formik.touched.userId ? (
            <p className="error">{formik.errors.userId}</p>
          ) : null}
          <Input
            type="text"
            placeholder="Name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name ? (
            <p className="error">{formik.errors.name}</p>
          ) : null}
          {!!error ? <p className="error">{error}</p> : null}
          <Button type="submit">Login</Button>
        </form>
      </Card>
    </div>
  );
}
