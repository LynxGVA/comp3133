const mongoose = require("mongoose");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CITY_REGEX = /^[A-Za-z\s]+$/;
const URL_REGEX = /^https?:\/\/.+/i;
const ZIP_REGEX = /^\d{5}-\d{4}$/;
const PHONE_REGEX = /^\d-\d{3}-\d{3}-\d{4}$/;

const geoSchema = new mongoose.Schema(
  {
    lat: { type: String, required: [true, "address.geo.lat is required"] },
    lng: { type: String, required: [true, "address.geo.lng is required"] },
  },
  { _id: false }
);

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, required: [true, "address.street is required"], trim: true },
    suite: { type: String, required: [true, "address.suite is required"], trim: true },
    city: {
      type: String,
      required: [true, "address.city is required"],
      trim: true,
      match: [CITY_REGEX, "city must contain only letters and spaces"],
    },
    zipcode: {
      type: String,
      required: [true, "address.zipcode is required"],
      match: [ZIP_REGEX, "zipcode must match 12345-1234"],
    },
    geo: { type: geoSchema, required: [true, "address.geo is required"] },
  },
  { _id: false }
);

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "company.name is required"], trim: true },
    catchPhrase: { type: String, required: [true, "company.catchPhrase is required"], trim: true },
    bs: { type: String, required: [true, "company.bs is required"], trim: true },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required"], trim: true },

    username: {
      type: String,
      required: [true, "username is required"],
      minlength: [4, "username must be at least 4 characters"],
      maxlength: [100, "username must be at most 100 characters"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [EMAIL_REGEX, "email must be valid"],
    },

    address: { type: addressSchema, required: [true, "address is required"] },

    phone: {
      type: String,
      required: [true, "phone is required"],
      match: [PHONE_REGEX, "phone must match 1-123-123-1234"],
    },

    website: {
      type: String,
      required: [true, "website is required"],
      trim: true,
      match: [URL_REGEX, "website must start with http or https"],
    },

    company: { type: companySchema, required: [true, "company is required"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

