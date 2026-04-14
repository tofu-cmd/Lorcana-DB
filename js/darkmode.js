    const toggle = document.getElementById('darkToggle');
    const body = document.body;

    function setTheme(mode) {
      if (mode === 'dark') {
        body.classList.add('dark-mode');
        toggle.textContent = '☀️';
      } else {
        body.classList.remove('dark-mode');
        toggle.textContent = '🌙';
      }
      localStorage.setItem('theme', mode);
    }

    toggle.addEventListener('click', () => {
      const isDark = body.classList.contains('dark-mode');
      setTheme(isDark ? 'light' : 'dark');
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
