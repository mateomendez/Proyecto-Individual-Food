import React from "react"; 

export function Card({name, image, diets}) {
    return (
        <div>
            <h3>{name}</h3>
            <h5>{diets}</h5>
            <img src={image} alt='Image not found'></img>
        </div>
    )
}