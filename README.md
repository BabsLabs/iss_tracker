# International Space Station (ISS) Tracker
By babslabs

<img src="./babslabs-iss-tracker-herokuapp.png"
     alt="ISS Tracker Screenshot"
     style="height: 50%; width: 50%;" />

See the ISS in "real time"!

## About
The Babslabs ISS Tracker is an application built to track the location of the Internation Space Station across the world as it travels at speeds of over 7.660477 kilometers per second. The information for the ISS is updated every 3 seconds. Click on the ISS marker to display additional information about the ISS.

## Setup
- Clone the repo `git clone https://github.com/BabsLabs/iss_tracker.git`
- Change into project directory
- Install packages with `npm install`
- Start server with `npm start`

### Environment Variables
You need the following variables configured in your `.env` file.

#### Required Environment Variables
- `MAPBOX_ACCESS_TOKEN = "<YOUR_MAPBOX_ACCESS_TOKEN>`
- `SUPER_SECRET_TOKEN=<YOUR_SUPER_SECRET_TOKEN>`

## Testing
Testing is done with Jest and React Test Library.

### Testing Server
Running the command `npm test` which will start up a testing server.

#### Run all tests
With the server running press `a` to run all tests.

##### Quit Test Server
You can shut down the test server by pressing `q` or `control + c`.

## Technologies

### Languages / Frameworks
- JavaScript ES6
- Node.js

### Libraries
- React
- MapboxGL
- Axios
- dotenv

### Extensions
- SCSS

### Testing
- Jest
- React Test Library

#### Travis-CI
Continuous Integration with Travis-CI has been setup for this project.
[![Build Status](https://travis-ci.com/BabsLabs/iss_tracker.svg?branch=master)](https://travis-ci.com/BabsLabs/iss_tracker)

### Buildpacks
- mars

## APIs
This data in this project comes from the [Where's the ISS at?](https://wheretheiss.at/w/developer) and the [NASA Open API Service](https://api.nasa.gov/).

## Requirements
- React 6.14.4 or compatiable versions
- Node.js