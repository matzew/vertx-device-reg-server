vertx-device-reg-server
=======================

Build this vertx module: https://github.com/matzew/vertx-demo-mod and install/unzip its ```mod.zip``` (see its ```target``` folder after building) inside of the ```mods```

Now run ```vertx run server.js``` 

Note: You need a MongoDB running....

Something simple like below can be used for testing:
```
curl -v -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"os":"iOS","token":"213214321123131232131231312312312", "version":"5"}' http://localhost:8080/registration
```
