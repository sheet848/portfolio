document.querySelectorAll('.acc-title').forEach(button => {
  button.addEventListener('click', () => {
    const openItem = document.querySelector('.acc-content.active');
    const content = button.nextElementSibling;

    // Case 1: clicking on another header → close the old one
    if (openItem && openItem !== content) {
      openItem.classList.remove('active');
    }

    // Case 2: toggle the clicked one (open if closed, close if open)
    content.classList.toggle('active');
  });
});