import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { activeNote, startDeleting } from '../actions/notes';

import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active:note } = useSelector( state => state.notes );  //Seleccionamos cada nota para poder mostrarla 
    const [ formValues, handleInputChange, reset ] = useForm( note );  //El form para recibir los datos de cada nota
    const { body, title, id } = formValues;     //Recibimos el cuerpo y titulo de la nota

    const activeId = useRef( note.id );

    //Manejamos el estado de las notas, para visualizar el cambio entre ellas
    useEffect(() => {
    
        if( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id
        }

    }, [note, reset]);

    useEffect(() => {
        
        dispatch( activeNote( formValues.id, { ...formValues } ) );

    }, [ formValues, dispatch ] ); 

    const handleDelete = () => {

        dispatch( startDeleting( id ) );

    }

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Write a title "
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea
                    placeholder="How was your day?"
                    className="notes__text-area"
                    name="body"
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>

                {
                    (note.url) 
                    &&( 
                        <div className="notes__image">
                            <img 
                                src={ note.url }
                                alt="imagen" 
                            />
                        </div>
                    )
                }

            </div>

            <button
                className="btn btn-danger"
                onClick={ handleDelete }
            >  
                Delete
            </button>

        </div>
    )
}
