import { q, qa } from "../utils/dom.js";

// We inject a "submitHandler" so the form module doesn't know low-level details (DIP)
export function createContactForm({
  formSelector = "#contactForm",
  submitHandler = null,
} = {}) {
  const form = q(formSelector);

  function hideLabelOnInput() {
    const inputs = qa("input, textarea", form);
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        const label = input.previousElementSibling;
        if (label && label.tagName === "LABEL") {
          label.style.display = input.value ? "none" : "block";
        }
      });
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!form) return;

    const data = Object.fromEntries(new FormData(form).entries());

    if (typeof submitHandler === "function") {
      submitHandler(data, form);
    } else {
      // default behaviour: mailto
      const subject = encodeURIComponent(
        data.subject || "Contact from Portfolio"
      );
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\n\nMessage: ${data.message}`
      );
      window.location.href = `mailto:mahmoud.mo.farrag@gmail.com?subject=${subject}&body=${body}`;

      // Visual feedback
      const submitBtn = form.querySelector(".btn-submit");
      if (submitBtn) {
        const original =
          submitBtn.querySelector(".btn-text")?.textContent ||
          submitBtn.textContent;
        submitBtn.querySelector(".btn-text").textContent = "Message Sent!";
        submitBtn.disabled = true;
        setTimeout(() => {
          submitBtn.querySelector(".btn-text").textContent = original;
          submitBtn.disabled = false;
          form.reset();
        }, 3000);
      }
    }
  }

  return {
    init() {
      if (!form) return;
      hideLabelOnInput();
      form.addEventListener("submit", onSubmit);
    },
  };
}
