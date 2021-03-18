import Swal from 'sweetalert2';

import { types } from '../types/types';
import { firebase } from '../../firebase/firebaseConfig';
import { googleAuthProvider } from '../../firebase/firebaseConfig';
import { finishLoading, starLoading } from './ui';
import { noteLogout } from './notes';

export const startLoginEmailPassword = ( email, password ) => {
    return (dispatch) => {

        dispatch( starLoading() );

        return firebase.auth().signInWithEmailAndPassword( email, password )  //Login con usuario registrado
            .then( ( { user }) => {
                dispatch(
                    login( user.uid, user.displayName )
                );

                dispatch(
                    finishLoading()   
                );
            })
            .catch( e => {
                console.log(e);
                dispatch( finishLoading() );
                Swal.fire('Error', e.message, 'error');
            });
    }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {

    return ( dispatch ) => {

        firebase.auth().createUserWithEmailAndPassword( email, password )   //Creacion de usuario con correo
            .then( async( { user } ) => {

                await user.updateProfile( { displayName: name } );

                dispatch(
                    login( user.uid, user.displayName )
                )
            })
            .catch( e => {
                console.log( e );
                Swal.fire('Error', e.message, 'error');
            })
    }

}


export const startGoogleLogin = () => {
    return ( dispatch ) => {

        firebase.auth().signInWithPopup( googleAuthProvider )      //Login con Google
            .then( ( { user } ) => {
                dispatch(
                    login( user.uid, user.displayName )
                )
            });
    }
}

export const login = (uid, displayName) => ({
     
    type: types.login,
    payload: {
        uid,
        displayName
    } 
});

export const startLogout = () => {
    return async( dispatch ) => {
        await firebase.auth().signOut();

        dispatch( logout() );
        dispatch( noteLogout() );

    }
}

export const logout = () => ({

    type: types.logout

})