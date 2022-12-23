import fetch from 'node-fetch';
async function eliminarOrden(apiToken,orden) {
    const peticion =  await fetch(`https://api.businesscentral.dynamics.com/v2.0/7fbfad4c-f3dc-4bd0-8d8e-250325926ba0/Production/ODataV4/Company('CHEIL')/Pedido_venta_Excel('Order','${orden}')`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`,
        'If-Match': '*'
      }
    });

    if (peticion.status == 204) {
        console.log('Orden Eliminada: '+orden)
        return 200
    } else {
        console.log('Error en eliminar: '+orden)
        return 'Error'
    }
   
  }

export default eliminarOrden;