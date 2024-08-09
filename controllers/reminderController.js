const Reminder =require("../models/reminder")
const User=require("../models/user")
exports.createReminder=async (req,res) => {
    try {
        //const {id} =req.params;
        const {title,description,date,userid}=req.body
        const user=await User.findByid(userid);
        if(!user)
         {   return res.status(404).json({message:'utilisateur introuvable'})
    }
    const remind=new Reminder({
        title,
        description,
        date,
        user:userid
    })
    const saved=await remind.save();
    res.status(201).json(saved)


    } catch (error) {
    res.status(500).json({message:"reminder was not saved"})
    }
    
}
exports.getReminder=async (req,res) => {
    try{
        const reminders=await Reminder.find().populate("user");
        res.status(200).json(reminders)

    }
    catch (error) {
        res.status(500).json({message:"reminder was not loaded"})
        }

    
}
exports.deleteReminder=async (req,res) => {
try {
    
    const {id}=req.params;
    const remind=await Reminder.findByIdAndDelete(id);
    if(!remind)
    {return res.status(404).json({message:"Reminder not found"})}
} catch (error) {
    
}
    
}