import express from "express"
import { login, logout, myProfile, orderBook, register, searchBook, addWishlist, fetchAllBooks } from "../controllers/user.js"
import { isAuthenticated } from "../middlewares/auth.js"
import { viewABook } from "../controllers/admin.js"
// import { demofunc } from "../controllers/user.js"


const router = express.Router()

router.post("/login", login)

router.post("/new", register)

router.get("/logout",isAuthenticated, logout)

router.get("/book/all", fetchAllBooks)

router.post("/book/search", searchBook)

router.get("/book/:id", viewABook)


router.put("/addwishlist/:id", isAuthenticated, addWishlist)

router.put("/book/order/:id", isAuthenticated, orderBook)

router.get("/profile", isAuthenticated, myProfile)


export default router