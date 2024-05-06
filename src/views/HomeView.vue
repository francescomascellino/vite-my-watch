<script>
import { mapStores } from 'pinia';

import { useWatchStore } from '../store/store';
// import { watch } from 'vue';

export default {

    name: 'HomeView',

    data() {
        return {
            // Dati del componente
        };
    },

    computed: {

        ...mapStores(useWatchStore),

        currentStepIndex() {
            return this.watchStore.steps.indexOf(this.$route.params.name)
        },

        currentStep() {
            return this.watchStore.steps[this.currentStepIndex]
        },

        getNextStep() {

            const currentPart = this.watchStore.parts.find(part => part.name === this.currentStep);

            const nextStep = this.watchStore.steps[this.currentStepIndex + 1];

            if ((currentPart && currentPart.color !== '') || this.$route.params.name == 'save' || this.$route.name == 'home') {
                return nextStep;
            } else {
                return false;
            }

        },

        getPrevStep() {
            return this.currentStepIndex > 0 ? this.watchStore.steps[(this.currentStepIndex) - 1] : false;
        },

        availableColors() {
            let selectedColor
            if (this.$route.params.name == 'hands') {
                selectedColor = this.watchStore.parts.find(part => part.name === 'face').color
            }

            if (this.$route.params.name == 'loop') {
                selectedColor = this.watchStore.parts.find(part => part.name === 'strap').color
            }

            return this.watchStore.getAvailableColors.filter(color => color !== selectedColor)

        }

    },

    methods: {

        setColor(color) {
            const partIndex = this.watchStore.parts.findIndex(part => part.name === this.$route.params.name);
            this.watchStore.parts[partIndex].color = color;

            console.log(this.watchStore.parts[partIndex].name + ": " + this.watchStore.parts[partIndex].color);
        },

        capitalize(value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        },

    },

    created() {
        // Logica eseguita al momento della creazione del componente
    },

    mounted() {
        // Logica eseguita dopo che il componente è stato montato
    },

    watch: {
        '$route.params.name': {
            handler(name) {
                if (name === 'loop') {
                    const strapColor = this.watchStore.parts.find(part => part.name === 'strap').color;
                    const loopColor = this.watchStore.parts.find(part => part.name === 'loop').color;
                    if (strapColor === loopColor) {
                        this.watchStore.parts.find(part => part.name === 'loop').color = '';
                    }
                } else if (name === 'hands') {
                    const faceColor = this.watchStore.parts.find(part => part.name === 'face').color;
                    const handsColor = this.watchStore.parts.find(part => part.name === 'hands').color;
                    if (faceColor === handsColor) {
                        this.watchStore.parts.find(part => part.name === 'hands').color = '';
                    }
                }
            },
            immediate: true
        }
    },

    filters: {
        capitalize: function (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        },
    },
};
</script>

<template>

    <div class="m-3">
        <h1>Route name: {{ capitalize($route.name) }}</h1>

        <hr>

        <div v-if="$route.name == 'step'">
            <h1>Steps</h1>
            <span class="mx-2" :class="{ 'fw-bold': $route.params.name === step }" v-for=" step  in  watchStore.steps "
                :key="step">
                {{ capitalize(step) }}
            </span>
        </div>

        <router-link v-if="getPrevStep" :to="{ name: 'step', params: { name: getPrevStep } }">
            Prev Step
        </router-link>

        <router-link v-else to="/">
            Home
        </router-link>

        <router-link v-if="getNextStep" :to="{ name: 'step', params: { name: getNextStep } }">
            {{ $route.params.name == 'save' ? 'Confirm' : 'Next Step' }}
        </router-link>

        <router-link v-else-if="$route.params.name == 'buy'" to="/">
            Checkout
        </router-link>


        <div
            v-if="$route.params.name !== 'home' && $route.params.name !== 'save' && $route.params.name !== 'buy' && $route.name == 'step'">
            <h1>Available colors</h1>
            <template v-if="$route.params.name === 'hands' || $route.params.name === 'loop'">
                <span class="mx-2" :style="{ color: avaiableColor }" v-for="avaiableColor in availableColors"
                    :key="avaiableColor" @click="setColor(avaiableColor)">
                    {{ capitalize(avaiableColor) }}
                </span>
            </template>

            <template v-else>
                <span class="mx-2" :style="{ color: availableColor }"
                    v-for="availableColor in watchStore.getAvailableColors" :key="availableColor"
                    @click="setColor(availableColor)">
                    {{ capitalize(availableColor) }}
                </span>
            </template>

        </div>

        <div>
            <h1>Parts</h1>
            <template v-for="part in watchStore.parts">
                <p v-if="part.color !== ''">
                    {{ capitalize(part.name) }}: <span
                        :style="{ color: part.color }">{{ capitalize(part.color) }}</span>
                </p>
            </template>
        </div>


    </div>

</template>

<style scoped>
/* Stili del componente */
</style>