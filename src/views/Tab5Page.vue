<template>
  <div>
    <VueScrollama
      :debug="false" 
      :offset="0.3"
      @step-enter="handleStepEnter"
      class="scrollama-container"
    >
      <v-col
        v-for="(step, index) in steps"
        :key="index"
        class="step"
        :class="{ 'step-active': currentStep === (index + 1).toString() }"
        :data-step-no="index + 1"
      >
        <h2>{{ step.title }}</h2>
        <div v-html="step.content" class="content"></div>      
        <svg v-if="index === 3" id="barChart1"></svg> 
        <svg v-if="index === 4" id="barChart2"></svg> 
        <svg v-if="index === 5" id="barChart3"></svg>      
        <svg v-if="index === 6" id="barChart4"></svg>      
      </v-col>
    </VueScrollama>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import VueScrollama from 'vue3-scrollama';
import { VCol } from 'vuetify/components';
import * as d3 from 'd3';

const currentStep = ref(null);


// This is where you can add the titles for your sections
const steps = [
{ 
    title: 'Introduction to the Dataset and Unique Measurement Choice:', 
    content: `I wanted to help the audience visualize our car dataset in an interesting way. 
              I’m sure you’ve heard that Americans will use anything but the metric system. 
              That led me down a rabbit hole to find the most bizarre metric for our dataset.

              Some popular examples include:
              <ul>
                <li> <strong>Bananas</strong> <img src="/images/banana.jpeg" alt="Banana"></li>
                <li><strong>Washing machines</strong> <img src="/images/washing_machine.png" alt="Washing Machine"></li>
                <li><strong>Bald eagles</strong> <img src="/images/eagle.jpeg" alt="Bald Eagle"></li>
              </ul>`
  },
  { 
    title: 'Choosing Cats as a Unit of Measurement:', 
    content: ` Inspired by this article, <a href="https://owlcation.com/stem/Cat-Mathematics-How-Many-Cats-Does-it-Take">'Cat Mathematics: How Many Cats Fit Into the Trunk of a Honda Civic?'</a>, 
    we've chosen cats as our unit of measurement, partly because the internet adores them, cats are liquid, and it gives me an excuse to look at cat pictures.
    We'll be applying some mathematical calculations to determine how many cats can comfortably fit inside a car. 
    <ul>
      <li> <img src="/images/liquid_cat_hd.png" alt="Liquid cat"></li>
    </ul>
    ` 
  },
  { 
    title: 'Mathematical Approach and Methodology:', 
    content: `Initially, our goal was to determine how many cats could fit in a car's trunk. 
    However, since not all cars have trunks—some are hatchbacks—we had to rethink our approach, we opted to use the passenger volume. 
    Lets start off with defining some constants.
    The article estimates the volume of a cat to be approximately 0.083 cubic feet, and their packing ratio to be about 50%.
    Next, we lookup the passenger volume of chosen car and subtract the space occupied by two average-sized humans as passengers, which we'll refer to as capacity.
    To find out how many cats can fit, we divide the capacity by the volume of cat and then multiply by the packing ratio.
    
    <ul>
      <li> <img src="/images/cat_math.gif" alt="Liquid cat"></li>
    </ul>
    <strong> Disclaimer: No cats were harmed in the making of this post </strong>
    ` 
  },
  { 
    title: 'Analysis Set 1: Popular Cars:', 
    content: `I have two sets to discuss, the first being of the most popular cars in our dataset. 
    We will explore how many cats can fit in them, providing insights into the cat capacity of a vehicle.` 
  },
  { 
    title: 'Analysis Set 1: Results:', 
    content: `Here are the cat capacities of the 10 most popular cars in our dataset.` 
  },
  { title: 'Analysis Set 2: Largest Cars:', 
  content: `The second set will focus on the largest cars in our dataset. 
  How many cats can fit in them? 
  We’ve handpicked those based on universal car knowledge because web scraping the car volumes would not be too fun…` },
  { title: 'Analysis Set 2: Results', 
  content: `Results` },
  { title: 'Conclusion',
  content: `In this exploration, we’ve seen how even the most whimsical measurements can provide insights and make data visualization more engaging.`
  },
];
onMounted(() => {
  currentStep.value = '1';  // Set the first step active
  drawPopBarChart(barData);  // Call this function when the component is mounted
  drawGroupedBarChart(carsData);
  drawLargeBarChart(largeData);
  drawLargeGroupedBarChart(largeBarData);
});

function handleStepEnter({ element }) {
  currentStep.value = element.dataset.stepNo;
}

const barData = [
  { model: 'Nissan Altima', count: 16346 },
  { model: 'Ford Fusion', count: 12116 },
  { model: 'Ford F-150', count: 11950 },
  { model: 'Toyota Camry', count: 10986 },
  { model: 'Ford Escape', count: 10656 },
  { model: 'Ford Focus', count: 9547 },
  { model: 'Honda Accord', count: 8528 },
  { model: 'Chevrolet Impala', count: 7500 },
  { model: 'BMW 3 Series', count: 7132 },
  { model: 'Honda Civic', count: 7068 },
];

const carsData = [
  { model: 'Altima', passengerVolume: 100.8, cats: 546 },
  { model: 'Fusion', passengerVolume: 102.8, cats: 559 },
  { model: 'F-150', passengerVolume: 132, cats: 734 },
  { model: 'Camry', passengerVolume: 100.4, cats: 544 },
  { model: 'Escape', passengerVolume: 98.7, cats: 534 },
  { model: 'Focus', passengerVolume: 90.7, cats: 486 },
  { model: 'Accord', passengerVolume: 103.6, cats: 563 },
  { model: 'Impala', passengerVolume: 105, cats: 572 },
  { model: '3 Series', passengerVolume: 96, cats: 518 },
  { model: 'Civic', passengerVolume: 97.8, cats: 528 }
];

const largeData = [
  { model: 'Navigator', passengerVolume: 172 },
  { model: 'Escalade', passengerVolume: 168 },
  { model: 'Suburban', passengerVolume: 144.7 },
  { model: 'Highlander', passengerVolume: 141.8 },
  { model: 'F-150', passengerVolume: 132 },
  { model: 'F-350', passengerVolume: 126.5 },
  { model: 'Ram 2500', passengerVolume: 125 },
  { model: 'Tahoe', passengerVolume: 122.9 },
  { model: 'Expedition', passengerVolume: 121.5 },
  { model: 'Sienna', passengerVolume: 101 },
]

const largeBarData = [
{ model: 'Navigator', passengerVolume: 172, cats: 1000 },
  { model: 'Escalade', passengerVolume: 168, cats: 975 },
  { model: 'Suburban', passengerVolume: 144.7, cats: 835 },
  { model: 'Highlander', passengerVolume: 141.8, cats: 818 },
  { model: 'F-150', passengerVolume: 132, cats:  759},
  { model: 'F-350', passengerVolume: 126.5, cats: 725},
  { model: 'Ram 2500', passengerVolume: 125, cats: 716},
  { model: 'Tahoe', passengerVolume: 122.9, cats: 704 },
  { model: 'Expedition', passengerVolume: 121.5, cats: 695 },
  { model: 'Sienna', passengerVolume: 101, cats: 572 },

];

function drawLargeBarChart(data) {
  const svg = d3.select('#barChart3');

  svg.attr('width', 800)
     .attr('height', 600)
  // Clear previous renders
  svg.selectAll('*').remove();

  const margin = {top: 20, right: 30, bottom: 50, left: 90},
      width = +svg.attr('width') - margin.left - margin.right,
      height = +svg.attr('height') - margin.top - margin.bottom,
      x = d3.scaleLinear().domain([0, d3.max(data, d => d.passengerVolume)]).range([0, width]),
      y = d3.scaleBand().range([0, height]).padding(0.1).domain(data.map(d => d.model)),
      g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  g.append('g')
  .call(d3.axisLeft(y)); // y-axis
  g.append('g').attr('transform', `translate(0,${height})`)
  .call(d3.axisBottom(x)); // x-axis

  g.append('text') // x-axis label
    .attr('x', width / 2)
    .attr('y', height + margin.bottom)
    .attr('text-anchor', 'middle')
    .text('Passenger Capacity (cubic feet)');

  g.append('text') // y-axis label
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - (height / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('Car Model');


    g.selectAll('.bar')
  .data(data)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('y', d => y(d.model))
  .attr('height', y.bandwidth())
  .attr('x', 0)
  .attr('width', 0)
  .attr('fill', '#880E4F')
  .style('stroke', 'black')
  .style('stroke-width', 1)
  .on('mouseover', function(event, d) {
    const [x, y] = d3.pointer(event);
  tooltip.style('left', (x + 10) + 'px')
         .style('top', (y + 10) + 'px');
    d3.select(this).transition()
      .duration(200)
      .attr('fill', '#FFA500');
    tooltip.transition()
      .duration(200)
      .style('opacity', 1);
    tooltip.html(`Model: ${d.model}<br>Capacity: ${d.passengerVolume}`)
      .style('left', (event.pageX + 10) + 'px')
      .style('top', (event.pageY - 28) + 'px');
  })
  .on('mouseout', function() {
    d3.select(this).transition()
      .duration(500)
      .attr('fill', '#880E4F');
    tooltip.transition()
      .duration(500)
      .style('opacity', 0);
  });

// Initialize the transition for width after setting up event listeners
g.selectAll('.bar')
  .transition()
  .duration(800)
  .delay((d, i) => i * 100)
  .attr('width', d => x(d.passengerVolume));

var tooltip = d3.select('body').append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0)
  .style('position', 'absolute')
  .style('text-align', 'center')
  .style('width', '150px')
  .style('height', '30px')
  .style('padding', '2px')
  .style('font', '12px sans-serif')
  .style('background', 'lightsteelblue')
  .style('border', '0px')
  .style('border-radius', '20px')
  .style('pointer-events', 'none'); // Ensure tooltip doesn't interfere with mouse events
}

function drawPopBarChart(data) {
  const svg = d3.select('#barChart1');

  svg.attr('width', 800)
     .attr('height', 700)
  // Clear previous renders
  svg.selectAll('*').remove();

  const margin = {top: 20, right: 30, bottom: 40, left: 90},
      width = +svg.attr('width') - margin.left - margin.right,
      height = +svg.attr('height') - margin.top - margin.bottom,
      x = d3.scaleLinear().domain([0, d3.max(data, d => d.count)]).range([0, width]),
      y = d3.scaleBand().range([0, height]).padding(0.1).domain(data.map(d => d.model)),
      g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  g.append('g')
  .call(d3.axisLeft(y)); // y-axis
  g.append('g').attr('transform', `translate(0,${height})`)
  .call(d3.axisBottom(x)); // x-axis

  g.append('text') // x-axis label
    .attr('x', width / 2)
    .attr('y', height + margin.bottom)
    .attr('text-anchor', 'middle')
    .text('Sales Count');

  g.append('text') // y-axis label
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - (height / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('Car Model');


    g.selectAll('.bar')
  .data(data)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('y', d => y(d.model))
  .attr('height', y.bandwidth())
  .attr('x', 0)
  .attr('width', 0)
  .attr('fill', '#880E4F')
  .style('stroke', 'black')
  .style('stroke-width', 1)
  .on('mouseover', function(event, d) {
    const [x, y] = d3.pointer(event);
  tooltip.style('left', (x + 10) + 'px')
         .style('top', (y + 10) + 'px');
    d3.select(this).transition()
      .duration(200)
      .attr('fill', '#FFA500');
    tooltip.transition()
      .duration(200)
      .style('opacity', 1);
    tooltip.html(`Model: ${d.model}<br>Counts: ${d.count}`)
      .style('left', (event.pageX + 10) + 'px')
      .style('top', (event.pageY - 28) + 'px');
  })
  .on('mouseout', function() {
    d3.select(this).transition()
      .duration(500)
      .attr('fill', '#880E4F');
    tooltip.transition()
      .duration(500)
      .style('opacity', 0);
  });

// Initialize the transition for width after setting up event listeners
g.selectAll('.bar')
  .transition()
  .duration(800)
  .delay((d, i) => i * 100)
  .attr('width', d => x(d.count));

var tooltip = d3.select('body').append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0)
  .style('position', 'absolute')
  .style('text-align', 'center')
  .style('width', '150px')
  .style('height', '30px')
  .style('padding', '2px')
  .style('font', '12px sans-serif')
  .style('background', 'lightsteelblue')
  .style('border', '0px')
  .style('border-radius', '20px')
  .style('pointer-events', 'none'); // Ensure tooltip doesn't interfere with mouse events
}

function drawGroupedBarChart(data) {
  const svg = d3.select('#barChart2').attr('width', 800).attr('height', 500),
    margin = { top: 50, right: 20, bottom: 70, left: 30 },
    width = +svg.attr('width') - margin.left - margin.right,
    height = +svg.attr('height') - margin.top - margin.bottom,
    g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  const x0 = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.2)
    .domain(data.map(d => d.model));

  const x1 = d3.scaleBand()
    .padding(0.1)
    .domain(['Passenger Volume', 'Cats'])
    .rangeRound([0, x0.bandwidth()]);

  const y = d3.scaleLinear()
    .rangeRound([height, 0])
    .domain([0, d3.max(data, d => Math.max(d.passengerVolume, d.cats))]);

  g.append('g')
    .attr('class', 'axis')
    .call(d3.axisLeft(y))
    .append('text')
    .attr('y', -40)
    .attr('x', -height / 2)
    .attr('fill', '#000')
    .attr('transform', 'rotate(-90)')
    .attr('dy', '0.71em')
    .attr('text-anchor', 'middle')
    .text('Counts');

  g.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x0))
    .append('text')
    .attr('y', 50)
    .attr('x', width / 2)
    .attr('fill', '#000')
    .attr('dy', '2em')
    .attr('text-anchor', 'middle')
    .text('Car Model');

  const legend = g.append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-passengerVolume', 10)
    .attr('text-anchor', 'end')
    .selectAll('g')
    .data(['Passenger Volume', 'Cats'])
    .enter().append('g')
    .attr('transform', (d, i) => `translate(0,${i * 20})`);

  legend.append('rect')
    .attr('x', width - 19)
    .attr('width', 19)
    .attr('height', 19)
    .attr('fill', d => (d === 'Passenger Volume' ? '#4a90e2' : '#e57373'))
    .on('mouseover', function (event, d) {
      d3.selectAll('.model rect')
        .filter(data => data.key === d)
        .style('fill', '#FFA500');
    })
    .on('mouseout', function (event, d) {
      d3.selectAll('.model rect')
        .filter(data => data.key === d)
        .style('fill', d => (d.key === 'Passenger Volume' ? '#4a90e2' : '#e57373'));
    });

  legend.append('text')
    .attr('x', width - 24)
    .attr('y', 9.5)
    .attr('dy', '0.32em')
    .text(d => d);

  const model = g.selectAll('.model')
    .data(data)
    .enter().append('g')
    .attr('class', 'model')
    .attr('transform', d => `translate(${x0(d.model)},0)`);

  model.selectAll('rect')
    .data(d => [{ key: 'Passenger Volume', value: d.passengerVolume }, { key: 'Cats', value: d.cats }])
    .enter().append('rect')
    .attr('x', d => x1(d.key))
    .attr('y', d => y(d.value))
    .attr('width', x1.bandwidth())
    .attr('height', d => height - y(d.value))
    .attr('fill', d => (d.key === 'Passenger Volume' ? '#4a90e2' : '#e57373'))
    .on('mouseover', function (event, d) {
      const [x, y] = d3.pointer(event);
      tooltip.style('left', (x + 10) + 'px')
        .style('top', (y + 10) + 'px');
      d3.select(this).transition()
        .duration(200)
        .attr('fill', '#FFA500');
      tooltip.transition()
        .duration(200)
        .style('opacity', 1);
      tooltip.html(`Value: ${d.value}`)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 28) + 'px');
    })
    .on('mouseout', function () {
      d3.select(this).transition()
        .duration(500)
        .attr('fill', d => (d.key === 'Passenger Volume' ? '#4a90e2' : '#e57373'));
      tooltip.transition()
        .duration(500)
        .style('opacity', 0);
    });

  var tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)
    .style('position', 'absolute')
    .style('text-align', 'center')
    .style('width', '120px')
    .style('height', '20px')
    .style('padding', '2px')
    .style('font', '12px sans-serif')
    .style('background', 'lightsteelblue')
    .style('border', '0px')
    .style('border-radius', '8px')
    .style('pointer-events', 'none');
}

function drawLargeGroupedBarChart(data) {
  const svg = d3.select('#barChart4').attr('width', 800).attr('height', 500),
    margin = { top: 50, right: 20, bottom: 70, left: 30 },
    width = +svg.attr('width') - margin.left - margin.right,
    height = +svg.attr('height') - margin.top - margin.bottom,
    g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  const x0 = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.2)
    .domain(data.map(d => d.model));

  const x1 = d3.scaleBand()
    .padding(0.1)
    .domain(['Passenger Volume', 'Cats'])
    .rangeRound([0, x0.bandwidth()]);

  const y = d3.scaleLinear()
    .rangeRound([height, 0])
    .domain([0, d3.max(data, d => Math.max(d.passengerVolume, d.cats))]);

  g.append('g')
    .attr('class', 'axis')
    .call(d3.axisLeft(y))
    .append('text')
    .attr('y', -40)
    .attr('x', -height / 2)
    .attr('fill', '#000')
    .attr('transform', 'rotate(-90)')
    .attr('dy', '0.71em')
    .attr('text-anchor', 'middle')
    .text('Counts');

  g.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x0))
    .append('text')
    .attr('y', 50)
    .attr('x', width / 2)
    .attr('fill', '#000')
    .attr('dy', '2em')
    .attr('text-anchor', 'middle')
    .text('Car Model');

  const legend = g.append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-passengerVolume', 10)
    .attr('text-anchor', 'end')
    .selectAll('g')
    .data(['Passenger Volume', 'Cats'])
    .enter().append('g')
    .attr('transform', (d, i) => `translate(0,${i * 20})`);

  legend.append('rect')
    .attr('x', width - 19)
    .attr('width', 19)
    .attr('height', 19)
    .attr('fill', d => (d === 'Passenger Volume' ? '#4a90e2' : '#e57373'))
    .on('mouseover', function (event, d) {
      d3.selectAll('.model rect')
        .filter(data => data.key === d)
        .style('fill', '#FFA500');
    })
    .on('mouseout', function (event, d) {
      d3.selectAll('.model rect')
        .filter(data => data.key === d)
        .style('fill', d => (d.key === 'Passenger Volume' ? '#4a90e2' : '#e57373'));
    });

  legend.append('text')
    .attr('x', width - 24)
    .attr('y', 9.5)
    .attr('dy', '0.32em')
    .text(d => d);

  const model = g.selectAll('.model')
    .data(data)
    .enter().append('g')
    .attr('class', 'model')
    .attr('transform', d => `translate(${x0(d.model)},0)`);

  model.selectAll('rect')
    .data(d => [{ key: 'Passenger Volume', value: d.passengerVolume }, { key: 'Cats', value: d.cats }])
    .enter().append('rect')
    .attr('x', d => x1(d.key))
    .attr('y', d => y(d.value))
    .attr('width', x1.bandwidth())
    .attr('height', d => height - y(d.value))
    .attr('fill', d => (d.key === 'Passenger Volume' ? '#4a90e2' : '#e57373'))
    .on('mouseover', function (event, d) {
      const [x, y] = d3.pointer(event);
      tooltip.style('left', (x + 10) + 'px')
        .style('top', (y + 10) + 'px');
      d3.select(this).transition()
        .duration(200)
        .attr('fill', '#FFA500');
      tooltip.transition()
        .duration(200)
        .style('opacity', 1);
      tooltip.html(`Value: ${d.value}`)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 28) + 'px');
    })
    .on('mouseout', function () {
      d3.select(this).transition()
        .duration(500)
        .attr('fill', d => (d.key === 'Passenger Volume' ? '#4a90e2' : '#e57373'));
      tooltip.transition()
        .duration(500)
        .style('opacity', 0);
    });

  var tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)
    .style('position', 'absolute')
    .style('text-align', 'center')
    .style('width', '120px')
    .style('height', '20px')
    .style('padding', '2px')
    .style('font', '12px sans-serif')
    .style('background', 'lightsteelblue')
    .style('border', '0px')
    .style('border-radius', '8px')
    .style('pointer-events', 'none');
}



</script>

<style scoped>
.scrollama-container {
  display: flex;
  flex-direction: column;
}

.content{
  padding-right: 5%;
  padding-left: 1%;
  padding-bottom: 10%; /* fixes missing transitions */
}

.step {
  padding-top: 50px;
  padding-right: 50px;
  margin-bottom: 10vh;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  transform: translateY(20px); 
  opacity: 0.5; /* Start with a lower opacity */
}

.step-active {
  transform: translateY(0); /* End at natural position */
  opacity: 1; /* Fully visible when active */
}

.scrollama-container .step p {
  text-indent: 0;
  margin-left: 0;
  padding-right: 1.3em; /* Adjust this as needed to align with the text above */
  line-height: 1.6;

}

</style>


<style>

.scrollama-container .step .content ul {
  width: 90%;
  padding: 10px;
  margin: auto;
  list-style-type: none;
}

.scrollama-container .step .content img {
  max-width: 100%; /* Ensures image is not wider than its container */
  max-height: 400px; /* Limits the image height to 200px */
  display: block; /* Sets the image as a block element */
  margin: 10px auto; /* Centers the image horizontally and adds space around it */
  object-fit: contain; /* Ensures the aspect ratio is maintained while fitting to the box */
}


</style>
