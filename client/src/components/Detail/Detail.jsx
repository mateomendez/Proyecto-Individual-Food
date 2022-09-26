import React from "react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {detailRecipe} from '../../actions/index';
import {useEffect, useState} from 'react';
import s from './Detail.module.css'

export function Detail(props){

    const dispatch = useDispatch();
    const recipe = useSelector(state => state.detail)
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setTimeout(() => {
            setLoading(true)   
        }, 2300);
        dispatch(detailRecipe(props.match.params.recipeId))
    },[dispatch]);

    if (loading) {
    if (recipe.createdInDb) {
    return (
        <div className={s.background}>
        <div className={s.mainContainer}>
            <div className={s.backButtonContainer}>
            <Link to="/home"><button className={s.backButton}>Back</button></Link>
            </div>
            {Object.entries(recipe).length > 0 ? 
            <div className={s.headerAndSummaryContainer}>
                <div className={s.headerContainer}>
                    <div className={s.mainInfoContainer}>
                        <h1 className={s.recipeTitle}>{recipe.name}</h1>
                        <p className={s.recipeDiets}>{recipe.diets + ' '}</p>
                        <div className={s.healthScoreContainer}><label className={s.healthScoreLabel}>Health Score:</label><p className={s.healthScore}>{recipe.healthScore}</p></div>
                    </div>
                    <img className={s.recipeImage} src={recipe.image ? recipe.image : recipe.image ? recipe.image : 'https://images.ecestaticos.com/truXLOyXK78E59pA3kjWPdxk9cA=/0x109:2118x1302/1338x752/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F476%2Fde1%2Fd37%2F476de1d37f842213f0e2f924749e15d4.jpg'} alt="image not found"/>
                </div>
            <div className={s.separator}></div>
            <div className={s.descriptionContainer}>
                <h1 className={s.labelTitle}>Summary:</h1>
                <h4 className={s.descriptionText}>{recipe.summary}</h4>
                <h1 className={s.labelTitle}>Steps:</h1>
                <h4 className={s.descriptionText}>{recipe.steps}</h4>
            </div>
            </div> : <div id={s.loaderContainer}><div className={s.customLoader}></div></div>}
        </div>
        </div>
        
    )
    }

    else if (!recipe.createdInDb) {
        return (
            <div className={s.background}>
            <div className={s.mainContainer}>
            <div className={s.backButtonContainer}>
            <Link to="/home"><button className={s.backButton}>Back</button></Link>
            </div>   
            {Object.entries(recipe).length > 0 ? 
            <div className={s.headerAndSummaryContainer}>
                <div className={s.headerContainer}>
                    <div className={s.mainInfoContainer}>
                        <h1 className={s.recipeTitle}>{recipe.title}</h1>
                        <p className={s.recipeDiets}>{recipe.diets.map(diet => diet[0].toUpperCase() + diet.slice(1) + " ")}</p>
                        <div className={s.healthScoreContainer}><label className={s.healthScoreLabel}>Health Score:</label><p className={s.healthScore}>{recipe.healthScore}</p></div>
                    </div>
                    <div className={s.imageContainer}><img className={s.recipeImage} src={recipe.image ? recipe.image : recipe.image ? recipe.image : 'https://images.ecestaticos.com/truXLOyXK78E59pA3kjWPdxk9cA=/0x109:2118x1302/1338x752/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F476%2Fde1%2Fd37%2F476de1d37f842213f0e2f924749e15d4.jpg'} alt="image not found"/></div>
                </div>
            <div className={s.separator}></div>
            <div className={s.descriptionContainer}>
                <h1 className={s.labelTitle}>Summary:</h1>
                <h4 className={s.descriptionText}>{recipe.summary?.replace(/(<([^>]+)>)/ig, '')}</h4>
                <h1 className={s.labelTitle}>Steps:</h1>
                {recipe.analyzedInstructions.length > 0 ? 
                <h4 className={s.descriptionText}>{recipe.analyzedInstructions.map(instructions => instructions.steps.map(step => step.step + " "))}</h4> : 
                <h4 className={s.descriptionText}>This recipe has no steps </h4> }
            </div>
            </div> : <div id={s.loaderContainer}><div className={s.customLoader}></div></div>}
        </div>
        </div>
        )
    }
}
    else if (!loading) {
        return (<div className={s.loaderContainer}><div className={s.customLoader}></div></div>)
    }
}