// Samaki Express EA Ltd Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth Scrolling for Navigation Links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Basic validation
            if (name && email && subject && message) {
                // In a real application, you would send this data to a server
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Login Form Handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Basic validation
            if (username && password) {
                // In a real application, you would send this data to a server for authentication
                alert('Login successful! Welcome back to Samaki Express EA Ltd.');
                loginForm.reset();

                // Redirect to dashboard (in a real application)
                // window.location.href = 'dashboard.html';
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Add active class to navigation links based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Generate Product Cards
    const productsGrid = document.querySelector('.products-grid');
    if (productsGrid) {
        const products = [
            {
                name: "Air Compressors",
                description: "Provide essential aeration for fish ponds and tanks to maintain oxygen levels for healthy fish.",
                icon: "fas fa-wind"
            },
            {
                name: "Airhorse",
                description: "High-performance air pumps designed for large-scale aquaculture operations.",
                icon: "fas fa-horse"
            },
            {
                name: "Aquarium Glass Heater",
                description: "Maintain optimal water temperature for sensitive fish species in controlled environments.",
                icon: "fas fa-temperature-high"
            },
            {
                name: "7-in-1 Water Tester",
                description: "Comprehensive water testing device that measures pH, chlorine, hardness, and other parameters.",
                icon: "fas fa-vial"
            },
            {
                name: "Airstones",
                description: "Diffuse air from compressors into fine bubbles for efficient oxygen transfer in water.",
                icon: "fas fa-circle"
            },
            {
                name: "Ammonium Test Kit",
                description: "Monitor ammonia levels in water to prevent toxicity to fish.",
                icon: "fas fa-flask"
            },
            {
                name: "Artemia",
                description: "Live brine shrimp used as high-quality feed for larval fish and shrimp.",
                icon: "fas fa-shrimp"
            },
            {
                name: "Buffer Solution",
                description: "Maintain stable pH levels in aquaculture systems for optimal fish health.",
                icon: "fas fa-vial"
            },
            {
                name: "Dissolved Oxygen Analyzer",
                description: "Precise measurement of oxygen levels in water to ensure fish survival and growth.",
                icon: "fas fa-tint"
            },
            {
                name: "Fish Grader",
                description: "Sort fish by size for uniform growth and efficient management.",
                icon: "fas fa-ruler-combined"
            },
            {
                name: "Fishnets",
                description: "Durable nets for harvesting, handling, and transporting fish.",
                icon: "fas fa-fish"
            },
            {
                name: "Fresh Tilapia",
                description: "High-quality live or fresh tilapia fish for consumption or stocking.",
                icon: "fas fa-fish"
            },
            {
                name: "Internal Liquid Filter",
                description: "Efficient filtration systems to maintain water quality in tanks and aquariums.",
                icon: "fas fa-filter"
            },
            {
                name: "Kitchen Scale",
                description: "Accurate weighing of fish, feed, and other aquaculture materials.",
                icon: "fas fa-weight"
            },
            {
                name: "NO2 Test Kit",
                description: "Monitor nitrite levels to prevent fish poisoning in closed systems.",
                icon: "fas fa-vial"
            },
            {
                name: "Ovatide",
                description: "Hormone preparation for induced breeding of fish species.",
                icon: "fas fa-prescription-bottle"
            },
            {
                name: "Ovaprim",
                description: "Advanced spawning aid for reliable fish reproduction in hatcheries.",
                icon: "fas fa-prescription-bottle-alt"
            },
            {
                name: "pH Pen",
                description: "Portable digital device for quick and accurate pH measurements.",
                icon: "fas fa-pen"
            },
            {
                name: "Submersible Pump",
                description: "Efficient water circulation and transfer in aquaculture systems.",
                icon: "fas fa-tint"
            },
            {
                name: "Thermometer",
                description: "Monitor water temperature for optimal fish growth and health.",
                icon: "fas fa-thermometer-half"
            },
            {
                name: "Weanmix",
                description: "Specialized feed for transitioning fish from live food to formulated diets.",
                icon: "fas fa-cube"
            },
            {
                name: "Vento Airpump",
                description: "Quiet and efficient air pumps for small to medium aquaculture operations.",
                icon: "fas fa-wind"
            },
            {
                name: "Water Tester",
                description: "Comprehensive testing kits for various water quality parameters.",
                icon: "fas fa-vial"
            },
            {
                name: "Zero Oxygen",
                description: "Products for creating anaerobic conditions when needed for specific processes.",
                icon: "fas fa-ban"
            }
        ];

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <h3><i class="${product.icon}"></i> ${product.name}</h3>
                <p>${product.description}</p>
            `;
            productsGrid.appendChild(productCard);
        });
    }

    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.product-card, .feature-card, .team-member, .testimonial-card');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animation
    const animatedElements = document.querySelectorAll('.product-card, .feature-card, .team-member');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on page load
    animateOnScroll();
});