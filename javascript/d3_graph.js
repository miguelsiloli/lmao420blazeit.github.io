
// set the dimensions and margins of the graph
const margin = {top: 60, right: 60, bottom: 30, left: 60},
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
      .domain([0, 13])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Show confidence interval
    svg.append("path")
      .datum(data)
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
      .attr("stroke-width", 1)
      .attr("d", d3.line()
        .x(function(d) { return x(d.x) })
        .y(function(d) { return y(d.y) })
        )
      .on('mouseover', function (d, i) {
        d3.select(this).transition()
              .duration('50')
              .attr('opacity', '.85')
            });

    svg.append("path")
      .attr("x", (width / 2))             
      .attr("y", 0 - (margin.top))
      .attr("text-anchor", "middle")  
      .style("font-size", "16px") 
      .style("text-decoration")  
      .text("Density Estimation using bias-corrected and accelerated Bootstrap");

    svg.append("path")
      .attr("d", d3.line()
        .x1(11)
        .x2(11)
        .y1(0)
        .y2(500)
      )

})


