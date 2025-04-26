// Handle booking form submission
const bookingForm = document.getElementById('bookingForm');

// Set minimum date to today
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // Set business hours for time input
    const timeInput = document.getElementById('time');
    timeInput.min = '09:00';
    timeInput.max = '17:00';

    // Check authentication
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        // If not logged in, redirect to login page
        window.location.href = 'login.html';
    }
});

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            deviceType: document.getElementById('deviceType').value,
            brand: document.getElementById('brand').value,
            model: document.getElementById('model').value,
            problem: document.getElementById('problem').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            notes: document.getElementById('notes').value,
            userId: JSON.parse(localStorage.getItem('user')).id,
            status: 'scheduled'
        };

        // Validate time (business hours: 9 AM to 5 PM)
        const timeValue = formData.time;
        if (timeValue < '09:00' || timeValue > '17:00') {
            showMessage('Please select a time between 9 AM and 5 PM', 'error');
            return;
        }

        // In a real application, this would make an API call to save the appointment
        // For now, we'll just show a success message and redirect
        showMessage('Appointment booked successfully!', 'success');
        setTimeout(() => {
            window.location.href = 'user-dashboard.html';
        }, 2000);
    });
}

// Helper function to show messages
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.textContent = message;

    const form = document.querySelector('.booking-form');
    form.insertBefore(messageDiv, form.firstChild);

    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}