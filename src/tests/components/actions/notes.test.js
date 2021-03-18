import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../../components/actions/notes';
import { types } from '../../../components/types/types';
import { db } from '../../../firebase/firebaseConfig';
import { fileUpload } from '../../../helpers/fileUpload';

jest.mock( '../../../helpers/fileUpload', () => ({
    fileUpload: jest.fn( () => {
        return 'https://hola-mundo.com/cosa.jpg';
    })
}));
 
const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'Andres'
    },
    notes : {
        active: {
            id: '6XdJlVX0v2tmgZ034Fvd',
            title: 'Holas',
            body: 'Mundo'
        }
    }
};

let store = mockStore(initState);


describe('Pruebas con las acciones de notes', () => {

    beforeEach( () => {

        store = mockStore(initState)

    });
   
    test('debe de crear una nueva nota startNewNote', async () => {
       
        await store.dispatch( startNewNote() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect( actions[1] ).toEqual({
            type:types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        const docId = actions[0].payload.id;
        await db.doc(`/Andres/journal/notes/${ docId }`).delete();
    });

    // test('startLoadingNotes debe de cargar las notas', async() => {
    
    //     await store.dispatch( startLoadingNotes('Andres') );
    //     const actions = store.getActions();

    //     expect( actions[0] ).toEqual({
    //         type: types.notesLoad,
    //         payload: expect.any(Array)
    //     });

    //     const expected = {
    //         id: expect.any(String),
    //         title: expect.any(String),
    //         body: expect.any(String),
    //         date: expect.any(Number),
    //     }

    //     expect( actions[0].paylaod[0] ).toMatchObject( expected );
    // });

    // test('startSaveNote debe de actualizar la nota ', async() => {
       
    //     const note = {
    //         id: 'Lotm3H3WjIr8exsq0bEU',
    //         title: 'titulo',
    //         boyd: 'body'
    //     };

    //     await store.dispatch( startSaveNote( note ) );

    //     const actions = store.getActions();

    //     expect( actions[0].type ).toBe( types.notesUpdated );

    //     const docRef = await db.doc(`/Andres/journal/notes/${ note.id }`).get();

    //     expect( docRef.data().title ).toBe( note.title );
    // });

    // test('startUploading debe de actuaizar el url del entry ', async() => {
       
    //     const file = new File([], 'foto.jpg');
    //     await store.dispatch( startUploading( file ) );

    //     const docRef = await db.doc('/Andres/journal/notes/6XdJlVX0v2tmgZ034Fvd').get();
    //     expect( docRef.data().url ).toBe('https://hola-mundo.com/cosa.jpg');
    // });
});
