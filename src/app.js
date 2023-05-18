import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import { Server, Socket } from "socket.io";

import __dirname from "./utils.js"; 
import viewsProductsRouter from "./dao/routes/viewsProducts.router.js";
import viewsCartsRouter from "./dao/routes/viewsCarts.router.js";
import chatsRouter from "./dao/routes/chat.router.js";
import realTime from "./dao/routes/realTime.router.js";
import cartsRouter from "./dao/routes/carts.router.js";
import productsRouter from "./dao/routes/products.router.js";
import ChatsManagerMongo from "./dao/chatsManagerMongo.js";
import ProductsManagerMongo from "./dao/productsManagerMongo.js"

const PORT = 8080;
const MONGO = "mongodb+srv://dcanullo1980:exSwgoqTOkTEcPzD@danicanu80.cj56lz6.mongodb.net/ecommerce"
mongoose.connect(MONGO);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine" , "handlebars");

const server = app.listen(PORT, ()=>{
    console.log('Servidor funcionando en el puerto: ' + PORT)
})

app.use("/home", viewsProductsRouter);
app.use("/carts", viewsCartsRouter);
app.use("/chat", chatsRouter);
app.use("/realtimeproducts", realTime);
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

const chatsManagerMongo = new ChatsManagerMongo();
const productsManagerMongo = new ProductsManagerMongo();

const io = new Server(server);
const messages = [];

io.on('connection', async Socket =>{

    console.log("Conectado el cliente")
    const products = await productsManagerMongo.getProductsReal();
    io.emit("renderProducts", products);
    
        Socket.on("message", data =>{
            messages.push(data);
            io.emit("messageLogs", messages)
            chatsManagerMongo.addChat(data);
    })

    Socket.on('authenticated', data =>{
        Socket.broadcast.emit('newUserConnected', data)
    })

    Socket.on("submitado", async data =>{
        await productsManagerMongo.addProduct(data);
        io.emit("addProduct", data);
    })

    Socket.on("delete", async data => {
        console.log("Se eliminara id: " + data);
        await productsManagerMongo.deleteProduct(data);
    })
})



