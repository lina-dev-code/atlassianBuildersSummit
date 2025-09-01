// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    initFloatingElements();
    initInteractiveElements();
    initSpeakerModals();
    
});

// Smooth Scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
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
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Dynamic floating elements system
function initFloatingElements() {
    const floatingContainer = document.querySelector('.floating-elements');
    
    if (!floatingContainer) return;

    function createFloatingElement() {
        const element = document.createElement('div');
        element.className = 'floating-element';
        
        // Random positioning
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 6 + 's';
        
        // Random colors from brand palette
        const colors = [
            'rgba(130,181,53,0.1)',
            'rgba(191,99,243,0.1)', 
            'rgba(255,189,89,0.1)',
            'rgba(24,104,219,0.1)'
        ];
        element.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        floatingContainer.appendChild(element);

        // Remove after animation completes
        setTimeout(() => {
            if (element.parentNode) {
                element.remove();
            }
        }, 6000);
    }

    // Create initial floating elements
    for (let i = 0; i < 3; i++) {
        setTimeout(createFloatingElement, i * 1000);
    }

    // Continue creating floating elements periodically
    setInterval(createFloatingElement, 2000);
}

// Interactive elements and enhanced UX
function initInteractiveElements() {
    
    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.day-card, .detail-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // CTA button enhanced interactions
    const ctaButtons = document.querySelectorAll('.cta-button, .hero-cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (this.classList.contains('pulse')) {
                this.style.animation = 'none';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (this.classList.contains('pulse')) {
                this.style.animation = 'pulse 2s infinite';
            }
        });
    });

    // Logo interaction (if logo exists)
    const logo = document.querySelector('.event-logo');
    
    if (logo) {
        logo.addEventListener('click', function() {
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Add cursor pointer to logo
        logo.style.cursor = 'pointer';
        
        // Logo hover effect
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// Utility function to add ripple effect to buttons
function addRippleEffect(element) {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.height, rect.width);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Add ripple effects to interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.cta-button, .day-card, .detail-item');
    buttons.forEach(addRippleEffect);
});

// Scroll-based header effects
function initScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add class for styling when scrolled
        if (scrollTop > 100) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });
}

// Initialize scroll effects
document.addEventListener('DOMContentLoaded', initScrollEffects);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Error handling for missing elements
function safeQuerySelector(selector, callback) {
    const element = document.querySelector(selector);
    if (element && typeof callback === 'function') {
        callback(element);
    }
}

// Console welcome message
console.log('%c🚀 Atlassian Builders Summit 2024 🚀', 'color: #1868db; font-size: 20px; font-weight: bold;');
console.log('%cBuild Better Together!', 'color: #82b535; font-size: 16px;');

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