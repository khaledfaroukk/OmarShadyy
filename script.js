// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Portfolio Filter Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const filter = this.dataset.filter;

                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Filter portfolio items
                portfolioItems.forEach(item => {
                    const category = item.dataset.category;

                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.classList.add('fade-in');
                        item.classList.remove('fade-out');
                    } else {
                        item.classList.add('fade-out');
                        item.classList.remove('fade-in');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Simple validation
            if (!data.name || !data.email) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you for your message! We\'ll get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScrollTop = 0;

        window.addEventListener('scroll', function () {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollTop = scrollTop;
        });
    }

    // Image lazy loading effect
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';

                img.onload = () => {
                    img.style.opacity = '1';
                };

                if (img.complete) {
                    img.style.opacity = '1';
                }

                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Add animation to elements on scroll
    const animateElements = document.querySelectorAll('.service-card, .work-item, .team-member, .value-item');
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        elementObserver.observe(el);
    });

    // FAQ Toggle Functionality (if needed for future enhancement)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', function () {
            // Add expand/collapse functionality if needed
            this.classList.toggle('active');
        });
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = hero.querySelector('.hero-image');
            if (parallax) {
                const speed = scrolled * 0.5;
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });
    }

    // Initialize portfolio filter to show all items
    if (portfolioItems.length > 0) {
        portfolioItems.forEach(item => {
            item.style.display = 'block';
            item.classList.add('fade-in');
        });
    }
});

// Utility function for smooth transitions
function fadeIn(element, duration = 300) {
    element.style.opacity = 0;
    element.style.display = 'block';

    let start = performance.now();

    function fade(timestamp) {
        const elapsed = timestamp - start;
        const progress = elapsed / duration;

        if (progress < 1) {
            element.style.opacity = progress;
            requestAnimationFrame(fade);
        } else {
            element.style.opacity = 1;
        }
    }

    requestAnimationFrame(fade);
}

function fadeOut(element, duration = 300) {
    let start = performance.now();

    function fade(timestamp) {
        const elapsed = timestamp - start;
        const progress = elapsed / duration;

        if (progress < 1) {
            element.style.opacity = 1 - progress;
            requestAnimationFrame(fade);
        } else {
            element.style.opacity = 0;
            element.style.display = 'none';
        }
    }

    requestAnimationFrame(fade);
}

// Add window resize handler for responsive adjustments
window.addEventListener('resize', function () {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    if (window.innerWidth > 768) {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    }
});









// Main application logic
class PhotographyPortfolio {
    constructor() {
        this.currentProject = null;
        this.init();
    }

    init() {
        this.renderProjects();
        this.bindEvents();
    }

    renderProjects() {
        const projectsGrid = document.getElementById('projects-grid');
        projectsGrid.innerHTML = '';

        projects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project, index);
            projectsGrid.appendChild(projectCard);
        });
    }

    createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.animationDelay = `${index * 150}ms`;
        card.dataset.projectId = project.id;

        card.innerHTML = `
            <div class="project-card-bg" style="background-image: url('${project.coverImage}')"></div>
            <div class="project-card-overlay"></div>
            <div class="project-card-content">
                <h3 class="project-card-title">${project.title}</h3>
                <p class="project-card-description">${project.description}</p>
            </div>
            <div class="project-card-indicator">
                <div class="indicator-circle">
                    <svg class="indicator-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        `;

        return card;
    }

    showProject(projectId) {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;

        this.currentProject = project;

        // Update gallery content
        document.getElementById('gallery-title').textContent = project.title;
        document.getElementById('gallery-description').textContent = project.description;

        // Render photos
        this.renderGalleryPhotos(project.photos);

        // Render story
        this.renderProjectStory(project);

        // Show gallery, hide portfolio grid
        document.getElementById('portfolio-grid').classList.add('hidden');
        document.getElementById('project-gallery').classList.remove('hidden');

        // Scroll to top
        window.scrollTo(0, 0);
    }

    renderGalleryPhotos(photos) {
        const photosContainer = document.getElementById('gallery-photos');
        photosContainer.innerHTML = '';

        photos.forEach((photo, index) => {
            const photoElement = document.createElement('div');
            photoElement.className = 'gallery-photo';
            photoElement.style.animationDelay = `${index * 100}ms`;

            photoElement.innerHTML = `
                <img src="${photo.src}" alt="${photo.alt}" loading="lazy">
                <div class="gallery-photo-overlay"></div>
            `;

            photosContainer.appendChild(photoElement);
        });
    }

    renderProjectStory(project) {
        const storyContent = document.getElementById('story-content');

        const storyParagraphs = [
            project.story || `This ${project.title.toLowerCase()} project represents a unique exploration of visual storytelling through photography. Each image captures a moment in time, revealing the intricate details and emotions that define this collection.`,
            project.additionalStory || "The creative process behind this series involved careful consideration of lighting, composition, and timing. Every photograph tells part of a larger narrative, contributing to the overall vision and aesthetic of the project.",
            project.conclusion || "Through this body of work, we explore themes of beauty, contrast, and human connection, creating a visual journey that resonates with viewers on both emotional and aesthetic levels."
        ];

        storyContent.innerHTML = storyParagraphs
            .map(paragraph => `<p class="story-paragraph">${paragraph}</p>`)
            .join('');
    }

    showPortfolioGrid() {
        document.getElementById('project-gallery').classList.add('hidden');
        document.getElementById('portfolio-grid').classList.remove('hidden');
        this.currentProject = null;
        window.scrollTo(0, 0);
    }

    bindEvents() {
        // Project card clicks
        document.addEventListener('click', (e) => {
            const projectCard = e.target.closest('.project-card');
            if (projectCard) {
                const projectId = projectCard.dataset.projectId;
                this.showProject(projectId);
            }
        });

        // Back button click
        document.getElementById('back-button').addEventListener('click', () => {
            this.showPortfolioGrid();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentProject) {
                this.showPortfolioGrid();
            }
        });
    }
}

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PhotographyPortfolio();
});















// Main application state
let currentProject = null;
let currentImageIndex = 0;
let currentImages = [];

// DOM Elements
const portfolioView = document.getElementById('portfolioView');
const projectDetail = document.getElementById('projectDetail');
const projectGrid = document.getElementById('projectGrid');
const backButton = document.getElementById('backButton');
const loadingSpinner = document.getElementById('loadingSpinner');

// Detail view elements
const detailTitle = document.getElementById('detailTitle');
const detailBrief = document.getElementById('detailBrief');
const detailMedia = document.getElementById('detailMedia');
const detailStory = document.getElementById('detailStory');

// Lightbox elements
const imageLightbox = document.getElementById('imageLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.querySelector('.lightbox-caption');
const imageCounter = document.getElementById('imageCounter');
const closeLightbox = document.getElementById('closeLightbox');
const prevImage = document.getElementById('prevImage');
const nextImage = document.getElementById('nextImage');

// Touch/swipe variables
let touchStartX = 0;
let touchEndX = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    initializePortfolio();
    setupEventListeners();
});

function initializePortfolio() {
    renderProjects();
}


// Setup all event listeners
function setupEventListeners() {
    // Back button functionality
    backButton.addEventListener('click', showPortfolioView);

    // Lightbox event listeners
    closeLightbox.addEventListener('click', closeLightboxView);
    prevImage.addEventListener('click', showPreviousImage);
    nextImage.addEventListener('click', showNextImage);

    // Close lightbox when clicking overlay
    document.querySelector('.lightbox-overlay').addEventListener('click', closeLightboxView);

    // Handle browser back button
    window.addEventListener('popstate', function (e) {
        if (e.state && e.state.view === 'detail') {
            showProjectDetail(e.state.projectId);
        } else {
            showPortfolioView();
        }
    });

    // Handle escape key to go back or close lightbox
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (!imageLightbox.classList.contains('hidden')) {
                closeLightboxView();
            } else if (!projectDetail.classList.contains('hidden')) {
                showPortfolioView();
            }
        } else if (e.key === 'ArrowLeft' && !imageLightbox.classList.contains('hidden')) {
            showPreviousImage();
        } else if (e.key === 'ArrowRight' && !imageLightbox.classList.contains('hidden')) {
            showNextImage();
        }
    });

    // Touch/swipe support for lightbox
    imageLightbox.addEventListener('touchstart', handleTouchStart, { passive: true });
    imageLightbox.addEventListener('touchend', handleTouchEnd, { passive: true });
}

// Touch event handlers
function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe right - show previous image
            showPreviousImage();
        } else {
            // Swipe left - show next image
            showNextImage();
        }
    }
}

// Render all projects in the grid
function renderProjects() {
    projectGrid.innerHTML = '';

    projects.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        projectGrid.appendChild(projectCard);
    });

    // Add fade-in animation
    projectGrid.classList.add('fade-in');
}

// Create individual project card
function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-project-id', index);

    // Create background image
    const background = document.createElement('img');
    background.className = 'project-background';
    background.src = project.thumbnail;
    background.alt = project.title;
    background.loading = 'lazy';

    // Handle image loading errors
    background.onerror = function () {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMxYTFhMWEiLz48dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg==';
    };

    // Create project info
    const info = document.createElement('div');
    info.className = 'project-info';

    const title = document.createElement('h3');
    title.className = 'project-title';
    title.textContent = project.title;

    const brief = document.createElement('p');
    brief.className = 'project-brief';
    brief.textContent = project.brief;

    info.appendChild(title);
    info.appendChild(brief);

    card.appendChild(background);
    card.appendChild(info);

    // Add click event listener
    card.addEventListener('click', () => showProjectDetail(index));

    // Add hover effect with slight delay
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });

    return card;
}

// Show project detail view
function showProjectDetail(projectId) {
    document.querySelector('.footer').style.display = 'none';

    const project = projects[projectId];
    if (!project) return;

    currentProject = projectId;

    // Update browser history
    history.pushState(
        { view: 'detail', projectId: projectId },
        '',
        `#project-${projectId}`
    );

    // Update detail content
    detailTitle.textContent = project.title;
    detailBrief.textContent = project.brief;

    // Render media gallery
    renderMediaGallery(project.media);

    // Render project story
    renderProjectStory(project.story);

    // Show detail view with animation
    portfolioView.style.opacity = '0';
    setTimeout(() => {
        portfolioView.style.display = 'none';
        projectDetail.classList.remove('hidden');
        projectDetail.style.opacity = '1';
        projectDetail.style.transform = 'translateY(0)';

        // Scroll to top
        projectDetail.scrollTop = 0;
    }, 300);
}

// Show portfolio view
function showPortfolioView() {
    document.querySelector('.footer').style.display = 'block';

    // Update browser history
    history.pushState(
        { view: 'portfolio' },
        '',
        window.location.pathname
    );

    currentProject = null;

    // Show portfolio view with animation
    projectDetail.style.opacity = '0';
    projectDetail.style.transform = 'translateY(20px)';

    setTimeout(() => {
        projectDetail.classList.add('hidden');
        portfolioView.style.display = 'block';
        portfolioView.style.opacity = '1';
    }, 300);
}

// Render media gallery for project detail
function renderMediaGallery(media) {
    detailMedia.innerHTML = '';

    if (!media || media.length === 0) {
        detailMedia.innerHTML = '<p style="color: #666; text-align: center;">No media available for this project.</p>';
        return;
    }

    media.forEach((item, index) => {
        const mediaContainer = document.createElement('div');
        mediaContainer.className = 'media-item';

        if (item.type === 'image') {
            const img = document.createElement('img');
            img.src = item.url;
            img.alt = item.caption || `Project media ${index + 1}`;
            img.loading = 'lazy';

            // Handle image loading errors
            img.onerror = function () {
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMxYTFhMWEiLz48dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg==';
            };

            // Add click event to open lightbox
            img.addEventListener('click', () => openLightbox(media, index));

            mediaContainer.appendChild(img);
        } else if (item.type === 'video') {
            const video = document.createElement('video');
            video.src = item.url;
            video.controls = true;
            video.preload = 'metadata';

            // Handle video loading errors
            video.onerror = function () {
                mediaContainer.innerHTML = '<div style="padding: 2rem; text-align: center; color: #666;">Video could not be loaded</div>';
            };

            mediaContainer.appendChild(video);
        }

        detailMedia.appendChild(mediaContainer);
    });
}

// Open lightbox with image gallery
function openLightbox(media, startIndex) {
    // Filter only images for lightbox
    currentImages = media.filter(item => item.type === 'image');

    if (currentImages.length === 0) return;

    // Find the correct index in the filtered array
    let imageIndex = 0;
    let mediaIndex = 0;
    for (let i = 0; i < media.length; i++) {
        if (media[i].type === 'image') {
            if (i === startIndex) {
                imageIndex = mediaIndex;
                break;
            }
            mediaIndex++;
        }
    }

    currentImageIndex = imageIndex;

    // Show/hide navigation based on number of images
    if (currentImages.length === 1) {
        imageLightbox.classList.add('single-image');
    } else {
        imageLightbox.classList.remove('single-image');
    }

    showLightboxImage();
    imageLightbox.classList.remove('hidden');

    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
}

// Show current image in lightbox
function showLightboxImage() {
    if (currentImages.length === 0) return;

    const currentImage = currentImages[currentImageIndex];
    lightboxImage.src = currentImage.url;
    lightboxImage.alt = currentImage.caption || `Image ${currentImageIndex + 1}`;
    lightboxCaption.textContent = currentImage.caption || '';
    imageCounter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
}

// Show previous image
function showPreviousImage() {
    if (currentImages.length <= 1) return;

    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    showLightboxImage();
}

// Show next image
function showNextImage() {
    if (currentImages.length <= 1) return;

    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    showLightboxImage();
}

// Close lightbox
function closeLightboxView() {
    imageLightbox.classList.add('hidden');
    currentImages = [];
    currentImageIndex = 0;

    // Restore body scrolling
    document.body.style.overflow = '';
}

// Render project story
function renderProjectStory(story) {
    if (!story) {
        detailStory.innerHTML = '<p style="color: #666;">No story available for this project.</p>';
        return;
    }

    // Convert story object to HTML
    let storyHTML = '';

    if (story.description) {
        storyHTML += `<p>${story.description}</p>`;
    }

    if (story.challenges) {
        storyHTML += `<h3>Challenges</h3><p>${story.challenges}</p>`;
    }

    if (story.solution) {
        storyHTML += `<h3>Solution</h3><p>${story.solution}</p>`;
    }

    if (story.technologies && story.technologies.length > 0) {
        storyHTML += `<h3>Technologies Used</h3><ul>`;
        story.technologies.forEach(tech => {
            storyHTML += `<li>${tech}</li>`;
        });
        storyHTML += `</ul>`;
    }

    if (story.results) {
        storyHTML += `<h3>Results</h3><p>${story.results}</p>`;
    }

    detailStory.innerHTML = storyHTML;
}


// Utility function to handle smooth scrolling
function smoothScroll(element, to, duration) {
    const start = element.scrollTop;
    const change = to - start;
    const startTime = performance.now();

    function animateScroll(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easeInOutQuad = progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;

        element.scrollTop = start + change * easeInOutQuad;

        if (timeElapsed < duration) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
}

// Handle initial page load with hash
window.addEventListener('load', function () {
    const hash = window.location.hash;
    if (hash.startsWith('#project-')) {
        const projectId = parseInt(hash.split('-')[1]);
        if (projectId >= 0 && projectId < projects.length) {
            setTimeout(() => showProjectDetail(projectId), 600);
        }
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements when they're added to the DOM
function observeElements() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Call observe function after rendering projects
const originalRenderProjects = renderProjects;
renderProjects = function () {
    originalRenderProjects();
    setTimeout(observeElements, 100);
};









