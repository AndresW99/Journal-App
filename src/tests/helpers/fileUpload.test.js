import cloudinary from 'cloudinary';

import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({ 
    cloud_name: 'dcattfkms', 
    api_key: '322644569394646', 
    api_secret: 'nu58qqoi1qWWLFQJ_ML9wV5IW-w' 
});


describe('Pruebas en el fileUpload', () => {
   
    test('debe de cargar un archivo y retornar el URL', async() => {
       
        const resp = await fetch('https://img.freepik.com/vector-gratis/conjunto-iconos-redes-sociales-abstractos_1055-5053.jpg?size=338&ext=jpg');
        const blob = await resp.blob();

        const file = new File( [blob], 'foto.jpg');
        const url = await fileUpload( file );

        expect( typeof url ).toBe('string');

        const segments = url.split('/');
        const imgId = segments[ segments.length - 1].replace('.jpg','');

        cloudinary.v2.api.delete_resources(imgId, {}, ()=> {
          
        });

    }, 30000);

    test('debe de retornar un error', async() => {
       
        const file = new File( [], 'foto.jpg');
        const url = await fileUpload( file );

        expect( url ).toBe( null );
    });
});
