document.addEventListener("DOMContentLoaded", () => {
    const previews = document.querySelectorAll(".preview");
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("imgModalImg");
    const closeBtn = document.querySelector(".img-modal .close");

    // Falls auf einer Seite mal kein Modal oder keine Bilder sind:
    if (!modal || !modalImg || !closeBtn || previews.length === 0) return;

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
});
