import express from "express"
import { isAdmin } from "../middlewares/auth.js"
import { adminLogout, getAllBooks, getAllUsers, getPendingOrders, login, newBook, removeBook } from "../controllers/admin.js"

const router = express.Router()

router.post("/login", login)

router.get("/allusers", isAdmin, getAllUsers)

router.get("/logout", isAdmin, adminLogout)

router.post("/book/new", isAdmin, newBook)

router.get("/book/all", isAdmin, getAllBooks)

router.delete("/book/delete/:id", isAdmin, removeBook)

router.get("/book/pendingorders", isAdmin, getPendingOrders)

export default router