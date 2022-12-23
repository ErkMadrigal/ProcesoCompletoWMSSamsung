import { createRequire } from "module";
const require = createRequire(import.meta.url);

var XLSX = require('xlsx');
var workbook = XLSX.readFile('./orders/andy.xlsx');
var sheet_name_list = workbook.SheetNames;
var ordenesOriginal = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

ordenesOriginal.forEach(element => {
    element['Order No.']=element['Order No.']
});

let ordenesFormateada = ordenesOriginal.map((i)=>{
    let x ={
        orden:i['Order No.'],
        ob:i['Order No.'],
        receiver:i.Receiver,
        address:i.Address.slice(0,99),
        colonia:i.Address.slice(0,99),
        postcode:i['Post Code'],
        city:i.Province.slice(0,30),
        phone:i.Phone,
        shipper:i.Shipper
    }
    return x})

let ordenesFormateada2 = ordenesFormateada.filter((value, index, self) =>
index === self.findIndex((t) => (
  t.orden === value.orden
))
)
let ordenesFormateadaUnicasConProducto =ordenesFormateada2.map((i)=>{
    i.productos=[]
    i.total=0
    ordenesOriginal.forEach(element => {
            if (element['Order No.'] == i.orden) {
                i.productos.push({
                    orden: element['Order No.'],
                    sku: element['SKU No.'],
                    cantidad: element.Quantity,
                    price: element['Selling Price']
                })
                i.total+=element['Selling Price']
            }
    });
    return i 
})

export default ordenesFormateadaUnicasConProducto;
/* console.log(ordenesOriginal)
console.log(ordenesFormateada[0])
console.log(ordenesFormateada2[0]) */

/* //generate worksheet and workbook 
const workbook3 = XLSX.utils.book_new();
const worksheet3 = XLSX.utils.json_to_sheet(final);

XLSX.utils.book_append_sheet(workbook3, worksheet3);
let fechadocumento="ReporteDHL "+
new Date().toLocaleString().replaceAll("/","_").replaceAll(":","_").replaceAll(", "," ")+
".xlsx";
XLSX.writeFile(workbook3,fechadocumento) ;
  */