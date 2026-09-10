// =========================================================
// BHUMI GLOBAL NUSANTARA - INTERACTIONS
// =========================================================

const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link, .nav-cta");

// Mobile navigation
navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.style.overflow = isOpen ? "hidden" : "";

  const bars = navToggle.querySelectorAll("span");
  if (isOpen) {
    bars[0].style.transform = "translateY(8px) rotate(45deg)";
    bars[1].style.opacity = "0";
    bars[2].style.transform = "translateY(-8px) rotate(-45deg)";
  } else {
    bars[0].style.transform = "";
    bars[1].style.opacity = "";
    bars[2].style.transform = "";
  }
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";

    const bars = navToggle.querySelectorAll("span");
    bars.forEach(bar => {
      bar.style.transform = "";
      bar.style.opacity = "";
    });
  });
});

// Active navigation based on section in viewport
const sections = document.querySelectorAll("main section[id], header[id]");
const menuLinks = document.querySelectorAll(".nav-link");

const activeObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        menuLinks.forEach(link => link.classList.remove("active"));
        const current = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (current) current.classList.add("active");
      }
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
);

sections.forEach(section => activeObserver.observe(section));

// Scroll reveal
const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach(item => revealObserver.observe(item));

// Contact form -> WhatsApp
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const email = document.getElementById("email").value.trim();
  const subjek = document.getElementById("subjek").value.trim();
  const pesan = document.getElementById("pesan").value.trim();

  const text =
`Halo PT. Bhumi Global Nusantara,

Nama: ${nama}
Email: ${email}
Subjek: ${subjek}

Pesan:
${pesan}`;

  window.open(
    `https://wa.me/628158834115?text=${encodeURIComponent(text)}`,
    "_blank",
    "noopener,noreferrer"
  );

});
function openModal(src) {
  document.getElementById("imageModal").style.display = "flex";
  document.getElementById("modalImg").src = src;
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}