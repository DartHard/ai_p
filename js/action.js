const actions = document.querySelector('.actions');
const toggleBtn = document.getElementById('actionToggle');

if (actions && toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const isOpen = actions.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (e) => {
    if (!actions.contains(e.target)) {
      actions.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}