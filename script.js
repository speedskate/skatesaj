// Initial batch data
const initialBatches = [
    {
        id: 1,
        name: "Beginner's Batch",
        timing: "6:00 AM - 7:00 AM",
        coach: "John Smith",
        fees: 2000
    },
    {
        id: 2,
        name: "Intermediate Batch",
        timing: "7:00 AM - 8:30 AM",
        coach: "Sarah Johnson",
        fees: 2500
    },
    {
        id: 3,
        name: "Advanced Batch",
        timing: "5:00 PM - 7:00 PM",
        coach: "Mike Wilson",
        fees: 3000
    }
];

// Initialize local storage with batch data if not exists
if (!localStorage.getItem('batches')) {
    localStorage.setItem('batches', JSON.stringify(initialBatches));
}

// Login handling
function handleLogin(event) {
    event.preventDefault();
    const loginId = document.getElementById('loginId').value;
    
    // Simulate sending login details to email
    console.log(`Login details sent to niteshjha9644432@gmail.com: ${loginId}`);
    
    // Show main section and hide login
    document.getElementById('loginSection').classList.add('hidden');
    document.getElementById('mainSection').classList.remove('hidden');
    
    // Load batches after login
    displayBatches();
    return false;
}

// Logout handling
function logout() {
    document.getElementById('mainSection').classList.add('hidden');
    document.getElementById('loginSection').classList.remove('hidden');
    document.getElementById('loginForm').reset();
}

// Display batches in the main section
function displayBatches() {
    const batchesContainer = document.getElementById('batchesContainer');
    const batches = JSON.parse(localStorage.getItem('batches'));
    
    batchesContainer.innerHTML = '';
    batches.forEach(batch => {
        const batchCard = document.createElement('div');
        batchCard.className = 'batch-card';
        batchCard.innerHTML = `
            <h3>${batch.name}</h3>
            <p><strong>Timing:</strong> ${batch.timing}</p>
            <p><strong>Coach:</strong> ${batch.coach}</p>
            <p><strong>Fees:</strong> ₹${batch.fees}</p>
        `;
        batchesContainer.appendChild(batchCard);
    });
}

// Contact form handling
document.getElementById('contactForm').onsubmit = function(e) {
    e.preventDefault();
    const formData = {
        id: Date.now(),
        name: this.elements[0].value,
        email: this.elements[1].value,
        phone: this.elements[2].value,
        message: this.elements[3].value
    };
    
    // Save enquiry to local storage
    const enquiries = JSON.parse(localStorage.getItem('enquiries')) || [];
    enquiries.push(formData);
    localStorage.setItem('enquiries', JSON.stringify(enquiries));
    
    // Show success message
    alert('Thank you for contacting us! We will get back to you soon.');
    this.reset();
};
