import React, { Fragment } from "react";
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getRecipes, filterRecipesByDiet, setOrder} from '../../actions'
import { Card } from "../Card/Card";
import { Paginado } from "../Paginado/Paginado"
import { SearchBar } from "../SearchBar/SearchBar";
import s from './Home.module.css'

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
        if(pageNumber) {
        setCurrentPage(pageNumber)
        }
    }
    
    useEffect(()=>{
        dispatch(getRecipes())
    },[dispatch])

    function handleClick(e) {
        dispatch(getRecipes())
        document.getElementById("dietFilter").value = 'all'
        document.getElementById("alphabeticOrder").value = 'default'
        document.getElementById("order").value = 'default'
        
    }

    function handleFilterDiet(e){
        setCurrentPage(1);
        dispatch(filterRecipesByDiet(e.target.value))
    }

    function handleOrder(e){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(setOrder(e.target.value));
        setOrden(`Ordenado ${e.target.value}`);
    }

    return (
        <div className={s.mainContainer}>
            <div className={s.nav}>
            <h1 className={s.titleHome}>Recipes Web</h1>
            <Link className={s.linkCreate}to='/createRecipe'>
                <button className={s.createButton}>Create a Recipe</button>
            </Link>
            </div>
            <div className={s.bodyPage}>
            <div className={s.leftMenu}>
            <div className={s.reloadContainer}><button className={s.reloadButton} onClick={(e) => handleClick(e)}>Refresh All Recipes</button></div>
            {/* <hr /> */}
            <div className={s.searchAndFilterContainer}>
            <SearchBar></SearchBar>
            <div className={s.dietFilter}>
            <select id="dietFilter" onChange={e => handleFilterDiet(e)}>
                <option value="all" selected disabled>Type of Diets</option>
                <option value="Gluten free">Gluten Free</option>
                <option value="Ketogenic">Ketogenic</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Lacto ovo vegetarian">Lacto-Vegetarian</option>
                <option value="Dairy free">Dairy Free</option>
                <option value="Vegan">Vegan</option>
                <option value="Pescatarian">Pescetarian</option>
                <option value="Paleolithic">Paleolithic</option>
                <option value="Primal">Primal</option>
                <option value="Fodmap friendly">Foadmap Friendly</option>
                <option value="Whole 30">Whole 30</option>
            </select>
            <div className={s.dietArrow}></div>
            </div>
            </div>
            {/* <hr /> */}
            <div className={s.leftBottomContainer}>
            <div className={s.alphabeticOrder}>
            <select id="alphabeticOrder" onChange={e => handleOrder(e)}>
                <option value="default" selected disabled>Alphabetical</option>
                <option value="AscA">Ascending</option>
                <option value="DesA">Descending</option>
            </select>
            <div className={s.alphabeticArrow}></div>
            </div>
            <div className={s.numericalOrder}>
            <select id="order" onChange={e => handleOrder(e)}>
                <option value='default' selected disabled>Health Score</option>
                <option value="Asc">Ascending</option>
                <option value="Desc">Descending</option>
            </select>
            <div className={s.numericalArrow}></div>
            </div>
            </div>
            <div className={s.separator}></div>
            <Paginado 
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length}
            paginado={paginado}
            currentPage={currentPage}
            />
            </div>
            <div className={s.cardsContainer}>
            {
                currentRecipes?.map( recipe => {
                    return (
                    <div className={s.linkContainer}>
                        <Link className={s.link}to={'/home/' + recipe.id}>
                            {recipe.createdInDb ? 
                            <Card name={recipe.name} image={recipe.image ? recipe.image : 'https://images.ecestaticos.com/truXLOyXK78E59pA3kjWPdxk9cA=/0x109:2118x1302/1338x752/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F476%2Fde1%2Fd37%2F476de1d37f842213f0e2f924749e15d4.jpg'} diets={recipe.diets.map(diet => diet.name)}></Card> :
                            <Card name={recipe.name} image={recipe.image ? recipe.image : 'https://images.ecestaticos.com/truXLOyXK78E59pA3kjWPdxk9cA=/0x109:2118x1302/1338x752/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F476%2Fde1%2Fd37%2F476de1d37f842213f0e2f924749e15d4.jpg'} diets={recipe.diets}></Card>
                            }
                            
                        </Link>
                    </div>
                    )
                })
            }
        </div>
        </div>
        </div>
    )

}