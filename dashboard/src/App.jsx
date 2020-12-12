import "./app.scss";
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import createChartData from "./util/createChartData";
import createFileData from "./util/createFileData";

import initialGraphState from "./util/initialGraphState";
import ChartsContainer from "./components/ChartsContainer/ChartsContainer";
import Header from "./components/Header/Header";
import FileInformationContainer from "./components/FileInformationContainer/FileInformationContainer";

function App() {
  const [response, setResponse] = useState([]);
  const [graphData, setGraphData] = useState(initialGraphState);
  const [fileData, setFileData] = useState([]);

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
      const fileData = createFileData(response);
      setFileData(fileData);
      setGraphData(data);
    }
    return () => {
      isMount = false;
    };
  }, [response]);

  return (
    <div className="app">
      <Header />
      <ChartsContainer graphData={graphData} />
      <FileInformationContainer files={fileData} />
    </div>
  );
}

export default App;
