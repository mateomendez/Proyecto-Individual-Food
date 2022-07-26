import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {postRecipe, getDiets} from '../actions/index';
import {useDispatch, useSelector} from 'react-redux'

export function RecipeCreate() {
    
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets);
    const history = useHistory()

    const [input, setInput] = useState({
        name: '',
        summary: '',
        healthScore: 0,
        steps: [],
        diet: []
    })

    useEffect(() => {
        dispatch(getDiets())
    }, [])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleSelect(e) {
        setInput({
            ...input,
            diet : [...input.diet, e.target.value]
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
            steps: [],
            diet: []
        })
        history.push('/home')
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
                    onChange={handleChange}/>
                </div>
                <div>
                    <label>Summary:</label>
                    <input 
                    type="text" 
                    value={input.summary}
                    name="summary"
                    onChange={handleChange}/>
                </div>
                <div>
                    <label>Health Score:</label>
                    <input 
                    type="number" 
                    value={input.healthScore}
                    name="healthScore"
                    onChange={handleChange}/>
                </div>
                <div>
                    <label>Steps:</label>
                    <input 
                    type="text" 
                    value={input.steps}
                    name="steps"
                    onChange={handleChange}/>
                </div>
                <div>
                    <label>Image:</label>
                    <input 
                    type="text" 
                    value={input.image}
                    name="image"
                    onChange={handleChange}/>
                </div>
                <select onChange={(e) => handleSelect(e)}>
                    {diets.map((diet) => (
                        <option value={diet.name}>{diet.name}</option>
                    ))}
                </select>
                <ul><li>{input.diet.map(diet => diet)}</li></ul>
                <button type='submit'>Create Recipe</button>

                


            </form>
        </div>
    )
}