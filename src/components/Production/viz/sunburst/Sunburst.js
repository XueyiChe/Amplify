import React from 'react'
import './Sunburst.css'
import * as d3 from "d3-3";
import gender from './Gender.csv'
export default class Sunburst extends React.Component{

    componentDidMount(){
        var width = 600;
var height = 600;
var radius = Math.min(width, height) / 2;

// Breadcrumb dimensions: width, height, spacing, width of tip/tail.
var b = {
    w: 100,
    h: 30,
    s: 3,
    t: 10
};

// Mapping of step names to colors.
var colors = {

    "male": "#5687d1",
    "female": "#F08080",
    "American_Indian_Alaskan_Native": "#3CAF85",
    "Asian": "#E95B54",
    "Black_or_African_American": "#309FDB",
    "Latino": "#3CAF85",
    "Native_Hawaiian_or_Pacific_Islander": "#EC7063",
    "Two_or_more_races": "#BA4A00",
    "White": "#FBCE4A",
    "Administrative support": "#854E9B",
    "Craft workers": "#e08214",
    "Executive/Senior officials & Mgrs": "#CE93D8",
    "First/Mid officials & Mgrs": "#309FDB",
    "laborers and helpers": "#EC407A",
    "operatives": "#FFF176",
    "Professionals": "#E95A53",
    "Sales workers": "#3CAF85",
    "Service workers": "#7986CB",
    "Technicians": "#FBCE4A",
    "23andMe": "#FFFFFF",
    "Adobe": "#CDCDCD",
    "Airbnb": "#CDCDCD",
    "Apple": "#CDCDCD",
    "Cisco": "#CDCDCD",
    "eBay": "#CDCDCD",
    "Facebook": "#CDCDCD",
    "Google": "#CDCDCD",
    "HP Inc.": "#CDCDCD",
    "HPE": "#CDCDCD",
    "Intel": "#CDCDCD",
    "Intuit": "#CDCDCD",
    "LinkedIn": "#CDCDCD",
    "Lyft": "#CDCDCD",
    "MobileIron": "#CDCDCD",
    "Nvidia": "#CDCDCD",
    "Pinterest": "#CDCDCD",
    "Salesforce": "#CDCDCD",
    "Square": "#CDCDCD",
    "Twitter": "#CDCDCD",
    "Uber": "#CDCDCD",
    "View": "#CDCDCD"
};

// Total size of all segments; we set this later, after loading the data.
var totalSize = 0;

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", width)
    .attr("height", height)
    .append("svg:g")
    .attr("id", "container")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var partition = d3.layout.partition()
    .size([2 * Math.PI, radius * radius])
    .value(function (d) {
        return d.size;
    });

var arc = d3.svg.arc()
    .startAngle(function (d) {
        return d.x;
    })
    .endAngle(function (d) {
        return d.x + d.dx;
    })
    .innerRadius(function (d) {
        return Math.sqrt(d.y);
    })
    .outerRadius(function (d) {
        return Math.sqrt(d.y + d.dy);
    });

// Use d3.text and d3.csv.parseRows so that we do not need to have a header
// row, and can receive the csv as an array of arrays.

d3.text(gender, function (text) {
    //console.log(text);
    var csv = d3.csv.parseRows(text);
    var json = buildHierarchy(csv);
    console.log(json);
    buildSunburst(json);
});


// Main function to draw and set up the visualization, once we have the data.
function buildSunburst(json) {

    initializeBreadcrumbTrail();
    drawLegend();
    d3.select("#togglelegend").on("click", toggleLegend);


    vis.append("svg:circle")
        .attr("r", radius)
        .style("opacity", 0);

    // For efficiency, filter nodes to keep only those large enough to see.
    var nodes = partition.nodes(json)
    //      .filter(function(d) {
    //      return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
    //      });

    var path = vis.data([json]).selectAll("path")
        .data(nodes)
        .enter().append("svg:path")
        .classed("nodePath", true)
        .attr("display", function (d) {
            return d.depth ? null : "none";
        })
        .attr("d", arc)
        .attr("fill-rule", "evenodd")
        .style("fill", function (d) {
            return colors[d.name];
        })
        .style("opacity", 1)
        .on("mouseover", mouseoverSun);

    // Add the mouseleaveSun handler to the bounding circle.
    d3.select("#container").on("mouseleave", mouseleaveSun);

    // Get total size of the tree = value of root node from partition.
    totalSize = path.node().__data__.value;
    console.log(totalSize);
};

// Fade all but the current sequence, and show it in the breadcrumb trail.
function mouseoverSun(d) {

    var percentage = (100 * d.value / totalSize).toPrecision(3);
    var percentageString = percentage + "%";
    if (percentage < 0.1) {
        percentageString = "< 0.1%";
    }

    d3.select("#percentage")
        .text(percentageString);

    d3.select("#explanation")
        .style("visibility", "");

    var sequenceArray = getAncestors(d);
    updateBreadcrumbs(sequenceArray, percentageString);

    // Fade all the segments.
    d3.selectAll("path")
        .style("opacity", 0.3);

    // Then highlight only those that are an ancestor of the current segment.
    vis.selectAll("path")
        .filter(function (node) {
            return (sequenceArray.indexOf(node) >= 0);
        })
        .style("opacity", 1);
}

// Restore everything to full opacity when moving off the visualization.
function mouseleaveSun(d) {

    // Hide the breadcrumb trail
    d3.select("#trail")
        .style("visibility", "hidden");

    // Deactivate all segments during transition.
    d3.selectAll("path").on("mouseoverSun", null);

    // Transition each segment to full opacity and then reactivate it.
    d3.selectAll("path")
        .transition()
        .duration(1000)
        .style("opacity", 1)
        .each("end", function () {
            d3.select(this).on("mouseoverSun", mouseoverSun);
        });

    d3.select("#explanation")
        .style("visibility", "hidden");
}

// Given a node in a partition layout, return an array of all of its ancestor
// nodes, highest first, but excluding the root.
function getAncestors(node) {
    var path = [];
    var current = node;
    while (current.parent) {
        path.unshift(current);
        current = current.parent;
    }
    return path;
}

function initializeBreadcrumbTrail() {
    // draw the sequence area.
    var trail = d3.select("#sequence").append("svg:svg")
        .attr("width", width)
        .attr("height", 50)
        .attr("id", "trail");
    trail.append("svg:text")
        .attr("id", "endlabel")
        .style("fill", "#000");
}

// Generate a string that describes the points of a breadcrumb polygon.
function breadcrumbPoints(d, i) {
    var points = [];
    points.push("0,0");
    points.push(b.w + ",0");
    points.push(b.w + b.t + "," + (b.h / 2));
    points.push(b.w + "," + b.h);
    points.push("0," + b.h);
    if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
        points.push(b.t + "," + (b.h / 2));
    }
    return points.join(" ");
}

// Update the breadcrumb trail to show the current sequence and percentage.
function updateBreadcrumbs(nodeArray, percentageString) {

    // Data join; key function combines name and depth (= position in sequence).
    var g = d3.select("#trail")
        .selectAll("g")
        .data(nodeArray, function (d) {
            return d.name + d.depth;
        });

    // Add breadcrumb and label for entering nodes.
    var entering = g.enter().append("svg:g");

    entering.append("svg:polygon")
        .attr("points", breadcrumbPoints)
        .style("fill", function (d) {
            return colors[d.name];
        });

    entering.append("svg:text")
        .attr("x", (b.w + b.t) / 2)
        .attr("y", b.h / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(function (d) {
            return d.name;
        });

    // Set position for entering and updating nodes.
    g.attr("transform", function (d, i) {
        return "translate(" + i * (b.w + b.s) + ", 0)";
    });

    // Remove exiting nodes.
    g.exit().remove();

    // Now move and update the percentage at the end.
    d3.select("#trail").select("#endlabel")
        .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
        .attr("y", b.h / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(percentageString);

    // Make the breadcrumb trail visible, if it's hidden.
    d3.select("#trail")
        .style("visibility", "");

}

function drawLegend() {

    // draw legend
    var li = {
        w: 300,
        h: 30,
        s: 3,
        r: 3
    };

    var legend = d3.select("#legend").append("svg:svg")
        .attr("width", li.w)
        .attr("height", d3.keys(colors).length * (li.h + li.s));

    var g = legend.selectAll("g")
        .data(d3.entries(colors))
        .enter().append("svg:g")
        .attr("transform", function (d, i) {
            return "translate(0," + i * (li.h + li.s) + ")";
        });

    g.append("svg:rect")
        .attr("rx", li.r)
        .attr("ry", li.r)
        .attr("width", li.w)
        .attr("height", li.h)
        .style("fill", function (d) {
            return d.value;
        });

    g.append("svg:text")
        .attr("x", li.w / 2)
        .attr("y", li.h / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(function (d) {
            return d.key;
        });
}

function toggleLegend() {
    var legend = d3.select("#legend");
    if (legend.style("visibility") == "hidden") {
        legend.style("visibility", "");
    } else {
        legend.style("visibility", "hidden");
    }
}


function buildHierarchy(csv) {
    var root = {
        "name": "root",
        "children": []
    };
    console.log(root);

    for (var i = 0; i < csv.length; i++) {

        var sequence = csv[i][0];
        var size = +csv[i][1];
        if (isNaN(size)) { // e.g. if this is a header row
            continue;
        }
        var parts = sequence.split("-");
        var currentNode = root;
        //console.log(currentNode);    

        for (var j = 0; j < parts.length; j++) {
            var children = currentNode["children"];

            var nodeName = parts[j];
            var childNode;
            if (j + 1 < parts.length) {
                // Not yet at the end of the sequence; move down the tree.
                var foundChild = false;
                for (var k = 0; k < children.length; k++) {
                    if (children[k]["name"] == nodeName) {
                        childNode = children[k];
                        foundChild = true;
                        break;
                    }
                }
                // If we don't already have a child node for this branch, create it.
                if (!foundChild) {
                    childNode = {
                        "name": nodeName,
                        "children": []
                    };
                    children.push(childNode);
                }
                currentNode = childNode;
            } else {
                // Reached the end of the sequence; create a leaf node.
                childNode = {
                    "name": nodeName,
                    "size": size
                };
                children.push(childNode);
            }
        }
    }
    return root;
};

function buildHierarchyfromRace(csv) {

    var root = {
        "name": "root",
        "children": []
    };
    for (var i = 0; i < csv.length; i++) {
        var sequence = csv[i][0];
        var size = +csv[i][1];
        if (isNaN(size)) { // e.g. if this is a header row
            continue;
        }
        var parts = sequence.split("-");
        var currentNode = root;
        var tmp = parts[0];
        parts[0] = parts[1];
        parts[1] = tmp;

        for (var j = 0; j < parts.length; j++) {
            var children = currentNode["children"];
            var nodeName = parts[j];
            var childNode;
            if (j + 1 < parts.length) {
                // Not yet at the end of the sequence; move down the tree.
                var foundChild = false;
                for (var k = 0; k < children.length; k++) {
                    if (children[k]["name"] == nodeName) {
                        childNode = children[k];
                        foundChild = true;
                        break;
                    }
                }
                // If we don't already have a child node for this branch, create it.
                if (!foundChild) {
                    childNode = {
                        "name": nodeName,
                        "children": []
                    };
                    children.push(childNode);
                }
                currentNode = childNode;
            } else {
                // Reached the end of the sequence; create a leaf node.
                childNode = {
                    "name": nodeName,
                    "size": size
                };
                children.push(childNode);
            }
        }
    }
    return root;
};

function buildHierarchyfromJob(csv) {

    var root = {
        "name": "root",
        "children": []
    };
    for (var i = 0; i < csv.length; i++) {
        var sequence = csv[i][0];
        var size = +csv[i][1];
        if (isNaN(size)) { // e.g. if this is a header row
            continue;
        }
        var parts = sequence.split("-");
        var currentNode = root;
        var tmp = parts[0];
        parts[0] = parts[2];
        parts[2] = tmp;

        for (var j = 0; j < parts.length; j++) {
            var children = currentNode["children"];
            var nodeName = parts[j];
            var childNode;
            if (j + 1 < parts.length) {
                // Not yet at the end of the sequence; move down the tree.
                var foundChild = false;
                for (var k = 0; k < children.length; k++) {
                    if (children[k]["name"] == nodeName) {
                        childNode = children[k];
                        foundChild = true;
                        break;
                    }
                }
                // If we don't already have a child node for this branch, create it.
                if (!foundChild) {
                    childNode = {
                        "name": nodeName,
                        "children": []
                    };
                    children.push(childNode);
                }
                currentNode = childNode;
            } else {
                // Reached the end of the sequence; create a leaf node.
                childNode = {
                    "name": nodeName,
                    "size": size
                };
                children.push(childNode);
            }
        }
    }
    return root;
};

var inputElems = d3.selectAll("input[name='start']");
inputElems.on("change", inputChange);

function inputChange() {
    var inputValue = this.value;
    console.log(inputValue);

    if (inputValue === "gender") {
        d3.selectAll(".nodePath").remove();
        d3.text(gender, function (text) {
            //console.log(text);
            var csv = d3.csv.parseRows(text);
            var json = buildHierarchy(csv);
            console.log(json);
            buildSunburst(json);
        });

    } else if (inputValue === "race") {
        d3.selectAll(".nodePath").remove();
        d3.text(gender, function (text) {
            //console.log(text);
            var csv = d3.csv.parseRows(text);
            var json = buildHierarchyfromRace(csv);
            console.log(json);
            buildSunburst(json);
        });


    } else if (inputValue === "jobCatagory") {
        d3.selectAll(".nodePath").remove();
        d3.text(gender, function (text) {
            //console.log(text);
            var csv = d3.csv.parseRows(text);
            var json = buildHierarchyfromJob(csv);
            console.log(json);
            buildSunburst(json);
        });


    };
}
inputElems.on("change", inputChange);


    }
    render(){
        const style = {
            visibility: 'hidden'
        }
        
        return(
            <div className = 'sunburst'>
                <h1>Sunburst chart</h1>

    <form>
        <label><input type="radio" name="start" value="gender" /> Gender</label>
        <label><input type="radio" name="start" value="race" checked /> Race</label>
        <label><input type="radio" name="start" value="jobCatagory" checked /> Job catagory</label>
    </form>
    <div id="sunburst">
        <div id="main">
            <div id="sequence"></div>
            <div id="chart">
                <div id="explanation" style={style}>
                    <span id="percentage"></span><br/> of total
                </div>
            </div>
        </div>
        <div id="sidebar">
            <input type="checkbox" id="togglelegend" />Legend<br/>
            <div id="legend" style={style}>
            </div>
            </div>
        </div>
    </div>
        )
    }
}