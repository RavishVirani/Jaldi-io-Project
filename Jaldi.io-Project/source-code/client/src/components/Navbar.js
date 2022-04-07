import React, { useState, useContext } from 'react';
import { UserContext } from '../routes/UserContext';
import { useHistory } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {

    let history = useHistory();
    const {user, setUser} = useContext(UserContext);


    // Handles the home event
    const handleHome = event => {
        event.preventDefault();
        history.replace('/home');
    }

    // Handles the calendar event
    const handleCalendar = event => {
        event.preventDefault();
        history.replace('/calendar');
    }

    // Handles the chat event
    const handleChat = event => {
        event.preventDefault();
        history.replace('/chat');
    }

    // Handles the home event
    const handleRecipe = event => {
        event.preventDefault();
        history.replace('/RecipeHome');
    }

    // Handles the home event
    const handleLogout = event => {
        event.preventDefault();
        localStorage.setItem('user', '');
        setUser('');
        history.replace('/');
    }



    return (
        <div className="main_navigation">
            <img src={process.env.PUBLIC_URL + '/jaldiio.png'} alt="logo" className="logo" />
            <div className="spacer" />
            <img src={process.env.PUBLIC_URL + '/home.png'} alt="home" className="icons" onClick={handleHome} />
            <div className="spacer" />
            <img src={process.env.PUBLIC_URL + '/calendar.png'} alt="calendar" className="icons" onClick={handleCalendar} />
            <div className="spacer" />
            <img src={process.env.PUBLIC_URL + '/chat.png'} alt="chat" className="icons" onClick={handleChat} />
            <div className="spacer" />
            <img src={process.env.PUBLIC_URL + '/recipe.png'} alt="recipe" className="icons" onClick={handleRecipe} />
            <div className="spacer" /><div className="spacer" />
            <img src={process.env.PUBLIC_URL + '/logout.png'} alt="logout" className="logout" onClick={handleLogout} />
            <div className="spacer" />
        </div>
    )
}

export default Navbar;
