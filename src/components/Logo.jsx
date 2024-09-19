import styled, { css } from "styled-components";

const sizes = {
  regular: css`
    height: 13rem;
    width: 13rem;
  `,

  medium: css`
    height: 10rem;
    width: 22rem;
  `,

  large: css`
    height: 20rem;
    width: 20rem;
  `,
  small: css`
    height: 5rem;
    width: 8rem;
  `,
};

const Logo = ({ size }) => {
  return (
    <LogoContainer>
      <Image src="/light-logo.png" alt="company-logo" size={size} />
    </LogoContainer>
  );
};

const Image = styled.img`
  ${(props) => sizes[props.size]}
`;

Image.defaultProps = {
  size: "regular",
};

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2.4rem 0;
`;

export default Logo;
