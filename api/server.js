import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import chalk from "chalk";
import bodyParser from "body-parser";
//import io from "socket.io-client";
import * as socketIO from "socket.io";

import Analytic from "./models/analytic.js"; // For es module it has to end with file extension

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new socketIO.Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const { PORT = 4000 } = process.env;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

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
    const data = items.map((item) => {
      return {
        fcp: item.fcp,
        ttfb: item.ttfb,
        DOMLoadTime: item.DOMLoadTime,
        windowLoadTime: item.windowLoadTime,
        createdAt: item.createdAt,
        files: item.files.map((file) => {
          return {
            fileName: file.fileName,
            fileType: file.fileType,
            fileLoadTime: file.fileLoadTime,
          };
        }),
      };
    });
    socket.emit("metrics", data);
  });
};

app.get("/", (req, res) => {
  res.send("Api is running!");
});

app.get("/dashboard", async (req, res) => {
  let min = req.query.min;
  const dt = new Date();
  try {
    if (min < 0 || min > 60 || min == null || min == undefined) {
      min = 5;
    }
    dt.setMinutes(dt.getMinutes() - min);

    Analytic.find({
      updatedAt: { $gte: dt },
    }).then((items) => {
      res.json(items);
    });
  } catch (error) {
    console.error(chalk.red(error));
  }
});

app.post("/analytics", async (req, res, next) => {
  try {
    const data = JSON.parse(req.body);
    const analytic = new Analytic(data);

    analytic.save().then((analytic) => {
      console.log(chalk.green("Data saved"));
      res.json("data saved");
      next();
    });
  } catch (error) {
    console.error(error);
  }
});

connectDB().then(
  server.listen(PORT, () => {
    console.log(chalk.magenta(`Server running on http://localhost:${PORT}`));
  })
);
