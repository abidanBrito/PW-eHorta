/* ----------------------------------------------------------------
 *   AUTHOR:        Pablo Enguix   Daniel Burruchaga 
 *   FILE:           all_plots_list.js
 *   DATE:           07/04/2020
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */
function filterFunction() {
    let input, filter, table, tr, td, i, txtValue, tdUser, tdPlot;
    //Recogemos el valor de la barra de búsqueda
    input = document.getElementById("searchInput");
    // Lo convertimos a mayúsculas para que no importen 
    filter = input.value.toUpperCase();
    // Recogemos la tabla de la que vamos a buscar y filtrar los datos
    table = document.getElementById("admin_table");
    // Cogemos cada elemento que tiene la tabla
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        //Miramos en su primer td (en el primero está el nombre y en el segundo el botón de editar)
        td = tr[i].getElementsByTagName("td")[1];
        tdUser = tr[0].getElementsByTagName("td")[1].getAttribute("name");
        tdPlot = tr[tr.length - 2].getElementsByTagName("td")[1].getAttribute("name");
        if (td) {
            // Miramos el texto que contiene ese td
            txtValue = td.innerText;
            //Pasamos ese texto a mayúsculas para que no importen y miramos si se encuentra (si no se encuentra desaparece)
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "table-row";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function filterFunctionMobile() {
    let input, filter, table, tr, td, i, txtValue, tdUser, tdPlot;
    //Recogemos el valor de la barra de búsqueda
    input = document.getElementById("searchInputMobile");
    // Lo convertimos a mayúsculas para que no importen 
    filter = input.value.toUpperCase();
    // Recogemos la tabla de la que vamos a buscar y filtrar los datos
    table = document.getElementById("admin_table");
    // Cogemos cada elemento que tiene la tabla
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        //Miramos en su primer td (en el primero está el nombre y en el segundo el botón de editar)
        td = tr[i].getElementsByTagName("td")[1];
        tdUser = tr[0].getElementsByTagName("td")[1].getAttribute("name");
        tdPlot = tr[tr.length - 2].getElementsByTagName("td")[1].getAttribute("name");
        if (td) {
            // Miramos el texto que contiene ese td
            txtValue = td.innerText;
            //Pasamos ese texto a mayúsculas para que no importen y miramos si se encuentra (si no se encuentra desaparece)
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "table-row";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function filterFunctionThreshold() {
    let input, filter, table, tr, td, i, txtValue, tdUser, tdPlot;
    //Recogemos el valor de la barra de búsqueda
    input = document.getElementById("searchInput");
    // Lo convertimos a mayúsculas para que no importen
    filter = input.value.toUpperCase();
    // Recogemos la tabla de la que vamos a buscar y filtrar los datos
    table = document.getElementById("threshold_table");
    // Cogemos cada elemento que tiene la tabla
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        //Miramos en su primer td (en el primero está el nombre y en el segundo el botón de editar)
        td = tr[i].getElementsByTagName("td")[1];
        tdUser = tr[0].getElementsByTagName("td")[1].getAttribute("name");
        tdPlot = tr[tr.length - 2].getElementsByTagName("td")[1].getAttribute("name");
        if (td) {
            // Miramos el texto que contiene ese td
            txtValue = td.innerText;
            //Pasamos ese texto a mayúsculas para que no importen y miramos si se encuentra (si no se encuentra desaparece)
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "table-row";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}