document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const fullscreenToggle = document.getElementById("fullscreen-toggle");
  const pdfEmbed = document.getElementById("pdf-embed");
  const whitepaperContainer = document.querySelector(".white-paper-container");

  // Check system preference or saved theme
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    body.classList.add("dark-mode");
    themeToggle.textContent = "🌤️";
    if (pdfEmbed) pdfEmbed.src = "./Documents/hashChainProtocolDark.pdf"; // Set dark mode PDF
  } else {
    themeToggle.textContent = "🌜";
    if (pdfEmbed) pdfEmbed.src = "./Documents/hashChainProtocolLight.pdf"; // Set light mode PDF
  }

  // Toggle theme with accessibility
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    themeToggle.textContent = isDark ? "🌤️" : "🌜";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    // Switch PDF based on theme
    if (pdfEmbed) {
      pdfEmbed.src = isDark ? "./Documents/hashChainProtocolDark.pdf" : "./Documents/hashChainProtocolLight.pdf";
    }
  });

  // Keyboard support for theme toggle
  themeToggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      themeToggle.click();
    }
  });

  // Full-screen toggle logic
  function isFullScreenEnabled() {
    return window.innerWidth > 768;
  }

  if (fullscreenToggle) {
    fullscreenToggle.addEventListener("click", () => {
      if (!isFullScreenEnabled()) return;

      if (!document.fullscreenElement) {
        // Enter full-screen
        whitepaperContainer.classList.add("fullscreen");
        if (pdfEmbed.requestFullscreen) {
          pdfEmbed.requestFullscreen();
        } else if (pdfEmbed.webkitRequestFullscreen) { // Safari
          pdfEmbed.webkitRequestFullscreen();
        } else if (pdfEmbed.msRequestFullscreen) { // IE11
          pdfEmbed.msRequestFullscreen();
        }
        fullscreenToggle.textContent = "❌";
      } else {
        // Exit full-screen
        whitepaperContainer.classList.remove("fullscreen");
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // Safari
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE11
          document.msExitFullscreen();
        }
        fullscreenToggle.textContent = "🖥️";
      }
    });

    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        whitepaperContainer.classList.remove("fullscreen");
        fullscreenToggle.textContent = "🖥️";
      }
    });

    window.addEventListener("resize", () => {
      if (!isFullScreenEnabled() && document.fullscreenElement) {
        document.exitFullscreen();
        whitepaperContainer.classList.remove("fullscreen");
        fullscreenToggle.textContent = "🖥️";
      }
    });
  }
});