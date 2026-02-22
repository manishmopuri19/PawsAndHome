// userDashBoard.js
const API_URL = "http://localhost:8000/api";
import { renderUserAdoptions,renderUserPosts } from "./renderPets.js";


document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please login first");
        window.location.href = "index.html";
        return;
    }

    if (document.getElementById("profileForm")) {
        loadUserProfile();
    }

    setupProfileForm();
    setupDocsUpload();
    setupCreatePostForm();
});


//LOAD USER PROFILE

async function loadUserProfile() {
    try {
        const response = await fetch(`${API_URL}/userDashboard/userProfile`, {
            method:"GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (!response.ok) {
            alert("User not found");
            return;
        }

        const user = await response.json();

        document.getElementById("pName").value = user.name || "";
        document.getElementById("pEmail").value = user.email || "";
        document.getElementById("pTel").value = user.mobile || "";
        document.getElementById("pLoc").value = user.location || "";
        document.getElementById("pBio").value = user.bio || "";

    } catch {
        alert("Failed to load profile");
    }
}

//UPDATE PROFILE
function setupProfileForm() {
    const profileForm = document.getElementById("profileForm");
    if (!profileForm) return;

    profileForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const userData = {
            name: pName.value,
            email: pEmail.value,
            mobile: pTel.value,
            location: pLoc.value,
            bio: pBio.value
        };

        try {
            const response = await fetch(`${API_URL}/userDashboard/updateUser`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                alert("Update failed");
                return;
            }

            alert("Profile updated successfully");
        } catch {
            alert("Server error");
        }
    });
}


//load pets that are adopted
export async function loadAdoptions() {
    try {
        const response = await fetch(`${API_URL}/userDashboard/getUserAdoptions`, {
            method:"GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        const pets = await response.json();
        const grid = document.getElementById("adoptionsGrid");
        if (!grid) return;

        grid.innerHTML = "";

        if (!pets.length) {
            grid.innerHTML = "<p>No adoptions yet</p>";
            return;
        }

        renderUserAdoptions("adoptionsGrid", null, pets);

    } catch {
        alert("Failed to load adoptions");
    }
}



//upload doc
function setupDocsUpload() {
    const docsUpload = document.getElementById("docsUpload");
    if (!docsUpload) return;

    docsUpload.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const category = document.getElementById("category").value;
        const coverImage = document.getElementById("docCoverInput").files[0];
        const docFile = document.getElementById("docFile").files[0];

        if (!title || !description || !category || !coverImage || !docFile) {
            alert("Please fill all required fields");
            return;
        }

        const form = new FormData();
        form.append("title", title);
        form.append("description", description);
        form.append("category", category);
        form.append("images", coverImage);
        form.append("docs", docFile);

        try {
            const response = await fetch(`${API_URL}/docs/postDoc`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: form
            });

            if (!response.ok) {
                alert("Failed to upload document");
                return;
            }

            alert("Document uploaded successfully");
        } catch {
            alert("Something went wrong");
        }
    });
}

//

function setupCreatePostForm() {
    const formEl = document.getElementById("CreatePostForm");
    if (!formEl) return;

    formEl.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = petName.value;
        const breed = petBreed.value;
        const age = petAge.value;
        const gender = petGender.value;
        const species = petSpecies.value;
        const images = petPhoto.files[0];

        if (!name || !breed || !age || !gender || !species || !images) {
            alert("Missing fields");
            return;
        }

        const form = new FormData();
        form.append("name", name);
        form.append("breed", breed);
        form.append("age", age);
        form.append("gender", gender);
        form.append("species", species);
        form.append("images", images);

        try {
            const result = await fetch(`${API_URL}/pets/petUpload`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: form
            });

            if (!result.ok) {
                alert("Failed to create post");
                return;
            }

            alert("Pet posted successfully");
            loadAdoptions();
        } catch {
            alert("Server error");
        }
    });
}

//load user posted pets

export async function userpostPets() {

    try {
        const response=await fetch(`${API_URL}/userDashboard/getMypostPets`,{
            method:"GET",
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        const data=await response.json();
        const grid = document.getElementById("userpostedGrid");
        if (!grid) return;

        grid.innerHTML = "";

        if (!pets.length) {
            grid.innerHTML = "<p>No posts yet</p>";
            return;
        }

        renderUserPosts('userpostedGrid',null,data);


    } catch (error) {
        
    }
    
}