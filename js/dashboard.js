// Mock appointment data
const mockAppointments = [
    {
        id: 1,
        userId: 1,
        deviceType: 'Phone',
        brand: 'iPhone',
        model: '12 Pro',
        problem: 'Screen replacement',
        date: '2024-02-20',
        time: '10:00',
        status: 'scheduled'
    },
    {
        id: 2,
        userId: 1,
        deviceType: 'Laptop',
        brand: 'Dell',
        model: 'XPS 13',
        problem: 'Battery replacement',
        date: '2024-02-25',
        time: '14:00',
        status: 'scheduled'
    }
];

// Load user data and update dashboard
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Update welcome message
    document.getElementById('userName').textContent = user.name;

    // Update profile information
    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('profilePhone').textContent = user.phone;

    // Load upcoming appointment
    const userAppointments = mockAppointments.filter(apt => apt.userId === user.id);
    const upcomingAppointment = userAppointments.find(apt => new Date(`${apt.date} ${apt.time}`) > new Date());

    const upcomingAppointmentElement = document.getElementById('upcomingAppointment');
    if (upcomingAppointment) {
        upcomingAppointmentElement.innerHTML = `
            <div class="appointment-info">
                <p><strong>Date:</strong> ${upcomingAppointment.date}</p>
                <p><strong>Time:</strong> ${upcomingAppointment.time}</p>
                <p><strong>Device:</strong> ${upcomingAppointment.deviceType} - ${upcomingAppointment.brand} ${upcomingAppointment.model}</p>
                <p><strong>Service:</strong> ${upcomingAppointment.problem}</p>
                <p><strong>Status:</strong> ${upcomingAppointment.status.charAt(0).toUpperCase() + upcomingAppointment.status.slice(1)}</p>
            </div>
        `;
    }
});

// Provider dashboard specific functions
if (document.querySelector('.provider-dashboard')) {
    // Update stats
    const todayAppointments = mockAppointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]);
    
    document.getElementById('totalToday').textContent = todayAppointments.length;
    document.getElementById('completed').textContent = todayAppointments.filter(apt => apt.status === 'completed').length;
    document.getElementById('pending').textContent = todayAppointments.filter(apt => apt.status === 'scheduled').length;

    // Update appointment status
    function updateAppointmentStatus(appointmentId, status) {
        const appointment = mockAppointments.find(apt => apt.id === appointmentId);
        if (appointment) {
            appointment.status = status;
            // In a real application, this would make an API call to update the backend
            updateAppointmentsList();
        }
    }

    // Render appointments list
    function updateAppointmentsList() {
        const appointmentsList = document.getElementById('todayAppointments');
        appointmentsList.innerHTML = todayAppointments.map(apt => `
            <li class="appointment-item">
                <div class="appointment-info">
                    <p><strong>Time:</strong> ${apt.time}</p>
                    <p><strong>Customer:</strong> ${mockUsers.find(u => u.id === apt.userId)?.name}</p>
                    <p><strong>Device:</strong> ${apt.deviceType} - ${apt.brand} ${apt.model}</p>
                    <p><strong>Service:</strong> ${apt.problem}</p>
                </div>
                <div class="status-buttons">
                    <button onclick="updateAppointmentStatus(${apt.id}, 'in-progress')" 
                            class="status-button in-progress"
                            ${apt.status === 'in-progress' ? 'disabled' : ''}>In Progress</button>
                    <button onclick="updateAppointmentStatus(${apt.id}, 'completed')"
                            class="status-button completed"
                            ${apt.status === 'completed' ? 'disabled' : ''}>Complete</button>
                    <button onclick="updateAppointmentStatus(${apt.id}, 'cancelled')"
                            class="status-button cancelled"
                            ${apt.status === 'cancelled' ? 'disabled' : ''}>Cancel</button>
                </div>
            </li>
        `).join('');
    }

    // Initial render
    updateAppointmentsList();
}