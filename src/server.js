import express from "express"
import mongoose from "mongoose"
import cors from "cors"

import productsRouter from "./services/products/products.js"
import { errorHandler } from "./errorHandlers.js"

const server = express()
const PORT = process.env.PORT || 3001
const DB_STRING = process.env.DB_STRING

// ### MIDDLEWARES ###
server.use(cors())
server.use(express.json())

// ### ENDPOINTS ###

server.use("/products", productsRouter)

// ### ERROR HANDLERS ###
server.use(errorHandler)

// ### DATABSE ###
mongoose
  .connect(DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => server.listen(PORT, () => console.log("Server listening on port " + PORT)))
  .catch(err => console.log(err))
