import styled from "styled-components";

const LogoContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.type === "login" ? "transparent" : "var(--colorPrimary)"};
`;

export { LogoContainer };
