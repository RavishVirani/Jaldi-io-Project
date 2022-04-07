// - /login LoginScreen
// - /    Calendar
import React, { useContext } from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { CalendarScreen } from './../components/calendar/CalendarScreen';
import { UserContext } from "../routes/UserContext";


import Login from '../routes/Login';
import Home from '../routes/Home';
import CreateFamily from '../routes/CreateFamily';
import JoinFamily from '../routes/JoinFamily';
import CalendarApp from '../routes/CalendarApp';

export const AppRouter = () => {


    const {user} = useContext(UserContext);

    return (
            <Router>
                <div>
                <Switch>
                    <Route exact path="/calendar" component={CalendarScreen} />
                    
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



                </Switch>
                </div>
            </Router>
        )
}
