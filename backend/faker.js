const express = require("express");
const mongoose = require("mongoose");
const faker = require("faker");

const app = express();
const port = 3000;

// Replace with your MongoDB connection string
const dbURI = "mongodb://localhost:27017/testdb";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const User = require("./models/user"); // Assuming you have a 'user' model defined

app.use(express.json());

// Create a fake user and save it to the database
app.post("/create-user", async (req, res) => {
  try {
    const fakeUser = {
      fname: faker.name.firstName(),
      lname: faker.name.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      hashedPassword: faker.internet.password(),
      role: "user",
    };

    const user = await User.create(fakeUser);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
