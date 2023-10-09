import { User } from "../models/User.js";
import jwt from "jsonwebtoken"
import { Admin } from "../models/admin.js";


export const isAuthenticated = async (req, res, next) => {
    
    const {token} = req.cookies;
    
    
    if(!token)
        return res.status(404).json({
            success: false,
            message: "Login first",
        })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded._id)

    next()
}

export const isAdmin = async (req, res, next) => {
    const {adminToken} = req.cookies;
    
    if(!adminToken)
        return res.status(404).json({
            success: false,
            message: "Login first",
        })

    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET)

    req.admin = await Admin.findById(decoded._id)

    next()
}