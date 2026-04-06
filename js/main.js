

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  const themeToggle = document.getElementById('themeToggle');
  
  // Check for saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark');
      if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    });
  }
  
  // ---------- MOBILE NAVIGATION TOGGLE ----------
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
    });
  });
  
  // ---------- SMOOTH SCROLLING ----------
  function smoothScroll(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetElement.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
  
  // Add click handlers to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        smoothScroll(targetId);
      }
    });
  });
  
  // ---------- UPDATE ACTIVE NAV LINK ON SCROLL ----------
  function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const scrollPosition = window.scrollY + navbarHeight + 50;
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSection = '#' + section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentSection) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav(); // Call once on load
  
  // ---------- PROJECTS DATA ----------
  const projectsData = [
    {
      name: "Hospital Management System",
      description: "A comprehensive system for managing patients, doctors, appointments, and medical records with real-time updates and reporting.",
      tech: ["Java", "MySQL", "Swing"],
      github: "https://github.com/firoozahmad/hospital-management",
      image: "https://placehold.co/600x400/6366f1/white?text=Hospital+MS",
      category: "desktop"
    },
    {
      name: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with product management, cart system, payment integration, and admin dashboard.",
      tech: ["JavaScript", "React", "Node.js", "MongoDB"],
      github: "https://github.com/firoozahmad/ecommerce-platform",
      image: "https://placehold.co/600x400/10b981/white?text=E-Commerce",
      category: "web"
    },
    {
      name: "Inventory Management System",
      description: "Desktop application for tracking inventory, managing suppliers, and generating sales reports with analytics.",
      tech: ["C++", "SQL Server", "Qt"],
      github: "https://github.com/firoozahmad/inventory-system",
      image: "https://placehold.co/600x400/f59e0b/white?text=Inventory+MS",
      category: "desktop"
    },
    {
      name: "Student Information System",
      description: "Web-based platform for managing student records, grades, attendance, and course registration with parent portal.",
      tech: ["PHP", "MySQL", "Bootstrap"],
      github: "https://github.com/firoozahmad/student-info-system",
      image: "https://placehold.co/600x400/8b5cf6/white?text=Student+SIS",
      category: "web"
    },
    {
      name: "Employee Payroll System",
      description: "Database-driven payroll management system with automated salary calculations, tax deductions, and report generation.",
      tech: ["C#", "SQL Server", ".NET"],
      github: "https://github.com/firoozahmad/payroll-system",
      image: "https://placehold.co/600x400/ef4444/white?text=Payroll",
      category: "database"
    },
    {
      name: "Task Manager API",
      description: "RESTful API for task management with user authentication, task CRUD operations, and real-time notifications.",
      tech: ["Python", "Django", "PostgreSQL"],
      github: "https://github.com/firoozahmad/task-manager-api",
      image: "https://placehold.co/600x400/06b6d4/white?text=Task+API",
      category: "web"
    }
  ];
  
  // Render projects
  const projectsContainer = document.getElementById('projectsContainer');
  
  function renderProjects(filter = 'all') {
    if (!projectsContainer) return;
    
    const filteredProjects = filter === 'all' 
      ? projectsData 
      : projectsData.filter(project => project.category === filter);
    
    projectsContainer.innerHTML = filteredProjects.map(project => `
      <div class="project-card">
        <div class="project-img" style="background-image: url('${project.image}')">
          <div class="project-overlay">
            <div class="project-links">
              <a href="${project.github}" target="_blank"><i class="fab fa-github"></i></a>
            </div>
          </div>
        </div>
        <div class="project-info">
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <div class="project-tech">
            ${project.tech.map(t => `<span>${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }
  
  // Initial render
  if (projectsContainer) {
    renderProjects('all');
  }
  
  // Filter buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Update active class
      filterBtns.forEach(b => b.classList.remove('active-filter'));
      this.classList.add('active-filter');
      
      // Render filtered projects
      renderProjects(filter);
    });
  });
  
  document.getElementById('downloadCVBtn').addEventListener('click', function () {
  const link = document.createElement('a');
  link.href = 'assets/cv/Firooz_Ahmad_Muhammadi_CV.pdf';
  link.download = 'Firooz_Ahmad_Muhammadi_CV.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
  
  // ---------- CONTACT FORM HANDLER ----------
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const message = document.getElementById('contactMsg').value;
      
      // Validation
      if (!name || !email || !message) {
        showFormFeedback('Please fill in all fields', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showFormFeedback('Please enter a valid email address', 'error');
        return;
      }
      
      showFormFeedback('Sending message...', 'info');
      
      // Simulate sending
      setTimeout(() => {
        showFormFeedback('Message sent successfully! I will get back to you soon.', 'success');
        contactForm.reset();
      }, 1500);
    });
  }
  
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function showFormFeedback(message, type) {
    if (formFeedback) {
      formFeedback.textContent = message;
      formFeedback.className = 'form-feedback ' + type;
      
      setTimeout(() => {
        if (formFeedback) {
          formFeedback.textContent = '';
          formFeedback.className = 'form-feedback';
        }
      }, 5000);
    }
  }
  
  // Toast notification
  function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3000);
  }
  
  // ---------- ANIMATE SKILL BARS ON SCROLL ----------
  let skillsAnimated = false;
  
  function animateSkillBars() {
    if (skillsAnimated) return;
    
    const skillBars = document.querySelectorAll('.skill-progress');
    if (skillBars.length === 0) return;
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      const sectionRect = skillsSection.getBoundingClientRect();
      if (sectionRect.top < window.innerHeight - 100) {
        skillBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        });
        skillsAnimated = true;
      }
    }
  }
  
  window.addEventListener('scroll', animateSkillBars);
  setTimeout(animateSkillBars, 500);
  
  // Fix for initial load with hash
  if (window.location.hash) {
    setTimeout(() => {
      const targetId = window.location.hash;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        window.scrollTo({
          top: targetElement.offsetTop - navbarHeight,
          behavior: 'smooth'
        });
      }
    }, 100);
  }
});