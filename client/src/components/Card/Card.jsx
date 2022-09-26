import React from "react"; 
import s from "./Card.module.css"
 
export function Card({name, image, diets,}) {
    
    var shownDiets = [];
    for(let i = 0; i < 3; i++){
        shownDiets.push(diets[i])
    }
    const viewMore = diets.length - shownDiets.length

    

    return (
        <div className={s.card}>
            <img className={s.cardImage} src={image} alt='Image not found'></img>
            <p className={s.cardTitle}>{name}</p>
            {viewMore > 0 ? 
            <p className={s.cardDiets}>{`${shownDiets.join(", ")} and ${viewMore} more`}</p> :
            <p className={s.cardDiets}>{shownDiets.filter(element => element !== undefined).join(", ")}</p> 
            }
        </div>
    )
}