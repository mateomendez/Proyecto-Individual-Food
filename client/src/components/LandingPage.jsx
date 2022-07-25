import React from "react";
import {Link} from 'react-router-dom';

export default function LandingPage() {
    return (
        <div>
            <h1>Recetas</h1>
            <Link to='/home'>
                <button>Continuar...</button>
            </Link>
        </div>
    )
}