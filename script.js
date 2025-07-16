// Animation for slide-in sections on scroll
document.addEventListener("DOMContentLoaded", function () {
  // Show fade-in header/footer/navigation immediately
  document.querySelectorAll('.fade-in').forEach(el => {
    el.classList.add("visible");
  });

  // Animate sections as they enter viewport
  function revealSections() {
    document.querySelectorAll('.slide-in').forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 70) {
        section.classList.add("visible");
      }
    });
  }
  revealSections();
  window.addEventListener('scroll', revealSections);

  // Profile picture upload and preview
  const input = document.getElementById('profile-upload');
  const img = document.getElementById('profile-pic');
  if (input && img) {
    input.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (evt) {
          img.src = evt.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Smooth scroll for nav links & active link highlighting
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(document.querySelectorAll('main section'));
  // Smooth scroll on click
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const section = document.getElementById(targetId);
      if (section) {
        e.preventDefault();
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        // Update active link after scroll
        setTimeout(() => highlightNav(), 350);
      }
    });
  });

  // Highlight active nav link on scroll
  function highlightNav() {
    let scrollPos = window.scrollY || window.pageYOffset;
    let offset = 120; // Adjust for sticky nav and header
    let activeSet = false;

    sections.forEach((section, idx) => {
      const top = section.offsetTop - offset;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        navLinks[idx].classList.add('active');
        activeSet = true;
      }
    });
    // Fallback: If at top of page, highlight first
    if (!activeSet) {
      navLinks.forEach(l => l.classList.remove('active'));
      if (scrollPos < 300) navLinks[0].classList.add('active');
    }
  }
  highlightNav();
  window.addEventListener('scroll', highlightNav);
});