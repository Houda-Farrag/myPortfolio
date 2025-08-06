document.addEventListener("DOMContentLoaded", function () {
  // ===== Constants =====
  const DOM = {
    hamburger: document.querySelector(".hamburger"),
    navMenu: document.querySelector(".nav-menu"),
    navLinks: document.querySelectorAll(".nav-link"),
    sections: document.querySelectorAll("section"),
    header: document.querySelector(".header"),
    year: document.getElementById("year"),
    contactForm: document.querySelector(".contact-form"),
    fadeElements: document.querySelectorAll(".fade-in"),
  };

  // ===== Initialize Functions =====
  function init() {
    setCurrentYear();
    setupMobileMenu();
    setupSmoothScrolling();
    setupScrollEffects();
    setupFormHandling();
  }

  // ===== Core Functions =====
  function setCurrentYear() {
    if (DOM.year) {
      DOM.year.textContent = new Date().getFullYear();
    }
  }

  // function setupMobileMenu() {
  //     if (DOM.hamburger && DOM.navMenu) {
  //         DOM.hamburger.addEventListener('click', toggleMobileMenu);

  //         DOM.navLinks.forEach(link => {
  //             link.addEventListener('click', closeMobileMenu);
  //         });
  //     }
  // }
  // Update your existing setupMobileMenu function to this:
  function setupMobileMenu() {
    if (DOM.hamburger && DOM.navMenu) {
      DOM.hamburger.addEventListener("click", toggleMobileMenu);

      DOM.navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
          // Only close menu if it's open (mobile view)
          if (
            window.innerWidth <= 768 &&
            DOM.navMenu.classList.contains("active")
          ) {
            closeMobileMenu();
          }

          // Handle smooth scrolling for all clicks
          const targetId = this.getAttribute("href");
          if (targetId === "#") return;

          e.preventDefault();
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
            const headerHeight = DOM.header ? DOM.header.offsetHeight : 0;
            const targetPosition =
              targetElement.getBoundingClientRect().top +
              window.pageYOffset -
              headerHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });

            history.pushState(null, null, targetId);
          }
        });
      });

      // Close menu when clicking outside on mobile
      document.addEventListener("click", function (e) {
        if (
          window.innerWidth <= 768 &&
          DOM.navMenu.classList.contains("active") &&
          !DOM.navMenu.contains(e.target) &&
          !DOM.hamburger.contains(e.target)
        ) {
          closeMobileMenu();
        }
      });
    }
  }
//   function toggleMobileMenu() {
//     DOM.hamburger.classList.toggle("active");
//     DOM.navMenu.classList.toggle("active");
//     document.body.classList.toggle("no-scroll");
//   }
// Update your toggle and close functions:
function toggleMobileMenu() {
    DOM.hamburger.classList.toggle('active');
    DOM.navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
    
    // Add backdrop when menu is open
    if (DOM.navMenu.classList.contains('active')) {
        if (!document.querySelector('.mobile-backdrop')) {
            const backdrop = document.createElement('div');
            backdrop.className = 'mobile-backdrop';
            document.body.appendChild(backdrop);
            backdrop.addEventListener('click', closeMobileMenu);
        }
    } else {
        const backdrop = document.querySelector('.mobile-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
    }
}
//   function closeMobileMenu() {
//     DOM.hamburger.classList.remove("active");
//     DOM.navMenu.classList.remove("active");
//     document.body.classList.remove("no-scroll");
//   }
function closeMobileMenu() {
    DOM.hamburger.classList.remove('active');
    DOM.navMenu.classList.remove('active');
    document.body.classList.remove('no-scroll');
    
    const backdrop = document.querySelector('.mobile-backdrop');
    if (backdrop) {
        backdrop.remove();
    }
}
  function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        e.preventDefault();
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const headerHeight = DOM.header ? DOM.header.offsetHeight : 0;
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Update URL without jumping
          history.pushState(null, null, targetId);
        }
      });
    });
  }

  function setupScrollEffects() {
    // Initial check
    checkScrollPosition();

    // Throttled scroll event
    let isScrolling;
    window.addEventListener(
      "scroll",
      function () {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(checkScrollPosition, 100);
      },
      false
    );
  }

  function checkScrollPosition() {
    // Header scroll effect
    if (DOM.header) {
      DOM.header.classList.toggle("scrolled", window.scrollY > 50);
    }

    // Section active state
    let currentSection = "";
    const scrollPosition = window.scrollY + 200;

    DOM.sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    DOM.navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentSection}`
      );
    });

    // Fade-in animations
    DOM.fadeElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      element.classList.toggle("visible", elementPosition < windowHeight - 100);
    });
  }

  function setupFormHandling() {
    if (DOM.contactForm) {
      DOM.contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const formObject = Object.fromEntries(formData.entries());

        // Here you would typically send the data to a server
        console.log("Form submitted:", formObject);

        // Show success message
        alert("Thank you for your message! I will get back to you soon.");
        this.reset();

        // You could add actual form submission logic here:
        // fetch('/send-email', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formObject)
        // })
        // .then(response => response.json())
        // .then(data => console.log('Success:', data))
        // .catch(error => console.error('Error:', error));
      });
    }
  }

  // ===== Initialize Application =====
  init();
});

document.addEventListener("DOMContentLoaded", function () {
  // Tab functionality
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Show corresponding content
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });
});

/* Animation for skill bars */
document.addEventListener("DOMContentLoaded", function () {
  const skillItems = document.querySelectorAll(".skill-item");

  const animateSkills = () => {
    skillItems.forEach((item) => {
      const level = item.getAttribute("data-skill-level");
      const fill = item.querySelector(".skill-level-fill");
      const percent = item.querySelector(".skill-percent");

      fill.style.width = `${level}%`;
      percent.textContent = `${level}%`;
    });
  };

  // Animate when section comes into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkills();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(document.querySelector(".skills"));
});

// Add this to your main.js file
document.addEventListener("DOMContentLoaded", function () {
  // Project filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      // Filter projects
      projectCards.forEach((card) => {
        if (
          filterValue === "all" ||
          card.getAttribute("data-categories").includes(filterValue)
        ) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Animate projects when they come into view
  const projectObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
          projectObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  projectCards.forEach((card) => {
    projectObserver.observe(card);
    card.style.animationPlayState = "paused";
  });
});

// Add this to your main.js file
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  const formInputs = contactForm.querySelectorAll("input, textarea");

  formInputs.forEach((input) => {
    input.addEventListener("input", () => {
      const label = input.previousElementSibling;
      if (label.tagName === "LABEL") {
        label.style.display = input.value ? "none" : "block";
      }
    });
  });

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const formObject = Object.fromEntries(formData.entries());

      // Here you would typically send the data to a server
      console.log("Form submitted:", formObject);

      // For now, we'll just open the mail client
      const subject = encodeURIComponent(
        formObject.subject || "Contact from Portfolio"
      );
      const body = encodeURIComponent(
        `Name: ${formObject.name}\nEmail: ${formObject.email}\n\nMessage: ${formObject.message}`
      );
      window.location.href = `mailto:mahmoud.mo.farrag@gmail.com?subject=${subject}&body=${body}`;

      // Show success message
      const submitBtn = this.querySelector(".btn-submit");
      const originalText = submitBtn.querySelector(".btn-text").textContent;

      submitBtn.querySelector(".btn-text").textContent = "Message Sent!";
      submitBtn.disabled = true;

      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.querySelector(".btn-text").textContent = originalText;
        submitBtn.disabled = false;
        this.reset();
      }, 3000);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const name = "Mahmoud Farrag";
  const heroNameEl = document.getElementById("heroName");
  let i = 0;

  function typeLetter() {
    if (i < name.length) {
      heroNameEl.textContent += name.charAt(i);
      i++;
      setTimeout(typeLetter, 500); // Speed of typing
    }
  }

  typeLetter();
});

