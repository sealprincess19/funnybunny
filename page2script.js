// Original Code (Unchanged)
const bunny = document.getElementById("bunny");

bunny.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
    event.dataTransfer.setDragImage(new Image(), 0, 0); // Hides the default drag image
});

document.addEventListener("dragover", (event) => {
    event.preventDefault(); // Allows dropping
});

document.addEventListener("drop", (event) => {
    event.preventDefault();
    const bunny = document.getElementById(event.dataTransfer.getData("text"));

    // Get the position of the container to adjust for the offset
    const container = document.querySelector(".container");
    const containerRect = container.getBoundingClientRect();

    // Correctly calculate drop position relative to container
    const dropX = event.clientX - containerRect.left - (bunny.clientWidth / 0.5);
    const dropY = event.clientY - containerRect.top - (bunny.clientHeight / 2);

    // Apply precise positioning
    bunny.style.position = "absolute";
    bunny.style.left = `${dropX}px`;
    bunny.style.top = `${dropY}px`;
});

// Add a unique query string to refresh the GIF
bunny.src = "bunnyhop2.gif?timestamp=" + new Date().getTime()

/* --- New JavaScript Added Below Without Changing Original Code --- */

// Drop Zone Feature (Redirect when bunny is dropped on the iceberg)
const dropZone = document.getElementById("drop-zone");

document.addEventListener("drop", (event) => {
    event.preventDefault();

    const bunny = document.getElementById(event.dataTransfer.getData("text"));

    // Get drop zone position
    const dropZoneRect = dropZone.getBoundingClientRect();

    // Check if bunny is inside the drop zone
    if (
        event.clientX > dropZoneRect.left &&
        event.clientX < dropZoneRect.right &&
        event.clientY > dropZoneRect.top &&
        event.clientY < dropZoneRect.bottom
    ) {
        // Add a shaking effect to the iceberg drop zone
        dropZone.classList.add("shake");

        // Play a success sound
        const successSound = new Audio("success.mp3");
        successSound.play();

        // Redirect after a short delay
        setTimeout(() => {
            window.location.href = "page3.html";
        }, 1000);
    }
});

// Bunny Bounce Effect While Dragging
bunny.addEventListener("dragstart", () => {
    bunny.classList.add("dragging");
});

bunny.addEventListener("dragend", () => {
    bunny.classList.remove("dragging");
});

// Remove Shake Animation After 1s
dropZone.addEventListener("animationend", () => {
    dropZone.classList.remove("shake");
});
