# Battleship

Built with AngularJS. 
Ships are initialized randomly and there are 2 players with 5 ships each. 
There is a 'debug board' button, if you want to see where the opponent's ships are for testing purposes. 
### Prerequisites

There's no server backend but you need to run the node server to serve up project files using local webserver to avoid issues with security restrictions in the browser. You must have node.js and its package manager (npm) installed. You can get them from http://nodejs.org/. 

### Run the Application

Running command below will do an npm install, bower install, and start the web server. See package.json for more details. 

```
npm start
```

Now browse to the app at `http://localhost:8000/#!/battleship`.


## Directory Layout

```
app/                    --> all of the source files for the application
  app.css               --> default stylesheet
  battleship/           --> view/ctrl 
  battleship/                --> the battleship view template and logic
    battleship.html            --> template
    battleship.js              --> controller logic
  services/             --> all services used in the battleship controller
    BoardService.js         --> Board service
    ShipService.js          --> Ship service
    SquareService.js        --> Square service
    PlayerService.js        --> Player service
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
```
