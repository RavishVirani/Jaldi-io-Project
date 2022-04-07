import { Link, useHistory } from 'react-router-dom';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const RecipeList = (props) => {
    const recipes = props.recipes;
    let history = useHistory();
    console.log("HIIIII");
    const handleIcon = (type, recipe) => {
        if (type === 'del') {
            fetch(`http://localhost:5000/DeleteRecipe?id=${recipe['_id']}`)
                .then(res => res.text())
                .then(res => {
                    window.location.reload();
                });
        } else {
            // console.log(recipe['_id']);
            history.push(`/CreateRecipe?id=${recipe['_id']}`)
        }
    }

    return (
        <div className="recipe-list">
            {recipes.map((recipe) => (
                <div className="recipe-preview" key={recipe._id}>
                    <div style={{ flexDirection: 'column', display: 'flex' }} >
                        <h2 style={{ marginBottom: '0' }} onClick={() => { history.push(`/Recipe?id=${recipe._id}`) }}>  {recipe.Title}</h2>
                        <h4>Written by {recipe.Author} </h4>
                    </div>
                    <DeleteIcon style={{ position: 'absolute', marginLeft: '30vmin', color: '#DD0000' }}
                        onClick={() => { handleIcon('del', recipe) }} />
                    <EditIcon style={{ position: 'absolute', marginLeft: '37vmin' }}
                        onClick={() => { handleIcon('edit', recipe) }} />

                </div>
            ))}
        </div>
    );
}

export default RecipeList;