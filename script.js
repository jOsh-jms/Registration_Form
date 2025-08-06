document.addEventListener('DOMContentLoaded', () => {
    // Email validation
    const emailInput = document.querySelector('input[type="email"]');
    emailInput.addEventListener('input', () => {
        emailInput.style.borderColor = emailInput.validity.valid ? '#27ae60' : '#e74c3c';
    });

    // Password validation and show/hide
    const passwordInput = document.querySelector('input[type="password"]');
    const passwordLabel = passwordInput.previousElementSibling;
    // Add show/hide toggle
    const toggle = document.createElement('span');
    toggle.textContent = '👁️';
    toggle.style.cursor = 'pointer';
    toggle.style.marginLeft = '8px';
    passwordLabel.appendChild(toggle);

    toggle.addEventListener('click', () => {
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
        toggle.textContent = passwordInput.type === 'password' ? '👁️' : '🙈';
    });

    passwordInput.addEventListener('input', () => {
        passwordInput.style.borderColor = passwordInput.value.length >= 6 ? '#27ae60' : '#e74c3c';
    });

    // Profile picture preview
    const picInput = document.getElementById('profilePic');
    const picPreview = document.getElementById('picPreview');
    if (picInput && picPreview) {
        picInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    picPreview.src = ev.target.result;
                    picPreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                picPreview.style.display = 'none';
            }
        });
    }

    // Animated submit button and success message
    const form = document.querySelector('form');
    const submitBtn = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        submitBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            submitBtn.textContent = 'Submit';
            submitBtn.disabled = false;
            submitBtn.style.transform = '';
            alert('Registration successful! 🎉');
            form.reset();
            if (picPreview) picPreview.style.display = 'none';
        }, 1200);
    });
});