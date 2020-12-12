import React from "react";
import "./charts-container.scss";
import LineChart from "../LineChart/LineChart";
import getLastNElement from "../../util/getLastNElement";

const ChartsContainer = ({ graphData }) => {
  return (
    <main className="charts-container-box">
      <LineChart
        createdAt={getLastNElement(graphData.createdAt, 20)}
        label={"fcp"}
        metric={getLastNElement(graphData.fcp, 20)}
      />

      <LineChart
        createdAt={getLastNElement(graphData.createdAt, 20)}
        label={"ttfb"}
        metric={getLastNElement(graphData.ttfb, 20)}
      />

      <LineChart
        createdAt={getLastNElement(graphData.createdAt, 20)}
        label={"DOMLoadTime"}
        metric={getLastNElement(graphData.DOMLoadTime, 20)}
      />

      <LineChart
        createdAt={getLastNElement(graphData.createdAt, 20)}
        label={"windowLoadTime"}
        metric={getLastNElement(graphData.windowLoadTime, 20)}
      />
    </main>
  );
};

export default ChartsContainer;
