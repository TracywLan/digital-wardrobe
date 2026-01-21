import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI);

mongoose.connect.on('connected', ()=>{
    console.log('Mongoose connected to', mongoose.connection.name); 
});


mongoose.connection.on('error', ()=>{
    console.log('Error connecting to MongoDB', mongoose.connection.name);
})