import CartsManagerMongo from "../cartsManagerMongo.js";
import { Router } from "express";

const router = Router();
const cartsManagerMongo = new CartsManagerMongo();

// Obtener todos los carritos
router.get("/", async (req, res) => {
  let carts = await cartsManagerMongo.getCarts();
  res.send({ Carts: carts });
});

// Obtenemos un carrito según su ID para ver sus productos
router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const result = await cartsManagerMongo.getCartByID(cid);
  res.status(result.code).send({
    status: result.status,
    message: result.message
  });
});

//Generamos un nuevo carrito
router.post("/", async (req, res) => {
  const result = await cartsManagerMongo.addCart();
  res.status(result.code).send({
    status: result.status,
    message: result.message
  });
});

// Agregamos un producto al carrito seleccionado según su ID
router.post("/:cid/products/:pid", async (req, res) => {
  
  try {
  const cid = req.params.cid;
  const pid = req.params.pid;
  
    const result = await cartsManagerMongo.addProductsInCart(cid, pid);
    res.status(result.code).send({
      status: result.status,
      message: result.message
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
