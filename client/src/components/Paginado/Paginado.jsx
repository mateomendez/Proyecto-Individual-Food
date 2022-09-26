import React from "react";
import s from "./Paginado.module.css"


export function Paginado ({recipesPerPage, allRecipes, paginado, currentPage}){
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i)
    }

    // function changePage(page) {
    //     setCurrentPage(page)
    // }

    return (
        <nav className={s.paging}>
            {
                pageNumbers && (
                    <div className={s.nextPrevContainer}><a className={s.buttonPrev} onClick={()=> {paginado(currentPage > 1 ? currentPage - 1 : null)}}>{"<"}</a></div>
                )
            }
           <ul className={s.numberList}>
            {pageNumbers && pageNumbers.map(number => (
                <li className={s.number}>
                <a className={s.link}onClick={() => paginado(number)}>{number}</a>
                </li>
            ))}
            </ul>
            {
                pageNumbers && (
                    <div className={s.nextPrevContainer}><a className={s.buttonNext} onClick={()=> {paginado(currentPage < pageNumbers.length ? currentPage + 1 : null)}}>{">"}</a></div>
                )
            } 
        </nav>
    )
}