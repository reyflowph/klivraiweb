const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".main-nav");

menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const workspace = document.getElementById("workspace");
const wrap = document.querySelector(".workspace-wrap");

if (workspace && wrap && window.matchMedia("(pointer:fine)").matches) {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let dragging = false;
  let dragX = 0;
  let dragY = 0;

  wrap.addEventListener("pointermove", event => {
    const rect = wrap.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    if (dragging) {
      targetY += (event.clientX - dragX) * 0.08;
      targetX -= (event.clientY - dragY) * 0.06;
      dragX = event.clientX;
      dragY = event.clientY;
    } else {
      targetY = px * 8;
      targetX = -py * 6;
    }
  });

  wrap.addEventListener("pointerdown", event => {
    if (event.button !== 0) return;
    dragging = true;
    dragX = event.clientX;
    dragY = event.clientY;
    wrap.setPointerCapture(event.pointerId);
  });

  const endDrag = event => {
    dragging = false;
    if (event?.pointerId !== undefined && wrap.hasPointerCapture(event.pointerId)) {
      wrap.releasePointerCapture(event.pointerId);
    }
  };

  wrap.addEventListener("pointerup", endDrag);
  wrap.addEventListener("pointercancel", endDrag);
  wrap.addEventListener("pointerleave", () => {
    if (!dragging) {
      targetX = 0;
      targetY = 0;
    }
  });

  function animateWorkspace() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    workspace.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
    requestAnimationFrame(animateWorkspace);
  }

  animateWorkspace();
}
// Version 2.1: animate the chat when visible, while keeping a no-JS fallback visible.
const chatDemo = document.getElementById("chatDemo");
if (chatDemo && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const replayChat = () => {
    chatDemo.classList.remove("is-animating");
    void chatDemo.offsetWidth;
    chatDemo.classList.add("is-animating");
  };

  const chatObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) replayChat();
  }, { threshold: 0.35 });

  chatObserver.observe(chatDemo);
}


// Klivr AI project inquiry form
// Paste your n8n Production Webhook URL below before deployment.
const KLIVR_FORM_WEBHOOK_URL = "https://n8n-production-3b2a.up.railway.app/webhook/klivr-ai-contact-v2";

const projectForm = document.getElementById("projectForm");
const formStatus = document.getElementById("formStatus");
const submittedAt = document.getElementById("submittedAt");

function setFormStatus(message, type = "") {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`.trim();
}

function validateProjectForm(form) {
  let valid = true;
  const fields = form.querySelectorAll("input[required], select[required], textarea[required]");

  fields.forEach(field => {
    field.removeAttribute("aria-invalid");
    if (!field.checkValidity()) {
      field.setAttribute("aria-invalid", "true");
      valid = false;
    }
  });

  return valid;
}

projectForm?.addEventListener("input", event => {
  if (event.target.matches("input, select, textarea")) {
    event.target.removeAttribute("aria-invalid");
  }
});

projectForm?.addEventListener("submit", async event => {
  event.preventDefault();
  setFormStatus("");

  if (!validateProjectForm(projectForm)) {
    setFormStatus("Please complete all required fields correctly.", "error");
    projectForm.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }

  const formData = new FormData(projectForm);

  if (formData.get("website")) {
    projectForm.reset();
    setFormStatus("Thank you. Your inquiry has been received.", "success");
    return;
  }

  if (!KLIVR_FORM_WEBHOOK_URL || KLIVR_FORM_WEBHOOK_URL.includes("PASTE_YOUR_N8N")) {
    setFormStatus(
      "The form design is ready. Add your n8n Production Webhook URL in script.js to activate submissions.",
      "error"
    );
    return;
  }

  const submitButton = projectForm.querySelector(".form-submit");
  const submitText = submitButton?.querySelector("span");
  const originalText = submitText?.textContent || "Start My Project";

  if (submittedAt) submittedAt.value = new Date().toISOString();
  if (submitButton) submitButton.disabled = true;
  if (submitText) submitText.textContent = "Sending...";
  setFormStatus("Sending your inquiry...");

  const payload = Object.fromEntries(new FormData(projectForm).entries());
  payload.pageUrl = window.location.href;
  payload.userAgent = navigator.userAgent;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(KLIVR_FORM_WEBHOOK_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    if (!response.ok) throw new Error(`Webhook returned ${response.status}`);

    projectForm.reset();
    projectForm.classList.add("is-success");
    setFormStatus(
      "Thank you — your project inquiry has been sent. We’ll get back to you soon.",
      "success"
    );
  } catch (error) {
    console.error("Project inquiry submission failed:", error);
    setFormStatus(
      "We couldn’t send your inquiry. Please try again or email supportklivrai@gmail.com.",
      "error"
    );
  } finally {
    clearTimeout(timeout);
    if (submitButton) submitButton.disabled = false;
    if (submitText) submitText.textContent = originalText;
  }
});
