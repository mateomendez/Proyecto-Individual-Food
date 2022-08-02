import React from "react"; 

export function Card({name, image, recipe_diet, createdInDb}) {
    return (
        <div>
            <h3>{name}</h3>
            <h5>{createdInDb ? recipe_diet.map(diet => diet.name) :{recipe_diet}}</h5>
            <img src={image} alt='Image not found'></img>
        </div>
    )
}