import productsModel from "./models/products.models.js"

export default class ProductsManagerMongo {

  // Recibo todos los productos
  getProductsReal = async () => {
    const allProducts = await productsModel.find();
    return allProducts;
  };
  getProducts = async (query, options) => {
    const products = await productsModel.paginate(query, options);
    if(!products){
      return {
        code: 400,
        status: "Error",
        message: "No se ha encontrado un producto con ese número de ID"
      };
    };
    return {
      code: 202,
      status: "Success",
      message: products
    };
  };

  // Recibo el producto en base a su ID
  getProductByID = async (pid) => {
    const product = await productsModel.findOne({_id:pid});
    if(!product){
      return {
        code: 400,
        status: "Error",
        message: "No se ha encontrado un producto con ese número de ID"
      };
    };
    return {
      code: 202,
      status: "Success",
      message: product
    };
  };

  // Agregamos un nuevo producto
  addProduct = async (_product) => {
    
    const newProduct = {
      title: _product.title,
      description: _product.description,
      price: _product.price,
      thumbnail: _product.thumbnail,
      code: _product.code,
      stock: _product.stock,
      status: true,
      category: _product.category,
    };
    try {
      const result = await productsModel.create(newProduct);
        return {
          code: 202,
          status: "Success",
          message: `El producto |${_product.title}| ha sido agregado con éxito`
        };
    } catch (error){
       return {
          code: 400,
          status: "Error",
          message: `${error}`
       };
    };
  };

  // Modificamos un producto existente
  updateProduct = async (pid, product) => {
      const products = await this.getProducts();   
      const productIndex = products.findIndex(product => product.id === pid);
      products[productIndex].title = product.title;
      products[productIndex].description = product.description,
      products[productIndex].code = product.code,
      products[productIndex].price = product.price,
      products[productIndex].status = product.status,
      products[productIndex].stock = product.stock,
      products[productIndex].category = product.category,
      products[productIndex].thumbnails = product.thumbnails
      try {
        const result =  await productsModel.updateOne({_id:pid}, {$set:product})
          return {
            code: 202,
            status: "Success",
            message: `El producto |${product.title}| ha sido modificado con éxito`
          };
      } catch (error) {
          return {
              code: 400,
              status: 'Error',
              message: `${error}`
          };
      };
  };

  // Eliminamos un producto
  deleteProduct = async (pid) => {
    const product = await productsModel.deleteOne({_id:pid});
    if(!product){
      return {
        code: 400,
        status: "Error",
        message: "No se ha encontrado un producto con ese número de ID"
      };
    };
    return {
      code: 202,
      status: "Success",
      message: product
    };
    
  };

};
