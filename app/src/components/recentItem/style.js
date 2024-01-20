import styled from "styled-components";

const RecentItemContainer = styled.div`
  width: 220px;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-top: 1px solid var(--colorSecondary);
  cursor: ${(props) => (props.isActive ? "default" : "pointer")};
  background-color: ${(props) =>
    props.isActive ? "var(--activePrimary)" : ""};
`;

const RecentItemImage = styled.div`
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  overflow: hidden;
`;

const RecentItemText = styled.div`
  height: 50px;
  margin-left: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
`;

export { RecentItemContainer, RecentItemImage, RecentItemText };
