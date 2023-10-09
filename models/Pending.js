import mongoose from "mongoose";


const schema = new mongoose.Schema({
    itemId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    isShipped: {
        type: Boolean,
        default: false,
    }
})

export const Orderbook = mongoose.model("Orderbook", schema)