const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/Notebook";

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI, () => {
      console.log("Connected to Mongoose");
    });
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectToMongo;
