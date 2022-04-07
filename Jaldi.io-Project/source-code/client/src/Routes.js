import React, { useContext } from "react";
import { UserContext } from "./routes/UserContext";

import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import Login from './routes/Login';
import Home from './routes/Home';
import CreateFamily from './routes/CreateFamily';
import JoinFamily from './routes/JoinFamily';
import CalendarApp from './routes/CalendarApp';
import RecipeHome from './routes/RecipeHome';
import Recipe from './routes/Recipe';
import CreateRecipe from './routes/CreateRecipe';



const Routes = () => {
    const {user} = useContext(UserContext);

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {user === "" ? <Login />: <Redirect to = "/home" />}
                </Route>
                <Route exact path="/home">
                    {user !== "" ? <Home />: <Redirect to = "/" />}
                </Route>
                <Route exact path="/create-family">
                    {user !== "" ? <CreateFamily />: <Redirect to = "/" />}
                </Route>
                <Route exact path="/join-family">
                    {user !== "" ? <JoinFamily />: <Redirect to = "/" />}
                </Route>
                <Route exact path="/calendar">
                    {user !== "" ? <CalendarApp />: <Redirect to = "/" />}
                </Route>
                <Route exact path="/RecipeHome">
                    {user !== "" ? <RecipeHome />: <Redirect to = "/" />}
                </Route>
                <Route exact path="/Recipe">
                    {user !== "" ? <Recipe />: <Redirect to = "/" />}
                </Route>
                <Route exact path="/CreateRecipe">
                    {user !== "" ? <CreateRecipe/>: <Redirect to = "/" />}
                </Route>
                
            </Switch>
    </Router>
    );
}
 
export default Routes;