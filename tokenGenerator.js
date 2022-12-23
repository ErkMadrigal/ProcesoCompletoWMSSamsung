import fetch from 'node-fetch';
import base64 from 'base-64';

let orden = {value:[]}
let i=0
const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));


var token2=''
var apiToken=''


let token= await fetch('https://login.microsoft.com/7fbfad4c-f3dc-4bd0-8d8e-250325926ba0/oauth2/v2.0/token', {
    method: 'POST',
    body: 
    'grant_type=client_credentials&client_id=' + '4797961b-6ee4-4586-801d-99eaf208c1c7' 
    + '&client_secret=' + '06U8Q~K9eulgpnRnNeQPHV41ZgeONm_Yb2sHzdl7'
    + '&scope=' + 'https://api.businesscentral.dynamics.com/.default',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'APIKEY':'l768a8be81d4c6497fb28f6e03fd30538a'
    }
});


token2= await token.json()
apiToken= token2.access_token
console.log("API TOKEN GENERADO");
export default apiToken