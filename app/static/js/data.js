// Team Kudoclasm: Jason Zheng, Hong Wei Chen, Matthew Chan, Tyler Huang
// SoftDev pd2
// P04 -- Let the Data Speak
// 2020-05-11


// Handle happiness data from csv files

names = {
    'United States': 'United States of America',
    'Czech Republic': 'Czechia',
    'Trinidad & Tobago': 'Trinidad and Tobago',
    'Dominican Republic': 'Dominican Rep.',
    'Bosnia and Herzegovina': 'Bosnia and Herz.',
    'North Macedonia': 'Macedonia',
    'Ivory Coast': "Côte d'Ivoire",
    'Congo (Brazzaville)': 'Congo',
    'Palestinian Territories': 'Palestine',
    'Congo (Kinshasa)': 'Dem. Rep. Congo',
    'Swaziland': 'eSwatini',
    'Central African Republic': 'Central African Rep.',
    'South Sudan': 'S. Sudan',
};


function rename(country) {
    if (country in names) {
        return names[country];
    }
    else {
        return country;
    };
};


function collectData(year) {
    var collectedData;
    if (year === '2015') {
        return d3.csv('../static/data/2015.csv', d => {
            return {
                country: rename(d.Country),
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
        });
    }
    else if (year === '2016') {
        return d3.csv('../static/data/2015.csv', d => {
            return {
                country: rename(d.Country),
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
        });
    }
    else if (year === '2017') {
        return d3.csv('../static/data/2017.csv', d => {
            return {
                country: rename(d.Country),
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
        });
    }
    else if (year === '2018') {
        return d3.csv('../static/data/2018.csv', d => {
            return {
                country: rename(d['Country or region']),
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
        });
    }
    else if (year === '2019') {
        return d3.csv('../static/data/2019.csv', d => {
            return {
                country: rename(d['Country or region']),
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
        });
    }
    else {
        return undefined;
    };
};


// Helper functions

function findCountry(data, country) {
    for (var i=0; i<data.length; i++) {
        if (data[i].country == country) {
            return data2019[i];
        };
    };
};

function getScore(data, country) {
    var countryObj = findCountry(data, country);
    if (countryObj != null) {
        return countryObj.score;
    }
    else {
        return 'N/A';
    };
};

function getRank(data, country) {
    var countryObj = findCountry(data, country);
    if (countryObj != null) {
        return countryObj.rank;
    }
    else {
        return 'N/A';
    };
};