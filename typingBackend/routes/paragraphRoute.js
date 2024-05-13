const express = require('express');
const generateRandomParagraph = require('../paragraphs/paragraph');
const authenticateToken = require('../middlewares/verifyauthentication');
const router = express.Router();

router.use(express.json());

router.post('/paragraph', (req, resp) => {
    const { punctuation, numbers, words_list } = req.body;

    if (!punctuation || !numbers || !words_list) {
        return resp.status(400).json({ error: 'Missing parameters' });
    }

    try {
        const paragraph = generateRandomParagraph(punctuation, numbers, words_list);
        const response = {
            paragraph: paragraph,
        };
        resp.status(200).json(response);
    } catch (error) {
        console.error('Error generating paragraph:', error);
        resp.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
