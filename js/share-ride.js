document.addEventListener('DOMContentLoaded', function() {
    // Image preview functionality
    const vehicleImage = document.getElementById('vehicle-image');
    const previewImg = document.getElementById('preview-img');
    
    if (vehicleImage && previewImg) {
        vehicleImage.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImg.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Share ride form submission
    const shareRideForm = document.getElementById('share-ride-form');
    if (shareRideForm) {
        shareRideForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const pickupLocation = document.getElementById('pickup-location').value;
            const dropLocation = document.getElementById('drop-location').value;
            const rideDate = document.getElementById('ride-date').value;
            const rideTime = document.getElementById('ride-time').value;
            const vehicleType = document.getElementById('vehicle-type').value;
            const fare = document.getElementById('fare').value;
            const seats = document.getElementById('seats').value;
            const city = document.getElementById('city-select').value;
            const comments = document.getElementById('comments').value;
            
            // Validate form
            if (!pickupLocation || !dropLocation || !rideDate || !rideTime || !vehicleType || !fare || !seats || !city) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Create ride object
            const ride = {
                id: Date.now(),
                pickupLocation,
                dropLocation,
                rideDate,
                rideTime,
                vehicleType,
                fare,
                seats,
                city,
                comments,
                createdAt: new Date().toISOString()
            };
            
            // Save to localStorage
            saveSharedRide(ride);
            
            // Show success message
            alert('Your ride has been shared successfully!');
            
            // Reset form
            shareRideForm.reset();
            previewImg.src = 'images/vehicle-placeholder.png';
            
            // Update shared rides list
            displaySharedRides();
        });
    }
    
    // Display shared rides on page load
    displaySharedRides();
});

// Save shared ride to localStorage
function saveSharedRide(ride) {
    let sharedRides = JSON.parse(localStorage.getItem('sharedRides')) || [];
    sharedRides.push(ride);
    localStorage.setItem('sharedRides', JSON.stringify(sharedRides));
}

// Display shared rides
function displaySharedRides() {
    const sharedRidesList = document.getElementById('shared-rides-list');
    if (!sharedRidesList) return;
    
    const sharedRides = JSON.parse(localStorage.getItem('sharedRides')) || [];
    
    if (sharedRides.length === 0) {
        sharedRidesList.innerHTML = '<p class="no-rides-message">You haven\'t shared any rides yet.</p>';
        return;
    }
    
    let html = '';
    sharedRides.forEach(ride => {
        const dateObj = new Date(ride.rideDate);
        const formattedDate = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        
        html += `
            <div class="ride-card">
                <div class="ride-vehicle">
                    <img src="images/${ride.vehicleType}-icon.png" alt="${ride.vehicleType}" onerror="this.src='images/vehicle-placeholder.png'">
                </div>
                <div class="ride-info">
                    <h3>${ride.pickupLocation} to ${ride.dropLocation}</h3>
                    <div class="ride-details">
                        <span class="ride-detail">📅 ${formattedDate}</span>
                        <span class="ride-detail">⏰ ${ride.rideTime}</span>
                        <span class="ride-detail">🏙️ ${ride.city}</span>
                        <span class="ride-detail">💺 ${ride.seats} seat(s)</span>
                    </div>
                    ${ride.comments ? `<p class="ride-comments">${ride.comments}</p>` : ''}
                </div>
                <div class="ride-actions">
                    <div class="ride-price">$${ride.fare}</div>
                    <button class="btn btn-secondary delete-ride" data-id="${ride.id}">Cancel Ride</button>
                </div>
            </div>
        `;
    });
    
    sharedRidesList.innerHTML = html;
    
    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-ride');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const rideId = parseInt(this.getAttribute('data-id'));
            deleteSharedRide(rideId);
        });
    });
}

// Delete shared ride
function deleteSharedRide(rideId) {
    if (confirm('Are you sure you want to cancel this ride?')) {
        let sharedRides = JSON.parse(localStorage.getItem('sharedRides')) || [];
        sharedRides = sharedRides.filter(ride => ride.id !== rideId);
        localStorage.setItem('sharedRides', JSON.stringify(sharedRides));
        displaySharedRides();
    }
}