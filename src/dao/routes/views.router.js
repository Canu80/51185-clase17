import { Router } from "express";
import productsModel from "../models/products.models.js";
import ProductsManagerMongo from "../productsManagerMongo.js";

const router = Router();
const productsManagerMongo = new ProductsManagerMongo();

// Obtenemos todos los productos
router.get("/home", async (req, res) => {

  const {page = 1} = req.query;

  const {docs, hasPrevPage, hasNextPage, nextPage, prevPage   } = await productsModel.paginate({},{limit:3, page, lean:true })
  const products = docs;

  res.render('home', {
      products,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage
  })
});


export default router;