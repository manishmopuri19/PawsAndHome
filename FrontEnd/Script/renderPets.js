export const renderPets = (containerId, limit = null, fetchedData = []) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const data = limit ? fetchedData.slice(0, limit) : fetchedData;
    
    container.innerHTML = data.map(pet => `
        <div class="pet-card" 
             data-name="${pet.name || ''}" 
             data-species="${pet.species || ''}" 
             data-age="${pet.age || ''}" 
             data-gender="${pet.gender || ''}">
            <img src="${pet.images}" alt="${pet.name}">
            <div class="pet-info">
                <h3>${pet.name}</h3>
                <p>${pet.breed} • ${pet.age}</p>
                <button class="adopt-btn btn-primary card-btn" data-id="${pet.petId || pet._id}">Adopt Me</button>
            </div>
        </div>
    `).join('');
};
export const  renderFullDocs=(containerId,limit=null,fetchedData=[])=> {
    const container = document.getElementById(containerId);
    if (!container) return;
    const docsData = limit ? fetchedData.slice(0, limit) : fetchedData;
    container.innerHTML = docsData.map(doc => `
        <div class="doc-item-card">
            <div class="doc-cover">
                <img src="${doc.image}" alt="${doc.title}">
                <div class="doc-type-badge"><i class="fas ${doc.icon}"></i></div>
            </div>
            <div class="doc-body">
                <h3>${doc.title}</h3>
                <p>${doc.description}</p>
               <a href="${doc.document}" target="_blank" class="btn-doc" style="text-decoration: none; display: inline-block;">
                View Document
            </a>
            </div>
        </div>
    `).join('');
}


// 3. Render Adoptions
export const renderUserAdoptions=(containerId,limit=null,fetchedData=[])=> {
    const grid = document.getElementById(containerId);
    if (!grid) return;

     const  userAdoptions= limit ? fetchedData.slice(0, limit) : fetchedData;

    if (userAdoptions.length === 0) {
        grid.innerHTML = `<div class="empty-state"><i class="fas fa-heart-broken"></i><p>You haven't adopted any pets yet.</p></div>`;
    } else {
        
        grid.innerHTML = userAdoptions.map(pet => `
            <div class="manage-card">
                <img src="${pet.img}">
                <div class="manage-info">
                    <h3>${pet.name}</h3>
                    <span class="status-badge">Adopted</span>
                </div>
            </div>
        `).join('');
    }
}

//user posted pets
export const renderUserPosts = (containerId,limit=null, userPets = []) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (userPets.length === 0) {
        container.innerHTML = `<p class="no-posts">You haven't posted any pets yet.</p>`;
        return;
    }

    container.innerHTML = userPets.map(pet => {
        const petId = pet.petId || pet._id;
        return `
       <div class="pet-card" id="pet-${petId}">
            <img src="${pet.images}" alt="${pet.name}">
            
            <span class="status-badge status-${status}">${pet.status || 'Active'}</span>
            
            <h3>${pet.name}</h3>
            <p>${pet.breed} • ${pet.age}</p>
            
            <div class="dashboard-actions" style="margin-top: auto; padding-top: 15px;">
                <button class="edit-btn" onclick="openEditModal('${petId}')">Edit</button>
                <button class="delete-btn" onclick="confirmDelete('${petId}')">Remove</button>
            </div>
        </div>
    `}).join('');
};


export const  renderUserpostedDoc=(containerId,limit=null,fetchedData=[])=> {
    const container = document.getElementById(containerId);
    if (!container) return;
    const docsData = limit ? fetchedData.slice(0, limit) : fetchedData;
    container.innerHTML = docsData.map(doc => `
        <div class="doc-item-card">
            <div class="doc-cover">
                <img src="${doc.image}" alt="${doc.title}">
                <div class="doc-type-badge"><i class="fas ${doc.icon}"></i></div>
            </div>
            <div class="doc-body">
                <h3>${doc.title}</h3>
                <p>${doc.description}</p>
               <a href="${doc.document}" target="_blank" class="btn-doc" style="text-decoration: none; display: inline-block;">
                View Document
            </a>
             
            </div>
        </div>
    `).join('');
}
