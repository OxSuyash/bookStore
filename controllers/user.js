import { User } from "../models/User.js";
import { Book } from "../models/book.js";
import { Orderbook } from "../models/Pending.js";
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";



export const login = async (req, res, next) => {

    try {
        const { email, password } = req.body

        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return next(new ErrorHandler("Invalid Email or Password", 400))
        }

        const isMatch = await bcrypt.compare(password, user.password)


        if (!isMatch) {
            return next(new ErrorHandler("Invalid Email or Password", 400))
        }

        sendCookie(user, res, `Welcome back, ${user.name}`, 200)
    } catch (error) {
        next(error)
    }

}

export const register = async (req, res, next) => {

    try {
        const { name, email, password } = req.body

        let user = await User.findOne({ email })


        if (user) {
            return next(new ErrorHandler("User already exists", 400))
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        sendCookie(user, res, "Registered successfully", 201)
    } catch (error) {
        next(error)
    }

}

export const logout = (req, res) => {

    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
        message: "logout successful",
    })
}

export const searchBook = async (req, res, next) => {

    const { title } = req.body;

    const regex = new RegExp(title, 'i'); // 'i' flag for case-insensitive search
    const book = await Book.find({ title: { $regex: regex } });

    if (!book) {
        return next(new ErrorHandler("No such book found on marketplace", 400))
    }

    res.status(200).json({
        success: true,
        book
    })

}

export const orderBook = async (req, res, next) => {
    const user = req.user
    const userId = user._id
    const bookId = req.params.id

    const book = await Book.findById(bookId)

    if (!book) {
        return next(new ErrorHandler("No such book found on marketplace", 400))
    }

    if (book.quantity > 0) {
        await Orderbook.create({
            itemId: bookId,
            customerId: userId
        })

        const bookTitle = book.title
        const bookPrice = book.price
        const bookAuthor = book.author

        // user.orderHistory.push(orderId._id)
        user.orderHistory.push({
            bookTitle,
            bookPrice,
            bookAuthor
        })
        await user.save()
    }

    book.quantity -= 1;
    await book.save()

    res.status(200).json({
        success: true,
        message: "Order placed successfully!"
    })
}

export const myProfile = async (req, res, next) => {
    const userId = req.user._id

    const user = await User.findById(userId)

    const pastOrders = []

    const userName = user.name;
    const userEmail = user.email;
    const userWishList = user.wishlist

    const userDetails = {
        userName,
        userEmail,

    }

    // console.log(user.orderHistory.length)

    for(let i = 0; i< user.orderHistory.length; i++) {
        pastOrders.push(user.orderHistory[i].bookTitle)
    }

    res.status(200).json({
        success: true,
        userDetails,
        userWishList,
        pastOrders
    })

}

export const viewBook = async(req, res) => {
    const bookId = req.params.id;

    const book = await Book.findById(bookId)
    if (!book) {
        return next(new ErrorHandler("No such book found on marketplace", 400))
    }

    res.status(200).json({
        success: true,
        book
    })

}

export const addWishlist = async (req, res, next) => {
    const user = req.user;

    const bookId = req.params.id;

    const book = await Book.findById(bookId)
    if (!book) {
        return next(new ErrorHandler("No such book found on marketplace", 400))
    }

    user.wishlist.push(book)
    await user.save()

    res.status(200).json({
        success: true,
        message: "Book is added to the wishlist"
    })
}


