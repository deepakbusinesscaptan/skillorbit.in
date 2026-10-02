document.querySelectorAll('[data-mail-form]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const formData = new FormData(form);
    const lines = [...formData.entries()].map(([key, value]) => `${key}: ${value}`);
    const subject = encodeURIComponent(form.dataset.subject || 'Website enquiry');
    const body = encodeURIComponent(lines.join('\n'));
    const response = form.querySelector('.form-response');
    if (response) response.textContent = 'Your email app will open with the enquiry details ready to send.';
    window.location.href = `mailto:connect@skillorbits.in?subject=${subject}&body=${body}`;
  });
});