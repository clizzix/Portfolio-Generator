const form = document.getElementById('portfolioForm');
const portfolioOutput = document.getElementById('portfolioOutput');
const profilePictureInput = document.getElementById('profilePicture');
const addProject = document.getElementById('addProject');
const projectsContainer = document.getElementById('projects-container');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('nameInput').value;
    const profession = document.getElementById('professionInput').value;
    const bio = document.getElementById('bioInput').value;

    const file = profilePictureInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const pictureDataUrl = e.target.result;
            generateAndDisplayPortfolio(pictureDataUrl, name, profession, bio);
        };
        reader.readAsDataURL(file);
    } else {
        generateAndDisplayPortfolio('', name, profession, bio);
    }
    const projects = [];
    const projectEntries = document.querySelectorAll('.project-entry');

    projectEntries.forEach(entry => {
        const title = entry.querySelector('.projectTitle').value;
        const description = entry.querySelector('.projectDescription').value;
        const url = entry.querySelector('.projectUrl').value;

        projects.push({ title, description, url });
    });
    generateAndDisplayPortfolio(pictureDataUrl, name, profession, bio, projects);
});
addProject.addEventListener('click', function() {
    createProjectFields();
});
function createProjectFields() {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project-entry');
    projectDiv.innerHTML = `
        <h3>Projekt</h3>
        <label>Titel:</label>
        <input type="text" class=projectTitle required>
        <label>Beschreibung</label>
        <textarea class="projectDescription" rows="3" required></textarea>
        <label>Link (URL):</label>
        <input type="url" class="projectUrl" required>
        
        <hr>
    `;
    projectsContainer.appendChild(projectDiv);

}

function generateAndDisplayPortfolio(picture, name, profession, bio, projects) {
    const projectsHTML = projects.map(project =>`
        <div class="projects-card">
            <h4>${project.title}</h4>
            <p>${project.description}</p>
            <a href="${project.url}" target="_blank">Zum Projekt</a>
        </div>
    `).join('');

    const portfolioHTML = `
        <div class="portfolio-card">
            ${picture ? `<img src=${picture} alt="Profilbild" class="profile-pic">`: ''}
            <h2>${name}</h2>
            <h3>${profession}</h3>
            <p>${bio}</p>

            <hr>

            <div class="projects-section">
                <h3>Meine Projekte</h3>
                ${projectsHTML}
            </div>
        </div>


    `;

    portfolioOutput.innerHTML = portfolioHTML;
}

