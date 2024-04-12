const express = require('express');
const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static('public'));

// gRPC dependencies
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load proto file
const packageDefinition = protoLoader.loadSync(path.resolve(__dirname, 'loss.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const packageImage = protoLoader.loadSync(path.resolve(__dirname, 'image.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

// load the package definition into @grpc/grpc-js
const trainModelProto = grpc.loadPackageDefinition(packageDefinition);
const imageLabelProto = grpc.loadPackageDefinition(packageImage);

// create a gRPC client for the TrainModel service
const serverAddress = 'localhost:50051';
const client = new trainModelProto.TrainModel(serverAddress, grpc.credentials.createInsecure());
const imageLabelClient = new imageLabelProto.ImageLabelService(serverAddress, grpc.credentials.createInsecure());

// initialize data arrays for Chart.js
let iterations = [];
let losses = [];
let currentIteration = 0;
// function to update the graph with new data
function updateGraph(iteration, loss) {
  iterations.push(iteration);
  losses.push(loss);

  // Send data to the client-side script
  io.emit('updateGraph', { iterations, losses });
}

// function to send request and process responses
function sendRequestForLoss() {
  // create a request message
  const request = { iteration: 1 }; // Set the iteration number as needed

  //deadline is 2 seconds from now
  const deadline = new Date(Date.now() + 2000);
  //deadline.setSeconds(deadline.getSeconds() + 2);

  const metadata = new grpc.Metadata({waitForReady:true, deadline: deadline});
 



  // send the request to the gRPC server
  const call = client.TrainModel(request,metadata, function(err, response)  {
    if (err) {
      // print an error message if the RPC call failed
      if(err.code === grpc.status.DEADLINE_EXCEEDED) {
        console.error('Deadline for loss request exceeded. cancelling call')
       
      } else {
        console.error('Error:', err.message);
      }
      return;
    }

    // process the response received from the server
    console.log(`Received loss for iteration ${response.iteration}: ${response.loss}`);
    
    updateGraph(response.iteration, response.loss);
  });
}

function sendRequestForImageLabels() {
  // create a request message for ImageLabel service
  iteration = currentIteration;
  const request = { iteration };

  
  const deadline = new Date(Date.now() + 4000);
  const metadata = new grpc.Metadata({waitForReady:true, deadline: deadline})

  
  // send the request to the ImageLabel service
  imageLabelClient.GetImagePrediction(request,metadata, function (err, response)  {
    if (err) {
       if(err.code === grpc.status.DEADLINE_EXCEEDED) {
        console.error('Deadline for image label request exceeded. cancelling call')
       
      } else {
        console.error('Error:', err.message);
      }
      return;
    }
    

    // process the response received from the ImageLabel service
    
    console.log('Ground Truth Label:', response.ground_truth_label);
    console.log('Prediction Label:', response.prediction_label);
    
    // convert image data to base64
    //const imageData = Buffer.from(response.image_data).toString('base64');
    io.emit('updateImageLabels', {
      imageData: Buffer.from(response.image_data).toString('base64'),
      groundTruthLabel: response.ground_truth_label,
      predictionLabel: response.prediction_label
    });
 
  });
}


setInterval(sendRequestForLoss, 300);
setInterval(sendRequestForImageLabels, 300); 

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// set up socket.io for real-time communication
const io = require('socket.io')(server);


io.on('connection', (socket) => {

  socket.emit('updateGraph', { iterations, losses });
});
