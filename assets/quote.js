const form = document.querySelector('#quote-form');
const output = document.querySelector('#quote-output');
const summary = document.querySelector('#summary');
const status = document.querySelector('#copy-status');
const emailDraft = document.querySelector('#email-quote');
const emailAddress = emailDraft.getAttribute('href');
const emailSubject = encodeURIComponent('Quote request for Wynn’s Repair L.L.C.');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const details = new FormData(form);
  for (const field of form.querySelectorAll('[required]')) {
    if (!field.value.trim()) {
      field.setCustomValidity('Please complete this field.');
      field.reportValidity();
      return;
    }
  }
  summary.value = [
    'Quote request for Wynn’s Repair L.L.C.',
    `Name: ${details.get('name').trim()}`,
    `Project city or ZIP: ${details.get('city').trim()}`,
    `Service: ${details.get('service')}`,
    '',
    details.get('details').trim(),
  ].join('\n');
  const emailBody = encodeURIComponent(summary.value.replace(/\r?\n/g, '\r\n'));
  emailDraft.href = `${emailAddress}?subject=${emailSubject}&body=${emailBody}`;
  output.hidden = false;
  summary.focus();
});

form.addEventListener('input', (event) => {
  event.target.setCustomValidity('');
  output.hidden = true;
  summary.value = '';
  status.textContent = '';
  emailDraft.href = emailAddress;
});

document.querySelector('#copy-quote').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(summary.value);
    status.textContent = 'Copied to your clipboard.';
  } catch {
    summary.focus();
    summary.select();
    status.textContent = 'Summary selected. Use your device’s copy command.';
  }
});

document.querySelector('#quote-instructions').hidden = false;
form.hidden = false;
