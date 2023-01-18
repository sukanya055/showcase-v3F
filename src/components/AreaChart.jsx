import React, { Component } from "react";
import Chart from "react-apexcharts";

class AreaChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "days",
          categories: ["sun", "mon", "tue", "wed", "thus", "fri", "sat"],
        },
        colors: ["rgba(59, 182, 115, 0.19)", "rgba(155, 36, 136, 0.1)"],
        tooltip: {
          x: {
            format: "days",
          },
        },
      },
    };
  }

  componentDidMount() {
    this.setState({
      chartData: this.props.chartData,
      chartOptions: this.props.chartOptions,
    });
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="area"
        width="100%"
        height="100%"
      />
    );
  }
}

export default AreaChart;
