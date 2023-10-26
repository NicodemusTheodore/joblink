if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 4001;
const userRoutes = require("./routers/user.routes");
const adminRoutes = require("./routers/admin.routes");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(userRoutes);
app.use(adminRoutes);
app.use(errorHandler);

app.get("/", (req, res, next) => {
  res.status(200).json("Welcome to the shadow realm stranger");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
