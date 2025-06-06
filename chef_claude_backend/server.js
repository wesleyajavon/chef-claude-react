// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());

// Claude endpoint
app.post('/api/generate-recipe', async (req, res) => {
    const { ingredients } = req.body;

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
        return res.status(400).json({ error: 'No ingredients provided' });
    }

    try {
        const response = await axios.post('https://api.anthropic.com/v1/messages', {
            model: 'claude-3-haiku-20240307',
            max_tokens: 1024,
            system: `
                You are an assistant that receives a list of ingredients and suggests a recipe.
                Don't use all ingredients, a few extras are okay. Format in markdown.
            `,
            messages: [
                {
                    role: 'user',
                    content: `I have ${ingredients.join(', ')}. What can I cook?`,
                },
            ],
        }, {
            headers: {
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json',
            },
        });

        const aiMessage = response.data?.content?.[0]?.text || '';
        res.json({ recipe: aiMessage });
    } catch (error) {
        console.error('Claude API error:', error);
        res.status(500).json({ error: 'Failed to generate recipe' });
    }
});

// Start server
app.listen(port, () => console.log(`Backend running on port ${port}`));
