// Mock user data
const mockUsers = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '123-456-7890',
        role: 'user'
    },
    {
        id: 2,
        name: 'Tech Support',
        email: 'tech@example.com',
        password: 'admin123',
        phone: '098-765-4321',
        role: 'provider'
    }
];

// Handle login form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Find user in mock data
        const user = mockUsers.find(u => u.email === email && u.password === password);

        if (user) {
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(user));

            // Redirect based on role
            if (user.role === 'provider') {
                window.location.href = 'provider-dashboard.html';
            } else {
                window.location.href = 'user-dashboard.html';
            }
        } else {
            // Show error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = 'Invalid email or password';
            loginForm.appendChild(errorDiv);

            // Remove error message after 3 seconds
            setTimeout(() => {
                errorDiv.remove();
            }, 3000);
        }
    });
}

// Handle registration form submission
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;

        // Check if user already exists
        if (mockUsers.some(u => u.email === email)) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = 'Email already registered';
            registerForm.appendChild(errorDiv);

            setTimeout(() => {
                errorDiv.remove();
            }, 3000);
            return;
        }

        // Create new user
        const newUser = {
            id: mockUsers.length + 1,
            name,
            email,
            phone,
            password,
            role: 'user'
        };

        // Add to mock data
        mockUsers.push(newUser);

        // Store user data and redirect
        localStorage.setItem('user', JSON.stringify(newUser));
        window.location.href = 'user-dashboard.html';
    });
}