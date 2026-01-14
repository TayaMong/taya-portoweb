/**
 * script.js - Portfolio Interactivity
 */

// 1. Navbar Scroll Effect
// Menangani perubahan background navbar saat di-scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        // Memberikan sedikit bayangan saat di-scroll agar logo lebih menonjol
        navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.boxShadow = "none";
    }
});

// 2. Smooth Scroll for Navigation
// Membuat transisi perpindahan section menjadi mulus
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Menghitung tinggi navbar agar scroll tidak menutupi judul section
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 3. Scroll Reveal Animation
// Memberikan efek elemen "naik" dan "muncul" saat di-scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target); // Animasi hanya berjalan sekali
        }
    });
}, observerOptions);

// Target elemen: Skill cards, Project cards, Cert badges, dan Box teks di Hero
document.querySelectorAll('.skill-card, .project-card, .cert-badge, .hero-text-box').forEach(el => {
    // Style awal sebelum animasi berjalan
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    
    revealObserver.observe(el);
});

// Menambahkan class CSS secara dinamis untuk efek reveal
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(styleSheet);