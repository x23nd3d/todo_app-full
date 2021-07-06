import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom'
import AuthPage from "./pages/AuthPage";
import {Dashboard} from "./pages/Dashboard";
import toastr from 'toastr';

export const useRoutes = (isAuthenticated) => {

    if (isAuthenticated) {
        console.log('WORKING!!!')
        return (
           <Switch>
               <Route path="/dashboard" exact>
                   <Dashboard/>
               </Route>
               <Redirect to="/dashboard"/>
           </Switch>

        )
    } else {
        return (
            <Switch>
                <Route path="/auth" exact>
                    <AuthPage/>
                </Route>
                <Redirect to="/auth"/>
            </Switch>
        )
    }


}