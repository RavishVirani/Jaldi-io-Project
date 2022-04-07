import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Login.css';

const Login = () => {

    let history = useHistory();
    const {user, setUser} = useContext(UserContext);

    // useStates for storing login data
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    // useStates for storing signup data
    const [name, setName] = useState("");
    const [nEmail, setNEmail] = useState("");
    const [nPassword, setNPassword] = useState("");
    const [rPassword, setRPassword] = useState("");


    //useStates for storing response data
    const [lResponse, setLResponse] = useState("");
    const [sResponse, setSResponse] = useState("");


    // Handles the login event
    const handleLogin = event => {
        event.preventDefault();
        
        if (email === "" || password === "") {
            setLResponse("Invalid Input");
        }
        
        else {
            const response = fetch("http://localhost:5000/login?email="+email+"&password="+password)
            .then(res => res.text())
            .then(res => setLResponse(res));
            if (lResponse !== "Incorrect Email or Password") {
                console.log(lResponse);
            }
            else {
                localStorage.setItem('user', email);
                setUser(email);
                history.replace('/home');
            }
        }
    }


    // Handles the login event
    const handleSignUp = event => {
        event.preventDefault();
        
        if (name === "" || nEmail === "" || nPassword === "" || rPassword === "") {
            setSResponse("Invalid Input");
        }

        else if (nPassword !== rPassword) {
            setSResponse("Password does not match");
        }
        
        else {
            fetch("http://localhost:5000/signup?name="+name+"&email="+nEmail+"&password="+nPassword)
            .then(res => res.text())
            .then(res => setSResponse(res));
            if (sResponse !== "Existing User Found") {
                console.log(sResponse);
            }
            else {
                localStorage.setItem('user', nEmail);
                setUser(nEmail);
                history.replace('/home');
            }
            
        }
    }



    return (
        <div>
            <div className="login">
                <div className="form">
                    <img src={process.env.PUBLIC_URL + '/jaldiio.png'} alt="Logo" className="img_login" /> 
                    <br></br><br></br><br></br><br></br>
                    <form onSubmit={handleLogin}>
                        <table>
                            <tbody>
                                <tr><td align="left">Email ID</td></tr>
                                <tr><td><input className="input" placeholder="user@example.com" size="35" type='text' value={email} onChange={e => setEmail(e.target.value)} /> </td></tr>
                                <tr><td><br></br><br></br></td></tr>
                                <tr><td align="left">Password</td></tr>
                                <tr><td><input className="input" placeholder="Enter Password" size="35" type='password' value={password} onChange={e => setPassword(e.target.value)} /> </td></tr>
                            </tbody>
                        </table>
                        <br></br><br></br>
                        <input id="login_button" type="submit" value="Login" />
                    </form>
                </div>
                <h5>{lResponse}</h5>
            </div>

            <div className="signup">
                <img src={process.env.PUBLIC_URL + '/jaldiio-B.png'} alt="Logo" className="img_signup" />
                <p id="signup-head">Create new account</p>
                <div className="form">
                    <form onSubmit={handleSignUp}>
                        <table>
                            <tbody>
                                <tr><td align="left">Name</td></tr>
                                <tr><td><input type='text' className="input" placeholder="Enter Name" size="40" value={name} onChange={e => setName(e.target.value)} /> </td></tr>
                                <tr><td><br></br></td></tr>
                                <tr><td align="left">Email ID</td></tr>
                                <tr><td><input type='text' className="input" placeholder="user@example.com" size="40" value={nEmail} onChange={e => setNEmail(e.target.value)} /> </td></tr>
                                <tr><td><br></br></td></tr>
                                <tr><td align="left">Password</td></tr>
                                <tr><td><input type='password' className="input" placeholder="Enter Password" size="40" value={nPassword} onChange={e => setNPassword(e.target.value)} /> </td></tr>
                                <tr><td><br></br></td></tr>
                                <tr><td align="left">Confirm Password</td></tr>
                                <tr><td><input type='password' className="input" placeholder="Enter Password" size="40" value={rPassword} onChange={e => setRPassword(e.target.value)} /> </td></tr>
                            </tbody>
                        </table>
                        <br></br><br></br>
                        <input id="signup_button" type="submit" value="Sign Up" />
                    </form>
                </div>
                <h5>{sResponse}</h5>
            </div>

        </div>
    )
}

export default Login