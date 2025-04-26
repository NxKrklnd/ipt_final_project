// Mock appointments data (in a real app, this would come from an API)
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
        status: 'scheduled',
        notes: 'Screen has multiple cracks'
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
        status: 'scheduled',
        notes: 'Battery only lasts 1 hour'
    }
];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Get filter elements
    const statusFilter = document.getElementById('statusFilter');
    const dateSort = document.getElementById('dateSort');

    // Add event listeners for filters
    statusFilter.addEventListener('change', updateAppointmentsList);
    dateSort.addEventListener('change', updateAppointmentsList);

    // Initial render
    updateAppointmentsList();
});

// Update appointments list based on filters
function updateAppointmentsList() {
    const user = JSON.parse(localStorage.getItem('user'));
    const statusFilter = document.getElementById('statusFilter').value;
    const dateSort = document.getElementById('dateSort').value;

    // Filter appointments
    let filteredAppointments = mockAppointments.filter(apt => apt.userId === user.id);
    
    if (statusFilter !== 'all') {
        filteredAppointments = filteredAppointments.filter(apt => apt.status === statusFilter);
    }

    // Sort appointments
    filteredAppointments.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateSort === 'newest' ? dateB - dateA : dateA - dateB;
    });

    // Update UI
    const appointmentsList = document.getElementById('appointmentsList');
    const noAppointments = document.getElementById('noAppointments');

    if (filteredAppointments.length === 0) {
        appointmentsList.style.display = 'none';
        noAppointments.style.display = 'block';
    } else {
        appointmentsList.style.display = 'grid';
        noAppointments.style.display = 'none';

        appointmentsList.innerHTML = filteredAppointments.map(apt => `
            <div class="appointment-card">
                <div class="appointment-header">
                    <div class="appointment-date">${formatDate(apt.date)} at ${apt.time}</div>
                    <div class="appointment-status status-${apt.status}">
                        ${capitalizeFirstLetter(apt.status)}
                    </div>
                </div>
                <div class="appointment-details">
                    <p><strong>Device Type:</strong> ${apt.deviceType}</p>
                    <p><strong>Brand/Model:</strong> ${apt.brand} ${apt.model}</p>
                    <p><strong>Problem:</strong> ${apt.problem}</p>
                    ${apt.notes ? `<p><strong>Notes:</strong> ${apt.notes}</p>` : ''}
                </div>
            </div>
        `).join('');
    }
}

// Helper function to format date
function formatDate(dateStr) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}