import React from "react";
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { searchRecipes } from "../../actions";
import s from './SearchBar.module.css'

export function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(name === "") return alert('You must search for a Recipe')
        dispatch(searchRecipes(name))
        setName('')
    }

    return (
        <div className={s.searchBarContainer}>
            <form className={s.form} onSubmit={e => handleSubmit(e)}>
                <input className={s.input} type="text" placeholder="Search Recipe..." value={name} onChange={e=>handleInputChange(e)} />
                <input className={s.button} type="submit" value="Search"/>
            </form>
        </div>
    )

}