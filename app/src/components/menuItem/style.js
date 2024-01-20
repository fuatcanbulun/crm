import styled from "styled-components";

const MenuItemContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: ${(props) => (props.isActive ? "default" : "pointer")};
  background-color: ${(props) =>
    props.isActive ? "var(--activePrimary)" : ""};
`;

const MenuItemIcon = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuItemText = styled.div`
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
`;

export { MenuItemContainer, MenuItemIcon, MenuItemText };
