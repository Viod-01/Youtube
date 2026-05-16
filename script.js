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
            mainContent.style.width = 'calc(100vw - 80px)';
            wrapper.style.left = '80px';
            wrapper.style.width = 'calc(100vw - 80px)';
        } else {
            mainContent.style.left = '240px';
            mainContent.style.width = 'calc(100vw - 240px)';
            wrapper.style.left = '240px';
            wrapper.style.width = 'calc(100vw - 240px)';
        }

    }

});
let resizeTimeout;

window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove("mini-sidebar");
        } else {
            sidebar.classList.remove("mobile-active");
            mainContent.classList.remove("blur");
        }
    }, 200);
});

document.querySelectorAll(".hover-video").forEach(video => {
    video.addEventListener("mouseenter", () => {
        video.play();
    });

    video.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
    });

    video.addEventListener("click", () => {
        video.muted = false;   
        video.play();
    });
});


document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("themeBtn");
  const icon = document.getElementById("themeIcon");

  btn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
      icon.classList.replace("ri-sun-line", "ri-moon-line");
    } else {
      icon.classList.replace("ri-moon-line", "ri-sun-line");
    }
  });
});