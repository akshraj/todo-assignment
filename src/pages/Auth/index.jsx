import "./auth.scss";
import Card from "../../components/card";
import Input from "../../components/Input";
import Button from "../../components/button";
import { useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [inputs, setInputs] = useState({ userId: "", name: "" });
  const { loginUser } = useActions();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputs.userId || !inputs.name) return;
    loginUser({ id: Math.floor(Math.random() * 100), ...inputs });
  };

  useEffect(() => {
    if (!!user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="auth">
      <Card height="249px" width="296px">
        <p>Login</p>
        <form className="container" onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="Id"
            name="userId"
            onChange={handleChange}
          />
          <Input
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleChange}
          />
          <Button type="submit">Login</Button>
        </form>
      </Card>
    </div>
  );
}
