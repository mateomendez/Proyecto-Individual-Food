import React from "react";
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { searchRecipes } from "../actions";

export function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(searchRecipes(name))
    }

    return (
        <div>
            <input 
            type="text"
            placeholder="Search Recipe..." 
            onChange={(e) => handleInputChange(e)}
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )

}