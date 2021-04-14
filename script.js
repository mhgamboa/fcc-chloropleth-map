const height = 7000;
const width = 1100;
const padding = 40;

const svg = d3.select("#svg");
var path = d3.geoPath();

fetch(
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
)
  .then((response) => response.json())
  .then((countyData) => {
    const counties = topojson.feature(countyData, countyData.objects.counties)
      .features;
    fetch(
      "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"
    )
      .then((response) => response.json())
      .then((educationData) => {
        // console.log(counties);
        console.log(educationData);
        svg
          .selectAll("path")
          .data(counties)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("class", "county")
          .attr("fill", (d) => console.log(d));
      });
  });

/*
const path = d3.geoPath(); //the method that does the actual drawing, which you'll call later

 svg
  .selectAll("path") // should be familiar, adding "path" for all data points, like adding 'rect'
  .data(topojson.feature(data2, data2.objects.counties).features) // here you convert topojson data to geojson data. I have no idea how the math works. Topojson is like a 'compressed' version of geojson
  .enter()
  .append("path")
  .attr("d", path); // don't know what 'd' is, but it seems analogous to "x-y-cordinates", and path seems to tell the coordinates where to go using magical math
 */
