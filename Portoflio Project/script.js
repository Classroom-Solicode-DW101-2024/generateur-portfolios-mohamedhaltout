class Apprenant {
    constructor(nom, prenom, email, telephone, groupe) {
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.telephone = telephone;
        this.groupe = groupe;
        this.projets = [];
    }

    ajouterProjet(projet) {
        this.projets.push(projet);
    }
}

class Projet {
    constructor(intitule, lienGitHub, competences, date) {
        this.intitule = intitule;
        this.lienGitHub = lienGitHub;
        this.competences = competences;
        this.date = date;
    }
}

document.getElementById('apprenantForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let nom = document.getElementById('nom').value.trim();
    let prenom = document.getElementById('prenom').value.trim();
    let email = document.getElementById('email').value.trim();
    let telephone = document.getElementById('telephone').value.trim();
    let groupe = document.getElementById('groupe').value;

    let existingData = JSON.parse(localStorage.getItem('apprenants')) || [];

    let isDuplicateName = existingData.some(apprenant => apprenant.nom === nom);

    if (isDuplicateName) {
        alert('A student with this name is already registered.');
        return;
    }

    let emailValid = email.includes('@') && email.includes('.') && email.indexOf('@') < email.lastIndexOf('.');
    if (!emailValid) {
        alert('Please enter a valid email address.');
        return;
    }

    let phoneValid = telephone.length === 10 && /^\d+$/.test(telephone);
    if (!phoneValid) {
        alert('Please enter a valid telephone number (10 digits).');
        return;
    }

    let apprenant = new Apprenant(nom, prenom, email, telephone, groupe);
    existingData.push(apprenant);
    localStorage.setItem('apprenants', JSON.stringify(existingData));

    console.log("Apprenant stored:", apprenant);
    window.location.href = 'projects.html';
});

function ajouterProjet() {
    let apprenants = JSON.parse(localStorage.getItem('apprenants')) || [];
    if (apprenants.length === 0) {
        alert("No apprenant found. Please register an apprenant first.");
        return;
    }

    let apprenant = apprenants[apprenants.length - 1];

    let competences = document.getElementById('competences').value.split(',');

    let projet = new Projet(
        document.getElementById('intitule').value,
        document.getElementById('lienGitHub').value,
        competences,
        document.getElementById('date').value
    );

    apprenant.projets.push(projet);

    apprenants[apprenants.length - 1] = apprenant;
    localStorage.setItem('apprenants', JSON.stringify(apprenants));

    afficherProjet(projet);
}

function afficherProjet(projet) {
    let projetsList = document.getElementById('projetsList');
    let projetCard = document.createElement('div');
    projetCard.className = 'projet-card';
    projetCard.innerHTML = `
        <h3>${projet.intitule}</h3>
        <a href="${projet.lienGitHub}" target="_blank">Lien GitHub</a>
        <p>Compétences: ${projet.competences.join(', ')}</p>
        <p>Date: ${projet.date}</p>
    `;
    projetsList.appendChild(projetCard);
}

function terminer() {
    window.location.href = 'portfolio.html';
}
