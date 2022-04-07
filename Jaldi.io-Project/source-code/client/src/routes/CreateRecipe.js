import react, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import Navbar3 from './Navbar3'
const CreateRecipe = () => {
    const {search} = useLocation();
	const { id } = queryString.parse(search);
    
    let history = useHistory();

    const [title,setTitle]= useState('');
    const [inst,setInst]= useState('');
    const [auth,setAuth]= useState('');
    const [ingri,setIngri]= useState('');
    const [finalIngredients, setFinalIngredients] = useState([]);

    const handleSubmit = () => {
        const data = { "_id": id, "title": title, "ingr": finalIngredients, "inst": inst, "auth": 'Gordon Ramsay' };
        if (id) {
            fetch(`http://localhost:5000/EditRecipe`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(res => {
                    history.push("/RecipeHome");
                });
        } else {
            fetch(`http://localhost:5000/CreateRecipe`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(res => {
                    history.push("/RecipeHome");
                });
        }
    }

    useEffect(() => {
        if(id) {
            fetch(`http://localhost:5000/FindRecipe?id=${id}`)
            .then(res => res.json())
            .then(res => {
                setTitle(res['Title'])
                setFinalIngredients(res['Ingridients'])
                setInst(res['Instructions'])
            });
        }
    }, [id]);

    const handleClick = (event) => {
        if (event.key === 'Enter') {
            // setFinalIngredients(finalIngredients.push(ingri));
            finalIngredients.push(ingri); 
            setIngri('');
        }
    }

    return (
        <div>
        <Navbar3 />
        <div style={styles.mainContainer}>
            <h2>{id ? 'Edit Recipe' : 'Add New Recipe'}</h2>
            <div style={{alignItems: 'center'}} >
                <p style={{marginRight: '15%'}} > Title: </p>
                <input style={styles.titleInput} placeholder='Title'
                value ={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div style={{alignItems: 'center'}} >
                <p style={{marginRight: '7%', alignItems: 'center'}} > Ingredients: </p>
                <input style={styles.titleInput} placeholder='Enter Ingredient here'
                onChange={(e) => setIngri(e.target.value)} value={ingri} onKeyDown={handleClick} />
            </div>
            <div style={styles.ingredientContainer} className='ingredientContainer' >
                {finalIngredients.map((ingredient, i) => {
                    return (
                        <div style={styles.ingredientTag} key={i} >
                            {ingredient}
                        </div>
                        
                    )
                })}
            </div>
            <div style={{alignItems: 'center'}} >
                <p style={{marginRight: '7%'}} > Instructions: </p>
                <textarea style={styles.InstInput} placeholder='Enter Instructions here'
                onChange={(e) => setInst(e.target.value)} value={inst} />
            </div>
            <div style={{alignItems: 'center'}} >
                <button style={styles.submit} className='button' onClick={() => {handleSubmit()}} > 
                {id ? 'Edit Recipe' : 'Add Recipe'}
                 </button>
                
            </div>
        </div>
        </div>
    )
}

const styles = {
    mainContainer: {
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center'
    },
    titleInput: {
        border: '1px solid black',
        borderRadius: '20px',
        padding: '5px 10px',
        outline: 'none',
        width: '20vmin'
    },
    InstInput: {
        border: '1px solid black',
        borderRadius: '20px',
        // padding: '5px 10px',
        outline: 'none',
        height: '25vmin',
        width: '50vmin'
    },
    ingredientTag: {
        // padding: '5px 10px',
        border: '2px solid #340067',
        borderRadius: '20px',
        marginTop: '2%',
        color: '#340067',
        flexDirection: 'column',
        display: 'flex',
        // width: '30vmin'
    }, 
    ingredientContainer: {
        height: '15vmin',
        width: '50vmin',
        // padding: '1% 10%',
        marginTop: '2%',
        overflow: 'auto',
        alignItems: 'center',
        flexDirection: 'column',
        display: 'flex',
        border: '1px solid #999',
        borderRadius: '20px',
    }, 
    submit: {
        border: 'none',
        borderRadius: '20px',
        backgroundColor: '#301970',
        width: '20vmin',    
        padding: '10px 10px',
        marginTop: '5%',
        color: '#FFF',
    }
}

export default CreateRecipe;