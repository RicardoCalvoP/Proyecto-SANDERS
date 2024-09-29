import express from 'express';
import sendEmail from './Sender.js';
const router = express.Router();

// Send mail
router.post("/send-email", async (req, res) => {
    const { to, name, amount } = req.body;

    try {
        let info = await sendEmail(to, name, amount);
        res.status(200).send(`Email sent: ${info.response}`);
    }
    catch (error) {
        res.status(500).send("Error sending email");
        console.error(error);
    }
});

export default router; // Will be called on postRoutes.js