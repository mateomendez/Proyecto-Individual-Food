import React from "react";
import {Link} from 'react-router-dom';

export function LandingPage() {
    return (
        <div className="landingMainContainer">
                <div className="landingSubContainer">
                {/* <img className="logo" src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/76ab2e19585305.562dce0bcf645.png" alt="image not found"  /> */}
                <div className="titleDescription">
                <h1 className="titleApp">The most complete Recipe Web</h1>
                <p className="descriptionApp">Finding the perfect recipe might be difficult, that is why I created this app.</p>
                </div>
                <div className="buttonContainer">
                <Link to='/home'>
                    <button className="buttonStart">Start Now</button>
                </Link> 
                </div>
                </div>
        <div>
            <img className="landingImage" src="https://images.unsplash.com/photo-1548940740-204726a19be3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80" alt="image not found" />
        </div>
        </div>
    )
}