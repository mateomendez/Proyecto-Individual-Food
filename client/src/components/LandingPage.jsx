import React from "react";
import {Link} from 'react-router-dom';

export function LandingPage() {
    return (
        <div>
            <h1>Recipes App</h1>
            <Link to='/home'>
                <button>Start...</button>
            </Link>
        </div>
    )
}