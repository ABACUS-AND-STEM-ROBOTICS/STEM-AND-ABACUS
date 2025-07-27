// This script handles the local display of uploaded events.
// Note: Uploaded files will NOT be saved on the server, only displayed in your browser.
// For a real upload, you'd need a backend server.

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('event-upload-form');
    const uploadedEvents = document.getElementById('uploadedEvents');
    
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const title = form.eventTitle.value;
        const date = form.eventDate.value;
        const details = form.eventDetails.value;
        const imageFile = form.eventImage.files[0];
        const videoFile = form.eventVideo.files[0];

        // Create event display
        const eventDiv = document.createElement('div');
        eventDiv.className = 'uploaded-event';

        eventDiv.innerHTML = `
            <h3>${title}</h3>
            <p><strong>Date:</strong> ${date}</p>
            <p>${details}</p>
        `;

        // Display image if uploaded
        if (imageFile) {
            const img = document.createElement('img');
            img.style.maxWidth = '200px';
            img.style.display = 'block';
            img.style.marginBottom = '1em';
            img.alt = 'Event Image';
            const reader = new FileReader();
            reader.onload = function(e) {
                img.src = e.target.result;
            };
            reader.readAsDataURL(imageFile);
            eventDiv.appendChild(img);
        }

        // Display video if uploaded
        if (videoFile) {
            const video = document.createElement('video');
            video.controls = true;
            video.style.maxWidth = '300px';
            video.style.display = 'block';
            video.style.marginBottom = '1em';
            const reader = new FileReader();
            reader.onload = function(e) {
                video.src = e.target.result;
            };
            reader.readAsDataURL(videoFile);
            eventDiv.appendChild(video);
        }

        uploadedEvents.prepend(eventDiv);

        // Reset form
        form.reset();
    });
});