const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Restaurant = require("./models/Restaurant");

const app = express();
app.use(bodyParser.json());

const uri = "mongodb+srv://generalgva_db_user:QuA891qCXqFYwvny@lab3restaurantdatabase.trkhx6x.mongodb.net/Restaurants?retryWrites=true&w=majority";
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/restaurants", async (req, res) => {
  try {
    const sortBy = (req.query.sortBy || "").toUpperCase();

    if (sortBy === "ASC" || sortBy === "DESC") {
      const sortOption = sortBy === "ASC" ? { restaurant_id: 1 } : { restaurant_id: -1 };
      const restaurants = await Restaurant.find(
        {},
        { _id: 1, cuisine: 1, name: 1, city: 1, restaurant_id: 1 }
      ).sort(sortOption);
      return res.json(restaurants);
    }

    const restaurants = await Restaurant.find({});
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  try {
    const cuisine = req.params.cuisine;
    const restaurants = await Restaurant.find({ cuisine });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/restaurants/Delicatessen", async (req, res) => {
  try {
    const restaurants = await Restaurant.find(
      { cuisine: "Delicatessen", city: { $ne: "Brooklyn" } },
      { _id: 0, cuisine: 1, name: 1, city: 1 }
    ).sort({ name: 1 });

    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



