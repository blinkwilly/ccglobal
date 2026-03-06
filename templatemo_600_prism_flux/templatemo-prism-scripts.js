

const portfolioData = [
    {
        id: 1,
        title: 'Sunday service ',
        description: 'Sunday Service begins with School of Light by 8AM and Main Service by 9AM.',
        image: 'images/pix3.jpg',
        tech: ['TensorFlow', 'Python', 'CUDA']
    },
    {
        id: 2,
        title: 'Midweek',
        description: '⁠Wednesday Service begins by 5:30PM.',
        image: 'images/pix2.jpg',
        tech: ['AWS', 'Kubernetes', 'Docker']
    },
    {
        id: 3,
        title: 'WorkForce',
        description: '⁠Join the workforce of the Church. We are hiring for various roles across departments.',
        image: 'images/pix4.jpg',
        tech: ['Ethereum', 'Solidity', 'Web3']
    },
    {
        id: 4,
        title: 'Ongoing Building Project',
        description: "Our building project is ongoing, kindly support as God has blessed you",
        image: 'images/pix5.png',
        tech: ['Zero Trust', 'AI Defense', 'Encryption']
    },
    {
        id: 5,
        title: 'EBTC',
        description: 'Easter Believers conference is coming up on the 2nd to 5th of April, 2026!',
        image: 'images/ebtc.jpeg',
        tech: ['Apache Spark', 'Hadoop', 'Kafka']
    },

];

// Skills data
const skillsData = [
    // { name: 'React.js', icon: '⚛️', level: 95, category: 'frontend' },
    // { name: 'Node.js', icon: '🟢', level: 90, category: 'backend' },
    // { name: 'TypeScript', icon: '📘', level: 88, category: 'frontend' },
    // { name: 'AWS', icon: '☁️', level: 92, category: 'cloud' },
    // { name: 'Docker', icon: '🐳', level: 85, category: 'cloud' },
    // { name: 'Python', icon: '🐍', level: 93, category: 'backend' },
    // { name: 'Kubernetes', icon: '☸️', level: 82, category: 'cloud' },
    // { name: 'GraphQL', icon: '◈', level: 87, category: 'backend' },
    // { name: 'TensorFlow', icon: '🤖', level: 78, category: 'emerging' },
    // { name: 'Blockchain', icon: '🔗', level: 75, category: 'emerging' },
    // { name: 'Vue.js', icon: '💚', level: 85, category: 'frontend' },
    // { name: 'MongoDB', icon: '🍃', level: 90, category: 'backend' }
];

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const header = document.getElementById('header');
    if (section) {
        const headerHeight = header.offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Initialize particles for philosophy section
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';

        // Start particles at random vertical positions throughout the section
        particle.style.top = Math.random() * 100 + '%';

        // Random animation delay for natural movement
        particle.style.animationDelay = Math.random() * 20 + 's';

        // Random animation duration for variety
        particle.style.animationDuration = (18 + Math.random() * 8) + 's';

        particlesContainer.appendChild(particle);
    }
}

// Initialize carousel
let currentIndex = 0;
const carousel = document.getElementById('carousel');
const indicatorsContainer = document.getElementById('indicators');

function createCarouselItem(data, index) {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.dataset.index = index;

    const techBadges = data.tech.map(tech =>
        `<span class="tech-badge">${tech}</span>`
    ).join('');

    item.innerHTML = `
                <div class="card">
             
                    <div class="card-image">
                        <img src="${data.image}" alt="${data.title}">
                    </div>
                    <h3 class="card-title">${data.title}</h3>
                    <p class="card-description">${data.description}</p>
    
                </div>
            `;

    return item;
}

// Build announcement cards
function renderAnnouncements() {
    const grid = document.getElementById('announcementGrid');
    if (!grid) return;
    grid.innerHTML = '';
    portfolioData.forEach((data) => {
        const techBadges = data.tech.map(tech => `<span class="tech-badge">${tech}</span>`).join('');
        const card = document.createElement('div');
        card.className = 'announcement-card';
        card.innerHTML = `
                    <div class="card-image">
                        <img src="${data.image}" alt="${data.title}">
                    </div>
                    <h3 class="card-title">${data.title}</h3>
                    <p class="card-description">${data.description}</p>
                    <div class="card-tech">${techBadges}</div>
                    <button class="card-cta" onclick="scrollToSection('about')">Explore</button>
                `;
        grid.appendChild(card);
    });
}

function initCarousel() {
    // Create carousel items
    portfolioData.forEach((data, index) => {
        const item = createCarouselItem(data, index);
        carousel.appendChild(item);

        // Create indicator
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.dataset.index = index;
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    updateCarousel();
}

function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const totalItems = items.length;
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;

    items.forEach((item, index) => {
        // Calculate relative position
        let offset = index - currentIndex;

        // Wrap around for continuous rotation
        if (offset > totalItems / 2) {
            offset -= totalItems;
        } else if (offset < -totalItems / 2) {
            offset += totalItems;
        }

        const absOffset = Math.abs(offset);
        const sign = offset < 0 ? -1 : 1;

        // Reset transform
        item.style.transform = '';
        item.style.opacity = '';
        item.style.zIndex = '';
        item.style.transition = 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)';

        // Adjust spacing based on screen size
        let spacing1 = 400;
        let spacing2 = 600;
        let spacing3 = 750;

        if (isMobile) {
            spacing1 = 280;  // Was 400, now 100px closer
            spacing2 = 420;  // Was 600, now 180px closer
            spacing3 = 550;  // Was 750, now 200px closer
        } else if (isTablet) {
            spacing1 = 340;
            spacing2 = 520;
            spacing3 = 650;
        }

        if (absOffset === 0) {
            // Center item
            item.style.transform = 'translate(-50%, -50%) translateZ(0) scale(1)';
            item.style.opacity = '1';
            item.style.zIndex = '10';
        } else if (absOffset === 1) {
            // Side items
            const translateX = sign * spacing1;
            const rotation = isMobile ? 25 : 30;
            const scale = isMobile ? 0.88 : 0.85;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-200px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.8';
            item.style.zIndex = '5';
        } else if (absOffset === 2) {
            // Further side items
            const translateX = sign * spacing2;
            const rotation = isMobile ? 35 : 40;
            const scale = isMobile ? 0.75 : 0.7;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-350px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.5';
            item.style.zIndex = '3';
        } else if (absOffset === 3) {
            // Even further items
            const translateX = sign * spacing3;
            const rotation = isMobile ? 40 : 45;
            const scale = isMobile ? 0.65 : 0.6;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-450px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.3';
            item.style.zIndex = '2';
        } else {
            // Hidden items (behind)
            item.style.transform = 'translate(-50%, -50%) translateZ(-500px) scale(0.5)';
            item.style.opacity = '0';
            item.style.zIndex = '1';
        }
    });

    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % portfolioData.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length;
    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

const skillsGrid = document.getElementById('skillsGrid');


function displaySkills(category = 'all') {
    if (!skillsGrid) return;
    skillsGrid.innerHTML = '';

    const filteredSkills = category === 'all'
        ? skillsData
        : skillsData.filter(skill => skill.category === category);

    filteredSkills.forEach((skill, index) => {
        const hexagon = document.createElement('div');
        hexagon.className = 'skill-hexagon';
        hexagon.style.animationDelay = `${index * 0.1}s`;

        hexagon.innerHTML = `
                        <div class="hexagon-inner">
                            <div class="hexagon-content">
                                <div class="skill-icon-hex">${skill.icon}</div>
                                <div class="skill-name-hex">${skill.name}</div>
                                <div class="skill-level">
                                    <div class="skill-level-fill" style="width: ${skill.level}%"></div>
                                </div>
                                <div class="skill-percentage-hex">${skill.level}%</div>
                            </div>
                        </div>
                    `;

        skillsGrid.appendChild(hexagon);
    });
}


// Event listeners
const nextBtn = document.getElementById('nextBtn');
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
const prevBtn = document.getElementById('prevBtn');
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

// Auto-rotate carousel
setInterval(nextSlide, 5000);





// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

// Update carousel on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updateCarousel();
    }, 250);
});

// Initialize on load
initCarousel();
renderAnnouncements();
displaySkills('all');
initParticles();

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling and active navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// Update active navigation on scroll
function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href').substring(1);
                if (href === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);


// Form submission (guarded when form is absent)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        // Show success message
        alert(`Thank you ${data.name}! Your message has been transmitted successfully. We'll respond within 24 hours.`);
        // Reset form
        contactForm.reset();
    });
}

// Loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.classList.add('hidden');
    }, 1500);
});

// Parallax effect removed for performance and to avoid layout shift across devices.