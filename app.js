require('dotenv').config({path:"./.env"})
const express = require("express");
const res = require("express/lib/response");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Db is Connected");
  })
  .catch((e) => {
    console.log(e);
  });

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

app.get("/health", (req, res) => {
  res.status(200).send("Helath is up.");
});

app.post("/add", async (req, res) => {
  const { name, email } = req.body;
  const user = new User({
    name,
    email,
  });
  let savedUser;
  try {
    savedUser = await user.save();
  } catch (e) {
    throw new Error("Something went wrong");
  }
  res
    .status(201)
    .send({ Message: "User Created succesfully.", User: savedUser });
});

app.get("/get", async (req, res) => {
  try {
    const user = await User.find();
    res.send({ User: user });
  } catch (e) {
    console.log(e);
  }
});

app.put("/update/:id", async (req, res) => {
  const { name, email } = req.body;
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
      },
      { new: true }
    );
  } catch (e) {
    console.log(e);
  }

  return res.status(200).send({ Message: "User is updated Succesfully" });
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
  } catch (e) {
    console.log(e);
  }
  return res.status(200).send({ Message: "User is deleted Succesfully" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;