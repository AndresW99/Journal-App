import '@testing-library/jest-dom';
import { types } from '../../../components/types/types';


describe('Pruebas en los types', () => {

    const type = {
        
        login: '[Auth] Login',
        logout: '[Auth] Logout',
    
        uiSetError: '[UI] Set Error',
        uiRemoveError: '[UI] Remove Error',
    
        uiStartLoading: '[UI] Start Loading',
        uiFinishLoading: '[UI] Finish Loading',
    
        notesAddNew: '[Notes] New note',
        notesActive: '[Notes] Set active note',
        notesLoad: '[Notes] Load notes',
        notesUpdated: '[Notes] Update note',
        notesFileUrl: '[Notes] Updated image url',
        notesDelete: '[Notes] Delete note',
        notesLogoutCleaning: '[Notes] Logout Cleaning',
    }
   
    test('Debe de mostrar el objeto correctamente', () => {
       
        expect( type ).toEqual( types );

    });
});
