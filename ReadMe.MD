# Image Classification Training Dashboard
A dashboard implemented as a web app which displays live updates from an image classification training pipeline on the [CIFAR-10 dataset](https://medium.com/@golnaz.hosseini/beginner-tutorial-image-classification-using-pytorch-63f30dcc071c) from a Jupyter Notebook. gRPC, a general remote procedure call framework developed by Google, is used to pass data in between the two applications.
Submitted to Dr. Neil Patrick Del Gallego, for STDISCM (Distributed Computing)
## Features
- Live updates of the progress of training image classification model with the CIFAR-10 dataset
- Updates are displayed with images used in training on a grid, with each image's corresponding ground truth label and predicted label
- The loss per iteration is plotted on a graph with Chart.js
## Dependencies
- Node.js: for running the web app
- Anaconda: for running the Jupyter notebook and gRPC server

## Setup Instructions

1. Upon initializing a Node project, install dependencies for the web app in the directory of package-lock.json by running:
```npm
npm install
```
2. Make sure to 'pip install' any needed dependencies to run Classification.ipynb. This may include torch, torchvision, numpy, grpc, etc. Refer to the imports in the Jupyter notebook.
```bash
pip install grpc
```
3. Run Classification.ipynb sequentially to download the data for training, run the training pipeline and start the gRPC server.
4. Start the web app:
```bash
node server.js
```
5. Display the web app at `localhost:3000` on a web browser.
