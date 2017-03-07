#Node
Image Creation docker build -f Dockerfile_node -t kuldeeparyadotcom/timetable_server_node:snapshot .

Run a container to run node (Mind volume that you're mounting) 
docker run -it --name timetable_server_node -p 7018:3000 -p 7016:3001 -v "$(pwd)":/data kuldeeparyadotcom/timetable_server_node:snapshot

Run npm commands
docker exec -it timetable_server_node /bin/bash

#Run Express App
Install dependencies:
cd timetable_server && npm install

Run the app:
DEBUG=timetable-server:* npm start
