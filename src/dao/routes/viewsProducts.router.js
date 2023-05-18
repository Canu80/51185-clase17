import { Router } from "express";
import productsModel from "../models/products.models.js";

const router = Router();

// Obtenemos todos los productos
router.get("/", async (req, res) => {

  const {page = 1} = req.query;
  const {limit = 3 } = req.query;

  const {docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productsModel.paginate({},{limit, page, lean:true })
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