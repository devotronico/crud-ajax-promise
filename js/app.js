
import {request} from "./module/request.js";




let data, pageLast;
let currentPage = 1;
let searchOld = "";

/**
 * @name prepareOption
 * @kind function
 * @param {(string|integer)} //currentPage - il numero della pagina corrente
 * @param {string} [search] - la stringa che filtra il risultato della ricerca
 * @requires module:request/appendToTable/pagination/clearTable
 * @returns {void}
 */
function appendToSelect(data, search){

    const datalist = document.getElementById('optionlist'); // <datalist id="optionlist">

    
    if (search !== searchOld) {
        
        searchOld = search;
        datalist.textContent = ''; // elimina le option
   }
   
    for (let i=0; i < data.length; i++) {
      //   if (data[i].firstname !== 0) {continue;}

        let option = document.createElement('option');
        option.id = data[i].id; 
        option.value  = data[i].firstname; // data-subtext="Rep California"
        // option.text  = data[i].firstname;
        datalist.appendChild(option);
    }
}



function prepareOption(currentPage, search=""){

   const rowForPage=10;
  
   const strOfObj_count = { rowForPage: rowForPage, search: search };

   const jsonCount = JSON.stringify(strOfObj_count); // converte l' array di oggetti in formato json
   
   data = "count="+jsonCount; // aggiungere "jsonData=" prima della stringa json altrimenti in php l'array $_POST["jsonData"] non viene settato

   request('count.php', data)
   .then((obj) => {
      
       let pageLast = obj.pageLast;
        
        const strOfObj_select = { rowForPage: rowForPage, currentPage: currentPage, search: search};
        
        const pages = JSON.stringify(strOfObj_select); // converte l' array di oggetti in formato json
        
        data = "pages="+pages; // aggiungere "jsonSelect=" prima della stringa json altrimenti in php l'array $_POST["jsonSelect"] non viene settato
        
        return request("select.php", data) 
    })
    .then((obj) => {
        
        appendToSelect(obj); // da cambiare 
        addOptions(pageLast);
      //  pagination(currentPage, pageLast); // da cambiare 
      //selectAllOptions();
    })
    .catch((err) => {

        console.log(err);
     //   clearTable(); // da cambiare 
      //  pagination(currentPage); // da cambiare 
     //   selectAllButtons(); // da cambiare 
    });
}

prepareOption(1);





document.getElementById('list-name').addEventListener('keydown', function () {

    if (this.value.length === 0) {
        return;
    }
console.log("TEST");
    const search = this.value;
    
    prepareOption(1, search);
});


function addOptions(pageLast){


    if ( currentPage >= pageLast ) { return; }
   
    currentPage++;
    let options = document.querySelectorAll('option');
    let len = options.length;
    console.log("lunghezza:"+len);
    console.log("ultimo id:"+options[len-1].value);

    const search = document.getElementById('list-name').value;

    setTimeout(()=>{

        prepareOption(currentPage, search);
    }, 3000);
}



// test per aggiungere righe 
document.getElementById('add').addEventListener('click', function () {

    currentPage++;
    let options = document.querySelectorAll('option');
    let len = options.length;
    console.log("lunghezza:"+len);
    console.log("ultimo id:"+options[len-1].value);
    

    const search = document.getElementById('list-name').value;

    prepareOption(currentPage, search);
});





/*
const test = document.getElementById('optionlist'); // <datalist id="optionlist">

test.onscroll = function() {
    //console.log(this);
    console.log(test.offsetHeight);
    console.log(test.scrollTop);
    console.log(test.scrollHeight);
    //visible height + pixel scrolled = total height 
    if(test.offsetHeight + test.scrollTop == test.scrollHeight)
    {
        console.log("End");
    }
}
*/


/*
test.addEventListener("mouseenter", function( event ) {   
    
    event.target.style.color = "purple";
    
    // reset the color after a short delay
    setTimeout(function() {
        event.target.style.color = "";
    }, 500);
}, false);
*/

/*
var test = document.getElementById("optionId");
 
 test.addEventListener("click", function( event ) {   
     
     console.log("click");
    // event.target.style.color = "orange";
});
 test.addEventListener("mouseover", function( event ) {   
     
     console.log("mouseover");
    // event.target.style.color = "orange";
});
 test.addEventListener("mouseenter", function( event ) {   
     
     console.log("mouseenter");
    // event.target.style.color = "orange";
});
*/
// myMethod();
/*

document.getElementById("optionlist").addEventListener('scroll', function (e) {

console.log(this);
console.log(e);

});
*/
/*
const select = document.getElementById("list-name");
select.addEventListener("click", function() { console.log(select.value);  console.log("click"); });
select.addEventListener("change", function() { console.log(select.value); console.log("change"); });
select.addEventListener("mouseenter", function() { console.log(select.value); console.log("mouseenter"); });
select.addEventListener("mouseover", function() { console.log(select.value); console.log("mouseover"); });
*/


/*
function appendToSelect(data, search){

    const datalist = document.getElementById('optionlist'); // <datalist id="optionlist">

    
    if (search !== searchOld) {
        
        searchOld = search;
        datalist.textContent = ''; // elimina le option
   }
   
   let option = '';
    for (let i=0; i < data.length; i++) {
        if (data[i].firstname !== 0) {
             continue;
         }
         option += `<option value="${data[i].id}">${data[i].firstname}</option>`;
    }
    datalist.innerHTML = option;
}
*/




/*
function selectAllOptions(){
console.log("selectAllOptions");
    let options = document.getElementsByTagName('OPTION');
 
    for ( const option of options ) { console.log(option); option.addEventListener('click', selectOption, false); } // mouseenter ,  mouseover, mouseenter
}


function selectOption(evt){

    console.log("click");
    console.log(evt.target.value);
}
*/

/*

var fakeServerResponse = ['Anthony', 'Angel', 'Anna', 'Aurelio'];
var datalist = document.getElementById('names');
let data;

document.getElementById('name').addEventListener('keyup', function () {
    if (this.value.length === 0) {
        return;
    }

    pageLast = obj.pageLast;

    const rowForPage = 2;


        
    const strOfObj_select = {totalRows: obj.totalRows, rowForPage: obj.rowForPage, currentPage: currentPage, search: this.value};
    
    const pages = JSON.stringify(strOfObj_select); // converte l' array di oggetti in formato json
    
    data = "pages="+pages; // aggiungere "jsonSelect=" prima della stringa json altrimenti in php l'array $_POST["jsonSelect"] non viene settato
    
    return request("select.php", data) 
   
 

    datalist.textContent = '';
    for (var i = 0; i < fakeServerResponse.length; i++) {
        if (fakeServerResponse[i].indexOf(this.value) !== 0) {
            continue;
        }
        var option = document.createElement('option');
        option.value = fakeServerResponse[i];
        datalist.appendChild(option);
    }
});

*/