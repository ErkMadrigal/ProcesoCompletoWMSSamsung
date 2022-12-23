import fetch from 'node-fetch';
import base64 from 'base-64';
/* import someObject from './buds.json' assert { type: 'json' }

console.log(someObject)
 */
async function ordenMasiva(apiToken,n) {
  /*  console.log(n)  */
  const ordenRespuesta =  await fetch(`https://api.businesscentral.dynamics.com/v2.0/7fbfad4c-f3dc-4bd0-8d8e-250325926ba0/production/ODataV4/Company('CHEIL')/CabeceraVentas`, {
    method: 'POST',
    headers: {
        
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`,
        'If-Match': '*'
    },
    body: JSON.stringify({
        "Document_Type": "Order",
            "Order_no": `${n.orden}`,
            "Sell_to_Customer_No": "CL-000003",
            "obNumber": `${n.orden}`,
            "Person_who_receiber_products": `${n.receiver.slice(0,99)}`,
            "Country_code": "MEX",
            "Post_code": `${n.postcode}`,
            "Province_address": `${n.city}`,
            "Name_of_the_main_street": `${ n.address.slice(0,99)}`,
            "District_address": `${n.address.slice(0,50)}`,
            "Number_address": "",
            "Internal_number_address": "",
            "Detail_address": "",
            "Telephone_number": `${n.phone}`,
            "Mobile_number":  `${n.phone}`,
            "Carrier_assigned": `${n.shipper}`,
            "Tracking_number": n.shipper == 'FedEx' ? 'FedEx': '',
            "Pathfile": n.shipper == 'FedEx' ? 'FedEx': '',
            "Order_withinsurance": true,
            "Description_Order_Insurance": "",
            "Delivery_method_code": "",
            "Ship_to_Email": "",
            "Delivery_Message": "",
            "Status_In_SysEnv": "",
            "VTEX_Store": "",
            "Status_in_VTEX": "",
            "Update_date_SysEnv": "0001-01-01T00:00:00Z",
            "Delivery_Date_SysEnv": "0001-01-01T00:00:00Z"
    })
  });
  //${n.shipper}
  
  return ordenRespuesta.json()
}



export default ordenMasiva;