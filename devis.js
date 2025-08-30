// ===== SYSTÈME DE DEVIS A&D PRESTIGE WASH =====

// Configuration EmailJS
(function() {
    emailjs.init("wMsVr44hEUK6ju_rs"); // À remplacer par votre User ID EmailJS
})();

// Variables globales
let selectedVehicle = null;
let selectedServices = [];
let basePrices = {
    citadine: {
        lavage_exterieur: 40,
        nettoyage_interieur: 40,
        traitement_ceramique: 40,
        detail_complet: 20
    },
    berline: {
        lavage_exterieur: 45,
        nettoyage_interieur: 45,
        traitement_ceramique: 45,
        detail_complet: 25
    },
    suv: {
        lavage_exterieur: 55,
        nettoyage_interieur: 55,
        traitement_ceramique: 55,
        detail_complet: 30
    }
};

// Supplément pour services additionnels si nettoyage de base inclus
const supplementPrice = 10;

// Éléments DOM
const devisForm = document.getElementById('devisForm');
const vehicleOptions = document.querySelectorAll('input[name="vehicule"]');
const serviceOptions = document.querySelectorAll('input[name="services"]');
const locationOptions = document.querySelectorAll('input[name="lieu"]');
const adresseGroup = document.getElementById('adresseGroup');
const adresseField = document.getElementById('adresse');
const servicesList = document.getElementById('servicesList');
const totalPrice = document.getElementById('totalPrice');
const submitBtn = document.getElementById('submitBtn');
const successModal = document.getElementById('successModal');
const modalClose = document.getElementById('modalClose');

// ===== GESTION DU TYPE DE VÉHICULE =====
vehicleOptions.forEach(option => {
    option.addEventListener('change', function() {
        selectedVehicle = this.value;
        updatePrices();
        updateServicesList();
        calculateTotal();
    });
});

// ===== GESTION DES SERVICES =====
serviceOptions.forEach(option => {
    option.addEventListener('change', function() {
        if (this.checked) {
            selectedServices.push(this.value);
        } else {
            selectedServices = selectedServices.filter(service => service !== this.value);
        }
        updateServicesList();
        calculateTotal();
    });
});

// ===== GESTION DU LIEU =====
locationOptions.forEach(option => {
    option.addEventListener('change', function() {
        if (this.value === 'domicile') {
            adresseGroup.style.display = 'block';
            adresseField.required = true;
        } else {
            adresseGroup.style.display = 'none';
            adresseField.required = false;
            adresseField.value = '';
        }
    });
});

// ===== MISE À JOUR DES PRIX =====
function updatePrices() {
    if (!selectedVehicle || selectedVehicle === 'utilitaire') return;
    
    const prices = basePrices[selectedVehicle];
    
    serviceOptions.forEach(option => {
        const priceElement = option.parentElement.querySelector('.service-price');
        const serviceValue = option.value;
        
        if (prices[serviceValue]) {
            priceElement.textContent = `${prices[serviceValue]}.- CHF`;
        }
    });
}

// ===== MISE À JOUR DE LA LISTE DES SERVICES =====
function updateServicesList() {
    if (selectedServices.length === 0) {
        servicesList.textContent = 'Aucun service sélectionné';
        return;
    }
    
    const serviceNames = {
        lavage_exterieur: 'Lavage extérieur haut de gamme',
        nettoyage_interieur: 'Nettoyage intérieur complet',
        traitement_ceramique: 'Traitement céramique & protections',
        detail_complet: 'Détail complet (jantes, sièges, vitres...)'
    };
    
    const selectedServiceNames = selectedServices.map(service => serviceNames[service]);
    servicesList.textContent = selectedServiceNames.join(', ');
}

// ===== CALCUL DU PRIX TOTAL =====
function calculateTotal() {
    if (!selectedVehicle || selectedVehicle === 'utilitaire') {
        totalPrice.textContent = 'Sur devis';
        return;
    }
    
    if (selectedServices.length === 0) {
        totalPrice.textContent = '0.- CHF';
        return;
    }
    
    const prices = basePrices[selectedVehicle];
    let total = 0;
    
    // Vérifier si un service de nettoyage de base est sélectionné
    const hasBaseService = selectedServices.includes('lavage_exterieur') || 
                          selectedServices.includes('nettoyage_interieur');
    
    selectedServices.forEach(service => {
        if (prices[service]) {
            if (hasBaseService && (service === 'traitement_ceramique' || service === 'detail_complet')) {
                // Appliquer le supplément
                total += supplementPrice;
            } else {
                // Prix normal
                total += prices[service];
            }
        }
    });
    
    totalPrice.textContent = `${total}.- CHF`;
}

// ===== VALIDATION DU FORMULAIRE =====
function validateForm() {
    const requiredFields = devisForm.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });
    
    // Validation spéciale pour l'adresse si service à domicile
    if (document.querySelector('input[name="lieu"]:checked')?.value === 'domicile') {
        if (!adresseField.value.trim()) {
            isValid = false;
            adresseField.classList.add('error');
        }
    }
    
    // Validation du type de véhicule
    if (!selectedVehicle) {
        isValid = false;
        document.querySelector('.vehicle-options').classList.add('error');
    }
    
    // Validation des services
    if (selectedServices.length === 0) {
        isValid = false;
        document.querySelector('.services-grid').classList.add('error');
    }
    
    return isValid;
}

// ===== ENVOI DU FORMULAIRE =====
devisForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        showNotification('Veuillez remplir tous les champs obligatoires', 'error');
        return;
    }
    
    // Désactiver le bouton pendant l'envoi
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    
    try {
        // Préparer les données du formulaire
        const formData = {
            nom: document.getElementById('nom').value,
            telephone: document.getElementById('telephone').value,
            email: document.getElementById('email').value,
            vehicule: selectedVehicle,
            services: selectedServices.join(', '),
            lieu: document.querySelector('input[name="lieu"]:checked').value,
            adresse: adresseField.value || 'Non applicable',
            disponibilites: document.getElementById('disponibilites').value,
            remarques: document.getElementById('remarques').value,
            prix_estime: totalPrice.textContent,
            date_demande: new Date().toLocaleDateString('fr-FR')
        };
        
        // Envoyer par EmailJS
        const response = await emailjs.send(
            'service_k9bvnje',
            'template_3gpxz6m',
            {
                to_email: 'prestigewash.contact@gmail.com',
                from_name: formData.nom,
                from_phone: formData.telephone,
                from_email: formData.email,
                vehicle_type: getVehicleDisplayName(formData.vehicule),
                selected_services: formData.services,
                location: getLocationDisplayName(formData.lieu),
                address: formData.adresse,
                availability: formData.disponibilites,
                notes: formData.remarques,
                estimated_price: formData.prix_estime,
                request_date: formData.date_demande
            }
        );
        
        if (response.status === 200) {
            showSuccessModal();
            devisForm.reset();
            selectedVehicle = null;
            selectedServices = [];
            updateServicesList();
            calculateTotal();
            adresseGroup.style.display = 'none';
        } else {
            throw new Error('Erreur lors de l\'envoi');
        }
        
    } catch (error) {
        console.error('Erreur:', error);
        showNotification('Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement.', 'error');
    } finally {
        // Réactiver le bouton
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer ma demande de devis';
    }
});

// ===== FONCTIONS UTILITAIRES =====
function getVehicleDisplayName(vehicle) {
    const names = {
        citadine: 'Citadine',
        berline: 'Berline',
        suv: 'SUV / 4x4',
        utilitaire: 'Utilitaire'
    };
    return names[vehicle] || vehicle;
}

function getLocationDisplayName(location) {
    const names = {
        sur_place: 'Sur place chez A&D Prestige Wash (Ardon)',
        domicile: 'Service à domicile'
    };
    return names[location] || location;
}

function formatEmailMessage(formData) {
    return `
NOUVELLE DEMANDE DE DEVIS

👤 INFORMATIONS PERSONNELLES
Nom et prénom: ${formData.nom}
Téléphone: ${formData.telephone}
Email: ${formData.email}

🚘 VÉHICULE
Type: ${getVehicleDisplayName(formData.vehicule)}

🧽 SERVICES SOUHAITÉS
${formData.services}

📍 LIEU
${getLocationDisplayName(formData.lieu)}
${formData.adresse !== 'Non applicable' ? `Adresse: ${formData.adresse}` : ''}

🗓️ DISPONIBILITÉS
${formData.disponibilites}

💰 PRIX ESTIMÉ
${formData.prix_estime}

💬 REMARQUES
${formData.remarques || 'Aucune remarque'}

📅 DATE DE LA DEMANDE
${formData.date_demande}

---
Ce devis a été généré automatiquement depuis votre site web.
Prix indicatif - Le devis final sera établi après inspection du véhicule.
    `.trim();
}

// ===== GESTION DE LA MODALE DE SUCCÈS =====
function showSuccessModal() {
    successModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

modalClose.addEventListener('click', function() {
    successModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Fermer la modale en cliquant à l'extérieur
window.addEventListener('click', function(e) {
    if (e.target === successModal) {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    // Créer une notification temporaire
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Afficher la notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Masquer et supprimer après 5 secondes
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les prix
    updatePrices();
    
    // Ajouter des classes CSS pour les animations
    document.querySelectorAll('.form-section').forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });
});

// ===== GESTION DES ERREURS DE VALIDATION =====
document.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            this.classList.remove('error');
        }
    });
    
    field.addEventListener('blur', function() {
        if (this.required && !this.value.trim()) {
            this.classList.add('error');
        }
    });
});

// ===== RESPONSIVE ET ACCESSIBILITÉ =====
// Gestion du focus pour l'accessibilité
document.querySelectorAll('.vehicle-option, .service-option, .location-option').forEach(option => {
    option.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const input = this.querySelector('input');
            if (input.type === 'checkbox') {
                input.checked = !input.checked;
            } else {
                input.checked = true;
            }
            input.dispatchEvent(new Event('change'));
        }
    });
});

// Amélioration de l'expérience mobile
if ('ontouchstart' in window) {
    document.querySelectorAll('.vehicle-option, .service-option, .location-option').forEach(option => {
        option.style.cursor = 'pointer';
    });
}
