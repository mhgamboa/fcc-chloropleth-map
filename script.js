const height = 7000;
const width = 1100;
const padding = 40;

const tooltip = d3.select("#tooltip");
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
        let highestEducation = d3.max(
          educationData,
          (d) => d.bachelorsOrHigher
        );
        let lowestEducation = d3.min(educationData, (d) => d.bachelorsOrHigher);
        console.log(highestEducation);
        console.log(lowestEducation);
        //2.6, 20.725, 38.85, 56.975, 75.1
        //#deebf7,#9ecae1,#2171b5,#08306b
        svg
          .selectAll("path")
          .data(counties)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("class", "county")
          .attr("fill", (d) => {
            let result = educationData.filter((x) => x.fips == d.id);
            if (result[0].bachelorsOrHigher <= 20.725) {
              return "#deebf7";
            } else if (result[0].bachelorsOrHigher <= 38.85) {
              return "#9ecae1";
            } else if (result[0].bachelorsOrHigher <= 56.975) {
              return "#2171b5";
            } else {
              return "#08306b";
            }
          })
          .attr("data-fips", (d) => d.id)
          .attr("data-education", (d) => {
            let result = educationData.filter((x) => x.fips == d.id);
            return result[0].bachelorsOrHigher;
          }) // Add ToolTips when hovering
          .on("mouseover", (e, d) => {
            let result = educationData.filter((x) => x.fips == d.id);
            tooltip
              .attr("data-education", result[0].bachelorsOrHigher)
              .style("visibility", "visible")
              .style("left", e.pageX - 25 + "px")
              .style("top", e.pageY - 90 + "px")
              .html(
                `${result[0].area_name}, ${result[0].state}: ${result[0].bachelorsOrHigher}`
              );
          })
          .on("mousemove", (e, d) => {
            let result = educationData.filter((x) => x.fips == d.id);
            tooltip
              .attr("data-education", result[0].bachelorsOrHigher)
              .style("visibility", "visible")
              .style("left", e.pageX - 25 + "px")
              .style("top", e.pageY - 90 + "px")
              .html(
                `${result[0].area_name}, ${result[0].state}: ${result[0].bachelorsOrHigher}%`
              );
          })
          .on("mouseout", (e, d) => {
            tooltip.transition().style("visibility", "hidden");
          });
        //Create legend
        const legend = d3
          .select("body")
          .append("svg")
          .attr("width", 600)
          .attr("height", 50)
          .attr("id", "legend");

        const colors = ["#deebf7", "#9ecae1", "#2171b5", "#08306b"];
        ranges = [2.6, 20.725, 38.85, 56.975, 75.1];

        legend
          .selectAll("rect")
          .data(colors)
          .enter()
          .append("rect")
          .attr("height", 25)
          .attr("width", 25)
          .attr("fill", (d) => d)
          .attr("x", (d, i) => i * (600 / colors.length) + 45)
          .attr("y", 20)
          .append("title")
          .text((d, i) => ranges[i])
          .attr("color", "red");
      });
  });
