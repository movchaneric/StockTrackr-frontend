import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const ContextMenu = ({ children, openId, onClose, position }) => {
  const [visible, setVisible] = useState(false);
  const contextRef = useRef();

  const { top, left } = position;

  useEffect(() => {
    // Set visibility to true when the component mounts (appears)
    setVisible(true);

    const handleClickOutside = (event) => {
      if (contextRef.current && !contextRef.current.contains(event.target)) {
        setVisible(false);
        setTimeout(onClose, 300); // Delay the onClose to allow transition to finish
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [onClose]);

  return (
    <StyledContextMenu ref={contextRef} top={top} left={left} visible={visible}>
      {children}
    </StyledContextMenu>
  );
};

const StyledContextMenu = styled.div`
  width: 100%;
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  max-width: 16rem;
  display: flex;
  gap: 3px;
  flex-direction: column;
  padding: 5px 10px;
  position: absolute;
  top: ${(props) => `${props.top + 10}px`};
  left: ${(props) => `${props.left - 140}px`};
  z-index: 20;

  /* Transition properties */
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: ${(props) =>
    props.visible ? "translateY(0)" : "translateY(-10px)"};
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
`;

export default ContextMenu;
