/* ============================================
   SALISU ADAM - Portfolio Scripts
   Fullstack Web Developer & UI/UX Designer
   ============================================ */

(function () {
  'use strict';

  // ===== LOADING SCREEN =====
  window.addEventListener('load', function () {
    var loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      setTimeout(function () {
        loadingScreen.classList.add('hidden');
        setTimeout(function () {
          loadingScreen.style.display = 'none';
        }, 700);
      }, 500);
    }
  });

  // ===== SCROLL PROGRESS BAR =====
  var progressBar = document.getElementById('progress-bar');

  window.addEventListener('scroll', function () {
    if (!progressBar) return;
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });

  // ===== NAVBAR SCROLL EFFECT =====
  var navbar = document.getElementById('mainNavbar');

  window.addEventListener('scroll', function () {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===== NAVBAR ACTIVE LINK HIGHLIGHTING =====
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.navbar .nav-link');

  function highlightNavLink() {
    var current = '';
    sections.forEach(function (section) {
      var sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink);
  window.addEventListener('load', highlightNavLink);

  // ===== SMOOTH SCROLL FOR NAV LINKS (Bootstrap handles via CSS) =====
  // Bootstrap's scroll-padding-top in CSS handles the offset

  // ===== TYPING ANIMATION =====
  var typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    var words = [
      'Fullstack Web Developer',
      'UI/UX Designer',
      'Frontend Engineer',
      'Backend Developer',
      'Data Analyst',
    ];
    var wordIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typeSpeed = 180;
    var deleteSpeed = 150;
    var pauseTime = 3000;

    function typeEffect() {
      var currentWord = words[wordIndex];

      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeEffect, deleteSpeed);
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeEffect, typeSpeed);
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, pauseTime);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 200);
      }
    }

    typeEffect();
  }

  // ===== SCROLL REVEAL ANIMATIONS =====
  var revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ===== SKILL PROGRESS BAR ANIMATION =====
  var skillBars = document.querySelectorAll('.skill-progress-fill');

  var skillObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var bar = entry.target;
        var width = bar.getAttribute('data-width');
        if (width) {
          setTimeout(function () {
            bar.style.width = width + '%';
          }, 300);
        }
        skillObserver.unobserve(bar);
      }
    });
  }, {
    threshold: 0.3
  });

  skillBars.forEach(function (bar) {
    skillObserver.observe(bar);
  });

  // ===== COUNT-UP ANIMATION =====
  var statNumbers = document.querySelectorAll('.stat-number[data-count]');

  var countObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-count'), 10);
        var current = 0;
        var increment = target / 80;
        var duration = 1500;
        var stepTime = Math.floor(duration / 80);

        function updateCount() {
          current += increment;
          if (current < target) {
            el.textContent = Math.floor(current) + '+';
            setTimeout(updateCount, stepTime);
          } else {
            el.textContent = target + '+';
          }
        }

        updateCount();
        countObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.5
  });

  statNumbers.forEach(function (el) {
    countObserver.observe(el);
  });

  // ===== CONTACT FORM HANDLING =====
  var contactForm = document.getElementById('contactForm');
  var formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = contactForm.querySelector('button[type="submit"]');
      var originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span> Sending...';
      submitBtn.disabled = true;

      if (formStatus) {
        formStatus.textContent = '';
        formStatus.className = 'col-12';
      }

      var formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(function () {
        if (formStatus) {
          formStatus.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.';
          formStatus.className = 'col-12 success';
        }
        contactForm.reset();
      })
      .catch(function () {
        if (formStatus) {
          formStatus.textContent = 'Oops! Something went wrong. Please try again or email me directly at samwebcs@gmail.com.';
          formStatus.className = 'col-12 error';
        }
      })
      .finally(function () {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      });
    });
  }

  // ===== PARALLAX FLOATING CARDS ON MOUSE MOVE (Desktop only) =====
  var heroVisual = document.querySelector('.hero-visual');
  var floatingCards = document.querySelectorAll('.floating-card');

  if (heroVisual && floatingCards.length && window.innerWidth > 992) {
    heroVisual.addEventListener('mousemove', function (e) {
      var rect = heroVisual.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;

      floatingCards.forEach(function (card, index) {
        var speed = (index + 1) * 0.03;
        var moveX = (x - centerX) * speed;
        var moveY = (y - centerY) * speed;
        card.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
      });
    });

    heroVisual.addEventListener('mouseleave', function () {
      floatingCards.forEach(function (card) {
        card.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ===== THEME TOGGLE =====
  var themeToggle = document.getElementById('themeToggle');
  var htmlEl = document.documentElement;

  function getStoredTheme() {
    return localStorage.getItem('theme');
  }

  function setTheme(theme) {
    if (theme === 'light') {
      htmlEl.setAttribute('data-theme', 'light');
      themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
    } else {
      htmlEl.removeAttribute('data-theme');
      themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    }
    localStorage.setItem('theme', theme);
  }

  if (themeToggle) {
    var saved = getStoredTheme();
    if (!saved) {
      saved = 'dark';
    }
    setTheme(saved);

    themeToggle.addEventListener('click', function () {
      var current = htmlEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      setTheme(current);
    });
  }

  // ===== CLOSE MOBILE NAV ON LINK CLICK =====
  var navbarNav = document.getElementById('navbarNav');
  if (navbarNav) {
    var navLinkItems = navbarNav.querySelectorAll('.nav-link');
    var bsCollapse = null;

    navbarNav.addEventListener('shown.bs.collapse', function () {
      bsCollapse = bootstrap.Collapse.getInstance(navbarNav);
    });

    navLinkItems.forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 992 && bsCollapse) {
          bsCollapse.hide();
        }
      });
    });
  }

  // Fallback: ensure loading screen hidden if load didn't fire or script had issues
  setTimeout(function () {
    var ls = document.getElementById('loading-screen');
    if (ls && !ls.classList.contains('hidden')) {
      ls.classList.add('hidden');
      setTimeout(function () {
        ls.style.display = 'none';
      }, 700);
      console.warn('Loading screen auto-hidden by fallback.');
    }
  }, 8000);

})();
