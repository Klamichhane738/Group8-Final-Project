const communityBtn = document.getElementById('communityBtn');
const communityModal = document.getElementById('communityModal');
const closeModalBtn = document.getElementById('closeModal');

// Function to open the modal
function openModal() {
    communityModal.setAttribute('aria-hidden', 'false'); // Make modal accessible
    communityModal.style.display = 'block'; // Show the modal
    closeModalBtn.focus(); // Move focus to the "Close" button
}

// Function to close the modal
function closeModal() {
    communityModal.setAttribute('aria-hidden', 'true'); // Hide modal from accessibility tree
    communityModal.style.display = 'none'; // Hide the modal
    communityBtn.focus(); // Return focus to the button that opened the modal
}

// Trap focus within the modal
communityModal.addEventListener('keydown', (event) => {
    const focusableElements = communityModal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.key === 'Tab') {
        if (event.shiftKey) {
            // Shift + Tab: Move focus backward
            if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab: Move focus forward
            if (document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }

    // Close modal with Escape key
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Event listeners for opening and closing
communityBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);


// Form elements
const form = document.getElementById('contactForm');
const checkboxes = form.querySelectorAll('input[type="checkbox"]');
const submitButton = form.querySelector('button[type="submit"]');
const statusMessage = document.createElement('div');

// Configure status message
statusMessage.id = 'statusMessage';
statusMessage.setAttribute('aria-live', 'polite');
statusMessage.setAttribute('role', 'status');
statusMessage.classList.add('status-message');
form.appendChild(statusMessage);

// Handle checkbox keyboard interactions
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('keydown', (e) => {
        // Prevent form submission when pressing Enter on checkboxes
        if (e.key === 'Enter') {
            e.preventDefault();
            checkbox.checked = !checkbox.checked;
            
            // If this is the speakers checkbox, handle the event details visibility
            if (checkbox.id === 'speakers') {
                const eventDetails = document.getElementById('eventDetails');
                if (eventDetails) {
                    eventDetails.hidden = !checkbox.checked;
                }
            }
        }
    });
});

// Show/Hide Event Details when speakers checkbox changes
const speakersCheckbox = document.getElementById('speakers');
if (speakersCheckbox) {
    speakersCheckbox.addEventListener('change', (e) => {
        const eventDetails = document.getElementById('eventDetails');
        if (eventDetails) {
            eventDetails.hidden = !e.target.checked;
        }
    });
}

// Form validation function
function validateForm() {
    const requiredFields = [
        { id: 'email', message: 'Email is required' },
        
    ];

    for (let field of requiredFields) {
        const element = document.getElementById(field.id);
        if (!element.value.trim()) {
            statusMessage.textContent = field.message;
            element.focus();
            return false;
        }
    }
    const emailInput = document.getElementById('email');
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(emailInput.value)) {
        statusMessage.textContent = 'Please enter a valid email address.';
        emailInput.focus();
        return false;
    }

    return true;
}

// Form submission handler
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous messages
    statusMessage.textContent = '';
    
    // Validate form
    if (!validateForm()) {
        return;
    }

    // Prepare success message
    const msg = "Thank you for scheduling a call with Empower Ability Labs! We'll be in touch with you soon.";

    // Display success message
    statusMessage.textContent = msg;
    statusMessage.classList.add('success-message');

    // Reset the form
    form.reset();

    // Set focus back to the submit button for accessibility
    submitButton.focus();

    // Optional: Remove success message after a few seconds
    setTimeout(() => {
        statusMessage.textContent = '';
        statusMessage.classList.remove('success-message');
    }, 5000);
});

// Optional: Email format validation
// Get the email input field
// Get the email input field
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
        hamburger.setAttribute("aria-expanded", !isExpanded);
        navMenu.classList.toggle("open");
    });
});
