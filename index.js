const express = require("express");
require("dotenv").config();
const cors = require("cors");
const conncection = require("./db");
const { userRouter } = require("./Routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/pdc", userRouter);

app.listen(process.env.PORT, async () => {
  try {
    await conncection;
    console.log("listening on port " + process.env.PORT);
  } catch (error) {
    console.log(error);
    console.log("unable to connect to db");
  }
});
