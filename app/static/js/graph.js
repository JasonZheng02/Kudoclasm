// Team Kudoclasm: Jason Zheng, Hong Wei Chen, Matthew Chan, Tyler Huang
// SoftDev pd2
// P04 -- Let the Data Speak
// 2020-05-11


function graph(dataset, d) {
    var graph = d3.select('#graph');
    var mask = d3.select('#mask');

    const windowWidth = window.screen.width;
    const windowHeight = window.screen.height;

    mask.attr('width', windowWidth);
    mask.attr('height', windowHeight);
    mask.on('click', graphClose);

    var width = 500;
    var height = 250;
    
    graph.transition()
            .duration(1000)
            .style('opacity', 1)
            .style('display', 'block');
    mask.transition()
        .duration(1000)
        .style('opacity', 0.8)
        .style('display', 'block');
    graph.html('<h1>' + d.properties.name + '</h1><h4>' + 'Happiness Score: ' + getScore(dataset, d.properties.name) + '</h4><h4>' + 'Ranking: ' + getRank(dataset, d.properties.name) + '</h4><hr><br>')
            .style("left", ((windowWidth/2)-(width/2)) + "px")
            .style("top", ((windowHeight*(3/4)/2)-(height/2)) + "px");
    
    
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

    var svg = graph.append('svg')
                    .attr('height', height)
                    .attr('width', width);
                    
    var margin = {top:20, right:15, bottom:30, left:70};
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
    
    var xAxisLabelText = 'Percentage Impact'
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

    var titleText = 'Happiness Score Impacting Factors'
    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .text(titleText);
};

function graphClose(d) {
    var graph = d3.select('#graph');
    var mask = d3.select('#mask');

    graph.transition()
            .duration(1000)
            .style("opacity", 0)
            .on('end', () => {graph.style('display', 'none')});
    mask.transition()
        .duration(1000)
        .style("opacity", 0)
        .on('end', () => {mask.style('display', 'none')});
};