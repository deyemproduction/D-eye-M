document.addEventListener("DOMContentLoaded", () => {

    /* ---------- Footer year ---------- */
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Video popup ---------- */
    const modal = document.getElementById("videoModal");
    const popupVideo = document.getElementById("popupVideo");
    const popupTitle = document.getElementById("popupTitle");
    const popupCategory = document.getElementById("popupCategory");
    const popupDescription = document.getElementById("popupDescription");
    const closeBtn = document.getElementById("closeVideo");
    const showreelVideo = document.querySelector(".showreel video");

    function openModal(thumb) {
        const src = thumb.dataset.video;
        if (!src) return;

        // pause the hero showreel so two videos don't play together
        if (showreelVideo) showreelVideo.pause();

        popupTitle.textContent = thumb.dataset.title || "";
        popupCategory.textContent = thumb.dataset.category || "";
        popupDescription.textContent = thumb.dataset.description || "";

        popupVideo.src = src;
        popupVideo.load();

        modal.classList.add("active", "open", "show");
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";

        // Click counts as a user gesture, so play() is allowed
        const playPromise = popupVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(err => {
                console.warn("Autoplay blocked or video failed:", err);
            });
        }
    }

    function closeModal() {
        popupVideo.pause();
        popupVideo.removeAttribute("src");
        popupVideo.load();

        modal.classList.remove("active", "open", "show");
        modal.style.display = "none";
        document.body.style.overflow = "";
    }

    document.querySelectorAll(".video-thumbnail").forEach(thumb => {
        thumb.addEventListener("click", () => openModal(thumb));
    });

    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    // click on dark backdrop closes
    modal.addEventListener("click", e => {
        if (e.target === modal) closeModal();
    });

    // Esc key closes
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && modal.style.display === "flex") closeModal();
    });

    /* ---------- Portfolio filters ---------- */
    const filters = document.querySelectorAll(".filter");
    const projects = document.querySelectorAll(".project");

    filters.forEach(btn => {
        btn.addEventListener("click", () => {
            filters.forEach(f => f.classList.remove("active"));
            btn.classList.add("active");

            const value = btn.dataset.filter;
            projects.forEach(p => {
                const show = value === "all" || p.dataset.category === value;
                p.style.display = show ? "" : "none";
            });
        });
    });
});
