import cartsModel from "./models/carts.models.js"
import productsModel from "./models/products.models.js"

export default class CartsManagerMongo {
  
  // Recibo todos los carritos
  getCarts = async () => {
    const cart = await cartsModel.find();
    return cart;
  };

  // Recibo el carrito en base a su ID
  getCartByID = async (cid) => {
    const cart = await cartsModel.find({_id:cid}).populate("products.product");
    console.log(JSON.stringify(cart, null, "\t"))
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
    const result = await cartsModel.create({});
    return {
      code: 202,
      status: "Success",
      message: result
    };
  };

  // Agregamos productos al carrito
  addProductsInCart = async (cid, pid) => {
    
    const carts = await this.getCarts();
    const filteredCar = carts.find((cart) => cart._id == cid);
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
}
