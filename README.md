# Battleship

Built with AngularJS. 
Ships are initialized randomly and there are 2 players with 5 ships each. 

### Run the Application

There's no server backend but you need to run node server to serve up project files using local webserver to avoid issues with security restrictions in the browser. Running command below will do an npm install, bower install, and start the web server. See package.json for more details. 

```
npm start
```

Now browse to the app at `http://localhost:8000/index.html`.


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
