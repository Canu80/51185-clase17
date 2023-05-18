import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartsCollection = "carts";
const cartSchema = new mongoose.Schema({

    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products",
                },
                quantity: Number,
            },
        ],
        default: [],
    },
    
},{ collection: "Carts" });

cartSchema.pre("find", function () {
    this.populate("products.product")
})

const cartsModel = mongoose.model(cartsCollection, cartSchema);

export default cartsModel;