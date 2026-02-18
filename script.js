(function () {
  'use strict';

  var nav = document.getElementById('nav');
  var navToggle = document.querySelector('.nav__toggle');
  var navLinks = document.querySelector('.nav__links');
  var navLinkItems = document.querySelectorAll('.nav__link');
  var sections = document.querySelectorAll('section[id]');

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      e.preventDefault();
      if (targetId === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        var target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      if (navLinks && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Mobile hamburger menu
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Navbar scroll effect (more opaque on scroll)
  function updateNavOnScroll() {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavOnScroll, { passive: true });
  updateNavOnScroll();

  // Active nav link based on scroll position
  function updateActiveNavLink() {
    var scrollY = window.scrollY;
    var viewportMid = scrollY + window.innerHeight * 0.4;

    navLinkItems.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href === '#') return;
      var section = document.querySelector(href);
      if (!section) return;

      var top = section.offsetTop;
      var height = section.offsetHeight;
      var bottom = top + height;

      if (viewportMid >= top && viewportMid <= bottom) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // Product cards: Intersection Observer for fade/slide in with stagger
  var cards = document.querySelectorAll('.product-card[data-animate]');
  var staggerDelay = 120;

  if ('IntersectionObserver' in window) {
    var cardObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, index) {
          if (!entry.isIntersecting) return;
          var card = entry.target;
          var cardIndex = Array.prototype.indexOf.call(cards, card);
          var delay = cardIndex * staggerDelay;
          setTimeout(function () {
            card.classList.add('visible');
          }, delay);
          cardObserver.unobserve(card);
        });
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0 }
    );

    cards.forEach(function (card) {
      cardObserver.observe(card);
    });
  } else {
    cards.forEach(function (card) {
      card.classList.add('visible');
    });
  }
})();
