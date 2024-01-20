import styled from "styled-components";

const MediaBoxContainer = styled.div`
  border: 1px solid var(--colorTertiary);
  width: fit-content;
  padding: 10px;
  margin-right: 20px;
  margin-top: 20px;
  transition: 0.5s;
  border-radius: 10px;
  float: left;
`;

const MediaBoxImage = styled.div`
  height: 280px;
  width: 280px;
`;

const MediaBoxTitle = styled.div`
  width: 280px;
  height: 25px;
  margin-top: 5px;
`;

const MediaBoxSubTitle = styled.div`
  width: 280px;
  height: 20px;
  margin-bottom: 5px;
`;

const MediaBoxFooter = styled.div`
  width: 280px;
  height: 30px;
  display: flex;
  justify-content: space-between;
`;

export {
  MediaBoxContainer,
  MediaBoxImage,
  MediaBoxTitle,
  MediaBoxSubTitle,
  MediaBoxFooter,
};
