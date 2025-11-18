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

    // Initial Theme setzen
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
        root.classList.add("dark");
    } else {
        root.classList.remove("dark");
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
            localStorage.setItem("theme", isDark ? "dark" : "light");
            updateToggleIcon();
        });
    }

    // --------------------------------------
    // Theme-Animation erst NACH Init aktivieren
    // --------------------------------------
    root.classList.add("theme-ready");
});
