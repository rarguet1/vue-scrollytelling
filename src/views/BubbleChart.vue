<template>
  <div>
    <div ref="chart" style="width: 100%; height: 90vh;"></div>
    <input type="range" v-model="currentYear" :min="minYear" :max="maxYear" @input="updateChart">
    <p>Year: {{ currentYear }}</p>
  </div>
</template>

<script>
import Plotly from 'plotly.js-dist-min';

export default {
  name: 'MarketShareBubbleChart',
  data() {
    return {
      currentYear: 2015,
      minYear: 1990,
      maxYear: 2015,
      allData: {
        1990: { x: ["Cadillac", "Chevrolet", "Honda", "Jaguar", "Lexus", "Mazda", "Mercedes", "Nissan", "Toyota"], y: [0.7, 58.6, 8.0, 1.3, 5.3, 14.9, 2.3, 2.5, 6.4], size: [400, 34575, 4725, 775, 3125, 8800, 1375, 1500, 3775] },
        1991: { x: ["BMW", "Cadillac", "Chevrolet", "Ford", "Honda", "Lexus", "Lincoln", "Mazda", "Mercedes", "Nissan", "Oldsmobile", "Toyota"], y: [11.7, 4.4, 27.2, 0.5, 7.8, 3.6, 1.2, 2.4, 27.8, 4.7, 0.2, 8.6], size: [7600, 2875, 17600, 325, 5050, 2325, 775, 1525, 18025, 3025, 150, 5550] },
        1992: { x: ["BMW", "Buick", "Cadillac", "Chevrolet", "Ford", "Honda", "Jeep", "Lexus", "Lincoln", "Mazda", "Mercedes", "Mercury", "Nissan", "Oldsmobile", "Pontiac", "Saturn", "Toyota"], y: [0.9, 4.7, 4.6, 12.9, 1.8, 12.0, 1.5, 22.8, 2.7, 7.3, 8.5, 2.2, 0.7, 1.2, 0.7, 0.4, 15.1], size: [800, 4250, 4150, 11625, 1600, 10825, 1325, 20525, 2400, 6550, 7675, 2000, 600, 1125, 675, 350, 13550] },
        1993: { x: ["Acura", "Buick", "Cadillac", "Chevrolet", "Ford", "GMC", "Geo", "Honda", "Infiniti", "Jeep", "Lexus", "Lincoln", "Mazda", "Mercedes", "Mercury", "Nissan", "Oldsmobile", "Pontiac", "Saturn", "Toyota", "Volvo"], y: [0.6, 2.2, 2.2, 6.7, 6.8, 2.2, 0.3, 16.4, 0.2, 3.8, 9.7, 1.2, 5.6, 8.3, 1.5, 2.7, 0.2, 0.8, 1.4, 26.8, 0.5], size: [500, 2025, 1975, 6025, 6125, 1975, 275, 14825, 225, 3475, 8825, 1125, 5075, 7525, 1350, 2425, 150, 725, 1250, 24250, 475] },
        1994: { x: ["Acura", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ford", "Geo", "Honda", "Infiniti", "Isuzu", "Jeep", "Lexus", "Lincoln", "Mazda", "Mercedes", "Mercury", "Mitsubishi", "Nissan", "Oldsmobile", "Pontiac", "Saturn", "Toyota", "Volvo"], y: [2.5, 4.2, 2.9, 2.7, 10.5, 0.5, 0.2, 13.3, 0.4, 18.1, 0.4, 0.9, 1.1, 4.6, 1.5, 3.9, 9.6, 2.0, 0.0, 1.7, 0.8, 0.6, 0.8, 15.8, 1.0], size: [6450, 10875, 7600, 6925, 27125, 1275, 500, 34575, 1075, 47075, 1100, 2275, 2725, 11975, 3875, 10100, 24975, 5075, 75, 4500, 2025, 1675, 2125, 40900, 2600] },
        1995: { x: ["Acura", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ford", "GMC", "Geo", "Honda", "Infiniti", "Isuzu", "Jaguar", "Jeep", "Lexus", "Lincoln", "Mazda", "Mercedes", "Mercury", "Nissan", "Oldsmobile", "Pontiac", "Saturn", "Subaru", "Toyota", "Volvo"], y: [1.0, 3.5, 4.3, 2.6, 13.3, 0.1, 0.3, 10.2, 0.2, 0.1, 10.2, 0.6, 0.5, 0.4, 1.6, 4.8, 2.4, 0.6, 19.1, 1.0, 5.3, 0.5, 1.2, 1.3, 0.7, 13.5, 0.8], size: [4625, 15875, 19825, 11775, 61025, 575, 1425, 46650, 950, 500, 46925, 2900, 2525, 1625, 7450, 22200, 10975, 2650, 87900, 4375, 24350, 2075, 5575, 5750, 3050, 62100, 3750] },
        1996: { x: ["Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ford", "GMC", "Geo", "Honda", "Infiniti", "Isuzu", "Jaguar", "Jeep", "Lexus", "Lincoln", "Mazda", "Mercedes", "Mercury", "Mitsubishi", "Nissan", "Oldsmobile", "Pontiac", "Saturn", "Subaru", "Suzuki", "Toyota", "Volkswagen", "Volvo"], y: [1.9, 0.2, 5.5, 1.2, 2.6, 10.8, 1.3, 1.6, 10.6, 0.7, 1.0, 11.8, 1.1, 0.1, 0.3, 2.7, 4.9, 1.3, 1.9, 8.2, 1.7, 0.1, 5.1, 0.7, 1.4, 1.2, 1.2, 0.1, 17.4, 0.3, 1.2], size: [10150, 1000, 29050, 6300, 13900, 57500, 7000, 8525, 56450, 3675, 5225, 62725, 5875, 550, 1575, 14125, 26175, 6800, 9925, 43375, 9200, 575, 27050, 3950, 7300, 6150, 6200, 650, 92250, 1375, 6450] },
        1997: { x: ["Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ford", "GMC", "Geo", "Honda", "Infiniti", "Isuzu", "Jaguar", "Jeep", "Lexus", "Lincoln", "Mazda", "Mercedes", "Mercury", "Mitsubishi", "Nissan", "Oldsmobile", "Plymouth", "Pontiac", "Porsche", "Saturn", "Subaru", "Toyota", "Volkswagen", "Volvo"], y: [2.3, 0.2, 8.5, 3.7, 2.7, 4.8, 0.5, 1.6, 16.2, 0.5, 0.2, 15.4, 0.1, 0.1, 1.4, 1.2, 4.8, 0.6, 0.2, 3.7, 1.7, 0.3, 5.0, 0.7, 0.1, 1.2, 1.0, 1.8, 1.3, 17.7, 0.3, 0.0], size: [26225, 2050, 96550, 42525, 30550, 54350, 5600, 18225, 184975, 6200, 2500, 174950, 1675, 1500, 15950, 14000, 54700, 7025, 2650, 42375, 19875, 3800, 56425, 7550, 1300, 14075, 11450, 20125, 14700, 201425, 3550, 550] },
        1998: { x: ["Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ford", "GMC", "Honda", "Infiniti", "Isuzu", "Jaguar", "Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", "Mazda", "Mercedes", "Mercury", "Mitsubishi", "Nissan", "Oldsmobile", "Plymouth", "Pontiac", "Porsche", "Saturn", "Subaru", "Toyota", "Volkswagen", "Volvo"], y: [1.7, 0.7, 5.3, 2.0, 2.0, 7.2, 0.3, 0.7, 11.1, 0.8, 16.7, 0.2, 0.5, 0.9, 0.8, 0.0, 0.4, 10.0, 2.0, 0.8, 5.9, 1.0, 0.8, 3.8, 1.2, 0.1, 1.6, 0.9, 1.0, 0.9, 14.7, 1.4, 2.3], size: [31025, 13550, 100225, 38400, 38400, 135575, 6050, 12675, 208875, 15425, 313475, 3525, 8850, 16550, 15550, 325, 7100, 187250, 38400, 14775, 110200, 18800, 15100, 70825, 22625, 2600, 30350, 17725, 19400, 16250, 276650, 26500, 43150] },
        1999: { x: ["Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ford", "GMC", "Honda", "Hyundai", "Infiniti", "Isuzu", "Jaguar", "Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", "Mazda", "Mercedes", "Mercury", "Mitsubishi", "Nissan", "Oldsmobile", "Plymouth", "Pontiac", "Porsche", "Saab", "Saturn", "Subaru", "Suzuki", "Toyota", "Volkswagen", "Volvo"], y: [2.0, 0.9, 5.7, 1.9, 1.7, 12.1, 1.3, 1.4, 9.6, 1.3, 10.3, 0.0, 1.0, 0.5, 0.7, 2.2, 0.0, 0.4, 13.2, 1.2, 0.7, 5.2, 1.4, 0.4, 2.3, 0.6, 0.5, 2.4, 2.5, 0.5, 0.8, 0.7, 0.2, 11.3, 2.4, 0.9], size: [71500, 30900, 199575, 66225, 59200, 422700, 43800, 47300, 335900, 45275, 360200, 475, 33350, 15750, 25900, 78050, 1725, 13125, 463300, 42300, 26050, 180450, 49275, 12475, 81075, 20950, 18000, 82975, 87750, 16425, 26625, 25025, 5650, 395650, 82850, 32150] },
        2000: { x: ["Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ford", "GMC", "Honda", "Hyundai", "Infiniti", "Isuzu", "Jaguar", "Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", "Mazda", "Mercedes", "Mercury", "Mitsubishi", "Nissan", "Oldsmobile", "Plymouth", "Pontiac", "Porsche", "Saturn", "Scion", "Subaru", "Suzuki", "Toyota", "Volkswagen", "Volvo"], y: [1.7, 0.6, 7.7, 2.4, 2.3, 11.8, 0.9, 0.6, 9.3, 1.6, 9.4, 0.4, 0.5, 0.4, 2.1, 2.3, 0.3, 0.4, 6.7, 1.6, 0.9, 6.1, 1.1, 0.9, 5.0, 0.4, 2.5, 1.6, 1.2, 0.9, 0.1, 0.9, 0.1, 11.6, 2.5, 1.2], size: [107450, 38075, 475000, 145850, 142950, 730300, 54650, 35750, 579525, 96875, 581325, 26350, 31475, 23525, 130275, 143300, 19350, 27500, 417825, 100225, 57400, 376725, 69350, 56025, 307100, 25575, 151900, 101475, 73100, 56000, 4775, 57950, 6700, 717150, 153025, 76700] },
        2001: { x: ["Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Daewoo", "Dodge", "Ford", "GMC", "HUMMER", "Honda", "Hyundai", "Infiniti", "Isuzu", "Jaguar", "Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", "Mazda", "Mercedes", "Mercury", "Mitsubishi", "Nissan", "Oldsmobile", "Plymouth", "Pontiac", "Porsche", "Saturn", "Subaru", "Suzuki", "Toyota", "Volkswagen", "Volvo"], y: [2.2, 2.0, 7.5, 1.2, 1.2, 13.7, 1.8, 0.0, 1.7, 13.2, 2.5, 0.4, 8.1, 0.7, 1.0, 0.4, 1.0, 1.5, 0.2, 0.2, 6.9, 0.8, 1.1, 6.4, 0.8, 1.6, 2.9, 0.7, 0.4, 1.6, 2.1, 0.8, 0.9, 0.1, 8.6, 2.5, 1.7], size: [245600, 223700, 851975, 131675, 136125, 1553950, 204025, 975, 196675, 1499950, 286050, 43400, 921325, 76325, 110325, 42175, 108625, 167650, 19200, 23150, 786850, 87725, 119800, 723025, 92625, 178775, 323650, 79575, 47200, 176500, 234225, 89925, 103300, 8375, 978900, 287625, 191775] },
        2002: { x: ["Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ford", "GMC", "Honda", "Hyundai", "Infiniti", "Isuzu", "Jaguar", "Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", "MINI", "Maserati", "Mazda", "Mercedes", "Mercury", "Mitsubishi", "Nissan", "Oldsmobile", "Pontiac", "Porsche", "Saab", "Saturn", "Subaru", "Suzuki", "Toyota", "Volkswagen", "Volvo"], y: [2.1, 1.2, 6.2, 1.7, 1.9, 14.5, 0.7, 1.7, 12.4, 3.3, 6.6, 1.0, 0.7, 0.1, 0.8, 4.1, 0.3, 0.2, 8.8, 1.0, 0.3, 0.2, 0.9, 5.7, 0.5, 0.9, 4.7, 0.4, 1.3, 2.4, 0.1, 0.9, 1.0, 0.1, 8.0, 2.3, 0.9], size: [434875, 250125, 1295575, 352325, 407400, 3032500, 152575, 354325, 2592050, 695225, 1375075, 209625, 143725, 25825, 160900, 854825, 55850, 50075, 1845200, 199675, 69925, 44350, 181525, 1196650, 97250, 185075, 991300, 86100, 281875, 501325, 30625, 186025, 212775, 23425, 1677500, 472675, 197075] },
        2003: { x: ["Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ford", "GMC", "HUMMER", "Honda", "Hyundai", "Infiniti", "Isuzu", "Jaguar", "Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", "MINI", "Mazda", "Mercedes", "Mercury", "Mitsubishi", "Nissan", "Oldsmobile", "Pontiac", "Porsche", "Saab", "Saturn", "Subaru", "Suzuki", "Toyota", "Volkswagen", "Volvo"], y: [2.4, 1.4, 5.4, 1.0, 2.7, 12.7, 0.7, 4.6, 11.2, 4.0, 3.0, 8.6, 1.1, 2.9, 0.1, 0.8, 2.1, 0.4, 0.0, 3.6, 1.4, 0.4, 1.1, 7.9, 0.6, 1.0, 4.5, 0.2, 0.8, 0.6, 0.3, 1.1, 0.5, 0.1, 8.3, 2.0, 0.6], size: [846175, 487600, 1930825, 365875, 966500, 4533725, 254550, 1630525, 4001325, 1442400, 1058200, 3083525, 390125, 1037650, 23250, 303175, 761800, 150600, 17375, 1273550, 484650, 141075, 399250, 2807575, 209275, 339800, 1602825, 56300, 282200, 229075, 103025, 386275, 193475, 27675, 2977275, 720575, 213425] },
        2004: { x: ["Acura", "Audi", "BMW", "Bentley", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ferrari", "Ford", "GMC", "HUMMER", "Honda", "Hyundai", "Infiniti", "Isuzu", "Jaguar", "Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", "MINI", "Maserati", "Mazda", "Mercedes", "Mercury", "Mitsubishi", "Nissan", "Oldsmobile", "Pontiac", "Porsche", "Saab", "Saturn", "Scion", "Subaru", "Suzuki", "Toyota", "Volkswagen", "Volvo"], y: [2.6, 1.6, 6.0, 0.2, 0.9, 2.5, 12.6, 1.1, 6.4, 0.1, 10.2, 3.8, 1.3, 4.8, 1.0, 3.2, 0.1, 0.6, 3.9, 0.6, 0.0, 7.5, 0.9, 0.4, 0.0, 0.9, 3.8, 0.6, 0.5, 6.4, 0.1, 1.5, 1.0, 0.2, 0.6, 0.1, 0.6, 0.1, 8.1, 1.7, 1.6], size: [1576675, 945175, 3590725, 112700, 531075, 1483600, 7549225, 632175, 3829000, 80000, 6109775, 2291525, 766825, 2843200, 572175, 1941450, 42350, 384225, 2306800, 343625, 9625, 4463450, 535225, 256025, 23200, 560050, 2248250, 385075, 328075, 3818550, 43775, 872925, 598200, 103650, 366425, 47050, 360350, 74400, 4823900, 1033350, 956100] },
        2005: { x: ["Acura", "Audi", "BMW", "Bentley", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ford", "GMC", "HUMMER", "Honda", "Hyundai", "Infiniti", "Isuzu", "Jaguar", "Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", "MINI", "Maserati", "Mazda", "Mercedes", "Mercury", "Mitsubishi", "Nissan", "Pontiac", "Porsche", "Saab", "Saturn", "Scion", "Subaru", "Suzuki", "Toyota", "Volkswagen", "Volvo"], y: [2.4, 1.4, 4.7, 1.0, 1.3, 3.0, 13.8, 3.5, 7.8, 10.8, 4.2, 1.6, 4.9, 1.1, 2.1, 0.0, 0.5, 4.3, 0.8, 0.0, 1.8, 0.6, 0.6, 0.1, 0.9, 4.9, 0.6, 0.3, 7.3, 1.2, 0.9, 0.2, 0.5, 0.2, 1.0, 0.1, 6.8, 1.3, 1.2], size: [2027425, 1234650, 4008000, 837200, 1138075, 2574800, 11809975, 2989800, 6697925, 9233400, 3629650, 1396650, 4154650, 969000, 1806100, 19875, 412075, 3659400, 666125, 21300, 1539350, 546175, 498000, 93100, 791950, 4200775, 548075, 290125, 6251100, 1054925, 728400, 180675, 410250, 174100, 826700, 97575, 5817875, 1145525, 997550] },
        2006: { x: ["Acura", "Aston Martin", "Audi", "BMW", "Bentley", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ford", "GMC", "HUMMER", "Honda", "Hyundai", "Infiniti", "Isuzu", "Jaguar", "Jeep", "Kia", "Lexus", "Lincoln", "MINI", "Maserati", "Mazda", "Mercedes", "Mercury", "Mitsubishi", "Nissan", "Pontiac", "Porsche", "Saab", "Saturn", "Scion", "Subaru", "Suzuki", "Toyota", "Volkswagen", "Volvo"], y: [2.0, 0.1, 1.3, 7.8, 0.8, 1.1, 2.7, 10.0, 3.8, 7.3, 11.7, 2.4, 2.5, 4.1, 1.4, 2.4, 0.1, 0.3, 3.7, 0.9, 3.8, 1.1, 0.5, 0.3, 0.5, 6.2, 0.6, 0.5, 5.9, 2.0, 1.2, 0.2, 0.5, 0.2, 1.0, 0.2, 6.3, 1.9, 0.7], size: [2591525, 120200, 1721725, 10350200, 1055500, 1398425, 3592950, 13195750, 5028750, 9676050, 15410500, 3170675, 3293850, 5433575, 1868750, 3197925, 70625, 346125, 4928650, 1226550, 5064575, 1398825, 715600, 348800, 721400, 8237200, 815100, 666075, 7820975, 2688975, 1606125, 278725, 647175, 235475, 1299450, 267675, 8306475, 2494400, 933300] },
        2007: { x: ["Acura", "Aston Martin", "Audi", "BMW", "Bentley", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ferrari", "Ford", "GMC", "HUMMER", "Honda", "Hyundai", "Infiniti", "Isuzu", "Jaguar", "Jeep", "Kia", "Lamborghini", "Lexus", "Lincoln", "Lotus", "MINI", "Maserati", "Mazda", "Mercedes", "Mercury", "Mitsubishi", "Nissan", "Pontiac", "Porsche", "Saab", "Saturn", "Scion", "Subaru", "Suzuki", "Toyota", "Volkswagen", "Volvo"], y: [1.7, 0.3, 1.8, 6.7, 0.6, 0.7, 4.8, 15.1, 2.9, 4.6, 0.0, 9.0, 5.5, 1.4, 5.0, 1.3, 1.3, 0.0, 0.4, 4.7, 0.6, 0.2, 4.6, 0.9, 0.0, 0.4, 0.2, 0.4, 6.2, 0.3, 0.5, 4.4, 1.6, 0.5, 0.1, 1.1, 0.4, 0.4, 0.2, 7.1, 1.3, 0.6], size: [3446250, 600200, 3617350, 13515475, 1299100, 1511600, 9779600, 30418750, 5927250, 9316125, 96000, 18152025, 11059025, 2733525, 10197675, 2678025, 2599450, 29375, 714775, 9410575, 1250900, 341000, 9272925, 1854700, 40300, 894925, 332300, 715875, 12453925, 700400, 1034450, 8975975, 3217650, 1033750, 276650, 2196300, 761125, 738075, 502450, 14421950, 2702300, 1296925] },
        2008: { x: ["Acura", "Aston Martin", "Audi", "BMW", "Bentley", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ferrari", "Ford", "GMC", "HUMMER", "Honda", "Hyundai", "Infiniti", "Isuzu", "Jaguar", "Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", "MINI", "Maserati", "Mazda", "Mercedes", "Mercury", "Mitsubishi", "Nissan", "Pontiac", "Porsche", "Saab", "Saturn", "Scion", "Subaru", "Suzuki", "Toyota", "Volkswagen", "Volvo", "smart"], y: [1.2, 0.1, 1.8, 7.3, 0.4, 1.5, 2.9, 12.8, 2.8, 6.0, 0.0, 12.4, 4.7, 0.8, 4.9, 1.1, 1.8, 0.0, 0.2, 4.2, 0.8, 1.6, 3.8, 0.8, 0.5, 0.2, 1.0, 6.6, 0.5, 0.6, 3.4, 1.5, 0.9, 0.1, 1.3, 0.6, 0.7, 0.3, 6.0, 1.0, 0.6, 0.1], size: [3184475, 278800, 4713900, 18981525, 916600, 3876725, 7568925, 33050825, 7271625, 15510450, 128000, 32223150, 12201400, 2055425, 12688800, 2762775, 4643925, 15200, 513700, 10923725, 2027300, 4246850, 9856775, 2066925, 1232600, 602600, 2497350, 17215850, 1409450, 1557075, 8918350, 3881700, 2371950, 266725, 3407200, 1577525, 1769375, 727150, 15514775, 2627225, 1547750, 146575] },
        2009: { x: ["Acura", "Aston Martin", "Audi", "BMW", "Bentley", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ford", "GMC", "HUMMER", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", "MINI", "Maserati", "Mazda", "Mercedes", "Mercury", "Mitsubishi", "Nissan", "Pontiac", "Porsche", "Saab", "Saturn", "Scion", "Subaru", "Suzuki", "Toyota", "Volkswagen", "Volvo", "smart"], y: [1.4, 0.1, 2.8, 6.4, 0.2, 1.0, 2.7, 14.1, 1.7, 5.9, 11.1, 4.1, 0.1, 6.2, 2.3, 1.4, 0.8, 3.0, 1.4, 0.8, 2.2, 0.9, 1.0, 0.2, 0.8, 6.6, 0.3, 0.7, 5.1, 1.6, 0.5, 0.0, 0.7, 0.0, 0.8, 0.1, 8.0, 2.5, 0.4, 0.1], size: [2564250, 117600, 5290375, 11890675, 372000, 1924075, 5076825, 26224975, 3117825, 10984025, 20597500, 7644850, 215150, 11459675, 4353700, 2629900, 1441125, 5517400, 2617925, 1407900, 4008925, 1636575, 1948475, 380400, 1566500, 12286600, 535525, 1265925, 9412675, 2983900, 1001950, 90225, 1331425, 5825, 1493725, 217050, 14867050, 4561350, 779250, 173150] },
        2010: { x: ["Acura", "Audi", "BMW", "Bentley", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ferrari", "Ford", "GMC", "HUMMER", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", "MINI", "Maserati", "Mazda", "Mercedes", "Mercury", "Mitsubishi", "Nissan", "Pontiac", "Porsche", "Rolls-Royce", "Saab", "Scion", "Subaru", "Suzuki", "Toyota", "Volkswagen", "Volvo", "smart"], y: [1.2, 1.8, 3.3, 0.1, 1.2, 2.3, 13.1, 2.1, 8.9, 0.3, 17.2, 3.5, 0.0, 5.1, 1.9, 1.0, 0.3, 3.7, 1.5, 1.1, 3.6, 0.9, 0.5, 0.0, 1.6, 5.7, 0.4, 0.5, 4.8, 0.2, 0.5, 0.2, 0.0, 0.3, 0.7, 0.1, 7.8, 1.7, 0.7, 0.0], size: [3337450, 4910475, 9181025, 208000, 3468200, 6321175, 36665975, 5961775, 24832575, 727000, 48275800, 9918675, 53450, 14200050, 5353250, 2869350, 917100, 10494725, 4123500, 3145800, 10181650, 2619750, 1467275, 137000, 4589000, 15969000, 1241700, 1342625, 13504175, 425200, 1536350, 449000, 91500, 767000, 1941650, 331050, 21979075, 4841700, 1914650, 29925] },
        2011: { x: ["Acura", "Aston Martin", "Audi", "BMW", "Bentley", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ferrari", "Ford", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", "MINI", "Maserati", "Mazda", "Mercedes", "Mercury", "Mitsubishi", "Nissan", "Porsche", "Ram", "Rolls-Royce", "Saab", "Scion", "Subaru", "Suzuki", "Toyota", "Volkswagen", "Volvo", "smart"], y: [0.6, 0.0, 1.2, 7.5, 0.1, 0.8, 2.0, 9.4, 0.9, 2.6, 0.0, 15.8, 2.9, 3.3, 2.2, 8.2, 1.0, 3.2, 1.8, 1.5, 3.1, 0.9, 0.4, 0.1, 1.7, 4.9, 0.0, 0.4, 9.8, 0.8, 1.9, 0.2, 0.0, 0.2, 1.0, 0.1, 8.3, 0.8, 0.3, 0.0], size: [4151250, 181000, 8198650, 48950550, 333000, 5418075, 13250900, 61717750, 5591050, 16804525, 182000, 103670825, 18985125, 21722875, 14589725, 54010000, 6637650, 20800125, 11871675, 10098750, 20300100, 6097575, 2658800, 468800, 11128675, 32432900, 298200, 2834175, 64547625, 5056300, 12305600, 1366000, 117500, 985825, 6523650, 368150, 54402325, 5255250, 1924825, 56700] },
        2012: { x: ["Acura", "Audi", "BMW", "Bentley", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "FIAT", "Ferrari", "Fisker", "Ford", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", "MINI", "Maserati", "Mazda", "Mercedes", "Mitsubishi", "Nissan", "Porsche", "Ram", "Rolls-Royce", "Scion", "Subaru", "Suzuki", "Toyota", "Volkswagen", "Volvo", "smart"], y: [1.7, 1.9, 7.8, 0.1, 0.6, 1.1, 5.7, 1.1, 2.2, 0.1, 0.1, 0.0, 15.7, 1.6, 8.0, 3.1, 6.1, 0.4, 2.6, 1.8, 0.6, 4.3, 1.2, 1.0, 0.1, 0.8, 5.0, 0.2, 12.4, 0.8, 1.6, 0.0, 0.3, 0.5, 0.1, 7.0, 2.1, 0.4, 0.1], size: [24357900, 26980450, 113392150, 1372000, 8079875, 16152400, 83145050, 15982525, 31992050, 1624950, 1011000, 441900, 227155775, 23619650, 115977375, 44359225, 88204450, 5589800, 36960575, 25848275, 8667600, 62079350, 17150150, 15046550, 852000, 12127350, 72097600, 3050200, 179209475, 11098900, 23473575, 484000, 4314025, 7233975, 793100, 101032225, 29736925, 5175750, 863700] },
        2013: { x: ["Acura", "Audi", "BMW", "Bentley", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "FIAT", "Ford", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", "MINI", "Maserati", "Mazda", "Mercedes", "Mitsubishi", "Nissan", "Porsche", "Ram", "Rolls-Royce", "Scion", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo", "smart"], y: [0.3, 1.2, 3.2, 0.1, 0.5, 0.9, 9.3, 2.5, 4.7, 0.2, 23.8, 1.3, 2.8, 5.6, 6.2, 0.2, 1.2, 2.3, 0.5, 3.7, 1.8, 0.3, 0.0, 1.0, 5.2, 0.5, 9.0, 0.8, 1.5, 0.0, 0.3, 0.6, 0.0, 0.1, 6.4, 1.8, 0.3, 0.0], size: [4949050, 18206750, 49141850, 1272000, 7231450, 13785200, 142008375, 38378700, 71690100, 2367825, 363571875, 19453300, 42315550, 86158875, 94077950, 2428400, 18713250, 34589550, 7960200, 57022100, 26783150, 4481250, 430000, 15780300, 80093050, 7229675, 137181925, 12855900, 22996450, 178000, 3863725, 9698225, 442625, 1193700, 97912850, 27856875, 4324650, 738250] },
        2014: { x: ["Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "FIAT", "Ford", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", "MINI", "Maserati", "Mazda", "Mercedes", "Mitsubishi", "Nissan", "Porsche", "Ram", "Scion", "Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo", "smart"], y: [0.3, 1.2, 4.4, 0.7, 0.6, 11.0, 4.7, 6.8, 0.2, 24.0, 2.3, 1.6, 2.6, 2.2, 0.3, 4.0, 5.6, 0.6, 1.4, 1.8, 0.4, 0.1, 1.0, 2.5, 0.6, 5.0, 0.4, 3.1, 0.2, 2.2, 0.0, 6.5, 1.2, 0.4, 0.0], size: [4551050, 17130300, 61884250, 9579400, 9003050, 154153275, 65695675, 95463900, 3272575, 336575400, 32142650, 22841100, 37035050, 31531000, 3607000, 55830950, 78602275, 8353800, 19726500, 24801200, 6190150, 1160700, 14035475, 34406600, 8619250, 70167825, 5991300, 42863700, 2249550, 30318900, 366000, 91577475, 17470625, 5097050, 165750] },
        2015: { x: ["Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "FIAT", "Ford", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", "MINI", "Mazda", "Mercedes", "Mitsubishi", "Nissan", "Porsche", "Ram", "Scion", "Subaru", "Toyota", "Volkswagen", "Volvo", "smart"], y: [0.2, 1.4, 11.7, 1.3, 1.6, 18.9, 3.3, 2.0, 0.0, 11.8, 4.0, 0.7, 4.0, 0.2, 0.5, 3.7, 11.7, 0.2, 1.6, 0.4, 0.5, 2.9, 2.7, 0.4, 4.2, 0.1, 0.7, 0.1, 2.6, 2.0, 0.5, 3.9, 0.0], size: [488000, 2923800, 24931600, 2780900, 3387000, 40425150, 7134600, 4175050, 51650, 25286300, 8509200, 1545800, 8605300, 439500, 1173000, 7960650, 25007225, 330100, 3403500, 862100, 1106900, 6256450, 5753900, 832200, 8900975, 255000, 1466000, 167900, 5622300, 4326250, 964350, 8420000, 9550] },
      },
      legendSizes: [1000, 10000, 50000],  // Bubble sizes for legend
      legendLabels: ['Small (1k)', 'Medium (10k)', 'Large (50k)']
    };
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      this.updateChartLayout(false);
    },
    updateChartLayout(animate = true) {
      const data = this.allData[this.currentYear];
      const colors = Array(data.x.length).fill().map((_, i) => `hsl(${(i / data.x.length * 360)}, 100%, 70%)`); 
      
      const hoverText = data.x.map((label, i) => `${label}<br>Market Share: ${data.y[i]}%<br>Size: ${data.size[i]}`);// Unique color for each brand

      const trace = {
        x: data.x,
        y: data.y,
        mode: 'markers+text',
        text: data.x,
        hoverinfo: 'text',
         hovertext: hoverText,
        marker: {
          size: data.size.map(s => Math.sqrt(s) * 0.25),
          color: colors,
          sizemode: 'area',
          sizeref: 2 * Math.max(...data.size.map(s => Math.sqrt(s) * 0.6)) / (80 ** 2)
        },
        textposition: 'top center',
        name: 'Companies'
      };

      const layout = {
        title: 'Market Share by Company',
        xaxis: {
          range: [-1, data.x.length],
          title: 'Company',
          showgrid: false,
          zeroline: false,
          showticklabels: false
        },
        yaxis: {
          title: 'Market Share (%)',
          showline: true
        },
        showlegend: false,
        legend: {
          title: { text: 'Sizes' },
          itemsizing: 'constant'
        },
        autosize: true,
        margin: { l: 40, r: 0, t: 40, b: 40 },
        hovermode: 'closest',
      };

      if (animate) {
        Plotly.animate(this.$refs.chart,{
          transition: {
            duration: 500,
            easing: "cubic-in-out"
          },
          frame: {
            duration: 500
          }
        });
      } else {
        Plotly.newPlot(this.$refs.chart, [trace], layout);
      }
    },
    updateChart() {
      this.updateChartLayout(true);
    }
  }
};
</script>