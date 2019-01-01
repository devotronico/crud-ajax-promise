function selectAllButtons2(){

    let buttons = document.querySelectorAll('.btn');
    let pageButtons = document.querySelectorAll('.page-link');
    // buttons.push(document.querySelectorAll('.page-link'));

    //  let buttons = btn.concat(pageButtons);
    // console.log(buttons);

    for ( const button of buttons ) { button.addEventListener('click', clickButton, false); }
    for ( const pageButton of pageButtons ) { pageButton.addEventListener('click', clickPageButton, false); }
}

export { selectAllButtons2 };