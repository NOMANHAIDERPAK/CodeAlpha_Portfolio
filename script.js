// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');

    if (body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});


// ========== MOBILE MENU ==========
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});


// ========== CLOSE MENU ==========
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');

        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});


// ========== ACTIVE NAVIGATION ==========
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        if (pageYOffset >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.nav === current) {
            link.classList.add('active');
        }
    });
});


// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href !== '#') {
            e.preventDefault();

            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// ========== SKILLS ANIMATION (FIXED - NO DUPLICATE) ==========
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const value = entry.target.dataset.progress;
            entry.target.style.width = value + "%";
        }
    });
}, {
    threshold: 0.5
});

skillBars.forEach(bar => skillObserver.observe(bar));


// ========== TYPING EFFECT ==========
const typingText = document.querySelector('.typing-text');

const texts = [
    'Computer Science Graduate',
    'Frontend Developer',
    'Web Designer',
    'Problem Solver'
];

let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const currentText = texts[textIndex];

    if (deleting) {
        typingText.textContent = currentText.substring(0, charIndex--);
    } else {
        typingText.textContent = currentText.substring(0, charIndex++);
    }

    if (!deleting && charIndex === currentText.length) {
        deleting = true;
        setTimeout(typeEffect, 1500);
        return;
    }

    if (deleting && charIndex === 0) {
        deleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }

    setTimeout(typeEffect, deleting ? 50 : 100);
}

typeEffect();


// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    formMessage.style.display = 'block';
    formMessage.innerHTML = '✅ Thank you! Your message has been sent successfully.';
    formMessage.style.background = 'rgba(16,185,129,0.2)';
    formMessage.style.color = '#10b981';

    contactForm.reset();

    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 3000);
});


// ========== SCROLL REVEAL ==========
const revealItems = document.querySelectorAll(
    '.project-card, .skill-card, .timeline-item, .cert-card, .contact-card'
);

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

revealItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = '0.6s ease';

    revealObserver.observe(item);
});