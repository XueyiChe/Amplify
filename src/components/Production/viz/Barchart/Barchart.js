import React from 'react'
import './Barchart.css'
import * as d3 from "d3-3";
import companyrace from './companyrace.tsv'
export default class Sunburst extends React.Component {

    componentDidMount() {
        var margin2 = {
            top: 20,
            right: 231,
            bottom: 140,
            left: 40
        },
        width = 1000 - margin2.left - margin2.right,
        height = 800 - margin2.top - margin2.bottom;
   
    var xscale = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);
   
    var yscale = d3.scale.linear()
        .rangeRound([height, 0]);
   
    var colors2 = d3.scale.ordinal()
        .range(["#F6A580", "#92C6DB", "#C7001E", "#806FAD", "#CCCCCC", "#A55500"]);
   
    var xaxis2 = d3.svg.axis()
        .scale(xscale)
        .orient("bottom");
   
    var yaxis2 = d3.svg.axis()
        .scale(yscale)
        .orient("left")
        .tickFormat(d3.format(".0%"));
   
    var svgbar = d3.select("#stackedchart").append("svg")
        .attr("width", width + margin2.left + margin2.right)
        .attr("height", height + margin2.top + margin2.bottom)
        .append("g")
        .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
   
    // load and handle the data
    d3.tsv(companyrace, function (error, data) {
   
        // rotate the data
        var categories = d3.keys(data[0]).filter(function (key) {
            return key !== "Companys";
        });
        var parsedata = categories.map(function (name) {
            return {
                "Companys": name
            };
        });
        data.forEach(function (d) {
            parsedata.forEach(function (pd) {
                pd[d["Companys"]] = d[pd["Companys"]];
            });
        });
   
        // map column headers to colors2 (except for 'Absolutes' and 'Base: All Respondents')
        colors2.domain(d3.keys(parsedata[0]).filter(function (key) {
            return key !== "Companys" && key !== "Total";
        }));
   
        // add a 'responses' parameter to each row that has the height percentage values for each rect
        parsedata.forEach(function (pd) {
            var y0 = 0;
   
            pd.responses = colors2.domain().map(function (response) {
                var responseobj = {
                    response: response,
                    y0: y0,
                    yp0: y0
                };
                y0 += +pd[response];
                responseobj.y1 = y0;
                responseobj.yp1 = y0;
                console.log(responseobj.yp1);
                return responseobj;
            });
   
            pd.responses.forEach(function (d) {
                d.yp0 /= y0;
                d.yp1 /= y0;
            });
            // save the total
            pd.totalresponses = pd.responses[pd.responses.length - 1].y1;
        });
   
   
        xscale.domain(parsedata.map(function (d) {
            return d.Companys;
        }));
   
        // add the x axis and rotate its labels
        svgbar.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xaxis2)
            .selectAll("text")
            .attr("y", 5)
            .attr("x", 7)
            .attr("dy", ".35em")
            .attr("transform", "rotate(65)")
            .style("text-anchor", "start");
   
        // add the y axis
        svgbar.append("g")
        svgbar.append("g")
            .attr("class", "y axis")
            .call(yaxis2);
   
        // create svg groups ("g") and place them
        var category = svgbar.selectAll(".category")
            .data(parsedata)
            .enter().append("g")
            .attr("class", "category")
            .attr("transform", function (d) {
                return "translate(" + xscale(d.Companys) + ",0)";
            });
   
        // draw the rects within the groups
        category.selectAll("rect")
            .data(function (d) {
                return d.responses;
            })
            .enter().append("rect")
            .attr("width", xscale.rangeBand())
            .attr("y", function (d) {
                return yscale(d.yp1);
            })
            .attr("height", function (d) {
                return yscale(d.yp0) - yscale(d.yp1);
            })
            .style("fill", function (d) {
                return colors2(d.response);
            });
   
        // position the legend elements
        var legend = svgbar.selectAll(".legend")
            .data(colors2.domain())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) {
                return "translate(20," + ((height - 18) - (i * 20)) + ")";
            });
   
        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", colors2);
   
        legend.append("text")
            .attr("x", width + 10)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .text(function (d) {
                return d;
            });
   
        // animation
        d3.selectAll("input[name='mode']").on("change", handleFormClick);
   
        function handleFormClick() {
            if (this.value === "bypercent") {
                transitionPercent();
            } else {
                transitionCount();
            }
        }
   
        // transition to 'percent' presentation
        function transitionPercent() {
            // reset the yscale domain to default
            yscale.domain([0, 1]);
   
            // create the transition
            var trans = svgbar.transition().duration(250);
   
            // transition the bars
            var categories = trans.selectAll(".category");
            categories.selectAll("rect")
                .attr("y", function (d) {
                    return yscale(d.yp1);
                })
                .attr("height", function (d) {
                    return yscale(d.yp0) - yscale(d.yp1);
                });
   
            // change the y-axis
            // set the y axis tick format
            yaxis2.tickFormat(d3.format(".0%"));
            svgbar.selectAll(".y.axis").call(yaxis2);
        }
   
        // transition to 'count' presentation
        function transitionCount() {
            // set the yscale domain
            yscale.domain([0, d3.max(parsedata, function (d) {
                return d.totalresponses;
            })]);
   
            // create the transition
            var transone = svgbar.transition()
                .duration(250);
   
            // transition the bars (step one)
            var categoriesone = transone.selectAll(".category");
            categoriesone.selectAll("rect")
                .attr("y", function (d) {
                    return this.getBBox().y + this.getBBox().height - (yscale(d.y0) - yscale(d.y1))
                })
                .attr("height", function (d) {
                    return yscale(d.y0) - yscale(d.y1);
                });
   
            // transition the bars (step two)
            var transtwo = transone.transition()
                .delay(350)
                .duration(350)
                .ease("bounce");
            var categoriestwo = transtwo.selectAll(".category");
            categoriestwo.selectAll("rect")
                .attr("y", function (d) {
                    return yscale(d.y1);
                });
   
            // change the y-axis
            // set the y axis tick format
            yaxis2.tickFormat(d3.format(".2s"));
            svgbar.selectAll(".y.axis").call(yaxis2);
        }
    });
   
    //d3.select(window.self.frameElement).style("height", (height + margin2.top + margin2.bottom) + "px");
   
    



    }
    render() {


        return (
            <div id='racebar'>
                <div className="chartExplanation">
                    <h2>Race chart</h2>
                </div>
                <form>
                    <label><input type="radio" name="mode" value="bypercent" checked /> Percent</label>
                        <label><input type="radio" name="mode" value="bycount" /> Number</label>
        </form>

                        <div id="stackedchart"></div>
        
    </div>
                )
            }
}