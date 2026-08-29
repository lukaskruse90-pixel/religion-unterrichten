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

    ```javascript
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
```

Wichtig: **Nicht als neues `<script>` einfügen**, sondern in deine vorhandene Funktion:

```javascript
document.addEventListener("DOMContentLoaded", () => {
    ...
    
    // hier einfügen

});
```

});
