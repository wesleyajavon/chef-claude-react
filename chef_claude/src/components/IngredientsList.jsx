export default function IngredientsList(props) {

    const renderIngredients = props.ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    function renderRecipeSection() {
            return (
                <div className="get-recipe-container">
                    <div ref={props.ref}>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <div>
                        <button onClick={props.getRecipe}>Get a recipe</button>
                    </div>
                </div>)
        }

    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{renderIngredients}</ul>
            {props.ingredients.length > 3 ? renderRecipeSection() : null}
        </section>
    )
}