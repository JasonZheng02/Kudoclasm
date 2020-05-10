// Team Kudoclasm: Jason Zheng, Hong Wei Chen, Matthew Chan, Tyler Huang
// SoftDev pd2
// P04 -- Let the Data Speak
// 2020-05-11

var svg = d3.select('svg');
svg.on('click', reset);

var width = svg.attr('width');
var height = svg.attr('height');
console.log(width);
console.log(height);

const topoJSON_url = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json';

const projection = d3.geoNaturalEarth1()
                    .translate([width/2, height/2]);
const pathGenerator = d3.geoPath().projection(projection);


// Create a group to hold all elements in the SVG to allow for zooming and panning.
const g = svg.append('g');

// Handle zoom and pan logic.
const zoom = d3.zoom()
                // .scaleExtent([1, 8])
                .on('zoom', () => {
                    g.attr('transform', d3.event.transform);
                });

svg.call(zoom);


// Create the outer border of the Earth.
g.append('path')
        .attr('id', 'sphere')
        .attr('d', pathGenerator({type: 'Sphere'}))
        .on('click', reset);


// Handle happiness data from csv files
// d3.csv()


var tooltip = d3.select('#tooltip').style('opacity', 0);

d3.json(topoJSON_url)
    .then(data => {
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
            // .append('title')
            //     .text(d => d.properties.name)
            .on("mouseover", d => {
                tooltip.transition()
                        .duration(1000)
                        .style('opacity', .9);
                tooltip.html(d.properties.name)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY) + "px");
            })
            .on("mouseout", () => {
                tooltip.transition()
                        .duration(1000)
                        .style("opacity", 0);
            })
            .on("click", focus);
        });
        

function focus(d) {
    const [[x0, y0], [x1, y1]] = pathGenerator.bounds(d);
    d3.event.stopPropagation();
    svg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        d3.mouse(svg.node())
    );
}


function reset() {
    svg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity,
        d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
    );
}