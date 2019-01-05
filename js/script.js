/**
 * @file Gestisce gli eventi associati ai bottoni.
 * {@link https://github.com/redeluni/crud-ajax-promise GitHub}
 * @author Daniele Manzi <daniele@mail.com>
 */
// localhost/crud-ajax-promise
import {request} from "./module/request.js";
import { pagination } from "./module/pagination.js";
import { clearTable, appendToTable, fillViewModal, fillUpdateModal } from "./module/dom.js";



   

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


    
let data, currentPage, pageLast;



/**
 * @name preparePage
 * @kind function
 * @param {(string|integer)} currentPage - il numero della pagina corrente
 * @param {string} [search] - la stringa che filtra il risultato della ricerca
 * @requires module:request/appendToTable/pagination/clearTable
 * @returns {void}
 */
function preparePage(currentPage, search=""){

   const rowForPage=2;
  
   const strOfObj_count = { rowForPage: rowForPage, search: search};

   const jsonCount = JSON.stringify(strOfObj_count); // converte l' array di oggetti in formato json
   
   data = "count="+jsonCount; // aggiungere "jsonData=" prima della stringa json altrimenti in php l'array $_POST["jsonData"] non viene settato

  
   request('count.php', data)
   .then((obj) => {
      
        pageLast = obj.pageLast;
        
        const strOfObj_select = {totalRows: obj.totalRows, rowForPage: obj.rowForPage, currentPage: currentPage, search: search};
        
        const pages = JSON.stringify(strOfObj_select); // converte l' array di oggetti in formato json
        
        data = "pages="+pages; // aggiungere "jsonSelect=" prima della stringa json altrimenti in php l'array $_POST["jsonSelect"] non viene settato
        
        return request("select.php", data) 
    })
    .then((obj) => {
        
        appendToTable(obj);
        pagination(currentPage, pageLast);
        selectAllButtons();
    })
    .catch((err) => {

        console.log(err);
        clearTable(); 
        pagination(currentPage);
        selectAllButtons();
    });
}

preparePage(1);


function clickButton(e) { 

    switch(e.target.id){

        case "insert-rows":
       
            let arrOfObj = [];

            const insert_rows = document.querySelector('#form__insert_rows').value; console.log(typeof insert_rows);

            for(let i=0; i<insert_rows; i++){
           
                let name = faker.name.findName();
                let mail = faker.internet.email();
                let city = faker.address.city();
                let phone = faker.phone.phoneNumber();
                arrOfObj.push({ name: name, mail: mail, city: city, phone: phone});  // Crea un array di oggetti: [{…}, {…}, {…}]
            }

            let jsonData = JSON.stringify(arrOfObj);  // converte l' array di oggetti in formato json

            data = "jsonData="+jsonData;  // aggiungere "jsonData=" prima della stringa json altrimenti in php l'array $_POST["jsonData"] non viene settato

            currentPage = document.querySelector('.current') != null ? document.querySelector('.current').getAttribute("currentpage") : 1;

            request('insert-rows.php', data)
            .then((success)=>{
                console.log(success);
                preparePage(currentPage);
            })
            .catch(err => console.log(err));
       
        break;


        case "insert-rand": 
       
            document.querySelector('#form__insert-name').value = faker.name.findName(); 
            document.querySelector('#form__insert-email').value = faker.internet.email(); 
            document.querySelector('#form__insert-city').value = faker.address.city();
            document.querySelector('#form__insert-tel').value = faker.phone.phoneNumber();
        break;


        case "insert-save":

            const insert_name = document.querySelector('#form__insert-name').value;
            const insert_mail = document.querySelector('#form__insert-email').value;
            const insert_city = document.querySelector('#form__insert-city').value;
            const insert_tel = document.querySelector('#form__insert-tel').value;

            const obj_insert_one = {name: insert_name, mail: insert_mail, city: insert_city, phone: insert_tel};
            const jsonInsertOne = JSON.stringify(obj_insert_one); // converte l' array di oggetti in formato json
            
            data = "jsonData="+jsonInsertOne; // aggiungere "jsonData=" prima della stringa json altrimenti in php l'array $_POST["jsonData"] non viene settato
    
            currentPage = document.querySelector('.current') != null ? document.querySelector('.current').getAttribute("currentpage") : 1;

            request('insert-one.php', data)
            .then((success)=>{
                console.log(success);
                preparePage(currentPage);
            })
            .catch(err => console.log(err));
        break;




        case "update-id": 
       
            const updateId = e.target.getAttribute('num'); 

            data = "select="+updateId;  
            request('select-id.php', data)
            .then((obj) => {
                
                fillUpdateModal(obj); 
                console.log("Selezionato id: "+updateId);
            })
            .catch(err => console.log(err));
        break;

        case "update-rand": 
       
            document.querySelector('#form__update-name').value = faker.name.findName(); 
            document.querySelector('#form__update-email').value = faker.internet.email(); 
            document.querySelector('#form__update-city').value = faker.address.city();
            document.querySelector('#form__update-tel').value = faker.phone.phoneNumber();
        break;

        case "update-save": 
       
            const update_id = document.querySelector('#form__update-id').value;
            const update_name = document.querySelector('#form__update-name').value;
            const update_mail = document.querySelector('#form__update-email').value;
            const update_city = document.querySelector('#form__update-city').value;
            const update_tel = document.querySelector('#form__update-tel').value;

            const strOfObj_update = {id: update_id, name: update_name, mail: update_mail, city: update_city, phone: update_tel};
            const jsonUpdate = JSON.stringify(strOfObj_update); // converte l' array di oggetti in formato json
            
            data = "jsonUpdate="+jsonUpdate; // aggiungere "jsonData=" prima della stringa json altrimenti in php l'array $_POST["jsonData"] non viene settato
    
            currentPage = document.querySelector('.current') != null ? document.querySelector('.current').getAttribute("currentpage") : 1;

            request('update.php', data)
            .then((success)=>{
                console.log(success);
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

            currentPage = document.querySelector('.current') != null ? document.querySelector('.current').getAttribute("currentpage") : 1;

            const delete_rows = document.querySelector('#form__delete_rows').value; 

            data = "rows="+delete_rows;

            request('delete-row.php', data)
            .then((success)=>{
                console.log(success);
                preparePage(currentPage);
            })
            .catch(err => console.log(err));
        
        break;
        
        case "delete-id": 
        
            let num = e.target.getAttribute('num');
            data = "id="+num;  
            
            currentPage = document.querySelector('.current') != null ? document.querySelector('.current').getAttribute("currentpage") : 1;
        
            request('delete.php', data)
            .then((success)=>{
                console.log(success);
                preparePage(currentPage);
            })
            .catch(err => console.log(err));
        break;

        case "truncate":

            request('truncate.php')
            .then((success)=>{
                console.log(success);
                preparePage(1);
               // clearTable(); 
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

