import mongoose from "mongoose";

const usersSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            enum:["adopter","ngo","admin"],
            default: "adopter"
        },
        mobile:String,
        location:String,
        bio:String,

        isVerified:{
            type:Boolean,
            default:false
        },

        petsAdopted:{
            type:mongoose.Schema.Types.ObjectId,
            rel:"pets"
        }
 
    },

    
     {Timestamp:true}
    
);

export const users=mongoose.model("users",usersSchema);