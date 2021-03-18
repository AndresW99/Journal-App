

export const fileUpload = async ( file ) => {

    const cloudUrl = ' https://api.cloudinary.com/v1_1/dcattfkms/upload'; //Subir datos a cloudinary

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');  //Especificamos las rutas que tenemos en postman
    formData.append('file', file);

    try {
        
        const resp = await fetch( cloudUrl, {
            method: 'POST', //Indicamos que sera un POST y no un GET 
            body: formData
        });

        if ( resp.ok ) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;   //Manejamos la subida del archivo
        } else {
            return null;   //En caso de no subirse por error de cloud 
        }

    } catch (error) {
        throw error;    //Error por parte nuestra y no de cloud
    }
}