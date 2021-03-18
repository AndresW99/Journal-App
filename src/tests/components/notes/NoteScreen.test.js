import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';    

import '@testing-library/jest-dom';
import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../components/actions/notes';


jest.mock('../../../components/actions/notes', () => ({
    activeNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: '1',
    name: 'Andres',
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 1234,
            title: 'Hola',
            body: 'mundo',
            date: 0
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter>
            <NoteScreen />
        </MemoryRouter>
    </Provider>
)

describe('Pruebas en el <NoteScreen />', () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });
   
    test('Debe hacer match con el snapshot', () => {
       
        expect( wrapper ).toMatchSnapshot();

    });

    test('debe de disparar el active note', () => {
       
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola gente'
            }
        });

        expect( activeNote ).toHaveBeenLastCalledWith(
            1234,
            {
                body: 'mundo',
                title: 'Hola gente',
                id: 1234,
                date: 0
            }
        );
    });
});
