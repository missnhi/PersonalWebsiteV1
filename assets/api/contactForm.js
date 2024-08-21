document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const message = document.getElementById('message').value;

    const response = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    });

    const result = await response.json();

    document.getElementById('feedback').textContent = result.message || result.error;
});
