import mongoose from "mongoose";


const schema = new mongoose.Schema({
    BookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    isShipped: {
        type: Boolean,
        default: false,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

})

export const Order = mongoose.model("Order", schema)

