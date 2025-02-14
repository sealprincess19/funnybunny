// Get the draggable bunny
const bunny = document.getElementById("bunny");

// Store the bunny's initial position
const initialX = 50; // Adjust starting X position
const initialY = 300; // Adjust starting Y position

// Track dragging state
let isDragging = false;
let offsetX = 0, offsetY = 0;

// Start dragging when clicking the bunny
bunny.addEventListener("mousedown", (event) => {
    isDragging = true;

    // Get mouse position relative to the bunny
    offsetX = event.clientX - bunny.getBoundingClientRect().left;
    offsetY = event.clientY - bunny.getBoundingClientRect().top;

    // Ensure bunny is positioned absolutely
    bunny.style.position = "absolute";
    bunny.style.zIndex = "1000"; // Bring to the front
    bunny.style.opacity = "1"; // Ensure visibility
    bunny.style.cursor = "grabbing";

    // Prevent default browser drag behavior
    event.preventDefault();
});

// Move the bunny with the mouse
document.addEventListener("mousemove", (event) => {
    if (!isDragging) return;

    // Ensure bunny stays within screen bounds
    let newX = event.clientX - offsetX;
    let newY = event.clientY - offsetY;

    // Update bunny position dynamically
    bunny.style.left = `${newX}px`;
    bunny.style.top = `${newY}px`;

    // Check for precise collision while moving
    checkPreciseCollision();
});

// Stop dragging when releasing the mouse
document.addEventListener("mouseup", () => {
    isDragging = false;
    bunny.style.cursor = "grab"; // Restore cursor style
    checkDropZone();
});

// Disable default drag behavior to prevent issues
bunny.addEventListener("dragstart", (event) => {
    event.preventDefault();
});

// Prevent accidental text selection while dragging
document.body.style.userSelect = "none";

// Function to check if bunny is dropped in the drop zone
function checkDropZone() {
    const bunnyRect = bunny.getBoundingClientRect();
    const dropZone = document.getElementById("drop-zone");
    const dropZoneRect = dropZone.getBoundingClientRect();

    if (
        bunnyRect.left < dropZoneRect.right &&
        bunnyRect.right > dropZoneRect.left &&
        bunnyRect.top < dropZoneRect.bottom &&
        bunnyRect.bottom > dropZoneRect.top
    ) {
        // Redirect to sharks.html if bunny is dropped inside drop zone
        setTimeout(() => {
            window.location.href = "sharks.html";
        }, 500);
    }
}

// Function to check for **precise** collisions with shark fins
function checkPreciseCollision() {
    const bunnyRect = bunny.getBoundingClientRect();

    document.querySelectorAll(".sharkfin").forEach((sharkfin) => {
        const sharkRect = sharkfin.getBoundingClientRect();

        // Get the exact pixel data of the shark fin's visible area
        const isVisible = isGifVisible(sharkfin);

        if (
            isVisible &&  // Only trigger if the gif is visible
            bunnyRect.left < sharkRect.right &&
            bunnyRect.right > sharkRect.left &&
            bunnyRect.top < sharkRect.bottom &&
            bunnyRect.bottom > sharkRect.top
        ) {
            // Collision detected - Reset the bunny position
            setTimeout(() => {
                bunny.style.left = `${initialX}px`;
                bunny.style.top = `${initialY}px`;
            }, 300);
        }
    });
}

// Function to check if the shark fin is actually visible (not just in its animation path)
function isGifVisible(element) {
    const rect = element.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(element);

    return (
        computedStyle.visibility !== "hidden" &&
        computedStyle.opacity !== "0" &&
        rect.width > 0 &&
        rect.height > 0
    );
}

// Continuously check for collisions while dragging
document.addEventListener("mousemove", () => {
    if (isDragging) {
        checkPreciseCollision();
    }
});
