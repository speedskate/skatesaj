// Admin credentials (in a real application, these would be stored securely on a server)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Handle Admin Login
function handleAdminLogin(event) {
    event.preventDefault();
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        document.getElementById('adminLoginSection').classList.add('hidden');
        document.getElementById('adminDashboard').classList.remove('hidden');
        loadBatches();
        loadEnquiries();
    } else {
        alert('Invalid credentials. Please try again.');
    }
    return false;
}

// Admin Logout
function adminLogout() {
    document.getElementById('adminDashboard').classList.add('hidden');
    document.getElementById('adminLoginSection').classList.remove('hidden');
    document.getElementById('adminLoginForm').reset();
}

// Sidebar Navigation
document.querySelectorAll('.sidebar li').forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        document.querySelectorAll('.sidebar li').forEach(i => i.classList.remove('active'));
        // Add active class to clicked item
        item.classList.add('active');
        
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.add('hidden');
        });
        
        // Show selected section
        const sectionId = item.dataset.section;
        document.getElementById(sectionId).classList.remove('hidden');
    });
});

// Batch Management
function loadBatches() {
    const batchesList = document.getElementById('batchesList');
    const batches = JSON.parse(localStorage.getItem('batches')) || [];
    
    batchesList.innerHTML = '';
    batches.forEach(batch => {
        const batchCard = document.createElement('div');
        batchCard.className = 'batch-card';
        batchCard.innerHTML = `
            <h3>${batch.name}</h3>
            <p><strong>Timing:</strong> ${batch.timing}</p>
            <p><strong>Coach:</strong> ${batch.coach}</p>
            <p><strong>Fees:</strong> ₹${batch.fees}</p>
            <div class="batch-actions">
                <button onclick="editBatch(${batch.id})" class="edit-btn">Edit</button>
                <button onclick="deleteBatch(${batch.id})" class="delete-btn">Delete</button>
            </div>
        `;
        batchesList.appendChild(batchCard);
    });
}

function showAddBatchForm() {
    document.getElementById('addBatchForm').classList.remove('hidden');
}

function cancelAddBatch() {
    document.getElementById('addBatchForm').classList.add('hidden');
    document.getElementById('batchForm').reset();
}

// Handle batch form submission
document.getElementById('batchForm').onsubmit = function(e) {
    e.preventDefault();
    const batches = JSON.parse(localStorage.getItem('batches')) || [];
    
    const newBatch = {
        id: Date.now(),
        name: document.getElementById('batchName').value,
        timing: document.getElementById('timing').value,
        coach: document.getElementById('coach').value,
        fees: parseInt(document.getElementById('fees').value)
    };
    
    batches.push(newBatch);
    localStorage.setItem('batches', JSON.stringify(batches));
    
    this.reset();
    cancelAddBatch();
    loadBatches();
};

function deleteBatch(id) {
    if (confirm('Are you sure you want to delete this batch?')) {
        let batches = JSON.parse(localStorage.getItem('batches')) || [];
        batches = batches.filter(batch => batch.id !== id);
        localStorage.setItem('batches', JSON.stringify(batches));
        loadBatches();
    }
}

function editBatch(id) {
    const batches = JSON.parse(localStorage.getItem('batches')) || [];
    const batch = batches.find(b => b.id === id);
    
    if (batch) {
        document.getElementById('batchName').value = batch.name;
        document.getElementById('timing').value = batch.timing;
        document.getElementById('coach').value = batch.coach;
        document.getElementById('fees').value = batch.fees;
        
        showAddBatchForm();
        // Remove the old batch and add the updated one when form is submitted
        deleteBatch(id);
    }
}

// Enquiries Management
function loadEnquiries() {
    const enquiriesList = document.getElementById('enquiriesList');
    const enquiries = JSON.parse(localStorage.getItem('enquiries')) || [];
    
    enquiriesList.innerHTML = enquiries.length === 0 ? 
        '<p class="no-data">No enquiries yet</p>' :
        enquiries.map(enquiry => `
            <div class="enquiry-card">
                <h3>${enquiry.name}</h3>
                <p><strong>Email:</strong> ${enquiry.email}</p>
                <p><strong>Phone:</strong> ${enquiry.phone}</p>
                <p><strong>Message:</strong> ${enquiry.message}</p>
                <button onclick="deleteEnquiry(${enquiry.id})" class="delete-btn">Delete</button>
            </div>
        `).join('');
}

function deleteEnquiry(id) {
    if (confirm('Are you sure you want to delete this enquiry?')) {
        let enquiries = JSON.parse(localStorage.getItem('enquiries')) || [];
        enquiries = enquiries.filter(enquiry => enquiry.id !== id);
        localStorage.setItem('enquiries', JSON.stringify(enquiries));
        loadEnquiries();
    }
}

// Settings Management
document.getElementById('settingsForm').onsubmit = function(e) {
    e.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    
    if (newUsername) ADMIN_CREDENTIALS.username = newUsername;
    if (newPassword) ADMIN_CREDENTIALS.password = newPassword;
    
    alert('Settings updated successfully!');
    this.reset();
};
