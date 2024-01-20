import styled from "styled-components";

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  @media only screen and (min-width: 760px) {
    height: calc(100vw - 240px);
  }
`;

export { MapContainer };
