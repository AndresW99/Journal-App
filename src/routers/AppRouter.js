import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/firebaseConfig'
import { login } from '../components/actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../components/actions/notes';

  export const AppRouter =() => {

    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect(() => {
      
      firebase.auth().onAuthStateChanged( async( user ) => {

        if( user?.uid ) {
          dispatch( login( user.uid, user.displayName ) );
          setIsLoggedIn( true );
          dispatch( startLoadingNotes( user.uid ) )

        } else {
          setIsLoggedIn( false );
        }

        setChecking( false );

      });

    }, [ dispatch, setChecking, setIsLoggedIn ] );

    if ( checking ) {
      return (
        <h1>Wait...</h1>
      )
    }

    return (

      <Router>
        <div>
  
          <Switch>

            <PublicRoute 
              path="/auth"
              component={ AuthRouter } 
              isAuthenticated={ isLoggedIn }   
            />

            <PrivateRoute 
              path="/"
              component={ JournalScreen }
              isAuthenticated={ isLoggedIn }
            />

            
            <Redirect to="/auth/login" />

          </Switch>
        </div>
      </Router>
    );
  }