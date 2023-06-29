/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const spinSound = document.getElementById("spinSound");
const text = document.getElementById("text");
/* --------------- Minimum And Maximum Angle For A value  --------------------- */
const spinValues = [
  { minDegree: 61, maxDegree: 90, value: 100 },
  { minDegree: 31, maxDegree: 60, value: 200 },
  { minDegree: 0, maxDegree: 30, value: 300 },
  { minDegree: 331, maxDegree: 360, value: 400 },
  { minDegree: 301, maxDegree: 330, value: 500 },
  { minDegree: 271, maxDegree: 300, value: 600 },
  { minDegree: 241, maxDegree: 270, value: 700 },
  { minDegree: 211, maxDegree: 240, value: 800 },
  { minDegree: 181, maxDegree: 210, value: 900 },
  { minDegree: 151, maxDegree: 180, value: 1000 },
  { minDegree: 121, maxDegree: 150, value: 1100 },
  { minDegree: 91, maxDegree: 120, value: 1200 },
];
/* --------------- Size Of Each Piece  --------------------- */
const size = [10, 10, 10, 10, 10, 10, 10, 10, 10];
/* --------------- Background Colors  --------------------- */
var spinColors = [
  "#E74C3C",
  "#7D3C98",
  "#2E86C1",
  "#138D75",
  "#F1C40F",
  "#D35400",
  "#138D75",
  "#F1C40F",
  "#b163da",
  "#E74C3C",
  "#7D3C98",
  "#138D75",
];
/* --------------- Chart --------------------- */
/* --------------- Guide : https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html --------------------- */
/* Add this JavaScript code to your existing script.js file or create a new one */

// Duplicated wheel initialization code
let smallSpinWheel = new Chart(document.getElementById("smallSpinWheel"), {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: ['Race', 'Ability/\nDisability', 'Religion', 'Social\nClass', 'Sexual\nOrientation', 'Age', 'Gender', 'Ethnicity', ''],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        align: 'end',
        rotation: 90,
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 10 },
      },
    },
    rotation: -135, // Set initial rotation for the smaller wheel
  },
});

// Rest of your existing code for the original wheel
// ...

let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: ['Speech\nPathology', 'Occupational\nTherapy', 'Medicine', 'Social\nWork', 'Nutrition', 'Nursing', 'Pharmacy', 'Physical\nTherapy', 'Audiology'],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        align: 'end', // Align labels at the end of each segment
        rotation: 90, // Set the rotation to 0
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 19 },
      },
    },
    rotation: -135, // Set initial rotation for the larger wheel
  },
});

/* --------------- Display Value Based On The Angle --------------------- */
const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      text.innerHTML = `<p>This is your IPE Team Identity! </p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};
/* --------------- Spinning Code --------------------- */
let count = 0;
let largeResultValue = 101; // Spin rate for the larger wheel
let smallResultValue = 80; // Spin rate for the smaller wheel

spinBtn.addEventListener("click", () => {
  spinSound.play();
  spinBtn.disabled = true;
  text.innerHTML = `<p>You got this!</p>`;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    spinChart.options.rotation = spinChart.options.rotation + largeResultValue;
    smallSpinWheel.options.rotation = smallSpinWheel.options.rotation + smallResultValue; // Add rotation for smaller wheel
    spinChart.update();
    smallSpinWheel.update(); // Update the smaller wheel
    if (spinChart.options.rotation >= 360) {
      count += 1;
      largeResultValue -= 5; // Adjust the spin rate for the larger wheel
      smallResultValue -= 2; // Adjust the spin rate for the smaller wheel
      spinChart.options.rotation = 0;
      smallSpinWheel.options.rotation = 0; // Reset rotation for smaller wheel
    } else if (count > 15 && spinChart.options.rotation == randomDegree) {
      generateValue(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      largeResultValue = 101; // Reset the spin rate for the larger wheel
      smallResultValue = 80; // Reset the spin rate for the smaller wheel
    }
  }, 10);
});

/* --------------- End Spin Wheel  --------------------- */