document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.classList.toggle('open');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('open');
      });
    });
  }

  // Scroll Fade-in Observer
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        
        // Trigger counter animation if inside counter box
        if (entry.target.classList.contains('counter-box') || entry.target.querySelector('.counter-number')) {
          startCounters();
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(element => {
    fadeObserver.observe(element);
  });

  // Animated Counters
  let countersStarted = false;
  function startCounters() {
    if (countersStarted) return;
    const counterNumbers = document.querySelectorAll('.counter-number');
    
    counterNumbers.forEach(counter => {
      countersStarted = true;
      const target = +counter.getAttribute('data-target');
      const duration = 2000; // 2 seconds
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, stepTime);
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple client-side success feedback
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.style.display = 'none';
      formSuccess.classList.remove('hidden');
      
      // Reset form fields
      contactForm.reset();
    });
  }

  // Navbar background change on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'rgba(26, 18, 13, 0.95)';
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
      navbar.style.backgroundColor = 'rgba(26, 18, 13, 0.85)';
      navbar.style.boxShadow = 'none';
    }
  });
});
