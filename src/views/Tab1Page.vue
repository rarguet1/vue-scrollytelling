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
        <!-- <div v-if="index === 0" class="content">
          <iframe src="/images/BrandCountDonut.html" width="800" height="800"></iframe>
        </div> -->      
      </v-col>
    </VueScrollama>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import VueScrollama from 'vue3-scrollama';
import { VCol } from 'vuetify/components';

const currentStep = ref(null);

// This is where you can add the titles and content for your sections
// Troll face: https://tenor.com/view/troll-troll-face-gif-25116980
const steps = [
  { title: 'Color', content: `<img src="/images/form-Newton-colour-circle.jpg" alt="Color Wheel Image" />` },
  { title: 'Color and Visualization', content: `The most important aspects of <b>Color</b> for data visualization is <b>Hue, Lumiance, and Saturation</b>, each of which can be used to encode data in different ways. 
    <br></br>
    <b>Colormaps</b> are another aspect of Color and is used to either distinguish <b>Categorical</b> attributes or encode <b>Ordered</b> attributes
    <br></br>
    Within the context of our course <b>Color</b> as a term can be used as an <b>Identity</b> channel. 
    <ul>
      <img src="/images/Color_Encoding.jpg" alt="Color Wheel Image" />
    </ul>
  `},
  { title: 'Importance of Color', content: `Color is a key tool of visualizations. It can allow us to distinguish between between different attributes. It also can allow us to encode magnitude in a way that may be visually appealing to users.`},
  { title: 'Application', content: `For the theme of color, I chose to tackle our project task <b>"Display The Top Brands to the User"</b>
    <br></br>
    Using Plotly, I took a transformed version of our original car dataset, one that gathered the numbers of makes sold each year, and created a donut chart. I further transformed the data to gather the total sales for each make, then compared each of the makes against each other. Taking the top ten of each, they were compiled into a final donut chart.
  `},
  { title: 'Iteration: Alpha Version - Start', content: `Of course, getting to the final design wasn't necessarily a straightforward process. My artifact ever produced was made under the assumption that I'd be able to show off ever single car make.
    <br></br>
    <ul>
      <img src="/images/BAD_PIE_0.png" alt="OG_RELEASE" />
    </ul>
  `},
  { title: 'Iteration: Alpha Version - Further Elaborations', content: `That orginal version obviously wouldn't work. The only good aspect of it was it's interactivity. Moving forward, I tried creating some different visualizations.
    <br></br>
    <ul>
      <img src="/images/BAD_PIE_1.png" alt="OG_RELEASE" />
    </ul>
    <br></br>
    <ul>
      <iframe src="/images/UGLYBAR.html" width="800" height="800"></iframe>
    </ul>
  `},
  { title: 'Iteration: The Donut', content: `Shockingly, at least to me, the concept that was the best recieved was a simple donut chart.
    <br></br>
    <ul>
      <img src="/images/OG_DONUT.png" alt="OG_RELEASE" />
    </ul>
  `},
  { title: 'Iteration: Donut Betas', content: `Once I locked in the Donut Chart as the one I would be using for the final release, there was still more work to do. Prior to the beta, I had not been filtering data. For the beta builds, I tried filtering data by creating a separate attribute called <b>Others Models</b>. This didn't get the results that I wanted though.
    <br></br>
    <ul>
      <img src="/images/DONUT_BAD_0.png" alt="OG_RELEASE" />
    </ul>
    <br></br>
    <ul>
      <img src="/images/DONUT_BAD_1.png" alt="OG_RELEASE" />
    </ul>
    <br></br>
    <ul>
      <img src="/images/DONUT_BAD_2.png" alt="OG_RELEASE" />
    </ul>
  `},   
  { 
    title: 'The Final Result', 
    content: `Eventually, I gave up on the idea of creating a working version of <b>Other Models</b> and instead opted to make the vis a top ten, leading to this simple but successful final result.
    <br></br> 
    <ul>
      <iframe src="/images/BrandCountDonut.html" width="800" height="800"></iframe>
    </ul>
    <br></br>
    <b>Quantitative Attribute</b>: Total Cars (Area 2D)
    <br></br>
    <b>Categorical Attribute</b>: Car Make (Color Hue)
    <br></br>
    <b>Marks</b>: Areas
  `},
  { title: 'References', 
    content: `[1] “Pie Charts,” plotly.com. https://plotly.com/python/pie-charts/.
    <br></br>
    [2] “Help Pie chart Plotly,” Plotly Community Forum, Oct. 02, 2020. https://community.plotly.com/t/help-pie-chart-plotly/45631.
    `},
];
onMounted(() => {
  currentStep.value = '1';  // Set the first step active
});

function handleStepEnter({ element }) {
  currentStep.value = element.dataset.stepNo;
}

</script>

<style scoped>
.scrollama-container {
  display: flex;
  flex-direction: column;
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

.step-active {
  transform: translateY(0); /* End at natural position */
  opacity: 1; /* Fully visible when active */
}

.scrollama-container .step p {
  text-indent: 0;
  margin-left: 0;
  padding-right: 1.2em; /* Adjust this as needed to align with the text above */
  line-height: 1.2;
}

</style>