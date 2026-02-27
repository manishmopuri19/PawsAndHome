import {users} from "../model/users.js";
import { pets } from "../model/pets.js";
import { documents } from "../model/documents.js";

//getting user profile
export const getuserDetails=async(req,res)=>{
    try {
        const userProfile=await users.findById(req.user._id).select("name email mobile location bio role");

        if(!userProfile) return res.status(404).json({message:"user not found"});

        return res.status(200).json(userProfile);
    } catch (error) {
     return res.status(500).json({message:"internal server error"});   
    }
}

//getting user adopted
export const getUserAdoptions=async(req,res)=>{
    try {
        const query={
            status:"adopted",
            adoptedBy:req.user._id
        }
        const adoptedPets=await pets.find(query).select("name breed age images");

        return res.status(200).json(adoptedPets);
    } catch (error) {
        return res.status(500).json({message:"internal server error try again later"});
    }
}

//update profile
export const getUserDocs=async(req,res)=>{
    try {
        const query={
            uploadedBy:req.user._id
        }
        const postedDocs=await documents.find(query).select("title description image document category status");

        return res.status(200).json(postedDocs);

    } catch (error) {
        return res.status(500).json({message:"internal server error try again later"})
    }
}

export const updateProfile=async(req,res)=>{
    try {
        const {location,bio}=req.body;
        const updated=await users.findByIdAndUpdate(
            req.user._id,{
                location,bio
        }, {
                // new: true,
                runValidators: true
            }).select("-password");

        if(!updated) return res.status(404).json({message:"user not fouund"});

        return res.status(200).json(updated);

    } catch (error) {
        
        return res.status(500).json({message:"internal server error"});
    }
}

export const getAllUserPostPets=async (req,res)=>{
    try {
        const userPosts={
        postedBy:req.user._id
    }
    console.log(userPosts)
    const data=await pets.find(userPosts).select("name age status breed images species");
    console.log(data)

    if(!data) return res.status(404).json({message:"pets not found"});
    return res.status(200).json(data);
    } catch (error) {
     return res.status(500).json({message:"internal server error"});   
    }

}
