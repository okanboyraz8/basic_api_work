const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const db = require("./config/db.js");
const authRoutes = require("./routes/auth.js");
const hotelRoutes = require("./routes/hotel.js");
const roomRoutes = require("./routes/room.js");
const userRoutes = require("./routes/user.js");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use("/", authRoutes);
app.use("/", hotelRoutes);
app.use("/", roomRoutes);
app.use("/", userRoutes);

db(); //connected MONGO_DB

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
