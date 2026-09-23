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

    if (showreelVideo) showreelVideo.preload = "metadata";
    popupVideo.preload = "auto";

    // Small message box inside the popup, shown only when a video fails to load
    const errorBox = document.createElement("div");
    errorBox.className = "video-error";
    popupVideo.insertAdjacentElement("afterend", errorBox);

    popupVideo.addEventListener("error", () => {
        if (!popupVideo.getAttribute("src")) return; // ignore the reset on close
        errorBox.textContent =
            "This video could not be loaded (" + popupVideo.getAttribute("src") + "). " +
            "Check that the file exists in the assets folder, the name matches exactly " +
            "(lowercase) and the file is a normal MP4 (H.264).";
        errorBox.classList.add("show");
    });

    function openModal(thumb) {
        const src = thumb.dataset.video;
        if (!src) return;

        if (showreelVideo) showreelVideo.pause();

        popupTitle.textContent = thumb.dataset.title || "";
        popupCategory.textContent = thumb.dataset.category || "";
        popupDescription.textContent = thumb.dataset.description || "";

        errorBox.classList.remove("show");
        popupVideo.src = src;
        popupVideo.load();

        modal.classList.add("active");
        document.body.style.overflow = "hidden";

        const playPromise = popupVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(err => console.warn("Video play problem:", err));
        }
    }

    function closeModal() {
        popupVideo.pause();
        popupVideo.removeAttribute("src");
        popupVideo.load();

        errorBox.classList.remove("show");
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }

    document.querySelectorAll(".video-thumbnail").forEach(thumb => {
        thumb.addEventListener("click", () => openModal(thumb));
    });

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", e => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
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
                const match = value === "all" || p.dataset.category === value;
                p.classList.toggle("hidden", !match);
            });
        });
    });


    /* ---------- Scroll reveal ---------- */
    const revealTargets = document.querySelectorAll(
        ".section, .hero-content, .showreel, .moving-text, footer"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05 });

        revealTargets.forEach(el => {
            el.classList.add("reveal");
            observer.observe(el);
        });
    }
});
