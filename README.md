# socketio-auth
This is just a test project for using websockets with a previous login. 
Most of the ideas are "borrwed" from this posts: https://auth0.com/blog/auth-with-socket-io/
The main difference is I'm not using Auth0 plataform to authenticate the user, just a local DB. 

The idea for this project is to connect a Rasberry PI, equipped with environment sensors (temp, humidity, lighting, etc) and periodically send that info to a main server. The server should be able to manage multiple Pi's (there's the need for a login to identify each Pi) and store this info in a DB. Next step, would be that the server process the info and send action to the Pi's, like turn on/off a led.

#How does it work
When the client wants to send info to the server. 

1. The client makes a HTTP request to the server, including login/password. 
2. The server check the credentials against the DB. If it's OK, it uses JWT to sign a token with the server info.
3. The client gets the token and opens a websocket connection and emit an 'authenticate' event including the token.
4. The server validates this token and uses the data in the token to identify the user.
5. The server starts listening for sensor updates and updates the corresponding user data when this happens.

#How to run
This has two parts: Server and Client. After installing the dependencies, just run: 

1. ```node server.js```
2. ```cd client```
3. ```node client.js```

The client is meant to run in a Pi, but it could be run in the same place as the server for testing propose. It's also equipped with a Sensor-mock module to simulate the Pi's sensors readings.
