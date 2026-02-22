import {pets} from "../model/pets.js";
import {users} from "../model/users.js";

import { uploadPicsTocloudinary } from "../util/uploadToCloud.js";


export const createPet = async (req, res) => {
  try {
    const { name, age, gender, species,breed } = req.body;

    if (!name || !gender || !species || !breed) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const imageUrls = [];

    if (req.files && req.files.length >= 0) {
      for (const file of req.files) {
        const result = await uploadPicsTocloudinary(file.buffer, "pets");
        
        imageUrls.push(result?.secure_url);
      }
    }

     const allowedSpecies = ["dog","cat","other"];

    const pet = await pets.create({
      name,
      age,
      gender,
      breed,
      species:allowedSpecies.includes(species)? species:species,
      images: imageUrls,
      postedBy: req.user._id,
      status: "posted",
    });
    
    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//searh by filters
export const searchByFilters=async(req,res)=>{
  const filters = req.query; 

  try{
    let query={status:"posted"};

    if(filters.species) query.species=filters.species;
    if(filters.age) query.age=Number(filters.age);
    if(filters.gender) query.gender=filters.gender;
    if(filters.breed) query.breed=filters.breed;

    const result=await pets.find(query);
    if(!result) return res.status(404).json({message:"data not found"});
    res.status(200).json(result);
  }
  catch(error){
    res.status(500).json({message:error});
  }
};

//getting All the pet's available

export const getAllPets= async(req,res)=>{
  try {
    const available={status:"posted"};
    
    const petsList =await pets.find(available).select(" _id name species age breed images gender");

    const result=petsList.map(pet=>({petId:pet._id,
      name:pet.name,age:pet.age,breed:pet.breed,images:pet.images,
    }));
    if(!result) return res.status(404).json({message:"data not found"});

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({message:error});
  }
}

//getting specific animal data
export const getSpecificPet=async(req,res)=>{
  try{
    const { id } = req.params; 
    
    console.log("Fetching Pet ID:", id);
    const pet = await pets.findById(id).select("postedBy images  name age gender species breed");

    if(!pet) return res.status(404).json({message:"This pet is not available"});


    const OwnerDetails=await users.findById(pet.postedBy).select("name email location mobile");
     
    if(!OwnerDetails){
      return res.status(404).json({message:"owner not found"});
    }

    const result={
      "petname":pet.name,
      "petage":pet.age,
      "petgender":pet.gender,
      "petspecies":pet.species,
      "petbreed":pet.breed,
      "petimage":pet.images,
      "ownerName":OwnerDetails.name,
      "ownerEmail":OwnerDetails.email,
      "ownerLocation":OwnerDetails.location || "Not specified",
      "ownerMobile":OwnerDetails.mobile
    };

    return res.status(200).json(result);

  }
  catch(error){
    return res.status(500).json({message:error});
  }
}


export const getHomePets=async(req,res)=>{
  try {
    const query={status:"posted"};
    const data=await pets.find(query);
    if(!data){
      return res.status(404).json({message:"data not found"});
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({message:error});
  }
}

