import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  PieChartContainer,
  PieChartBody,
  PieChartLegend,
  PieChartSticker,
  PieChartGraph,
} from "./style";
import Row from "../row";
import Text from "../text";
import StickerBox from "../stickerBox";

const PieChart = ({ data, title }) => {
  console.log("data", data);

  const totalLikes = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue.y,
    0
  );

  const options = {
    chart: {
      type: "pie",
      width: null,
      height: null,
      backgroundColor: "transparent",
    },
    title: {
      text: "",
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    plotOptions: {
      pie: {
        shadow: false,
        borderWidth: 0,
      },
    },
    tooltip: {
      formatter: function () {
        console.log("fuatcan", this);
        return (
          "<b>" + this.point.name + "</b>: " + this.percentage.toFixed(2) + " %"
        );
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: title,
        size: "90%",
        data: data,
        innerSize: "80%",
        showInLegend: true,
        dataLabels: {
          enabled: false,
        },
      },
    ],
  };

  return (
    <PieChartContainer>
      <PieChartBody>
        <PieChartSticker>
          <Text label={title} color="textSecondary" size="md" />
          <Text label={totalLikes} color="textPrimary" size="xl" />
        </PieChartSticker>

        <PieChartGraph>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </PieChartGraph>
      </PieChartBody>
      <PieChartLegend>
        <Row direction="row" justify="center" align="center">
          {data.map((item, index) => (
            <StickerBox
              key={index}
              label={item.label}
              image={item.image}
              value={item.y}
              color={item.color}
            />
          ))}
        </Row>
      </PieChartLegend>
    </PieChartContainer>
  );
};

export default PieChart;
