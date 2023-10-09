import mongoose from "mongoose";

export const ConnectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "bookStore"
    }).then((c)=>{
        console.log(`Database connected with ${c.connection.host}`)
    }).catch((e)=>{
        console.log(e)
    })
}


