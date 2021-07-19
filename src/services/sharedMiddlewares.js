import mongoose from "mongoose"
import createError from "http-errors"

export const validateObjectId = async (req, res, next) => {
  if (req.params.prodId) {
    if (!mongoose.isValidObjectId(req.params.prodId)) return next(createError(400, "Invalid product ID"))
  }
  if (req.params.reviewId) {
    if (!mongoose.isValidObjectId(req.params.reviewId)) return next(createError(400, "Invalid review ID"))
  }
  if (req.params.cartId) {
    if (!mongoose.isValidObjectId(req.params.cartId)) return next(createError(400, "Invalid cart ID"))
  }
  next()
}
