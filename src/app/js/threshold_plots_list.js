/* ----------------------------------------------------------------
 *   AUTHOR:        Daniel Burruchaga Sola 
 *   FILE:           all_plots_list.js
 *   DATE:           07/04/2020
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */
console.log("thresholds PLOTS LIST JS OK");
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
    prepare: function (tableId) {
        this.text = document.getElementById(tableId);
          },
    represent: function (data) {
        // This goes through each received field and does the same action for each one
        this.text.innerHTML += "<tbody></tbody>";
        let tbody = this.text.getElementsByTagName('tbody')[0];
             data.forEach((plot) => {

            // plot contains (name, longitude, latitude) u can write it as `${plot.name}` 
            // To concatenate text, put a + => "Field name:" + `$ {plot.name}` + "<br>";
            
            tbody.innerHTML += "<tr 'id='tr_plot_" + `${plot.id}` +"' class='content_row admintr' style='display:none;' name='plot'><td><img src='img/mapi.png' alt='Parcela' style='width: 15px;height: 15px;'></td><td name='plot'><a href='javascript:charge_thresholds_values("+`${plot.id}`+");'   class='plot_thresholds' id='plot_" + `${plot.id}` + "'>" + `${plot.name}` + '</td><td></a>' + "</td></tr>" //plot_"+ `${plot.id}` +"
        
        }
       )
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