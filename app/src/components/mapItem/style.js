import styled from "styled-components";

const MapItemContainer = styled.div`
  position: relative;
  width: 250px;
  height: 60px;
  zindex: 9;
  background-color: var(--colorPrimary);
  border-radius: 40px;
`;

const MapItemBody = styled.div`
  position: absolute;
  top: 0px;
  left: 60px;
  height: 60px;
  width: 150px;
  padding: 10px;
`;

const MapItemImage = styled.div`
  position: absolute;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  overflow: hidden;
`;

const MapItemAnimation = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  height: 30px;
  width: 30px;
`;

export { MapItemContainer, MapItemImage, MapItemBody, MapItemAnimation };
