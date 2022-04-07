import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RecipeList from './RecipeList';
import Navbar3 from './Navbar3';

const RecipeHome = () => {
    const [lResponse, setLResponse] = useState("");
    const[title, setTitle]= useState('');
    const[auth, setAuth ]= useState('');
    const[id, setId]=useState('');
    const [recipes, setRecipe]= useState([]);
    const fetchRecipes = () => {
        return ( 
            fetch("http://localhost:5000/RecipeHome")
            .then(res => res.json())
            .then(res =>{
                console.log(res);
                setRecipe(res);
                console.log(recipes);
            })
            );
        }
    useEffect(() =>{
        fetchRecipes();
    },[]);

    return (
        <div className="recipehome">
            <Navbar3 />
            <h1 style={{marginBottom: '4%'}} >View Recipes</h1>
            
            {recipes && <RecipeList recipes={recipes}/>}
            <br/><br/><br/>
            <Link to='/CreateRecipe' style={{
                    background: "#301970",
                    color: "#fff",
                    border: "0",
                    padding: "18px",
                    borderRadius: "25px",
                    cursor: "pointer",
                    textDecoration: "none"
                }}>Add new recipes</Link>
        </div>
      );
}
 
export default RecipeHome;