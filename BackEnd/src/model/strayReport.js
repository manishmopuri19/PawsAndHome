import mongoose from "mongoose"
const strayReportSchema=new mongoose.Schema({
    species:{
        type:String,
        enum:["dog","cat","other"],
        required:true
    },
    condition:{
        type:String,
        enum:["critical","mild","stable"],
        required:true
    },
    
    description: String,

    location:{
        type:String,
        required:true
    },
    image:[String],

    reportedBy:{
        type:mongoose.Schema.Types.ObjectId,
        rel:"users",
        required:true
    },
    AcceptedNgo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    },
    status: {
      type: String,
      enum: ["reported", "rescued", "closed"],
      default: "reported"
    }
},{ timestamps: true }
);

export const strayReport=mongoose.model("strayReport",strayReportSchema);