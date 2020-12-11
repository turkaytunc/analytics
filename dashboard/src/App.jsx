import "./app.scss";
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import createChartData from "./util/createChartData";

import initialGraphState from "./util/initialGraphState";
import ChartsContainer from "./components/ChartsContainer/ChartsContainer";

function App() {
  const [response, setResponse] = useState([]);
  const [graphData, setGraphData] = useState(initialGraphState);

  // WebSocket Connection
  useEffect(() => {
    const socket = socketIOClient(process.env.REACT_APP_WS_ENDPOINT);
    socket.on("metrics", (data) => {
      setResponse(data);
    });
    return () => socket.disconnect();
  }, []);

  // Filter Data
  useEffect(() => {
    let isMount = true;
    if (isMount) {
      const data = createChartData(response);
      setGraphData(data);
    }
    return () => {
      isMount = false;
    };
  }, [response]);

  return (
    <div className="app">
      <ChartsContainer graphData={graphData} />
    </div>
  );
}

export default App;
