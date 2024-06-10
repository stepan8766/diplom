const express = require("express");
const mongoose = require("mongoose");
const router = require("./router.js");
const fileUpload = require("express-fileupload");
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./userRouter.js");
const errorMiddleware = require('./middleware/errorMiddleware.js');
const bookings = require("./record.js");

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("static"));
app.use(fileUpload({}));
app.use("/api", router);
app.use("/api", userRouter);
app.use("/api", bookings)

app.use(errorMiddleware)

async function startApp() {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

startApp();
