import mongoose from "mongoose";

const documentSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },

    description:{
        type:String,
        required:true
    },

    image:[String],

    document:[String],

    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        rel:"user"
    },
    
    category: {
      type: String,
      enum: ["thoughts", "documentary", "research", "story"],
      default: "thoughts"
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }

},  { timestamps: true });

export const documents=mongoose.model("documents",documentSchema)