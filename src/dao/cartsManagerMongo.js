import cartsModel from "./models/carts.models.js"
import productsModel from "./models/products.models.js"

export default class CartsManagerMongo {
  
  // Recibo todos los carritos
  getCarts = async () => {
    const carts = await cartsModel.find();
    //console.log(JSON.stringify(carts, null, "\t"))
    if(!carts){
      return {
        code: 400,
        status: "Error",
        message: "No se ha encontrado un carrito con ese número de ID"
      };
    };
    return {
      code: 202,
      status: "Success",
      message: carts
    };
  };

  // Recibo el carrito en base a su ID
  getCartByID = async (cid) => {
    const cart = await cartsModel.find({_id:cid});
    if(!cart){
      return {
        code: 400,
        status: "Error",
        message: "No se ha encontrado un carrito con ese número de ID"
      };
    };
    return {
      code: 202,
      status: "Success",
      message: cart
    };
    
  };

  // Creamos un nuevo carrito
  addCart = async () => {
    const cart = await cartsModel.create({});
    return {
      code: 202,
      status: "Success",
      message: cart
    };
  };

  // Agregamos productos al carrito
  addProductsInCart = async (cid, pid) => {
    const filteredCar = await cartsModel.findOne({ _id: cid });
    if (!filteredCar) return `El carrito con el id ${cid} no existe`;
    const filteredproduct = await productsModel.findOne({ _id: pid });
    if (!filteredproduct) return `El producto con el id ${pid} no existe`;

    let productsInCart = filteredCar.products;
    const indexProduct = productsInCart.findIndex((product) => product._id == pid);
    if (indexProduct === -1) {
       const product = {
        _id: pid,
        quantity: 1
      }
      productsInCart.push(product)
    }
    else{
      productsInCart[indexProduct].quantity = productsInCart[indexProduct].quantity + 1;
    }
    const result = await cartsModel.updateOne({_id:cid},{$set:filteredCar})
    return {
      code: 202,
      status: "Success",
      message: filteredCar
    };
  };

  // Eliminamos productos del carrito
  removeProductsFromCart = async (cid, pid) => {
    const product = await productsModel.findOne({ _id: pid });
    if (!product) return `El producto no existe en este carrito`;
    const cart = await cartsModel.findOne({ _id: cid });
    if (!cart) return `El carrito que buscas no existe`;

    let productsFromCart = cart.products;
    const indexProduct = productsFromCart.findIndex((product) => product._id == pid);
    productsFromCart[indexProduct].quantity = productsFromCart[indexProduct].quantity - 1;

    if (productsFromCart[indexProduct].quantity === 0) {
      cart.products.splice(indexProduct, 1);
      await cart.save();
      return cart;
    }
    await cart.save();
    return cart;
  }
  
  // Eliminamos todos los productos del carrito
  async removeAllProductsFromCart(cid) {
    const cart = await cartsModel.findOne({ _id: cid });
    if (!cart) return `El carrito no existe`;
    cart.products = [];
    await cart.save();
    return cart;
  }

  // Actualizamos los productos del carrito
  async updateCart(cid, products) {
    const cart = await cartsModel.findOne({ _id: cid });
    if (!cart) return `El carrito no existe`;
    cart.set({ products });
    await cart.save();
    return cart;
  }

  // Actualizamos al cantidad de productos del carrito
  async updateProductFromCart(cid, pid, quantity) {
    const cart = await cartsModel.findOne({ _id: cid });
    if (!cart) return `El carrito no existe`;
    const product = await productsModel.findOne({ _id: pid });
    if (!product) return `El producto no existe`;
    const updateProduct = cart.products.find((p) => p.product == pid);
    updateProduct.quantity = quantity;
    await cart.save();
    return cart;
  }
}
