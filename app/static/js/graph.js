// Team Kudoclasm: Jason Zheng, Hong Wei Chen, Matthew Chan, Tyler Huang
// SoftDev pd2
// P04 -- Let the Data Speak
// 2020-05-11


function graph(dataset, d) {
    var graph = d3.select('#graph');
    
    graph.transition()
            .duration(1000)
            .style('opacity', 1)
            .style('display', 'block');
    // graph.html(d.properties.name + '<br>' + getScore(dataset, d.properties.name) + '<br>' + getRank(dataset, d.properties.name))
            // .style("left", (d3.event.pageX) + "px")
            // .style("top", (d3.event.pageY - 28) + "px");
    
    
    var countryData = findCountry(dataset, d.properties.name);
    var keys = Object.keys(countryData.factors);
    var data = new Array();
    for (var i=0; i<keys.length; i++) {
        var factorObj = {
            factor: keys[i],
            percent: (countryData.factors[keys[i]])/(countryData.score)
        };
        data.push(factorObj);
    };
    // console.log(data);

    var width = 500;
    var height = 250;

    var svg = graph.append('svg')
                    .attr('height', height)
                    .attr('width', width);
                    
    var margin = {top:20, right:0, bottom:30, left:70};
    var innerWidth = width - margin.left - margin.right;
    var innerHeight = height - margin.top - margin.bottom;

    var xValue = d => d.percent;
    var yValue = d => d.factor;

    var xScale = d3.scaleLinear()
                    .domain([0, d3.max(data, xValue)])
                    .range([0, innerWidth]);
    var yScale = d3.scaleBand()
                    .domain(data.map(yValue))
                    .range([0, innerHeight])
                    .padding(0.1);
    
    var g = svg.append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

    var xAxisTickFormat = number => d3.format('.0%')(number).replace('G', 'B');
    var xAxis = d3.axisBottom(xScale)
                    .tickFormat(xAxisTickFormat)
                    .tickSize(-innerHeight);
          
    g.append('g')
        .call(d3.axisLeft(yScale))
        .selectAll('.domain, .tick line')
        .remove();
          
    var xAxisG = g.append('g').call(xAxis)
                    .attr('transform', `translate(0,${innerHeight})`);
          
    xAxisG.select('.domain').remove();
    
    var xAxisLabelText = 'X axis label text?'
    xAxisG.append('text')
            .attr('class', 'axis-label')
            .attr('y', 65)
            .attr('x', innerWidth / 2)
            .attr('fill', 'black')
            .text(xAxisLabelText);
          
    g.selectAll('rect').data(data)
        .enter().append('rect')
            .attr('y', d => yScale(yValue(d)))
            .attr('width', d => xScale(xValue(d)))
            .attr('height', yScale.bandwidth());

    var titleText = 'Title?'
    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .text(titleText);
};

function graphClose(d) {

};