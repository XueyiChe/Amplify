function dashboard(id, fData) {
    var barColor = 'steelblue';

    function segColor(c) {
        return {
            "Administrative support": "#854E9B",
            "Craft workers": "#e08214",
            "Executive/Senior officials & Mgrs": "#CE93D8",
            "First/Mid officials & Mgrs": "#309FDB",
            "laborers and helpers": "#EC407A",
            "operatives": "#FFF176",
            "Professionals": "#E95A53",
            "Sales workers": "#3CAF85",
            "Service workers": "#7986CB",
            "Technicians": "#FBCE4A"

        }[c];
    }

    // compute total for each Race.
    fData.forEach(function (d) {
        d.total = d.job["Administrative support"] + d.job["Craft workers"] + d.job["Executive/Senior officials & Mgrs"] + d.job["First/Mid officials & Mgrs"] + d.job["laborers and helpers"] + d.job.operatives + d.job.Professionals + d.job["Sales workers"] + d.job["Service workers"] + d.job.Technicians;
    });

    // function to handle histogram.
    function histoGram(fD) {
        var hG = {},
            hGDim = {
                t: 60,
                r: 0,
                b: 30,
                l: 0
            };
        hGDim.w = 500 - hGDim.l - hGDim.r,
            hGDim.h = 300 - hGDim.t - hGDim.b;


        //create svg for histogram.
        var hGsvg = d3.select(id).append("svg")
            .attr("width", hGDim.w + hGDim.l + hGDim.r)
            .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
            .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");

        // create function for x-axis mapping.
        var x = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.1)
            .domain(fD.map(function (d) {
                return d[0];
            }));

        // Add x-axis to the histogram svg.
        hGsvg.append("g").attr("class", "x axis")
            .attr("transform", "translate(0," + hGDim.h + ")")
            .call(d3.svg.axis().scale(x).orient("bottom"));

        // Create function for y-axis map.
        var y = d3.scale.linear().range([hGDim.h, 0])
            .domain([0, d3.max(fD, function (d) {
                return d[1];
            })]);

        // Create bars for histogram to contain rectangles and job labels.
        var bars = hGsvg.selectAll(".bar").data(fD).enter()
            .append("g").attr("class", "bar");

        //create the rectangles.
        bars.append("rect")
            .attr("x", function (d) {
                return x(d[0]);
            })
            .attr("y", function (d) {
                return y(d[1]);
            })
            .attr("width", x.rangeBand())
            .attr("height", function (d) {
                return hGDim.h - y(d[1]);
            })
            .attr('fill', barColor)
            .on("mouseover", mouseover) // mouseover is defined below.
            .on("mouseout", mouseout); // mouseout is defined below.

        //Create the jobuency labels above the rectangles.
        bars.append("text").text(function (d) {
                return d3.format(",")(d[1])
            })
            .attr("x", function (d) {
                return x(d[0]) + x.rangeBand() / 2;
            })
            .attr("y", function (d) {
                return y(d[1]) - 5;
            })
            .attr("text-anchor", "middle");

        function mouseover(d) { // utility function to be called on mouseover.
            // filter for selected Race.
            var st = fData.filter(function (s) {
                    return s.Race == d[0];
                })[0],
                nD = d3.keys(st.job).map(function (s) {
                    return {
                        type: s,
                        job: st.job[s]
                    };
                });
            console.log(st);
            console.log(nD);


            // call update functions of pie-chart and legend.    
            pC.update(nD);
            leg.update(nD);
        }

        function mouseout(d) { // utility function to be called on mouseout.
            // reset the pie-chart and legend.    
            pC.update(tF);
            leg.update(tF);
        }

        // create function to update the bars. This will be used by pie-chart.
        hG.update = function (nD, color) {
            // update the domain of the y-axis map to reflect change in jobuencies.
            y.domain([0, d3.max(nD, function (d) {
                return d[1];
            })]);

            // Attach the new data to the bars.
            var bars = hGsvg.selectAll(".bar").data(nD);

            // transition the height and color of rectangles.
            bars.select("rect").transition().duration(500)
                .attr("y", function (d) {
                    return y(d[1]);
                })
                .attr("height", function (d) {
                    return hGDim.h - y(d[1]);
                })
                .attr("fill", color);

            // transition the jobuency labels location and change value.
            bars.select("text").transition().duration(500)
                .text(function (d) {
                    return d3.format(",")(d[1])
                })
                .attr("y", function (d) {
                    return y(d[1]) - 5;
                });
        }
        return hG;
    }

    // function to handle pieChart.
    function pieChart(pD) {
        var pC = {},
            pieDim = {
                w: 250,
                h: 250
            };
        pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;

        // create svg for pie chart.
        var piesvg = d3.select("#dashboard").append("svg")
            .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
            .attr("transform", "translate(" + pieDim.w / 2 + "," + pieDim.h / 2 + ")");

        // create function to draw the arcs of the pie slices.
        var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);

        // create a function to compute the pie slice angles.
        var pie = d3.layout.pie().sort(null).value(function (d) {
            return d.job;
        });

        // Draw the pie slices.
        piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
            .each(function (d) {
                this._current = d;
            })
            .style("fill", function (d) {
                return segColor(d.data.type);
            })
            .on("mouseover", mouseover).on("mouseout", mouseout);

        // create function to update pie-chart. This will be used by histogram.
        pC.update = function (nD) {
            piesvg.selectAll("path").data(pie(nD)).transition().duration(500)
                .attrTween("d", arcTween);
        }
        // Utility function to be called on mouseover a pie slice.
        function mouseover(d) {
            // call the update function of histogram with new data.
            hG.update(fData.map(function (v) {
                return [v.Race, v.job[d.data.type]];
            }), segColor(d.data.type));
        }
        //Utility function to be called on mouseout a pie slice.
        function mouseout(d) {
            // call the update function of histogram with all data.
            hG.update(fData.map(function (v) {
                return [v.Race, v.total];
            }), barColor);
        }
        // Animating the pie-slice requiring a custom function which specifies
        // how the intermediate paths should be drawn.
        function arcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function (t) {
                return arc(i(t));
            };
        }
        return pC;
    }

    // function to handle legend.
    function legend(lD) {
        var leg = {};

        // create table for legend.
        var legend = d3.select(id).append("table").attr('class', 'legend');

        // create one row per segment.
        var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");

        // create the first column for each segment.
        tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
            .attr("width", '16').attr("height", '16')
            .attr("fill", function (d) {
                return segColor(d.type);
            });

        // create the second column for each segment.
        tr.append("td").text(function (d) {
            return d.type;
        });

        // create the third column for each segment.
        tr.append("td").attr("class", 'legendjob')
            .text(function (d) {
                return d3.format(",")(d.job);
            });

        // create the fourth column for each segment.
        tr.append("td").attr("class", 'legendPerc')
            .text(function (d) {
                return getLegend(d, lD);
            });

        // Utility function to be used to update the legend.
        leg.update = function (nD) {
            // update the data attached to the row elements.
            var l = legend.select("tbody").selectAll("tr").data(nD);

            // update the jobuencies.
            l.select(".legendjob").text(function (d) {
                return d3.format(",")(d.job);
            });

            // update the percentage column.
            l.select(".legendPerc").text(function (d) {
                return getLegend(d, nD);
            });
        }

        function getLegend(d, aD) { // Utility function to compute percentage.
            return d3.format("%")(d.job / d3.sum(aD.map(function (v) {
                return v.job;
            })));
        }

        return leg;
    }

    // calculate total jobuency by segment for all Race.
    var tF = ['Administrative support', 'Craft workers', 'Executive/Senior officials & Mgrs', 'First/Mid officials & Mgrs', 'laborers and helpers', 'operatives', 'Professionals', 'Sales workers', 'Service workers', 'Technicians'].map(function (d) {
        return {
            type: d,
            job: d3.sum(fData.map(function (t) {
                return t.job[d];
            }))
        };
    });

    // calculate total jobuency by Race for all segment.
    var sF = fData.map(function (d) {
        return [d.Race, d.total];
    });

    var hG = histoGram(sF), // create the histogram.
        pC = pieChart(tF), // create the pie-chart.
        leg = legend(tF); // create the legend.
}

var jobData = [{
    Race: 'Indian AlaskanNative',
    job: {
        "Administrative support": 105,
        "Craft workers": 11,
        "Executive/Senior officials & Mgrs": 9,
        "First/Mid officials & Mgrs": 136,
        "laborers and helpers": 0,
        "operatives": 1,
        "Professionals": 525,
        "Sales workers": 136,
        "Service workers": 3,
        "Technicians": 239
    }
        }, {
    Race: 'Asian',
    job: {
        "Administrative support": 2146,
        "Craft workers": 40,
        "Executive/Senior officials & Mgrs": 710,
        "First/Mid officials & Mgrs": 12542,
        "laborers and helpers": 39,
        "operatives": 21,
        "Professionals": 74350,
        "Sales workers": 3308,
        "Service workers": 157,
        "Technicians": 2858
    }
        }, {
    Race: 'African American',
    job: {
        "Administrative support": 2041,
        "Craft workers": 18,
        "Executive/Senior officials & Mgrs": 55,
        "First/Mid officials & Mgrs": 1398,
        "laborers and helpers": 36,
        "operatives": 74,
        "Professionals": 6495,
        "Sales workers": 3803,
        "Service workers": 69,
        "Technicians": 3843
    }
        }, {
    Race: 'Latino',
    job: {
        "Administrative support": 2685,
        "Craft workers": 74,
        "Executive/Senior officials & Mgrs": 101,
        "First/Mid officials & Mgrs": 2690,
        "laborers and helpers": 52,
        "operatives": 28,
        "Professionals": 10513,
        "Sales workers": 5079,
        "Service workers": 334,
        "Technicians": 4211
    }
        }, {
    Race: 'Hawaiian or Pacific',
    job: {
        "Administrative support": 103,
        "Craft workers": 1,
        "Executive/Senior officials & Mgrs": 5,
        "First/Mid officials & Mgrs": 116,
        "laborers and helpers": 1,
        "operatives": 1,
        "Professionals": 539,
        "Sales workers": 195,
        "Service workers": 17,
        "Technicians": 168
    }
        }, {
    Race: 'Mixed',
    job: {
        "Administrative support": 526,
        "Craft workers": 7,
        "Executive/Senior officials & Mgrs": 36,
        "First/Mid officials & Mgrs": 637,
        "laborers and helpers": 0,
        "operatives": 4,
        "Professionals": 2798,
        "Sales workers": 981,
        "Service workers": 26,
        "Technicians": 856
    }
        }, {
    Race: 'White',
    job: {
        "Administrative support": 11186,
        "Craft workers": 392,
        "Executive/Senior officials & Mgrs": 2620,
        "First/Mid officials & Mgrs": 34517,
        "laborers and helpers": 62,
        "operatives": 137,
        "Professionals": 108805,
        "Sales workers": 29113,
        "Service workers": 298,
        "Technicians": 19882
    }
        }];
console.log(jobData);


dashboard('#dashboard', jobData);
