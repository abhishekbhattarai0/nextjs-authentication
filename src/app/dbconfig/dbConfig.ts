import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', ()=> {
            console.log("mongodb connection successfully");
        })

        connection.on('error', (error)=> {
            console.log('Mongodb connection err.');
            console.log("first", error);
            process.exit();
        })
    } catch (error) {

        console.log(error)
    }
}