// ==========================================
// Portfolio JavaScript - Praveen Kumar R
// Simple, Clean Vanilla JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // Initialize Lucide Icons if loaded
    const initIcons = () => {
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
        }
    };
    initIcons();

    // 1. Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav_links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isOpen = navLinks.classList.contains('active');
            menuBtn.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
            initIcons();
        });

        // Close mobile menu when clicking link
        document.querySelectorAll('.nav_links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.innerHTML = '<i data-lucide="menu"></i>';
                initIcons();
            });
        });
    }

    // 2. Dark / Light Mode Toggle (Default: Dark Mode)
    const modeToggle = document.getElementById('modeToggle');
    let currentMode = localStorage.getItem('praveen_portfolio_mode') || 'dark';

    function setMode(mode) {
        currentMode = mode;
        localStorage.setItem('praveen_portfolio_mode', mode);

        if (mode === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }

        if (modeToggle) {
            modeToggle.innerHTML = mode === 'light' ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
            modeToggle.style.color = mode === 'light' ? '#f59e0b' : '';
        }
        initIcons();
    }

    // Set initial mode on page load
    setMode(currentMode);

    if (modeToggle) {
        modeToggle.addEventListener('click', () => {
            const nextMode = currentMode === 'dark' ? 'light' : 'dark';
            setMode(nextMode);
            showToast(`Switched to ${nextMode.charAt(0).toUpperCase() + nextMode.slice(1)} Mode`);
        });
    }

    // 3. Scroll Progress Bar & Nav Highlighting
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav_links a');
    const scrollProgress = document.getElementById('scrollProgress');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Progress bar width
        if (scrollProgress && pageHeight > 0) {
            const progress = (scrollY / pageHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }

        // Back to top visibility
        if (backToTopBtn) {
            if (scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }

        // Highlight active section link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href === `#${current}` || (current === 'education' && href === '#experience') || (current === 'experience' && href === '#education')) {
                item.classList.add('active');
            }
        });
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. Typing Effect for Subtitle
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const words = ['MCA Graduate', 'Front-End Developer', 'Web Designer'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 40;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 1800; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400; // Pause before typing new word
            }

            setTimeout(typeEffect, typeSpeed);
        }

        typeEffect();
    }

    // 5. Scroll Reveal & Skill Progress Trigger
    const revealElements = document.querySelectorAll('.reveal');
    const skillsGrid = document.querySelector('.skills_grid');

    const handleScrollReveal = () => {
        const windowHeight = window.innerHeight;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });

        if (skillsGrid) {
            const gridTop = skillsGrid.getBoundingClientRect().top;
            if (gridTop < windowHeight - 80) {
                skillsGrid.classList.add('in-view');
            }
        }
    };

    window.addEventListener('scroll', handleScrollReveal);
    handleScrollReveal(); // Run once on page load

    // 6. Toast Notification Helper & Contact Form
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    function showToast(message) {
        if (!toast) return;
        if (toastMessage) toastMessage.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Thank you! Your message has been sent successfully.');
            contactForm.reset();
        });
    }

    // 7. Education & Experience Card Details Accordion Toggle
    document.querySelectorAll('.edu_toggle_btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.edu_card');
            if (card) {
                card.classList.toggle('expanded');
            }
        });
    });

    document.querySelectorAll('.edu_card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('a')) {
                card.classList.toggle('expanded');
            }
        });
    });

    // 8. Education & Experience Filter Tabs
    const filterButtons = document.querySelectorAll('.edu_filter_btn');
    const eduItems = document.querySelectorAll('.edu_item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            eduItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 9. Skills More Details Toggle
    const skillsToggleBtn = document.getElementById('skillsToggleBtn');
    const skillsDetailsGrid = document.getElementById('skillsDetailsGrid');

    if (skillsToggleBtn && skillsDetailsGrid) {
        skillsToggleBtn.addEventListener('click', () => {
            const isExpanded = skillsDetailsGrid.classList.contains('skills_details_expanded');

            if (isExpanded) {
                skillsDetailsGrid.classList.remove('skills_details_expanded');
                skillsDetailsGrid.classList.add('skills_details_collapsed');
                skillsToggleBtn.classList.remove('active');
                skillsToggleBtn.setAttribute('aria-expanded', 'false');
                skillsToggleBtn.innerHTML = `
                    <span class="btn_icon_left"><i data-lucide="bar-chart-3"></i></span>
                    <span class="skills_btn_text">View More Details (Proficiency & Progress)</span>
                    <span class="btn_icon_right"><i data-lucide="chevron-down"></i></span>
                `;
            } else {
                skillsDetailsGrid.classList.remove('skills_details_collapsed');
                skillsDetailsGrid.classList.add('skills_details_expanded');
                skillsDetailsGrid.classList.add('in-view');
                skillsToggleBtn.classList.add('active');
                skillsToggleBtn.setAttribute('aria-expanded', 'true');
                skillsToggleBtn.innerHTML = `
                    <span class="btn_icon_left"><i data-lucide="bar-chart-3"></i></span>
                    <span class="skills_btn_text">Show Less Details</span>
                    <span class="btn_icon_right"><i data-lucide="chevron-up"></i></span>
                `;
            }
            initIcons();
        });
    }
});