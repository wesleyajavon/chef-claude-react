import ReactDom from 'react-dom'
import ReactMarkdown from 'react-markdown'



export default function ClaudeRecipe(props) {

    return (
        <section className='suggested-recipe-container'>
            <h2>Chef Wesley Recommends:</h2>
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>
        
    )
}