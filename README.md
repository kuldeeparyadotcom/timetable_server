#Git
Get git docker container if you don't have git locally 
docker build -f Dockerfile_git -t kuldeeparyadotcom/git:snapshot .

Run a container to run Git (Mind volume that you're mounting) 
docker run --rm -it -v /Users/KD/timetable_server:/data kuldeeparyadotcom/git:snapshot
*************************************************************************************************************************************


#Node
Image Creation docker build -f Dockerfile_node -t kuldeeparyadotcom/timetable_server_node:snapshot .

Run a container to run node (Mind volume that you're mounting) 
docker run -it --name timetable_server_node -p 7018:3000 -p 7016:3001 -v "$(pwd)":/data kuldeeparyadotcom/timetable_server_node:snapshot /bin/bash

#Run Express App
Install dependencies:
npm install

Run the app:
TIMETABLE_MONGO_HOST=34.207.175.246 TIMETABLE_MONGO_USERNAME=timetable_user TIMETABLE_MONGO_PASSWORD=time_sec_123 DEBUG=timetable-server:* npm start

OR (using nodemon)

TIMETABLE_MONGO_HOST=34.207.175.246 TIMETABLE_MONGO_USERNAME=timetable_user TIMETABLE_MONGO_PASSWORD=time_sec_123 ./node_modules/nodemon/bin/nodemon.js ./bin/www
*************************************************************************************************************************************

#Mongo db
Build mongo image

docker build -f Dockerfile_mongo -t kuldeeparyadotcom/timetable_mongo:snapshot .
Run Mondo db container
docker run -d --name timetable_mongo -p 27017:27017 kuldeeparyadotcom/timetable_mongo:snapshot mongod --auth

Security
docker exec -it timetable_mongo mongo admin
db.createUser({ user: 'timetable_admin', pwd: 'time_sec', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });
quit()
docker exec -it timetable_mongo mongo --port 27017 -u "timetable_admin" -p "time_sec" --authenticationDatabase "admin"
use timetable
db.createUser(
  {
    user: "timetable_user",
    pwd: "time_sec_123",
    roles: [ { role: "readWrite", db: "timetable" } ]
  }
)
quit()
*************************************************************************************************************************************
