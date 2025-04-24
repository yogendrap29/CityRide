document.addEventListener('DOMContentLoaded', function() {
    // Search rides functionality
    const searchRidesBtn = document.getElementById('search-rides-btn');
    if (searchRidesBtn) {
        searchRidesBtn.addEventListener('click', searchRides);
    }
    
    // Clear search form
    const clearSearchBtn = document.getElementById('clear-search-btn');
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', function() {
            document.getElementById('search-pickup').value = '';
            document.getElementById('search-dropoff').value = '';
            document.getElementById('search-date').value = '';
            document.getElementById('search-city').value = '';
            document.getElementById('vehicle-filter').value = '';
            document.getElementById('price-range').value = 50;
            document.getElementById('price-value').textContent = '$50';
        });
    }
    
    // Price range slider
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', function() {
            priceValue.textContent = `$${this.value}`;
        });
    }
    
    // Apply filters
    const applyFilters = document.getElementById('apply-filters');
    if (applyFilters) {
        applyFilters.addEventListener('click', searchRides);
    }
    
    // Display available rides on page load with sample data
    generateSampleRides();
    displayBookedRides();
});

// Search rides function
function searchRides() {
    const pickup = document.getElementById('search-pickup').value.toLowerCase();
    const dropoff = document.getElementById('search-dropoff').value.toLowerCase();
    const date = document.getElementById('search-date').value;
    const city = document.getElementById('search-city').value;
    const vehicleType = document.getElementById('vehicle-filter').value;
    const maxPrice = document.getElementById('price-range').value;
    
    // Get shared rides from localStorage (in a real app, this would be from an API)
    let availableRides = getSampleRides();
    
    // Filter rides based on search criteria
    if (pickup) {
        availableRides = availableRides.filter(ride => 
            ride.pickupLocation.toLowerCase().includes(pickup)
        );
    }
    
    if (dropoff) {
        availableRides = availableRides.filter(ride => 
            ride.dropLocation.toLowerCase().includes(dropoff)
        );
    }
    
    if (date) {
        availableRides = availableRides.filter(ride => 
            ride.rideDate === date
        );
    }
    
    if (city) {
        availableRides = availableRides.filter(ride => 
            ride.city === city
        );
    }
    
    if (vehicleType) {
        availableRides = availableRides.filter(ride => 
            ride.vehicleType === vehicleType
        );
    }
    
    availableRides = availableRides.filter(ride => 
        parseFloat(ride.fare) <= parseFloat(maxPrice)
    );
    
    // Display filtered rides
    displayAvailableRides(availableRides);
}

// Display available rides
function displayAvailableRides(rides) {
    const rideResultsList = document.getElementById('ride-results-list');
    const resultsCount =   {
    const rideResultsList = document.getElementById('ride-results-list');
    const resultsCount = document.getElementById('results-count');
    
    if (!rideResultsList || !resultsCount) return;
    
    // Update results count
    resultsCount.textContent = `${rides.length} rides found`;
    
    if (rides.length === 0) {
        rideResultsList.innerHTML = '<p class="no-rides-message">No rides available. Try adjusting your search criteria.</p>';
        return;
    }
    
    let html = '';
    rides.forEach(ride => {
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
                        <span class="ride-detail">👤 ${ride.riderName}</span>
                        <span class="ride-detail">📅 ${formattedDate}</span>
                        <span class="ride-detail">⏰ ${ride.rideTime}</span>
                        <span class="ride-detail">🏙️ ${ride.city}</span>
                        <span class="ride-detail">💺 ${ride.seats} seat(s) available</span>
                    </div>
                </div>
                <div class="ride-actions">
                    <div class="ride-price">$${ride.fare}</div>
                    <button class="btn btn-primary book-ride" data-id="${ride.id}">Join Ride</button>
                </div>
            </div>
        `;
    });
    
    rideResultsList.innerHTML = html;
    
    // Add event listeners to book buttons
    const bookButtons = document.querySelectorAll('.book-ride');
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const rideId = parseInt(this.getAttribute('data-id'));
            bookRide(rideId);
        });
    });
}

// Book a ride
function bookRide(rideId) {
    // Get the ride details
    const rides = getSampleRides();
    const ride = rides.find(r => r.id === rideId);
    
    if (!ride) {
        alert('Ride not found.');
        return;
    }
    
    // Confirm booking
    if (confirm(`Do you want to join the ride from ${ride.pickupLocation} to ${ride.dropLocation} for $${ride.fare}?`)) {
        // Save booked ride to localStorage
        let bookedRides = JSON.parse(localStorage.getItem('bookedRides')) || [];
        
        // Check if already booked
        if (bookedRides.some(r => r.id === rideId)) {
            alert('You have already booked this ride.');
            return;
        }
        
        // Add to booked rides
        bookedRides.push({
            ...ride,
            bookedAt: new Date().toISOString()
        });
        
        localStorage.setItem('bookedRides', JSON.stringify(bookedRides));
        
        // Show success message
        alert('Ride booked successfully!');
        
        // Update booked rides display
        displayBookedRides();
    }
}

// Display booked rides
function displayBookedRides() {
    const bookedRidesList = document.getElementById('booked-rides-list');
    if (!bookedRidesList) return;
    
    const bookedRides = JSON.parse(localStorage.getItem('bookedRides')) || [];
    
    if (bookedRides.length === 0) {
        bookedRidesList.innerHTML = '<p class="no-rides-message">You haven\'t booked any rides yet.</p>';
        return;
    }
    
    let html = '';
    bookedRides.forEach(ride => {
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
                        <span class="ride-detail">👤 ${ride.riderName}</span>
                        <span class="ride-detail">📅 ${formattedDate}</span>
                        <span class="ride-detail">⏰ ${ride.rideTime}</span>
                        <span class="ride-detail">🏙️ ${ride.city}</span>
                    </div>
                </div>
                <div class="ride-actions">
                    <div class="ride-price">$${ride.fare}</div>
                    <button class="btn btn-secondary cancel-booking" data-id="${ride.id}">Cancel Booking</button>
                </div>
            </div>
        `;
    });
    
    bookedRidesList.innerHTML = html;
    
    // Add event listeners to cancel buttons
    const cancelButtons = document.querySelectorAll('.cancel-booking');
    cancelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const rideId = parseInt(this.getAttribute('data-id'));
            cancelBooking(rideId);
        });
    });
}

// Cancel a booking
function cancelBooking(rideId) {
    if (confirm('Are you sure you want to cancel this booking?')) {
        let bookedRides = JSON.parse(localStorage.getItem('bookedRides')) || [];
        bookedRides = bookedRides.filter(ride => ride.id !== rideId);
        localStorage.setItem('bookedRides', JSON.stringify(bookedRides));
        displayBookedRides();
    }
}

// Generate sample rides for demonstration
function generateSampleRides() {
    // Only generate if no sample rides exist
    if (!localStorage.getItem('sampleRidesGenerated')) {
        const sampleRides = [
            {
                id: 1,
                riderName: 'John D.',
                pickupLocation: 'Downtown',
                dropLocation: 'Uptown',
                rideDate: '2023-12-15',
                rideTime: '08:30',
                vehicleType: 'scooter',
                fare: '12.50',
                seats: '1',
                city: 'new-york',
                comments: 'Regular commute, I do this route every weekday.'
            },
            {
                id: 2,
                riderName: 'Sarah M.',
                pickupLocation: 'Central Park',
                dropLocation: 'Brooklyn Heights',
                rideDate: '2023-12-16',
                rideTime: '09:15',
                vehicleType: 'motorbike',
                fare: '15.00',
                seats: '1',
                city: 'new-york',
                comments: 'I have an extra helmet.'
            },
            {
                id: 3,
                riderName: 'Mike T.',
                pickupLocation: 'Wrigleyville',
                dropLocation: 'The Loop',
                rideDate: '2023-12-15',
                rideTime: '07:45',
                vehicleType: 'scooter',
                fare: '10.00',
                seats: '1',
                city: 'chicago',
                comments: ''
            },
            {
                id: 4,
                riderName: 'Emily R.',
                pickupLocation: 'Venice Beach',
                dropLocation: 'Downtown LA',
                rideDate: '2023-12-17',
                rideTime: '10:00',
                vehicleType: 'motorbike',
                fare: '18.75',
                seats: '1',
                city: 'los-angeles',
                comments: 'Traffic might be heavy, but I know shortcuts.'
            },
            {
                id: 5,
                riderName: 'David K.',
                pickupLocation: 'Fisherman\'s Wharf',
                dropLocation: 'SoMa',
                rideDate: '2023-12-16',
                rideTime: '08:00',
                vehicleType: 'scooter',
                fare: '9.50',
                seats: '1',
                city: 'san-francisco',
                comments: 'Scenic route along the Embarcadero.'
            },
            {
                id: 6,
                riderName: 'Lisa P.',
                pickupLocation: 'South Beach',
                dropLocation: 'Wynwood',
                rideDate: '2023-12-18',
                rideTime: '11:30',
                vehicleType: 'motorbike',
                fare: '14.25',
                seats: '1',
                city: 'miami',
                comments: 'I ride safely and have great music!'
            }
        ];
        
        localStorage.setItem('sampleRides', JSON.stringify(sampleRides));
        localStorage.setItem('sampleRidesGenerated', 'true');
    }
    
    // Display sample rides
    displayAvailableRides(getSampleRides());
}

// Get sample rides
function getSampleRides() {
    return JSON.parse(localStorage.getItem('sampleRides')) || [];
}