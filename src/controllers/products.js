import createError from "http-errors"
import q2m from "query-to-mongo"

import ProductModel from "../models/products.js"

export const getAllProducts = async (req, res, next) => {
  const query = q2m(req.query, { maxLimit: 25 })
  try {
    const products = await ProductModel.find(query.criteria, query.options.fields)
      .skip(query.options.skip)
      .limit(query.options.limit)
      .populate("reviews")
    const total = await ProductModel.countDocuments(query.criteria)
    res.send({ links: query.links("/products", total), total, products })
  } catch (error) {
    next(createError(500))
  }
}
export const getSingleProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.prodId).populate("reviews")
    if (!product) return next(createError(404, `Product with id ${req.params.prodId} not found`))
    res.json(product)
  } catch (error) {
    next(createError(500))
  }
}
export const addNewProduct = async (req, res, next) => {
  const productData = { ...req.body }
  const newProduct = new ProductModel(productData)
  try {
    const test = await newProduct.save()
    console.log(test)
    res.status(201).json(newProduct)
  } catch (error) {
    next(createError(500))
  }
}
export const editProduct = async (req, res, next) => {
  const update = req.body
  try {
    const updatedProd = await ProductModel.findByIdAndUpdate(req.params.prodId, update, { new: true, runValidators: true })
    if (!updatedProd) return next(createError(404, `Product with id ${req.params.prodId} not found`))
    res.json(updatedProd)
  } catch (error) {
    next(createError(500))
  }
}
export const deleteProduct = async (req, res, next) => {
  try {
    const deletedProd = await ProductModel.findByIdAndRemove(req.params.prodId)
    if (!deletedProd) return next(createError(404, `Product with id ${req.params.prodId} not found`))
    res.json({ deletedProd })
  } catch (error) {
    next(createError(500))
  }
}
export const uploadProductImage = async (req, res, next) => {
  console.log(req.file)
  const update = { imageURL: req.file.path }
  try {
    const updatedProd = await ProductModel.findByIdAndUpdate(req.params.prodId, update, { new: true })
    if (!updatedProd) return next(createError(404, `Product with id ${req.params.prodId} not found`))
    res.json(updatedProd)
  } catch (error) {
    next(createError(500))
  }
}
