const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: String,
    cuisine: String,
    city: String,
    address: Object,
    restaurant_id: String
  },
  { collection: "Restaurants" }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);