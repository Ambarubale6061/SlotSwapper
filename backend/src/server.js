const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");

const PORT = process.env.PORT || 4000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/slotswapper";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
