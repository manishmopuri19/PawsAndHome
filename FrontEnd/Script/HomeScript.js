import { renderPets } from "./renderPets.js";
const API_URL = "http://localhost:8000/api/pets";

document.addEventListener("DOMContentLoaded",gethomeAnimal);

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