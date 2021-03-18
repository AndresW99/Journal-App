import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';    

import '@testing-library/jest-dom';
import { Sidebar } from '../../../components/journal/Sidebar';
import { startLogout } from '../../../components/actions/auth';
import { startNewNote } from '../../../components/actions/notes';

jest.mock('../../../components/actions/notes', () => ({
    startNewNote: jest.fn(),
}));

jest.mock('../../../components/actions/auth', () => ({
    startLogout: jest.fn(),
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
            id: 'ABC'
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter>
            <Sidebar />
        </MemoryRouter>
    </Provider>
)


describe('Pruebas en <Sidebar />', () => {
   
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });
    
    test('debe de mostrar correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();

    });
    
    test('debe de llamar el startLogout', () => {
        
        wrapper.find('.btn').prop('onClick')();

        expect( startLogout ).toHaveBeenCalled();

    });
    
    test('debe de llamar el startNewNote', () => {
       
        wrapper.find('.journal__new-entry').prop('onClick')();

        expect( startNewNote ).toHaveBeenCalled();

    });
});
