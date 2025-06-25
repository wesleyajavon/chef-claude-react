import React from "react"
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"
import { getRecipeFromChefClaude } from "../ai"

export default function Main() {
    const [myIngredients, setMyIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const recipeSection = React.useRef(null)

    React.useEffect(() => {
        recipeSection.current?.scrollIntoView({ behavior: "smooth"})
    }, [recipe])
    

    function addIngredient(formData) {
        
        const newIngredient = formData.get("ingredient")
        setMyIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    async function getRecipe() {
        const generatedRecipeMarkdown = await getRecipeFromChefClaude(myIngredients)
        setRecipe(generatedRecipeMarkdown)
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
            {recipe ? <ClaudeRecipe recipe= {recipe} /> : null}

        </main>
    )
}