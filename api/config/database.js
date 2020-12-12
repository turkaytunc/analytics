const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGODB_CONNECTION_URI,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(
      chalk.magenta(`Mongo connected: ${connection.connection.host}`)
    );
  } catch (error) {
    console.error(chalk.red(error));
    process.exit(1);
  }
};

module.exports = connectDB;
