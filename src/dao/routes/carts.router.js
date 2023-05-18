import { Router } from "express";
import CartsManagerMongo from "../cartsManagerMongo.js";

const router = Router();
const cartsManagerMongo = new CartsManagerMongo();

// Obtener todos los carritos
router.get("/", async (req, res) => {
  try {
    const carts = await cartsManagerMongo.getCarts();
    res.status(carts.code).send({
    status: carts.status,
    message: carts.message});
  } catch (error) {
  console.log(error);
}
});

// Obtenemos un carrito según su ID para ver sus productos
router.get("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartsManagerMongo.getCartByID(cid);
    res.status(cart.code).send({
    status: cart.status,
    message: cart.message});
  } catch (error) {
  console.log(error);
}
});

//Generamos un nuevo carrito
router.post("/", async (req, res) => {
  try {
    const cart = await cartsManagerMongo.addCart();
    res.status(cart.code).send({
    status: cart.status,
    message: cart.message});
  } catch (error) {
    console.log(error);
  }
});

// Agregamos un producto al carrito seleccionado según su ID
router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cart = await cartsManagerMongo.addProductsInCart(cid, pid);
    res.status(cart.code).send({
    status: cart.status,
    message: cart.message
  });
  } catch (error) {
    console.log(error);
  }
});

// Eliminamos un producto del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cart = await cartsManagerMongo.removeProductsFromCart(cid, pid);
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
});

// Eliminamos todos los productos del carrito
router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartsManagerMongo.removeAllProductsFromCart(cid)
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
});

// Actualizamos productos en el carrito
router.put("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const products = req.body;
  try {
    const cart = await cartsManagerMongo.updateCart(cid, products);
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
});

router.put(":cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const {quantity} = req.body
  try {
    const cart = await cartsManagerMongo.updateProductFromCart(cid, pid, quantity);
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
});

export default router;
