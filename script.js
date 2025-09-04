// Theme toggle functionality
let isDark = true

function toggleTheme() {
  isDark = !isDark
  document.body.classList.toggle("dark", isDark)

  const sunIcon = document.getElementById("sun-icon")
  const moonIcon = document.getElementById("moon-icon")

  if (isDark) {
    sunIcon.classList.add("hidden")
    moonIcon.classList.remove("hidden")
  } else {
    sunIcon.classList.remove("hidden")
    moonIcon.classList.add("hidden")
  }
}

// Intersection Observer for animations and navigation
let activeSection = ""
const sections = []

function initializeIntersectionObserver() {
  const sectionElements = document.querySelectorAll("section, header")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up")
          activeSection = entry.target.id
          updateNavigation()
        }
      })
    },
    { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
  )

  sectionElements.forEach((section) => {
    sections.push(section)
    observer.observe(section)
  })
}

// Update navigation dots
function updateNavigation() {
  const navDots = document.querySelectorAll(".nav-dot")

  navDots.forEach((dot) => {
    const section = dot.getAttribute("data-section")
    if (section === activeSection) {
      dot.classList.remove("bg-muted-foreground/30", "hover:bg-muted-foreground/60")
      dot.classList.add("bg-foreground")
    } else {
      dot.classList.remove("bg-foreground")
      dot.classList.add("bg-muted-foreground/30", "hover:bg-muted-foreground/60")
    }
  })
}

// Smooth scroll to section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: "smooth" })
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize intersection observer
  initializeIntersectionObserver()

  // Set up theme toggle
  const themeToggle = document.getElementById("theme-toggle")
  themeToggle.addEventListener("click", toggleTheme)

  // Set up navigation dots
  const navDots = document.querySelectorAll(".nav-dot")
  navDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const section = dot.getAttribute("data-section")
      scrollToSection(section)
    })
  })

  // Initialize with intro section as active
  activeSection = "intro"
  updateNavigation()
})

// Handle window resize for responsive behavior
window.addEventListener("resize", () => {
  // Update any responsive-dependent functionality here if needed
})
