import styled from "styled-components";

const StickerBoxContainer = styled.div`
  width: 50px;
  height: 90px;
  margin: 0 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.color};
  border-radius: 10px;
  overflow: hidden;
  @media only screen and (min-width: 760px) {
    width: 90px;
    height: 150px;
  }
`;

const StickerBoxImage = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StickerBoxBody = styled.div`
  width: 90px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--colorPrimary);
`;

const StickerBoxLabel = styled.div`
  display: none;
  @media only screen and (min-width: 760px) {
    display: block;
  }
`;

const StickerBoxValue = styled.div``;

export {
  StickerBoxContainer,
  StickerBoxImage,
  StickerBoxBody,
  StickerBoxLabel,
  StickerBoxValue,
};
