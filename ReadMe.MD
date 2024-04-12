# Image Classification Training Dashboard
Submitted to Dr. Neil Patrick Del Gallego, in partial fulfillment of STDISCM (Disrtributed Computing)
## Dependencies
- Node.js: for running the web app
- Anaconda: for running the Jupyter notebook and gRPC server

## Setup Instructions

1. Upon initializing a Node project, run 'npm install' to install dependencies for the web app in the directory of package-lock.json.
2. Make sure to 'pip install' any needed dependencies to run Classification.ipynb. This may include torch, torchvision, numpy, grpc, etc. Refer to the imports in the Jupyter notebook.
3. Run Classification.ipynb sequentially to download the data for training, run the training pipeline and start the gRPC server.
4. Start the web app by running the command 'node server.js'
5. Display the web app at 'localhost:3000' on a web browser.
