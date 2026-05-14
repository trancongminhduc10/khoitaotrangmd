// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scroll Function
function scrollToSection(sectionId) {
    const section = document.querySelector(`#${sectionId}`);
    if (section) {
        const offset = 100;
        const sectionTop = section.offsetTop - offset;
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Intersection Observer for Fade-in Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// Observe skill cards
document.querySelectorAll('.skill-card').forEach((element, index) => {
    element.style.opacity = '0';
    element.style.animationDelay = `${index * 0.1}s`;
    observer.observe(element);
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formInputs = contactForm.querySelectorAll('input, textarea');
        const formData = {
            name: formInputs[0].value,
            email: formInputs[1].value,
            message: formInputs[2].value
        };

        // Validate form data
        if (!formData.name || !formData.email || !formData.message) {
            alert('Vui lòng điền đầy đủ tất cả các trường');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Vui lòng nhập email hợp lệ');
            return;
        }

        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Đang gửi...';
        submitButton.disabled = true;

        setTimeout(() => {
            // Success message
            alert(`Cảm ơn ${formData.name}! Chúng tôi sẽ liên hệ với bạn sớm.`);
            
            // Reset form
            contactForm.reset();
            
            // Restore button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1000);
    });
}

// Active Nav Link Based on Scroll Position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active style for nav links
const style = document.createElement('style');
style.textContent = `
    .nav-link.active::after {
        width: 100%;
        background: var(--primary-color);
    }
`;
document.head.appendChild(style);

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroCircle = document.querySelector('.hero-circle');
    if (heroCircle && scrollY < window.innerHeight) {
        heroCircle.style.transform = `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0002})`;
    }
});

// Optimize Cloud Animation Performance
const clouds = document.querySelectorAll('.cloud');
let animationRunning = true;

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        animationRunning = false;
        clouds.forEach(cloud => {
            cloud.style.animationPlayState = 'paused';
        });
    } else {
        animationRunning = true;
        clouds.forEach(cloud => {
            cloud.style.animationPlayState = 'running';
        });
    }
});

// Preload images and optimize loading
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const imageLoader = new Image();
        imageLoader.src = img.src;
    });
}

// Call preload when page loads
window.addEventListener('load', preloadImages);

// Add loading state for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (!this.classList.contains('disabled')) {
            this.style.opacity = '0.8';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Accessibility: Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Performance: Lazy load heavy elements
const lazyLoad = () => {
    const elements = document.querySelectorAll('[data-lazy]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.src = element.dataset.src;
                element.classList.remove('lazy');
                observer.unobserve(element);
            }
        });
    });

    elements.forEach(element => {
        imageObserver.observe(element);
    });
};

// Initialize lazy loading on page load
document.addEventListener('DOMContentLoaded', lazyLoad);
