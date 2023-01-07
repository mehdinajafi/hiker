import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  status: String,
  images: {
    main: String,
    optimized: [
      {
        type: String,
        url: String,
      },
    ],
  },
  title: String,
  description: String,
  rating: {
    count: Number,
    rate: Number,
  },
  category: {
    id: Number,
    title: String,
  },
  price: Number,
  slug: String,
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
