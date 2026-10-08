const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const typewriter = document.querySelector('#typewriter');
const contactForm = document.querySelector('#contact-form');
const notification = document.querySelector('#notification');
const copyrightYear = document.querySelector('#copyright-year');
const bubbleScene = document.querySelector('#bubble-scene');

const bubbleCount = 18;
for (let i = 0; i < bubbleCount; i += 1) {
    const bubble = document.createElement('span');
    const size = Math.random() * 120 + 40;
    const left = Math.random() * 100;
    const duration = Math.random() * 16 + 16;
    const drift = (Math.random() - 0.5) * 140;
    const delay = Math.random() * -20;

    bubble.className = 'bubble';
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${left}%`;
    bubble.style.setProperty('--drift', `${drift}px`);
    bubble.style.setProperty('--float-duration', `${duration}s`);
    bubble.style.setProperty('--delay', `${delay}s`);
    bubble.style.opacity = `${Math.random() * 0.55 + 0.35}`;

    bubbleScene.appendChild(bubble);
}

// Mobile navigation stays open only while the user is choosing a page.
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navMenu.classList.contains('open'));
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
});

const typeText = 'Creative Mind • Future Developer • Dreamer';
let typeIndex = 0;
function typeSubtitle() {
    if (typeIndex <= typeText.length) {
        typewriter.textContent = typeText.slice(0, typeIndex);
        typeIndex += 1;
        window.setTimeout(typeSubtitle, 65);
    }
}
typeSubtitle();

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.14 });

document.querySelectorAll('.section-header, .about-text, .info-card, .skill-card, .project-card, .contact-form, .social-links').forEach((element) => {
    element.classList.add('reveal');
    revealObserver.observe(element);
});

const activeSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        }
    });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach((section) => activeSectionObserver.observe(section));

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    notification.classList.add('show');
    contactForm.reset();
    window.setTimeout(() => notification.classList.remove('show'), 4200);
});

copyrightYear.textContent = `© ${new Date().getFullYear()} Kristine Joy B. Diaz`;
