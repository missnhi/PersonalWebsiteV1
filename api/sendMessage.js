const nodemailer = require('nodemailer');

export default async function (req, res) {
    if (req.method === 'POST') {
        const { message } = req.body;

        // Access environment variables
        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;

        // Create a transporter using SMTP or any email service
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // For example, using Gmail SMTP
            auth: {
                user: emailUser, // Gmail address from env variable
                pass: emailPass, // Gmail password from env variable
            },
        });

        try {
            await transporter.sendMail({
                from: 'nhi.phan.ley+anonymous@gmail.com', // Sender address
                to: emailUser, // Your receiving email address
                subject: 'New Anonymous Message',
                text: message,
            });

            return res.status(200).json({ message: 'Message sent successfully!' });
        } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send message. Please try again.' });
        }
    } else {
        // Respond with 405 if the method is not POST
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
