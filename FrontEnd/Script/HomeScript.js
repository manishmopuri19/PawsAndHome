import { renderPets,renderFullDocs } from "./renderPets.js";
const API_URL = "https://pawsandhome.onrender.com/api/pets";

document.addEventListener("DOMContentLoaded",()=>{
    gethomeAnimal();
    getHomeDocs();
});

async function gethomeAnimal(){
    try {
        const response=await fetch(`${API_URL}/homeanimals`,{
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
       const response=await fetch(`${API_URL}/homeDocs`,{
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