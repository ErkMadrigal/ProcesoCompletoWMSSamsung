import ordenesExcel from './leerExcelCEMS.js'
import ordenMasiva from './ordenMasivaCEMS.js'
import productoMasivo from './productoMasivo.js'
import actualizacion from './ActualizarStatus.js';
import eliminarOrden from './eliminarOrden.js';
import apiToken from './tokenGenerator.js';
import * as fs from 'fs';


let contador =0  

setTimeout(async()=>{
  
  do {
    try {
     /*  console.log(ordenesExcel[contador]) */
      
        let orden = await ordenMasiva(apiToken,ordenesExcel[contador])

         if (orden.Order_no) {
           /*  await productoMasivo(orden.Order_no,1)
            console.log("--- ORDEN CREADA ---") */
            let contadorProducto=0
            let productoexitoso=0
            console.log("--- ORDEN #"+ parseInt(contador+1)+"/"+ordenesExcel.length+" CREADA ---", orden.Order_no)
            fs.appendFile('test.txt', "--- ORDEN CREADA ---"+ orden.Order_no+"\r\n",(err) => {
                if (err) throw err;
            });
              do {  
            
                let productoResponse=await productoMasivo(
                  apiToken,
                  ordenesExcel[contador].orden,
                  ordenesExcel[contador].productos[contadorProducto].sku,
                  parseInt(contadorProducto+1),
                  ordenesExcel[contador].productos[contadorProducto].cantidad,
                  ordenesExcel[contador].productos[contadorProducto].price)
                  if (productoResponse== 'exito') {
                      console.log('exito en producto')
                      productoexitoso++
                  }else{
                    console.log('error en producto')
                    fs.appendFile('error.txt', "--- ERROR PRODUCTO :"+ productoResponse+"\r\n",(err) => {
                      if (err) throw err;
                    });
                  }
                contadorProducto++
              } while (contadorProducto < ordenesExcel[contador].productos.length);
              if (productoexitoso == ordenesExcel[contador].productos.length) {
                await actualizacion(apiToken,orden.Order_no)
                console.log('\x1b[36m%s\x1b[0m', 'ORDEN CREADA 100%'); 
                fs.appendFile('ordenesexitosas.txt', "--- ORDEN CREADA 100%---"+ orden.Order_no+"\r\n",(err) => {
                  if (err) throw err;
                });
              }else{
                console.log('\x1b[31m%s\x1b[0m', 'ORDEN CON ERROR'); 
                await eliminarOrden(apiToken,orden.Order_no)
                fs.appendFile('error.txt', "--- ORDEN CON ERROR ---"+ orden.Order_no+"\r\n",(err) => {
                  if (err) throw err;
                });
                fs.appendFile('error.txt', "--- ORDEN ELIMINADA ---"+ orden.Order_no+"\r\n",(err) => {
                  if (err) throw err;
                });
              }
              
        } else {
            console.log("_______________________________________________________")
            console.log("---  ORDEN NO CREADA ---",ordenesExcel[contador].orden)
            console.log(orden)
            console.log("_______________________________________________________")
           /*  console.log("--- NO SE CREO PRODUCTO ---") */
         
          
           fs.appendFile('test.txt', "---  ORDEN NO CREADA ---"+ordenesExcel[contador].orden+"\r\n"+JSON.stringify(orden)+"\r\n\r\n",(err) => {
            if (err) throw err;
          
          });
        
        } 
       
    } catch (error) {
        console.log(error)
    }
    contador++
  
  } while (contador < ordenesExcel.length);
},2000)