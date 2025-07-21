gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupNavigation();
    setupCursorGlow();
    setupScrollAnimations();
    setupInteractiveElements();
});

function initializeAnimations() {
    gsap.set(".hero-content > *", { opacity: 0, y: 50 });
    gsap.set(".hero-visual", { opacity: 0, scale: 0.8 });
    gsap.set(".nav-container", { opacity: 0, y: -20 });

    const tl = gsap.timeline();
    
    tl.to(".nav-container", { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out" 
    })
    .to(".hero-content > *", { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: "power3.out" 
    }, 0.5)
    .to(".hero-visual", { 
        opacity: 1, 
        scale: 1, 
        duration: 1.2, 
        ease: "elastic.out(1, 0.8)" 
    }, 1);
}

function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            gsap.to(spans[0], { rotation: 45, y: 6, duration: 0.3 });
            gsap.to(spans[1], { opacity: 0, duration: 0.3 });
            gsap.to(spans[2], { rotation: -45, y: -6, duration: 0.3 });
        } else {
            gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(spans[1], { opacity: 1, duration: 0.3 });
            gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // FIXED: Use targetId (selector string) instead of targetSection (DOM element)
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: targetId, // <- Changed from targetSection to targetId
                    ease: "power3.inOut"
                });
                
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const spans = hamburger.querySelectorAll('span');
                    gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
                    gsap.to(spans[1], { opacity: 1, duration: 0.3 });
                    gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
                }
            }
        });
    });

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const navbar = document.querySelector('.navbar');
        
        if (scrolled > 100) {
            navbar.style.background = 'rgba(10, 15, 28, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 15, 28, 0.95)';
        }

        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrolled >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}   

function setupCursorGlow() {
    const cursorGlow = document.querySelector('.cursor-glow');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursorGlow.style.left = cursorX + 'px';
        cursorGlow.style.top = cursorY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    document.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = '0.6';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    const interactiveElements = document.querySelectorAll('a, button, .feature-card, .impact-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorGlow.style.transform = 'scale(2)';
            cursorGlow.style.opacity = '0.8';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorGlow.style.transform = 'scale(1)';
            cursorGlow.style.opacity = '0.6';
        });
    });
}

function setupScrollAnimations() {
    gsap.utils.toArray('.feature-card').forEach((card, index) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 60,
            scale: 0.9
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    gsap.utils.toArray('.impact-card').forEach((card, index) => {
        gsap.fromTo(card, {
            opacity: 0,
            x: index % 2 === 0 ? -60 : 60,
            rotation: index % 2 === 0 ? -5 : 5
        }, {
            opacity: 1,
            x: 0,
            rotation: 0,
            duration: 1,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            }
        });
    });

    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        gsap.fromTo(item, {
            opacity: 0,
            x: -50
        }, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    gsap.fromTo('.architecture-diagram', {
        opacity: 0,
        scale: 0.8
    }, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.architecture-diagram',
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
        }
    });

    gsap.utils.toArray('.component-node').forEach((node, index) => {
        gsap.fromTo(node, {
            opacity: 0,
            scale: 0,
            rotation: 180
        }, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.architecture-diagram',
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse"
            }
        });
    });

    gsap.utils.toArray('.connection-line').forEach((line, index) => {
        gsap.fromTo(line, {
            strokeDashoffset: 100,
            opacity: 0
        }, {
            strokeDashoffset: 0,
            opacity: 0.6,
            duration: 1,
            delay: 1 + (index * 0.1),
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.architecture-diagram',
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse"
            }
        });
    });

    gsap.fromTo('.section-title', {
        opacity: 0,
        y: 30
    }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.section-title',
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
        }
    });

    gsap.fromTo('.section-subtitle', {
        opacity: 0,
        y: 20
    }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.2,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.section-subtitle',
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
        }
    });
}

function setupInteractiveElements() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            gsap.to(this, { 
                scale: 1.05, 
                duration: 0.3, 
                ease: "power2.out" 
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, { 
                scale: 1, 
                duration: 0.3, 
                ease: "power2.out" 
            });
        });

        btn.addEventListener('click', function(e) {
            if (this.textContent.includes('Explore Features')) {
                e.preventDefault();
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: '#features',
                    ease: "power3.inOut"
                });
            } else if (this.textContent.includes('Watch Demo')) {
                createRippleEffect(e, this);
                showDemoModal();
            }
        });
    });

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('.feature-icon'), {
                rotation: 360,
                duration: 0.6,
                ease: "power2.out"
            });
            
            gsap.to(this.querySelectorAll('.feature-tech span'), {
                y: -3,
                duration: 0.3,
                stagger: 0.05,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('.feature-icon'), {
                rotation: 0,
                duration: 0.4,
                ease: "power2.out"
            });
            
            gsap.to(this.querySelectorAll('.feature-tech span'), {
                y: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: "power2.out"
            });
        });
    });

    const impactCards = document.querySelectorAll('.impact-card');
    impactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('.impact-number'), {
                color: 'rgba(0, 212, 255, 0.3)',
                duration: 0.3
            });
            
            gsap.to(this.querySelector('.impact-visual'), {
                opacity: 0.6,
                scale: 1.1,
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('.impact-number'), {
                color: 'rgba(0, 212, 255, 0.1)',
                duration: 0.3
            });
            
            gsap.to(this.querySelector('.impact-visual'), {
                opacity: 0.3,
                scale: 1,
                duration: 0.3
            });
        });
    });

    const robotCore = document.querySelector('.robot-core');
    if (robotCore) {
        robotCore.addEventListener('click', function() {
            gsap.to(this, {
                rotation: 360,
                duration: 1,
                ease: "power2.inOut"
            });
            
            gsap.to('.robot-eye', {
                scaleY: 0.1,
                duration: 0.1,
                yoyo: true,
                repeat: 3
            });
            
            gsap.to('.energy-rings .ring', {
                scale: 1.5,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                onComplete: function() {
                    gsap.set('.energy-rings .ring', { scale: 1, opacity: 1 });
                }
            });
        });
    }

    animateCountingNumbers();
    setupParallaxEffects();
    setupFloatingElements();
}

function createRippleEffect(e, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(0, 212, 255, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '1000';

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    gsap.to(ripple, {
        scale: 4,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }
    });
}

function showDemoModal() {
    // Create demo modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'demo-modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
    `;

    const modalContent = document.createElement('div');
    modalContent.className = 'demo-modal-content';
    modalContent.style.cssText = `
        background: linear-gradient(135deg, #0A0F1C 0%, #1A2332 100%);
        border-radius: 20px;
        padding: 40px;
        max-width: 600px;
        width: 90%;
        text-align: center;
        border: 1px solid rgba(0, 212, 255, 0.3);
        position: relative;
        transform: scale(0.8);
    `;

    modalContent.innerHTML = `
        <div class="modal-close" style="
            position: absolute;
            top: 15px;
            right: 20px;
            color: #00D4FF;
            font-size: 24px;
            cursor: pointer;
            transition: all 0.3s ease;
        ">&times;</div>
        <div class="demo-icon" style="
            font-size: 80px;
            color: #00D4FF;
            margin-bottom: 20px;
        "><i class="fas fa-play-circle"></i></div>
        <h3 style="
            color: #FFFFFF;
            font-size: 28px;
            margin-bottom: 15px;
            font-weight: 600;
        ">AZORA Demo</h3>
        <p style="
            color: #B0C4DE;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 25px;
        ">Experience AZORA's capabilities in action. Watch our robot assistant demonstrate voice commands, object detection, navigation, and emotional awareness.</p>
        <div class="demo-features" style="
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-bottom: 25px;
        ">
            <div style="color: #00D4FF; font-size: 14px;">
                <i class="fas fa-microphone" style="margin-right: 8px;"></i>
                Voice Recognition
            </div>
            <div style="color: #00D4FF; font-size: 14px;">
                <i class="fas fa-eye" style="margin-right: 8px;"></i>
                Object Detection
            </div>
            <div style="color: #00D4FF; font-size: 14px;">
                <i class="fas fa-route" style="margin-right: 8px;"></i>
                Navigation
            </div>
            <div style="color: #00D4FF; font-size: 14px;">
                <i class="fas fa-heart" style="margin-right: 8px;"></i>
                Emotion Aware
            </div>
        </div>
        <button class="watch-btn" style="
            background: linear-gradient(135deg, #00D4FF 0%, #0099CC 100%);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        ">Coming Soon - Demo Reel</button>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Animate modal appearance
    gsap.to(modalOverlay, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
    });

    gsap.to(modalContent, {
        scale: 1,
        duration: 0.4,
        delay: 0.1,
        ease: "back.out(1.7)"
    });

    // Close modal functionality
    const closeModal = () => {
        gsap.to(modalOverlay, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
                if (modalOverlay.parentNode) {
                    modalOverlay.parentNode.removeChild(modalOverlay);
                }
            }
        });
    };

    modalContent.querySelector('.modal-close').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // Watch button interaction
    const watchBtn = modalContent.querySelector('.watch-btn');
    watchBtn.addEventListener('mouseenter', () => {
        gsap.to(watchBtn, { scale: 1.05, duration: 0.3 });
    });
    watchBtn.addEventListener('mouseleave', () => {
        gsap.to(watchBtn, { scale: 1, duration: 0.3 });
    });
}

function animateCountingNumbers() {
    const numbers = document.querySelectorAll('.impact-number');
    numbers.forEach(numberEl => {
        ScrollTrigger.create({
            trigger: numberEl,
            start: "top 80%",
            onEnter: () => {
                gsap.to(numberEl, {
                    textShadow: "0 0 20px rgba(0, 212, 255, 0.8)",
                    duration: 0.5,
                    yoyo: true,
                    repeat: 1
                });
            }
        });
    });
}

function setupParallaxEffects() {
    const floatingCircles = document.querySelectorAll('.floating-circle');
    floatingCircles.forEach((circle, index) => {
        gsap.to(circle, {
            y: "random(-50, 50)",
            x: "random(-30, 30)",
            duration: "random(4, 8)",
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.5
        });
    });

    // Parallax scroll effect for hero background
    gsap.to('.floating-elements', {
        y: "-50%",
        ease: "none",
        scrollTrigger: {
            trigger: '.hero-section',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
}

function setupFloatingElements() {
    // Animate robot eyes blinking
    const robotEyes = document.querySelectorAll('.robot-eye');
    if (robotEyes.length > 0) {
        setInterval(() => {
            gsap.to(robotEyes, {
                scaleY: 0.1,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        }, 3000 + Math.random() * 2000);
    }

    // Animate energy rings
    const energyRings = document.querySelectorAll('.ring');
    energyRings.forEach((ring, index) => {
        gsap.to(ring, {
            rotation: 360,
            duration: 8 + (index * 2),
            ease: "none",
            repeat: -1
        });

        gsap.to(ring, {
            scale: 1.1,
            duration: 2 + (index * 0.5),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });
    });

    // Add floating animation to impact visual elements
    const impactVisuals = document.querySelectorAll('.impact-visual');
    impactVisuals.forEach((visual, index) => {
        gsap.to(visual, {
            y: "random(-10, 10)",
            duration: "random(3, 5)",
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.2
        });
    });
}

document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: targetId, // Use the selector string, not the element
                ease: "power3.inOut"
            });
        }
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.demo-modal-overlay');
        if (modal) {
            gsap.to(modal, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    if (modal.parentNode) {
                        modal.parentNode.removeChild(modal);
                    }
                }
            });
        }
    }
});

// Performance optimization - pause animations when page is not visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        gsap.globalTimeline.pause();
    } else {
        gsap.globalTimeline.resume();
    }
});

// Initialize loading animation
window.addEventListener('load', function() {
    // Hide any loading screens and start main animations
    gsap.to('body', {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
    });
});