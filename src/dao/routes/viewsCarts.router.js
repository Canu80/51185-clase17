import { Router } from "express";
import cartsModel from "../models/carts.models.js";

const router = Router();

// Obtenemos todos los productos
router.get("/", async (req, res) => {

  const {page = 1} = req.query;
  const {limit = 3 } = req.query;
  
  const {docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await cartsModel.paginate({},{limit, page, lean:true })
  const carts = docs;
  
  res.render('carts', {
      carts,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage
  })
});

export default router;