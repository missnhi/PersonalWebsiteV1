// api/sendMessage.js

const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

// Define the endpoint to handle the form submission
app.post('/api/contactForm.js', async (req, res) => {
    const { message } = req.body;

        // Access environment variables
        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;

        // Create a transporter using SMTP or any email service
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // For example, using Gmail SMTP
            auth: {
                user: emailUser, // env variable - Gmail address
                pass: emailPass, // env variable - Gmail password
            },
        });

        try {
            await transporter.sendMail({
                from: 'nhi.phan.ley+anonymous@gmail.com',
                to: emailUser, // Your receiving email address
                subject: 'New Anonymous Message',
                text: message,
            });

            return res.status(200).json({ message: 'Message sent successfully!' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to send message. Please try again.' });
        }
    });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
