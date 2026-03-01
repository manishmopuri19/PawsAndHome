import mongoose from "mongoose";

const contactSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        String,
        required:true
    },
    subject:{
        type:String,
        enum:["Technical Issue","NGO Partnership","Adoption Inquiry","others"],
        default:"others"
    },
    Message:{
        type:String,
        required:true
    }

});

export const contact=mongoose.model("contact",contactSchema);