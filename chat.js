const express = require('express');
const router = express.Router();
const Chat = require('../models/chat');
const User = require('../models/user');
const auth = require('../middleware/auth');

// Send a message
router.post('/message', auth, async (req, res) => {
    const { recipientId, message } = req.body;
    try {
        // Find the recipient user
        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).send({ error: 'Recipient not found' });
        }

        // Create a new chat message
        const chat = new Chat({
            sender: req.user._id,
            recipient: recipientId,
            message
        });
        await chat.save();

        // Send the message
        res.send({ message: 'Message sent' });
    } catch (error) {
        res.status(500).send({ error: 'Error sending message' });
    }
});

// Get all messages with a specific user
router.get('/messages/:recipientId', auth, async (req, res) => {
    try {
        // Find all messages between the authenticated user and the recipient
        const messages = await Chat.find({
            $or: [
                { sender: req.user._id, recipient: req.params.recipientId },
                { sender: req.params.recipientId, recipient: req.user._id }
            ]
        });

        res.send(messages);
    } catch (error) {
        res.status(500).send({ error: 'Error getting messages' });
    }
});

module.exports = router;