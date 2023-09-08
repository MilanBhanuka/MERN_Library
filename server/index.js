const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const BookRoutes = require("./Routes/BookRoutes.js");
const AuthorRoute = require("./Routes/AuthorRoute");
const StudentRoute = require("./Routes/StudentRoute");

const PORT=4000

mongoose
  .connect('mongodb+srv://Eranda:2001@cluster0.qaxcgj2.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);
app.use("/Books", BookRoutes);
app.use("/Authors", AuthorRoute);
app.use("/Students",StudentRoute);