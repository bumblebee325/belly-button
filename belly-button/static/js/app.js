
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
  
      // Get the metadata field
    let metadata = data.metadata;
    console.log("metadata:", metadata);
  
      // Filter the metadata for the object with the desired sample number
    let resultArray = metadata.filter(sampleDictionary => sampleDictionary.id == sample);
    let result = resultArray[0];
  
      // Use d3 to select the panel with id of `#sample-metadata`
    let PANEL = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
    PANEL.html("");
  
      // Use the filtered result to populate the metadata panel
      // Hint: Inside a loop, you will need to use d3 to append new
      // tags for each key-value in the filtered metadata.
    for(key in result){
      PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`)
    }

 })
}
  // function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
  
      // Get the samples field
   let samples = data.samples;
   console.log("samples:", samples);
      // Filter the samples for the object with the desired sample number
   let resultArray = samples.filter(sampleDictionary => sampleDictionary.id === sample);
   let result = resultArray[0];
  
      // Get the otu_ids, otu_labels, and sample_values
   let otuIds = result.otu_ids;
   let otuLabels = result.otu_labels;
   let sampleValues = result.sample_values;
// Build a Bubble Chart
   let bubbleLayout = {
     title: "Bacteria Cultures Per Sample",
     margin: {t: 0},
     hovermode: "closest",
     xaxis: {title: "OTU ID"},
     margin: {t: 30}    
   };

   let bubbleData = [{
     x: otuIds,
     y: sampleValues,
     text: otuLabels,
     mode: "markers",
     marker: {
       color: otuIds,
       size: sampleValues,
       colorscale: "Earth"}
 }]   
// Render the Bubble Chart
   Plotly.newPlot("bubble", bubbleData, bubbleLayout);

// For the Bar Chart, map the otu_ids to a list of strings for your yticks
   let yticks = otuIds.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();

// Build a Bar Chart
// Make sure to slice and reverse the input data appropriately
   let barData = [{
     y: yticks,
     x: sampleValues.slice(0,10).reverse(),
     text: otuLabels.slice(0,10).reverse(),
     type: "bar",
     orientation: "h",
  }]

   let barLayout = {
     title: "Top 10 Bacteria Cultures Found",
     margin: { t: 30, l: 150 },
     xaxis: {title: "Number of Bacteria"}
}

// Render the Bar Chart
   Plotly.newPlot("bar", barData, barLayout);
 });
}  
// Function to run on page load
 function init() {
   d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
 

        // Get the names field
     let sampleNames = data.names;
     console.log("sample names:", sampleNames);
  
      // Use d3 to select the dropdown with id of `#selDataset`
     let selector = d3.select("#selDataset");
  
      // Use the list of sample names to populate the select options
      // Hint: Inside a loop, you will need to use d3 to append a new
      // option for each sample name.
     for (let i = 0; i < sampleNames.length; i++){
     selector.append("option").text(sampleNames[i]).property("value", sampleNames[i]);
   }
 
      // Get the first sample from the list
     let firstSample = sampleNames[0];

      // Build charts and metadata panel with the first sample 
     buildCharts(firstSample);
     buildMetadata(firstSample);

 })
 
}  
  
         // Function for event listener
   function optionChanged(newSample) {
    // Build charts and metadata panel each time a new sample is selected
     buildCharts(newSample);
     buildMetadata(newSample);
   }  
   
       // Initialize the dashboard
  init();