import {users} from "../model/users.js";
import generateToken from "../util/generateToken.js";
import bcrypt from "bcrypt";

export const registration=async(req,res)=>{
    
    const name=req.body.name;
    const email=req.body.email;
    const mobile=req.body.mobile;
    const password=req.body.password;
    const role=req.body.role;

    if(!name || !email || !mobile || !password || !role){
        return res.status(401).json({message:"requied feild missing"});
    }

    const userExist= await users.findOne({email});

    if(userExist){
        return res.status(409).json({message:"user already exist"});
    }

    const hashPassword= await bcrypt.hash(password,10);
    const allowedRoles = ["adopter", "ngo"];
    

    const user=await users.create({name,email,mobile,password:hashPassword,role:allowedRoles.includes(role)? role:undefined});
    
    return res.status(200).json({message:"user created successfully",user:{
        id:user._id,
        name:user.name,
        email:user.email
    }});
    
}

//login

export const login=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(401).json({message:"missing fields!!!"});
    }

    const user=await users.findOne({email}).select("+password");;

    if(!user){
        return res.status(401).json({message:"user not found"});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(401).json({message:"invalid credentials!!!"});
    }

    const token=generateToken(user)
    return res.status(200).json({token,
       user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
    });

};
