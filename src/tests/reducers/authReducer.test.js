import '@testing-library/jest-dom';
import { types } from '../../components/types/types';
import { authReducer } from '../../reducers/authReducer';


describe('Pruebas en el authReducer', () => {
   
    test('debe de realizar el login', () => {
       
        const initState = {};

        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'Andres',
            }
        };

        const state = authReducer( initState, action );

        expect( state ).toEqual({
            uid: 'abc',
            name: 'Andres',
        })
    });

    test('debe de realizar el logout', () => {
       
        const initState = {
            uid: '1234',
            name: 'Mariana'
        };

        const action = {
            type: types.logout,
        };

        const state = authReducer( initState, action );

        expect( state ).toEqual({});
    });

    test('No debe de hacer cambios en el state', () => {
       
        const initState = {
            uid: '1234',
            name: 'Mariana'
        };

        const action = {
            type: 'abc',
        };

        const state = authReducer( initState, action );

        expect( state ).toEqual( initState );
    });
});
