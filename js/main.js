document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;

    // --------------------------------------
    // Bild-Modal (Zoom auf .preview-Bilder)
    // --------------------------------------
    const previews = document.querySelectorAll(".preview");
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("imgModalImg");
    const closeBtn = document.querySelector(".img-modal .close");

    if (modal && modalImg && closeBtn && previews.length > 0) {
        previews.forEach(img => {
            img.addEventListener("click", () => {
                modal.style.display = "block";
                modalImg.src = img.src;
            });
        });

        closeBtn.onclick = () => {
            modal.style.display = "none";
        };

        modal.onclick = (e) => {
            if (e.target === modal) modal.style.display = "none";
        };
    }

    // --------------------------------------
    // Dark Mode
    // --------------------------------------
    const toggleBtn = document.getElementById("themeToggle");

    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Initial Theme setzen (falls noch keine Klasse da ist)
    if (!root.classList.contains("dark") &&
        (savedTheme === "dark" || (!savedTheme && systemPrefersDark))) {
        root.classList.add("dark");
    }

    function updateToggleIcon() {
        if (!toggleBtn) return;
        const isDark = root.classList.contains("dark");
        toggleBtn.textContent = isDark ? "☀️" : "🌙";
    }

    updateToggleIcon();

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const isDark = root.classList.toggle("dark");
            try {
                localStorage.setItem("theme", isDark ? "dark" : "light");
            } catch (e) {
                // wenn localStorage blockiert ist, einfach ignorieren
            }
            updateToggleIcon();
        });
    }

        // --------------------------------------
    // Einleitungstext ein-/ausblenden
    // --------------------------------------
    const introText = document.querySelector(".intro-text");
    const introToggle = document.querySelector(".intro-toggle");

    if (introText && introToggle) {
        introToggle.addEventListener("click", () => {
            const isOpen = introText.classList.toggle("open");

            if (isOpen) {
                introToggle.innerHTML = 'Text ausblenden <span>↑</span>';
            } else {
                introToggle.innerHTML = 'Text anzeigen <span>↓</span>';
            }
        });
    }

        // --------------------------------------
    // Unterrichtseinheiten – Karussell
    // --------------------------------------

    const carouselTrack = document.querySelector(".carousel-track");
    const carouselPrev = document.querySelector(".carousel-prev");
    const carouselNext = document.querySelector(".carousel-next");
    const carouselDots = document.querySelector(".carousel-dots");
    const unitCards = document.querySelectorAll(".unit-card");

    if (
        carouselTrack &&
        carouselPrev &&
        carouselNext &&
        carouselDots &&
        unitCards.length > 0
    ) {
        let currentSlide = 0;

        // Punkte erzeugen
        unitCards.forEach((_, index) => {
            const dot = document.createElement("button");

            dot.className = "carousel-dot";
            dot.type = "button";
            dot.setAttribute(
                "aria-label",
                `Unterrichtseinheit ${index + 1} anzeigen`
            );

            dot.addEventListener("click", () => {
                showSlide(index);
            });

            carouselDots.appendChild(dot);
        });

        const dots = carouselDots.querySelectorAll(".carousel-dot");

        function showSlide(index) {
            if (index < 0) {
                index = unitCards.length - 1;
            }

            if (index >= unitCards.length) {
                index = 0;
            }

            currentSlide = index;

            carouselTrack.style.transform =
                `translateX(-${currentSlide * 100}%)`;

            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle(
                    "active",
                    dotIndex === currentSlide
                );
            });
        }

        carouselPrev.addEventListener("click", () => {
            showSlide(currentSlide - 1);
        });

        carouselNext.addEventListener("click", () => {
            showSlide(currentSlide + 1);
        });

        // Erste Karte anzeigen
        showSlide(0);
    }
    
});
