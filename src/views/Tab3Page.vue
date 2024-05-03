<script setup>
import { ref, onMounted } from 'vue';
import VueScrollama from 'vue3-scrollama';
import { VCol } from 'vuetify/components';
import { Swiper, SwiperSlide } from 'swiper/vue';
import {Navigation, Pagination, Autoplay } from 'swiper/modules';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const slides = [
"1990_streamgraph.png",
"1991_streamgraph.png",
"1992_streamgraph.png",
"1993_streamgraph.png",
"1994_streamgraph.png",
"1995_streamgraph.png",
"1996_streamgraph.png",
"1997_streamgraph.png",
"1998_streamgraph.png",
"1999_streamgraph.png",
"2000_streamgraph.png",
"2001_streamgraph.png",
"2002_streamgraph.png",
"2003_streamgraph.png",
"2004_streamgraph.png",
"2005_streamgraph.png", 
"2006_streamgraph.png", 
"2007_streamgraph.png", 
"2008_streamgraph.png", 
"2009_streamgraph.png", 
"2010_streamgraph.png", 
"2011_streamgraph.png", 
"2012_streamgraph.png", 
"2013_streamgraph.png", 
"2014_streamgraph.png", 
"2015_streamgraph.png",
];

const currentStep = ref(null);

// This is where you can add the titles for your sections
const steps = [
  { 
    title: 'Marks & Channels',
    content: `<img src="/images/vises.webp" alt="marks + channels" style="border-radius: 5%;" />`  
  },
  { 
    title: 'What Are Marks & Channels?',
    content: `<b>Marks</b> are basic geometric elements and <b>Channels</b> control their appearance. We consider these two aspects to be the <b>core building blocks</b> of modern visual encodings. 
    <img src="/images/marks.png" alt="marks" />
    <img src="/images/channels.png" alt="channels" />`
  },
  { 
    title: 'Why Are They Important?',
    content: `Its significance as a key concept in constructing visualizations. As it serves as the core design space of visual encodings with two principles: <b>Expressiveness</b> and <b>Effectiveness</b>.
    <br><br>
    I will explore these concepts through my examples illustrating the uses of Marks & Channels within visualizations. 
    <br><br><br><br>
    Starting with....
    `
  },
  { 
    title: 'Streamgraph',
    content: `A streamgraph is a type of <a href="https://www.data-to-viz.com/graph/stackedarea.html">stacked area graph</a>, displaced along a central axis instead of being stacked on top of each other, forming an organic shape. This visualization is best suited for displaying data with only positive values, rather than both negative and positive values.
    <br><br>
    <ul>
      <li>
        <img src="/images/LastGraph_example.svg.png" alt="streamgraph example" width="600px" />
      </li>
      <li>
        <p>Example of a symmetrical ThemeRiver of music listened to by a person</p>
      </li>
    </ul>`
  },
  { 
    title: 'Implementations',
    content: `Here is my streamgraph using Matplotlib, Pandas, and Numpy:`
  },
  { 
    title: 'Results',
    content: `In addressing the user task of <b>'Determining automotive market trends on a yearly basis,'</b> I found that a streamgraph is the most suitable visualization. Users can explore yearly trends, car makes, and the Market Movement Ratio (MMR) through an interactive interface. Moreover, specific features, including the slider, scrollable legend, and reset button, offer detailed information to help users identify points of interest.
    <br><br>
    Now, my next vis is....`
  },
  { 
    title: 'Choropleth Map',
    content: `A <a href="https://www.tableau.com/data-insights/reference-library/visual-analytics/geospatial/area-maps">Choropleth map</a> is a type of <b>statistical thematic map</b> that utilizes color to represent data. The colors correspond to aggregates of data that summarize geographic characteristics, such as population density, pollution levels, and per capita income, and other spatial data.
    <br><br>
    <img src="/images/js_finalBivariateMap.png" alt="choropleth example" width="600px" />`
  },
  { 
    title: 'Implementation',
    content: `Here is my Choropleth Map using Plotly and Pandas:`
  },
  { 
    title: 'Results',
    content: `The intended user task was to <b>'Explore how vehicle sales differ by state.'</b> The choropleth map emerged as an exemplary visualization for this purpose. Geometry and spatial data plays a critical role in identifying states with the highest and lowest car sales. Additionally, it offers a simplistic overview for users to interact with. For instance, it includes an interactive hover feature displaying annotations such as state and sales, alongside a prominent color gradient indicating the states with the highest sales. This provides users ease of access and engagement with geographical data on cars. `
  },
  { 
    title: 'Conclusion',
    content: `In conclusion, my research has emphasized the value of <b>Marks & Channels</b> in data visualization. These two aspects illustrate both the expressiveness and effectiveness principles crucial for communicating visualizations to users, especially given the plethora of options available. The theme plays a pivotal role in ensuring that data is accurately represented and that the underlying ideas are effectively conveyed.
    <br><br>
    Moreover, the audience was central to considering how Marks & Channels could effectively tell a story. Our <b>targeted users</b> have specific points of interest for research, decision-making, and marketing purposes. I believe these visualization techniques effectively conveyed the intended tasks and met the requirements necessary to fulfill these questions.`
  },
  { 
    title: 'References',
    content: `
    [1] J. Korenblat, “Mindful tools for data exploration (or, how to make visual lasagna),” Medium, https://medium.com/@JoshuaKorenblat/mindful-tools-for-data-exploration-or-how-to-make-visual-lasagna-57a3929e31ce (accessed May 3, 2024). 
    <br><br>
    [2] T. Munzner, “Chapter 5 Marks and Channels,” in Visualization Analysis and Design, Boca Raton, FL: CRC Press, 2014, pp. 95–116 
    <br><br>
    [2] N. Psychonaut, “Streamgraph,” Wikipedia, https://en.wikipedia.org/wiki/Streamgraph#/media/File:LastGraph_example.svg (accessed May 2, 2024).
    <br><br>
    [3] J. Stevens, “Bivariate Choropleth Maps: A how-to guide,” Joshua Stevens - Visual Communicator, https://www.joshuastevens.net/cartography/make-a-bivariate-choropleth-map/ (accessed May 3, 2024).  
    <br><br>
    [4] N. nolimits4web, “Nolimits4web/swiper: Most modern mobile touch slider with hardware accelerated transitions,” GitHub, https://github.com/nolimits4web/swiper (accessed May 3, 2024). `
  },
];

onMounted(() => {
  currentStep.value = '0';  // Set the first step active
});

function handleStepEnter({ element }) {
  currentStep.value = element.dataset.stepNo;
}
</script>

<template>
  <div>
    <VueScrollama
      :debug="false" 
      :offset="0.2"
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
        <div v-if="index === 4" class="streamgraph">
          <img src="../assets/Screenshot 2024-05-03 123139.png" alt="streamgraph" width="90%" />
          <Swiper
          :modules="[Navigation, Pagination, Autoplay]"
          :pagination="{ clickable: true }"
          :navigation="true"
          :autoplay="{ delay: 2500 }"
          >
            <SwiperSlide v-for="slide in slides" :key="slide">
              <img :src="require(`../assets/${slide}`)" alt="" width="100%"/>
            </SwiperSlide>
          </Swiper>
          <p><b>Figure 1</b> presents a revised streamgraph depicting the yearly market trends (MMR) by car make and year, featuring additional interactivity such as a scrollable legend, year slider, and reset buttons.</p>
          <br>
          <p><b>Magnitude Channel</b>: Position, Area</p>
          <p><b>Identity Channel</b>: Spatial position, Color Hue</p>
        </div> 
        <div v-if="index === 7" class="choropleth-map">
          <iframe src="/images/ChoroplethMap.html"></iframe>
          <div>
            <p>
              <b>Figure 2</b> shows a choropleth map illustrating the total number of cars sold in each state in the US, featuring interactive annotations and a hover feature. Note that data is unavailable for certain states.
            </p>
            <br>
            <p><b>Magnitude Channel</b>: Position, Area, Color saturation</p>
            <p><b>Identity Channel</b>: Spatial region, Color hue, Shape</p>
          </div>
        </div>     
      </v-col>
    </VueScrollama>
  </div>
</template>

<style scoped>
.scrollama-container {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.content{
  padding: 0 64px;
}

.step {
  margin: 0;
  padding: 24px;
  width: 100%;
  height: max-content;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  transform: translateY(20px); 
  opacity: 0.5; /* Start with a lower opacity */
}

.step h2 {
  font-size: 2rem;
  font-weight: 700;
}

.step-active {
  transform: translateY(0); /* End at natural position */
  opacity: 1; /* Fully visible when active */
}

.step:nth-child(11) .content{
  text-align: left;
  margin-bottom: 80px;
}

.scrollama-container .step p {
  text-indent: 0;
  margin-left: 0;
  line-height: 1.2;
}

.swiper {
  margin: auto;
  width: 100%;
  min-height: 100px;
  max-height: max-content;
  overflow: visible;
}

.swiper-slide img {
  width: 90%;
  height: 600px;
  object-fit: contain;
}

.streamgraph {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.choropleth-map {
  margin: auto;
  width: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.choropleth-map iframe {
  width: 100%;
  height: 600px;
  border: none;
}
</style>

