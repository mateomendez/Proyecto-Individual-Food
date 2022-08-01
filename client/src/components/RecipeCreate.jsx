import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {postRecipe, getDiets} from '../actions/index';
import {useDispatch, useSelector} from 'react-redux'

function validate(input){
    let errors = {};
    if(!input.name) {
        errors.name = "Name is required"
    }
    else if(!input.summary) {
        errors.summary = "Summary is required"
    }
    else if(!input.healthScore) {
        errors.healthScore = "Health Score is required"
    }
    else if(input.healthScore > 100 || input.healthScore < 0) {
        errors.healthScore = "Invalid Health Score"
    }
    else if(!input.steps) {
        errors.steps = "At least 1 step is required"
    }
    else if(!input.diets) {
        errors.steps = "At least 1 diet is required"
    }   
    return errors
}

export function RecipeCreate() {
    
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets);
    const history = useHistory()

    const [input, setInput] = useState({
        name: '',
        summary: '',
        healthScore: 0,
        steps: '',
        diets: []
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(getDiets())
    }, [])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelect(e) {
        if(!input.diets.includes(e.target.value))
        setInput({
            ...input,
            diets : [...input.diets, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postRecipe(input))
        alert('Recipe Created')
        setInput({
            name: '',
            summary: '',
            healthScore: 0,
            steps: '',
            diets: []
        })
        history.push('/home')
    }

    function handleDelete(deletedDiet) {
        setInput({
            ...input,
            diets: input.diets.filter( diet => diet !== deletedDiet)
        })
    }

    return (
        <div>
            <Link to="/home"><button>Back</button></Link>
            <h1>Create your own Recipe</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input 
                    type="text" 
                    value={input.name}
                    name="name"
                    onChange={(e)=>handleChange(e)}/>
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Summary:</label>
                    <input 
                    type="text" 
                    value={input.summary}
                    name="summary"
                    onChange={(e)=>handleChange(e)}/>
                    {errors.summary && (
                        <p>{errors.summary}</p>
                    )}
                </div>
                <div>
                    <label>Health Score:</label>
                    <input 
                    type="number" 
                    value={input.healthScore}
                    name="healthScore"
                    onChange={(e)=>handleChange(e)}/>
                    {errors.healthScore && (
                        <p>{errors.healthScore}</p>
                    )}
                </div>
                <div>
                    <label>Steps:</label>
                    <input 
                    type="text" 
                    value={input.steps}
                    name="steps"
                    onChange={(e)=>handleChange(e)}/>
                    {errors.steps && (
                        <p>{errors.steps}</p>
                    )}
                </div>
                <div>
                    <label>Image:</label>
                    <input 
                    type="text" 
                    value={input.image}
                    name="image"
                    onChange={(e)=>handleChange(e)}/>
                    {errors.image && (
                        <p>{errors.image}</p>
                    )}
                </div>
                <select onChange={(e) => handleSelect(e)}>
                    {diets.map((diet) => (
                        <option value={diet.name}>{diet.name}</option>
                    ))}
                </select>
                {errors.diets && (
                        <p>{errors.diets}</p>
                    )}
                <ul>
                {input.diets.map(diet => (
                    <li>
                        {diet} <button type='button' onClick={()=>handleDelete(diet)}>X</button>
                    </li>
                ))} 
                </ul>
                {Object.entries(errors).length === 0 ? 
                (<button id='submitButton' type='submit'>Create Recipe</button>) :
                (<button id='submitButton' type='submit' disabled>Create Recipe</button>)}
            </form>
        </div>
    )
}