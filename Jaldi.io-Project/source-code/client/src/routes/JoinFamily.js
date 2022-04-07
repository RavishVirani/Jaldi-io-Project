import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './JoinFamily.css';


const JoinFamily = () => {

    let history = useHistory();

    // useStates for storing local data
    const [famCode, setFamCode] = useState("");
    const [RString, setRString] = useState("");

    // Handles the login event
    const handleCreate = event => {
        event.preventDefault();
        
        if (famCode === "") {
            setRString("Invalid Input");
        }
        
        else {
            var email = localStorage.getItem('user');
            fetch("http://localhost:5000/create-family?email="+ email +"&famcode="+famCode)
            .then(res => res.text())
            .then(res => setRString(res));
        }
    }


    // Handles the login event
    const handleCancel = event => {
        event.preventDefault();
        history.push('/home');
    }


    return (  
        <div>
            <h1 className="head">Join Family</h1>
            <div className="center">
                <img src={process.env.PUBLIC_URL + '/joinFamily.png'} alt="create-family" className="img_jf" />
                
                <form onSubmit={handleCreate} onReset={handleCancel}>
                        <table>
                            <tbody>
                                <tr><td align="left">Enter Unique Code</td></tr>
                                <tr><td><input className="input" placeholder="Example: bro-army-69" size="35" type='text' value={famCode} onChange={e => setFamCode(e.target.value)} /> </td></tr>
                            </tbody>
                        </table>
                        <br></br><br></br>
                        <input id="cancel_button" type="reset" value="Cancel" />
                        <input id="join_button" type="submit" value="Join" />
                </form>
            </div>
            <h5>{RString}</h5>
        </div>
    );
}

export default JoinFamily