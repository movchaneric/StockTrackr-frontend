import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import Form from "../../components/Form";
import VerticalFormRow from "../../components/VerticalFormRow";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import { useRegister } from "./hooks/useRegister";
import SpinnerMini from "../../components/SpinnerMini";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const { register: userRegister, isLoading } = useRegister();
  const navigate = useNavigate();

  function onSubmit(data) {
    console.log(data);
    const { username, password, email } = data;
    userRegister(
      { username, password, email },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }

  console.log("isLoading: ", isLoading);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* USERNAME */}
      <VerticalFormRow label="Username">
        <Input
          type="username"
          {...register("username", { required: "Username is required" })}
          disabled={isLoading}
        />
      </VerticalFormRow>

      {/* EMAIL */}
      <VerticalFormRow label="Email">
        <Input
          type="email"
          {...register("email", { required: "Email is required" })}
          disabled={isLoading}
        />
      </VerticalFormRow>

      {/* PASSWORD */}
      <VerticalFormRow label="Password">
        <Input
          type="password"
          {...register("password", { required: "Password is required" })}
          disabled={isLoading}
        />
      </VerticalFormRow>

      {/* CONFIRM PASSWORD */}
      <VerticalFormRow label=" Confirm password">
        <Input
          type="password"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues("password") || "Passwords must match",
          })}
          disabled={isLoading}
        />
      </VerticalFormRow>

      {/* BUTTON */}
      <VerticalFormRow>
        <StyledDiv onClick={() => navigate("/login")}>
          Already have an account?
        </StyledDiv>
        <Button size="large" type="submit" disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Register"}
        </Button>
      </VerticalFormRow>
    </Form>
  );
};

const StyledDiv = styled.div`
  padding: 1rem;
  cursor: pointer; /* Changes the cursor to a pointer */
  margin: 1rem 0;
  display: flex;
  justify-content: end;
`;

export default RegisterForm;
