import fetch from 'node-fetch';
import base64 from 'base-64';

async function productoMasivo(apiToken,orden,sku,linea,cantidad,precio){
    if(sku.startsWith('F-')){
      /* sku='SM-F936BZEMLTM' */
      console.log('\x1b[33m%s\x1b[0m','SKU OMITIDO POR BUNDLE: '+sku )
      return 'exito'
    }
    if (sku.includes('MEXICO-')||sku.includes('Mexico-')) {
      console.log('\x1b[35m%s\x1b[0m','SKU OMITIDO POR SC+: '+sku )
      return 'exito'
    }
    console.log(orden,sku,linea,cantidad,precio)
   /*  const obtenerEan= */
   const ean =  await fetch(`https://api.businesscentral.dynamics.com/v2.0/7fbfad4c-f3dc-4bd0-8d8e-250325926ba0/production/ODataV4/Company('CHEIL')/Ficha_producto_Excel?$filter=SKU eq '${sku}'`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`,
        'If-Match': '*'
      }
    });
    let eanResponse= await ean.json()
    
    if (ean.status!= 200) {
      console.log(eanResponse)
      return 'Error: '+sku+' Status: '+ean.status
    }
    if (eanResponse.value.length==0) {
      console.log(eanResponse)
      return 'No existe SKU: '+sku
   
    }
   
     const producto =  await fetch(`https://api.businesscentral.dynamics.com/v2.0/7fbfad4c-f3dc-4bd0-8d8e-250325926ba0/production/ODataV4/Company('CHEIL')/LineasVenta`, {
      method: 'POST',
      headers: {
          'Authorization': 'Basic ' + base64.encode("ADMIN" + ":" + "l2GThBYORfu9qjAoTuh7/2WmJlSoY9n6HATCLeIRwB0="), 
          'Content-Type': 'application/json',
          'If-Match': '*'
      },
      body: JSON.stringify({
          "@odata.etag": "W/\"JzQ0O1g4RUNOajR1RHFuQ0FrNW1WdUN4bFV1RDQxMkFlNWI4Vkdaakc3aTBPd1U9MTswMDsn\"",
          "Document_Type": "Order",
          "Order_no":`${orden}`,
          "Line_No": parseInt(linea+'0000'),
          "Type": "Item",
          "Eancode": eanResponse.value[0].No,
          "Sku_price": precio/cantidad,
          "Quantity": cantidad,
          "Unit_of_Measure": "Unidad"
      })
    });
    let productoResponse=  producto.status
    let productoResponse2= await producto.json()
    if (productoResponse == 201) {
      return 'exito'
    }else{
      console.log(productoResponse2)
      return 'ENVIO '+sku+' '+productoResponse
    }
    
}

export default productoMasivo