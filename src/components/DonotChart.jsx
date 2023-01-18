import React, { Component } from "react";
import Chart from "react-apexcharts";

class DonotChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [44, 55, 41, 17, 15],
      options: {
        chart: {
          width: 380,
          type: "donut",
          dropShadow: {
            enabled: true,
            color: "#111",
            top: -1,
            left: 3,
            blur: 3,
            opacity: 0.2,
          },
        },
        stroke: {
          width: 0,
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  showAlways: true,
                  show: true,
                },
              },
            },
          },
        },
        labels: ["Jeans", "Kurta", "Shoose", "Bat", "Goggles"],
        dataLabels: {
          dropShadow: {
            blur: 3,
            opacity: 0.8,
          },
        },
        fill: {
          type: "pattern",
          opacity: 1,
          pattern: {
            enabled: true,
            style: [
              "verticalLines",
              "squares",
              "horizontalLines",
              "circles",
              "slantedLines",
            ],
          },
        },
        states: {
          hover: {
            filter: "none",
          },
        },
        theme: {
          palette: "palette2",
        },
        title: {
          text: "High Sale products",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="donut"
        width="100%"
        height="100%"
      />
    );
  }
}

export default DonotChart;
