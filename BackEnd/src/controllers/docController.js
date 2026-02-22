import { documents } from "../model/documents.js";
import { users } from "../model/users.js";
import { uploadPicsTocloudinary,uploadDocsTocloudinary } from "../util/uploadToCloud.js";



//posting the document
export const docCreate=async(req,res)=>{

    try{
    const {title,description,category}=req.body;

    if(!title || !description || !category){
        return res.status(401).json({message:"unauthorized"});
    }

  const imageUrls = [];
const documentUrls = [];

if (req.files?.images) {
  for (const file of req.files.images) {
    const result = await uploadPicsTocloudinary(file.buffer, "pics");
    imageUrls.push(result.secure_url);
  }
}

if (req.files?.docs) {
  for (const file of req.files.docs) {
    const result = await uploadDocsTocloudinary(file.buffer, "docs");
    documentUrls.push(result.secure_url);
  }
}

    const allowedCatogires=["thoughts","documentry","research","story"]
    
    const doc=await documents.create({
        title,
        description,
        image:imageUrls,
        document:documentUrls,
        uploadedBy:req.user._id,
        category:allowedCatogires.includes(category)? category:undefined,
        status:"pending"
    });

    return res.status(200).json(doc);
}
catch{
    return res.status(500).json({message:"failed to post try again later"});
}
}

//getting all the available docs
export const getAllDocs=async(req,res)=>{
    try {
        const availableDocs={status:"posted"};

        const docsList=await documents.find(availableDocs).select(" _id title description image document category ");

        if(!docsList) return res.status(404).json({message:"no doc's found"});

        const result=docsList.map(doc=>({docId:doc._id,
            title:doc.title,description:doc.description,image:doc.image,document:doc.document,category:doc.category

        }));
        
        return res.status(200).json(result);
    } catch (error) {
     return res.status(500).json({message:"failed to fetch try again"});   
    }
}


//getting a specific document

export const specificDocDetailes=async(req,res)=>{
    try {
        const docId=req.query;
        const doc=await documents.findById(docId).select("uploadedBy");

        if(!doc) return res.status(404).json({message:"doc not found"});

        const docOwnerdetails=await users.findById(doc.uploadedBy).select(" name email ");
        
        return res.status(200).json(docOwnerdetails);
    } catch (error) {
        return res.status(500).json({message:"faild to fetch please try again later"});
    }
}

//filtering doc based on category
export const filterByCategory=async(req,res)=>{
    try {
        const specifiedCategory=req.query;

        const data=await documents.find(specifiedCategory);

        if(!data) return res.status(404).json(data);

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }
}