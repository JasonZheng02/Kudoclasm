// Team Kudoclasm: Jason Zheng, Hong Wei Chen, Matthew Chan, Tyler Huang
// SoftDev pd2
// P04 -- Let the Data Speak
// 2020-05-11

var svg = d3.select('svg');
svg.on('click', reset);

var width = window.screen.width;
var height = window.screen.height;
svg.attr('width', width);
svg.attr('height', height);

const topoJSON_url = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json';

const projection = d3.geoNaturalEarth1()
                    .scale(225)
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
d3.csv('../static/data/2015.csv', d => {
    return {
        country: d.Country,
        rank: +d['Happiness Rank'],
        score: +d['Happiness Score'],
        factors: {
            economy: +d['Economy (GDP per Capita)'],
            family: +d.Family,
            health: +d['Health (Life Expectancy)'],
            freedom: +d.Freedom,
            trust: +d['Trust (Government Corruption)'],
            generosity: +d.Generosity,
            residual: +d['Dystopia Residual']
        }
    };
}).then(function(data) {
    // console.log(data);
    // console.log(data[0]);
    const data2015 = data;
});
d3.csv('../static/data/2016.csv', d => {
    return {
        country: d.Country,
        rank: +d['Happiness Rank'],
        score: +d['Happiness Score'],
        factors: {
            economy: +d['Economy (GDP per Capita)'],
            family: +d.Family,
            health: +d['Health (Life Expectancy)'],
            freedom: +d.Freedom,
            trust: +d['Trust (Government Corruption)'],
            generosity: +d.Generosity,
            residual: +d['Dystopia Residual']
        }
    };
}).then(function(data) {
    // console.log(data);
    // console.log(data[0]);
    const data2016 = data;
});
d3.csv('../static/data/2017.csv', d => {
    return {
        country: d.Country,
        rank: +d['Happiness.Rank'],
        score: +d['Happiness.Score'],
        factors: {
            economy: +d['Economy..GDP.per.Capita.'],
            family: +d.Family,
            health: +d['Health..Life.Expectancy.'],
            freedom: +d.Freedom,
            trust: +d['Trust..Government.Corruption.'],
            generosity: +d.Generosity,
            residual: +d['Dystopia.Residual']
        }
    };
}).then(function(data) {
    // console.log(data);
    // console.log(data[0]);
    const data2017 = data;
});
d3.csv('../static/data/2018.csv', d => {
    return {
        country: d['Country or region'],
        rank: +d['Overall rank'],
        score: +d.Score,
        factors: {
            economy: +d['GDP per capita'],
            // family: +d.Family,
            social: +d['Social support'],
            health: +d['Healthy life expectancy'],
            freedom: +d['Freedom to make life choices'],
            trust: +d['Perceptions of corruption'],
            generosity: +d.Generosity,
            // residual: +d['Dystopia.Residual']
        }
    };
}).then(function(data) {
    // console.log(data);
    // console.log(data[0]);
    const data2018 = data;
});
d3.csv('../static/data/2019.csv', d => {
    return {
        country: d['Country or region'],
        rank: +d['Overall rank'],
        score: +d.Score,
        factors: {
            economy: +d['GDP per capita'],
            // family: +d.Family,
            social: +d['Social support'],
            health: +d['Healthy life expectancy'],
            freedom: +d['Freedom to make life choices'],
            trust: +d['Perceptions of corruption'],
            generosity: +d.Generosity,
            // residual: +d['Dystopia.Residual']
        }
    };
}).then(function(data) {
    console.log(data);
    console.log(data[0]);
    const data2019 = data;
});


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