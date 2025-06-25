import React from "react"
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"
import { getRecipeFromChefClaude } from "../ai"
import Loader from "./Loader"

export default function Main() {
    const [myIngredients, setMyIngredients] = React.useState([])
    const [loading, setLoading] = React.useState(false);

    const [recipe, setRecipe] = React.useState("")
    const recipeSection = React.useRef(null)

    React.useEffect(() => {
        recipeSection.current?.scrollIntoView({ behavior: "smooth" })
    }, [recipe])


    function addIngredient(formData) {

        const newIngredient = formData.get("ingredient")
        setMyIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    async function getRecipe() {
        setLoading(true);

        try {
            const generatedRecipeMarkdown = await getRecipeFromChefClaude(myIngredients)
            setRecipe(generatedRecipeMarkdown)
        } catch (error) {
            console.error("Error fetching a recipe:", error);
        } finally {
            setLoading(false);
        }

    }




    return (
        <main>
            <form id="ingredient-form" action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />

            </form>
            {myIngredients.length > 0 ? <IngredientsList
                ref={recipeSection}
                ingredients={myIngredients}
                getRecipe={getRecipe}
            /> : null}
            {loading ? <Loader/> : null}
            {recipe ? <ClaudeRecipe recipe={recipe} /> : null}

        </main>
    )
}