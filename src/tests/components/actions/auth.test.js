import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { login, logout, startLoginEmailPassword, startLogout } from '../../../components/actions/auth';
import { types } from '../../../components/types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);


describe('Pruebas con las acciones de Auth', () => {


    beforeEach(() => {
        store = mockStore(initState);
    });

    
    test('login y logout deben de  crear la accion respectiva', () => {
       
        const uid = 'abc123';
        const displayName = 'Andres';

        const loginAction  = login( uid, displayName );
        const logoutAction = logout();
        
        expect( loginAction ).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName
            } 
        });

        expect( logoutAction ).toEqual({
            type: types.logout
        });
    });

    test('debe de realizar el startLogout', async() => {
           
        await store.dispatch( startLogout() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.logout
        });

        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
        });
    });

    test('debe de iniciar el startLoginEmailPassword', async() => {
    
        await store.dispatch( startLoginEmailPassword('test@testing.com', '123456' ) );

        const actions = store.getActions();

        expect( actions[1] ).toEqual({
            type: types.login,
            payload: {
                uid: 'KcokmmRPR0dbiMgodTqC3niBM4i2',
                displayName: null
            }
        })

    });
});
