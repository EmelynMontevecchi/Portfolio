// ========================================
// PORTFÓLIO - EMELYN MONTEVECHI
// Interações e animações
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    // ========================================
    // NAVEGAÇÃO SCROLL
    // ========================================

    // Navbar muda de cor ao rolar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Efeito de fade no hero conforme rola
        if (heroContent) {
            const scrollY = window.scrollY;
            const heroHeight = window.innerHeight;
            const opacity = Math.max(0, 1 - (scrollY / (heroHeight * 0.6)));
            const translateY = scrollY * 0.4;

            heroContent.style.opacity = opacity;
            heroContent.style.transform = `translateY(${translateY}px)`;
        }
    });

    // ========================================
    // MENU MOBILE
    // ========================================

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Fecha menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ========================================
    // SCROLL SUAVE
    // ========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // ANIMAÇÃO DE ELEMENTOS AO SCROLL
    // ========================================

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animação dos números
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }

                // Animação das barras de skill
                if (entry.target.classList.contains('skill-card')) {
                    const skillBar = entry.target.querySelector('.skill-bar');
                    if (skillBar) {
                        const width = skillBar.style.width;
                        skillBar.style.width = '0';
                        setTimeout(() => {
                            skillBar.style.width = width;
                        }, 200);
                    }
                }
            }
        });
    }, observerOptions);

    // Observar elementos para animar
    document.querySelectorAll('.skill-card, .project-card, .cert-card, .about-text').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Observar estatísticas
    document.querySelectorAll('.stat-number').forEach(el => {
        observer.observe(el);
    });

    // ========================================
    // ANIMAÇÃO DE CONTADOR
    // ========================================

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };

        updateCounter();
    }

    // ========================================
    // PARALLAX EFFECT
    // ========================================

    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;

                // Parallax nos backgrounds
                document.querySelectorAll('.hero-bg-pattern').forEach(el => {
                    el.style.transform = `translateY(${scrolled * 0.5}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    });

    // ========================================
    // EFEITO DE TYPING (opcional para subtítulo)
    // ========================================

    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.opacity = '1';

        let charIndex = 0;
        const typeInterval = setInterval(() => {
            if (charIndex < text.length) {
                subtitle.textContent += text[charIndex];
                charIndex++;
            } else {
                clearInterval(typeInterval);
            }
        }, 50);
    }

    // ========================================
    // HOVER EFFECT NOS CARDS
    // ========================================

    document.querySelectorAll('.skill-card, .project-card, .cert-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // ========================================
    // VALIDAÇÃO DE IMAGENS (fallback)
    // ========================================

    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            // Se a imagem não carregar, mostra um placeholder
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.innerHTML = '<i class="fas fa-image" style="font-size: 3rem; color: var(--text-muted);"></i>';
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--bg-card);
                border-radius: inherit;
            `;
            this.parentNode.appendChild(placeholder);
        });
    });

    // ========================================
    // KEYBOARD NAVIGATION
    // ========================================

    document.addEventListener('keydown', function(e) {
        // ESC fecha menu mobile
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // ========================================
    // PRELOADER (opcional)
    // ========================================

    window.addEventListener('load', function() {
        document.body.classList.add('loaded');

        // Inicializa animações que dependem de tudo carregado
        setTimeout(() => {
            document.querySelectorAll('.fade-in').forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('visible');
                }, index * 100);
            });
        }, 300);
    });

    // ========================================
    // CONSOLE MESSAGE
    // ========================================

    console.log('%c👋 Olá! Sou Emelyn Montevechi', 'color: #6366f1; font-size: 16px; font-weight: bold;');
    console.log('%cData Analyst & BI Analyst', 'color: #06b6d4; font-size: 12px;');
    console.log('%cTransformando dados em insights estratégicos.', 'color: #71717a; font-size: 11px;');
});

// ========================================
// UTILIDADES
// ========================================

// Debounce para eventos frequentes
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle para scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

const scrollTopBtn = document.getElementById("scrollTopBtn");

// Mostrar botão quando rolar a página
window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
};

// Quando clicar, volta suavemente ao topo
scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
