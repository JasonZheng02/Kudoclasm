// Team Kudoclasm: Jason Zheng, Hong Wei Chen, Matthew Chan, Tyler Huang
// SoftDev pd2
// P04 -- Let the Data Speak
// 2020-05-11

var svg = d3.select('svg');
svg.on('click', reset);

var width = window.screen.width*(0.9871);
var height = window.screen.height*(0.829);
svg.attr('width', width);
svg.attr('height', height);

const topoJSON_url = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json';

const projection = d3.geoNaturalEarth1()
                    .scale(245)
                    .translate([width/2, height/2]);
const pathGenerator = d3.geoPath().projection(projection);


// Create a group to hold all elements in the SVG to allow for zooming and panning.
const g = svg.append('g');

// Handle zoom and pan logic.
const zoom = d3.zoom()
                .scaleExtent([1, 10])
                .on('zoom', () => {
                    g.attr('transform', d3.event.transform);
                });

svg.call(zoom);

var data2019;
collectData('2019').then(data => data2019 = data);

var colorScale = d3.scaleSequential()
                    .domain([2.853, 7.769])     //TODO: change magic numbers
                    .interpolator(d3.interpolateLab('purple', 'orange'))
                    .unknown('#ccc');


var tooltip = d3.select('#tooltip').style('opacity', 0).style('display', 'none');

d3.json(topoJSON_url).then(data => {
    // console.log(data);

    // Convert topoJSON to geoJSON.
    const countries = topojson.feature(data, data.objects.countries);
    // console.log(countries);

    // Convert data paths into svg paths.
    g.selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
            .attr('id', 'country')
            .attr('d', pathGenerator)
            .attr('fill', d => {
                if (getScore(data2019, d.properties.name) != 'N/A') {
                    return colorScale(getScore(data2019, d.properties.name));
                }
                else {
                    return colorScale(NaN);
                };
            })
            .on("mouseover", tooltipShow)
            .on("mouseout", tooltipHide)
            .on("click", d => {
                focus(d);
                graph(data2019, d);
                tooltipHide(d);
            });
            // .append('title')
            //     .text(d => d.properties.name)
});


function tooltipShow(d) {
    tooltip.transition()
            .duration(500)
            .style('opacity', .9)
            .style('display', 'block');
    tooltip.html(d.properties.name + '<br>' + 'Score: ' + getScore(data2019, d.properties.name) + '<br>' + 'Rank: ' + getRank(data2019, d.properties.name))
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 60) + "px");
};

function tooltipHide(d) {
    tooltip.transition()
            .duration(200)
            .style("opacity", 0)
            .on('end', () => {tooltip.style('display', 'none')});
};


function focus(d) {
    const [[x0, y0], [x1, y1]] = pathGenerator.bounds(d);
    d3.event.stopPropagation();
    svg.transition().duration(1000).call(
        zoom.transform,
        d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        d3.mouse(svg.node())
    );
};

function reset() {
    svg.transition().duration(1000).call(
        zoom.transform,
        d3.zoomIdentity,
        d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
    );
};