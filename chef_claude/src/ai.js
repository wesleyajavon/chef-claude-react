import '@anthropic-ai/sdk/shims/web'
import Anthropic from "@anthropic-ai/sdk"

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

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

