// Floating Phone JavaScript - Fixed Version
// Get elements
const floatPhoneBtn = document.getElementById('floatPhoneBtn');
const floatPhoneIcon = document.getElementById('floatPhoneIcon');
const floatPhoneDropdown = document.getElementById('floatPhoneDropdown');
const floatPhoneBackdrop = document.getElementById('floatPhoneBackdrop');
const floatCloseBtn = document.getElementById('floatCloseBtn');
const floatActionBtn = document.getElementById('floatActionBtn');
const floatKeyBtns = document.querySelectorAll('.float-key-btn');
const floatControlBtns = document.querySelectorAll('.float-control-btn');

let isFloatPhoneOpen = false;
let floatCurrentNumber = ''; // Renamed to avoid conflict with existing currentNumber

// Toggle phone dropdown
function toggleFloatPhone() {
    isFloatPhoneOpen = !isFloatPhoneOpen;
    
    if (isFloatPhoneOpen) {
        openFloatPhone();
    } else {
        closeFloatPhone();
    }
}

function openFloatPhone() {
    floatPhoneDropdown.classList.add('active');
    floatPhoneBackdrop.classList.add('active');
    floatPhoneBtn.classList.add('active');
    floatPhoneIcon.className = 'ri-close-line';
    document.body.style.overflow = 'hidden';
}

function closeFloatPhone() {
    floatPhoneDropdown.classList.remove('active');
    floatPhoneBackdrop.classList.remove('active');
    floatPhoneBtn.classList.remove('active');
    floatPhoneIcon.className = 'ri-phone-line';
    document.body.style.overflow = 'auto';
    floatCurrentNumber = '';
}

// Event listeners
floatPhoneBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFloatPhone();
    
    // Add ripple effect
    floatPhoneBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        floatPhoneBtn.style.transform = '';
    }, 150);
});

floatCloseBtn.addEventListener('click', closeFloatPhone);
floatPhoneBackdrop.addEventListener('click', closeFloatPhone);

// Keypad functionality
floatKeyBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const key = this.getAttribute('data-key');
        if (floatCurrentNumber.length < 15) {
            floatCurrentNumber += key;
            
            // Add visual feedback
            this.style.transform = 'scale(0.9)';
            this.style.background = '#20c997';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.background = '#f8f9fa';
                this.style.color = '#495057';
            }, 150);
            
            // Show haptic feedback (if supported)
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
            
            console.log('Float phone current number:', floatCurrentNumber);
        }
    });
});

// Control buttons functionality
floatControlBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Add visual feedback
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        if (this.classList.contains('mute')) {
            console.log('Float phone mute toggled');
            // Toggle mute state visually
            if (this.style.background === 'rgb(108, 117, 125)') {
                this.style.background = '#f8f9fa';
                this.style.color = '#6c757d';
            } else {
                this.style.background = '#6c757d';
                this.style.color = 'white';
            }
        } else if (this.classList.contains('volume-up')) {
            console.log('Float phone volume up');
        } else if (this.classList.contains('volume-down')) {
            console.log('Float phone volume down');
        } else if (this.classList.contains('call')) {
            console.log('Float phone call button pressed');
            if (floatCurrentNumber) {
                alert(`Float Phone - Calling: ${floatCurrentNumber}`);
                floatCurrentNumber = '';
            } else {
                alert('Please enter a number first');
            }
        }
    });
});

// Action button functionality
floatActionBtn.addEventListener('click', function() {
    this.style.transform = 'scale(0.9)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 150);
    
    if (floatCurrentNumber) {
        alert(`Float Phone - Sending to: ${floatCurrentNumber}`);
        floatCurrentNumber = '';
    } else {
        alert('Please enter a number first');
    }
});

// Keyboard support
document.addEventListener('keydown', function(e) {
    if (!isFloatPhoneOpen) return;
    
    if (e.key >= '0' && e.key <= '9' || e.key === '*' || e.key === '#') {
        if (floatCurrentNumber.length < 15) {
            floatCurrentNumber += e.key;
            console.log('Float phone current number:', floatCurrentNumber);
            
            // Highlight corresponding button
            const btn = document.querySelector('.float-key-btn[data-key="' + e.key + '"]');
            if (btn) {
                btn.style.transform = 'scale(0.9)';
                btn.style.background = '#20c997';
                btn.style.color = 'white';
                setTimeout(() => {
                    btn.style.transform = 'scale(1)';
                    btn.style.background = '#f8f9fa';
                    btn.style.color = '#495057';
                }, 150);
            }
        }
    } else if (e.key === 'Escape') {
        closeFloatPhone();
    } else if (e.key === 'Enter') {
        floatActionBtn.click();
    } else if (e.key === 'Backspace') {
        floatCurrentNumber = floatCurrentNumber.slice(0, -1);
        console.log('Float phone current number:', floatCurrentNumber);
    }
});

// Prevent dropdown from closing when clicking inside
floatPhoneDropdown.addEventListener('click', function(e) {
    e.stopPropagation();
});

// Animation when page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        if (floatPhoneBtn) {
            floatPhoneBtn.style.animation = 'float-pulse 2s infinite';
        }
    }, 2000);
});