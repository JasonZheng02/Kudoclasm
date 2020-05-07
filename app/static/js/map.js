// Team Kudoclasm: Jason Zheng, Hong Wei Chen, Matthew Chan, Tyler Huang
// SoftDev pd2
// P04 -- Let the Data Speak
// 2020-05-11

var svg = d3.select('svg');

const topoJSON_url = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json';

const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection);

const g = svg.append('g');

svg.call(d3.zoom().on('zoom', () => {
    g.attr('transform', d3.event.transform);
}));

g.append('path')
        .attr('id', 'sphere')
        .attr('d', pathGenerator({type: 'Sphere'}));

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
            .append('title')
                .text(d => d.properties.name)
    });