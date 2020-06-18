/* ----------------------------------------------------------------
*   AUTHOR:         Abidán Brito
*   FILE:           graph_panel_hero.js
*   DATE:           15/06/2020
*   STATE:          WIP
*  ---------------------------------------------------------------- */ 
//
// TODO: Date selectors reset placerholder and date value.
//

// ----------------------------------------------------------------
// Global settings for the chart
// ----------------------------------------------------------------
// Datasets for the graph
var chartData = {
    datasets: [
        // Humidity
        {
            label: '%',
            data: [],
            fill: false,
            borderColor: '#247ebb',
            cubicInterpolationMode: 'default',
            backgroundColor: '#247ebb',
            pointStyle: 'circle',
            pointRadius: 3,
            hidden: false
        },
        // Temperature
        {
            label: 'ºC',
            data: [],
            fill: false,
            borderColor: '#d94c00',
            cubicInterpolationMode: 'default',
            backgroundColor: '#d94c00',
            pointStyle: 'circle',
            pointRadius: 3,
            hidden: false
        },
        // Luminosity
        {
            label: '%',
            data: [],
            fill: false,
            borderColor: '#d9bc00',
            cubicInterpolationMode: 'default',
            backgroundColor: '#d9bc00',
            pointStyle: 'circle',
            pointRadius: 3,
            hidden: false
        },
        // Rainfall
        {
            label: 'mm',
            data: [],
            fill: false,
            borderColor: '#ba239e',
            cubicInterpolationMode: 'default',
            backgroundColor: '#ba239e',
            pointStyle: 'circle',
            pointRadius: 3,
            hidden: false
        },
        // Salinity
        {
            label: 'g/L',
            data: [],
            fill: false,
            borderColor: '#23ba49',
            cubicInterpolationMode: 'default',
            backgroundColor: '#23ba49',
            pointStyle: 'circle',
            pointRadius: 3,
            hidden: false
        },
    ]
};

// Settings to draw the chart
var chartOptions = {
    scales: {
        yAxes: [{
            stacked: false,
            ticks: {
                beginAtZero: true,
                steps: 10,
                stepValue: 10,
                max: 100,
                padding: 5,
                fontSize: 10
            },
            gridLines: {
                lineWidth: 1
            }
        }],
        xAxes: [{
            ticks: {
                display: false
            },
            gridLines: {
                lineWidth: 0
            }
        }]
    },
    legend: {
        display: false
    },
    layout: {
        padding: {
            top: 5,
            right: 5
        }
    },
    title: {
        display: false
    },
    animation: false,
    hover: {
        intersect: false,
        animationDuration: 0
    },
    tooltips: {
        backgroundColor: '#333333',
        titleFontColor: '#ddd',
        titleAlign: 'center',
        bodyFontColor: '#ddd'
    },
    defaultFontFamily: 'Poppins',
    defaultFontColor: '#333333',
    responsive: true,
    maintainAspectRatio: false
};

// ----------------------------------------------------------------
// Create a new ChartJS graph at the start
// ----------------------------------------------------------------
var ctx = document.getElementById('myChart').getContext("2d");
window.chart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: chartOptions
}); 

// ----------------------------------------------------------------
// It opens up the graph view
// ----------------------------------------------------------------
function drawGraph() {
        try {
            fetch('../api/v1.0/measurements').then((res) => {
                return res.json();
            }).then((data) => {
                // Get selected probe
                const probe = document.getElementById('selected-probe');
                const probeID = parseInt(probe.textContent);
            
                // Get start and end dates
                const startDate = document.getElementById('start-date').value;
                const endDate = document.getElementById('end-date').value;
                
                // Close map in mobile mode whenever a probe is selected
                if (window.innerWidth <= 775 && probeID >= 0) {
                    // Hide the map
                    const map = document.getElementById("map");
                    map.style.display = "none";
        
                    // Show the graph
                    const graph = document.getElementById("app");
                    graph.style.display = "block";        
                }   

                processData(data, probeID, startDate, endDate);
                
                setTimeout(() => {
                    window.chart.destroy();
                    window.chart = new Chart(ctx, {
                        type: 'line',
                        data: chartData,
                        options: chartOptions
                    }); 
                }, 50);
            });
        }   
        catch(err) {
            throw Error(err);
        }
}

// ----------------------------------------------------------------
// Filters the data array and constructs the proper datasets
// ----------------------------------------------------------------
function processData(data, probeID, startDate, endDate) {
    // Sort by date
    data = data.sort((a, b) => {
        if (a.datetime < b.datetime) {
            return -1;
        }
        if (a.datetime > b.datetime) {
            return 1;
        }
        
        return 0;
    });
    
    // Default dates
    if (endDate == "") {
        endDate = getCurrentDate();
    }
        
    const filteredData = filterDataStream(data, probeID, startDate, endDate);

    // Parse and assign the filtered data to the chart datasets
    buildDatasets(filteredData);
}

// ----------------------------------------------------------------
// It returns the current date in yyyy-mm-dd format
// ----------------------------------------------------------------
function getCurrentDate() {
    let today = new Date();
    
    // Format the date properly
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    
    return today;
}

// ----------------------------------------------------------------
// It filters the given data based on a probe ID and date interval
// [JSON] -> filterDataStream() -> [JSON]
// ----------------------------------------------------------------
function filterDataStream(data, probeID, startDate, endDate) {
    let filteredData = data.filter((probe) => {
        if ((startDate == "" && endDate == "" && probe.position == probeID) || 
            (probe.position == probeID && probe.datetime >= startDate && 
            probe.datetime <= endDate)) {
            return true;
        }

        return false;
    });

    return filteredData;
}

function buildDatasets(data) {
    // Empty previous datasets
    chartData.datasets.forEach((set) => {
        set.data = [];
    });
    
    chartData.labels = [];
    data.forEach((dataJson) => {
        //console.log(dataJson)
        chartData.labels.push(dataJson.datetime);
        chartData.datasets[0].data.push(parseFloat(dataJson.humidity));
        chartData.datasets[1].data.push(parseFloat(dataJson.temperature));
        chartData.datasets[2].data.push(parseFloat(dataJson.luminosity));
        chartData.datasets[3].data.push(parseFloat(dataJson.rain));
        chartData.datasets[4].data.push(parseFloat(dataJson.salinity));
    });
}

function updateGraph(btn) {    
    // Empty previous datasets
    const buttonID = btn.id;
        if (btn.className == "measure-btn-active") {
            switch (buttonID) {
                case "mobile-btn-hum":
                case "desktop-btn-hum":
                    window.chart.data.datasets[0].hidden = false;
                    break;
                case "mobile-btn-tem":
                case "desktop-btn-tem":
                    window.chart.data.datasets[1].hidden = false;
                    break;
                case "mobile-btn-lum":
                case "desktop-btn-lum":
                    window.chart.data.datasets[2].hidden = false;
                    break;
                case "mobile-btn-rai":
                case "desktop-btn-rai":
                    window.chart.data.datasets[3].hidden = false;
                    break;
                case "mobile-btn-sal":
                case "desktop-btn-sal":
                    window.chart.data.datasets[4].hidden = false;
                    break;
                default:
                    break;
            } 
        }
        else {
            switch (buttonID) {
                case "mobile-btn-hum":
                case "desktop-btn-hum":
                    window.chart.data.datasets[0].hidden = true;
                    break;
                case "mobile-btn-tem":
                case "desktop-btn-tem":
                    window.chart.data.datasets[1].hidden = true;
                    break;
                case "mobile-btn-lum":
                case "desktop-btn-lum":
                    window.chart.data.datasets[2].hidden = true;
                    break;
                case "mobile-btn-rai":
                case "desktop-btn-rai":
                    window.chart.data.datasets[3].hidden = true;
                    break;
                case "mobile-btn-sal":
                case "desktop-btn-sal":
                    window.chart.data.datasets[4].hidden = true;
                    break;
                default:
                    break;
            }
        }

        window.chart.destroy();
        window.chart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: chartOptions
        }); 
}

// ----------------------------------------------------------------
// It returns all an array with all enabled buttons
// ----------------------------------------------------------------
/* function getEnabledButtons() {
    const enabledNodeList = document.querySelectorAll('.measure-btn-active');
    let enabled = Array.from(enabledNodeList);

    let buttonsID = [];
    enabled.forEach((elem) => {
        buttonsID.push(elem.id);
    });

    return buttonsID;
} */

// ----------------------------------------------------------------
// It enables all buttons by default 
// ----------------------------------------------------------------
function enableAllButtons() {
    const buttons = document.querySelectorAll('.measure-btn');
    for (i of buttons) {
        toggleButton(i);
    }
}

// ----------------------------------------------------------------
// It toggles a button ON & OFF and updates the graph
// ----------------------------------------------------------------
function toggleButton(btn) {
    if (btn.className == "measure-btn-active") {
        btn.className = "measure-btn";
    }
    else {
        btn.className = "measure-btn-active";
    }
    
    updateButtonColor(btn);
    updateGraph(btn);
}

// ----------------------------------------------------------------
// It updates the button's color
// ----------------------------------------------------------------
function updateButtonColor(btn) {
    if (btn.className == "measure-btn-active") {
        switch (btn.id) {
            case "mobile-btn-hum":
            case "desktop-btn-hum":
                btn.style.borderColor = "#247ebb";
                break;
            case "mobile-btn-tem":
            case "desktop-btn-tem":
                btn.style.borderColor = "#d94c00";
                break;
            case "mobile-btn-lum":
            case "desktop-btn-lum":
                btn.style.borderColor = "#d9bc00";
                break;
            case "mobile-btn-rai":
            case "desktop-btn-rai":
                btn.style.borderColor = "#ba239e";
                break;
            case "mobile-btn-sal":
            case "desktop-btn-sal":
                btn.style.borderColor = "#23ba49";
                break;
            default:
                break;
        }
    }
    else {
        btn.style.borderColor = "#757575"
    }
}

// ----------------------------------------------------------------
// It opens up the full screen map view
// ----------------------------------------------------------------
function drawMap() {
    // Hide the graph
    let graph = document.getElementById("app");
    graph.style.display = 'none';

    // Draw the map
    let map = document.getElementById("map");
    map.style.display = 'block';
    
    // Draw informative banner on top
    document.getElementById('map-floating-panel').style.display = 'flex';

    window.chart.destroy();
}

// -------------------------------------------------
// main()
// -------------------------------------------------
// Draw the graph on the screen
enableAllButtons();
drawGraph();

// Filter displayed data according to input date interval
document.getElementById('start-date').onchange = () => {
    drawGraph();
}
document.getElementById('end-date').onchange = () => {
    drawGraph();
}