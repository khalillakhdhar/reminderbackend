const mongoose=require("mongoose")
const dotenv = require('dotenv')
dotenv.config();
const connectDB= async ()=>{
    try{
        await mongoose.connect(process.env.MONGOURI);
        console.log('connected')

    }
    catch(error)
    {
        console.error("erreur de connexion",error.message);
        process.exit(1);
    }
    
}