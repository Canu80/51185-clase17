import productsModel from "./models/products.models.js"

export default class ProductsManagerMongo {

  // Recibo todos los productos
  getProducts = async (limit, page, sort) => {
    
    try {
      const products = await productsModel.find();
      
      if (limit) {
        const result = await products.aggregate([
          {$group: {price:"$grade", products: {$push: "$$ROOT"}}},
          {$sort: {price:-1}}
        ]);
        return result;

      }
      
      if (page) {
        products = products.page(page);
      }
      
      if (sort) {
        const result = await productsModel.aggregate([
          {$group: {_id:"$price", products: {$push: "$$ROOT"}}},
          {$sort: {_id:-1}}
        ]);
        return result;
      }

      const result = await productsModel.find();

      return result;

    } catch (error) {
      console.log(error);
      return [];
    }
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
