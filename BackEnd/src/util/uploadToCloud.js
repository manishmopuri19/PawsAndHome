import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadPicsTocloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export const uploadDocsTocloudinary=(buffer,folder)=>{
  return new Promise((resolve,reject)=>{
    const uploadStream=cloudinary.uploader.upload_stream(
      {folder},
      (error,result)=>{
        if(error) return reject(error);
        resolve(result);
      }
      
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  })
}