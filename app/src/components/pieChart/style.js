import styled from "styled-components";

const PieChartContainer = styled.div`
  width: 100%;
`;

const PieChartBody = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  @media only screen and (min-width: 760px) {
    height: 600px;
  }
`;

const PieChartSticker = styled.div`
  position: absolute;
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: 760px) {
    height: 600px;
  }
`;

const PieChartGraph = styled.div`
  position: absolute;
  height: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    width: 300px;
    height: 300px;
  }

  @media only screen and (min-width: 760px) {
    width: 100%;
    height: 600px;

    & > div {
      width: 600px;
      height: 600px;
    }
  }
`;

const PieChartLegend = styled.div`
  width: 100%;
`;

export {
  PieChartContainer,
  PieChartBody,
  PieChartLegend,
  PieChartSticker,
  PieChartGraph,
};
