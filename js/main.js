document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;


    // ======================================
    // Bild-Modal
    // ======================================

    const previews = document.querySelectorAll(".preview");
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("imgModalImg");
    const closeBtn = document.querySelector(".img-modal .close");

    if (modal && modalImg && closeBtn && previews.length > 0) {

        function closeModal() {
            modal.style.display = "none";
        }

        previews.forEach((img) => {
            img.addEventListener("click", () => {
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                modal.style.display = "block";
            });
        });

        closeBtn.addEventListener("click", closeModal);

        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }


    // ======================================
    // Dark Mode
    // ======================================

    const toggleBtn = document.getElementById("themeToggle");

    let savedTheme = null;

    try {
        savedTheme = localStorage.getItem("theme");
    } catch (e) {
        // Wenn localStorage blockiert ist, einfach ignorieren
    }

    const systemPrefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Initiales Theme setzen, falls noch keine Dark-Mode-Klasse vorhanden ist
    if (
        !root.classList.contains("dark") &&
        (
            savedTheme === "dark" ||
            (!savedTheme && systemPrefersDark)
        )
    ) {
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
                localStorage.setItem(
                    "theme",
                    isDark ? "dark" : "light"
                );
            } catch (e) {
                // Wenn localStorage blockiert ist, einfach ignorieren
            }

            updateToggleIcon();
        });
    }


    // ======================================
    // Einleitungstext ein-/ausblenden
    // ======================================

    const introText = document.querySelector(".intro-text");
    const introToggle = document.querySelector(".intro-toggle");

    if (introText && introToggle) {
        introToggle.addEventListener("click", () => {
            const isOpen = introText.classList.toggle("open");

            introToggle.innerHTML = isOpen
                ? 'Text ausblenden <span>↑</span>'
                : 'Text anzeigen <span>↓</span>';
        });
    }


    // ======================================
    // Startseite – Bild-Karussell
    // ======================================

    const carouselTrack = document.querySelector(".carousel-track");
    const carouselPrev = document.querySelector(".carousel-prev");
    const carouselNext = document.querySelector(".carousel-next");

    if (carouselTrack && carouselPrev && carouselNext) {

        const slides = Array.from(
            carouselTrack.querySelectorAll(".teaser-slide")
        );

        let currentSlide = 0;

        // Fisher-Yates-Shuffle:
        // erzeugt bei jedem Seitenaufruf eine zufällige Reihenfolge
        for (let i = slides.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [slides[i], slides[j]] = [slides[j], slides[i]];
        }

        // Gemischte Reihenfolge ins DOM übernehmen
        slides.forEach((slide) => {
            carouselTrack.appendChild(slide);
        });

        function showSlide(index) {

            if (index < 0) {
                index = slides.length - 1;
            }

            if (index >= slides.length) {
                index = 0;
            }

            currentSlide = index;

            carouselTrack.style.transform =
                `translateX(-${currentSlide * 100}%)`;
        }

        carouselPrev.addEventListener("click", () => {
            showSlide(currentSlide - 1);
        });

        carouselNext.addEventListener("click", () => {
            showSlide(currentSlide + 1);
        });

        // Erstes zufälliges Bild positionieren
        showSlide(0);

        // Karussell erst danach sichtbar machen,
        // damit das erste HTML-Bild nicht kurz aufblitzt
        carouselTrack.classList.add("ready");
    }

});
