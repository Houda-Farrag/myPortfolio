import { loadProjectsData } from "../services/projectsData.js";

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
  tabButtons: document.querySelectorAll(".tab-btn"),
  tabContents: document.querySelectorAll(".tab-content"),
  skillItems: document.querySelectorAll(".skill-item"),
  scrollToTopBtn: document.getElementById("scrollToTopBtn"),
  filterButtons: document.querySelectorAll(".filter-btn"),
  projectCards: document.querySelectorAll(".project-card"),
};

// ===== Utility Functions =====
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const isElementInViewport = (element, offset = 100) => {
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight - offset;
};

// ===== Core Functions =====
const setCurrentYear = () => {
  if (DOM.year) {
    DOM.year.textContent = new Date().getFullYear();
  }
};

const toggleMobileMenu = () => {
  DOM.hamburger.classList.toggle("active");
  DOM.navMenu.classList.toggle("active");
  document.body.classList.toggle("no-scroll");

  // Add/remove backdrop when menu is open/closed
  if (DOM.navMenu.classList.contains("active")) {
    if (!document.querySelector(".mobile-backdrop")) {
      const backdrop = document.createElement("div");
      backdrop.className = "mobile-backdrop";
      backdrop.innerHTML = `<div class="nav-menu-backdrop">
        <ul class="nav-menu-list">
          <li class="nav-menu-item">
            <a href="#home" class="nav-menu-link">Home</a>
          </li>
          <li class="nav-menu-item">
            <a href="#about" class="nav-menu-link">About</a>
          </li>
          <li class="nav-menu-item">
            <a href="#projects" class="nav-menu-link">Projects</a>
          </li>
          <li class="nav-menu-item">
            <a href="#contact" class="nav-menu-link">Contact</a>
          </li>
        </ul>
      </div>`;
      document.body.appendChild(backdrop);
      backdrop.addEventListener("click", closeMobileMenu);
    }
  } else {
    const backdrop = document.querySelector(".mobile-backdrop");
    if (backdrop) backdrop.remove();
  }
};

const closeMobileMenu = () => {
  DOM.hamburger.classList.remove("active");
  DOM.navMenu.classList.remove("active");
  document.body.classList.remove("no-scroll");

  const backdrop = document.querySelector(".mobile-backdrop");
  if (backdrop) backdrop.remove();
};

const scrollToElement = (targetId) => {
  if (targetId === "#") return;

  const targetElement = document.querySelector(targetId);
  if (!targetElement) return;

  const headerHeight = DOM.header ? DOM.header.offsetHeight : 0;
  const targetPosition = targetElement.offsetTop - headerHeight;

  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });

  history.pushState(null, null, targetId);
};

const handleNavLinkClick = (e) => {
  const targetId = e.currentTarget.getAttribute("href");

  // Only close menu if it's open (mobile view)
  if (window.innerWidth <= 768 && DOM.navMenu.classList.contains("active")) {
    closeMobileMenu();
  }

  e.preventDefault();
  scrollToElement(targetId);
};

const setupMobileMenu = () => {
  if (!DOM.hamburger || !DOM.navMenu) return;

  DOM.hamburger.addEventListener("click", toggleMobileMenu);

  DOM.navLinks.forEach((link) => {
    link.addEventListener("click", handleNavLinkClick);
  });

  // Close menu when clicking outside on mobile
  document.addEventListener("click", (e) => {
    if (
      window.innerWidth <= 768 &&
      DOM.navMenu.classList.contains("active") &&
      !DOM.navMenu.contains(e.target) &&
      !DOM.hamburger.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });
};

const setupSmoothScrolling = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;

      e.preventDefault();
      scrollToElement(targetId);
    });
  });
};

const checkScrollPosition = () => {
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
    element.classList.toggle("visible", isElementInViewport(element));
  });
};

const setupScrollEffects = () => {
  // Initial check
  checkScrollPosition();

  // Debounced scroll event
  window.addEventListener("scroll", debounce(checkScrollPosition, 100));
};

const setupTabs = () => {
  DOM.tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      DOM.tabButtons.forEach((btn) => btn.classList.remove("active"));
      DOM.tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Show corresponding content
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });
};

const animateSkills = () => {
  DOM.skillItems.forEach((item) => {
    const level = item.getAttribute("data-skill-level");
    const fill = item.querySelector(".skill-level-fill");
    const percent = item.querySelector(".skill-percent");

    fill.style.width = `${level}%`;
    percent.textContent = `${level}%`;
  });
};

const setupSkillsAnimation = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkills();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  if (document.querySelector(".skills")) {
    observer.observe(document.querySelector(".skills"));
  }
};

const handleFormInput = (e) => {
  const label = e.target.previousElementSibling;
  if (label && label.tagName === "LABEL") {
    label.style.display = e.target.value ? "none" : "block";
  }
};

const handleFormSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const formObject = Object.fromEntries(formData.entries());

  // For now, we'll just open the mail client
  const subject = encodeURIComponent(
    formObject.subject || "Contact from Portfolio"
  );
  const body = encodeURIComponent(
    `Name: ${formObject.name}\nEmail: ${formObject.email}\n\nMessage: ${formObject.message}`
  );
  window.location.href = `mailto:mahmoud.mo.farrag@gmail.com?subject=${subject}&body=${body}`;

  // Show success message
  const submitBtn = e.target.querySelector(".btn-submit");
  const originalText = submitBtn.querySelector(".btn-text").textContent;

  submitBtn.querySelector(".btn-text").textContent = "Message Sent!";
  submitBtn.disabled = true;

  // Reset button after 3 seconds
  setTimeout(() => {
    submitBtn.querySelector(".btn-text").textContent = originalText;
    submitBtn.disabled = false;
    e.target.reset();
  }, 3000);
};

const setupFormHandling = () => {
  if (!DOM.contactForm) return;

  const formInputs = DOM.contactForm.querySelectorAll("input, textarea");
  formInputs.forEach((input) => {
    input.addEventListener("input", handleFormInput);
  });

  DOM.contactForm.addEventListener("submit", handleFormSubmit);
};

const setupScrollToTop = () => {
  if (!DOM.scrollToTopBtn) return;

  window.addEventListener("scroll", () => {
    DOM.scrollToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  DOM.scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};

const setupProjectFiltering = () => {
  DOM.filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      DOM.filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      // Filter projects
      DOM.projectCards.forEach((card) => {
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
};

const setupProjectAnimations = () => {
  const projectObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
          projectObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  DOM.projectCards.forEach((card) => {
    projectObserver.observe(card);
    card.style.animationPlayState = "paused";
  });
};

// ===== Initialize Application =====
const init = () => {
  setCurrentYear();
  setupMobileMenu();
  setupSmoothScrolling();
  setupScrollEffects();
  setupTabs();
  setupSkillsAnimation();
  setupFormHandling();
  setupScrollToTop();

  // Initialize projects when data is loaded
  loadProjectsData().then(() => {
    setupProjectFiltering();
    setupProjectAnimations();
  });
};

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", init);
