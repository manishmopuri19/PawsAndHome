import mongoose from "mongoose";

const petsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    breed:{
      type:String,
      required:true
    },
    species:{
        type:String,
        enum:["dog","cat","other"],
        required:true
    },
    age:Number,
    gender:{
        type:String,
        enum:["male","female"],
        required:true
    },

    images:[String],

    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    currentCaretaker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    },

    status: {
      type: String,
      enum: [
        "posted",
        "pending",
        "approved",
        "adopted",
        "in-care",
        "rejected"
      ],
      default: "posted"
    },

    adoptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    }
},
  { timestamps: true }
    
)

export const pets=mongoose.model("pets",petsSchema);