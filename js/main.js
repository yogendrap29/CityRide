// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Fare estimation on homepage
    const estimateBtn = document.getElementById('estimate-btn');
    if (estimateBtn) {
        estimateBtn.addEventListener('click', calculateFare);
    }
});

// Fare calculation function
function calculateFare() {
    const pickup = document.getElementById('pickup').value;
    const dropoff = document.getElementById('dropoff').value;
    const date = document.getElementById('date').value;
    const city = document.getElementById('city').value;
    const fareResult = document.getElementById('fare-result');
    const fareAmount = document.getElementById('fare-amount');
    
    // Validate inputs
    if (!pickup || !dropoff || !date || !city) {
        alert('Please fill in all fields to get a fare estimate.');
        return;
    }
    
    // Simulate fare calculation (in a real app, this would call an API)
    const baseFare = 5;
    const distanceFactor = Math.random() * 10 + 5; // Random distance factor between 5-15
    const cityMultiplier = getCityMultiplier(city);
    const calculatedFare = (baseFare + distanceFactor) * cityMultiplier;
    
    // Display the result
    fareAmount.textContent = `$${calculatedFare.toFixed(2)}`;
    fareResult.classList.remove('hidden');
}

// Helper function to get city multiplier
function getCityMultiplier(city) {
    const multipliers = {
        'new-york': 1.5,
        'chicago': 1.3,
        'los-angeles': 1.4,
        'san-francisco': 1.6,
        'miami': 1.2
    };
    
    return multipliers[city] || 1;
}