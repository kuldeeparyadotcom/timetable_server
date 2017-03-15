#Git
Get git docker container if you don't have git locally 
docker build -f Dockerfile_git -t kuldeeparyadotcom/git:snapshot .

Run a container to run Git (Mind volume that you're mounting) 
docker run --rm -it -v /Users/KD/timetable_server:/data kuldeeparyadotcom/git:snapshot

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

#Mongo db
Build mongo image

docker build -f Dockerfile_mongo -t kuldeeparyadotcom/mongo:snapshot .
Run Mondo db container
docker run -it --name timetable_mongo -p 27017:27017 kuldeeparyadotcom/timetable_mongo:snapshot
