// ==============================
// CURRENT YEAR
// ==============================

document.getElementById("year").textContent =
    new Date().getFullYear();


// ==============================
// PORTFOLIO FILTER
// ==============================

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

filters.forEach(function (filter) {

    filter.addEventListener("click", function () {

        // Remove active class
        filters.forEach(function (button) {
            button.classList.remove("active");
        });

        // Add active class
        filter.classList.add("active");

        const selectedCategory =
            filter.getAttribute("data-filter");

        projects.forEach(function (project) {

            const projectCategory =
                project.getAttribute("data-category");

            if (
                selectedCategory === "all" ||
                selectedCategory === projectCategory
            ) {

                project.classList.remove("hidden");

            } else {

                project.classList.add("hidden");

            }

        });

    });

});


// ==============================
// VIDEO POPUP
// ==============================

const videoThumbnails =
    document.querySelectorAll(".video-thumbnail");

const videoModal =
    document.getElementById("videoModal");

const popupVideo =
    document.getElementById("popupVideo");

const closeVideo =
    document.getElementById("closeVideo");


// ==============================
// POPUP INFORMATION
// ==============================

const popupTitle =
    document.getElementById("popupTitle");

const popupCategory =
    document.getElementById("popupCategory");

const popupDescription =
    document.getElementById("popupDescription");


// ==============================
// OPEN VIDEO
// ==============================

videoThumbnails.forEach(function (thumbnail) {

    thumbnail.addEventListener("click", function () {

        // Get video file
        const videoFile =
            thumbnail.getAttribute("data-video");

        // Get project information
        const title =
            thumbnail.getAttribute("data-title");

        const category =
            thumbnail.getAttribute("data-category");

        const description =
            thumbnail.getAttribute("data-description");


        // Set video
        popupVideo.src = videoFile;


        // Set popup information
        popupTitle.textContent =
            title || "Project";

        popupCategory.textContent =
            category || "PORTFOLIO";

        popupDescription.textContent =
            description || "A creative project by D eye M.";


        // Show popup
        videoModal.classList.add("active");


        // Play video
        popupVideo.play();

    });

});


// ==============================
// CLOSE VIDEO FUNCTION
// ==============================

function closeVideoPopup() {

    popupVideo.pause();

    popupVideo.currentTime = 0;

    popupVideo.src = "";

    videoModal.classList.remove("active");

}


// ==============================
// CLOSE BUTTON
// ==============================

closeVideo.addEventListener("click", function () {

    closeVideoPopup();

});


// ==============================
// CLOSE WHEN CLICKING OUTSIDE
// ==============================

videoModal.addEventListener("click", function (event) {

    if (event.target === videoModal) {

        closeVideoPopup();

    }

});


// ==============================
// CLOSE WITH ESCAPE KEY
// ==============================

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeVideoPopup();

    }
// ==============================
// SCROLL REVEAL ANIMATION
// ==============================

const animatedElements = document.querySelectorAll(
    ".section, .hero-content, .showreel, .moving-text, footer"
);

const revealObserver = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.12
    }
);

animatedElements.forEach(function (element) {

    revealObserver.observe(element);


});