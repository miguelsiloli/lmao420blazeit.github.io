
// set the dimensions and margins of the graph
const margin = {top: 60, right: 60, bottom: 60, left: 60},
    width = document.getElementById('my_dataviz').parentElement.clientWidth - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

//Read the data
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_IC.csv").then(function(data) {

  // Add X axis --> it is a date format
  const x = d3.scaleLinear()
    .domain([1,100])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, 15])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  const filteredData = data.filter(item => parseInt(item.x) > 10 && parseInt(item.x) < 77);

  // Show confidence interval
  svg.append("path")
    .datum(filteredData)
    .attr("fill", "steelblue")
    .attr("stroke", "none")
    .attr("fill-opacity", 0.15)
    .attr("opacity", "20")
    .attr("d", d3.area()
      .x(function(d) { return x(d.x) })
      .y0(function(d) { return y(d.CI_right) })
      .y1(function(d) { return y(d.CI_left) })
      )

  // Add the line
  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
      .x(function(d) { return x(d.x) })
      .y(function(d) { return y(d.y) })
    )

  // Add the line CI right
  svg
    .append("path")
    .datum(filteredData)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 1)
    .style("stroke-dasharray", ("4, 4"))
    .attr("d", d3.line()
      .x(function(d) { return x(d.x) })
      .y(function(d) { return y(d.CI_right) })
    )

  // Add the line CI left
  svg
    .append("path")
    .datum(filteredData)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 1)
    .style("stroke-dasharray", ("4, 4"))
    .attr("d", d3.line()
      .x(function(d) { return x(d.x) })
      .y(function(d) { return y(d.CI_left) })
    )

  // confidence intervals lines
  svg.append("line")  
    .attr("stroke", "gray")
    .style("stroke-dasharray", ("3, 3"))
    .attr("stroke-width", 2)
    .attr("x1", 100)
    .attr("y1", 0)
    .attr("x2", 100)
    .attr("y2", height);

  svg.append("line")  
    .attr("stroke", "gray")
    .style("stroke-dasharray", ("3, 3"))
    .attr("stroke-width", 2)
    .attr("x1", 750)
    .attr("y1", 0)
    .attr("x2", 750)
    .attr("y2", height);

  // axis labels x-axis
  svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + 40)
    .text("time (seconds)");

  // axis labels x-axis
  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", - 40)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("probability density");

  const type = d3.annotationCalloutElbow

  const annotations = [{
    note: {
      label: "OneClassSVM",
      title: "Inlier threshold"
    },
    x: 160,
    y: 200,
    dy: 137,
    dx: 650
  }]

  svg
  .transition()
  .duration(3000)
  .attr("width", "800")
  
  const makeAnnotations = d3.annotation()
    .editMode(true)
    //also can set and override in the note.padding property
    //of the annotation object
    .notePadding(15)
    .type(type)
    //accessors & accessorsInverse not needed
    //if using x, y in annotations JSON
    .accessors({
      x: d => x(d.x),
      y: d => y(d.y)
    })
    .accessorsInverse({
        x: d => x.invert(d.x),
        y: d => y.invert(d.y)
    })
    .annotations(annotations)
  
  d3.select("#my_dataviz").select("svg")
    .append("g")
    .attr("class", "annotation-group")
    .call(makeAnnotations)

  svg.append("text")
    .attr("x", width/2)
    .attr("y", 0)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .style("font-family", 'Nunito')
    .text("Probability Density Function CI Estimation using 1C-SVM + KDE");

});

var tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("z-index", "10")
  .style("visibility", "hidden")
  .style("background", "#000")
  .text("a simple tooltip");

d3.select("body")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return x(d) + "px"; })
    .text(function(d) { return d; })
    .on("mouseover", function(d){tooltip.text(d); return tooltip.style("visibility", "visible");})
      .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
      .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
