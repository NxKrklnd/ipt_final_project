// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Mock authentication state
let isLoggedIn = false;
let currentUser = null;

// Check authentication status
function checkAuth() {
    const user = localStorage.getItem('user');
    if (user) {
        isLoggedIn = true;
        currentUser = JSON.parse(user);
        updateNavigation();
    }
}

// Update navigation based on auth status
function updateNavigation() {
    const loginBtn = document.querySelector('.login-btn');
    if (isLoggedIn && loginBtn) {
        loginBtn.textContent = 'Logout';
        loginBtn.href = '#';
        loginBtn.addEventListener('click', logout);
    }
}

// Logout function
function logout(e) {
    e.preventDefault();
    localStorage.removeItem('user');
    isLoggedIn = false;
    currentUser = null;
    window.location.href = '/index.html';
}

// Initialize
document.addEventListener('DOMContentLoaded', checkAuth);