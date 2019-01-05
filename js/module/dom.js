






function clearTable(){ 

    let div = document.querySelector('.content');
    div.innerHTML = '';
}



function fillViewModal(data){ 

    let div = document.querySelector('.view__tbody__name');
    div.innerHTML = '';

    let viewtmpvar = `
        <tr>
            <th scope="row" class="view__tbody__id">${data.id}</th>
            <td class="view__tbody__name">${data.firstname}</td>
            <td class="view__tbody__email">${data.email}</td>
            <td class="view__tbody__city">${data.city}</td>
            <td class="view__tbody__phone">${data.phone}</td>
        </tr>`;

        div.innerHTML = viewtmpvar;
}


function fillUpdateModal(data){ 

        document.querySelector('#form__update-id').value = data.id;
        document.querySelector('#form__update-name').value = data.firstname;
        document.querySelector('#form__update-email').value = data.email;
        document.querySelector('#form__update-city').value = data.city;
        document.querySelector('#form__update-tel').value = data.phone;
}



// appendere al DOM i dati json parsizzati in oggetto
function appendToTable(data){
    let div = document.querySelector('.content');
    div.innerHTML = '';
    
    let tmpvar = '<table class="table"><thead><tr><th scope="col">#</th><th scope="col">Name</th><th scope="col">Email</th><th scope="col">Btn1</th><th scope="col">Btn2</th><th scope="col">Btn2</th></tr></thead><br><tbody>';
     
    for(let i=0; i<data.length; i++){
        
        let rowId =  `<th scope="row">${data[i].id}</th>`;
        let utente =  `<td firstname="${data[i].firstname}">${data[i].firstname}</td>`;
        let email =  `<td email="${data[i].email}">${data[i].email}</td>`;
        let btn_view   = `<td><button type="button" class="btn btn-success" id="select-id" num="${data[i].id}" data-toggle="modal" data-target="#modal__view">View</button></td>`;
        let btn_update = `<td><button type="button" class="btn btn-warning" id="update-id" num="${data[i].id}" data-toggle="modal" data-target="#modal__update">Update</button></td>`;
        let btn_delete = `<td><button type="button" class="btn btn-danger" id="delete-id" num="${data[i].id}">Delete</button></td>`;

        tmpvar += `<tr>`;
        tmpvar += rowId;
        tmpvar += utente;
        tmpvar += email;
        tmpvar += btn_view;
        tmpvar += btn_update;
        tmpvar += btn_delete;
        tmpvar += `</tr>`;
    }
    tmpvar += '</tbody></table>';
    div.innerHTML = tmpvar;
  }



  export { clearTable, appendToTable, fillViewModal, fillUpdateModal };