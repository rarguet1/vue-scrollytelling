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
      </v-col>
    </VueScrollama>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import VueScrollama from 'vue3-scrollama';
import { VCol } from 'vuetify/components';

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
    However, since not all cars have trunks—some are hatchbacks—we had to rethink our approach. 
    Lets start off with defining some constants.
    The article estimates the volume of a cat to be approximately 0.083 cubic feet, and their packing ratio to be about 50%.
    Next, we calculate the volume of the chosen car and subtract the space occupied by two average-sized humans as passengers, which we'll refer to as capacity.
    To find out how many cats can fit, we divide the capacity by the volume of cat and then multiply by the packing ratio.
    
    <ul>
      <li> <img src="/images/cat_math.gif" alt="Liquid cat"></li>
    </ul>
    <strong> Disclaimer: No cats were harmed in the making of this post </strong>
    ` 
 
  },
  { 
    title: 'Analysis Set 1: Popular Cars:', 
    content: `"I have two sets to discuss, the first being of the most popular cars in our dataset. 
    We will explore how many cats can fit in them, providing insights into the spatial capacities of these beloved models` 
  },
  { title: 'Analysis Set 2: Largest Cars:', 
  content: `The second set will focus on the largest cars in our dataset. 
  How many cats can fit in them? 
  We’ve handpicked those based on universal car knowledge because web scraping the car sizes would not be too fun…` },
  { title: 'Conclusion',
  content: `In this exploration, we’ve seen how even the most whimsical measurements can provide insights and make data visualization more engaging.`
  },
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
  padding-right: 5%;
  padding-left: 1%;
}

.step {
  padding-top: 50px;
  padding-right: 50px;
  margin-bottom: 5vh;
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
