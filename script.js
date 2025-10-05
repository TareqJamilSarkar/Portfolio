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
      // Adjust this value to control when the animation triggers
      if (rect.top < window.innerHeight - 100) {
        section.classList.add("visible");
      }
    });
  }
  revealSections(); // Initial check on load
  window.addEventListener('scroll', revealSections);

  // Profile picture upload and preview (if you add an input for it)
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
        setTimeout(() => highlightNav(), 350); // Small delay to allow scroll to finish
      }
    });
  });

  // Highlight active nav link on scroll
  function highlightNav() {
    let scrollPos = window.scrollY || window.pageYOffset;
    let offset = 120; // Adjust for sticky nav and header height
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
    // Fallback: If at top of page, highlight first link
    if (!activeSet) {
      navLinks.forEach(l => l.classList.remove('active'));
      if (scrollPos < 300) { // Arbitrary value for "top of page"
        navLinks[0].classList.add('active');
      }
    }
  }
  highlightNav(); // Initial highlight on load
  window.addEventListener('scroll', highlightNav);


  // Aesthetic Cursor Logic
  const cursor = document.querySelector('.aesthetic-cursor');

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
  });

  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  });

  // Add hover effect for interactive elements
  const hoverableElements = document.querySelectorAll('a, button, .nav-link, .social-icon, .project-card');

  hoverableElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });
});
