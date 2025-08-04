// Wait for DOM and MathJax to be ready
window.addEventListener('DOMContentLoaded', () => {
  const latexInput = document.getElementById('latex');
  const previewDiv = document.getElementById('preview');
  const form = document.getElementById('latexForm');

  // Update MathJax preview when LaTeX input changes
  function updatePreview() {
    const tex = latexInput.value;
    previewDiv.innerHTML = tex;

    // Re-render MathJax
    if (window.MathJax) {
      MathJax.typesetPromise([previewDiv]).catch((err) => console.error(err.message));
    }
  }

  latexInput.addEventListener('input', updatePreview);
  updatePreview();

  // Form submit handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const latex = form.latex.value.trim();

    if (!email) {
      alert('Email is required.');
      return;
    }

    if (!latex) {
      alert('Please enter some LaTeX code.');
      return;
    }

    // FIXED: use the correct field name expected by the backend
    const payload = { email, latexCode: latex };

    try {
      const response = await fetch('https://latexbot.netlify.app/.netlify/functions/latexbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ PDF generated and emailed successfully!');
      } else {
        alert('❌ Error: ' + (data.error || 'Unknown error'));
        console.error(data);
      }
    } catch (err) {
      alert('❌ Network error: ' + err.message);
      console.error(err);
    }
  });
});
