
const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));


const textElement = $('.typing-text');
const words = ['Full-Stack Engineer', 'Reliable Production Systems', 'API & Integrations'];
if (textElement) {
    let wi = 0, ci = 0, del = false;
    const tick = () => {
        const w = words[wi];
        if (del) {
            ci = Math.max(0, ci - 1);
            textElement.textContent = w.substring(0, ci);
        } else {
            ci = Math.min(w.length, ci + 1);
            textElement.textContent = w.substring(0, ci);
        }

        if (!del && ci === w.length) { setTimeout(() => { del = true; tick(); }, 1500); }
        else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; setTimeout(tick, 400); }
        else setTimeout(tick, del ? 80 : 160);
    };
    document.addEventListener('DOMContentLoaded', tick);
}


const observerOptions = { threshold: 0.12 };
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, observerOptions);
$$('.fade-up').forEach(el => revealObserver.observe(el));


const hamburger = $('.hamburger');
const navLinks = $('.nav-links');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const spans = hamburger.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

 
    $$('.nav-links a').forEach(link => link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }));
}

const contactForm = $('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get('name') || formData.get('Name') || '';
        const email = formData.get('email') || '';
        const message = formData.get('message') || '';

        // Basic validation
        if (!email || !message) {
            alert('Please provide an email and a short message.');
            return;
        }

        // UX: show a success state — replace with real submit integration in production
        contactForm.querySelectorAll('input, textarea, button').forEach(i => i.disabled = true);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.textContent = 'Sending...';

       
        setTimeout(() => {
            contactForm.reset();
            alert('Thanks — your message has been received. I will reply within 2 business days.');
            contactForm.querySelectorAll('input, textarea, button').forEach(i => i.disabled = false);
            if (submitBtn) submitBtn.textContent = 'Send Message';
        }, 900);
    });
}


const certsGallery = $('#certsGallery');
const certPrevBtn = $('#certPrevBtn');
const certNextBtn = $('#certNextBtn');

if (certsGallery && certPrevBtn && certNextBtn) {
    const cardWidth = certsGallery.querySelector('.certificate-card').offsetWidth;
    const scrollAmount = (cardWidth + 24) * 4;

    certNextBtn.addEventListener('click', () => {
        certsGallery.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    certPrevBtn.addEventListener('click', () => {
        certsGallery.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
}