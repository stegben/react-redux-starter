# Server
1. it sends client the bundle.js, style.css, index.html, etc.
2. serve as a simple auth server
3. connect client and query-server

## routing
post```/signup```
 => if sucess: get a ```{ "token": "a2sd465as4d23as1d65as4d" }```
 => if email in used: get a ```{ "error": "Email is in use." }```

post```/login```
 => if success: get a ```{ "token": "a2sd465as4d23as1d65as4d" }```
 => else: ```Unauthorized```

To send a auth'd request, put a 'authorization' with token in header
for test: get```/encrypt-data```

connect to query server: ```/graphql``` (authed under production environment)
