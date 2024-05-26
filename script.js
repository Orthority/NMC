document.getElementById('add-log-button').addEventListener('click', function() {
    const logText = document.getElementById('new-log').value;
    if (logText.trim()) {
        const logEntry = document.createElement('div');
        logEntry.classList.add('entry');
        logEntry.textContent = logText;
        document.getElementById('log-entries').appendChild(logEntry);
        document.getElementById('new-log').value = '';
    }
});

document.getElementById('add-reflection-button').addEventListener('click', function() {
    const reflectionText = document.getElementById('new-reflection').value;
    if (reflectionText.trim()) {
        const reflectionEntry = document.createElement('div');
        reflectionEntry.classList.add('entry');
        reflectionEntry.textContent = reflectionText;
        document.getElementById('reflection-entries').appendChild(reflectionEntry);
        document.getElementById('new-reflection').value = '';
    }
});

document.getElementById('add-pdf-button').addEventListener('click', function() {
    const pdfUrl = document.getElementById('pdf-url').value;
    const pdfDescription = document.getElementById('pdf-description').value;
    if (pdfUrl.trim() && pdfDescription.trim()) {
        const pdfLink = document.createElement('li');
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.textContent = pdfDescription;
        link.target = "_blank";
        pdfLink.appendChild(link);
        document.getElementById('pdf-links').appendChild(pdfLink);
        document.getElementById('pdf-url').value = '';
        document.getElementById('pdf-description').value = '';
    }
});


const journeyData = [
    { event: "End of 1st semester exams", date: "2024-02-01" },
	{ event: "Preparation with Supervisor", date: "2024-02-03" },
	{ event: "Project proposal Chp1&3", date: "2024-02-05" },
	{ event: "Practice Test", date: "2024-02-06" },
    { event: "Pre-council exam", date: "2024-01-06" },
	{ event: "Learning SPSS/Data Analysis", date: "2024-02-15" },
	{ event: "Project Chapter 4&5", date: "2024-02-16" },
    { event: "Special posting/Questionnaire distribution", date: "2024-03-17" },
    { event: "Project final review/Corrections", date: "2024-04-01" },
    { event: "Avoid Printers/Binders holdup!!", date: "2024-05-26" },
    { event: "Final Study", date: "2024-05-01" },
    { event: "Council Exam", date: "2024-05-06" }
];

const svg = d3.select("#map-container")
    .append("svg")
    .attr("width", "100%")
    .attr("height", 400);

const margin = { top: 20, right: 30, bottom: 180, left: 40 },
      width = parseInt(svg.style("width")) - margin.left - margin.right,
      height = parseInt(svg.style("height")) - margin.top - margin.bottom;

const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const positions = journeyData.map((d, i) => ({
    x: (i % 3) * (width / 3) + (width / 6),
    y: Math.floor(i / 3) * (height / 2) + (height / 4),
}));

g.selectAll("line")
    .data(positions.slice(1))
    .enter()
    .append("line")
    .attr("x1", (d, i) => positions[i].x)
    .attr("y1", (d, i) => positions[i].y)
    .attr("x2", d => d.x)
    .attr("y2", d => d.y)
    .attr("stroke", "#007BFF")
    .attr("stroke-width", 3);

g.selectAll("circle")
    .data(positions)
    .enter()
    .append("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", 10)
    .attr("fill", "#007BFF");
function updateDimensions() {
    const containerWidth = document.getElementById("map-container").offsetWidth;
    const containerHeight = 400; 

g.selectAll("text")
    .data(journeyData)
    .enter()
    .append("text")
    .attr("x", (d, i) => positions[i].x)
    .attr("y", (d, i) => positions[i].y - 15)
    .attr("text-anchor", "middle")
    .text(d => d.event);
const zoom = d3.zoom()
    .scaleExtent([0.5, 5]) 
    .on("zoom", zoomed);

svg.call(zoom);

function zoomed(event) {
    g.attr("transform", event.transform);
}
