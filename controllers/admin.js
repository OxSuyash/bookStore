import {Book} from "../models/book.js"
import { Admin } from "../models/admin.js"
import { Orderbook } from "../models/Pending.js"
import ErrorHandler from "../middlewares/error.js"
import {sendCookie2 } from "../utils/feature.js"
import { User } from "../models/User.js"

export const newBook = async (req, res, next) => {
    try {
        const { title, price, author, quantity } = req.body
        

        await Book.create({
            title,
            price,
            author,
            quantity
        })

        res.status(201).json({
            success: true,
            message: "Your book is now listed on marketplace."
        })
    } catch (error) {
        next(error)
    }
}

export const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find().sort({ _id: -1 })

        res.status(200).json({
            success: true,
            books
        })
    } catch (error) {
        next(error)
    }
}

export const viewABook = async (req, res, next) => {
    try {
    
        const book = await Book.findById(req.params.id)

        res.status(200).json({
            success: true,
            book
        })
    } catch (error) {
        next(error)
    }
}


export const removeBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id)

        if (!book) return next(new ErrorHandler("No such book! Try searching other way.", 404))

        await book.deleteOne()

        res.status(200).json({
            success: true,
            message: `Removed the book from marketplace.`
        })

    } catch (error) {
        next(error)
    }
}


export const login = async (req, res, next) => {

    try {
        const { email, password } = req.body

    const admin = await Admin.findOne({ email }).select("+password")

    if (!admin) {
        return next(new ErrorHandler("Invalid Email or Password!", 400))
    }
    
    if (password != admin.password) {
        return next(new ErrorHandler("Invalid Email or Password", 400))
    }

    sendCookie2(admin, res, `Welcome back, ${admin.name}`, 200)
    } catch (error) {
        next(error)
    }

}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().sort({ _id: -1 })

        res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        next(error)
    }
}

export const adminLogout = (req, res) => {

    res.status(200).cookie("adminToken", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
        message: "logout successful",
    })
}

export const getPendingOrders = async (req, res, next) => {
    try {
        const books = await Orderbook.find().sort({ _id: -1 })

        res.status(200).json({
            success: true,
            books
        })
    } catch (error) {
        next(error)
    }
}

export const shipItem = async (req, res, next) => {
    try {
        const orderId = req.params.id;

        const order = await Orderbook.findById(orderId)

        if(!order) {
            return next(new ErrorHandler("Order does not match with any order!", 400))
        }

        order.isShipped = true;
        await order.save()

    } catch (error) {
        next(error)
    }
}