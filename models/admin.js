import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    pay: {
        type: String
    },
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Book",
    },
    pendingOrder: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Book"
    }
})

export const Admin = mongoose.model("Admin", schema)