const express = require("express");
const http = require("http");
const cors = require("cors");
const chalk = require("chalk");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const socketIO = require("socket.io");

const connectDB = require("./config/database");
const Analytic = require("./models/analytic"); // For es module it has to end with file extension
const formatData = require("./util/formatData");
const analyticRoutes = require("./routes/analyticRoutes");

//#region Initial server configurations
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new socketIO.Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//#endregion

const { PORT = 4000 } = process.env;

//#region Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

//#endregion Middleware

//#region Websocket Connection
let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000 * 5); // emit data every 5 seconds
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  let min = 30;
  const dt = new Date();

  dt.setMinutes(dt.getMinutes() - min);

  Analytic.find({
    updatedAt: { $gte: dt },
  }).then((items) => {
    const data = formatData(items);

    socket.emit("metrics", data);
  });
};

//#endregion

//#region unused rest endpoint GET /dashboard

// app.get("/dashboard", async (req, res) => {
//   let min = req.query.min;
//   const dt = new Date();
//   try {
//     if (min < 0 || min > 60 || min == null || min == undefined) {
//       min = 5;
//     }
//     dt.setMinutes(dt.getMinutes() - min);

//     Analytic.find({
//       updatedAt: { $gte: dt },
//     }).then((items) => {
//       res.json(items);
//     });
//   } catch (error) {
//     console.error(chalk.red(error));
//   }
// });

//#endregion

app.get("/", (req, res) => {
  res.send("Api is running!!");
});

//#region analytic routes

app.use("/analytics", analyticRoutes);

//#endregion

connectDB().then(
  server.listen(PORT, () => {
    console.log(chalk.magenta(`Server running on http://localhost:${PORT}`));
  })
);
