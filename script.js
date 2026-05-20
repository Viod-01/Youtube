const menuIcon = document.querySelector('#but');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.content-main');
const wrapper = document.querySelector('.wrapper');

menuIcon.addEventListener('click', function () {
    if (window.innerWidth <= 768) {
        /* Mobile mode */
        sidebar.classList.toggle('mobile-active');
        mainContent.classList.toggle('blur');
    } else {
        /* Desktop mode */
        sidebar.classList.toggle('mini-sidebar');

        if (sidebar.classList.contains('mini-sidebar')) {
            mainContent.style.left = '80px';
            mainContent.style.width = 'calc(100% - 80px)';
            wrapper.style.left = '80px';
            wrapper.style.width = 'calc(100% - 80px)';
        } else {
            mainContent.style.left = '240px';
            mainContent.style.width = 'calc(100% - 240px)';
            wrapper.style.left = '240px';
            wrapper.style.width = 'calc(100% - 240px)';
        }
    }
});

// Optimized resize handler - use requestAnimationFrame to prevent layout thrashing
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
        requestAnimationFrame(() => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove("mini-sidebar");
                mainContent.style.left = '0';
                mainContent.style.width = '100%';
                wrapper.style.left = '0';
                wrapper.style.width = '100%';
            } else {
                sidebar.classList.remove("mobile-active");
                mainContent.classList.remove("blur");
                mainContent.style.left = '240px';
                mainContent.style.width = 'calc(100% - 240px)';
                wrapper.style.left = '240px';
                wrapper.style.width = 'calc(100% - 240px)';
            }
        });
    }, 150);
});

// Optimized video hover - use event delegation and reduce repaints
const videoContainer = document.querySelector('.content-main');

// Only add hover listeners on desktop (not mobile)
if (window.innerWidth > 768) {
    videoContainer?.addEventListener('mouseenter', (e) => {
        if (e.target.classList.contains('hover-video')) {
            // e.target.muted = false;
            e.target.play().catch(() => {});
        }
    }, true);

    videoContainer?.addEventListener('mouseleave', (e) => {
        if (e.target.classList.contains('hover-video')) {
            e.target.pause();
            e.target.currentTime = 0;
            // e.target.muted = true;
        }
    }, true);
}

videoContainer?.addEventListener('click', (e) => {
    if (e.target.classList.contains('hover-video')) {
        e.target.muted = !e.target.muted;
        if (!e.target.paused) {
            e.target.play().catch(() => {});
        }
    }
}, true);


// Theme toggle
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("themeBtn");
    const icon = document.getElementById("themeIcon");

    btn?.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            icon.classList.replace("ri-sun-line", "ri-moon-line");
        } else {
            icon.classList.replace("ri-moon-line", "ri-sun-line");
        }
    });
});


// Auto-play videos on mobile when in viewport
if (window.innerWidth < 768) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.volume = 10;
                video.muted = false;
                video.play().catch(() => {
                    video.muted = true;
                    video.play().catch(() => {});
                });
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });
    }, {
        threshold: 1.0
    });

    const videos = document.querySelectorAll('.hover-video');
    videos.forEach((video) => {
        videoObserver.observe(video);
    });
}