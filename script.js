document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const serviceCards = document.querySelectorAll('.service-card');
    const advantageItems = document.querySelectorAll('.advantage-item');
    const ctaButtons = document.querySelectorAll('.cta-button, .hero-cta, .cta-button-inverse');


    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    advantageItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });

    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });



    const logoElements = document.querySelectorAll('.logo-text, .logo-text-hero');
    logoElements.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 40px rgba(212, 175, 55, 0.8)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.textShadow = '0 0 20px rgba(212, 175, 55, 0.3)';
        });
    });

    const parallaxElements = document.querySelectorAll('.hero::before');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            if (element) {
                element.style.transform = `translateY(${rate}px)`;
            }
        });
    });

    const addGlowEffect = (element) => {
        element.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.6)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    };

    const serviceIcons = document.querySelectorAll('.service-icon');
    serviceIcons.forEach(addGlowEffect);

    const advantageIcons = document.querySelectorAll('.advantage-icon');
    advantageIcons.forEach(addGlowEffect);

    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .advantage-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    const addCSS = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .animate {
            animation: slideIn 0.8s ease forwards;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .service-card:hover .service-icon,
        .advantage-item:hover .advantage-icon {
            animation: pulse 0.6s ease-in-out;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;

    const style = document.createElement('style');
    style.textContent = addCSS;
    document.head.appendChild(style);

    const smoothScrollTo = (target) => {
        const targetElement = document.querySelector(target);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    const ctaMainButton = document.querySelector('.cta-button');
    if (ctaMainButton) {
        ctaMainButton.addEventListener('click', () => {
            smoothScrollTo('#contact');
        });
    }

    const heroCTA = document.querySelector('.hero-cta');
    if (heroCTA) {
        heroCTA.addEventListener('click', (e) => {
            e.preventDefault();
            calendarSection.classList.add('active');
            calendarTrigger.classList.add('active');
            
            setTimeout(() => {
                calendarSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 300);
        });
    }

    const ctaInverse = document.querySelector('.cta-button-inverse');
    if (ctaInverse) {
        ctaInverse.addEventListener('click', () => {
            smoothScrollTo('#contact');
        });
    }

    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const quickQuestions = document.querySelectorAll('.quick-question');

    const chatbotResponses = {
        tarifs: "Nos tarifs varient selon le type de véhicule et le service choisi. Pour un devis personnalisé, contactez-nous au 079.217.56.24 ou via notre formulaire en ligne. Nous proposons des tarifs préférentiels pour nos premiers clients !",
        zone: "Nous intervenons dans la région du Valais central : de Martigny à Sion. Notre entreprise est basée à Ardon. Vous pouvez choisir entre : 1) Nous venons à votre domicile, 2) Vous venez à notre entreprise à Ardon.",
        options: "Nous proposons 2 options : 1) Service à domicile : nous venons chez vous dans la zone Martigny-Sion, 2) Service en entreprise : vous venez à Ardon. Les deux options incluent le même niveau de qualité et de service.",
        duree: "La durée varie selon le service : Lavage extérieur (1-2h), Nettoyage intérieur (2-3h), Traitement céramique (3-4h), Détail complet (4-6h).",
        produits: "Nous utilisons exclusivement des produits haut de gamme, respectueux de l'environnement et de votre véhicule. Tous nos produits sont certifiés et testés.",
        rdv: "Prenez rendez-vous facilement via notre formulaire en ligne ou par téléphone au 079.217.56.24. Nous nous adaptons à votre planning !",
        offres: "En tant que nouveaux clients, bénéficiez de nos tarifs de lancement ! Demandez votre devis personnalisé et découvrez nos offres spéciales."
    };

    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.add('active');
        chatbotToggle.style.display = 'none';
    });

    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
        chatbotToggle.style.display = 'flex';
    });

    quickQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const questionType = question.getAttribute('data-question');
            const response = chatbotResponses[questionType];
            
            addUserMessage(question.textContent);
            setTimeout(() => {
                addBotMessage(response);
            }, 500);
        });
    });

    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    document.addEventListener('click', (e) => {
        if (!chatbotWindow.contains(e.target) && !chatbotToggle.contains(e.target)) {
            chatbotWindow.classList.remove('active');
            chatbotToggle.style.display = 'flex';
        }
    });

    const calendarTrigger = document.getElementById('calendarTrigger');
    const calendarSection = document.getElementById('calendarSection');
    const calendarDays = document.getElementById('calendarDays');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const timeOptions = document.querySelectorAll('.time-option');
    const confirmButton = document.getElementById('confirmBooking');
    const confirmationPopup = document.getElementById('confirmationPopup');
    const popupClose = document.getElementById('popupClose');
    const summaryDate = document.getElementById('summaryDate');
    const summaryTime = document.getElementById('summaryTime');

    let currentDate = new Date();
    let selectedDate = null;
    let selectedTime = null;

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay() + (firstDay.getDay() === 0 ? -6 : 1));
        
        const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        currentMonthElement.textContent = `${monthNames[month]} ${year}`;
        
        const currentMonth = new Date();
        const currentMonthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const maxDate = new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth(), currentMonth.getDate());
        
        const canGoBack = currentDate > currentMonthStart;
        const canGoForward = currentDate < maxDate;
        
        prevMonthBtn.disabled = !canGoBack;
        prevMonthBtn.style.opacity = canGoBack ? '1' : '0.5';
        prevMonthBtn.style.cursor = canGoBack ? 'pointer' : 'not-allowed';
        
        nextMonthBtn.disabled = !canGoForward;
        nextMonthBtn.style.opacity = canGoForward ? '1' : '0.5';
        nextMonthBtn.style.cursor = canGoForward ? 'pointer' : 'not-allowed';
        
        if (!canGoBack) {
            prevMonthBtn.title = 'Impossible de revenir avant le mois actuel';
        } else {
            prevMonthBtn.title = 'Mois précédent';
        }
        
        if (!canGoForward) {
            nextMonthBtn.title = 'Limite atteinte : maximum 1 an à l\'avance';
        } else {
            nextMonthBtn.title = 'Mois suivant';
        }
        
        calendarDays.innerHTML = '';
        
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = date.getDate();
            
            if (date.getMonth() !== month) {
                dayElement.classList.add('other-month');
            } else {
                const today = new Date();
                if (date.toDateString() === today.toDateString()) {
                    dayElement.classList.add('today');
                }
                
                if (date.getDay() !== 0) {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const isPastDate = date < today;
                    
                    if (!isPastDate) {
                        dayElement.classList.add('available');
                        dayElement.addEventListener('click', () => selectDate(date, dayElement));
                    } else {
                        dayElement.classList.add('past-date');
                        dayElement.style.opacity = '0.3';
                        dayElement.style.cursor = 'not-allowed';
                    }
                }
            }
            
            calendarDays.appendChild(dayElement);
        }
    }

    function selectDate(date, element) {
        document.querySelectorAll('.calendar-day.selected').forEach(day => day.classList.remove('selected'));
        element.classList.add('selected');
        selectedDate = date;
        
        const dateString = date.toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        addBotMessage(`📅 Date sélectionnée : ${dateString}`);
        updateConfirmButton();
    }

    timeOptions.forEach(option => {
        option.addEventListener('click', function() {
            timeOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedTime = this.getAttribute('data-time');
            
            if (selectedDate) {
                const timeString = this.textContent;
                addBotMessage(`🕐 Créneau sélectionné : ${timeString}`);
                addBotMessage(`✅ Rendez-vous pré-réservé pour le ${selectedDate.toLocaleDateString('fr-FR')} à ${timeString}. Contactez-nous au 079.217.56.24 pour confirmer !`);
                updateConfirmButton();
            } else {
                addBotMessage(`⚠️ Veuillez d'abord sélectionner une date !`);
            }
        });
    });

    prevMonthBtn.addEventListener('click', () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() - 1);
        
        const currentMonth = new Date();
        const currentMonthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        
        if (newDate >= currentMonthStart) {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        }
    });

    nextMonthBtn.addEventListener('click', () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + 1);
        
        const currentDateNow = new Date();
        const maxDate = new Date(currentDateNow.getFullYear() + 1, currentDateNow.getMonth(), currentDateNow.getDate());
        
        if (newDate <= maxDate) {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        }
    });

    function updateConfirmButton() {
        if (selectedDate && selectedTime) {
            confirmButton.disabled = false;
            confirmButton.style.cursor = 'pointer';
        } else {
            confirmButton.disabled = true;
            confirmButton.style.cursor = 'not-allowed';
        }
    }

    confirmButton.addEventListener('click', () => {
        if (selectedDate && selectedTime) {
            const dateString = selectedDate.toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            summaryDate.textContent = dateString;
            summaryTime.textContent = selectedTime;
            
            confirmationPopup.classList.add('active');
        }
    });

    popupClose.addEventListener('click', () => {
        confirmationPopup.classList.remove('active');
    });

    confirmationPopup.addEventListener('click', (e) => {
        if (e.target === confirmationPopup) {
            confirmationPopup.classList.remove('active');
        }
    });

    calendarTrigger.addEventListener('click', () => {
        const isActive = calendarSection.classList.contains('active');
        
        if (isActive) {
            calendarSection.classList.remove('active');
            calendarTrigger.classList.remove('active');
        } else {
            calendarSection.classList.add('active');
            calendarTrigger.classList.add('active');
        }
    });

    renderCalendar();

    // ===== CARROUSEL DES AVIS CLIENTS =====
    function initTestimonialsCarousel() {
        const carousel = document.getElementById('testimonialsCarousel');
        const prevBtn = document.getElementById('prevTestimonial');
        const nextBtn = document.getElementById('nextTestimonial');
        const dotsContainer = document.getElementById('carouselDots');
        
        if (!carousel) return;
        
        let currentIndex = 0;
        let autoScrollInterval;
        
        // Fonction pour créer un avis
        function createTestimonialCard(testimonial) {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            card.innerHTML = `
                <div class="testimonial-photo">
                    <img src="${testimonial.photo}" alt="Photo client" loading="lazy">
                </div>
                <div class="testimonial-content">
                    <div class="testimonial-rating">
                        ${'<i class="fas fa-star"></i>'.repeat(testimonial.rating)}
                    </div>
                    <p class="testimonial-text">"${testimonial.text}"</p>
                    <h4 class="testimonial-author">- ${testimonial.author}</h4>
                </div>
            `;
            return card;
        }
        
        // Fonction pour afficher un avis spécifique
        function showTestimonial(index) {
            // Masquer tous les avis
            const cards = carousel.querySelectorAll('.testimonial-card');
            cards.forEach(card => {
                card.classList.remove('active');
            });
            
            // Afficher l'avis actuel
            if (cards[index]) {
                cards[index].classList.add('active');
            }
            
            currentIndex = index;
            updateDots();
            updateNavigation();
        }
        
        // Créer les points de navigation
        function createDots() {
            dotsContainer.innerHTML = '';
            const totalTestimonials = carousel.querySelectorAll('.testimonial-card').length;
            
            for (let i = 0; i < totalTestimonials; i++) {
                const dot = document.createElement('div');
                dot.className = 'carousel-dot';
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }
        
        // Aller à un slide spécifique
        function goToSlide(index) {
            showTestimonial(index);
            resetAutoScroll();
        }
        
        // Mettre à jour les points actifs
        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Slide suivant
        function nextSlide() {
            const totalTestimonials = carousel.querySelectorAll('.testimonial-card').length;
            if (totalTestimonials === 0) return;
            
            const nextIndex = (currentIndex + 1) % totalTestimonials;
            showTestimonial(nextIndex);
            resetAutoScroll();
        }
        
        // Slide précédent
        function prevSlide() {
            const totalTestimonials = carousel.querySelectorAll('.testimonial-card').length;
            if (totalTestimonials === 0) return;
            
            const prevIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
            showTestimonial(prevIndex);
            resetAutoScroll();
        }
        
        // Démarrer l'auto-scroll
        function startAutoScroll() {
            const totalTestimonials = carousel.querySelectorAll('.testimonial-card').length;
            if (totalTestimonials > 1) {
                autoScrollInterval = setInterval(nextSlide, 4000);
            }
        }
        
        // Réinitialiser l'auto-scroll
        function resetAutoScroll() {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                startAutoScroll();
            }
        }
        
        // Événements des boutons
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        // Navigation au clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
        
        // Touch/swipe pour mobile
        let startX = 0;
        let endX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        });
        
        // Mettre à jour la navigation
        function updateNavigation() {
            const totalTestimonials = carousel.querySelectorAll('.testimonial-card').length;
            if (prevBtn) prevBtn.disabled = totalTestimonials === 0 || currentIndex === 0;
            if (nextBtn) nextBtn.disabled = totalTestimonials === 0 || currentIndex === totalTestimonials - 1;
        }
        
        // Observer les changements
        const observer = new MutationObserver(() => {
            const newTotal = carousel.querySelectorAll('.testimonial-card').length;
            if (newTotal > 0) {
                createDots();
                updateNavigation();
                if (newTotal > 1) {
                    startAutoScroll();
                } else {
                    if (autoScrollInterval) {
                        clearInterval(autoScrollInterval);
                    }
                }
            }
        });
        
        observer.observe(carousel, { childList: true, subtree: true });
        
        // Initialisation
        createDots();
        updateNavigation();
        
        // Afficher le premier avis au chargement s'il y en a
        const initialTestimonials = carousel.querySelectorAll('.testimonial-card');
        if (initialTestimonials.length > 0) {
            showTestimonial(0);
        }
        
        // Fonction pour ajouter un avis (à utiliser plus tard)
        window.addTestimonial = function(testimonial) {
            const card = createTestimonialCard(testimonial);
            carousel.appendChild(card);
            
            // Si c'est le premier avis, l'afficher
            if (carousel.querySelectorAll('.testimonial-card').length === 1) {
                showTestimonial(0);
            }
        };
    }

    // Initialiser le carrousel au chargement
    initTestimonialsCarousel();
});
