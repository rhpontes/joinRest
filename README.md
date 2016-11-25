# JoinRest widgets
Provides a join between restful-widgets-spa and widgets-spa application

## Dependencies
* npm ^2.14   
* nodejs ^4.2   
* mongoDB ^2.2.11

## Configurations
* File /configs/config-server.js 
    * You may to config your server for start
* File /configs/config-persistence.js
    * You may change the mode persistence either file or database(MongoDB)    
    
    > var config = {    
        "url": "mongodb://localhost:27017/widget",    
        "persistenceMode": 1 // 0 - Persist mode mongoDB / 1 - Persist mode file    
      }    
      
* By default the port is 3000 and persistence mode is file 

## DataBase
If you selected database as persistence mode as shown above, you must load your database.    
* You may to use as follows files for it:
    *   /persistence/users.json
    *   /persistence/widgets.json
       
Assuming that you are in the project folder, enter with the commands bellow:
>mongoimport -d widgets -c users --jsonArray ./persistence/users.json      
 mongoimport -d widgets -c widgets --jsonArray ./persistence/widgets.json       
 

## Intructions
1. Clone the repository
2. Install dependencies with npm install
>npm install
3. Run the application
>node app.js
4. The server will start at port 3000

