import React, { Fragment } from "react";
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getRecipes, filterRecipesByDiet, setOrderRecipes , filterRecipesByOrder} from '../actions'
import { Card } from "./Card";
import { Paginado } from "./Paginado"
import { SearchBar } from "./SearchBar";

export function Home() {

    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.recipes);
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
    

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    useEffect(()=>{
    dispatch(getRecipes())
    },[dispatch])

    function enableSelect(){
        let selectOrder = document.getElementById('selectOrder')
        let order = document.getElementById('order')
        // console.log(selectOrder.value)
        if(selectOrder.value !== "Random") {
            order.disabled = false
        }
        if(selectOrder.value === 'Random') {
            order.disabled = true
            order.value = 'Random'
        }
    }

    function handleFilterDiet(e){
        dispatch(filterRecipesByDiet(e.target.value))
    }

    function setOrder(e){
        enableSelect()
        dispatch(setOrderRecipes(e.target.value))
        // dispatch(filterRecipesByOrder(e.target.value))
    }

    function handleFilterOrder(e){
        e.preventDefault()
        setCurrentPage(1);
        dispatch(filterRecipesByOrder(e.target.value))
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <div>
            <div>
            <Link to='/createRecipe'>
                <button>Create a Recipe</button>
            </Link>
            <h1>Recipes</h1>
            <SearchBar /> 
            </div>
            <div>
            <select onChange={e => handleFilterDiet(e)}>
                <option value="all">All</option>
                <option value="Gluten free">Gluten Free</option>
                <option value="Ketogenic">Ketogenic</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
                <option value="Dairy free">Ovo-Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Pescetarian">Pescetarian</option>
                <option value="Paleolithic">Paleolithic</option>
                <option value="Primal">Primal</option>
                <option value="Fodmap friendly">Foadmap Friendly</option>
                <option value="Whole 30">Whole 30</option>
            </select>
            </div>
            <div>
            <select id="selectOrder" onChange={e => setOrder(e)}>
                <option value="Random">Random Order</option>
                <option value="Alphabetic">Alphabetic Order</option>
                <option value="HealthScore">Health Score Order</option>
            </select>
            <select id="order" onChange={e => handleFilterOrder(e)} disabled={true}>
                <option value="Random">Random</option>
                <option value="Asc">Ascending</option>
                <option value="Desc">Descending</option>
            </select>
            </div>
            <Paginado 
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length}
            paginado={paginado}
            />
            <div>
            {
                currentRecipes?.map( recipe => {
                    return (
                    <div>
                        <Link to={'/home/' + recipe.id}>
                            <Card name={recipe.name} image={recipe.image} diets={recipe.diets}></Card>
                        </Link>
                    </div>
                    )
                })
            }
            </div>

            <Paginado 
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length}
            paginado={paginado}
            />

            
        </div>
    )

}