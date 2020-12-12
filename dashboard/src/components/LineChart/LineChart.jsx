import React from "react";
import { Line } from "react-chartjs-2";
import "./line-chart.scss";

function LineChart({ createdAt = [], label = "", metric = [] }) {
  return (
    <div className="line-chart-container">
      <Line
        data={{
          labels: createdAt,
          datasets: [
            {
              label: `${label} (ms)`,
              data: metric,
              borderColor: "orangered",
              pointBackgroundColor: "black",
              borderWidth: 1,
              backgroundColor: "rgba(0,0,0, 0.4)",
              pointBorderColor: "white",
            },
          ],
        }}
      />
    </div>
  );
}

export default LineChart;
