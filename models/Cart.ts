import mongoose from "mongoose";

let ItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1."],
    },
  },
  {
    timestamps: true,
  }
);

const cartSchema = new mongoose.Schema({
  items: [ItemSchema],
  shippingCost: Number,
  information: {
    required: false,
    type: {
      emailOrPhoneNumber: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      address2: String,
      city: {
        type: String,
        required: true,
      },
      province: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
    },
  },
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
