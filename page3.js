// Get the draggable bunny
const bunny = document.getElementById("bunny");

// Store the bunny's initial position
const initialX = bunny.offsetLeft;
const initialY = bunny.offsetTop;

// Track dragging state
let isDragging = false;
let offsetX, offsetY;

// Start dragging when clicking the bunny
bunny.addEventListener("mousedown", (event) => {
    isDragging = true;

    // Get initial mouse offset inside the bunny
    offsetX = event.clientX - bunny.getBoundingClientRect().left;
    offsetY = event.clientY - bunny.getBoundingClientRect().top;

    // Apply dragging styles
    bunny.style.position = "absolute";
    bunny.style.zIndex = "1000"; // Bring to front
    bunny.style.opacity = "1"; // Ensure visibility

    // Prevent default browser drag behavior
    event.preventDefault();
});

// Move the bunny with the mouse
document.addEventListener("mousemove", (event) => {
    if (!isDragging) return;

    // Update bunny position based on mouse movement
    bunny.style.left = `${event.clientX - offsetX}px`;
    bunny.style.top = `${event.clientY - offsetY}px`;

    // Continuously check for collisions
    checkCollision();
});

// Stop dragging when releasing the mouse
document.addEventListener("mouseup", () => {
    isDragging = false;
});

// Disable default drag behavior (fix for disappearing image)
bunny.addEventListener("dragstart", (event) => {
    event.preventDefault();
});

// Prevent accidental text selection while dragging
document.body.style.userSelect = "none";

// Function to check for collisions with icebergs
function checkCollision() {
    const bunnyRect = bunny.getBoundingClientRect();
    document.querySelectorAll(".obstacle").forEach((obstacle) => {
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
            bunnyRect.left < obstacleRect.right &&
            bunnyRect.right > obstacleRect.left &&
            bunnyRect.top < obstacleRect.bottom &&
            bunnyRect.bottom > obstacleRect.top
        ) {
            // Collision detected - Reset the bunny position
            setTimeout(() => {
                bunny.style.left = `${initialX}px`;
                bunny.style.top = `${initialY}px`;
            }, 300); // Delay to make the effect noticeable
        }
    });
}
