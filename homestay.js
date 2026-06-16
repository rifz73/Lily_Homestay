/**
 * Liliy Homestay — Premium Single Page Operations Engine
 * Structured Core Script Architecture
 */

document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. MOBILE RESPONSIVE HAMBURGER NAVIGATION
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navItems = document.querySelectorAll('.nav-item');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            menuToggle.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close dropdown layout dynamically when navigation link items are tapped
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ==========================================================================
       2. REFINED SLIDESHOW PRESENTATION CONTROLLER
       ========================================================================== */
    let slideIndex = 1;
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    let autoSlideTimer;

    function renderSlides(n) {
        if (slides.length === 0) return;
        
        // Handle boundary conditions seamlessly
        if (n > slides.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = slides.length; }
        
        // Minimize styling paint triggers
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
            if (dots[i]) dots[i].classList.remove("active");
        }
        
        slides[slideIndex - 1].style.display = "block";  
        if (dots[slideIndex - 1]) dots[slideIndex - 1].classList.add("active");
    }

    function resetAndRestartTimer() {
        clearInterval(autoSlideTimer);
        autoSlideTimer = setInterval(() => {
            slideIndex++;
            renderSlides(slideIndex);
        }, 4500); // 4.5 Second Loop Cycle
    }

    // Assign Manual Trigger Actions Cleanly
    const prevButton = document.getElementById('slide-prev');
    const nextButton = document.getElementById('slide-next');

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            slideIndex--;
            renderSlides(slideIndex);
            resetAndRestartTimer();
        });

        nextButton.addEventListener('click', () => {
            slideIndex++;
            renderSlides(slideIndex);
            resetAndRestartTimer();
        });
    }

    // Map Pagination Dots clicks to respective slider index directly
    Array.from(dots).forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slideIndex = index + 1;
            renderSlides(slideIndex);
            resetAndRestartTimer();
        });
    });

    // Boot presentation system
    renderSlides(slideIndex);
    resetAndRestartTimer();

    /* ==========================================================================
       3. PHOTOGRAPHY FULL-SCREEN LIGHTBOX MODAL
       ========================================================================== */
    const modal = document.getElementById('image-modal');
    const modalImgTarget = document.getElementById('modal-img-target');
    const modalClose = document.getElementById('modal-close');

    if (modal && modalImgTarget && modalClose) {
        Array.from(slides).forEach(slide => {
            slide.addEventListener('click', function() {
                const innerDiv = this.querySelector('.slide-placeholder');
                if (innerDiv) {
                    const bgImageStyle = window.getComputedStyle(innerDiv).backgroundImage;
                    modalImgTarget.style.backgroundImage = bgImageStyle;
                    modal.style.display = "flex";
                    modal.setAttribute('aria-hidden', 'false');
                }
            });
        });

        const hideModal = () => {
            modal.style.display = "none";
            modal.setAttribute('aria-hidden', 'true');
        };

        modalClose.addEventListener('click', hideModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) hideModal();
        });
    }

    /* ==========================================================================
       4. INTERACTIVE MAP FRAME LAZY-LAUNCHER
       ========================================================================== */
    const loadMapBtn = document.getElementById('load-map-btn');
    const mapBox = document.querySelector('.map-box');
    const geoIframe = document.getElementById('google-iframe');

    if (loadMapBtn && mapBox && geoIframe) {
        loadMapBtn.addEventListener('click', () => {
            const targetSrc = geoIframe.getAttribute('data-src');
            if (targetSrc && !geoIframe.src) {
                geoIframe.src = targetSrc;
            }
            mapBox.classList.add('activated');
        });
    }

    /* ==========================================================================
       5. EXPANDABLE EDITORIAL JOURNAL CARDS
       ========================================================================== */
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('expanded');
        });
        
        // Maintain Keyboard Navigation accessibility rules
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('expanded');
            }
        });
    });

    /* ==========================================================================
       6. ACCELERATED SCROLL REVEAL VIEWPORT TRANSITIONS
       ========================================================================== */
    const scrollSections = document.querySelectorAll('.reveal-section');
    
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    sectionObserver.unobserve(entry.target); // Optimize processing once loaded
                }
            });
        }, { threshold: 0.12 });

        scrollSections.forEach(section => sectionObserver.observe(section));
    } else {
        // Fallback for primitive classic browsers
        scrollSections.forEach(section => section.classList.add('visible'));
    }

    /* ==========================================================================
       7. ACCESSIBILITY OVERLAY LAYER MANAGEMENT
       ========================================================================== */
    const contrastBtn = document.getElementById('contrast-toggle');
    const sizeBtn = document.getElementById('size-toggle');

    if (contrastBtn) {
        contrastBtn.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
        });
    }

    if (sizeBtn) {
        sizeBtn.addEventListener('click', () => {
            document.body.classList.toggle('large-font');
        });
    }
});