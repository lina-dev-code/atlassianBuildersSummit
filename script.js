// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    initFloatingElements();
    initInteractiveElements();
    initSpeakerModals();
    initWorkshopModals();
    
});

// Smooth Scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith("#")) {  // only handle internal anchors
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}


// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all cards and sections for animation
    const elementsToAnimate = document.querySelectorAll('.day-card, .detail-item, .section');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Initialize floating elements animations
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((el, index) => {
        const xOffset = (Math.random() - 0.5) * 20; // -10 to 10
        const yOffset = (Math.random() - 0.5) * 20; // -10 to 10
        
        el.style.animation = `float ${Math.random() * 5 + 15}s ease-in-out infinite`;
        el.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        
        // Add a small delay for a staggered effect
        setTimeout(() => {
            el.style.animationPlayState = 'running';
        }, index * 500);
    });
}

// Initialize interactive elements (e.g., CTA button hover)
function initInteractiveElements() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mousemove', (e) => {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            e.target.style.setProperty('--x', `${x}px`);
            e.target.style.setProperty('--y', `${y}px`);
        });
    }
}

// Speaker Modal functionality
function initSpeakerModals() {
    const speakers = document.querySelectorAll('.speaker-card');
    const modal = document.getElementById('bioModal');
    const closeButton = document.querySelector('.close-button');
    const modalName = document.getElementById('modal-name');
    const modalPhoto = document.getElementById('modal-photo');
    const modalBio = document.getElementById('modal-bio');

    speakers.forEach(speaker => {
        speaker.addEventListener('click', () => {
            const name = speaker.querySelector('.speaker-name').textContent;
            const photoSrc = speaker.querySelector('.speaker-photo').src;
            const bioText = speaker.getAttribute('data-bio');

            modalName.textContent = name;
            modalPhoto.src = photoSrc;
            modalBio.textContent = bioText || "Bio coming soon."; // Fallback text

            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        });
    });

    // Close the modal when the close button is clicked
    closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });

    // Close the modal when clicking outside the content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });
}

// Workshop Modal functionality
function initWorkshopModals() {
    const workshops = document.querySelectorAll('.workshop-item');
    const modal = document.getElementById('workshopModal');
    const closeButton = modal.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-workshop-title');
    const modalAbstract = document.getElementById('modal-workshop-abstract');
    const modalSignupButton = document.getElementById('modal-signup-button');

    workshops.forEach(workshop => {
        workshop.addEventListener('click', () => {

            if (workshop.classList.contains('disabled')) {
                return; // do nothing if disabled
            }
            
            const title = workshop.getAttribute('data-title');
            let abstract = workshop.getAttribute('data-abstract');
            const signupLink = workshop.getAttribute('data-signup-link');

            modalTitle.textContent = title;

            // Step 1: Handle bullet points
            abstract = abstract.replace(/(\[\[BULLET\]\]\s*[^\[]*)+/g, (match) => {
                const listItems = match.split('[[BULLET]]').filter(item => item.trim() !== '');
                if (listItems.length > 0) {
                    return '<ul>' + listItems.map(item => `<li>${item.trim()}</li>`).join('') + '</ul>';
                }
                return '';
            });

            // Step 2: Handle paragraphs (after bullet points are processed)
            const formattedAbstract = '<p>' + abstract.replace(/\[\[PARAGRAPH\]\]/g, '</p><p>') + '</p>';
            modalAbstract.innerHTML = formattedAbstract;
            modalSignupButton.href = signupLink;

            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        });
    });

    closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });
}