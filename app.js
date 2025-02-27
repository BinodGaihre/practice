function buildMetadata(sample) {
  d3.csv("./static/js/cleaned_data_city.csv").then((data) => {
    // Using d3 to select the panel with id of `#sample-metadata`
    let select_panel = d3.select("#sample-metadata");

    // Clear any existing metadata
    select_panel.html("");

    let filteredData = data.filter(function(row) {
      return row["city"] == sample;
    });

    // Iterate through the filtered row and access each column
    filteredData.forEach(function(row) {
      Object.keys(row).forEach(function(column) {
        let value = row[column];  // Access the value for each column
        select_panel.append("p").text(`${column}: ${value}`).style("font-size", "16px");
      });
    });
  });
};

// Building the charts
function buildCharts(sample) {
  d3.csv("./static/js/cleaned_data.csv").then((data) => {
    let x = [];
    let y = [];
    let size = [];
    let color = [];

    let filteredData = data.filter(function(row) {
      return row["city"] == sample;
    });

    // Filter out rows with missing data or invalid numeric values
    filteredData = filteredData.filter(function(row) {
      return !isNaN(row["Poverty_Rate"]) && !isNaN(row["Median_Hhold_Income"]);
    });

    filteredData.forEach(function(row) {
      // Collect data for x (Median_Hhold_Income) and y (Poverty_Rate)
      y.push(row["Poverty_Rate"]);
      x.push(row["Median_Hhold_Income"]);
    });

    // Building a Bubble Chart
    var trace1 = {
      x: x,
      y: y,
      mode: 'markers',
      marker: {
        size: x/100,
        color: y,
        colorscale : 'Rainbow'
      }
    };

    var data1 = [trace1];

    // Applying a title to the layout
    var layout1 = {
      title: "Poverty Rate vs Median Household Income",
      xaxis: { title: "Median Household Income" },
      yaxis: { title: "Poverty Rate" },
      margin: { l: 100, r: 50, t: 50, b: 50 }
    };

    Plotly.newPlot('bubble', data1, layout1);
  });
}

// Initializing the page
function init() {
  d3.csv("./static/js/cleaned_data_city.csv").then((data) => {
    // Get unique city names from the data
    let names = [...new Set(data.map(function(row) {
      return row["city"];
    }))];

    // Using d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");

    // Using the list of city names to populate the select options
    names.forEach(function(name) {
      dropdownMenu.append("option").text(name).attr("value", name);
    });

    // Get the first city from the list
    let first_sample = names[0];

    // Build charts and metadata panel with the first city
    buildCharts(first_sample);
    buildMetadata(first_sample);
  });
}

// Event listener for dropdown selection
function optionChanged(newSample) {
  // Building charts and metadata panel each time a new city is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();


