/* Static pages use the same controller as the React site's footer and drawer. */
document.querySelectorAll('[data-theme-controls]').forEach((group) => {
  const update = () => {
    const { preference } = window.__lhTheme.getSnapshot();
    group.querySelectorAll('[data-theme-option]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.themeOption === preference));
    });
  };
  group.addEventListener('click', (event) => {
    const button = event.target.closest('[data-theme-option]');
    if (button && group.contains(button)) window.__lhTheme.setPreference(button.dataset.themeOption);
  });
  window.addEventListener('lan:theme-change', update);
  update();
});
