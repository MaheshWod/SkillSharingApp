import mongoose from "mongoose";
// Define the schema for the item
const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

// Compile the schema into a model
const Item = mongoose.model("Item", orderSchema);


export default Item;
