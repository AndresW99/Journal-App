import { finishLoading, removeError, setError, starLoading } from '../../../components/actions/ui';
import '@testing-library/jest-dom';
import { types } from '../../../components/types/types';

describe('Pruebas en ui-actions, osea acciones sincronas', () => {
   
    test('todas las acciones deben de funcionar', () => {
       
        const action = setError('Aiudaaa!!');

        expect( action ).toEqual({
            type: types.uiSetError,
            payload: 'Aiudaaa!!'
        });

        const removeErrorAction = removeError();
        const startLoadingAction = starLoading();
        const finishLoadinfAction = finishLoading();
        
        expect( removeErrorAction ).toEqual({
            type: types.uiRemoveError
        });

        expect( startLoadingAction ).toEqual({
            type: types.uiStartLoading
        });

        expect( finishLoadinfAction ).toEqual({
            type: types.uiFinishLoading
        });

    });
});
