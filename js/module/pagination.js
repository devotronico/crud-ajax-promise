

  function pagination(currentPage, pageLast ){
    let ul = document.querySelector('.pagination'); //    <ul class="pagination justify-content-center">
    ul.innerHTML = '';
    let tmpvarPagination = '';
    currentPage = parseInt(currentPage, 10); // converte una stringa in un numero intero
    let activeLink = 3;
 
             /**
              * GENERA I BOTTONI [FirstPage] e [Previous]
              * currentPage può assumere solo valori numerici interi da 1 a infinito
              * currentPage è il numero della pagina attuale che è visualizzata a schermo
              * 
              * Se currentPage è maggiore di 1:
              * i bottoni First Page e  Previous diventano cliccabili
              * Se currentPage è uguale a 1:
              * i bottoni First Page e  Previous diventano NON cliccabili
              * 
              * Il bottone First Page: è sempre uguale a 1 quindi ci porta alla prima pagina
              * Il bottone Previous: è sempre di valore uguale a currentPage - 1: 
              * es.: se siamo alla pagina 8 il il bottone Previous ci porta alla pagina 7
              */
             if( currentPage > 1 ) {
                tmpvarPagination += `<li class="page-item"><a class="page-link" id="pagenum" pagenum="1">First Page</a></li>`;
                tmpvarPagination += `<li class="page-item"><a class="page-link" id="pagenum" pagenum="${currentPage-1}">Previous</a></li>`;
             } else { 
                tmpvarPagination += `<li class="page-item disabled"><span class="page-link">First</span></li>`;
                tmpvarPagination += `<li class="page-item disabled"><span class="page-link">Previous</span></li>`;
             }

            /**
             * CICLO PER GENERARE I BOTTONI NUMERATI
             * codice:  pageNum=currentPage-activeLink;
             * pageNum è la pagina che si trova prima della pagina attuale currentPage
             * quanto prima dipende dal valore che abbiamo dato a activeLink
             * es.: 
             * se currentPage è uguale a 6, e
             * se activeLink è uguale a 2, allora
             * e calcoliamo (currentPage-activeLink) ovvero (6-2)
             * pageNum è uguale a 4
             * quindi il ciclo non partirà dalla pagina attuale: 6
             * ma lo faremo partire dalla pagina numero 4
             * visualmente sarà così:
             * [First] [Previous] [.] [4] [5] (6) [7] [8] [.] [Next] [Last]
             * 
             * codice:  pageNum<=pageLast;
             * cicla fino all' ultima pagina
             * ---
             * codice:  if ( pageNum>0 ){
             * permette la generazione di bottoni numerati interi positivi a partire dal bottone numero 1
             * Se nel ciclo for l'operazione  'pageNum=currentPage-activeLink;' ritorna un numero negativo
             * allora il numero negativo viene ignorato perchè non ci sono pagine con valori negativi
             * es.: se  pageNum=currentPage-activeLink --> pageNum= 3-5 -->  pageNum= -2
             */
            for ( let pageNum=currentPage-activeLink; pageNum<=pageLast; pageNum++ ){ // console.log('pageNum: '+pageNum);
                if ( pageNum>0 ) {// console.log('pageNum: '+pageNum);
                    if ( pageNum <= currentPage + activeLink && pageNum >= currentPage - activeLink) { // da ottimizzare
                        if( pageNum==currentPage ) {
                            tmpvarPagination += `<li class="page-item active"><a class="page-link current" currentpage="${pageNum}" pagenum="${pageNum}">${pageNum}</a></li>`; // pagina attuale non cliccabile
                        } else if ( pageNum == currentPage + activeLink ) {
                            tmpvarPagination += `<li class="page-item"><a class="page-link" id="pagenum" pagenum="${pageNum}">...</a></li>`; // salta alla pagina in avanti
                        } else if ( pageNum == currentPage - activeLink) {
                            tmpvarPagination += `<li class="page-item"><a class="page-link" id="pagenum" pagenum="${pageNum}">...</a></li>`; // salta alla pagina indietro
                        } else {
                            tmpvarPagination += `<li class="page-item"><a class="page-link" id="pagenum" pagenum="${pageNum}">${pageNum}</a></li>`; // pagine numerate
                        }
                    }
                }
            }

             /**
              * GENERA I BOTTONI [Next] e [LastPage]
              * currentPage può assumere solo valori numerici interi da 1 a infinito
              * currentPage è il numero della pagina attuale che è visualizzata a schermo
              * 
              * Se currentPage è diverso dal numero dell' ultima pagina(pageLast):
              * i bottoni [Next] e [LastPage] diventano cliccabili
              * Se currentPage è uguale all' ultima pagina(pageLast):
              * i bottoni [Next] e [LastPage] diventano NON cliccabili
              * 
              * Il valore del bottone [LastPage]: è sempre uguale alla variabile pageLast quindi ci porta all' ultima pagina
              * Il valore del bottone [Next]: è sempre di valore uguale a currentPage + 1: 
              * es.: se siamo alla pagina 8 il bottone [Next] ci porta alla pagina 9
              */
            if( currentPage != pageLast) {
                tmpvarPagination += `<li class="page-item"><a class="page-link" id="pagenum" pagenum="${currentPage+1}">Next</a></li>`;
                tmpvarPagination += `<li class="page-item"><a class="page-link" id="pagenum" pagenum="${pageLast}">Last Page</a></li>`;
            } else {
                tmpvarPagination += `<li class="page-item disabled"><span class="page-link">Next</span></li>`;
                tmpvarPagination += `<li class="page-item disabled"><span class="page-link">Last Page</span></li>`;
            }

            ul.innerHTML = tmpvarPagination;
        }


  export { pagination };