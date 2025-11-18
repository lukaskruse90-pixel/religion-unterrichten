document.addEventListener("DOMContentLoaded", () => {
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
    const root = document.documentElement;

    // gespeicherte Einstellung lesen
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
        root.classList.add("dark");
    }

    // Icon passend setzen
    function updateToggleIcon() {
        if (!toggleBtn) return;
        const isDark = root.classList.contains("dark");
        toggleBtn.textContent = isDark ? "☀️" : "🌙";
    }
    updateToggleIcon();

    // Klick auf Button: Modus umschalten + merken
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const isDark = root.classList.toggle("dark");
            localStorage.setItem("theme", isDark ? "dark" : "light");
            updateToggleIcon();
        });
    }
        // Nachdem Theme initial gesetzt wurde, Animationen aktivieren
    document.documentElement.classList.add("theme-ready");
});

});
