// RICHIESTA FILE DI JSON --------------------------------------------------



function request(file, data=null) {

    return new Promise((resolve, reject) => {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 ) {
            if (this.status == 200) {
  
            let str = xhttp.responseText;  // console.log(str);
    
            let obj = JSON.parse(str);  //console.log(obj);
    
            if(obj.hasOwnProperty("success")){

               // request("select.php"); // "select=all", 
                console.log("success property");
                resolve(request("select.php"));

            } else if(obj.hasOwnProperty("error")){ 

                console.log("error property");
                reject("Errore: "+obj.error );
            } 
            else {
               
                 appendToDocument(obj);  // fa la select
                 resolve();
            }
                 
        }  else { reject("Errore code:"+this.status);}
    }
        
    };
    xhttp.open("POST", "server/"+file, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(data);
    });
}
    




// appendere al DOM i dati jason parsizzati in oggetto
function appendToDocument(data){
    let div = document.querySelector('.content');
    div.innerHTML = '';
    
    let tmpvar = '<table class="table"><thead><tr><th scope="col">#</th><th scope="col">Name</th><th scope="col">Email</th><th scope="col">Button</th></tr></thead><br><tbody>';
     
    for(let i=0; i<data.length; i++) {
    
        tmpvar += `<tr><th scope="row">${data[i].id}</th><td>${data[i].firstname}</td><td>${data[i].email}</td><td><button type="button" class="btn btn-danger" id="delete-num" num="${data[i].id}">-</button></td></tr>`;
    }
    tmpvar += '</tbody></table>';
    div.innerHTML = tmpvar;
  }





  
/* PROMISE
  function AjaxCall(filePath) {
    return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();

        xhttp.open('POST', filePath, true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send();

        xhttp.onreadystatechange = function() {
            if (xhttp.readyState === 4) {
                if (xhttp.status === 200) {
                    resolve(xhttp.responseText);
                } else {
                    reject(); // Probably including some rejection reason
                }
            }
        };
    });
}

*/

/*
function request(file, data=null) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
  
            let str = xhttp.responseText;  // console.log(str);
    
            let obj = JSON.parse(str);  //console.log(obj);
    
            if(obj.hasOwnProperty("success")){

                request("select.php"); // "select=all", 
                console.log("success property");

            } else if(obj.hasOwnProperty("error")){ 

                console.log("error property");
            } 
            else {
               
                 appendToDocument(obj);  // fa la select
            }
                 
        } // else {  console.log("errore response");}
        
    };
    xhttp.open("POST", "server/"+file, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(data);
    }
    
*/




    /*
    // function request(data, file) {
    function request() {
    
        console.log("SIIII");
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            
            console.log("onreadystatechange");
            if (this.readyState == 4 && this.status == 200) {
                console.log("RESPONSE");
                // xhttp.addEventListener("progress", updateProgress);
                // xhttp.addEventListener("load", transferComplete);
                // xhttp.addEventListener("error", transferFailed);
                // xhttp.addEventListener("abort", transferCanceled);
    
                // let box = document.querySelector('.box');
                // box.innerHTML = xhttp.responseText;
                // let str = xhttp.responseText;
               
             //   console.log(xhttp.responseText);
    
             //   let obj = JSON.parse(xhttp.responseText);  console.log(obj);
    
               
                
            //     let prop = "status";
            //     if(obj.hasOwnProperty(prop)){ // hasOwnProperty
            //     console.log("yes, i have error property");
            //     } else {
            //      fn(obj);
            //     }
            
            } else {  console.log("NOT RESPONSE"); };
            // xhttp.open("POST", "server/"+file, true);
            xhttp.open("POST", "localhost/faker/server/insert.php", true);
            // xhttp.open("POST", "http://localhost/faker/server/insert.php", true);
           xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // 
            // xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // application/x-www-form-urlencoded
            xhttp.send();
            // xhttp.send(data);
        }
        
    }
    */
    /*
    function transferComplete(evt) {
        console.log("The transfer is complete.");
      }
      
      function transferFailed(evt) {
        console.log("An error occurred while transferring the file.");
      }
      
      function transferCanceled(evt) {
        console.log("The transfer has been canceled by the user.");
      }
    
    */


    export { request };