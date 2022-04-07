import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Home.css';


const Home = () => {
    let history = useHistory();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    // Get user's name
    
    
    const handleName = event => {
        setEmail(localStorage.getItem('user'));
        fetch("http://localhost:5000/home?email="+ email)
        .then(res => res.text())
        .then(res => setName(res));
        
    }
    

    // Handles the Create event
    const handleCreate = event => {
        event.preventDefault();
        history.push('/create-family');
    }

    // Handles the Join event
    const handleJoin = event => {
        event.preventDefault();
        history.push('/join-family');
    }



    return (
            <div onLoad={handleName}>
                <div className="welcome">
                    <h2 className="pad">Hello, {name}!</h2>
                    <p className="pad">Welcome to Jaldi.io</p>
                </div>
                
                <div className="row">
                    <Navbar />
                    <div className="options" onClick={handleCreate}>
                        <img src={process.env.PUBLIC_URL + '/createFamily.png'} alt="create-family" className="img" />
                        <h3>Create Family</h3>
                    </div>
                    <div className="options" onClick={handleJoin}>
                        <img src={process.env.PUBLIC_URL + '/joinFamily.png'} alt="join-family" className="img" />
                        <h3>Join Family</h3>
                    </div>
                </div>
            </div>
    )
}

export default Home