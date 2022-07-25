import React from "react";
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from '@testing-library/user-event'
import { getRecipes } from '../actions'

export default function Home() {

    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes)
    useEffect(()=>{
        dispatch(getRecipes())
    },[])

    return (
        <div>
            <Link to='/character'>
                <button>Crear una receta</button>
            </Link>
            <h1>Recetas</h1>
            {/*Search Bar*/}
            {/*Recipe Card*/}
            {/*Recipe Card*/}
            {/*Recipe Card*/}
            {/*Recipe Card*/}

            <select>
                <option value="gluten free">Libre de Gluten</option>
                <option value="ketogenic">Cetogenica</option>
                <option value="vegetarian">Vegetariana</option>
                <option value="lacto-Vegetarian">Lacto Vegetariana</option>
                <option value="ovo-vegetarian">Ovo Vegetariana</option>
                <option value="vegan">Vegana</option>
                <option value="pescetarian">Pescetariano</option>
                <option value="paleolithic">Paleo</option>
                <option value="primal">Primal</option>
                <option value="foadmap friendly">FodMap</option>
                <option value="whole 30">Whole 30</option>
            </select>
            <select>
                <option value="Alphabetic">Orden Alfabetico</option>
                <option value="HealthScore">Health Score</option>
            </select>
            <select>
                <option value="Asc">Ascendente</option>
                <option value="Desc">Descendente</option>
            </select>
            {/*Páginado*/}

            
        </div>
    )

}