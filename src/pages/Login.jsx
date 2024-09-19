import styled from "styled-components";
import LoginForm from "../features/login/LoginForm";
import Logo from "../components/Logo";

const Login = () => {
  return (
    <LoginBox>
      <Logo size="medium" />
      <LoginForm />
    </LoginBox>
  );
};

const LoginBox = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

export default Login;
