const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Contact Route
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // 1. Validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    // 2. Configure NodeMailer (Modify with your SMTP details)
    // NOTE: This is a template. You need to use a real email service or an app password for Gmail.
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Your email
            pass: 'your-app-password'     // Your Gmail App Password
        }
    });

    let mailOptions = {
        from: `"${name}" <${email}>`,
        to: 'suganchakravarthi@gmail.com', // Your receiving email
        subject: `New Portfolio Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #6366f1;">New Portfolio Inquiry</h2>
                <p><strong>From:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <hr style="border: 0; border-top: 1px solid #eee;">
                <p><strong>Message:</strong></p>
                <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
            </div>
        `
    };

    try {
        // In a real scenario, you'd call transporter.sendMail(mailOptions);
        // For demonstration, we'll simulate a successful send.
        console.log(`Received message from ${name} (${email}): ${message}`);
        
        // Simulating delay
        setTimeout(() => {
            res.status(200).json({ success: true, message: "Email logged to server console (SMTP needs configuration)." });
        }, 1000);

    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ error: "Failed to send email." });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});
