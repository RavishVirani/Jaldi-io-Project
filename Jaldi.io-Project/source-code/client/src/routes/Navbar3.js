import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import { useHistory } from 'react-router-dom';
import './Navbar3.css';

const Navbar = () => {

    let history = useHistory();
    const {user, setUser} = useContext(UserContext);


    // Handles the home event
    const handleHome2 = event => {
        event.preventDefault();
        history.push('/home');
    }

    // Handles the calendar event
    const handleCalendar2 = event => {
        event.preventDefault();
        history.push('/calendar');
    }

    // Handles the chat event
    const handleChat2 = event => {
        event.preventDefault();
        history.push('/chat');
    }

    // Handles the home event
    const handleRecipe2 = event => {
        event.preventDefault();
        history.push('/RecipeHome');
    }

    // Handles the home event
    const handleLogout2 = event => {
        event.preventDefault();
        localStorage.setItem('user', '');
        setUser('');
        history.replace('/');
    }



    return (
        <div className="main_navigation3">
            <img src={process.env.PUBLIC_URL + '/jaldiio.png'} alt="logo" className="logo2" />
            <div className="spacer2" />
            <img src={process.env.PUBLIC_URL + '/home.png'} alt="home" className="icons2" onClick={handleHome2} />
            <div className="spacer2" />
            <img src={process.env.PUBLIC_URL + '/calendar.png'} alt="calendar" className="icons2" onClick={handleCalendar2} />
            <div className="spacer2" />
            <img src={process.env.PUBLIC_URL + '/chat.png'} alt="chat" className="icons2" onClick={handleChat2} />
            <div className="spacer2" />
            <img src={process.env.PUBLIC_URL + '/recipe.png'} alt="recipe" className="icons2" onClick={handleRecipe2} />
            <div className="spacer2" /><div className="spacer2" />
            <img src={process.env.PUBLIC_URL + '/logout.png'} alt="logout" className="logout2" onClick={handleLogout2} />
            <div className="spacer2" />
        </div>
    )
}

export default Navbar;
