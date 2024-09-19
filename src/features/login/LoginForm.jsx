import { useState } from "react";

import Form from "../../components/Form";
import VerticalFormRow from "../../components/VerticalFormRow";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./hooks/useLogin";
import SpinnerMini from "../../components/SpinnerMini";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    //One of the values are missing
    if (!username || !password) {
      return;
    }

    login(
      { username, password },
      {
        onSettled: () => {
          // Remove username and password state onSuccess or onError
          setUsername("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      {/* EMAIL */}
      <VerticalFormRow label="Username">
        <Input
          type="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          disabled={isLoading}
        />
      </VerticalFormRow>

      {/* PASSWORD */}
      <VerticalFormRow label="Password">
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          disabled={isLoading}
        />
      </VerticalFormRow>

      {/* BUTTON */}
      <VerticalFormRow>
        <StyledDiv onClick={() => navigate("/register")}>
          Dont have an account?
        </StyledDiv>
        <Button size="large" disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Sign in"}
        </Button>
      </VerticalFormRow>
    </Form>
  );
};

const StyledDiv = styled.div`
  padding: 1rem;
  cursor: pointer;
  margin: 1rem 0;
  display: flex;
  justify-content: end;
`;

export default LoginForm;
