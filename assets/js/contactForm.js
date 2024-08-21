document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const message = document.getElementById('message').value;

    const response = await fetch('../../api/sendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    });

    const result = await response.json();

    // Display the result in the feedback message box
    const feedbackMessageBox = document.getElementById('feedbackMessage');
    if (result.success) {
        feedbackMessageBox.textContent = 'Message sent successfully!';
        feedbackMessageBox.style.color = 'green';
    } else {
        feedbackMessageBox.textContent = 'Failed to send the message. Please try again.';
        feedbackMessageBox.style.color = 'red';
    }

    // Clear the message field
    document.getElementById('message').value = '';
});
