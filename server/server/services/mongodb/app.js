const cors = require("cors");
const express = require("express");
const { mongoConnect } = require("./configs/mongoConnection");
const userRouter = require("./routers/user.routes");
const app = express();

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", userRouter);

(async () => {
  try {
    await mongoConnect();
    console.log("Mongodb has been connected");
    app.listen(port, (_) => console.log(`Apps is listening at port ${port}`));
  } catch (err) {
    console.log(`Failed to connect to mongodb`);
  }
})();
