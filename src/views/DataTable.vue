<template>
    <div ref="plotlyDiv" class="plotly-container" style="min-height: 800px; width: 80%;"></div>
</template>


<script>
import Plotly from 'plotly.js-dist-min';
export default {
    name: 'PlotlyTable',
    mounted() {
        this.renderPlotlyTable();
    },
    methods: {
        renderPlotlyTable() {
            var values = [
                ['Year', 'Make', 'Model', 'Trim', 'Body', 'Transmission', 'Vin', 'State', 'Condition', 'Odometer', 'Color', 'Interior', 'Seller', 'MMR', 'Selling Price', 'Sale Date'],
                [
                    "The manufacturing year of the vehicle.",
                    "The brand or manufacturer of the vehicle.",
                    "The specific model of the vehicle.",
                    "Additional designation for the vehicle model.",
                    "The body type of the vehicle (e.g., SUV, Sedan).",
                    "The type of transmission in the vehicle (e.g., automatic).",
                    "Vehicle Identification Number, a unique code for each vehicle.",
                    "The state where the vehicle is registered.",
                    "Condition of the vehicle, possibly rated on a scale.",
                    "The mileage or distance traveled by the vehicle.",
                    "Exterior color of the vehicle.",
                    "Interior color of the vehicle.",
                    "The entity selling the vehicle.",
                    "Manheim Market Report, (est. market value of the vehicle).",
                    "The price at which the vehicle was sold.",
                    "The date and time when the vehicle was sold.",
                ]
            ];

            var data = [{
                type: 'table',
                columnorder: [1, 2],
                columnwidth: [50, 300],
                header: {
                    values: [["<b>Features</b>"], ["<b>Description</b>"]],
                    align: ["left", "center"],
                    height: 40,
                    line: { width: 1, color: '#000000' },
                    fill: { color: '#880E4F' },
                    font: { family: "Arial", size: 22, color: "white" }
                },
                cells: {
                    values: values,
                    align: ["left", "center"],
                    height: 30,
                    line: { color: "#000000", width: 1 },
                    fill: { color: [['white','#F9CBE4','white',
                    '#F9CBE4','white', '#F9CBE4','white', 
                    '#F9CBE4','white', '#F9CBE4','white', '#F9CBE4', 'white', '#F9CBE4', 'white', '#F9CBE4']]},
                    font: { family: "Arial", size: 16, color: ["#000000"] }
                }
            }];

            Plotly.newPlot(this.$refs.plotlyDiv, data);

        }
    }
}
</script>

<style>
.plotly-container {
    padding-left: 9%; /* Adds some padding inside the div */
}
</style>