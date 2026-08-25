// Semester III Portal Interactions & Exam Utilities
document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('sem3_theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeButton(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('sem3_theme', newTheme);
      updateThemeButton(newTheme);
    });
  }

  function updateThemeButton(theme) {
    if (!themeToggleBtn) return;
    themeToggleBtn.innerHTML = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  }

  // 2. Reading Progress Bar
  const progressBar = document.getElementById('reading-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = `${progress}%`;
      }
    });
  }

  // 3. Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. Accordion Toggle for Important Questions
  const qaHeaders = document.querySelectorAll('.qa-header');
  qaHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.qa-card');
      if (card) {
        card.classList.toggle('open');
      }
    });
  });

  // Expand All / Collapse All Buttons
  const expandAllBtn = document.getElementById('expand-all-qa');
  const collapseAllBtn = document.getElementById('collapse-all-qa');

  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', () => {
      document.querySelectorAll('.qa-card').forEach(card => card.classList.add('open'));
    });
  }

  if (collapseAllBtn) {
    collapseAllBtn.addEventListener('click', () => {
      document.querySelectorAll('.qa-card').forEach(card => card.classList.remove('open'));
    });
  }

  // 5. Real-time Search & Filter
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      // Filter Cards on Home or Subject Page
      const filterableCards = document.querySelectorAll('.searchable-card');
      filterableCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });

      // Filter Question Cards on Unit Page
      const qaCards = document.querySelectorAll('.qa-card');
      qaCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
          card.style.display = '';
          if (query.length > 2) {
            card.classList.add('open');
          }
        } else {
          card.style.display = 'none';
        }
      });

      // Filter Topic Blocks on Unit Page
      const topicBlocks = document.querySelectorAll('.topic-block');
      topicBlocks.forEach(block => {
        const text = block.textContent.toLowerCase();
        if (text.includes(query)) {
          block.style.display = '';
        } else {
          block.style.display = 'none';
        }
      });
    });
  }
});
