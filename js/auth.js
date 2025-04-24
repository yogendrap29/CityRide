document.addEventListener('DOMContentLoaded', function() {
    // Login form validation and submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember')?.checked;
            
            // Reset error messages
            document.getElementById('email-error').textContent = '';
            document.getElementById('password-error').textContent = '';
            
            // Validate email
            if (!email) {
                document.getElementById('email-error').textContent = 'Email is required';
                return;
            } else if (!isValidEmail(email)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address';
                return;
            }
            
            // Validate password
            if (!password) {
                document.getElementById('password-error').textContent = 'Password is required';
                return;
            }
            
            // Simulate login (in a real app, this would call an API)
            simulateLogin(email, remember);
        });
    }
    
    // Sign up form validation and submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('signup-email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const terms = document.getElementById('terms').checked;
            
            // Reset error messages
            document.getElementById('first-name-error').textContent = '';
            document.getElementById('last-name-error').textContent = '';
            document.getElementById('signup-email-error').textContent = '';
            document.getElementById('phone-error').textContent = '';
            document.getElementById('signup-password-error').textContent = '';
            document.getElementById('confirm-password-error').textContent = '';
            document.getElementById('terms-error').textContent = '';
            
            // Validate first name
            if (!firstName) {
                document.getElementById('first-name-error').textContent = 'First name is required';
                return;
            }
            
            // Validate last name
            if (!lastName) {
                document.getElementById('last-name-error').textContent = 'Last name is required';
                return;
            }
            
            // Validate email
            if (!email) {
                document.getElementById('signup-email-error').textContent = 'Email is required';
                return;
            } else if (!isValidEmail(email)) {
                document.getElementById('signup-email-error').textContent = 'Please enter a valid email address';
                return;
            }
            
            // Validate phone
            if (!phone) {
                document.getElementById('phone-error').textContent = 'Phone number is required';
                return;
            } else if (!isValidPhone(phone)) {
                document.getElementById('phone-error').textContent = 'Please enter a valid phone number';
                return;
            }
            
            // Validate password
            if (!password) {
                document.getElementById('signup-password-error').textContent = 'Password is required';
                return;
            } else if (password.length < 8) {
                document.getElementById('signup-password-error').textContent = 'Password must be at least 8 characters';
                return;
            }
            
            // Validate confirm password
            if (!confirmPassword) {
                document.getElementById('confirm-password-error').textContent = 'Please confirm your password';
                return;
            } else if (password !== confirmPassword) {
                document.getElementById('confirm-password-error').textContent = 'Passwords do not match';
                return;
            }
            
            // Validate terms
            if (!terms) {
                document.getElementById('terms-error').textContent = 'You must agree to the Terms of Service';
                return;
            }
            
            // Simulate signup (in a real app, this would call an API)
            simulateSignup(firstName, lastName, email, phone);
        });
    }
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation helper
function isValidPhone(phone) {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phone.replace(/[-()\s]/g, ''));
}

// Simulate login
function simulateLogin(email, remember) {
    // In a real app, this would call an API endpoint
    
    // Simulate loading
    const loginButton = document.querySelector('#login-form button[type="submit"]');
    loginButton.textContent = 'Logging in...';
    loginButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(function() {
        // Store user info in localStorage (for demo purposes only)
        const user = {
            email: email,
            name: email.split('@')[0],
            loggedIn: true,
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Redirect to home page
        window.location.href = 'index.html';
    }, 1500);
}

// Simulate signup
function simulateSignup(firstName, lastName, email, phone) {
    // In a real app, this would call an API endpoint
    
    // Simulate loading
    const signupButton = document.querySelector('#signup-form button[type="submit"]');
    signupButton.textContent = 'Creating Account...';
    signupButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(function() {
        // Store user info in localStorage (for demo purposes only)
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            name: `${firstName} ${lastName}`,
            loggedIn: true,
            signupTime: new Date().toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Redirect to home page
        window.location.href = 'index.html';
    }, 1500);
}