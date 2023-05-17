import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";
const productSchema = new mongoose.Schema({
    
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    thumbnail:{
        type: String,
        require: true
    },
    code:{
        type: String,
        require: true
    },
    stock:{
        type: Number,
        require: true
    },
    category:{
        type: String,
        require: true
    }
},{ collection: "Products" })

// product: 
//         {
//         type:[
//                 {
//                     title:{
//                         type: String,
//                         require: true
//                     },
//                     description:{
//                         type: String,
//                         require: true
//                     },
//                     price:{
//                         type: Number,
//                         require: true
//                     },
//                     thumbnail:{
//                         type: String,
//                         require: true
//                     },
//                     code:{
//                         type: String,
//                         require: true
//                     },
//                     stock:{
//                         type: Number,
//                         require: true
//                     },
//                     category:{
//                         type: String,
//                         require: true
//                     }
//                 },
//             ],
//         default: [],       
//         },    
// },{ collection: "Products" })

productSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(productsCollection, productSchema);

export default productsModel;