import '@anthropic-ai/sdk/shims/web'
import Anthropic from "@anthropic-ai/sdk"

export async function getRecipeFromChefClaude(ingredientsArr) {
    try {
        const response = await fetch('https://chef-claude-react-backend.onrender.com/api/generate-recipe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ingredients: ingredientsArr }),
        });

        const data = await response.json();
        return data.recipe || 'Sorry, no recipe was generated.';
    } catch (err) {
        console.error('Error calling backend:', err);
        return 'Something went wrong fetching the recipe.';
    }
}

