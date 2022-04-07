import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import axios from 'axios';
import Navbar3 from './Navbar3';

const Recipe = () => {
    console.log("HIIIIIIIIIIIIIIIIIIIIIHHHHHHH");
    const {search} =useLocation();
    const {id}=queryString.parse(search);
    const [lResponse, setLResponse] = useState("");
    const [title,setTitle]= useState('');
    const [inst,setInst]= useState('');
    const [auth,setAuth]= useState('');
    const [ingri,setIngri]= useState('');
    const [image, setImage] = useState('');
    const [newing, setNewing] = useState('');
    // const [loading, setLoading] = useState(false);

    // const {recipe, setReipe}=useState({item:"tea leaves", item:"milk"});

    const handleSubmit =() =>{
        // e.preventDefault();
        const recipe={ title,ingri,inst, auth, image};
        console.log(recipe);
        // console.log(e.target.files[0]);
        // var x={ingri}.split(" ");
        // console.log(x);
        fetch("http://localhost:5000/Recipe?id="+id)
        .then(res => res.json())
        .then(res => {
            setTitle(res[0]["Title"]);
            setInst(res[0]["Instructions"]);
            setIngri(res[0]["Ingridients"]);
            setAuth(res[0]["Author"]);
        });
    }
    useEffect( () => {
        handleSubmit();

    },[])
    // function setUserAnswer(ans){
    //     if ({ans}.trim()) {
    //       const answer_array = answer.split('/n');
    //       setNewing(answer_array);
    //     }
    //}
    return ( 
        <div>
            <div className="recipe">
                <Navbar3 />
                <h1>Recipe: {title}</h1>
                <p style={{color: '#444', margin: '2% 0 8% 0', fontSize: '16px' }} > By: {auth}</p>
                <h3 style={{fontSize: '25px', color: '#333', marginBottom: '5%'}} >Ingredients:</h3>
                {ingri ? 
                <>
                    {ingri.map((ingredient, i) => {
                    return (
                        <div key={i} >
                            <p style={{lineHeight: '25px', fontSize: '16px'}} > {ingredient}</p>
                        </div>
                    )
                })}
                </> 
                : <></>}
                <br/><br/>
                <h3>Instructions:</h3><br/>
                <pre>{inst}</pre>
            </div>
        </div>
     );
}
     
export default Recipe;


