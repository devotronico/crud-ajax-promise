import {request} from "./module/request.js";
import { pagination } from "./module/pagination.js";
import { clearTable, appendToTable, fillViewModal } from "./module/dom.js";


/**
 * FAKER
 * Scaricare la libreria faker all'url: https://github.com/Marak/faker.js/releases
 * Unzipparla in una cartella del progetto
 * Nel mio caso la unzippo nella cartella: js
 * 
 * Per utilizzare le funzioni della libreria faker bisogna linkare file faker.js 
 * per fare ciò nel file index.html aggiungo il tag: <script src="js\faker.js-4.1.0\build\build\faker.js"></script>
 * 
 * metodi/funzioni:
 * La lista dei metodi è a questo link:  http://marak.github.io/faker.js/#toc7__anchor
 * se si vuole ottenere il nome di una città: 
 * let city = faker.address.city();
 */

// document.addEventListener('DOMContentLoaded', function() { 
    function selectAllButtons(){

        let buttons = document.querySelectorAll('.btn');
        let pageButtons = document.querySelectorAll('.page-link');

        for ( const button of buttons ) { button.addEventListener('click', clickButton, false); }
        for ( const pageButton of pageButtons ) { pageButton.addEventListener('click', clickButton, false); }
       // for ( const pageButton of pageButtons ) { pageButton.addEventListener('click', clickPageButton, false); }

/*
        let btns = document.querySelectorAll('.btn');
        let pageButtons = document.querySelectorAll('.page-link');
     
      const buttons = Object.assign({}, btns, pageButtons);
      console.log(buttons); // { a: 1, b: 2, c: 3 }
    
      for ( const button of buttons ) { button.addEventListener('click', clickButton, false); }
     */
    }
   
   
   
    // Al refresh della pagina fa una select al db e se riceve una risposta vengono selezionati tutti i bottoni


    
let data, currentPage;

  
function preparePage(currentPage, search=""){

   const rowForPage=2;
  
   const strOfObj_count = { rowForPage: rowForPage, search: search};

   const jsonCount = JSON.stringify(strOfObj_count); // converte l' array di oggetti in formato json
   
   data = "count="+jsonCount; // aggiungere "jsonData=" prima della stringa json altrimenti in php l'array $_POST["jsonData"] non viene settato

  

   request('count.php', data)
   .then((obj) => {
      
        pagination(currentPage, obj.pageLast);
        // pagination(obj.pagenum, obj.pageLast);

        const strOfObj_select = {totalRows: obj.totalRows, rowForPage: obj.rowForPage, currentPage: currentPage, search: search};
        // const strOfObj_select = {totalRows: obj.totalRows, rowForPage: obj.rowForPage, currentPage: obj.pagenum, search: search};

        const pages = JSON.stringify(strOfObj_select); // converte l' array di oggetti in formato json

        data = "pages="+pages; // aggiungere "jsonSelect=" prima della stringa json altrimenti in php l'array $_POST["jsonSelect"] non viene settato

       // console.log(data);

        return request("select.php", data) //.catch(console.log("ERRORE CON SELECT"))); 
   })
   .then((obj) => {

     appendToTable(obj);

     selectAllButtons();
    })
    .catch((err) => {
        console.log(err)
        clearTable(); 
    });
}

preparePage(1);


function clickButton(e) {
   
    switch(e.target.id){

        case "insert": 
       
            let arrOfObj = [];

            for(let i=0; i<3; i++){
           
                let name = faker.name.findName();
                let mail = faker.internet.email();
                let city = faker.address.city();
                let phone = faker.phone.phoneNumber();
                arrOfObj.push({name: name, mail: mail, city: city, phone: phone});  // Crea un array di oggetti: [{…}, {…}, {…}]
            }

            let jsonData = JSON.stringify(arrOfObj);  // converte l' array di oggetti in formato json

            data = "jsonData="+jsonData;  // aggiungere "jsonData=" prima della stringa json altrimenti in php l'array $_POST["jsonData"] non viene settato

            currentPage = document.querySelector('.current').getAttribute("currentpage");

            request('insert.php', data)
            .then((mess)=>{
                console.log(mess);
                preparePage(currentPage);
            })
            .catch(err => console.log(err));
       
        break;



        case "update-id": 
       
            const row_id = e.target.getAttribute('num'); 
            const row_name = e.target.getAttribute('firstname'); 
            const row_mail = e.target.getAttribute('email'); 

            document.querySelector('#form__id').value = row_id;
            document.querySelector('#form__name').value = row_name;
            document.querySelector('#form__email').value = row_mail;
        break;

        case "update-rand": 
       
            const rand_name = faker.name.findName(); 
            const rand_mail = faker.internet.email(); 

            document.querySelector('#form__name').value = rand_name;
            document.querySelector('#form__email').value = rand_mail;
        break;

        case "update-save": 
       
            const id = document.querySelector('#form__id').value;
            const name = document.querySelector('#form__name').value;
            const mail = document.querySelector('#form__email').value;

            const strOfObj_update = {id: id, name: name, mail: mail};
            const jsonUpdate = JSON.stringify(strOfObj_update); // converte l' array di oggetti in formato json
            
            data = "jsonUpdate="+jsonUpdate; // aggiungere "jsonData=" prima della stringa json altrimenti in php l'array $_POST["jsonData"] non viene settato
    
            currentPage = document.querySelector('.current').getAttribute("currentpage");

            request('update.php', data)
            .then((mess)=>{
                console.log(mess);
                preparePage(currentPage);
            })
            .catch(err => console.log(err));
        break;

 


        case "select-id":
            
            const view_id = e.target.getAttribute('num'); 

            data = "select="+view_id;  
            request('select-id.php', data)
            .then((obj) => {
                
                fillViewModal(obj); 
                console.log("Selezionato id: "+view_id);
            })
            .catch(err => console.log(err));
  
        break;
        

        case "search":

            const search = document.querySelector('#form__search').value;
    
            preparePage(1, search);
        
        break;


        case "delete-rows":

            currentPage = document.querySelector('.current').getAttribute("currentpage");

            request('delete-row.php')
            .then((mess)=>{
                console.log(mess);
                preparePage(currentPage);
            })
            .catch(err => console.log(err));
        
        break;
        
        case "delete-id": //console.log("OK");
        
            let num = e.target.getAttribute('num');
            data = "id="+num;  
            
            currentPage = document.querySelector('.current').getAttribute("currentpage");
          //  console.log("currentPage: "+currentPage);
      
            request('delete.php', data)
            .then((mess)=>{
                console.log(mess);
                preparePage(currentPage);
            })
            .catch(err => console.log(err));
        break;

        case "truncate":
     
         //   request('truncate.php').then(selectAllButtons).catch(err => console.log(err));

            request('truncate.php')
            .then((mess)=>{
                console.log(mess);
                clearTable(); 
               // preparePage(currentPage);
            })
            .catch(err => console.log(err));
        break;

        case "pagenum":
            
            console.log("pagenum");
            const searchx = document.querySelector('#form__search').value;
            let pagenum = e.target.getAttribute("pagenum"); // currentPage
    
          //  console.log(search);
            preparePage(pagenum, searchx);
        break;
        
    } 
} // chiude funzione clickButton





/*
function clickPageButton(e) {
    
    // console.log(e.target);
   
    if(e.target.id == "pagenum"){
        const search = document.querySelector('#form__search').value;
        let pagenum = e.target.getAttribute("pagenum"); // currentPage

        console.log(search);
        preparePage(pagenum, search);
       // preparePage(pagenum);

    }
}
*/

// });
export { preparePage, selectAllButtons };

