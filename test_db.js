const mongoose = require("mongoose");

// Replace <your_mongo_url> with your actual MongoDB connection string.
const mongoURL ="mongodb+srv://ExpenseTracker:12345@expensetracker.2xog7b7.mongodb.net/";

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });