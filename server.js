/**
 * JBoss, Home of Professional Open Source
 * Copyright Red Hat, Inc., and individual contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
load('vertx.js')

var server = vertx.createHttpServer();

/// simple mod:
vertx.deployModule('net.wessendorf.simple-v1.0');

// global ev...
var eb = vertx.eventBus;

var rm = new vertx.RouteMatcher();
  rm.post('/registration', function(req) {
	req.bodyHandler(function(body) {
		// parse the incoming POST
		var data = JSON.parse(body);
		
		// validation needed - this is a SIMPLE test
		if (!data.token && !data.os) {
			console.log('\n\nOH NO!\n\n');
		}
		// deliver the data to the Java Backend:
		eb.send("org.aerogear.device.reg", {action: 'save', device: data}, function(reply) {
			console.log("Submitted status: " + reply.status);
		});
		
	  });

    // send a simple 'OK'
    req.response.end('Device registered');
});

// Catch all - serve the index page
rm.getWithRegEx('.*', function(req) {
	// haha
	req.response.sendFile(req.path);
});

// 'deploy and run...
server.requestHandler(rm);
server.listen(8080, '0.0.0.0');