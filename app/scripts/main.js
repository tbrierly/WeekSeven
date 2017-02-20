//jQuery: runs when the document is ready
$(document).ready(function() {
//gives us our sidenav with click to close, check Materialize documentation for more options

  //settings for fullpage.js
  $('#fullpage').fullpage({

  menu: '#nav',
  anchors: ['a', 'b', 'c', 'd', 'e'],
  normalScrollElements: '#nav',
  paddingTop: 0,
  paddingBottom: 0,
  responsiveWidth: 640,
  css3: true,
  onLeave: function(index, nextIndex, direction){
      if (nextIndex == 3){
        lineChart();
      }
    }

  });

  $(document).on('click', '#sidenav', '.drag-target', function(e) {
    //in responsive mode?
          if($('.fp-responsive').length){

    $('body').css('overflow', 'visible');

    }

    });

});

function lineChart(){
  d3.select("#graph").selectAll("*").remove();
  // set the dimensions and margins of the graph
var margin = {top: 100, right: 50, bottom: 30, left: 50},
    width = $(window).width() - margin.left - margin.right,
    height = $(window).height() - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("data.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.close = +d.close;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.close; })]);

  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);
      .transition()
      .duration(10000)
      .attr('opacity', 100);

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

});

}
