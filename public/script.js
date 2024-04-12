let currentImageIndex = 0;
function updateFPS() {
  let fpsDisplay = document.getElementById('fpsValue');
  let frameCount = 0;
  let startTime = performance.now();

  function update() {
    frameCount++;
    let currentTime = performance.now();
    let elapsedTime = currentTime - startTime;

    if (elapsedTime >= 1000) { // Update FPS every second
      let fps = Math.round((frameCount * 1000) / elapsedTime);
      fpsDisplay.textContent = fps;
      frameCount = 0;
      startTime = currentTime;
    }

    requestAnimationFrame(update);
  }

  update();
}


document.addEventListener('DOMContentLoaded', function () {
  var ctx = document.getElementById('lossChart').getContext('2d');
  var lossChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Loss',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    options: {
      animation: false,
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        }
      }
    }
  });

  // set up socket.io connection
  const socket = io();

  // listen for 'updateGraph' events from the server
  socket.on('updateGraph', function (data) {
    // update chart data with latest
    lossChart.data.labels = data.iterations;
    lossChart.data.datasets[0].data = data.losses;
    lossChart.update();
  });
    /*
   socket.on('updateImageLabels', function (data) {
    // update image source
    document.getElementById('image').src = 'data:image/jpeg;base64,' + data.imageData;
    
    // update ground truth label
    document.getElementById('groundTruth').textContent = 'Ground Truth Label: ' + data.groundTruthLabel;
    
    // update prediction label
    document.getElementById('prediction').textContent = 'Prediction Label: ' + data.predictionLabel;
  });
  */

    socket.on('updateImageLabels', function (data) {
      const images = document.querySelectorAll('.gridImage');
      const preds = document.querySelectorAll('.predCell');
      
      const labels = document.querySelectorAll('.labelCell');


      const currentImage = images[currentImageIndex];
      const currentPredCell = preds[currentImageIndex];
      const currentLabelCell = labels[currentImageIndex];

      currentImage.src = 'data:image/jpeg;base64,' + data.imageData;
      currentPredCell.textContent = data.predictionLabel;
      currentLabelCell.textContent = data.groundTruthLabel;

      currentImageIndex = (currentImageIndex + 1) % images.length;
  });

  updateFPS();
});

console.log('Hello from script.js');