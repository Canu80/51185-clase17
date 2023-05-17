import { Router } from "express";
import productsModel from "../models/products.models.js";
import ProductsManagerMongo from "../productsManagerMongo.js";

const router = Router();
const productsManagerMongo = new ProductsManagerMongo();
const products = [
	{
		"title": "Pedigree - Carne&Vegetales - 21 kg",
		"description": "Óptima Digestión Etapa 2 para perro adulto todos los tamaños sabor carne y vegetales.",
		"price": 6893,
		"thumbnail": "https://raw.githubusercontent.com/Canu80/vercel-45000-Canullo_Daniel_REAC-JS/main/public/img/02.webp",
		"code": "abc1",
		"stock": 25,
		"category": "comida/perro",
	},
	{
		"title": "Pedigree - Sano crecimiento - 21kg",
		"description": "Sano Crecimiento Etapa 1 para perro cachorro todos los tamaños sabor mix",
		"price": 7361,
		"thumbnail": "https://raw.githubusercontent.com/Canu80/vercel-45000-Canullo_Daniel_REAC-JS/main/public/img/01.webp",
		"code": "abc2",
		"stock": 22,
		"category": "comida/perro",
	},
	{
		"title": "Pedigree - Vida plena | Etapa 3 - 8kg",
		"description": "Vida Plena Etapa 3 para perro senior todos los tamaños sabor mix.",
		"price": 4025,
		"thumbnail": "https://raw.githubusercontent.com/Canu80/vercel-45000-Canullo_Daniel_REAC-JS/main/public/img/03.webp",
		"code": "abc3",
		"stock": 32,
		"category": "comida/perro",
	},
	{
		"title": "Cat Chow - Temprana edad - 8kg",
		"description": "El mejor alimento para gato de temprana edad sabor mix.",
		"price": 6834,
		"thumbnail": "https://raw.githubusercontent.com/Canu80/vercel-45000-Canullo_Daniel_REAC-JS/main/public/img/04.webp",
		"code": "abc4",
		"stock": 56,
		"category": "comida/gato",
	},
	{
		"title": "Cat Chow - Adultos | Sabor carne - 8kg",
		"description": "El mejor alimento para gato adulto sabor carne.",
		"price": 5719,
		"thumbnail": "https://raw.githubusercontent.com/Canu80/vercel-45000-Canullo_Daniel_REAC-JS/main/public/img/05.webp",
		"code": "abc5",
		"stock": 35,
		"category": "comida/gato",
	},
	{
		"title": "Cat Chow - Adultos | Sabor pescado - 15kg",
		"description": "El mejor alimento para gato adulto sabor pescado.",
		"price": 9515,
		"thumbnail": "https://raw.githubusercontent.com/Canu80/vercel-45000-Canullo_Daniel_REAC-JS/main/public/img/06.webp",
		"code": "abc6",
		"stock": 18,
		"category": "comida/gato",
	},
	{
		"title": "Rascador para gatos con cucha y pompón",
		"description": "Rascador 1 piso con cucha en el primer piso y con pompón que los hace jugar.",
		"price": 3690,
		"thumbnail": "https://raw.githubusercontent.com/Canu80/vercel-45000-Canullo_Daniel_REAC-JS/main/public/img/07.webp",
		"code": "abc7",
		"stock": 24,
		"category": "accesorios",
	},
	{
		"title": "Casa para gato | Orejitas large",
		"description": "Cucha cama para gatitos super suave y resistente MEDIUM.",
		"price": 11770,
		"thumbnail": "https://raw.githubusercontent.com/Canu80/vercel-45000-Canullo_Daniel_REAC-JS/main/public/img/08.webp",
		"code": "abc8",
		"stock": 25,
		"category": "accesorios",
	},
	{
		"title": "Casa para perro | Grande y térmica",
		"description": "Casa para perro diseñada con el tamaño ideal para razas mediana y grandes.",
		"price": 29995,
		"thumbnail": "https://raw.githubusercontent.com/Canu80/vercel-45000-Canullo_Daniel_REAC-JS/main/public/img/09.webp",
		"code": "abc9",
		"stock": 15,
		"category": "accesorios",
  }];


// Insertamos todos los productos
router.get("/insertion", async (req, res) => {
  const result = await productsModel.insertMany(products)
  res.send({result})
});

// Obtenemos todos los productos
router.get("/", async (req, res) => {
  const products = await productsManagerMongo.getProducts();
  res.send({Products: products})
});

// Obtenemos un producto según su ID
router.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const productByID = await productsManagerMongo.getProductByID(pid);
  res.status(productByID.code).send({
    status: productByID.status,
    message: productByID.message
  });
  
});

// Agregar un nuevo producto
router.post("/", async (req, res) => {
  const product = req.body;
  const newProduct = await productsManagerMongo.addProduct(product);
  
  res.status(newProduct.code).send({
    status: newProduct.status,
    message: newProduct.message
  });
});

// Modificar un producto existente
router.put('/:pid', async (request, response)=>{
  const pid = request.params.pid;  
  const product = request.body;
  const respuesta = await productsManagerMongo.updateProduct(pid, product);

  response.status(respuesta.code).send({
      status: respuesta.status,
      message: respuesta.message
  });
});


// Eliminar un producto
router.delete("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const productByID = await productsManagerMongo.deleteProduct(pid);
  res.status(productByID.code).send({
    status: productByID.status,
    message: productByID.message
  });  
});

export default router;
