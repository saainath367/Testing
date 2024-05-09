const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { from, to, subject, text } = req.body;

    let transporter = nodemailer.createTransport({
        host: 'smtp.elasticemail.com',
        secure: false,
        auth: {
            user: 'velmurugan@greypathsolutions.com', 
            pass: '565E78FBBB61ED41E1066BA34DB3EB2DB97D'
        }
    });
    let mailOptions = {
        from: from, 
        to: to, 
        subject: subject,
        text: text 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred:', error.message);
            res.status(500).json({ error: 'An error occurred while sending the email.' });
        } else {
            console.log('Email sent successfully!');
            res.status(200).json({ message: 'Email sent successfully!' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});