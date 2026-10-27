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

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
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
        // Falls localStorage nicht verfügbar ist
    }

    const systemPrefersDark = Boolean(
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );

    // Gespeicherte Einstellung hat Vorrang
    if (savedTheme === "dark") {
        root.classList.add("dark");
    } else if (savedTheme === "light") {
        root.classList.remove("dark");
    } else {
        root.classList.toggle("dark", systemPrefersDark);
    }

    function updateToggleIcon() {
        if (!toggleBtn) return;

        const isDark = root.classList.contains("dark");

        toggleBtn.textContent = isDark ? "☀️" : "🌙";

        toggleBtn.setAttribute(
            "aria-label",
            isDark
                ? "Light Mode aktivieren"
                : "Dark Mode aktivieren"
        );

        toggleBtn.setAttribute(
            "aria-pressed",
            String(isDark)
        );
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
                // Falls localStorage nicht verfügbar ist
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

        function updateIntroToggle(isOpen) {
            introToggle.innerHTML = isOpen
                ? 'Text ausblenden <span>↑</span>'
                : 'Text anzeigen <span>↓</span>';

            introToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        }

        updateIntroToggle(
            introText.classList.contains("open")
        );

        introToggle.addEventListener("click", () => {
            const isOpen = introText.classList.toggle("open");
            updateIntroToggle(isOpen);
        });
    }


    // ======================================
    // Mobile Navigation
    // ======================================

    const dropdowns = document.querySelectorAll("nav .dropdown");

    dropdowns.forEach((dropdown) => {
        const label = dropdown.querySelector(".nav-label");
        const menu = dropdown.querySelector(".dropdown-menu");

        // Leere Dropdowns wie
        // „Anthropologie & Ethik“ ignorieren
        if (!label || !menu || menu.children.length === 0) {
            return;
        }

        // Die vorhandenen span-Elemente auf
        // Mobilgeräten per Tastatur bedienbar machen
        label.setAttribute("role", "button");
        label.setAttribute("tabindex", "0");
        label.setAttribute("aria-expanded", "false");

        function toggleDropdown() {
            if (window.innerWidth > 700) {
                return;
            }

            const isOpen = dropdown.classList.toggle("open");

            label.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        }

        label.addEventListener("click", toggleDropdown);

        label.addEventListener("keydown", (event) => {
            if (
                window.innerWidth <= 700 &&
                (event.key === "Enter" || event.key === " ")
            ) {
                event.preventDefault();
                toggleDropdown();
            }
        });
    });

    // Geöffnete mobile Dropdowns beim Wechsel
    // zur Desktopansicht zurücksetzen
    window.addEventListener("resize", () => {
        if (window.innerWidth > 700) {
            dropdowns.forEach((dropdown) => {
                dropdown.classList.remove("open");

                const label = dropdown.querySelector(".nav-label");

                if (label && label.hasAttribute("aria-expanded")) {
                    label.setAttribute("aria-expanded", "false");
                }
            });
        }
    });


    // ======================================
    // Klausuren – Passwortschutz
    // ======================================

    const klausurBereiche = document.querySelectorAll(".klausuren");
    const klausurPasswort = "ref-ru";
    const klausurSessionKey = "klausurenFreigeschaltet";

    let klausurenFreigeschaltet = false;

    try {
        klausurenFreigeschaltet =
            sessionStorage.getItem(klausurSessionKey) === "true";
    } catch (e) {
        // Falls sessionStorage nicht verfügbar ist
    }

    function zeigeKlausurmaterial(bereich) {
        const login = bereich.querySelector(".klausur-login");
        const material = bereich.querySelector(".klausur-material");
        const fehler = bereich.querySelector(".klausur-fehler");

        if (login) {
            login.style.display = "none";
        }

        if (material) {
            material.style.display = "flex";
        }

        if (fehler) {
            fehler.style.display = "none";
        }
    }

    klausurBereiche.forEach((bereich) => {
        const eingabe = bereich.querySelector(".klausur-passwort");
        const button = bereich.querySelector(".klausur-button");
        const fehler = bereich.querySelector(".klausur-fehler");

        if (!eingabe || !button) {
            return;
        }

        if (klausurenFreigeschaltet) {
            zeigeKlausurmaterial(bereich);
            return;
        }

        function pruefePasswort() {
            if (eingabe.value === klausurPasswort) {
                klausurenFreigeschaltet = true;

                try {
                    sessionStorage.setItem(
                        klausurSessionKey,
                        "true"
                    );
                } catch (e) {
                    // Falls sessionStorage nicht verfügbar ist
                }

                klausurBereiche.forEach(zeigeKlausurmaterial);
            } else {
                if (fehler) {
                    fehler.style.display = "block";
                }

                eingabe.value = "";
                eingabe.focus();
            }
        }

        button.addEventListener("click", pruefePasswort);

        eingabe.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                pruefePasswort();
            }
        });
    });


    // ======================================
    // Karussell der Unterrichtseinheiten
    // ======================================

    const carouselTrack = document.querySelector(
        ".units-carousel-track"
    );

    const carouselCards = document.querySelectorAll(
        ".units-carousel-track > .unit-card"
    );

    const carouselPrev = document.querySelector(
        ".units-carousel-prev"
    );

    const carouselNext = document.querySelector(
        ".units-carousel-next"
    );

    const carouselDots = document.querySelectorAll(
        ".units-carousel-dots button"
    );

    if (carouselTrack && carouselCards.length > 0) {

        let currentSlide = 0;

        const carouselViewport = carouselTrack.parentElement;

        function updateCarouselHeight() {
            if (!carouselViewport) return;

            const activeCard = carouselCards[currentSlide];

            carouselViewport.style.height =
                `${activeCard.offsetHeight}px`;
        }

        function showSlide(index) {
            currentSlide =
                (index + carouselCards.length) %
                carouselCards.length;

            carouselTrack.style.transform =
                `translateX(-${currentSlide * 100}%)`;

            carouselDots.forEach((dot, i) => {
                const isActive = i === currentSlide;

                dot.classList.toggle("active", isActive);

                if (isActive) {
                    dot.setAttribute("aria-current", "true");
                } else {
                    dot.removeAttribute("aria-current");
                }
            });

            carouselCards.forEach((card, i) => {
                const isInactive = i !== currentSlide;

                card.inert = isInactive;

                card.setAttribute(
                    "aria-hidden",
                    String(isInactive)
                );
            });

            updateCarouselHeight();
        }

        if (carouselPrev) {
            carouselPrev.addEventListener("click", () => {
                showSlide(currentSlide - 1);
            });
        }

        if (carouselNext) {
            carouselNext.addEventListener("click", () => {
                showSlide(currentSlide + 1);
            });
        }

        carouselDots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                showSlide(index);
            });
        });

        // Ausgangszustand herstellen
        showSlide(0);

        // Höhe bei Fenstergrößenänderung aktualisieren
        window.addEventListener(
            "resize",
            updateCarouselHeight
        );

        // Höhe bei nachträglichen Größenänderungen
        // der aktiven Karte aktualisieren
        if ("ResizeObserver" in window) {
            const resizeObserver = new ResizeObserver(() => {
                updateCarouselHeight();
            });

            carouselCards.forEach((card) => {
                resizeObserver.observe(card);
            });
        }

        // Höhe nach dem Laden der Bilder aktualisieren
        carouselCards.forEach((card) => {
            const image = card.querySelector("img");

            if (image && !image.complete) {
                image.addEventListener(
                    "load",
                    updateCarouselHeight
                );
            }
        });
    }
});

