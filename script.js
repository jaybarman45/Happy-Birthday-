/* =========================================================
   A SPECIAL WISH FOR TAPATI
   Main JavaScript
========================================================= */

"use strict";


/* =========================================================
   01. DOM ELEMENTS
========================================================= */

const siteHeader = document.getElementById("siteHeader");

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

const backToTop = document.getElementById("backToTop");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const lightboxCounter = document.getElementById("lightboxCounter");

const galleryButtons = document.querySelectorAll(".gallery-button");

const surpriseButton = document.getElementById("surpriseButton");
const finalMessage = document.getElementById("finalMessage");

const confettiContainer = document.getElementById("confettiContainer");
const heartBurst = document.getElementById("heartBurst");

const birthdayVideo = document.getElementById("birthdayVideo");


/* =========================================================
   02. CONSTANTS
========================================================= */

const galleryImages = [
    "photo1.jpg",
    "photo2.jpg",
    "photo3.jpg",
    "photo4.jpg",
    "photo5.jpg",
    "photo6.jpg"
];

const galleryAltTexts = [
    "Tapati - photo 1",
    "Tapati - photo 2",
    "Tapati - photo 3",
    "Tapati - photo 4",
    "Tapati - photo 5",
    "Tapati - photo 6"
];

let currentImageIndex = 0;


/* =========================================================
   03. NAVIGATION
========================================================= */

function closeMobileMenu() {
    navMenu.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}


function toggleMobileMenu() {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );
}


if (menuToggle) {
    menuToggle.addEventListener(
        "click",
        toggleMobileMenu
    );
}


document.querySelectorAll(".nav-menu a").forEach((link) => {

    link.addEventListener("click", () => {
        closeMobileMenu();
    });

});


document.addEventListener("click", (event) => {

    if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        closeMobileMenu();
    }

});


/* =========================================================
   04. HEADER SCROLL STATE
========================================================= */

function updateHeader() {

    if (window.scrollY > 40) {
        siteHeader.classList.add("scrolled");
    } else {
        siteHeader.classList.remove("scrolled");
    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();


/* =========================================================
   05. SMOOTH SCROLLING
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#" ||
            targetId.length <= 1
        ) {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   06. SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale"
);


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        });

    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    }
);


revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================================
   07. FLOATING PARTICLES
========================================================= */

function createParticles() {

    const particlesContainer =
        document.querySelector(".particles");

    if (!particlesContainer) {
        return;
    }

    const fragment = document.createDocumentFragment();

    const particleCount =
        window.innerWidth < 600 ? 16 : 28;

    for (let i = 0; i < particleCount; i++) {

        const particle =
            document.createElement("span");

        const size =
            Math.random() * 4 + 2;

        const left =
            Math.random() * 100;

        const top =
            Math.random() * 100;

        const duration =
            Math.random() * 8 + 7;

        const delay =
            Math.random() * 5;

        particle.style.position = "absolute";
        particle.style.left = `${left}%`;
        particle.style.top = `${top}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = "50%";
        particle.style.background =
            "rgba(233, 30, 99, 0.18)";
        particle.style.animation =
            `particleFloat ${duration}s ease-in-out ${delay}s infinite alternate`;

        fragment.appendChild(particle);
    }

    particlesContainer.appendChild(fragment);
}


const particleAnimationStyle =
    document.createElement("style");

particleAnimationStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translate3d(0, 0, 0);
            opacity: 0.2;
        }

        50% {
            opacity: 0.7;
        }

        100% {
            transform: translate3d(
                ${Math.random() * 30 - 15}px,
                ${Math.random() * 40 - 20}px,
                0
            );
            opacity: 0.25;
        }
    }
`;

document.head.appendChild(particleAnimationStyle);

createParticles();


/* =========================================================
   08. FLOATING HEARTS
========================================================= */

function createFloatingHearts() {

    const container =
        document.querySelector(".floating-hearts");

    if (!container) {
        return;
    }

    const fragment = document.createDocumentFragment();

    const heartCount =
        window.innerWidth < 600 ? 7 : 12;

    for (let i = 0; i < heartCount; i++) {

        const heart =
            document.createElement("span");

        heart.textContent = "♡";

        heart.style.position = "absolute";
        heart.style.left =
            `${Math.random() * 100}%`;
        heart.style.top =
            `${Math.random() * 100}%`;

        heart.style.color =
            "rgba(233, 30, 99, 0.15)";

        heart.style.fontSize =
            `${Math.random() * 15 + 10}px`;

        heart.style.animation =
            `heartFloat ${Math.random() * 8 + 8}s ease-in-out ${Math.random() * 5}s infinite alternate`;

        fragment.appendChild(heart);
    }

    container.appendChild(fragment);
}


const heartAnimationStyle =
    document.createElement("style");

heartAnimationStyle.textContent = `
    @keyframes heartFloat {
        0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
            opacity: 0.15;
        }

        50% {
            opacity: 0.4;
        }

        100% {
            transform: translate3d(15px, -35px, 0) rotate(12deg);
            opacity: 0.1;
        }
    }
`;

document.head.appendChild(heartAnimationStyle);

createFloatingHearts();


/* =========================================================
   09. LIGHTBOX
========================================================= */

function openLightbox(index) {

    currentImageIndex = index;

    updateLightbox();

    lightbox.classList.add("active");

    lightbox.setAttribute("aria-hidden", "false");

    document.body.classList.add("no-scroll");

    lightboxClose.focus();
}


function closeLightbox() {

    lightbox.classList.remove("active");

    lightbox.setAttribute("aria-hidden", "true");

    document.body.classList.remove("no-scroll");

}


function updateLightbox() {

    lightboxImage.src =
        galleryImages[currentImageIndex];

    lightboxImage.alt =
        galleryAltTexts[currentImageIndex];

    lightboxCounter.textContent =
        `${currentImageIndex + 1} / ${galleryImages.length}`;

}


function showPreviousImage() {

    currentImageIndex =
        (currentImageIndex - 1 + galleryImages.length)
        % galleryImages.length;

    updateLightbox();

}


function showNextImage() {

    currentImageIndex =
        (currentImageIndex + 1)
        % galleryImages.length;

    updateLightbox();

}


galleryButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const index =
            Number(button.dataset.index);

        openLightbox(index);

    });

});


lightboxClose.addEventListener(
    "click",
    closeLightbox
);


lightboxPrev.addEventListener(
    "click",
    showPreviousImage
);


lightboxNext.addEventListener(
    "click",
    showNextImage
);


lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


/* =========================================================
   10. LIGHTBOX KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowLeft") {
        showPreviousImage();
    }

    if (event.key === "ArrowRight") {
        showNextImage();
    }

});


/* =========================================================
   11. VIDEO
========================================================= */

if (birthdayVideo) {

    birthdayVideo.addEventListener(
        "play",
        () => {
            birthdayVideo.parentElement.classList.add(
                "video-playing"
            );
        }
    );

    birthdayVideo.addEventListener(
        "pause",
        () => {
            birthdayVideo.parentElement.classList.remove(
                "video-playing"
            );
        }
    );

}


/* =========================================================
   12. HEART BURST
========================================================= */

function createHeartBurst() {

    if (!heartBurst) {
        return;
    }

    const hearts = 22;

    for (let i = 0; i < hearts; i++) {

        const heart =
            document.createElement("span");

        heart.className = "burst-heart";

        heart.textContent =
            Math.random() > 0.35 ? "♡" : "♥";

        const angle =
            (Math.PI * 2 * i) / hearts;

        const distance =
            90 + Math.random() * 170;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        const rotation =
            Math.random() * 80 - 40;

        heart.style.setProperty(
            "--x",
            `${x}px`
        );

        heart.style.setProperty(
            "--y",
            `${y}px`
        );

        heart.style.setProperty(
            "--rotation",
            `${rotation}deg`
        );

        heart.style.left = "50%";
        heart.style.top = "50%";

        heart.style.color =
            Math.random() > 0.4
                ? "#E91E63"
                : "#FF9BC2";

        heartBurst.appendChild(heart);

        heart.addEventListener(
            "animationend",
            () => {
                heart.remove();
            }
        );

    }

}


/* =========================================================
   13. CONFETTI
========================================================= */

function createConfetti() {

    if (!confettiContainer) {
        return;
    }

    const pieces =
        window.innerWidth < 600 ? 55 : 90;

    const fragment =
        document.createDocumentFragment();

    const confettiCharacters = [
        "♡",
        "✦",
        "•"
    ];

    for (let i = 0; i < pieces; i++) {

        const piece =
            document.createElement("span");

        piece.className = "confetti";

        const useSymbol =
            Math.random() > 0.65;

        if (useSymbol) {
            piece.textContent =
                confettiCharacters[
                    Math.floor(
                        Math.random() *
                        confettiCharacters.length
                    )
                ];

            piece.style.width = "auto";
            piece.style.height = "auto";
            piece.style.background = "transparent";
            piece.style.fontSize =
                `${Math.random() * 8 + 10}px`;

        } else {

            piece.style.width =
                `${Math.random() * 5 + 5}px`;

            piece.style.height =
                `${Math.random() * 8 + 8}px`;

            piece.style.background =
                Math.random() > 0.5
                    ? "#E91E63"
                    : "#FF9BC2";
        }

        piece.style.left =
            `${Math.random() * 100}%`;

        piece.style.setProperty(
            "--duration",
            `${Math.random() * 2.2 + 2.5}s`
        );

        piece.style.setProperty(
            "--drift",
            `${Math.random() * 220 - 110}px`
        );

        piece.style.setProperty(
            "--rotation",
            `${Math.random() * 360}deg`
        );

        piece.style.animationDelay =
            `${Math.random() * 0.7}s`;

        fragment.appendChild(piece);

    }

    confettiContainer.appendChild(fragment);


    window.setTimeout(() => {

        confettiContainer.innerHTML = "";

    }, 5000);

}


/* =========================================================
   14. FINAL SURPRISE
========================================================= */

let surpriseActivated = false;


function activateSurprise() {

    if (surpriseActivated) {
        return;
    }

    surpriseActivated = true;

    finalMessage.classList.add("show");

    finalMessage.setAttribute(
        "aria-hidden",
        "false"
    );

    surpriseButton.setAttribute(
        "aria-expanded",
        "true"
    );

    createHeartBurst();

    window.setTimeout(
        createConfetti,
        150
    );

    window.setTimeout(() => {

        finalMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 350);

}


if (surpriseButton) {

    surpriseButton.addEventListener(
        "click",
        activateSurprise
    );

}


/* =========================================================
   15. BACK TO TOP
========================================================= */

function updateBackToTop() {

    if (window.scrollY > 500) {

        backToTop.classList.add("visible");

    } else {

        backToTop.classList.remove("visible");

    }

}


window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
);


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================================
   16. RESIZE HANDLING
========================================================= */

let resizeTimer;


window.addEventListener("resize", () => {

    window.clearTimeout(resizeTimer);

    resizeTimer = window.setTimeout(() => {

        if (window.innerWidth > 700) {
            closeMobileMenu();
        }

    }, 150);

});


/* =========================================================
   17. INITIAL ACCESSIBILITY STATE
========================================================= */

lightbox.setAttribute(
    "aria-hidden",
    "true"
);

finalMessage.setAttribute(
    "aria-hidden",
    "true"
);


/* =========================================================
   18. PAGE LOAD
========================================================= */

window.addEventListener("load", () => {

    document.body.classList.add("page-loaded");

});