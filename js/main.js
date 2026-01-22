// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active"); // Toggle active class on hamburger
  navLinks.classList.toggle("active"); // Toggle active class on nav links
});

// Close menu when clicking navigation links
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Form validation
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill all fields");
    return;
  }

  alert("Message sent successfully!");
  e.target.reset();
});

// Bootstrap-style count-up animation
const counters = document.querySelectorAll(".count");

const runCounter = (counter) => {
  const target = +counter.dataset.target;
  const increment = target / 120;
  let current = 0;

  const update = () => {
    current += increment;
    if (current < target) {
      counter.textContent = Math.floor(current);
      requestAnimationFrame(update);
    } else {
      counter.textContent = target.toLocaleString();
    }
  };

  update();
};

// Trigger when visible
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => counterObserver.observe(counter));

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check system preference or localStorage
const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches 
    ? 'dark' 
    : 'light';
};

// Apply theme
const applyTheme = (theme) => {
  if (theme === 'light') {
    htmlElement.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="bi bi-sun"></i>';
  } else {
    htmlElement.removeAttribute('data-theme');
    themeToggle.innerHTML = '<i class="bi bi-moon"></i>';
  }
  localStorage.setItem('theme', theme);
};

// Initialize
const initialTheme = getPreferredTheme();
applyTheme(initialTheme);

// Toggle on click
themeToggle.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme') === 'light' 
    ? 'dark' 
    : 'light';
  applyTheme(currentTheme);
});