import styled from "styled-components";
import Heading from "../components/Heading";
import RegisterForm from "../features/register/RegisterForm";
import Logo from "../components/Logo";

const Register = () => {
  return (
    <RegisterBox>
      <Logo size="medium" />
      <StyledHeading>
        <Heading as="h2">Create an account</Heading>
      </StyledHeading>
      <RegisterForm />
    </RegisterBox>
  );
};

const RegisterBox = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const StyledHeading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Register;
