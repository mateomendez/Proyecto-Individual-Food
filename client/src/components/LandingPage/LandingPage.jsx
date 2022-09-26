import React from "react";
import {Link} from 'react-router-dom';
import s from './LandingPage.module.css'

export function LandingPage() {
    return (
        <div className={s.landingMainContainer}>
                <div className={s.landingSubContainer}>
                <div className={s.titleDescription}>
                <h1 className={s.titleApp}>The most Complete Recipe Web</h1>
                <p className={s.descriptionApp}>Finding the perfect recipe might be difficult, that is why I created this app.</p>
                </div>
                <div className={s.buttonContainer}>
                <Link to='/home'>
                    <button className={s.buttonStart}>Start Now</button>
                </Link> 
                </div>
                </div>
        <div className={s.LandingImageContainer}>
            <img className={s.landingImage} src="https://images.unsplash.com/photo-1548940740-204726a19be3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80" alt="image not found" />
        </div>
        </div>
    )
}