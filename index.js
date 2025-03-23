document.addEventListener('DOMContentLoaded', function() {
    //Navigation and scroll functions

    const menuToggle = document.querySelector('.menu__toggle');
    const navLinks = document.querySelector('.nav__links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    //Navigation link smooth scrolling
    const navAnchors = document.querySelectorAll('a[href^="#"]');

    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if(this.getAttribute('href') !== '#') {
                e.preventDefault();

                //close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }


                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetId) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, //Account for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    //Back to top button
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }

        // Also update active nav link based on scroll position
        updateActiveNavLink();

    });

    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

     // Update active navigation link when scrolling
     function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if(window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        const navLinks = document.querySelectorAll('.nav__links a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
     
    //Sticky navigation on scroll
    const navbar = document.getElementById('main__nav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        if(scrollTop > 100 ){
            navbar.classList.add('scrolled');
        

        // Hide navbar when scrolling down, show when scrolling up
        if (scrollTop > lastScrollTop) {
            navbar.style.top = '-80px'; //hide navbar
        } else {
            navbar.style.top = '0'; // Show navbar
        } 
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.top = '0';
    }

    lastScrollTop = scrollTop;
    });

    //Animation function
     // Initialize animations when elements come into viewport
     function initializeAnimations() {
        const animatedElements = document.querySelectorAll('.animate__animated');
        
        // Observer options
        const options = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.2 // 20% of the element visible
        };

        // Intersection observer to trigger animations
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationClass = element.getAttribute('data-animation');
                    const delay = element.getAttribute('data-delay') || 0;
                    
                    // Set delay if specified
                    if (delay) {
                        element.style.animationDelay = delay;
                    }
                    
                    // Add animation class
                    if (animationClass) {
                        element.classList.add(animationClass);
                    }
                    
                    // Stop observing after animation is applied
                    observer.unobserve(element);
                }
            });
        }, options);
        
        // Start observing all animated elements
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Initialize animations
    initializeAnimations();
    
    // Animate hero section elements immediately
    function animateHeroSection() {
        const heroElements = document.querySelectorAll('.hero .animate__animated');
        
        heroElements.forEach(element => {
            const animationClass = element.getAttribute('data-animation');
            const delay = element.getAttribute('data-delay') || 0;
            
            // Set delay if specified
            if (delay) {
                element.style.animationDelay = delay;
            }
            
            // Add animation class
            if (animationClass) {
                element.classList.add(animationClass);
            }
        });
    }
    
    // Trigger hero animations immediately
    setTimeout(animateHeroSection, 100);

    //Trigger hero animation
    const projectCards = document.querySelectorAll('.project__card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.project__overlay');
            overlay.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.project__overlay');
            overlay.style.opacity = '0';
        });
    });

    //Contact handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Simulate form submission (in a real project, you would send this to a server)
            formStatus.innerHTML = '<div class="loading">Sending message...</div>';
            formStatus.classList.add('active');
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Success response simulation
                formStatus.innerHTML = '<div class="success">Your message has been sent successfully!</div>';
                
                // Reset form after successful submission
                contactForm.reset();
                
                // Hide status message after 3 seconds
                setTimeout(() => {
                    formStatus.classList.remove('active');
                }, 3000);
            }, 1500);
        });
    }
    
    // ========== Skill Progress Animation ==========
    
    function animateSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            const progressBar = item.querySelector('.progress');
            
            if (progressBar) {
                // Start with width 0
                progressBar.style.width = '0';
                
                // Create observer for skill items
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Animate to target width when visible
                            setTimeout(() => {
                                progressBar.style.transition = 'width 1s ease-in-out';
                                progressBar.style.width = progressBar.getAttribute('style').split(':')[1];
                            }, 300);
                            
                            observer.unobserve(item);
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(item);
            }
        });
    }

    // Initialize skill bar animations
    animateSkillBars();

    //Typed.js effect for hero section
    function createTypingEffect() {
        const element = document.querySelector('.hero h2');
        
        if (element) {
            const text = element.textContent;
            element.textContent = '';
            
            let index = 0;
            const typing = setInterval(() => {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                } else {
                    clearInterval(typing);
                }
            }, 100);
        }
    }

    // Create typing effect after hero animations
    setTimeout(createTypingEffect, 1000);

    //Theme switcher
    // Create theme switcher button
    function createThemeSwitcher() {
        const themeButton = document.createElement('button');
        themeButton.classList.add('theme-toggle');
        themeButton.innerHTML = '<i class="fas fa-moon"></i>';
        document.body.appendChild(themeButton);

        // Check if user has a theme preference stored
        const currentTheme = localStorage.getItem('theme');
        
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeButton.innerHTML = '<i class="fas fa-sun"></i>';
        }

        // Toggle theme on click
        themeButton.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                this.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                this.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }
    // Uncomment to enable theme switcher
     createThemeSwitcher();


    //Background effect
    function createDynamicBackground() {
        const hero = document.querySelector('.hero');
        
        if (hero) {
            // Create dynamic particles effect
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random properties
                const size = Math.random() * 15 + 5;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                const duration = Math.random() * 20 + 10;
                particle.style.animation = `float ${duration}s linear infinite`;
                particle.style.animationDelay = `${Math.random() * 10}s`;
                
                hero.appendChild(particle);
            }
        }
    }

    //createDynamicBackground();

    //page loading animation
    function createPageLoader() {
        const loader = document.createElement('div');
        loader.classList.add('page-loader');
        loader.innerHTML = `
            <div class="loader-content">
                <div class="spinner"></div>
                <div class="loader-text">Loading...</div>
            </div>
        `;
        
        document.body.appendChild(loader);

        // Hide loader after page is loaded
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.classList.add('loaded');
                
                // Remove loader after animation completes
                setTimeout(() => {
                    document.body.removeChild(loader);
                }, 500);
            }, 500);
        });
    }

    createPageLoader();

    
});

// Additional CSS for JS-created elements
document.head.insertAdjacentHTML('beforeend', `
    <style>
        /* Theme Toggle Button */
        .theme-toggle {
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            box-shadow: var(--shadow);
            cursor: pointer;
            z-index: 99;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            transition: var(--transition);
        }
        
         .theme-toggle:hover {
        transform: rotate(45deg);
    }
    
    /* Dark Theme Variables */
    body.dark-theme {
        --primary-color: #2ecda6;    /* Slightly brighter green for better visibility on dark backgrounds */
        --primary-dark: #0d8066;     /* Adjusted darker variant */
        --secondary-color: #39ee42;  /* Brighter secondary color for contrast */
        --dark-color: #f8fafc;       /* Inverted - light text on dark background */
        --light-color: #121212;      /* Dark background */
        --gray-color: #a1a1aa;       /* Lighter gray for better readability */
        --gray-light: #27272a;       /* Darker gray for elements */
        --success-color: #15d699;    /* Brighter success color */
        --warning-color: #fbb434;    /* Brighter warning color */
        --danger-color: #ff5a5a;     /* Brighter danger color */
    }
    
    /* Additional dark mode specific styles */
body.dark-theme {
    background-color: var(--light-color);
}

body.dark-theme #main__nav {
    background-color: rgba(18, 18, 18, 0.95);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

body.dark-theme .hero {
    background: linear-gradient(135deg, rgba(18, 18, 18, 0.9) 0%, rgba(26, 26, 26, 0.9) 100%);
}

body.dark-theme .hero::before {
    background: radial-gradient(ellipse at center, rgba(46, 205, 166, 0.05) 0%, rgba(46, 205, 166, 0) 70%);
}

body.dark-theme .about,
body.dark-theme .skills,
body.dark-theme .contact {
    background-color: var(--light-color);
}

body.dark-theme .skill__item,
body.dark-theme .project__card,
body.dark-theme .contact__info,
body.dark-theme .contact__form {
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
}

body.dark-theme .project__tags span {
    background-color: var(--gray-light);
    color: var(--gray-color);
}

body.dark-theme .form__group input,
body.dark-theme .form__group textarea {
    background-color: var(--gray-light);
    color: var(--dark-color);
    border-color: var(--border-color);
}

body.dark-theme .footer {
    background-color: #0a0a0a;
}

body.dark-theme .form__status.success {
    background-color: rgba(21, 214, 153, 0.2);
}

body.dark-theme .form__status.error {
    background-color: rgba(255, 90, 90, 0.2);
}
    
    /* Back to Top Button */
    .back-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        box-shadow: var(--shadow);
        cursor: pointer;
        z-index: 99;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        opacity: 0;
        transform: translateY(20px);
        transition: var(--transition);
    }
    
    .back-to-top.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Form Status */
    .form-status {
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 4px;
        display: none;
    }
    
    .form-status.active {
        display: block;
    }
    
    .form-status .loading {
        color: var(--gray-color);
    }
    
    .form-status .success {
        color: var(--success-color);
    }
    
    .form-status .error {
        color: var(--danger-color);
    }
    
    /* Particles */
    .particle {
        position: absolute;
        background-color: rgba(74, 108, 247, 0.1);
        border-radius: 50%;
        z-index: 0;
    }

    @keyframes float {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    /* Page Loader */
    .page-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--light-color);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    }
    
    .page-loader.loaded {
        opacity: 0;
        visibility: hidden;
    }
    
    .loader-content {
        text-align: center;
    }
    
    .spinner {
        width: 60px;
        height: 60px;
        border: 5px solid rgba(74, 108, 247, 0.2);
        border-top-color: var(--primary-color);
        border-radius: 50%;
        margin: 0 auto 1rem;
        animation: spin 1s linear infinite;
    }
    
    .loader-text {
        font-size: 1.2rem;
        color: var(--primary-color);
        font-weight: 600;
    }
    
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
        /* Mobile Navigation */
    @media (max-width: 768px) {
        .menu-toggle {
            display: block;
        }
        
        .nav__links {
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            height: 0;
            background-color: white;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            gap: 1.5rem;
            overflow: hidden;
            transition: height 0.3s ease;
            z-index: 999;
            padding: 0;
            box-shadow: var(--shadow);
            opacity: 0;
        }
        
        .nav__links.active {
            height: auto;
            padding: 2rem 0;
            opacity: 1;
        }
        
        .nav__links li {
            margin: 0;
        }
        
        .about__content {
            flex-direction: column;
        }
        
        .about__image {
            order: -1;
        }
        
        .hero__content h1 {
            font-size: 2.5rem;
        }
    }
</style>
`);