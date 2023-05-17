import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import { Server, Socket } from "socket.io";

import __dirname from "./utils.js"; 
import viewsRouter from "./dao/routes/views.router.js"
import chatsRouter from "./dao/routes/chat.router.js";
import realTime from "./dao/routes/realTime.router.js";
import cartsRouter from "./dao/routes/carts.router.js";
import productsRouter from "./dao/routes/products.router.js";
import ChatsManagerMongo from "./dao/chatsManagerMongo.js";


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

app.use("/", viewsRouter);
app.use("/chat", chatsRouter);
app.use("/realtimeproducts", realTime);
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

const chatsManagerMongo = new ChatsManagerMongo();

const io = new Server(server);
const messages = [];

io.on('connection', Socket =>{

    console.log("Socket connected")

        Socket.on("message", data =>{
            messages.push(data);
            io.emit("messageLogs", messages)
            chatsManagerMongo.addChat(data);
    })

    Socket.on('authenticated', data =>{
        Socket.broadcast.emit('newUserConnected', data)
    })

})



