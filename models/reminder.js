const { type } = require("express/lib/response")
const mongoose=require("mongoose")
const { date } = require("yup")
const reminderSchema=new mongoose.Schema(
    {
        title:{
            required:true,
            type:String 
        },
        description:String,
        
        
        date:{
            type:Date,
            required:true

        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true


        }

    }
);
const Reminder=mongoose.model("Reminder",reminderSchema)
module.exports=Reminder