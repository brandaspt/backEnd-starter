import express from "express"
import { validateObjectId } from "../sharedMiddlewares.js"
import * as Controllers from "../../controllers/products.js"
import { prodImgParser } from "../../settings/cloudinary.js"

const router = express.Router()

router.get("/", Controllers.getAllProducts)
router.get("/:prodId", validateObjectId, Controllers.getSingleProduct)
router.post("/", Controllers.addNewProduct)
router.put("/:prodId", validateObjectId, Controllers.editProduct)
router.delete("/:prodId", validateObjectId, Controllers.deleteProduct)
router.post(
  "/:prodId/uploadImage",
  validateObjectId,
  prodImgParser.single("prodImg"),
  Controllers.uploadProductImage
)

export default router
