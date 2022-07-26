import React from "react";

export function Paginado ({recipesPerPage, allRecipes, paginado}){
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(allRecipes/recipesPerPage) + 1; i++){
        pageNumbers.push(i)
    }

    return (
        <nav>
           <ul>
            {pageNumbers && pageNumbers.map(number => (
                <li>
                <a onClick={() => paginado(number)}>{number}</a>
                </li>
            ))}
            </ul> 
        </nav>
    )
}