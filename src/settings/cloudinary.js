import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer"

const prodImgStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "LinkedIn/Img/Users",
  },
})
export const prodImgParser = multer({ storage: prodImgStorage })
