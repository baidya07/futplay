import React from 'react';
import {SocialIcon} from 'react-social-icons';
import {Link} from 'react-router-dom';

import Login from '../components/auth/Login'

class Header extends React.Component{
    render(){
        return(
            <header>
                <div className="main-container">
                    <div className="">
                        <div className="title">
                            <div className="login-link">
                                
                            </div>
                        </div>
                            <div className="media-links">
                               <SocialIcon url="http://facebook.com" color="white"/>
                                <SocialIcon url="http://twitter.com" color="white"/>
                            </div>  
                    </div>
                </div>
            </header>
        )
    }
}

export default Header