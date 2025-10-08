// Samaki Express EA Ltd Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // API Base URL
    const API_BASE = 'api/';

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

    // Enhanced Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            showLoading('Sending your message...');

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            fetch(API_BASE + 'contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData)
            })
            .then(response => response.json())
            .then(data => {
                hideLoading();
                if (data.success) {
                    showSuccessMessage('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                } else {
                    showErrorMessage('Failed to send message: ' + data.message);
                }
            })
            .catch(error => {
                hideLoading();
                console.error('Error:', error);
                showErrorMessage('Failed to send message. Please try again.');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // Enhanced Login Form Handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = loginForm.querySelector('.auth-btn');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Signing In...';
            submitBtn.disabled = true;

            showLoading('Signing you in...');

            const formData = {
                email: document.getElementById('signinEmail').value,
                password: document.getElementById('signinPassword').value
            };

            fetch(API_BASE + 'login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData)
            })
            .then(response => response.json())
            .then(data => {
                hideLoading();

                if (data.success) {
                    showSuccessMessage(`✅ Welcome back, ${data.user.name}!<br>Redirecting to your dashboard...`);

                    loginForm.reset();

                    // Redirect after success message
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 2000);

                } else {
                    showErrorMessage('Login Failed: ' + data.message);
                }
            })
            .catch(error => {
                hideLoading();
                console.error('Error:', error);
                showErrorMessage('Login failed. Please try again.');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
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

    // LOAD PRODUCTS IMMEDIATELY - This will ensure products show up
    loadProductsImmediately();

    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.product-card, .feature-card, .team-member');

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

    // Combined Sign In/Sign Up Form Handling
    const signinToggle = document.getElementById('signinToggle');
    const signupToggle = document.getElementById('signupToggle');
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');
    const toggleText = document.getElementById('toggleText');
    const toggleLink = document.getElementById('toggleLink');

    if (signinToggle && signupToggle) {
        // Switch to Sign Up form
        signupToggle.addEventListener('click', function(e) {
            e.preventDefault();
            signinToggle.classList.remove('active');
            signupToggle.classList.add('active');
            signinForm.classList.remove('active');
            signupForm.classList.add('active');
            toggleText.innerHTML = 'Already have an account? <a href="#" id="toggleLink">Sign in here</a>';
            updateToggleLink();
        });

        // Switch to Sign In form
        signinToggle.addEventListener('click', function(e) {
            e.preventDefault();
            signupToggle.classList.remove('active');
            signinToggle.classList.add('active');
            signupForm.classList.remove('active');
            signinForm.classList.add('active');
            toggleText.innerHTML = 'Don\'t have an account? <a href="#" id="toggleLink">Create one here</a>';
            updateToggleLink();
        });

        // Update toggle link event listener
        function updateToggleLink() {
            const newToggleLink = document.getElementById('toggleLink');
            if (newToggleLink) {
                newToggleLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (signinForm.classList.contains('active')) {
                        signupToggle.click();
                    } else {
                        signinToggle.click();
                    }
                });
            }
        }

        // Initialize toggle link
        updateToggleLink();
    }

    // Enhanced Sign Up Form Handling with Better UX
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = signupForm.querySelector('.auth-btn');
            const originalText = submitBtn.textContent;

            // Show loading state
            submitBtn.textContent = 'Creating Account...';
            submitBtn.disabled = true;

            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('signupEmail').value,
                phone: document.getElementById('phone').value,
                password: document.getElementById('signupPassword').value,
                userType: document.getElementById('userType').value
            };

            // Show loading animation
            showLoading('Creating your account...');

            // Send to backend
            fetch(API_BASE + 'register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData)
            })
            .then(response => response.json())
            .then(data => {
                hideLoading();

                if (data.success) {
                    // Show success message
                    showSuccessMessage('🎉 Account Created Successfully!<br>You can now login with your credentials.');

                    // Reset form
                    signupForm.reset();

                    // Switch to login form after delay
                    setTimeout(() => {
                        if (signinToggle) {
                            signinToggle.click();
                        }

                        // Pre-fill the email for convenience
                        document.getElementById('signinEmail').value = formData.email;

                    }, 2000);

                } else {
                    showErrorMessage('Registration Failed: ' + data.message);
                }
            })
            .catch(error => {
                hideLoading();
                console.error('Error:', error);
                showErrorMessage('Registration failed. Please check your connection and try again.');
            })
            .finally(() => {
                // Restore button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });

        // Real-time password confirmation validation
        const passwordInput = document.getElementById('signupPassword');
        const confirmPasswordInput = document.getElementById('confirmPassword');

        function validatePasswordMatch() {
            if (passwordInput.value && confirmPasswordInput.value) {
                if (passwordInput.value !== confirmPasswordInput.value) {
                    confirmPasswordInput.classList.add('password-invalid');
                    confirmPasswordInput.classList.remove('password-valid');
                } else {
                    confirmPasswordInput.classList.add('password-valid');
                    confirmPasswordInput.classList.remove('password-invalid');
                }
            } else {
                confirmPasswordInput.classList.remove('password-valid', 'password-invalid');
            }
        }

        passwordInput.addEventListener('input', validatePasswordMatch);
        confirmPasswordInput.addEventListener('input', validatePasswordMatch);

        // Password strength indicator
        passwordInput.addEventListener('input', function() {
            if (this.value.length > 0 && this.value.length < 6) {
                this.classList.add('password-invalid');
                this.classList.remove('password-valid');
            } else if (this.value.length >= 6) {
                this.classList.add('password-valid');
                this.classList.remove('password-invalid');
            } else {
                this.classList.remove('password-valid', 'password-invalid');
            }
        });
    }
});

// NEW FUNCTION: Load products immediately without API dependency
function loadProductsImmediately() {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) {
        console.error('Products grid not found!');
        return;
    }

    console.log('Loading products immediately...');

    const products = [
        {
            name: "Air Compressors",
            description: "Provide essential aeration for fish ponds and tanks to maintain oxygen levels for healthy fish.",
            price: 18500,
            currency: "KES",
            stock_status: "available",
            icon: "fas fa-wind"
        },
        {
            name: "Airhorse",
            description: "High-performance air pumps designed for large-scale aquaculture operations.",
            price: 32500,
            currency: "KES",
            stock_status: "available",
            icon: "fas fa-horse"
        },
        {
            name: "Aquarium Glass Heater",
            description: "Maintain optimal water temperature for sensitive fish species in controlled environments.",
            price: 4500,
            currency: "KES",
            stock_status: "low",
            icon: "fas fa-temperature-high"
        },
        {
            name: "7-in-1 Water Tester",
            description: "Comprehensive water testing device that measures pH, chlorine, hardness, and other parameters.",
            price: 8900,
            currency: "KES",
            stock_status: "available",
            icon: "fas fa-vial"
        },
        {
            name: "Airstones",
            description: "Diffuse air from compressors into fine bubbles for efficient oxygen transfer in water.",
            price: 1200,
            currency: "KES",
            stock_status: "available",
            icon: "fas fa-circle"
        },
        {
            name: "Ammonium Test Kit",
            description: "Monitor ammonia levels in water to prevent toxicity to fish.",
            price: 3500,
            currency: "KES",
            stock_status: "available",
            icon: "fas fa-flask"
        },
        {
            name: "Artemia",
            description: "Live brine shrimp used as high-quality feed for larval fish and shrimp.",
            price: 2800,
            currency: "KES",
            stock_status: "out",
            icon: "fas fa-shrimp"
        },
        {
            name: "Buffer Solution",
            description: "Maintain stable pH levels in aquaculture systems for optimal fish health.",
            price: 2200,
            currency: "KES",
            stock_status: "available",
            icon: "fas fa-vial"
        },
        {
            name: "Dissolved Oxygen Analyzer",
            description: "Precise measurement of oxygen levels in water to ensure fish survival and growth.",
            price: 45600,
            currency: "KES",
            stock_status: "available",
            icon: "fas fa-tint"
        },
        {
            name: "Fish Grader",
            description: "Sort fish by size for uniform growth and efficient management.",
            price: 18500,
            currency: "KES",
            stock_status: "low",
            icon: "fas fa-ruler-combined"
        },
        {
            name: "Fishnets",
            description: "Durable nets for harvesting, handling, and transporting fish.",
            price: 4500,
            currency: "KES",
            stock_status: "available",
            icon: "fas fa-fish"
        },
        {
            name: "Fresh Tilapia",
            description: "High-quality live or fresh tilapia fish for consumption or stocking.",
            price: 650,
            currency: "KES",
            stock_status: "available",
            icon: "fas fa-fish"
        },
        {
            name: "Internal Liquid Filter",
            description: "Efficient filtration systems to maintain water quality in tanks and aquariums.",
            price: 7800,
            currency: "KES",
            stock_status: "available",
            icon: "fas fa-filter"
        },
        {
            name: "Kitchen Scale",
            description: "Accurate weighing of fish, feed, and other aquaculture materials.",
            price: 3200,
            currency: "KES",
            stock_status: "available",
            icon: "fas fa-weight"
        },
        {
            name: "NO2 Test Kit",
            description: "Monitor nitrite levels to prevent fish poisoning in closed systems.",
            price: 2800,
            currency: "KES",
            stock_status: "available",
            icon: "fas fa-vial"
        },
        {
            name: "Ovatide",
            description: "Hormone preparation for induced breeding of fish species.",
            price: 15000,
            currency: "KES",
            stock_status: "low",
            icon: "fas fa-prescription-bottle"
        },
        {
            name: "Ovaprim",
            description: "Advanced spawning aid for reliable fish reproduction in hatcheries.",
            price: 22000,
            currency: "KES",
            stock_status: "available",
            icon: "fas fa-prescription-bottle-alt"
        },
        {
            name: "pH Pen",
            description: "Portable digital device for quick and accurate pH measurements.",
            price: 5600,
            currency: "KES",
            stock_status: "available",
            icon: "fas fa-pen"
        },
        {
            name: "Submersible Pump",
            description: "Efficient water circulation and transfer in aquaculture systems.",
            price: 12500,
            currency: "KES",
            stock_status: "available",
            icon: "fas fa-tint"
        },
        {
            name: "Thermometer",
            description: "Monitor water temperature for optimal fish growth and health.",
            price: 1800,
            currency: "KES",
            stock_status: "available",
            icon: "fas fa-thermometer-half"
        },
        {
            name: "Weanmix",
            description: "Specialized feed for transitioning fish from live food to formulated diets.",
            price: 4500,
            currency: "KES",
            stock_status: "available",
            icon: "fas fa-cube"
        },
        {
            name: "Vento Airpump",
            description: "Quiet and efficient air pumps for small to medium aquaculture operations.",
            price: 9800,
            currency: "KES",
            stock_status: "available",
            icon: "fas fa-wind"
        },
        {
            name: "Water Tester",
            description: "Comprehensive testing kits for various water quality parameters.",
            price: 6700,
            currency: "KES",
            stock_status: "available",
            icon: "fas fa-vial"
        },
        {
            name: "Zero Oxygen",
            description: "Products for creating anaerobic conditions when needed for specific processes.",
            price: 8900,
            currency: "KES",
            stock_status: "low",
            icon: "fas fa-ban"
        }
    ];

    displayProducts(products);
}

// Notification System
function showNotification(message, type = 'info', duration = 5000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-icon">
            ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
        </div>
        <div class="notification-content">${message}</div>
        <button class="notification-close">&times;</button>
    `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto remove
    const autoRemove = setTimeout(() => {
        hideNotification(notification);
    }, duration);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoRemove);
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function showSuccessMessage(message) {
    showNotification(message, 'success', 5000);
}

function showErrorMessage(message) {
    showNotification(message, 'error', 7000);
}

function showLoading(message = 'Please wait...') {
    let overlay = document.getElementById('loadingOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'loadingOverlay';
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    setTimeout(() => overlay.classList.add('show'), 100);
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.remove('show');
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);
    }
}

// Order Modal Functionality
function openOrderModal(productName, productPrice) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('quickOrderModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'quickOrderModal';
        modal.className = 'quick-order-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Quick Order - ${productName}</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="quantity-selector">
                    <button class="quantity-btn" id="decreaseQty">-</button>
                    <input type="number" class="quantity-input" id="quantity" value="1" min="1" max="100">
                    <button class="quantity-btn" id="increaseQty">+</button>
                </div>
                <div class="order-summary">
                    <div class="summary-row">
                        <span>Unit Price:</span>
                        <span id="unitPrice">KES ${parseInt(productPrice).toLocaleString()}</span>
                    </div>
                    <div class="summary-row">
                        <span>Quantity:</span>
                        <span id="displayQty">1</span>
                    </div>
                    <div class="summary-row summary-total">
                        <span>Total:</span>
                        <span id="totalPrice">KES ${parseInt(productPrice).toLocaleString()}</span>
                    </div>
                </div>
                <button class="confirm-order-btn">Confirm Order</button>
            </div>
        `;
        document.body.appendChild(modal);

        // Modal event listeners
        const closeModal = modal.querySelector('.close-modal');
        const decreaseBtn = modal.querySelector('#decreaseQty');
        const increaseBtn = modal.querySelector('#increaseQty');
        const quantityInput = modal.querySelector('#quantity');
        const confirmBtn = modal.querySelector('.confirm-order-btn');

        closeModal.addEventListener('click', closeOrderModal);

        decreaseBtn.addEventListener('click', function() {
            let qty = parseInt(quantityInput.value);
            if (qty > 1) {
                quantityInput.value = qty - 1;
                updateOrderSummary(productPrice);
            }
        });

        increaseBtn.addEventListener('click', function() {
            let qty = parseInt(quantityInput.value);
            if (qty < 100) {
                quantityInput.value = qty + 1;
                updateOrderSummary(productPrice);
            }
        });

        quantityInput.addEventListener('input', function() {
            let qty = parseInt(this.value);
            if (qty < 1) this.value = 1;
            if (qty > 100) this.value = 100;
            updateOrderSummary(productPrice);
        });

        confirmBtn.addEventListener('click', function() {
            const quantity = parseInt(quantityInput.value);
            const total = quantity * parseInt(productPrice);
            showSuccessMessage(`Order confirmed!<br>Product: ${productName}<br>Quantity: ${quantity}<br>Total: KES ${total.toLocaleString()}<br><br>Our team will contact you shortly.`);
            closeOrderModal();
        });

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeOrderModal();
            }
        });
    } else {
        // Update modal content for new product
        modal.querySelector('h3').textContent = `Quick Order - ${productName}`;
        modal.querySelector('#unitPrice').textContent = `KES ${parseInt(productPrice).toLocaleString()}`;
        modal.querySelector('#quantity').value = '1';
        updateOrderSummary(productPrice);
    }

    modal.classList.add('active');
}

function updateOrderSummary(price) {
    const quantityInput = document.querySelector('#quantity');
    const displayQty = document.querySelector('#displayQty');
    const totalPrice = document.querySelector('#totalPrice');

    const qty = parseInt(quantityInput.value);
    const total = qty * parseInt(price);

    displayQty.textContent = qty;
    totalPrice.textContent = `KES ${total.toLocaleString()}`;
}

function closeOrderModal() {
    const modal = document.getElementById('quickOrderModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function displayProducts(products) {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) {
        console.error('Products grid element not found!');
        return;
    }

    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        // Stock status
        let stockText = '';
        let stockClass = '';
        switch(product.stock_status) {
            case 'available':
                stockText = 'In Stock';
                stockClass = 'stock-available';
                break;
            case 'low':
                stockText = 'Low Stock';
                stockClass = 'stock-low';
                break;
            case 'out':
                stockText = 'Out of Stock';
                stockClass = 'stock-out';
                break;
        }

        productCard.innerHTML = `
            <div class="product-image">
                <div class="image-placeholder">
                    <i class="${product.icon || 'fas fa-fish'}"></i>
                    <p>Add ${product.name} image</p>
                </div>
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">
                <span class="currency">${product.currency}</span>
                ${parseFloat(product.price).toLocaleString()}
            </div>
            <div class="product-stock ${stockClass}">
                <i class="fas ${product.stock_status === 'available' ? 'fa-check-circle' : product.stock_status === 'low' ? 'fa-exclamation-circle' : 'fa-times-circle'}"></i>
                ${stockText}
            </div>
            <div class="product-actions">
                <button class="order-btn" ${product.stock_status === 'out' ? 'disabled' : ''}
                        data-product="${product.name}" data-price="${product.price}">
                    <i class="fas fa-shopping-cart"></i>
                    ${product.stock_status === 'out' ? 'Out of Stock' : 'Order Now'}
                </button>
                <button class="wishlist-btn" title="Add to Wishlist">
                    <i class="far fa-heart"></i>
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });

    // Add event listeners for the new product cards
    addProductEventListeners();
}

function addProductEventListeners() {
    // Order button functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('order-btn') || e.target.closest('.order-btn')) {
            const orderBtn = e.target.classList.contains('order-btn') ? e.target : e.target.closest('.order-btn');
            if (!orderBtn.disabled) {
                const productName = orderBtn.getAttribute('data-product');
                const productPrice = orderBtn.getAttribute('data-price');
                openOrderModal(productName, productPrice);
            }
        }

        // Wishlist button functionality
        if (e.target.classList.contains('wishlist-btn') || e.target.closest('.wishlist-btn')) {
            const wishlistBtn = e.target.classList.contains('wishlist-btn') ? e.target : e.target.closest('.wishlist-btn');
            const heartIcon = wishlistBtn.querySelector('i');

            if (heartIcon.classList.contains('far')) {
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                wishlistBtn.style.backgroundColor = 'var(--primary)';
                wishlistBtn.style.color = 'var(--white)';
                showSuccessMessage('Added to wishlist!');
            } else {
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                wishlistBtn.style.backgroundColor = 'transparent';
                wishlistBtn.style.color = 'var(--primary)';
                showSuccessMessage('Removed from wishlist!');
            }
        }
    });
}