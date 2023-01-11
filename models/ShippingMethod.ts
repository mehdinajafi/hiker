import mongoose from "mongoose";

const shippingMethodSchema = new mongoose.Schema({
  _id: Number,
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const ShippingMethod =
  mongoose.models.ShippingMethod ||
  mongoose.model("ShippingMethod", shippingMethodSchema);

export default ShippingMethod;
