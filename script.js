document.addEventListener('DOMContentLoaded', () => {
    // Email validation with glow effect
    const emailInput = document.querySelector('input[type="email"]');
    emailInput.addEventListener('input', () => {
        emailInput.style.borderColor = emailInput.validity.valid ? '#27ae60' : '#e74c3c';
        emailInput.style.boxShadow = emailInput.validity.valid
            ? '0 0 8px #27ae6044'
            : '0 0 8px #e74c3c44';
    });

    // Password validation and show/hide with shake effect
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
        passwordInput.classList.add('shake');
        setTimeout(() => passwordInput.classList.remove('shake'), 300);
    });

    passwordInput.addEventListener('input', () => {
        passwordInput.style.borderColor = passwordInput.value.length >= 6 ? '#27ae60' : '#e74c3c';
        passwordInput.style.boxShadow = passwordInput.value.length >= 6
            ? '0 0 8px #27ae6044'
            : '0 0 8px #e74c3c44';
    });

    // Profile picture preview with fade-in effect
    const picInput = document.getElementById('profilePic');
    const picPreview = document.getElementById('picPreview');
    if (picInput && picPreview) {
        picInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    picPreview.src = ev.target.result;
                    picPreview.style.opacity = 0;
                    picPreview.style.display = 'block';
                    setTimeout(() => {
                        picPreview.style.transition = 'opacity 0.5s';
                        picPreview.style.opacity = 1;
                    }, 50);
                };
                reader.readAsDataURL(file);
            } else {
                picPreview.style.display = 'none';
            }
        });
    }

    // Animated submit button and success message with confetti effect
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
            confettiBurst();
        }, 1200);
    });

    // Confetti burst effect
    function confettiBurst() {
        for (let i = 0; i < 24; i++) {
            const conf = document.createElement('div');
            conf.className = 'confetti';
            conf.style.left = Math.random() * 100 + 'vw';
            conf.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
            conf.style.animationDuration = 0.7 + Math.random() * 0.8 + 's';
            document.body.appendChild(conf);
            setTimeout(() => conf.remove(), 1500);
        }
    }
});