import mongoose from "mongoose"

const { Schema, model } = mongoose

const reqString = { type: String, required: true }

const ProductSchema = new Schema(
  {
    name: reqString,
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    description: reqString,
    brand: reqString,
    imageURL: {
      ...reqString,
      default: "https://m3placement.com/wp-content/uploads/2021/03/image-placeholder-350x350-1.png",
    },
    price: { type: Number, required: true },
    category: reqString,
  },
  { timestamps: true }
)

export default model("Product", ProductSchema)
