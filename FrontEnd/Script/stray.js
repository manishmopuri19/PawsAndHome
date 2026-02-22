// SECTION TOGGLING
function showSection(sectionId) {
    document.querySelectorAll('.dash-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.sidebar-menu li').forEach(l => l.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// STRAY RESCUE LOGIC
function markAsRescued(select) {
    const card = select.closest('.manage-card');
    if (select.value === 'rescued') {
        card.classList.add('rescued-opacity');
        alert("Great job! Stray marked as Rescued.");
    } else {
        card.classList.remove('rescued-opacity');
    }
}

// FILE NAME DISPLAY (ELEGANT BUTTONS)
function setupUpload(inputId, nameId) {
    const input = document.getElementById(inputId);
    const nameDisp = document.getElementById(nameId);
    if(input && nameDisp) {
        input.addEventListener('change', () => {
            nameDisp.innerText = input.files.length > 0 ? "File: " + input.files[0].name : "No file chosen";
            nameDisp.style.color = "#ff4b2b";
        });
    }
}

// PROFILE LOCK/UNLOCK
const editBtn = document.getElementById('editProfileBtn');
const profileForm = document.getElementById('profileForm');
if(editBtn) {
    editBtn.onclick = () => {
        profileForm.querySelectorAll('input').forEach(i => i.disabled = false);
        document.getElementById('profileActions').style.display = 'flex';
        editBtn.style.display = 'none';
    };
}

// SLIDING POST TOGGLE
const postContainer = document.getElementById('postContainer');
document.getElementById('showDocForm')?.addEventListener('click', () => postContainer.classList.add("active-doc"));
document.getElementById('showPetForm')?.addEventListener('click', () => postContainer.classList.remove("active-doc"));

document.addEventListener('DOMContentLoaded', () => {
    setupUpload('petPhoto', 'petFileName');
    setupUpload('docFile', 'docFileName');
});

// INITIAL COUNTS
let petCount = 0;
let docCount = 0;
let rescueCount = 0;
let adoptionCount = 0;

// Update UI Counts
function updateCounters() {
    document.getElementById('count-pets').innerText = petCount;
    document.getElementById('count-docs').innerText = docCount;
    document.getElementById('count-rescued').innerText = rescueCount;
    document.getElementById('count-adoptions').innerText = adoptionCount;
}

// Function to call when NGO marks a stray as rescued
function updateRescueCount(select) {
    const card = select.closest('.manage-card');
    if (select.value === 'rescued') {
        rescueCount++;
        card.style.opacity = '0.5';
        card.style.pointerEvents = 'none';
        alert("Heroic move! Rescue count increased.");
    }
    updateCounters();
}

// TOGGLE SECTIONS
function showSection(sectionId) {
    document.querySelectorAll('.dash-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.sidebar-menu li').forEach(l => l.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// FILE NAME PREVIEW
document.getElementById('petPhoto')?.addEventListener('change', function() {
    document.getElementById('petFileName').innerText = this.files[0].name;
});

window.onload = updateCounters;


//stray logic for home
// Toggle Modal Visibility
function toggleReportModal() {
    const modal = document.getElementById('reportStrayModal');
    if (modal.style.display === "flex") {
        modal.style.display = "none";
    } else {
        modal.style.display = "flex";
    }
}

// Update file name in modal
document.getElementById('strayImgInput')?.addEventListener('change', function() {
    const name = this.files[0] ? this.files[0].name : "Upload Animal Photo";
    document.getElementById('strayImgName').innerText = name;
});

// Handle Form Submission
document.getElementById('strayReportForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // In MERN, you would use FormData here
    const reportData = {
        condition: document.getElementById('strayCondition').value,
        location: document.getElementById('strayLocation').value,
        desc: document.getElementById('strayDesc').value,
        timestamp: new Date().toLocaleString()
    };

    console.log("Report Sent to Backend:", reportData);
    
    alert("Emergency Report Sent! Nearby NGOs have been notified.");
    toggleReportModal();
});