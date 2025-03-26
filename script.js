document.addEventListener('DOMContentLoaded', function () {
  // Smooth page transitions for external links
  const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"]), a[href^="mailto:"], a[href^="tel:"]');
  externalLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');

      // Add a fade-out animation
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.5s';

      setTimeout(() => {
        window.location.href = href;
      }, 500); // Wait for the fade-out to complete
    });
  });

  // Fade-in animation when the page loads
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s';
  }, 0);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add animations on scroll
  const activities = document.querySelectorAll('.activity');
  const activityObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  activities.forEach(activity => {
    activityObserver.observe(activity);
  });

  // Function to animate statistics
  function animateStatistics() {
    const statBoxes = document.querySelectorAll('.stat-box h2');
    statBoxes.forEach((statBox) => {
      const target = parseInt(statBox.getAttribute('data-count'), 10);
      let count = 0;
      const duration = 2000; // Animation duration in milliseconds
      const increment = target / (duration / 16); // 16ms per frame

      const updateCount = () => {
        count += increment;
        if (count < target) {
          statBox.textContent = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          statBox.textContent = target;
        }
      };

      updateCount();
    });
  }

  // Trigger animation when the statistics section is in view
  const statisticsSection = document.querySelector('.statistics');
  if (statisticsSection) {
    const statisticsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStatistics();
          statisticsObserver.unobserve(entry.target); // Stop observing after animation starts
        }
      });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    statisticsObserver.observe(statisticsSection);
  }
});


document.addEventListener('DOMContentLoaded', function () {
  // Animate statistics
  function animateStatistics() {
    const statBoxes = document.querySelectorAll('.stat-box h2');
    statBoxes.forEach((statBox) => {
      const target = parseInt(statBox.getAttribute('data-count'), 10);
      let count = 0;
      const duration = 2000; // Animation duration in milliseconds
      const increment = target / (duration / 16); // 16ms per frame

      const updateCount = () => {
        count += increment;
        if (count < target) {
          statBox.textContent = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          statBox.textContent = target + "+"; // Add "+" for 1000+ and 30+
        }
      };

      updateCount();
    });
  }

  // Trigger animation when the statistics section is in view
  const statisticsSection = document.querySelector('.statistics');
  if (statisticsSection) {
    const statisticsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStatistics();
          statisticsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statisticsObserver.observe(statisticsSection);
  }
});