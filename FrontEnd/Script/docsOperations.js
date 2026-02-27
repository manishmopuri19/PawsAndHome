import { renderFullDocs } from "./renderPets.js";

const API_URL = "http://localhost:8000/api/docs";




//get all documents
let docData=[];

document.addEventListener("DOMContentLoaded",loadAllDocs);


async function loadAllDocs(){

   try {
    const res=await fetch(`${API_URL}/getAllDocs`,{
        method:"GET",
        headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

   docData=await res.json();
   if(!docData) return alert("failed");

   renderFullDocs("fullDocsGrid",null,docData);
   }
    catch (error) {
    return console.log(error);
   }
}
//get pets based on there category;


