import styled from "styled-components";

const MediaItemContainer = styled.div`
  position: relative;
  width: 100%;
  height: 75px;
  border-bottom: 1px solid var(--colorTertiary);
`;

const MediaItemImage = styled.div`
  position: absolute;
  top: 10px;
  left: 0px;
  height: 50px;
  width: 50px;
`;

const MediaItemTitle = styled.div`
  position: absolute;
  top: 12px;
  left: 70px;
  height: 30px;
`;

const MediaItemSubTitle = styled.div`
  position: absolute;
  top: 42px;
  left: 70px;
  height: 20px;
`;

const MediaItemCounts = styled.div`
  position: absolute;
  top: 10px;
  right: 70px;
  height: 50px;
  display: flex;
  align-items: center;
`;

const MediaItemButtons = styled.div`
  position: absolute;
  top: 10px;
  right: 0px;
  width: 30px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export {
  MediaItemContainer,
  MediaItemImage,
  MediaItemTitle,
  MediaItemSubTitle,
  MediaItemButtons,
  MediaItemCounts,
};
