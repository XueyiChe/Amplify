var margin = {
        top: 20,
        right: 30,
        bottom: 40,
        left: 30
    },
    width = 750 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.ordinal()
    .rangeRoundBands([0, height], 0.1);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .scale(y)
    .orient("left")
    .tickSize(0)
    .tickPadding(6);

var svg = d3.select("#gender").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function createChartNumber(data) {
    x.domain(d3.extent(data, function (d) {
        return d.number * 1.00001;
    })).nice();
    y.domain(data.map(function (d) {
        return d.name;
    }));
    var bars = svg.selectAll(".bar")
        .data(data)

    bars.enter().append("rect")
        .classed("genderData", true)
        .attr("class", function (d) {
            return "bar bar--" + (d.number < 0 ? "negative" : "positive");
        })
        .attr("x", function (d) {
            return x(Math.min(0, d.number));
        })
        .attr("y", function (d) {
            return y(d.name);
        })
        .attr("width", function (d) {
            return Math.abs(x(d.number) - x(0));
        })
        .attr("height", y.rangeBand())
        .on("mouseover", mouseoverNumber);


    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + x(0) + ",0)")
        .call(yAxis);
}

function createChartPercentage(data) {
    x.domain(d3.extent(data, function (d) {
        return d.value * 1.00001;
    })).nice();
    y.domain(data.map(function (d) {
        return d.name;
    }));
    var bars = svg.selectAll(".bar")
        .data(data)

    bars.enter().append("rect")
        .classed("genderData", true)
        .attr("class", function (d) {
            return "bar bar--" + (d.value < 0 ? "negative" : "positive");
        })
        .attr("x", function (d) {
            return x(Math.min(0, d.value));
        })
        .attr("y", function (d) {
            return y(d.name);
        })
        .attr("width", function (d) {
            return Math.abs(x(d.value) - x(0));
        })
        .attr("height", y.rangeBand())
        .on("mouseover", mouseoverPercentage);


    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + x(0) + ",0)")
        .call(yAxis);
}

var dataSet = null;
d3.tsv("data.tsv", type, function (error, data) {
    createChartNumber(data);
    dataSet = data;
    console.log(dataSet);

});


function type(d) {
    d.value = +d.value;
    return d;
}

function mouseoverNumber(d) {

    var number = d.number;
    if (number < 0) {
        number = number * -1;
    }


    d3.select("#number")
        .text(number);

    d3.select("#showNumber")
        .style("visibility", "");
}

function mouseoverPercentage(d) {

    var number = d.value;
    if (number < 0) {
        number = number * -1;
    }
    var str = Number(number * 100).toFixed(2);
    str += "%";


    d3.select("#number")
        .text(str);

    d3.select("#showNumber")
        .style("visibility", "");
}

var inputElemsGender = d3.selectAll("input[name='selectGender']");
inputElemsGender.on("change", inputChangeGender);

function inputChangeGender() {
    var inputValue = this.value;

    if (inputValue === "percentage") {
        svg.selectAll("g").remove();
        svg.selectAll(".bar").remove();

        d3.tsv("data.tsv", type, function (error, data) {
            createChartPercentage(data);
        });


    } else if (inputValue === "number") {

        svg.selectAll("g").remove();
        svg.selectAll(".bar").remove();


        d3.tsv("data.tsv", type, function (error, data) {
            createChartNumber(data);

        });


    }

}
