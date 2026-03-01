import { renderPets,renderFullDocs } from "./renderPets.js";
const API_URL = "https://pawsandhome.onrender.com/api";

document.addEventListener("DOMContentLoaded",()=>{
    gethomeAnimal();
    getHomeDocs();
});

async function gethomeAnimal(){
    try {
        const response=await fetch(`${API_URL}/pets/homeanimals`,{
            method:"GET",
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        const data=await response.json();
        renderPets("homePetsGrid",4,data);
    } catch (error) {
        alert("Server error");
    }
}

async function getHomeDocs(){
    try {
       const response=await fetch(`${API_URL}/docs/getAllDocs`,{
        method:"GET",
        headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
       });
       
       const data=await response.json();

       renderFullDocs("homedocsGrid",4,data);
    } catch (error) {
        alert("server error");
    }
}