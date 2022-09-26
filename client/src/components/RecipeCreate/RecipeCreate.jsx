import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {postRecipe, getDiets} from '../../actions/index';
import {useDispatch, useSelector} from 'react-redux'
import s from './RecipeCreate.module.css'

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
    return errors
}

export function RecipeCreate() {
    
    const dispatch = useDispatch();
    const dBdiets = useSelector((state) => state.diets);
    const history = useHistory()

    const [input, setInput] = useState({
        name: '',
        summary: '',
        healthScore: 0,
        image: '',
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
        if(!input.diets.includes(e.target.value)) {
        setInput({
            ...input,
            diets : [...input.diets, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }
    }

    function handleSubmit(e){
        e.preventDefault();
        if(input.diets.length === 0) return alert('Must complete all fields')
        dispatch(postRecipe(input))
        setInput({
            name: '',
            summary: '',
            healthScore: 0,
            image: '',
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
        <div className={s.mainContainer}>
            <div className={s.imageContainer}>
                <img className={s.createImage}src="https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="image not found" />
            </div>
            <div className={s.createRightMenu}>
            <div className={s.backButtonContainer}><Link to="/home"><button className={s.backButton}>Back</button></Link></div>
            <div className={s.titleContainer}><h1 className={s.createTitle}>Time to Create your Recipe</h1></div>
            <div className={s.formContainer}>
            <form className={s.form} onSubmit={(e)=>handleSubmit(e)}>
                <div className={s.inputsContainer}>
                <div className={s.nameInputContainer}>
                    <label className={s.nameLabel}>Name:</label>
                    <input 
                    type="text" s
                    value={input.name}
                    name="name"
                    placeholder='Recipe Name'
                    className={s.nameInput}
                    onChange={(e)=>handleChange(e)}/>
                    {errors.name && (
                        <p className={s.errorMessage}>{errors.name}</p>
                    )}
                </div>
                <div className={s.summaryInputContainer}>
                    <label className={s.summaryLabel}>Summary:</label>
                    <input 
                    type="text" 
                    value={input.summary}
                    name="summary"
                    placeholder='Recipe Summary'
                    className={s.summaryInput}
                    onChange={(e)=>handleChange(e)}/>
                    {errors.summary && (
                        <p className={s.errorMessage}>{errors.summary}</p>
                    )}
                </div>
                <div className={s.healthScoreInputContainer}>
                    <label className={s.healthScoreLabel}>Health Score:</label>
                    <input 
                    type="number" 
                    value={input.healthScore}
                    name="healthScore"
                    placeholder='Health Score'
                    className={s.healthScoreInput}
                    onChange={(e)=>handleChange(e)}/>
                    {errors.healthScore && (
                        <p className={s.errorMessage}>{errors.healthScore}</p>
                    )}
                </div>
                <div className={s.stepsInputContainer}>
                    <label className={s.stepsLabel}>Steps:</label>
                    <input 
                    type="text" 
                    value={input.steps}
                    name="steps"
                    placeholder='Steps'
                    className={s.stepsInput}
                    onChange={(e)=>handleChange(e)}/>
                    {errors.steps && (
                        <p className={s.errorMessage}>{errors.steps}</p>
                    )}
                </div>
                <div className={s.imageInputContainer}>
                    <label className={s.imageLabel}>Image:</label>
                    <input 
                    type="text" 
                    value={input.image}
                    name="image"
                    placeholder='Image URL'
                    className={s.imageInput}
                    onChange={(e)=>handleChange(e)}/>
                    {/* {errors.image && (
                        <p className={s.errorMessage}>{errors.image}</p>
                    )} */}
                </div>
                <div className={s.dietContainer}>
                <label className={s.dietsLabel}>Diets:</label>
                <div className={s.selectContainer}>
                <select onChange={(e) => handleSelect(e)}>
                        <option selected disabled>Diets</option>
                    {dBdiets.map(diet => (
                        <option value={diet}>{diet}</option>
                    ))}
                </select>
                <div className={s.dietArrow}></div>
                </div>
                <div className={s.dietUlContainer}>
                <ul className={s.dietUl}>
                {input.diets.map(diet => (
                    <div className={s.dietLiContainer}>
                    <li className={s.diet}>
                        {diet} <button className={s.dietButton} type='button' onClick={()=>handleDelete(diet)}>X</button>
                    </li>
                    </div>
                ))} 
                </ul>
                </div>
                </div>
                </div>
                <div className={s.submitButtonContainer}>
                {Object.entries(errors).length === 0 ? 
                (<button className={s.submitButton} id='submitButton' type='submit'>Create Recipe</button>) :
                (<button className={s.submitButton} id='submitButton' type='submit' disabled>Create Recipe</button>)}
                </div>
            </form>
            </div>
        
            </div>
        </div>
    )
}