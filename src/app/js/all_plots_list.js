/* ----------------------------------------------------------------
 *   AUTHOR:        .... 
 *   FILE:           all_plots_list.js
 *   DATE:           07/04/2020
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */

let AllPlotsModel = {
    data: [],
    controller: {},
    credentials: "same-origin",
    load: function () {
        fetch('../api/v1.0/plots_all').then(function (answer) {

            // Here the url is sent to the api to have the data and they are passed to JSON      
            return answer.json();
        }).then(function (jsonData) {
            //console.log('TODOS ' + jsonData);
            this.data = jsonData;
            // Represent it
            ViewAllPlotsList.represent(data)
        }).then(function () {
            let tr = document.getElementsByTagName("tr");
            for (let i = 0; i < tr.length; i++) {
                tr[i].style.display = "table-row";
            }
        })
    }
};

let ViewAllPlotsList = {
    text: {},
    selector: {},
    prepare: function (tableId, selectId) {
        this.text = document.getElementById(tableId);
        if (selectId != "") {
            this.selector = document.getElementById(selectId);
        }
    },
    represent: function (data) {
        // This goes through each received field and does the same action for each one
        this.text.innerHTML += "<tbody></tbody>";
        let tbody = this.text.getElementsByTagName('tbody')[0];
        data.forEach((plot) => {

            // plot contains (name, longitude, latitude) u can write it as `${plot.name}` 
            // To concatenate text, put a + => "Field name:" + `$ {plot.name}` + "<br>";

            tbody.innerHTML += "<tr class='content_row admintr' style='display:none;' name='plot'><td><img src='img/mapi.png' alt='Parcela' style='width: 15px;height: 15px;'></td><td data-label='Empresa' name='plot'><input type='checkbox' style='margin:5px;' name='checkPlots' value='" + `${plot.id}` + "'><a class='links_usuarios' 'id='user_" + `${plot.id}` + "'>" + `${plot.name}` + '</td><td></a>' + "<a class='edit-button' href='javascript:openFieldForm()' title='Editar' margin='50px'></a></td></tr>"
        })
    }
};

function showCheckboxAdminAllPlots() {
    // Find all the inputs and see if they have name = checkPlots
    let input = document.getElementsByTagName("input")
    for (let i = 0; i < input.length; i++) {
        if (input[i].name == "checkPlots") {
            input[i].style.visibility = "visible";
            input[i].style.visibility = "inline";
        }
    }
};

let AllPlotsController = {
    model: AllPlotsModel,
    view: ViewAllPlotsList,
    init: function () {
        this.model.controller = this;
        this.model.load();
    }
};

function userDisab_mapEnab() {


    // Change the plots button from white to purple
    document.getElementById("button_user_filter").style.display = "initial";
    document.getElementById("button_user_filter_activated").style.display = "none";


    // Reverse last process for plots 
    document.getElementById("button_map_filter").style.display = "none";
    document.getElementById("button_map_filter_activated").style.display = "initial";

    //Change add button
    document.getElementById("button_Add_customer").style.display = "none";
    document.getElementById("button_Add_plot").style.display = "initial";


    // The parcels table is created, destroying the users table
    let table = document.getElementById("admin_table");
    table.removeChild(table.getElementsByTagName("tbody")[0])
    ViewAllPlotsList.prepare("admin_table");
    AllPlotsController.init();
}
