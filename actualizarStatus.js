import fetch from 'node-fetch';
import base64 from 'base-64';
async function actualizacion(apiToken,orden) {
    const peticion =  await fetch(`https://api.businesscentral.dynamics.com/v2.0/7fbfad4c-f3dc-4bd0-8d8e-250325926ba0/Production/ODataV4/Company('CHEIL')/CabeceraVentas('Order','${orden}')`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`,
        'If-Match': '*'
      },
      body: JSON.stringify({
          "Description_Order_Insurance": "valid"
      })
    });

    if (peticion.status == 200) {
        console.log('Orden Actualizada: '+orden)
        return 200
    } else {
        console.log('Error en actualizacion: '+orden)
        return 'Error'
    }
   
  }

export default actualizacion;