import {request} from "./module/request.js";

/**
 * FAKER
 * Scaricare la libreria faker all'url: https://github.com/Marak/faker.js/releases
 * Unzipparla in una cartella del progetto
 * Nel mio caso la unzippo nella cartella: js
 * 
 * Per utilizzare le funzioni della libreria faker bisogna linkare file faker.js 
 * per fare ciò nel file index.html aggiungo il tag: <script src="js\faker.js-4.1.0\build\build\faker.js"></script>
 */
document.addEventListener('DOMContentLoaded', function() { 
  

    function selectAllButtons(){

        const buttons = document.querySelectorAll('.btn');
        console.log(buttons.length);
        for ( const button of buttons ) { button.addEventListener('click', clickButton, false); }
    }
   
   request('select.php').then(selectAllButtons).catch(err => console.log(err));



function clickButton(e) {
 
    let data;
    switch(e.target.id){

        case "insert": 
           
            let arrOfObj = [];

            for(let i=0; i<3; i++){
           
                let name = faker.name.findName();
                let mail = faker.internet.email();
                arrOfObj.push({name: name, mail: mail});  // Crea un array di oggetti: [{…}, {…}, {…}]
            }

            let jsonData = JSON.stringify(arrOfObj);  // converte l' array di oggetti in formato json

            data = "jsonData="+jsonData;  // aggiungere "jsonData=" prima della stringa json altrimenti in php l'array $_POST["jsonData"] non viene settato

           // let data = 'lorem=ipsum&name=binny';
           request('insert.php', data).then(selectAllButtons).catch(err => console.log(err));
   
        break;


        case "select":
    
            data = "select=1";  
          
            request('select.php', data).then(selectAllButtons).catch(err => console.log(err));
        break;


        case "delete-row":

            request('delete-row.php').then(selectAllButtons).catch(err => console.log(err));
        
        break;
        
        case "delete-num": //console.log("OK");

            let num = e.target.getAttribute('num');
            data = "id="+num;  

            console.log(num);

     
            request('delete.php', data).then(selectAllButtons).catch(err => console.log(err));
      
        break;
        
    }
} // chiude funzione clickButton




});



/*
function clickButton(e) {

    let data;
    switch(e.target.classList.item(1)){

        case "btn-primary": 
           
            let arrOfObj = [];

            for(let i=0; i<3; i++){
           
                let name = faker.name.findName();
                let mail = faker.internet.email();
                arrOfObj.push({name: name, mail: mail});  // Crea un array di oggetti: [{…}, {…}, {…}]
            }

            let jsonData = JSON.stringify(arrOfObj);  // converte l' array di oggetti in formato json

            data = "jsonData="+jsonData;  // aggiungere "jsonData=" prima della stringa json altrimenti in php l'array $_POST["jsonData"] non viene settato

           // let data = 'lorem=ipsum&name=binny';
           request('insert.php', data);
            // let response;
            // response = request(data, 'insert.php');
            // console.log(response);
        break;


        case "btn-success":
           
            data = "select=1";  
          
            request('select.php', data);
        break;

        case "btn-danger":

        if (e.target.hasAttributes()){
            console.log("p");
            let attrs = e.target.attributes;
            console.log(attrs);
            //   console.log(e.target.attributes[2].value);
           // let num = e.target.getAttribute('num');
           // console.log(num);
        } else {
            console.log("g");

            request('delete-row.php');
        }

        break;
        
        case "btn-danger":

            data = "delete";  
          
            request('delete.php', data);
        break;
        
    }
} // chiude funzione clickButton
*/

