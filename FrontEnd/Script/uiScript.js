// uiScript.js

import { loadAdoptions, userpostPets,userpostDoc } from "./userDashBoard.js";

document.addEventListener("DOMContentLoaded", () => {

    
    const profileIcon = document.getElementById("profileDropdown");
    const dropdownMenu = document.getElementById("myDropdown");

    if (profileIcon && dropdownMenu) {
        profileIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle("show");
        });

        document.addEventListener("click", (e) => {
            if (!profileIcon.contains(e.target)) {
                dropdownMenu.classList.remove("show");
            }
        });
    }

   
    const savedName = localStorage.getItem("petAdoptUserName");
    const nameDisplay = document.getElementById("userNameDisplay");

    if (savedName && nameDisplay) {
        nameDisplay.innerText = savedName;
    }

    
    if (!document.querySelector(".dashboard-body")) return;

    
    window.showSection = function (sectionId, clickedItem) {
        const target = document.getElementById(sectionId);
        if(!target) return;

        document.querySelectorAll(".dash-section")
            .forEach(sec => sec.classList.remove("active"));

        document.querySelectorAll(".sidebar-menu li")
            .forEach(li => li.classList.remove("active"));

        target.classList.add("active");
        if(clickedItem) clickedItem.classList.add("active");

        if(sectionId === "adoptions-sec") {
            loadAdoptions();
        }
        if(sectionId==="manage-pets-sec"){
            userpostPets();
        }
        if(sectionId==="manage-docs-sec"){
            userpostDoc();
        }
    };

    const editBtn = document.getElementById("editProfileBtn");
    const cancelBtn = document.getElementById("resetProfileBtn");
    const profileActions = document.getElementById("cancelEdit");

    function toggleProfileInputs(disabled) {
        document
            .querySelectorAll("#profileForm input")
            .forEach(input => input.disabled = disabled);
    }

    if (editBtn && cancelBtn && profileActions) {
        editBtn.addEventListener("click", () => {
            toggleProfileInputs(false);
            profileActions.style.display = "flex";
            editBtn.style.display = "none";
        });

        cancelBtn.addEventListener("click", () => {
            toggleProfileInputs(true);
            profileActions.style.display = "none";
            editBtn.style.display = "inline-flex";
            if (typeof loadUserProfile === "function") {
                loadUserProfile();
            }
        });
    }


    const postContainer = document.getElementById("postContainer");
    const showDocBtn = document.getElementById("showDocForm");
    const showPetBtn = document.getElementById("showPetForm");

    if (postContainer && showDocBtn && showPetBtn) {
        showDocBtn.addEventListener("click", () => {
            postContainer.classList.add("active-doc");
        });

        showPetBtn.addEventListener("click", () => {
            postContainer.classList.remove("active-doc");
        });
    }


    function setupFilePreview(inputId, textId) {
        const input = document.getElementById(inputId);
        const text = document.getElementById(textId);
        if (!input || !text) return;

        input.addEventListener("change", () => {
            text.textContent = input.files.length
                ? input.files[0].name
                : "No file chosen";
        });
    }

    setupFilePreview("petPhoto", "petFileName");
    setupFilePreview("docCover", "docCoverFile");
    setupFilePreview("docFile", "docFileName");

});