// Smart Ride Rwanda - JavaScript Functions

// Slideshow functionality
let slideIndex = 1;
let autoSlideTimer;

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    
    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    
    // Show current slide and activate corresponding dot
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add("active");
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add("active");
    }
}

function plusSlides(n) {
    clearInterval(autoSlideTimer);
    showSlides(slideIndex += n);
    startAutoSlide();
}

function currentSlide(n) {
    clearInterval(autoSlideTimer);
    showSlides(slideIndex = n);
    startAutoSlide();
}

function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
        slideIndex++;
        showSlides(slideIndex);
    }, 4000); // Change slide every 4 seconds
}

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function openDriverModal(vehicleType) {
    openModal('driverModal');
    if (vehicleType) {
        document.getElementById('vehicleType').value = vehicleType;
        showCapacityField();
    }
}

// Form Functions
function showCapacityField() {
    const vehicleType = document.getElementById('vehicleType').value;
    const capacityGroup = document.getElementById('capacityGroup');
    
    if (vehicleType === 'taxi') {
        capacityGroup.classList.remove('hidden');
        document.getElementById('vehicleCapacity').required = true;
    } else {
        capacityGroup.classList.add('hidden');
        document.getElementById('vehicleCapacity').required = false;
    }
}

function showPassengerCount() {
    const rideType = document.getElementById('rideType').value;
    const passengerCountGroup = document.getElementById('passengerCountGroup');
    
    if (rideType === 'taxi') {
        passengerCountGroup.classList.remove('hidden');
    } else {
        passengerCountGroup.classList.add('hidden');
        document.getElementById('passengerCount').value = '1';
    }
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                document.getElementById('pickupLocation').value = `Current Location (${lat.toFixed(4)}, ${lon.toFixed(4)})`;
                alert('Location detected successfully!');
            },
            function(error) {
                alert('Unable to get location. Please enter manually.');
            }
        );
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function signInWithGoogle(userType) {
    alert(`Google Sign-In for ${userType} would be implemented here. This will integrate with Google OAuth API.`);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slideshow
    showSlides(slideIndex);
    startAutoSlide();
    
    // Driver form submission
    document.getElementById('driverForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            email: document.getElementById('driverEmail').value,
            name: document.getElementById('driverName').value,
            vehicleType: document.getElementById('vehicleType').value,
            capacity: document.getElementById('vehicleCapacity').value || 1,
            license: document.getElementById('drivingLicense').files[0]
        };
        
        alert('Driver registration submitted! You will be contacted once your license is verified.');
        closeModal('driverModal');
    });

    // Passenger form submission
    document.getElementById('passengerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            location: document.getElementById('pickupLocation').value,
            rideType: document.getElementById('rideType').value,
            passengers: document.getElementById('passengerCount').value || 1
        };
        
        // Simulate finding nearby drivers
        const mockDrivers = [
            { name: 'Jean Claude', phone: '+250 788 123 456', vehicle: formData.rideType, rating: 4.8 },
            { name: 'Marie Uwimana', phone: '+250 788 234 567', vehicle: formData.rideType, rating: 4.9 },
            { name: 'Patrick Nkurunziza', phone: '+250 788 345 678', vehicle: formData.rideType, rating: 4.7 }
        ];
        
        let resultHTML = `<h3>Available ${formData.rideType}s near ${formData.location}:</h3><br>`;
        mockDrivers.forEach(driver => {
            resultHTML += `
                <div style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 10px;">
                    <strong>${driver.name}</strong> - ${driver.vehicle}<br>
                    Phone: <a href="tel:${driver.phone}">${driver.phone}</a><br>
                    Rating: ${'⭐'.repeat(Math.floor(driver.rating))} ${driver.rating}/5
                </div>
            `;
        });
        
        document.querySelector('#passengerModal .modal-content').innerHTML = `
            <span class="close" onclick="closeModal('passengerModal')">&times;</span>
            <h2>Available Rides</h2>
            ${resultHTML}
            <button class="btn btn-secondary" onclick="location.reload()">Search Again</button>
        `;
    });
});

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Pause slideshow on hover
document.addEventListener('DOMContentLoaded', function() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', function() {
            clearInterval(autoSlideTimer);
        });
        
        slideshowContainer.addEventListener('mouseleave', function() {
            startAutoSlide();
        });
    }
});

// Keyboard navigation for slideshow
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        plusSlides(-1);
    } else if (event.key === 'ArrowRight') {
        plusSlides(1);
    }
});

// Form validation functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#e0e0e0';
        }
        
        if (input.type === 'email' && !validateEmail(input.value)) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        }
    });
    
    return isValid;
}

// Animation functions
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .user-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.feature-card, .user-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});