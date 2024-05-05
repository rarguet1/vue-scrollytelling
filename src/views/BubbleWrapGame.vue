<template>
    <div id="bw" class="bw">
        <div class="bw__bubbles">
            <div class="bw__bubble" v-for="b in bubbles" :key="b">
                <input class="bw__input" :id="'b' + b" type="checkbox" :name="'b' + b" :value="b"
                    @change="playPopSound" />
                <label class="bw__label" :for="'b' + b">Bubble {{ b }}</label>
                <span class="bw__cover"></span>
            </div>
        </div>
        <div class="button-container">
            <button class="bw__btn" type="button" @click="resetBubbles">New Sheet</button>
            <button class="bw__btn" type="button" @click="openSecretVideo">Secret Button</button>
        </div>
    </div>
</template>



<script>
import { ref, onMounted } from 'vue';
import { Howl } from 'howler';

export default {
    setup() {
        const bubbles = ref(59);
        const popSound = ref(null);
        const videoUrl = ref('https://www.youtube.com/watch?v=uHgt8giw1LY'); // Your video link

        const playPopSound = () => {
            if (popSound.value) {
                popSound.value.play();
            }
        };

        const resetBubbles = () => {
            document.querySelectorAll('.bw__input').forEach(element => {
                if (element instanceof HTMLInputElement) {
                    element.checked = false;
                }
            });
        };

        const openSecretVideo = () => {
            window.open(videoUrl.value, '_blank');
        };

        onMounted(() => {
            popSound.value = new Howl({
                src: [
                    'https://assets.codepen.io/416221/bubble_wrap.mp3',
                    'https://assets.codepen.io/416221/bubble_wrap.ogg'
                ],
                autoplay: false,
                loop: false,
                volume: 1.0
            });
        });

        return { bubbles, playPopSound, resetBubbles, openSecretVideo };
    }
};
</script>


<style scoped>
.button-container {
    display: flex; /* Aligns children (buttons) in a row */
    justify-content: center; /* Centers the buttons in the container */
    margin-top: 10px; /* Provide some top margin for spacing from the bubbles */
}

* {
    border: 0;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

:root {
    font-size: calc(20px + (30 - 20) * (100vw - 320px) / (1280 - 320));
}

body,
button,
input {
    font: 1em/1.5 "DM Sans", -apple-system, sans-serif;
}

body,
.bw,
.bw__bubbles {
    display: flex;
}

body {
    background-color: hsl(223, 90%, 20%);
    height: 100vh;
}

.bw,
.bw__bubbles {
    justify-content: center;
}

.bw {
    flex-direction: column;
    align-items: center;
    margin: auto;
    padding-top: 1.5em;
}

.bw__bubbles {
    background-color: hsla(338, 89%, 55%, 0.427);
    border-radius: 0.25em;
    box-shadow:
        0.1em 0 0 hsl(338, 76%, 95%) inset,
        -0.1em 0 0 hsl(338, 76%, 95%) inset;
    flex-wrap: wrap;
    align-content: flex-start;
    margin-bottom: 1.5em;
    mix-blend-mode: hard-light;
    width: 14em;
}

.bw__bubble {
    position: relative;
    width: 2em;
    height: 1.8em;
}

.bw__bubble:nth-child(13n) {
    margin-right: 1em;
}

.bw__bubble:nth-child(13n + 8) {
    margin-left: 1em;
}

.bw__btn,
.bw__input {
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
}

.bw__btn {
    background-color: hsl(338, 76%, 40%);
    border-radius: 0.25em;
    color: hsl(0, 0%, 100%);
    margin: 0.5em; 
    padding: 0.75em 1em;  
    transition: background-color 0.15s linear;
    width: 150px;  
    display: flex;  
    align-items: center;  
    justify-content: center;  
}

.bw__btn:focus,
.bw__btn:hover {
    background-color: hsl(338, 76%, 60%);
}

.bw__btn:active {
    transform: translateY(0.1em);
    background-color: hsl(338, 76%, 70%);
}



.bw__btn:focus,
.bw__btn:hover {
    background-color: hsl(338, 76%, 60%);
}

.bw__btn:active {
    transform: translateY(0.1em);
    background-color: hsl(338, 76%, 70%);
    /* Even lighter pink on active */
}

.bw__cover,
.bw__cover:before,
.bw__input,
.bw__label {
    position: absolute;
}

.bw__cover,
.bw__cover:before,
.bw__input {
    border-radius: 50%;
}

.bw__cover,
.bw__input {
    background-color: hsl(338, 76%, 18%);
    visibility: visible;
    top: 0;
    left: 0.1em;
    width: 1.8em;
    height: 1.8em;
    transition: box-shadow 0.15s ease-in-out;
}

.bw__cover {
    display: block;
    background-color: hsl(338, 76%, 88%) !important;
}

.bw__cover:before {
    background:
        linear-gradient(-50deg, hsla(338, 76%, 88%, 0) 68%, hsl(338, 76%, 100%), hsla(338, 76%, 88%, 0) 72%) 100% 0 / 75% 40%,
        linear-gradient(-20deg, hsla(338, 76%, 88%, 0) 67%, hsl(338, 76%, 100%), hsla(338, 76%, 88%, 0) 73%) 100% 0 / 75% 100%,
        linear-gradient(-80deg, hsla(338, 76%, 88%, 0) 90%, hsl(338, 76%, 100%), hsla(338, 76%, 88%, 0) 96%) 100% 100% / 80% 50%,
        linear-gradient(10deg, hsla(338, 76%, 88%, 0) 44%, hsl(338, 76%, 100%), hsla(338, 76%, 88%, 0) 50%) 100% 0 / 50% 100%,
        linear-gradient(-30deg, hsla(338, 76%, 88%, 0) 21%, hsl(338, 76%, 100%), hsla(338, 76%, 88%, 0) 27%) 20% 0 / 40% 100%,
        linear-gradient(110deg, hsla(338, 76%, 88%, 0) 47%, hsl(338, 76%, 100%), hsla(338, 76%, 88%, 0) 53%) 0 100% / 100% 30%,
        linear-gradient(-5deg, hsla(338, 76%, 88%, 0) 55%, hsl(338, 76%, 88%), hsla(338, 76%, 88%, 0) 62%) 100% 0 / 35% 100%,
        linear-gradient(25deg, hsla(338, 76%, 88%, 0) 32%, hsl(338, 76%, 88%), hsla(338, 76%, 88%, 0) 39%) 100% 0 / 50% 100%,
        linear-gradient(20deg, hsla(338, 76%, 88%, 0) 22%, hsl(338, 76%, 88%), hsla(338, 76%, 88%, 0) 29%) 100% 0 / 40% 100%;
    background-repeat: no-repeat;
    content: "";
    clip-path: circle(0% at 50% 50%);
    transition: clip-path 0.1s ease-in-out;
    width: 100%;
    height: 100%;
}


.bw__input {
    box-shadow:
        0 0 0 0.05em hsl(338, 76%, 85%) inset,
        0 0 0 hsl(338, 76%, 85%) inset,
        0.2em 0 0.1em hsl(338, 76%, 55%)inset,
        0 0.2em 0.1em hsl(338, 76%, 55%) inset,
        0.25em 0.25em 0.1em hsl(0, 0%, 100%) inset,
        0.6em 0.6em 0.4em 0.5em hsl(338, 76%, 55%) inset,
        0 0 0.25em hsl(338, 76%, 88%);
    background-color: hsl(338, 76%, 88%);
}

.bw__cover,
.bw__input:checked,
.bw__input:checked+.bw__label {
    visibility: hidden;
}

.bw__cover,
.bw__input:focus,
.bw__input:hover {
    box-shadow:
        0 0 0 0.05em hsl(338, 76%, 88%) inset,
        0 0 0 hsl(338, 76%, 88%) inset,
        0.1em 0 0.1em hsl(338, 76%, 88%) inset,
        0 0.1em 0.1em hsl(338, 76%, 88%) inset,
        0.15em 0.15em 0.1em hsl(0, 0%, 100%) inset,
        0.7em 0.7em 0.4em 0.5em hsl(338, 76%, 88%) inset,
        0 0 0.25em hsl(338, 76%, 88%);
    background-color: hsl(338, 76%, 92%);
}

.bw__input:focus {
    outline: transparent;

}

.bw__input:checked+.bw__label+.bw__cover {
    background-color: hsl(338, 76%, 40%);
    visibility: visible;
}

.bw__input:checked+.bw__label+.bw__cover {
    background-color: hsl(338, 76%, 40%);
    visibility: visible;
}

.bw__input:checked~.bw__cover {
    background-color: hsl(338, 76%, 40%);
    box-shadow: 0 0 0 0.05em hsl(338, 76%, 40%) inset,
        0.1em 0 0.1em hsl(338, 76%, 40%) inset,
        0 0.1em 0.1em hsl(338, 76%, 40%) inset,
        0.15em 0.15em 0.1em hsl(338, 100%, 30%) inset;
}


.bw__input:checked~.bw__cover:before {
    clip-path: circle(50% at 50% 50%);
}

.bw__label {
    clip: rect(1px, 1px, 1px, 1px);
    overflow: hidden;
    width: 1px;
    height: 1px;
}
</style>
