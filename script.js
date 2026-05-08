function drawNodeLines() {
    const box = document.querySelector('.controller-box'); // Define container
    const svg = document.getElementById('node-lines'); // Define SVG object
    const modelViewer = document.querySelector('.remote-control-model'); // Define controller model
    const buttons = document.querySelectorAll('.sound-box button'); // Define sound buttons

    svg.innerHTML = ''; // Clear SVG

    const boxRect = box.getBoundingClientRect(); // Define container area
    const mvRect = modelViewer.getBoundingClientRect(); // Define model area
    const soundBoxRect = document.querySelector('.sound-box').getBoundingClientRect(); // Define button fieldset area

    const targetX = (mvRect.left - boxRect.left) + mvRect.width / 2; // Set model central x value
    const targetY = (mvRect.top - boxRect.top) + mvRect.height / 2; // Set model central y value
    const soundCentreX = (soundBoxRect.left - boxRect.left) + soundBoxRect.width / 2; // Set button fieldset x centre

    const isWrapped = Math.abs(targetX - soundCentreX) < 10; // Define the range of x values that determines when the flex box has wrapped

    buttons.forEach(button => {
        const btnRect = button.getBoundingClientRect(); // Get buttons area
        const btnX = isWrapped // Determine whether the lines should be drawn from the centre of the screen or from the right based on whether the flex box has wrapped
            ? window.innerWidth / 2 - boxRect.left
            : (btnRect.right - boxRect.left);
        const btnY = (btnRect.top - boxRect.top) + btnRect.height / 2; // Get the vertical centre of the buttons

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line'); // Define SVG line shape
        line.setAttribute('x1', btnX);
        line.setAttribute('y1', btnY);
        line.setAttribute('x2', targetX);
        line.setAttribute('y2', targetY);
        // Define the line start and end points
        svg.appendChild(line); // Append the line to the SVG

        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); // Define SVG circle shape
        dot.setAttribute('cx', btnX);
        dot.setAttribute('cy', btnY);
        // Set the circles position
        dot.setAttribute('r', 4); // Set circle radius
        svg.appendChild(dot); // Append the circle to the SVG
    });
}

window.addEventListener('load', drawNodeLines);
window.addEventListener('resize', drawNodeLines);
// Set the draw function to run when the page loads or resizes
