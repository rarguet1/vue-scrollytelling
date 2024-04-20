<template>
    <div ref="scrollContainer">
        <div v-for="(step, index) in steps" :key="index" ref="steps" class="step">
            <h2>{{ step.title }}</h2>
            <p>{{ step.content }}</p>
        </div>
    </div>
</template>

<script>
import scrollama from 'scrollama';

export default {
    name: 'ScrollTellingSection',
    data() {
        return {
            scroller: null,
            steps: [
                { title: 'Step 1', content: 'Content for step 1.' },
                { title: 'Step 2', content: 'Content for step 2.' },
                { title: 'Step 3', content: 'Content for step 3.' }
            ]
        };
    },
    mounted() {
    this.$nextTick(() => {
            this.scroller = scrollama();
            this.scroller.setup({
                step: '.step',
                offset: 0.5,
                debug: false
            }).onStepEnter(this.handleStepEnter);
    });
},
    methods: {
        handleStepEnter(response) {
            if (response.element) {
                console.log('Entering:', response.element.textContent);
            }
        }
    }
};
</script>

<style scoped>
.step {
    margin-bottom: 100vh;
    /* Ensures each step occupies enough vertical space to scroll through */
    height: 50vh;
    /* Height of each step for visibility during scroll */
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

/* test*/