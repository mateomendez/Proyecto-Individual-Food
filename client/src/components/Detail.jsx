import React from "react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {detailRecipe} from '../actions/index';
import {useEffect} from 'react';

export function Detail(props){

    const dispatch = useDispatch();
    const recipe = useSelector((state => state.detail))
    
    useEffect(() => {
        dispatch(detailRecipe(props.match.params.id))
    },[dispatch]);

    return (
        <div>
            <Link to="/home"><button>Back</button></Link>
            {
                recipe.length > 0 ? 
                <div>
                    <h1>{recipe[0].name}</h1>
                    <img src={recipe[0].image} alt="image not found" />
                    <h2>{recipe[0].summary}</h2>
                    {/* agregar un map con los steps cuando sea un array */}
                    <p>{recipe[0].diets + ' '}</p> 
                    {/* agregar una condicion en caso de que recibamos la informacion de otra manera en la base de datos */}
                </div> : <p>Loading...</p>
            }
        </div>
    )
}