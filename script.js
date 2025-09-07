const form = document.getElementById('portfolioForm');
const portfolioOutput = document.getElementById('portfolioOutput');
const profilePictureInput = document.getElementById('profilePicture');

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
});

function generateAndDisplayPortfolio(picture, name, profession, bio) {
    const portfolioHTML = `
        <div class="portfolio-card">
            ${picture ? `<img src=${picture} alt="Profilbild" class="profile-pic">`: ''}
            <h2>${name}</h2>
            <h3>${profession}</h3>
            <p>${bio}</p>
        </div>
    `;

    portfolioOutput.innerHTML = portfolioHTML;
}

