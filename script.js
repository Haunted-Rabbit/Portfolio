// ====================================
// CURSOR GLOW EFFECT
// ====================================
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    }
});

// ====================================
// NAVBAR
// ====================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// Scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close mobile nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ====================================
// ACTIVE NAV LINK ON SCROLL
// ====================================
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ====================================
// SCROLL ANIMATIONS
// ====================================
const animateElements = document.querySelectorAll('[data-animate]');

const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || 0;
            setTimeout(() => {
                entry.target.classList.add('animated');
            }, parseInt(delay));
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animateElements.forEach(el => observer.observe(el));

// ====================================
// PROJECT FILTERING
// ====================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const featuredProject = document.querySelector('.featured-project');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // Filter project cards
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category') || '';
            if (filter === 'all' || category.includes(filter)) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });

        // Filter featured project
        if (featuredProject) {
            const featuredCategory = featuredProject.getAttribute('data-category') || '';
            if (filter === 'all' || featuredCategory.includes(filter)) {
                featuredProject.classList.remove('hidden');
            } else {
                featuredProject.classList.add('hidden');
            }
        }
    });
});

// Add fadeInUp keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ====================================
// CONTACT FORM (Web3Forms)
// ====================================
// Inject access key (obfuscated)
const _k = [atob('NjljYzkzNjMtYjEzMi00NDE3LWI2YWEtNWRhOTk3YjEzYTkz')];
document.getElementById('w3f_key').value = _k[0];

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Submit via fetch to Formsubmit.co
    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                // Success
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            // Error fallback
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error — Try Again';
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #f87171)';

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        });
});

// ====================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ====================================
// TYPING EFFECT FOR CODE WINDOW (optional touch)
// ====================================
function addTypingCursor() {
    const codeBody = document.querySelector('.code-body code');
    if (codeBody) {
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '█';
        cursor.style.cssText = 'color: var(--accent-primary); animation: blink 1s step-end infinite; font-weight: 400;';
        codeBody.appendChild(cursor);

        const blinkStyle = document.createElement('style');
        blinkStyle.textContent = `
            @keyframes blink {
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(blinkStyle);
    }
}

// Initialize after DOM load
addTypingCursor();

// ====================================
// COUNTER ANIMATION FOR STATS
// ====================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const isFloat = target % 1 !== 0;

    function update() {
        start += increment;
        if (start >= target) {
            element.textContent = isFloat ? target.toFixed(2) : target;
            return;
        }
        element.textContent = isFloat ? start.toFixed(2) : Math.floor(start);
        requestAnimationFrame(update);
    }

    update();
}

// Observe stat values for counter animation
const statValues = document.querySelectorAll('.stat-value');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const value = entry.target.textContent;
            const numericValue = parseFloat(value);
            if (!isNaN(numericValue) && numericValue > 1) {
                animateCounter(entry.target, numericValue, 1500);
            }
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statValues.forEach(el => counterObserver.observe(el));

// ====================================
// PAGE LOAD
// ====================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
