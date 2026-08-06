// ============================================================
// MOBILE SIDEBAR TOGGLE
// ============================================================
const menuBtn = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");

if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        menuBtn.classList.toggle("active");
    });
}

// ============================================================
// ACTIVE NAV LINK (based on current page)
// ============================================================
const navLinks = document.querySelectorAll(".sidebar-nav a");
const currentPage = window.location.pathname.split("/").pop() || "index.html";

navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
        link.classList.add("active");
    }
});

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ============================================================
// STAT COUNTER ANIMATION
// ============================================================
const counters = document.querySelectorAll(".stat-number");

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10) || 0;
            let current = 0;
            const step = Math.max(1, Math.ceil(target / 40));

            const tick = () => {
                current += step;
                if (current >= target) {
                    el.textContent = target;
                } else {
                    el.textContent = current;
                    requestAnimationFrame(tick);
                }
            };
            tick();
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));
