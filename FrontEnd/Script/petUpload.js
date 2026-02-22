import { renderPets } from "./renderPets.js";
//uploading the pets for adoption
const API_URL = "http://localhost:8000/api/pets";

// get all pets rendering
let petsData=[];
document.addEventListener('DOMContentLoaded',fetchAllPets);

async function fetchAllPets(){

  
     try {
        const response=await fetch(`${API_URL}/getAll`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        });
        if (!response.ok) throw new Error("Failed to fetch data");

        petsData=await response.json();
      sessionStorage.setItem("petsData", JSON.stringify(petsData));
      console.log(petsData);
        renderPets("allPetsGrid", null, petsData); 
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong");
    }
}
//search pets for filtering

document.getElementById("searchBtn").addEventListener('click',async (e)=>{

    e.preventDefault();

    const breed=document.getElementById("searchInput").value;
    const age=document.getElementById("ageFilter").value;
    const species=document.getElementById("speciesFilter").value;
    const gender=document.getElementById("genderFilter").value;

    
    
    try {
        let param=new URLSearchParams();

        if(breed) param.append("breed",breed);
        if(age) param.append("age",age);
        if(species) param.append("species",species);
        if(gender) param.append("gender",gender);


        const response=await fetch(`${API_URL}/search?${param.toString()}`,{
            method:"GET",
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        const filteredData=await response.json();

        if(!filteredData){
            throw new Error("search result failed");
        }
        renderPets("allPetsGrid", null, filteredData);

    } catch (error) {
        console.error(error);
    }
});


//get A specific pet

// document.addEventListener("click", e => {
//   if (e.target.classList.contains("adopt-btn")) {
//     const petId = e.target.dataset.id;
//     getPetDetailsById(petId);
//   }
// });
//  async function getPetDetailsById(petId) {
//     try{
//         const response=await fetch(`${API_URL}/getPetById/${petId}`,{
//             method:"GET",
//             headers:{
//                 "Authorization":`Bearer ${localStorage.getItem("token")}`
//             }
//         });
        
//        // renderPets(response.json());
//     }
//     catch{
// console.error(error);
//     }
// }



document.addEventListener("click", e => {
  if (e.target.classList.contains("adopt-btn")) {
    const petId = e.target.dataset.id;
    console.log(petId);
    getPetDetailsById(petId);
  }
  
  // Handle a "Back" button to return to the list
  if (e.target.id === "backToGrid" || e.target.closest("#backToGrid")) {
        
        // If you just want to show the grid on the SAME page:
        const filterBar = document.getElementById("filterBar");
        if (filterBar) {
            filterBar.style.display = "flex";
            const storedData = JSON.parse(sessionStorage.getItem("petsData"));
            renderPets("allPetsGrid", null, storedData);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // If the filterBar doesn't exist (meaning you aren't on pets.html)
            // Navigate to the actual pets.html page
            window.location.href = "pets.html";
        }
    }
});

async function getPetDetailsById(petId) {
    try {
        const response = await fetch(`${API_URL}/getPetById/${petId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        
        const data = await response.json();
        showDetailedView(data); 
    } catch (error) {
        console.error("Error fetching pet details:", error);
    }
}

function showDetailedView(data) {
    const grid = document.getElementById("allPetsGrid");
    const filterBar = document.getElementById("filterBar");
    
    // Hide filters to make room for the detailed view
    if(filterBar) filterBar.style.display = "none";
    
    // Destructure owner details (with fallbacks in case data is missing)
    // const owner = pet.postedBy || {};
    // const ownerName = owner.name || "Unknown User";
    // const ownerEmail = owner.email || "Not provided";
    // const ownerMobile = owner.mobile || "Not provided";
    // const ownerLocation = owner.location || "Location not specified";

    grid.innerHTML = `
        <div class="detailed-view-container" style="grid-column: 1 / -1; background: #fff; border-radius: 20px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); display: flex; flex-direction: column; gap: 20px;">
            
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <button  id="backToGrid" class="btn-icon-mini"  style="
    display: flex; 
    align-items: center; 
    white-space: nowrap;      /* Prevents text from wrapping to a new line */
    width: max-content;       /* Ensures the button expands to fit the text */
    gap: 10px; 
    background: #fff; 
    border: 2px solid #eee; 
    padding: 10px 25px;       /* Increased horizontal padding slightly */
    border-radius: 50px; 
    cursor: pointer; 
    font-family: inherit;
    font-weight: 600;
    color: #555;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
" onmouseover="this.style.borderColor='#ff4b2b'; this.style.color='#ff4b2b'" 
   onmouseout="this.style.borderColor='#eee'; this.style.color='#555'">
    <i class="fas fa-arrow-left"></i> 
    <span style="display: inline-block;">Back to All Pets</span>
</button>
                <span class="badge" style="background: #ffe5e5; color: #ff4b2b; padding: 5px 15px; border-radius: 20px; font-weight: 600;">Status: Available</span>
            </div>

            <div class="content-wrapper" style="display: flex; gap: 40px; flex-wrap: wrap;">
                
                <div style="flex: 1; min-width: 300px;">
                    <img src="${data.petimage}" style="width: 100%; height: 450px; object-fit: cover; border-radius: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                </div>

                <div style="flex: 1.2; min-width: 300px;">
                    <h1 style="font-size: 2.8rem; margin: 0; color: #333;">${data.petname}</h1>
                    <p style="color: #777; font-size: 1.2rem; margin-bottom: 20px;">${data.petbreed} • ${data.petage} Years Old • ${data.petgender}</p>
                    
                    <div style="background: #f9f9f9; padding: 20px; border-radius: 15px; margin-bottom: 25px;">
                        <h3 style="margin-top: 0; color: #ff4b2b;"><i class="fas fa-info-circle"></i> About ${data.petname}</h3>
                        <p style="line-height: 1.6; color: #555;">${data.petdescription || "This adorable pet is looking for a forever home where they can be loved and cared for."}</p>
                    </div>

                    <div class="owner-card" style="border: 2px solid #eee; padding: 20px; border-radius: 15px;">
                        <h3 style="margin-top: 0; display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-user-shield" style="color: #ff4b2b;"></i> Contact Owner
                        </h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <label style="display: block; font-size: 0.8rem; color: #999;">Posted By</label>
                                <strong>${data.ownerName}</strong>
                            </div>
                            <div>
                                <label style="display: block; font-size: 0.8rem; color: #999;">Location</label>
                                <strong><i class="fas fa-map-marker-alt"></i> ${data.ownerLocation}</strong>
                            </div>
                            <div>
                                <label style="display: block; font-size: 0.8rem; color: #999;">Email</label>
                                <a href="mailto:${data.ownerEmail}" style="color: #ff4b2b; text-decoration: none;">${data.ownerEmail}</a>
                            </div>
                            <div>
                                <label style="display: block; font-size: 0.8rem; color: #999;">Mobile</label>
                                <a href="tel:${data.ownerMobile}" style="color: #ff4b2b; text-decoration: none;">${data.ownerMobile}</a>
                            </div>
                        </div>
                    </div>

                    <button class="btn-primary-lg" style="margin-top: 25px; width: 100%; padding: 18px; font-size: 1.1rem; border-radius: 15px; cursor: pointer; background: linear-gradient(135deg, #ff4b2b 0%, #ff416c 100%); color: white; border: none; font-weight: bold;">
                        Send Adoption Request to ${data.ownerName}
                    </button>
                </div>
            </div>
        </div>
    `;
}