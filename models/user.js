const { type } = require("express/lib/response")
const mongoose = require("mongoose")

const userSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:
        {
            type:String,
            required:true,
            unique:true
        },
        reminders:[
            {
                type:mongoose.Schema.Types.ObjectId
            }

        ]

    }
)
const Uer = mongoose.model("User",userSchema);
module.exports=User;