import {clearTable, appendToTable, fillViewModal } from "./dom.js";
import { pagination } from "./pagination.js";
import { preparePage, selectAllButtons } from "../script.js";
// import { selectAllButtons2 } from "./buttons.js";

// RICHIESTA FILE DI JSON --------------------------------------------------
function request(file, data=null){

    return new Promise((resolve, reject) =>{

    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 ) {
            if (this.status == 200) {
  
            let str = xhttp.responseText;  // console.log(str);
    
            let obj = JSON.parse(str);   console.log(obj);
    
         //  resolve(obj);

            if(obj.hasOwnProperty("success")){

                resolve("Success: "+obj.success);
                // resolve(preparePage());  // resolve(request("count.php"));    // resolve(request("select.php"));   //   
               
            } else if(obj.hasOwnProperty("error")){ 
           
                 reject("Errore: "+obj.error );

            } else if(obj.hasOwnProperty("empty")){ 

                reject("Empty: "+obj.empty);
                // clearTable(); 
                //reject("Errore: "+obj.empty ); 
            } else if(obj.hasOwnProperty("view")){ 


                resolve(obj);   // fillViewModal(obj);  

            } else if(obj.hasOwnProperty("count")){ 
    
                resolve(obj);
                /*
                const totalRows = obj.totalRows; 
                const currentPage = obj.pagenum; 
                const pageLast = obj.pageLast;
                const rowForPage = obj.rowForPage;
              
                pagination(currentPage, pageLast);


                const strOfObj_select = {totalRows: totalRows, rowForPage: rowForPage, currentPage: currentPage};

                const pages = JSON.stringify(strOfObj_select); // converte l' array di oggetti in formato json
                
                data = "pages="+pages; // aggiungere "jsonSelect=" prima della stringa json altrimenti in php l'array $_POST["jsonSelect"] non viene settato

                 resolve(request("select.php", data).then(selectAllButtons)); //.catch(console.log("ERRORE CON SELECT"))); 
                //  resolve(request("select.php", data).then(selectAllButtons).catch(selectAllButtons)); 
             */
            } else {
               // console.log(obj);
                //  appendToTable(obj); 
                resolve(obj);
                //  resolve( console.log("Bottoni tutti selezionati"));
              //  
                // resolve(appendToTable(obj), selectAllButtons);
            }
            
                 
        } else { reject("Errore code:"+this.status);}
    }
        
    };
    xhttp.open("POST", "server/"+file, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(data);
    });
}
    

export { request };









  