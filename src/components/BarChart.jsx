import React, { Component } from "react";
import Chart from "react-apexcharts";
const colors = [
  "#736EFE",
  "#5DE182",
  "#FFE085",
  "rgba(221, 105, 175, 0.58)",
  "#FDFF98",
  "#58CFFB",
  "#5DE182",
  "#FFE085",
];
class BarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          data: [21, 22, 10, 28, 16, 21, 13, 30],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: function (chart, w, e) {
             
            },
          },
        },
        colors: colors,
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [
            "Jan",
            "Fab",
            "March",
            "Aprl",
            "May",
            "Jun",
            "Jul",
            "Aug",
          ],
          labels: {
            style: {
              colors: colors,
              fontSize: "12px",
            },
          },
        },
      },
    };
  }
  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        width="100%"
        height="100%"
      />
    );
  }
}

export default BarChart;
