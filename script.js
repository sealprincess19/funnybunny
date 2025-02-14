// Select the bunny image element by its ID
const bunny = document.getElementById("bunny");

// Append a unique timestamp to the GIF URL
bunny.src = "bunnyhop.gif?timestamp=" + new Date().getTime();
