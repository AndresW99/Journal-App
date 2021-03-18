import Swal from 'sweetalert2';

import { db } from "../../firebase/firebaseConfig";
import { fileUpload } from '../../helpers/fileUpload';
import { loadNotes } from "../../helpers/loadNotes";
import { types } from '../types/types';

// react-journal


export const startNewNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        try {
            
            const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );
    
            dispatch( activeNote( doc.id, newNote ) );
            dispatch( addNewNote( doc.id, newNote ) );

        } catch (error) {
            console.log(error)
        }


    }
}   

export const activeNote = ( id, note ) => ({

   type: types.notesActive,
   payload: {
       id,
       ...note
   }  

});

export const addNewNote = ( id, note ) => ({

    type: types.notesAddNew,
    payload: {
        id, ...note
    }
});

export const startLoadingNotes = ( uid ) => {

    return async( dispatch ) => {

        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) )

    }
}

export const setNotes = ( notes ) => ({

    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = ( note ) => {

    return async( dispatch, getState ) => {

        const { uid } = getState().auth;  //Obtenes el UID del estado de la Auth

        try {
            if ( !note.url ) {
                delete note.url;        //Si la nota es null la elimina 
            }
    
            const noteToFirestore = { ...note }; //Creamos la nota y mantenemos su estado
            delete noteToFirestore.id;
    
            await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore ); //Subimos la nota a firebase

            dispatch( refreshNote( note.id, noteToFirestore ) );  //Realizamos el refresh de la nota por si cambiamos algo
            Swal.fire('Saved', note.title, 'success');  //Notificacion de subida completada

        } catch (error) {
            throw new Error('No se ha podido cargar la nota');   //En caso de que tengamos un error al subirla
        }
    }
}

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id, 
        note: {
            id, 
            ...note
        }
    }
});

export const startUploading = ( file ) => {

    return async ( dispatch, getState ) => {

        const { active:activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ) );

        Swal.close();
    }
}

export const startDeleting = (id) => {

    return async( dispatch, getState) => {

        const uid = getState().auth.uid
        await db.doc(`${ uid }/journal/notes/${ id }`).delete();

        dispatch( deleteNote( id ) );
    }
}

export const deleteNote = (id) => ({

    type: types.notesDelete,
    payload: id
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning,
});